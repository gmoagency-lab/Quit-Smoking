"use me";
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as fpixel from "../../lib/fpixel";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "Học viên";
  const phone = searchParams.get("phone") || "0912345678";
  const email = searchParams.get("email") || "";
  const hasBump = searchParams.get("hasBump") === "true";
  const rawTotal = searchParams.get("total") || "1499000";

  const totalAmount = parseInt(rawTotal, 10);
  const formattedTotal = totalAmount.toLocaleString("vi-VN") + " đ";

  const cleanPhone = phone.replace(/\D/g, "") || "0912345678";
  const sepayMemo = `IDENTITY${cleanPhone}`;
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

  // Meta Pixel Event: AddPaymentInfo on page load
  useEffect(() => {
    fpixel.event("AddPaymentInfo", {
      content_name: "IDENTITY DESIGN QR Payment",
      currency: "VND",
      value: totalAmount,
    });
  }, [totalAmount]);

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

          // Trigger Meta/Facebook Pixel Purchase Event
          fpixel.event("Purchase", {
            content_name: "IDENTITY DESIGN Program",
            currency: "VND",
            value: totalAmount,
          });

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
  }, [phone, name, email, hasBump, rawTotal, totalAmount, isPaid, router]);

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 16px 80px", boxSizing: "border-box" }}>
      
      {/* WARNING BANNER */}
      <div style={{ background: "rgba(232, 122, 62, 0.08)", border: "1px solid rgba(232, 122, 62, 0.3)", borderRadius: "10px", padding: "16px 20px", textAlign: "center", marginBottom: "28px", boxSizing: "border-box" }}>
        <p style={{ color: "#FDBA74", fontSize: "14px", fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
          ⚠️ Sau khi quét mã QR thanh toán chuyển khoản, anh chị vui lòng không thoát trang, hệ thống sẽ tự động chuyển hướng sau khi thanh toán được xác nhận (chỉ mất vài giây).
        </p>
      </div>

      {/* MAIN PAYMENT CARD */}
      <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "14px", padding: "28px 20px", color: "#E2E8F0", boxShadow: "0 25px 60px rgba(0,0,0,0.6)", boxSizing: "border-box" }}>
        
        <h2 style={{ fontSize: "clamp(17px, 4.5vw, 20px)", color: "#FFFFFF", fontWeight: 800, textAlign: "center", margin: "0 0 24px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px" }}>
          Thanh toán qua chuyển khoản ngân hàng
        </h2>

        {/* TWO COLUMNS: QR vs MANUAL TRANSFER */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", alignItems: "start" }}>
          
          {/* CÁCH 1: QR CODE */}
          <div style={{ textAlign: "center" }}>
            <h3 style={{ fontSize: "13px", color: "#94A3B8", fontWeight: 600, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Cách 1: Mở app ngân hàng / Ví & quét mã QR
            </h3>

            <div style={{ border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "12px", padding: "14px", background: "#FFFFFF", display: "inline-block", boxShadow: "0 10px 30px rgba(255,255,255,0.08)", boxSizing: "border-box" }}>
              <img
                src={sepayQrUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = vietqrFallbackUrl;
                }}
                alt="Mã QR SePAY Chuyển Khoản Tự Động OCB"
                style={{ width: "100%", maxWidth: "230px", height: "auto", aspectRatio: "1/1", display: "block", margin: "0 auto" }}
              />
            </div>

            <div style={{ marginTop: "14px" }}>
              <a
                href={sepayQrUrl}
                download="SePAY_QR_IDENTITY.png"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", width: "100%", maxWidth: "230px", padding: "12px 18px", background: "#FFFFFF", color: "#08090A", borderRadius: "4px", fontWeight: 700, fontSize: "13px", textDecoration: "none", boxSizing: "border-box" }}
              >
                📥 Tải ảnh QR
              </a>
            </div>
          </div>

          {/* CÁCH 2: MANUAL TRANSFER TABLE */}
          <div>
            <h3 style={{ fontSize: "13px", color: "#94A3B8", fontWeight: 600, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Cách 2: Chuyển khoản thủ công
            </h3>

            <div style={{ border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", overflow: "hidden", background: "#0B0D0F" }}>
              
              {/* OCB LOGO ROW */}
              <div style={{ padding: "10px 14px", background: "#08090A", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", textAlign: "right" }}>
                <span style={{ color: "#10B981", fontWeight: 800, fontSize: "15px", letterSpacing: "-0.02em" }}>
                  💚 OCB <span style={{ fontSize: "10px", color: "#64748B", fontWeight: 600, display: "block" }}>Ngân hàng Phương Đông</span>
                </span>
              </div>

              {/* DETAILS ROWS */}
              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ color: "#94A3B8", fontSize: "13px" }}>Ngân hàng</span>
                <strong style={{ color: "#FFFFFF", fontSize: "14px" }}>OCB</strong>
              </div>

              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ color: "#94A3B8", fontSize: "13px" }}>Thụ hưởng</span>
                <strong style={{ color: "#FFFFFF", fontSize: "14px" }}>NGUYỄN QUỐC ĐẠT</strong>
              </div>

              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ color: "#94A3B8", fontSize: "13px" }}>Số tài khoản</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <strong style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 800 }}>{ocbAccountNumber}</strong>
                  <button
                    onClick={() => copyToClipboard(ocbAccountNumber, "stk")}
                    style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#FFFFFF", padding: "3px 7px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "stk" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

              <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ color: "#94A3B8", fontSize: "13px" }}>Số tiền</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <strong style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 900 }}>{formattedTotal}</strong>
                  <button
                    onClick={() => copyToClipboard(totalAmount.toString(), "amount")}
                    style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#FFFFFF", padding: "3px 7px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "amount" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

              <div style={{ padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                <span style={{ color: "#94A3B8", fontSize: "13px" }}>Nội dung CK</span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <strong style={{ color: "#E87A3E", fontSize: "14px", fontWeight: 800 }}>{sepayMemo}</strong>
                  <button
                    onClick={() => copyToClipboard(sepayMemo, "memo")}
                    style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#FFFFFF", padding: "3px 7px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontWeight: 700 }}
                  >
                    {copiedField === "memo" ? "Đã chép!" : "📋 Sao chép"}
                  </button>
                </div>
              </div>

            </div>

            {/* WARNING MEMO BOX */}
            <div style={{ marginTop: "12px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", padding: "10px 12px", fontSize: "12px", color: "#94A3B8", lineHeight: 1.5 }}>
              ⚠️ <strong>Lưu ý:</strong> Vui lòng giữ nguyên nội dung chuyển khoản <strong>{sepayMemo}</strong> để xác nhận thanh toán tự động.
            </div>

          </div>

        </div>

        {/* STATUS INDICATOR */}
        <div style={{ marginTop: "24px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "16px", textAlign: "center", color: "#94A3B8", fontSize: "13px", fontWeight: 600 }}>
          {isPaid ? (
            <span style={{ color: "#10B981" }}>🟢 Đã nhận thanh toán thành công! Đang chuyển tới trang học bài...</span>
          ) : (
            <span>Trạng thái: <strong style={{ color: "#FFFFFF" }}>Chờ thanh toán</strong> ⏳ <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 400 }}>(Tự động quét mỗi 3s)</span></span>
          )}
        </div>

      </div>

      {/* FOOTER HELP CONTACT */}
      <div style={{ textAlign: "center", marginTop: "28px", color: "#64748B", fontSize: "13px" }}>
        Hỗ trợ trực tiếp qua{" "}
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ color: "#FFFFFF", fontWeight: 700, textDecoration: "underline" }}>
          Zalo Nguyễn Quốc Đạt
        </a>
      </div>

    </main>
  );
}

export default function PaymentPage() {
  return (
    <div style={{ background: "#08090A", color: "#E2E8F0", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#060708", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", padding: "14px 20px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
            IDENTITY DESIGN™
          </Link>
          <span style={{ border: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(255, 255, 255, 0.04)", color: "#94A3B8", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
            🔒 SEPAY AUTO-VERIFICATION
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>Đang khởi tạo mã QR thanh toán...</div>}>
        <PaymentContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#060708", color: "#64748B", padding: "30px 20px", fontSize: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <span>© 2026 IDENTITY DESIGN™. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
