import { test } from "@playwright/test";
import { urnerysElementScreenshot } from "@urnerys/playwright";

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

    const exhibits = page.locator("[data-timvir-b-exhibit]");
    for (let index = 0; index < (await exhibits.count()); index++) {
      const exhibit = exhibits.nth(index);

      const container = exhibit.locator("[data-timvir-b-exhibit-container]").first();
      if ((await container.count()) === 0) {
        continue;
      }

      const caption = exhibit.locator("[data-timvir-b-exhibit-caption]").first();
      const innerText = (await caption.count()) > 0 ? await caption.innerText() : `${index}`;

      await urnerysElementScreenshot(container, {
        collection: `${title.substring(1)}/exhibits`,
        title: sanitizeTitle(innerText),
      });
    }
  });
}
