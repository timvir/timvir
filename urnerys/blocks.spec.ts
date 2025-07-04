import { Page, test } from "@playwright/test";

const build = process.env.BUILD ?? "head";

const urls = [
  "/blocks/Arbitrary",
  "/blocks/Code",
  "/blocks/ColorBar",
  "/blocks/Exhibit",
  "/blocks/Message",
  "/blocks/Swatch",
  "/blocks/WebLink",
];

function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[\/:*\?"<>|\s\.\(\)]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

interface UploadImageRequest {
  build: string;
  set: string;
  snapshot: string;
  formula: string;
  payload: File;
}

async function uploadImage({ build, set, snapshot, formula, payload }: UploadImageRequest) {
  const body = new FormData();
  body.set("collection", set);
  body.set("snapshot", snapshot);
  body.set("formula", formula);
  body.set("payload", payload);

  const res = await fetch(`https://${process.env.URNERYS}/api/v1/projects/timvir/builds/${build}/images`, {
    method: "POST",
    body,
  });

  if (!res.ok) {
    console.log(res.statusText);
    throw res;
  }
}

async function waitForImages(page: Page): Promise<void> {
  const viewportSize = page.viewportSize();

  if (viewportSize) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight).then(Math.ceil);
    await page.setViewportSize({ width: viewportSize.width, height });
    await page.waitForLoadState("networkidle");
    await page.setViewportSize(viewportSize);
  }
}

for (const url of urls) {
  test(url, async ({ page }, { title, project }) => {
    const imageUploads: Array<Promise<unknown>> = [];

    await page.goto(url, { waitUntil: "load" });

    const inputElements = await page.$$(".timvir-b-Arbitrary-seed");
    for (const inputElement of inputElements) {
      await inputElement.evaluate((element) => {
        const pasteEvent = new ClipboardEvent("paste", {
          bubbles: true,
          cancelable: true,
          clipboardData: new DataTransfer(),
        });
        pasteEvent.clipboardData!.setData("text/plain", "gGV7y4U6pZVL");
        element.dispatchEvent(pasteEvent);
      });
    }

    await page.waitForFunction(() => !document.querySelector(".timvir-unsettled"));

    await waitForImages(page);

    {
      const elements = await page.$$(".timvir-b-Exhibit");
      for (const [index, element] of elements.entries()) {
        const buffer = await (await element.$(".timvir-b-Exhibit-container"))!.screenshot();

        const childElement = await element.$(".timvir-b-Exhibit-caption");
        const innerText = (await childElement?.innerText()) ?? `${index}`;

        imageUploads.push(
          uploadImage({
            build,
            set: `${title.substring(1)}/exhibits`,
            snapshot: sanitizeTitle(innerText),
            formula: project.name,
            payload: new File([buffer], "screenshot.png", { type: "image/png" }),
          })
        );
      }
    }

    await Promise.all(imageUploads);
  });
}
