"use me";
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Học viên";
  const phone = searchParams.get("phone") || "0912345678";
  const email = searchParams.get("email") || "";
  const hasBump = searchParams.get("hasBump") === "true";
  const rawTotal = searchParams.get("total") || "497000";

  const totalAmount = parseInt(rawTotal, 10);
  const formattedTotal = totalAmount.toLocaleString("vi-VN") + " đ";

  const cleanPhone = phone.replace(/\D/g, "") || "0912345678";
  const sepayMemo = `NONSMOKER${cleanPhone}`;
  const ocbAccountNumber = process.env.NEXT_PUBLIC_SEPAY_ACC_NUMBER || "0335046117";

  const sepayQrUrl = `https://qr.sepay.vn/img?acc=${ocbAccountNumber}&bank=OCB&amount=${totalAmount}&des=${sepayMemo}`;
  const vietqrFallbackUrl = `https://img.vietqr.io/image/OCB-${ocbAccountNumber}-compact2.png?amount=${totalAmount}&addInfo=${sepayMemo}&accountName=NGUYEN%20QUOC%20DAT`;

  const [isPaid, setIsPaid] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Real-time SePAY Payment Polling Effect
  useEffect(() => {
    if (!phone || isPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-payment?phone=${encodeURIComponent(phone)}`);
        const data = await res.json();

        if (data && data.paid) {
          setIsPaid(true);
          clearInterval(interval);

          const query = new URLSearchParams({
            name,
            phone,
            email,
            hasBump: hasBump ? "true" : "false",
            total: rawTotal,
            sepayPaid: "true",
          }).toString();

          setTimeout(() => {
            router.push(`/thank-you?${query}`);
          }, 1000);
        }
      } catch (err) {
        console.error("SePAY polling check error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [phone, name, email, hasBump, rawTotal, isPaid, router]);

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 20px 80px" }}>
      
      {/* YELLOW WARNING BANNER (MATCHING REFERENCE UI) */}
      <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: "12px", padding: "20px 24px", textAlign: "center", marginBottom: "32px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px", lineHeight: 1 }}>
          ⚠️
        </div>
        <p style={{ color: "#92400E", fontSize: "16px", fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
          Sau khi quét mã QR thanh toán chuyển khoản, anh chị vui lòng không thoát trang, hệ thống sẽ tự động chuyển hướng sau khi thanh toán được xác nhận (chỉ mất vài giây)
        </p>
      </div>

      {/* MAIN PAYMENT CARD (LIGHT / DARK ELEGANT CONTAINER) */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "16px", padding: "32px 28px", color: "#1F2937", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
        
        <h2 style={{ fontSize: "20px", color: "#111827", fontWeight: 800, textAlign: "center", margin: "0 0 24px", borderBottom: "1px solid #F3F4F6", paddingBottom: "16px" }}>
          Thanh toán qua chuyển khoản ngân hàng
        </h2>

        {/* TWO COLUMNS: QR vs MANUAL TRANSFER */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", alignItems: "start" }}>
          
          {/* CÁCH 1: QR CODE */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "15px", color: "#4B5563", fontWeight: 700, margin: "0 0 16px" }}>
              Cách 1: Mở app ngân hàng/ Ví và <strong>quét mã QR</strong>
            </h3>

            <div style={{ border: "2px solid #22C55E", borderRadius: "16px", padding: "16px", background: "#FFFFFF", display: "inline-block", boxShadow: "0 10px 25px rgba(34,197,94,0.15)", position: "relative" }}>
              <img
                src={sepayQrUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = vietqrFallbackUrl;
                }}
                alt="Mã QR SePAY Chuyển Khoản Tự Động OCB"
                style={{ width: "240px", height: "240px", display: "block" }}
              />
            </div>

            <div style={{ marginTop: "14px" }}>
              <a
                href={sepayQrUrl}
                download="SePAY_QR_NONSMOKER.png"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#0284C7", color: "white", borderRadius: "8px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
              >
                📥 Tải ảnh QR
              </a>
            </div>
          </div>

          {/* CÁCH 2: MANUAL TRANSFER TABLE */}
          <div>
            <h3 style={{ fontSize: "15px", color: "#4B5563", fontWeight: 700, margin: "0 0 16px" }}>
              Cách 2: Chuyển khoản <strong>thủ công</strong> theo thông tin
            </h3>

            <div style={{ border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden", background: "#FAFAFA" }}>
              
              {/* OCB LOGO ROW */}
              <div style={{ padding: "12px 16px", background: "#FFFFFF", borderBottom: "1px solid #F3F4F6", textAlign: "right" }}>
                <span style={{ color: "#008744", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.02em" }}>
                  💚 OCB <span style={{ fontSize: "10px", color: "#6B7280", fontWeight: 600, display: "block" }}>Ngân hàng Phương Đông</span>
                </span>
              </div>

              {/* DETAILS ROWS */}
              <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6B7280", fontSize: "14px" }}>Ngân hàng</span>
                <strong style={{ color: "#111827", fontSize: "15px" }}>OCB</strong>
              </div>

              <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6B7280", fontSize: "14px" }}>Thụ hưởng</span>
                <strong style={{ color: "#111827", fontSize: "15px" }}>NGUYỄN QUỐC ĐẠT</strong>
              </div>

              <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6B7280", fontSize: "14px" }}>Số tài khoản</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ color: "#111827", fontSize: "16px", fontWeight: 900 }}>{ocbAccountNumber}</strong>
                  <button
                    onClick={() => copyToClipboard(ocbAccountNumber, "stk")}
                    style={{ border: "1px solid #D1D5DB", background: "#EFF6FF", color: "#2563EB", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "stk" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

              <div style={{ padding: "14px 16px", borderBottom: "1px solid #F3F4F6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6B7280", fontSize: "14px" }}>Số tiền</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ color: "#D96732", fontSize: "18px", fontWeight: 900 }}>{formattedTotal}</strong>
                  <button
                    onClick={() => copyToClipboard(totalAmount.toString(), "amount")}
                    style={{ border: "1px solid #D1D5DB", background: "#EFF6FF", color: "#2563EB", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "amount" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6B7280", fontSize: "14px" }}>Nội dung CK</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <strong style={{ color: "#D96732", fontSize: "16px", fontWeight: 900 }}>{sepayMemo}</strong>
                  <button
                    onClick={() => copyToClipboard(sepayMemo, "memo")}
                    style={{ border: "1px solid #D1D5DB", background: "#EFF6FF", color: "#2563EB", padding: "4px 8px", borderRadius: "6px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "memo" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

            </div>

            {/* WARNING MEMO BOX */}
            <div style={{ marginTop: "14px", background: "#FEF3C7", border: "1px solid #F59E0B", borderRadius: "8px", padding: "12px 14px", fontSize: "13px", color: "#92400E", lineHeight: 1.5 }}>
              ⚠️ <strong>Lưu ý:</strong> Vui lòng giữ nguyên nội dung chuyển khoản <strong>{sepayMemo}</strong> để xác nhận thanh toán tự động.
            </div>

          </div>

        </div>

        {/* STATUS INDICATOR AT BOTTOM */}
        <div style={{ marginTop: "28px", borderTop: "1px solid #F3F4F6", paddingTop: "20px", textAlign: "center", color: "#4B5563", fontSize: "15px", fontWeight: 700 }}>
          {isPaid ? (
            <span style={{ color: "#16A34A" }}>🟢 Đã nhận thanh toán thành công! Đang chuyển tới trang học bài...</span>
          ) : (
            <span>Trạng thái: <strong>Chờ thanh toán</strong> ⏳ <span style={{ fontSize: "13px", color: "#6B7280", fontWeight: 400 }}>(Tự động quét mỗi 3s)</span></span>
          )}
        </div>

      </div>

      {/* FOOTER HELP CONTACT */}
      <div style={{ textAlign: "center", marginTop: "32px", color: "#A9B2AC", fontSize: "14px" }}>
        Nếu gặp vấn đề liên quan đến thanh toán, vui lòng nhắn Zalo trực tiếp cho Đạt qua{" "}
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ color: "#FAD08B", fontWeight: 700, textDecoration: "underline" }}>
          Zalo Nguyễn Quốc Đạt
        </a>
      </div>

    </main>
  );
}

export default function PaymentPage() {
  return (
    <div style={{ background: "#171A18", color: "#F5F2E9", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER BAR */}
      <header style={{ background: "#111311", borderBottom: "1px solid #384238", padding: "16px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FAD08B", textDecoration: "none", fontWeight: 900, fontSize: "18px", letterSpacing: "0.05em" }}>
            NON-SMOKER™
          </Link>
          <span style={{ background: "rgba(217,103,50,0.15)", border: "1px solid #D96732", color: "#FAD08B", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>
            🔒 TRANG XÁC NHẬN THANH TOÁN QR SEPAY
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#A9B2AC" }}>Đang khởi tạo mã QR thanh toán...</div>}>
        <PaymentContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "30px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "8px 0" }}>
            Hệ thống tự động xác nhận chuyển khoản ngân hàng OCB 24/7 qua SePAY.
          </p>
          <span>© 2026 NON-SMOKER™. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
