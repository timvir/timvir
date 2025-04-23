import { defineConfig, devices } from "@playwright/test";

export default defineConfig<{ formula: string }>({
  reporter: [["list"]],

  timeout: 5 * 60 * 1000,

  fullyParallel: true,

  use: {
    baseURL: process.env.URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "Desktop Chrome / Light",
      testMatch: /urnerys\/pages.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1680, height: 1200 },
        colorScheme: "light",

        formula: "fN2sPCScM1D",
      },
    },
    {
      name: "Desktop Chrome / Dark",
      testMatch: /urnerys\/pages.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1680, height: 1200 },
        colorScheme: "dark",

        formula: "XSC5sCuaKA3",
      },
    },
    {
      name: "Blocks",
      testMatch: /urnerys\/blocks.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1680, height: 1200 },

        formula: "EhiYaNwcFei",
      },
    },
  ],
});
