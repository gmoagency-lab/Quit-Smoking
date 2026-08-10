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

  // If simulate parameter is set for testing in sandbox mode
  if (testSimulate && phone) {
    store[phone] = {
      amount: 497000,
      content: `NONSMOKER ${phone} (Test Sandbox)`,
      date: new Date().toISOString(),
      id: "SIMULATED_" + Date.now(),
    };
    return NextResponse.json({ paid: true, simulated: true, transaction: store[phone] });
  }

  // Check if phone or code exists in store
  const cleanPhone = phone.replace(/\D/g, "");
  let matchedTx = null;

  if (cleanPhone && store[cleanPhone]) {
    matchedTx = store[cleanPhone];
  } else if (code && store[code.toUpperCase()]) {
    matchedTx = store[code.toUpperCase()];
  } else {
    // Search any transaction content containing the phone number
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

  return NextResponse.json({ paid: false });
}
