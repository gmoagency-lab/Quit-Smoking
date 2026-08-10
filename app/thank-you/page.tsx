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
  const rawTotal = searchParams.get("total") || "497000";

  const totalAmount = parseInt(rawTotal, 10);
  const formattedTotal = totalAmount.toLocaleString("vi-VN") + "đ";

  // Meta Pixel Event: Purchase on Thank You Page
  useEffect(() => {
    fpixel.event("Purchase", {
      content_name: "NON-SMOKER Program Confirmed",
      currency: "VND",
      value: totalAmount,
    });
  }, [totalAmount]);

  return (
    <main style={{ maxWidth: "880px", margin: "0 auto", padding: "50px 20px 80px" }}>
      
      {/* SUCCESS HERO BADGE */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "80px", height: "80px", background: "rgba(102, 115, 91, 0.2)", border: "2px solid #66735B", borderRadius: "50%", color: "#FAD08B", fontSize: "40px", marginBottom: "20px" }}>
          🎉
        </div>
        <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
          ĐĂNG KÝ THÀNH CÔNG
        </span>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 42px)", margin: 0, color: "#F5F2E9", fontWeight: 900 }}>
          CHÀO MỪNG {name.toUpperCase()} ĐẾN VỚI NON-SMOKER™!
        </h1>
        <p style={{ color: "#A9B2AC", fontSize: "17px", maxWidth: "640px", margin: "14px auto 0", lineHeight: 1.6 }}>
          Đơn đăng ký của bạn đã được hệ thống ghi nhận thành công. Bạn đã chính thức bước vào hành trình lấy lại quyền tự chủ!
        </p>
      </div>

      {/* SEPAY VERIFIED STATUS BANNER */}
      {sepayPaid && (
        <div style={{ background: "rgba(102, 115, 91, 0.25)", border: "2px solid #66735B", padding: "16px 20px", borderRadius: "12px", marginBottom: "32px", textAlign: "center", color: "#FAD08B", fontWeight: 800, fontSize: "16px" }}>
          🟢 GIAO DỊCH ĐÃ ĐƯỢC SEPAY XÁC NHẬN TỰ ĐỘNG THÀNH CÔNG!
        </div>
      )}

      {/* ORDER SUMMARY CONFIRMATION CARD */}
      <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "16px", padding: "28px", marginBottom: "40px", boxShadow: "0 15px 40px rgba(0,0,0,0.3)" }}>
        <h2 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 16px", fontWeight: 800, textTransform: "uppercase" }}>
          📋 THÔNG TIN ĐƠN HÀNG XÁC NHẬN:
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", fontSize: "15px", background: "#171A18", padding: "20px", borderRadius: "10px", marginBottom: "16px" }}>
          <div>
            <span style={{ color: "#A9B2AC", display: "block", fontSize: "13px" }}>Họ tên học viên:</span>
            <strong style={{ color: "#F5F2E9" }}>{name}</strong>
          </div>
          {phone && (
            <div>
              <span style={{ color: "#A9B2AC", display: "block", fontSize: "13px" }}>Số điện thoại / Zalo:</span>
              <strong style={{ color: "#F5F2E9" }}>{phone}</strong>
            </div>
          )}
          {email && (
            <div>
              <span style={{ color: "#A9B2AC", display: "block", fontSize: "13px" }}>Email kích hoạt:</span>
              <strong style={{ color: "#F5F2E9" }}>{email}</strong>
            </div>
          )}
          <div>
            <span style={{ color: "#A9B2AC", display: "block", fontSize: "13px" }}>Tổng thanh toán:</span>
            <strong style={{ color: "#D96732", fontWeight: 900 }}>{formattedTotal}</strong>
          </div>
        </div>

        {hasBump && (
          <div style={{ background: "rgba(217, 103, 50, 0.15)", border: "1px solid #D96732", padding: "14px 18px", borderRadius: "8px", color: "#FAD08B", fontSize: "14px", fontWeight: 700 }}>
            ⚡ Đã bao gồm: Bộ Audio Sơ Cứu Cơn Thèm Thuốc 3 Phút (Kèm File MP3 Nghe Tức Thì Trong Email).
          </div>
        )}
      </div>

      {/* 3 NEXT STEPS TO GET STARTED */}
      <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "36px 28px", marginBottom: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
        <h2 style={{ fontSize: "22px", color: "#D96732", margin: "0 0 24px", fontWeight: 900, textTransform: "uppercase", textAlign: "center" }}>
          🚀 3 BƯỚC BẮT ĐẦU NGAY BÂY GIỜ:
        </h2>

        <div style={{ display: "grid", gap: "20px" }}>
          
          {/* STEP 1 */}
          <div style={{ background: "#171A18", borderLeft: "4px solid #D96732", padding: "20px", borderRadius: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ background: "#D96732", color: "white", width: "26px", height: "26px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "14px" }}>1</span>
              <strong style={{ color: "#FAD08B", fontSize: "17px" }}>BƯỚC 1: KIỂM TRA EMAIL HỌC BÀI</strong>
            </div>
            <p style={{ color: "#D5DFDB", fontSize: "15px", margin: 0, lineHeight: 1.6 }}>
              Hệ thống đã tự động gửi Email chứa liên kết tài khoản và hướng dẫn bắt đầu vào địa chỉ {email || "Email của bạn"}. Hãy kiểm tra cả hộp thư chính lẫn Hộp thư rác (Spam).
            </p>
          </div>

          {/* STEP 2 */}
          <div style={{ background: "#171A18", borderLeft: "4px solid #D96732", padding: "20px", borderRadius: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ background: "#D96732", color: "white", width: "26px", height: "26px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "14px" }}>2</span>
              <strong style={{ color: "#FAD08B", fontSize: "17px" }}>BƯỚC 2: THAM GIA CỘNG ĐỒNG ZALO NON-SMOKER™</strong>
            </div>
            <p style={{ color: "#D5DFDB", fontSize: "15px", margin: 0, lineHeight: 1.6 }}>
              Kết nối ngay với Đạt và cộng đồng học viên để nhận tài liệu thực hành bổ sung và được giải đáp thắc mắc trực tiếp.
            </p>
          </div>

          {/* STEP 3 */}
          <div style={{ background: "#171A18", borderLeft: "4px solid #D96732", padding: "20px", borderRadius: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ background: "#D96732", color: "white", width: "26px", height: "26px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "14px" }}>3</span>
              <strong style={{ color: "#FAD08B", fontSize: "17px" }}>BƯỚC 3: XEM VIDEO KHỞI ĐỘNG 5 PHÚT</strong>
            </div>
            <p style={{ color: "#D5DFDB", fontSize: "15px", margin: 0, lineHeight: 1.6 }}>
              Bắt đầu với bài học đầu tiên: Quan sát và nhận diện tác nhân kích hoạt cơn thèm trong ngày hôm nay.
            </p>
          </div>

        </div>
      </div>

      {/* ZALO CONTACT & SUPPORT CARD */}
      <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "16px", padding: "32px", textAlign: "center", marginBottom: "40px" }}>
        <h3 style={{ fontSize: "20px", color: "#F5F2E9", margin: "0 0 10px", fontWeight: 800 }}>
          💬 CẦN HỖ TRỢ KÍCH HOẠT NHANH QUA ZALO?
        </h3>
        <p style={{ color: "#A9B2AC", fontSize: "15px", margin: "0 0 20px" }}>
          Quét mã QR Zalo bên dưới để nhắn tin trực tiếp cho Đạt xác nhận đơn hàng:
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <img
            src="/images/zalo_contact_qr.png"
            alt="Danh thiếp Zalo Nguyễn Quốc Đạt"
            style={{ maxWidth: "300px", width: "100%", borderRadius: "12px", border: "1px solid #384238", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
          />
        </div>

        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "14px 28px", background: "#0068FF", color: "white", fontWeight: 800, fontSize: "16px", textDecoration: "none", borderRadius: "8px", boxShadow: "0 8px 20px rgba(0,104,255,0.3)" }}
        >
          CHÁT ZALO VỚI NGUYỄN QUỐC ĐẠT →
        </a>
      </div>

      {/* RETURN HOME LINK */}
      <div style={{ textAlign: "center" }}>
        <Link href="/" style={{ color: "#A9B2AC", textDecoration: "none", fontSize: "14px" }}>
          ← Quay lại Trang Chủ NON-SMOKER™
        </Link>
      </div>

    </main>
  );
}

export default function ThankYouPage() {
  return (
    <div style={{ background: "#171A18", color: "#F5F2E9", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER BAR */}
      <header style={{ background: "#111311", borderBottom: "1px solid #384238", padding: "16px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FAD08B", textDecoration: "none", fontWeight: 900, fontSize: "18px", letterSpacing: "0.05em" }}>
            NON-SMOKER™
          </Link>
          <span style={{ color: "#66735B", fontSize: "13px", fontWeight: 800 }}>
            ✔ XÁC NHẬN THÀNH CÔNG
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#A9B2AC" }}>Đang tải thông tin đơn hàng...</div>}>
        <ThankYouContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "30px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "8px 0" }}>
            © 2026 NON-SMOKER™. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
