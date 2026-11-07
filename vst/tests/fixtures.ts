import { test as base } from "@playwright/test";

/*
 * Vercel adds its toolbar to the pages of a deployment unless the request
 * carries the `x-vercel-skip-toolbar` header.
 *
 * The header is added only to requests to the deployment itself. Setting it
 * with `extraHTTPHeaders` adds it to every request, and in Chromium that turns
 * cross-origin requests (e.g. the `WebLink` block calling the unfurl API) into
 * CORS preflight requests which the target does not allow, so they fail.
 */
export const test = base.extend({
  context: async ({ context, baseURL }, use) => {
    const origin = new URL(baseURL ?? "http://localhost:3000").origin;

    await context.route(
      (url) => url.origin === origin,
      (route) => route.continue({ headers: { ...route.request().headers(), "x-vercel-skip-toolbar": "1" } }),
    );

    await use(context);
  },
});
