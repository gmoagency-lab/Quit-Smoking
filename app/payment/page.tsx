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
      <div style={{ background: "#FAF8FF", border: "1px solid #EAEAEA", borderRadius: "10px", padding: "16px 20px", textAlign: "center", marginBottom: "28px", boxSizing: "border-box" }}>
        <p style={{ color: "#E87A3E", fontSize: "14px", fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
          ⚠️ Sau khi quét mã QR thanh toán chuyển khoản, quý khách vui lòng không thoát trang. Hệ thống SePAY sẽ tự động xác nhận và chuyển hướng sau vài giây.
        </p>
      </div>

      {/* MAIN PAYMENT CARD */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "14px", padding: "28px 24px", color: "#272727", boxShadow: "0 15px 40px rgba(0,0,0,0.04)", boxSizing: "border-box" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", borderBottom: "1px solid #EAEAEA", paddingBottom: "20px", marginBottom: "24px" }}>
          <span style={{ color: "#797F97", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
            SEPAY AUTOMATED CHECKOUT
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif), 'Lora', serif",
              fontStyle: "italic",
              fontSize: "clamp(22px, 4vw, 30px)",
              margin: 0,
              color: "#1C1C1C",
              fontWeight: 600,
            }}
          >
            Quét mã QR để hoàn tất thanh toán
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: "6px 0 0" }}>
            Mở ứng dụng Ngân hàng bất kỳ hoặc Ví điện tử để quét mã thanh toán tự động
          </p>
        </div>

        {/* 2-COLUMN PAYMENT DETAILS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px", alignItems: "center" }}>
          
          {/* COLUMN 1: QR CODE DISPLAY */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#FFFFFF", padding: "12px", borderRadius: "12px", border: "2px solid #1C1C1C", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", maxWidth: "260px", width: "100%", boxSizing: "border-box" }}>
              <img
                src={sepayQrUrl}
                alt="SePAY VietQR OCB"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = vietqrFallbackUrl;
                }}
              />
            </div>
            
            <div style={{ marginTop: "14px", textAlign: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#10B981", fontWeight: 600 }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981" }}></span>
                Đang chờ nhận chuyển khoản từ SePAY...
              </span>
            </div>
          </div>

          {/* COLUMN 2: TRANSFER INFORMATION */}
          <div style={{ display: "grid", gap: "12px" }}>
            
            {/* ROW: BANK */}
            <div style={{ background: "#F8F9FA", padding: "12px 14px", borderRadius: "8px", border: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#797F97", display: "block" }}>Ngân hàng thụ hưởng:</span>
                <strong style={{ color: "#1C1C1C", fontSize: "14px" }}>OCB (Ngân hàng Phương Đông)</strong>
              </div>
            </div>

            {/* ROW: ACCOUNT NUMBER */}
            <div style={{ background: "#F8F9FA", padding: "12px 14px", borderRadius: "8px", border: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#797F97", display: "block" }}>Số tài khoản:</span>
                <strong style={{ color: "#1C1C1C", fontSize: "16px", letterSpacing: "0.05em" }}>{ocbAccountNumber}</strong>
              </div>
              <button
                onClick={() => copyToClipboard(ocbAccountNumber, "acc")}
                style={{ background: "#1C1C1C", color: "#FFFFFF", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
              >
                {copiedField === "acc" ? "✓ Đã chép" : "Sao chép"}
              </button>
            </div>

            {/* ROW: ACCOUNT NAME */}
            <div style={{ background: "#F8F9FA", padding: "12px 14px", borderRadius: "8px", border: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#797F97", display: "block" }}>Chủ tài khoản:</span>
                <strong style={{ color: "#1C1C1C", fontSize: "14px" }}>NGUYEN QUOC DAT</strong>
              </div>
            </div>

            {/* ROW: AMOUNT */}
            <div style={{ background: "#F8F9FA", padding: "12px 14px", borderRadius: "8px", border: "1px solid #E5E5E5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#797F97", display: "block" }}>Số tiền thanh toán:</span>
                <strong style={{ color: "#1C1C1C", fontSize: "18px", fontWeight: 800 }}>{formattedTotal}</strong>
              </div>
              <button
                onClick={() => copyToClipboard(totalAmount.toString(), "amount")}
                style={{ background: "#1C1C1C", color: "#FFFFFF", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: 600 }}
              >
                {copiedField === "amount" ? "✓ Đã chép" : "Sao chép"}
              </button>
            </div>

            {/* ROW: MEMO */}
            <div style={{ background: "rgba(232, 122, 62, 0.06)", padding: "12px 14px", borderRadius: "8px", border: "1px solid rgba(232, 122, 62, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 700, display: "block" }}>Nội dung chuyển khoản (Bắt buộc đúng):</span>
                <strong style={{ color: "#1C1C1C", fontSize: "16px", letterSpacing: "0.08em" }}>{sepayMemo}</strong>
              </div>
              <button
                onClick={() => copyToClipboard(sepayMemo, "memo")}
                style={{ background: "#E87A3E", color: "#FFFFFF", border: "none", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}
              >
                {copiedField === "memo" ? "✓ Đã chép" : "Sao chép"}
              </button>
            </div>

          </div>

        </div>

        {/* MANUAL BUTTON CONFIRM */}
        <div style={{ marginTop: "28px", textAlign: "center", borderTop: "1px solid #EAEAEA", paddingTop: "20px" }}>
          <button
            onClick={() => {
              const query = new URLSearchParams({
                name,
                phone,
                email,
                hasBump: hasBump ? "true" : "false",
                total: rawTotal,
                manual: "true",
              }).toString();
              router.push(`/thank-you?${query}`);
            }}
            style={{
              background: "#1C1C1C",
              color: "#FFFFFF",
              border: "none",
              padding: "14px 28px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            TÔI ĐÃ CHUYỂN KHOẢN XONG →
          </button>
        </div>

      </div>

      {/* FOOTER LINK */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <Link href="/checkout" style={{ color: "#797F97", textDecoration: "none", fontSize: "13px" }}>
          ← Quay lại sửa thông tin đặt hàng
        </Link>
      </div>

    </main>
  );
}

export default function PaymentPage() {
  return (
    <div style={{ background: "#FFFFFF", color: "#272727", minHeight: "100vh", fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#FFFFFF", borderBottom: "1px solid #EAEAEA", padding: "16px 20px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#1C1C1C", textDecoration: "none", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
            IDENTITY DESIGN™
          </Link>
          <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 700 }}>
            ● SEPAY GATEWAY ACTIVE
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#797F97" }}>Đang tải cổng thanh toán...</div>}>
        <PaymentContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#F8F9FA", color: "#797F97", padding: "30px 20px", fontSize: "12px", borderTop: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <span>© 2026 IDENTITY DESIGN™. Cổng thanh toán bảo mật SePAY OCB.</span>
        </div>
      </footer>
    </div>
  );
}
