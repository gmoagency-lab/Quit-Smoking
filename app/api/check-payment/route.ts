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
    
    // Also save simulation to cloud store so polling across instances works
    try {
      await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `sepay_${phone}`,
          data: {
            paid: true,
            phone,
            amount: 497000,
            content: `NONSMOKER ${phone} (Test Sandbox)`,
            date: new Date().toISOString(),
            id: "SIMULATED_" + Date.now(),
          },
        }),
      });
    } catch {
      // ignore
    }

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

  // 3. Fallback Cloud Persistent Search (Solves Serverless In-Memory Isolation on Vercel)
  try {
    const cloudRes = await fetch("https://api.restful-api.dev/objects", {
      cache: "no-store",
    });

    if (cloudRes.ok) {
      const items = await cloudRes.json();
      if (Array.isArray(items)) {
        const foundItem = items.find((item: Record<string, unknown>) => {
          const title = String(item.name || "").toUpperCase();
          if (cleanPhone && title.includes(cleanPhone)) return true;
          if (code && title.includes(code.toUpperCase())) return true;
          return false;
        });

        if (foundItem && foundItem.data) {
          const dataObj = foundItem.data as Record<string, unknown>;
          const txObj = {
            amount: Number(dataObj.amount || 0),
            content: String(dataObj.content || ""),
            date: String(dataObj.date || ""),
            id: String(dataObj.id || Date.now()),
          };
          if (cleanPhone) store[cleanPhone] = txObj;
          return NextResponse.json({ paid: true, transaction: txObj, fromCloud: true });
        }
      }
    }
  } catch (err) {
    console.error("Cloud check error:", err);
  }

  return NextResponse.json({ paid: false });
}
