import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: [["list"]],

  timeout: 5 * 60 * 1000,

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
      testMatch: /urnerys\/pages.spec.ts/,
      use: {
        ...devices["iPhone 12"],
      },
    },
    {
      name: "SFgwaQfRnQC",
      testMatch: /urnerys\/pages.spec.ts/,
      use: {
        ...devices["iPad Pro 11"],
      },
    },
    {
      name: "fN2sPCScM1D",
      testMatch: /urnerys\/pages.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "light",
      },
    },
    {
      name: "XSC5sCuaKA3",
      testMatch: /urnerys\/pages.spec.ts/,
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
      testMatch: /urnerys\/blocks.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
