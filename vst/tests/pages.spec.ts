import { type Page, test } from "@playwright/test";

const urls = [
  "/blocks/Arbitrary",
  "/blocks/Code",
  "/blocks/ColorBar",
  "/blocks/Exhibit",
  "/blocks/Message",
  "/blocks/Swatch",
  "/blocks/WebLink",

  "/md/heading",
  "/md/link",
];

interface UploadImageRequest {
  set: string;
  snapshot: string;
  formula: string;
  payload: Buffer;
}

async function uploadImage({ set, snapshot, formula, payload }: UploadImageRequest) {
  await test.info().attach(`urnerys|${set}|${snapshot}|${formula}`, {
    body: payload,
    contentType: "image/png",
  });
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

    const buffer = await page.screenshot({ fullPage: true });

    imageUploads.push(
      uploadImage({
        set: title.substring(1),
        snapshot: "page",
        formula: project.name,
        payload: buffer,
      }),
    );

    await Promise.all(imageUploads);
  });
}
