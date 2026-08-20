"use me";
"use client";

import React, { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as fpixel from "../../lib/fpixel";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Bạn";
  const phone = searchParams.get("phone") || "";
  const email = searchParams.get("email") || "";
  const hasBump = searchParams.get("hasBump") === "true";
  const sepayPaid = searchParams.get("sepayPaid") === "true";
  const rawTotal = searchParams.get("total") || "1499000";

  const totalAmount = parseInt(rawTotal, 10);
  const formattedTotal = totalAmount.toLocaleString("vi-VN") + "đ";

  // Meta Pixel Event: Purchase on Thank You Page
  useEffect(() => {
    fpixel.event("Purchase", {
      content_name: "IDENTITY DESIGN Program Confirmed",
      currency: "VND",
      value: totalAmount,
    });
  }, [totalAmount]);

  return (
    <main style={{ maxWidth: "860px", margin: "0 auto", padding: "50px 20px 80px" }}>
      
      {/* SUCCESS HERO BADGE */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "50%", color: "#FFFFFF", fontSize: "28px", marginBottom: "20px" }}>
          ✓
        </div>
        <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
          ORDER CONFIRMED · TRUY CẬP ĐÃ MỞ
        </span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 38px)", margin: 0, color: "#FFFFFF", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Chào mừng {name} đến với IDENTITY DESIGN™
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "16px", maxWidth: "600px", margin: "12px auto 0", lineHeight: 1.6 }}>
          Đơn đăng ký của bạn đã được hệ thống ghi nhận thành công. Bạn đã chính thức bước vào hành trình tái lập bản thân & reset hệ điều hành!
        </p>
      </div>

      {/* SEPAY VERIFIED STATUS BANNER */}
      {sepayPaid && (
        <div style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "14px 20px", borderRadius: "10px", marginBottom: "28px", textAlign: "center", color: "#34D399", fontWeight: 700, fontSize: "14px" }}>
          🟢 GIAO DỊCH ĐÃ ĐƯỢC SEPAY XÁC NHẬN TỰ ĐỘNG THÀNH CÔNG!
        </div>
      )}

      {/* ORDER SUMMARY CONFIRMATION CARD */}
      <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "28px 24px", marginBottom: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
        <h2 style={{ fontSize: "14px", color: "#FFFFFF", margin: "0 0 16px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Thông tin đơn hàng xác nhận:
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", fontSize: "14px", background: "#08090A", padding: "18px", borderRadius: "8px", marginBottom: "14px" }}>
          <div>
            <span style={{ color: "#64748B", display: "block", fontSize: "12px", marginBottom: "2px" }}>Họ tên học viên:</span>
            <strong style={{ color: "#FFFFFF" }}>{name}</strong>
          </div>
          {phone && (
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: "12px", marginBottom: "2px" }}>Số điện thoại / Zalo:</span>
              <strong style={{ color: "#FFFFFF" }}>{phone}</strong>
            </div>
          )}
          {email && (
            <div>
              <span style={{ color: "#64748B", display: "block", fontSize: "12px", marginBottom: "2px" }}>Email kích hoạt:</span>
              <strong style={{ color: "#FFFFFF" }}>{email}</strong>
            </div>
          )}
          <div>
            <span style={{ color: "#64748B", display: "block", fontSize: "12px", marginBottom: "2px" }}>Tổng thanh toán:</span>
            <strong style={{ color: "#FFFFFF", fontWeight: 800 }}>{formattedTotal}</strong>
          </div>
        </div>

        {hasBump && (
          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "12px 16px", borderRadius: "6px", color: "#FDBA74", fontSize: "13px", fontWeight: 600 }}>
            ⚡ Đã bao gồm: Bộ Audio Dẫn Thiền Nạp Pin & Reset Não Bộ 3 Phút (Kèm File MP3 Nghe Tức Thì Trong Email).
          </div>
        )}
      </div>

      {/* 3 NEXT STEPS TO GET STARTED */}
      <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", padding: "32px 24px", marginBottom: "32px", boxShadow: "0 25px 60px rgba(0,0,0,0.6)" }}>
        <h2 style={{ fontSize: "16px", color: "#FFFFFF", margin: "0 0 24px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>
          3 Bước bắt đầu ngay bây giờ:
        </h2>

        <div style={{ display: "grid", gap: "16px" }}>
          
          {/* STEP 1 */}
          <div style={{ background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#FFFFFF", color: "#08090A", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "12px" }}>1</span>
              <strong style={{ color: "#FFFFFF", fontSize: "15px" }}>BƯỚC 1: KIỂM TRA EMAIL HỌC BÀI</strong>
            </div>
            <p style={{ color: "#94A3B8", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              Hệ thống đã tự động gửi Email chứa thông tin đăng nhập và lộ trình 4 học phần vào địa chỉ {email || "Email của bạn"}. Hãy kiểm tra cả hộp thư chính lẫn Hộp thư rác (Spam).
            </p>
          </div>

          {/* STEP 2 */}
          <div style={{ background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#FFFFFF", color: "#08090A", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "12px" }}>2</span>
              <strong style={{ color: "#FFFFFF", fontSize: "15px" }}>BƯỚC 2: TẢI BỘ ACTION-SHEET & NHẬT KÝ 21 NGÀY</strong>
            </div>
            <p style={{ color: "#94A3B8", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              Tải ngay Template Nhật Ký Cài Đặt Bản Dạng trên Notion/PDF đính kèm trong email để bắt đầu bài tập 10 phút mỗi ngày.
            </p>
          </div>

          {/* STEP 3 */}
          <div style={{ background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#FFFFFF", color: "#08090A", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "12px" }}>3</span>
              <strong style={{ color: "#FFFFFF", fontSize: "15px" }}>BƯỚC 3: XEM VIDEO KHỞI ĐỘNG HỌC PHẦN 1</strong>
            </div>
            <p style={{ color: "#94A3B8", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
              Bắt đầu với bài học đầu tiên: Giải phẫu Bức Tranh Tự Thân & Nhận diện cơ chế tự hủy hoại vô thức.
            </p>
          </div>

        </div>
      </div>

      {/* ZALO CONTACT CARD */}
      <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "28px", textAlign: "center", marginBottom: "32px" }}>
        <h3 style={{ fontSize: "16px", color: "#FFFFFF", margin: "0 0 8px", fontWeight: 700 }}>
          💬 Cần hỗ trợ kích hoạt nhanh qua Zalo?
        </h3>
        <p style={{ color: "#64748B", fontSize: "13px", margin: "0 0 20px" }}>
          Quét mã QR Zalo bên dưới để nhắn tin trực tiếp cho Đạt xác nhận tài khoản học:
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img
            src="/images/zalo_contact_qr.png"
            alt="Danh thiếp Zalo Nguyễn Quốc Đạt"
            style={{ maxWidth: "260px", width: "100%", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.15)", boxShadow: "0 10px 25px rgba(0,0,0,0.6)" }}
          />
        </div>

        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", padding: "12px 24px", background: "#FFFFFF", color: "#08090A", fontWeight: 800, fontSize: "14px", textDecoration: "none", borderRadius: "4px" }}
        >
          CHÁT ZALO VỚI NGUYỄN QUỐC ĐẠT →
        </a>
      </div>

      {/* RETURN HOME LINK */}
      <div style={{ textAlign: "center" }}>
        <Link href="/" style={{ color: "#64748B", textDecoration: "none", fontSize: "13px" }}>
          ← Quay lại Trang Chủ IDENTITY DESIGN™
        </Link>
      </div>

    </main>
  );
}

export default function ThankYouPage() {
  return (
    <div style={{ background: "#08090A", color: "#E2E8F0", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#060708", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", padding: "14px 20px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
            IDENTITY DESIGN™
          </Link>
          <span style={{ color: "#10B981", fontSize: "12px", fontWeight: 700 }}>
            ✔ XÁC NHẬN THÀNH CÔNG
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>Đang tải thông tin đơn hàng...</div>}>
        <ThankYouContent />
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
