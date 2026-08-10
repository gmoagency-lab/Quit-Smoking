import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the landing page HTML correctly", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Bản Đồ Cai Thuốc Lá 7 Ngày/i);
  assert.match(html, /QUYỀN TỰ CHỦ/i);
  assert.match(html, /497\.000/i);
  assert.match(html, /CÀ PHÊ/i);
});

test("page and layout source files have valid configuration", async () => {
  const [page, layout, checkoutPage, thankYouPage, sepayInit, sepayWebhook, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/checkout/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/thank-you/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/sepay-init/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/sepay-webhook/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /export const metadata:\s*Metadata/);
  assert.match(layout, /Bản Đồ Cai Thuốc Lá 7 Ngày/);
  assert.match(layout, /lang="vi"/);
  assert.match(page, /export default function Home/);
  assert.match(checkoutPage, /export default function CheckoutPage/);
  assert.match(thankYouPage, /export default function ThankYouPage/);
  assert.match(sepayInit, /export async function POST/);
  assert.match(sepayWebhook, /export async function POST/);
  assert.match(packageJson, /"vinext"/);
});

