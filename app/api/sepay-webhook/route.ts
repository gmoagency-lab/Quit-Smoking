import { NextResponse } from "next/server";

// Global in-memory cache for SePAY transactions across requests
declare global {
  var sepayPaidTransactions: Record<string, { amount: number; content: string; date: string; id: string }>;
}

if (!globalThis.sepayPaidTransactions) {
  globalThis.sepayPaidTransactions = {};
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown> = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      const entries: Record<string, unknown> = {};
      formData.forEach((value, key) => {
        entries[key] = value;
      });
      body = entries;
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = { content: text };
      }
    }

    console.log("Received SePAY Webhook:", body);

    // SePAY Webhook format fields:
    // id, gateway, transactionDate, accountNumber, content, transferType, transferAmount, referenceCode, code
    const content = String(body.content || body.des || "");
    const code = String(body.code || "");
    const amount = Number(body.transferAmount || body.amount || 0);
    const date = String(body.transactionDate || new Date().toISOString());
    const id = String(body.id || body.referenceCode || Date.now());

    // Clean up content to extract phone or match code
    const fullText = (content + " " + code).toUpperCase();

    // Store by fullText and by any phone number pattern found
    globalThis.sepayPaidTransactions[id] = { amount, content, date, id };

    // Extract phone numbers from transfer memo (e.g. NONSMOKER0912345678 -> 0912345678)
    const phoneMatch = fullText.match(/(?:NONSMOKER|NS)?(0\d{9,10})/);
    if (phoneMatch && phoneMatch[1]) {
      const phone = phoneMatch[1];
      globalThis.sepayPaidTransactions[phone] = { amount, content, date, id };
    }

    // Also store by full raw content string
    globalThis.sepayPaidTransactions[fullText] = { amount, content, date, id };

    // Exact response required by SePAY: { success: true } with HTTP 200
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("SePAY Webhook Error:", error);
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "SePAY Webhook Listener Active",
    totalTransactions: Object.keys(globalThis.sepayPaidTransactions || {}).length,
  });
}
