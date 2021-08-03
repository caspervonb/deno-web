import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { serve } from "https://deno.land/std/http/server.ts";

import { launch } from "./browser.ts";

Deno.test("launchChrome", async function () {
  const server = await serve({ port: 8080 });
  const browser = await launch({
    url: "http://localhost:8080",
    browser: "chrome",
    headless: true,
  });

  for await (const request of server) {
    await request.respond({ body: "" });
    assertEquals(request.url, "/");
    break;
  }

  browser.close();
  server.close();
});

Deno.test("launchFirefox", async function () {
  const server = await serve({ port: 8080 });
  const browser = await launch({
    url: "http://localhost:8080",
    browser: "firefox",
    headless: true,
  });

  for await (const request of server) {
    await request.respond({ body: "" });
    assertEquals(request.url, "/");
    break;
  }

  browser.close();
  server.close();
});
