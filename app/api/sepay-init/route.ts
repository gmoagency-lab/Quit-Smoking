import { NextResponse } from "next/server";
import { SePayPgClient } from "@/lib/sepay-pg";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, phone, name, email, hasBump } = body;

    const merchantId = process.env.SEPAY_MERCHANT_ID || "SP-TEST-NQAA8933";
    const secretKey = process.env.SEPAY_SECRET_KEY || "spsk_live_q994EnfHgSFWma278iFmsjT83oYP8BmA";
    const defaultEnv = secretKey.startsWith("spsk_live_") ? "production" : "sandbox";
    const env = (process.env.SEPAY_ENV as "sandbox" | "production") || defaultEnv;

    const client = new SePayPgClient({
      env,
      merchant_id: merchantId,
      secret_key: secretKey,
    });

    const checkoutURL = client.checkout.initCheckoutUrl();
    const invoiceNumber = "NS" + Date.now().toString().slice(-8);

    const baseUrl = "https://quit-smoking-eight.vercel.app";

    const successQuery = new URLSearchParams({
      name: name || "Học viên",
      phone: phone || "",
      email: email || "",
      hasBump: hasBump ? "true" : "false",
      total: String(amount || 497000),
      sepayPaid: "true",
      payment: "success",
    }).toString();

    const cancelQuery = new URLSearchParams({
      payment: "cancel",
    }).toString();

    const checkoutFormfields = client.checkout.initOneTimePaymentFields({
      payment_method: "BANK_TRANSFER",
      order_invoice_number: invoiceNumber,
      order_amount: Number(amount) || 497000,
      currency: "VND",
      order_description: `Thanh toan don hang NONSMOKER ${phone || "0912345678"}`,
      success_url: `${baseUrl}/thank-you?${successQuery}`,
      error_url: `${baseUrl}/checkout?${cancelQuery}`,
      cancel_url: `${baseUrl}/checkout?${cancelQuery}`,
    });

    return NextResponse.json({
      success: true,
      checkoutURL,
      fields: checkoutFormfields,
    });
  } catch (error) {
    console.error("SePAY Init Error:", error);
    return NextResponse.json({ success: false, error: "Initialization failed" }, { status: 500 });
  }
}
