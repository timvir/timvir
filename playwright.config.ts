import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [["list"]],

  timeout: 5 * 60 * 1000,

  fullyParallel: true,

  use: {
    baseURL: process.env.URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
});
