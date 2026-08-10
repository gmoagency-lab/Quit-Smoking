import { NextResponse } from "next/server";

declare global {
  var sepayPaidTransactions: Record<string, { amount: number; content: string; date: string; id: string }>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone") || "";
  const code = searchParams.get("code") || "";
  const testSimulate = searchParams.get("simulate") === "true";

  const store = globalThis.sepayPaidTransactions || {};

  // 1. If simulate parameter is set for testing in sandbox mode
  if (testSimulate && phone) {
    store[phone] = {
      amount: 497000,
      content: `NONSMOKER ${phone} (Test Sandbox)`,
      date: new Date().toISOString(),
      id: "SIMULATED_" + Date.now(),
    };
    return NextResponse.json({ paid: true, simulated: true, transaction: store[phone] });
  }

  const cleanPhone = phone.replace(/\D/g, "");
  let matchedTx = null;

  // 2. Check local in-memory cache
  if (cleanPhone && store[cleanPhone]) {
    matchedTx = store[cleanPhone];
  } else if (code && store[code.toUpperCase()]) {
    matchedTx = store[code.toUpperCase()];
  } else {
    const keys = Object.keys(store);
    for (const key of keys) {
      if (cleanPhone && key.includes(cleanPhone)) {
        matchedTx = store[key];
        break;
      }
    }
  }

  if (matchedTx) {
    return NextResponse.json({ paid: true, transaction: matchedTx });
  }

  // 3. Fallback Direct Query to SePAY Official User API (Fixes Serverless Memory Isolation on Vercel)
  const apiKey = process.env.SEPAY_SECRET_KEY || "spsk_live_q994EnfHgSFWma278iFmsjT83oYP8BmA";
  const accountNumber = "0335046117";

  try {
    const sepayApiRes = await fetch(
      `https://my.sepay.vn/userapi/transactions/list?account_number=${accountNumber}&limit=20`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (sepayApiRes.ok) {
      const sepayData = await sepayApiRes.json();
      const transactions = sepayData.transactions || sepayData.messages || sepayData.data || [];

      if (Array.isArray(transactions)) {
        const found = transactions.find((tx: Record<string, unknown>) => {
          const content = String(tx.transaction_content || tx.content || tx.des || "").toUpperCase();
          const codeStr = String(tx.code || "").toUpperCase();
          const full = content + " " + codeStr;

          if (cleanPhone && full.includes(cleanPhone)) return true;
          if (code && full.includes(code.toUpperCase())) return true;
          return false;
        });

        if (found) {
          const txObj = {
            amount: Number(found.amount_in || found.transferAmount || 0),
            content: String(found.transaction_content || found.content || ""),
            date: String(found.transaction_date || found.transactionDate || ""),
            id: String(found.id || found.reference_number || Date.now()),
          };
          if (cleanPhone) store[cleanPhone] = txObj;
          return NextResponse.json({ paid: true, transaction: txObj, fromApi: true });
        }
      }
    }
  } catch (err) {
    console.error("Error querying SePAY User API:", err);
  }

  return NextResponse.json({ paid: false });
}
