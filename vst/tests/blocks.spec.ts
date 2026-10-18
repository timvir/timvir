import { type Page, test } from "@playwright/test";

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
    .replaceAll(/[/:*?"<>|\s.()]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

interface UploadImageRequest {
  page: Page;
  set: string;
  snapshot: string;
  formula: string;
  payload: Buffer;
}

/*
 * Formulas whose realization attributes have already been attached by this
 * worker. The browser-specific values don't change within a worker, so
 * attaching them once per formula is enough.
 */
const attachedRealizations = new Set<string>();

/*
 * Attach the values used to render a formula that are only known in the test
 * worker (the browser and the viewport). The reporter combines them with the
 * values it has access to and reports them to Urnerys.
 */
async function attachRealization(page: Page, formula: string): Promise<void> {
  if (attachedRealizations.has(formula)) return;

  attachedRealizations.add(formula);

  const browser = page.context().browser();
  const viewport = page.viewportSize();

  const attributes = {
    "dev.urnerys.renderer.type": "browser",
    "dev.urnerys.renderer.name": browser?.browserType().name(),
    "dev.urnerys.renderer.version": browser?.version(),
    "dev.urnerys.viewport.width": viewport?.width,
    "dev.urnerys.viewport.height": viewport?.height,
  };

  await test.info().attach(`urnerys-realization|${formula}`, {
    body: JSON.stringify(attributes),
    contentType: "application/json",
  });
}

async function uploadImage({ page, set, snapshot, formula, payload }: UploadImageRequest) {
  await test.info().attach(`urnerys|${set}|${snapshot}|${formula}`, {
    body: payload,
    contentType: "image/png",
  });

  await attachRealization(page, formula);
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

    await page.waitForFunction(() => !document.querySelector(".timvir-unsettled"));

    const inputElements = await page.$$("[data-timvir-b-arbitrary-seed]");
    for (const inputElement of inputElements) {
      await inputElement.evaluate((element) => {
        const clipboardData = new DataTransfer();
        clipboardData.setData("text/plain", "gGV7y4U6pZVL");

        const pasteEvent = new ClipboardEvent("paste", {
          bubbles: true,
          cancelable: true,
          clipboardData,
        });

        element.dispatchEvent(pasteEvent);
      });

      await inputElement.waitForSelector(":scope[value='gGV7y4U6pZVL']");
    }

    await waitForImages(page);

    {
      const elements = await page.$$("[data-timvir-b-exhibit]");
      for (const [index, element] of elements.entries()) {
        const screenshotElement = await element.$("[data-timvir-b-exhibit-container]");
        if (!screenshotElement) {
          continue;
        }

        const buffer = await screenshotElement.screenshot();

        const childElement = await element.$("[data-timvir-b-exhibit-caption]");
        const innerText = (await childElement?.innerText()) ?? `${index}`;

        imageUploads.push(
          uploadImage({
            page,
            set: `${title.substring(1)}/exhibits`,
            snapshot: sanitizeTitle(innerText),
            formula: project.name,
            payload: buffer,
          }),
        );
      }
    }

    await Promise.all(imageUploads);
  });
}
