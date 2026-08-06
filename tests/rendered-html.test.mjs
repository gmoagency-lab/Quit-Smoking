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
  assert.match(html, /Bản Đồ Cai Thuốc 7 Ngày/i);
  assert.match(html, /Identity Shift/i);
  assert.match(html, /457\.000 VNĐ/i);
  assert.match(html, /LẤY LẠI HƠI THỞ/i);
});

test("page and layout source files have valid configuration", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /export const metadata:\s*Metadata/);
  assert.match(layout, /Bản Đồ Cai Thuốc 7 Ngày/);
  assert.match(layout, /lang="vi"/);
  assert.match(page, /export default function Home/);
  assert.match(packageJson, /"vinext"/);
});

