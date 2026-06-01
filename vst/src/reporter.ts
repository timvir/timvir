import type { FullConfig, FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { nanoid } from "nanoid";

const urnerys = process.env.URNERYS ?? "app.urnerys.dev";

async function fetchOIDCToken(): Promise<string> {
  const requestUrl = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
  const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;

  if (!requestUrl || !requestToken) {
    throw new Error("OIDC env vars not set");
  }

  const url = new URL(requestUrl);
  url.searchParams.set("audience", urnerys);

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${requestToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OIDC token: ${response.status}`);
  }

  const { value } = (await response.json()) as { value: string };
  return value;
}

async function exchangeToken(oidcToken: string): Promise<string> {
  const formData = new FormData();
  formData.set("grant_type", "urn:ietf:params:oauth:grant-type:token-exchange");
  formData.set("subject_token", oidcToken);
  formData.set("subject_token_type", "urn:ietf:params:oauth:token-type:id_token");

  const response = await fetch(`https://${urnerys}/api/v1/token`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed: ${response.status}`);
  }

  const { access_token } = (await response.json()) as { access_token: string };
  return access_token;
}

async function createBuild(project: string, token: string, build: string): Promise<void> {
  const response = await fetch(`https://${urnerys}/api/v1/projects/${project}/builds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: build,
      build: { origin: { commit: process.env.GITHUB_SHA } },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create build: ${response.status}`);
  }
}

async function uploadOne(
  project: string,
  token: string | undefined,
  build: string,
  collection: string,
  snapshot: string,
  formula: string,
  body: Buffer,
): Promise<void> {
  if (!token) return;

  const formData = new FormData();
  formData.set("collection", collection);
  formData.set("snapshot", snapshot);
  formData.set("formula", formula);
  formData.set("payload", new File([new Uint8Array(body)], "screenshot.png", { type: "image/png" }));

  try {
    const response = await fetch(`https://${urnerys}/api/v1/projects/${project}/builds/${build}/images`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) {
      console.warn(`[urnerys] Upload failed for ${snapshot}/${formula}: ${response.status}`);
    }
  } catch (e) {
    console.warn(`[urnerys] Upload error for ${snapshot}/${formula}:`, (e as Error).message);
  }
}

class UrnerysReporter implements Reporter {
  private build: string = (() => {
    if (process.env.GITHUB_RUN_ID && process.env.GITHUB_RUN_ATTEMPT) {
      return `github-run-${process.env.GITHUB_RUN_ID}-${process.env.GITHUB_RUN_ATTEMPT}`;
    }

    return nanoid().replaceAll(/[-_]/g, "").substring(0, 13);
  })();

  private tokenPromise!: Promise<string | undefined>;

  private uploads: Promise<void>[] = [];

  constructor(private config: { project: string }) {}

  onBegin(_config: FullConfig): void {
    this.tokenPromise = fetchOIDCToken()
      .then(exchangeToken)
      .then(async (token) => {
        await createBuild(this.config.project, token, this.build);
        return token;
      })
      .catch((e: Error) => {
        console.warn("[urnerys] Skipping uploads — setup failed:", e.message);
        return undefined;
      });
  }

  onTestEnd(_test: TestCase, result: TestResult): void {
    for (const attachment of result.attachments) {
      if (!attachment.name.startsWith("urnerys|") || !attachment.body) continue;

      const [, collection, snapshot, formula] = attachment.name.split("|");
      const body = attachment.body;

      this.uploads.push(this.tokenPromise.then((token) => uploadOne(this.config.project, token, this.build, collection, snapshot, formula, body)));
    }
  }

  async onEnd(_result: FullResult): Promise<void> {
    await Promise.all(this.uploads);

    const token = await this.tokenPromise;
    if (!token) {
      return;
    }

    const environment = process.env.DEPLOYMENT_ENVIRONMENT;

    if (environment === "Production") {
      const response = await fetch(`https://${urnerys}/api/v1/projects/${this.config.project}/baselines/production`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ baseline: { build: this.build } }),
      });
      if (!response.ok) {
        console.warn(`[urnerys] Failed to update baseline: ${response.status}`);
      }
    } else {
      const response = await fetch(`https://${urnerys}/api/v1/projects/${this.config.project}/builds/${this.build}/checks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ check: { baseline: "production" } }),
      });
      if (!response.ok) {
        console.warn(`[urnerys] Failed to create check: ${response.status}`);
      }
    }
  }
}

export default UrnerysReporter;
