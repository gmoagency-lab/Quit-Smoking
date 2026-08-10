import crypto from "crypto";

export interface SePayPgClientOptions {
  env?: "sandbox" | "production";
  merchant_id?: string;
  secret_key?: string;
}

export interface OneTimePaymentOptions {
  payment_method: string;
  order_invoice_number: string;
  order_amount: number;
  currency: string;
  order_description: string;
  success_url: string;
  error_url: string;
  cancel_url: string;
}

export class SePayPgClient {
  private env: "sandbox" | "production";
  private merchantId: string;
  private secretKey: string;

  constructor(options: SePayPgClientOptions = {}) {
    const key = options.secret_key || process.env.SEPAY_SECRET_KEY || "spsk_live_q994EnfHgSFWma278iFmsjT83oYP8BmA";
    const defaultEnv = key.startsWith("spsk_live_") ? "production" : "sandbox";

    this.env = options.env || (process.env.SEPAY_ENV as "sandbox" | "production") || defaultEnv;
    this.merchantId = options.merchant_id || process.env.SEPAY_MERCHANT_ID || "SP-LIVE-NQ539884";
    this.secretKey = key;
  }

  get checkout() {
    return {
      initCheckoutUrl: (): string => {
        return this.env === "sandbox"
          ? "https://sandbox.sepay.vn/checkout"
          : "https://checkout.sepay.vn/checkout";
      },

      initOneTimePaymentFields: (opts: OneTimePaymentOptions): Record<string, string> => {
        const fields: Record<string, string> = {
          merchant_id: this.merchantId,
          payment_method: opts.payment_method || "BANK_TRANSFER",
          order_invoice_number: opts.order_invoice_number,
          order_amount: String(opts.order_amount),
          currency: opts.currency || "VND",
          order_description: opts.order_description,
          success_url: opts.success_url,
          error_url: opts.error_url,
          cancel_url: opts.cancel_url,
        };

        // Calculate SePAY HMAC SHA256 Signature using secret key
        const rawString = Object.keys(fields)
          .sort()
          .map((key) => `${key}=${fields[key]}`)
          .join("&");

        const signature = crypto
          .createHmac("sha256", this.secretKey)
          .update(rawString)
          .digest("hex");

        return {
          ...fields,
          signature,
        };
      },
    };
  }
}
