import { type Page, test } from "@playwright/test";
import { urnerysScreenshot } from "@urnerys/playwright";

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

/*
 * `urnerysScreenshot` can only screenshot a page, not an element. As a stand-in
 * for an element screenshot, take a full page screenshot clipped to the
 * bounding box of the element (in page coordinates).
 */
async function elementClip(page: Page, element: NonNullable<Awaited<ReturnType<Page["$"]>>>) {
  const box = await element.boundingBox();
  if (!box) return undefined;

  const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));

  return { x: box.x + scroll.x, y: box.y + scroll.y, width: box.width, height: box.height };
}

for (const url of urls) {
  test(url, async ({ page }, { title }) => {
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

    await page.waitForLoadState("networkidle");

    const elements = await page.$$("[data-timvir-b-exhibit]");
    for (const [index, element] of elements.entries()) {
      const screenshotElement = await element.$("[data-timvir-b-exhibit-container]");
      if (!screenshotElement) {
        continue;
      }

      const clip = await elementClip(page, screenshotElement);
      if (!clip) {
        continue;
      }

      const childElement = await element.$("[data-timvir-b-exhibit-caption]");
      const innerText = (await childElement?.innerText()) ?? `${index}`;

      await urnerysScreenshot(page, sanitizeTitle(innerText), {
        collection: `${title.substring(1)}/exhibits`,
        fullPage: true,
        clip,
      });
    }
  });
}
