import { test } from "@playwright/test";
import { urnerysPageScreenshot } from "@urnerys/playwright";

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

    await urnerysPageScreenshot(page, { collection: title.substring(1), title: "page", fullPage: true });
  });
}
