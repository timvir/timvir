import { test } from "@playwright/test";

const build = process.env.GITHUB_RUN_ID ?? "head";

const urls = [
  "/blocks/Arbitrary",
  "/blocks/Code",
  "/blocks/ColorBar",
  "/blocks/Exhibit",
  "/blocks/Message",
  "/blocks/Swatch",
];

function sanitizeTitle(s: string): string {
  return s
    .replaceAll(/[\/:*\?"<>|\s\.\(\)]+/g, "-")
    .replace(/-+$/g, "")
    .replace(/^-/, "")
    .replace(/-$/, "")
    .toLowerCase();
}

for (const url of urls) {
  test(url, async ({ page }, { title }) => {
    await page.setViewportSize({ width: 1680, height: 1200 });
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

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

    const buffer = await page.screenshot({ fullPage: true });

    const formData = new FormData();
    formData.set("project", "timvir");
    formData.set("build", build);
    formData.set("set", title.substring(1));
    formData.set("snapshot", "page");
    formData.set("formula", "w1680");
    formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

    {
      const res = await fetch(`https://urnerys.dev/rpc/uploadImage`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.log(res.statusText);
        throw res;
      }
    }

    {
      const elements = await page.$$(".timvir-b-Exhibit");
      for (const [index, element] of elements.entries()) {
        const buffer = await (await element.$(".timvir-b-Exhibit-container"))!.screenshot();

        const childElement = await element.$(".timvir-b-Exhibit-caption");
        const innerText = (await childElement?.innerText()) ?? `${index}`;

        const formData = new FormData();
        formData.set("project", "timvir");
        formData.set("build", build);
        formData.set("set", title.substring(1) + "/exhibits");
        formData.set("snapshot", sanitizeTitle(innerText));
        formData.set("formula", "none");
        formData.set("payload", new File([buffer], "screenshot.png", { type: "image/png" }));

        {
          const res = await fetch(`https://urnerys.dev/rpc/uploadImage`, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            console.log(res.statusText);
            throw res;
          }
        }
      }
    }
  });
}
