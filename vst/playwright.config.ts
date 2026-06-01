import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: [["list"], ["./src/reporter.ts", { project: "timvir" }]],

  retries: 3,
  timeout: 8 * 1000,

  fullyParallel: true,

  use: {
    baseURL: process.env.URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",

    extraHTTPHeaders: {
      "x-vercel-skip-toolbar": "1",
    },
  },

  projects: [
    /*
     * Pages
     */

    {
      name: "aoH4VEUJdsi",
      testMatch: /tests\/pages.spec.ts/,
      use: {
        ...devices["iPhone 12"],
      },
    },
    {
      name: "SFgwaQfRnQC",
      testMatch: /tests\/pages.spec.ts/,
      use: {
        ...devices["iPad Pro 11"],
      },
    },
    {
      name: "fN2sPCScM1D",
      testMatch: /tests\/pages.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
      },
    },
    {
      name: "XSC5sCuaKA3",
      testMatch: /tests\/pages.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
      },
    },

    /*
     * Blocks
     */

    {
      name: "EhiYaNwcFei",
      testMatch: /tests\/blocks.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
