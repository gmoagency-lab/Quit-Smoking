"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as fpixel from "../../lib/fpixel";

function CheckoutFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState(() => ({
    fullName: searchParams.get("name") || "",
    phone: searchParams.get("phone") || "",
    email: searchParams.get("email") || "",
  }));

  const [includeBump, setIncludeBump] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const basePrice = 1499000;
  const bumpPrice = 199000;
  const totalPrice = basePrice + (includeBump ? bumpPrice : 0);

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  // Meta Pixel Event: InitiateCheckout on page load
  useEffect(() => {
    fpixel.event("InitiateCheckout", {
      content_name: "IDENTITY DESIGN Program",
      currency: "VND",
      value: totalPrice,
    });
  }, [totalPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email của bạn.");
      return;
    }
    setIsSubmitting(true);

    // Meta Pixel Event: AddPaymentInfo / Submit Form
    fpixel.event("AddPaymentInfo", {
      content_name: "IDENTITY DESIGN Program",
      currency: "VND",
      value: totalPrice,
    });

    const query = new URLSearchParams({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      hasBump: includeBump ? "true" : "false",
      total: totalPrice.toString(),
    }).toString();

    setTimeout(() => {
      router.push(`/payment?${query}`);
    }, 400);
  };

  return (
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "40px 16px 80px", boxSizing: "border-box" }}>
      
      {/* TOP HEADER */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          CHECKOUT STEP 01 · REGISTRATION
        </span>
        <h1
          style={{
            fontFamily: "var(--font-serif), 'Lora', serif",
            fontStyle: "italic",
            fontSize: "clamp(26px, 4vw, 36px)",
            margin: "8px 0 10px",
            color: "#1C1C1C",
            fontWeight: 600,
          }}
        >
          Hoàn tất đăng ký IDENTITY DESIGN™
        </h1>
        <p style={{ color: "#666666", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Nhập thông tin nhận tài khoản bên dưới để hệ thống tạo đơn hàng và tạo mã VietQR SePAY cho bạn.
        </p>
      </div>

      {/* TWO COLUMN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "24px", alignItems: "start" }}>
        
        {/* COLUMN 1: FORM */}
        <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "14px", padding: "28px 24px", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
          
          <h2 style={{ fontSize: "15px", color: "#1C1C1C", margin: "0 0 20px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            1. Thông tin khách hàng
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333333", marginBottom: "6px" }}>
                Họ và tên của bạn: <span style={{ color: "#E87A3E" }}>*</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  color: "#1C1C1C",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333333", marginBottom: "6px" }}>
                Số điện thoại (dùng Zalo để hỗ trợ): <span style={{ color: "#E87A3E" }}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Ví dụ: 0901234567"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  color: "#1C1C1C",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333333", marginBottom: "6px" }}>
                Địa chỉ Email nhận bài học: <span style={{ color: "#E87A3E" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ví dụ: email@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  background: "#FFFFFF",
                  border: "1px solid #D1D5DB",
                  borderRadius: "6px",
                  color: "#1C1C1C",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* ORDER BUMP CHECKBOX */}
            <div
              onClick={() => setIncludeBump(!includeBump)}
              style={{
                marginTop: "10px",
                padding: "16px",
                background: includeBump ? "#FAF8FF" : "#F8F9FA",
                border: includeBump ? "2px solid #1C1C1C" : "1px dashed #D1D5DB",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <input
                  type="checkbox"
                  checked={includeBump}
                  onChange={() => {}}
                  style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#1C1C1C", cursor: "pointer" }}
                />
                <div>
                  <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                    ⚡ ƯU ĐÃI THÊM ĐẶC BIỆT (CHỈ +199.000đ)
                  </span>
                  <strong style={{ fontSize: "14px", color: "#1C1C1C", display: "block", marginBottom: "4px" }}>
                    Bộ Audio Dẫn Thiền Nạp Pin & Reset Não Bộ 3 Phút
                  </strong>
                  <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: 1.5 }}>
                    Nghe mỗi khi bạn bị quá tải hoặc sụt pin năng lượng giữa giờ làm việc. Tái nạp năng lượng tập trung ngay lập tức. (Giá gốc 500k, tick chọn để nhận ngay với 199k).
                  </p>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "16px",
                background: "#1C1C1C",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "16px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                marginTop: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease",
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? "ĐANG TẠO MÃ THANH TOÁN..." : `TIẾP TỤC THANH TOÁN (${formatVND(totalPrice)}) →`}
            </button>

            <div style={{ textAlign: "center", fontSize: "12px", color: "#797F97" }}>
              🔒 Bảo mật SSL 256-bit · Cam kết hoàn tiền 100% trong 14 ngày
            </div>

          </form>

        </div>

        {/* COLUMN 2: ORDER SUMMARY */}
        <div style={{ background: "#F8F9FA", border: "1px solid #E5E5E5", borderRadius: "14px", padding: "28px 24px", boxSizing: "border-box" }}>
          
          <h2 style={{ fontSize: "15px", color: "#1C1C1C", margin: "0 0 20px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            2. Tóm tắt đơn hàng
          </h2>

          <div style={{ display: "grid", gap: "12px", fontSize: "14px", borderBottom: "1px solid #E5E5E5", paddingBottom: "16px", marginBottom: "16px" }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <strong style={{ color: "#1C1C1C", display: "block" }}>IDENTITY DESIGN™</strong>
                <span style={{ color: "#797F97", fontSize: "12px" }}>Tái Lập Bản Thân & Reset Hệ Điều Hành 2026</span>
              </div>
              <span style={{ color: "#1C1C1C", fontWeight: 700 }}>{formatVND(basePrice)}</span>
            </div>

            {includeBump && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", color: "#E87A3E" }}>
                <div>
                  <strong style={{ display: "block" }}>+ Bộ Audio Nạp Pin 3 Phút</strong>
                  <span style={{ fontSize: "12px", opacity: 0.85 }}>Order Bump Độc Quyền</span>
                </div>
                <span style={{ fontWeight: 700 }}>+{formatVND(bumpPrice)}</span>
              </div>
            )}

          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "16px", marginBottom: "20px" }}>
            <span style={{ color: "#1C1C1C", fontWeight: 700 }}>Tổng thanh toán:</span>
            <strong style={{ color: "#1C1C1C", fontSize: "24px", fontWeight: 900 }}>{formatVND(totalPrice)}</strong>
          </div>

          {/* BONUSES STACK SUMMARY */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "8px", padding: "14px", fontSize: "13px" }}>
            <span style={{ color: "#1C1C1C", fontWeight: 700, display: "block", marginBottom: "8px" }}>
              🎁 Quà tặng kèm theo miễn phí:
            </span>
            <ul style={{ paddingLeft: "16px", margin: 0, display: "grid", gap: "6px", color: "#555" }}>
              <li>Template Notion/PDF Nhật Ký Bản Dạng (500k)</li>
              <li>Audio Dẫn Thiền Xóa Bỏ Neo Tiêu Cực (700k)</li>
              <li>Cẩm Nang 4 Hormone Sinh Học Tự Nhiên (400k)</li>
              <li>1 Buổi Group Q&A trực tiếp cùng Đạt</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ background: "#FFFFFF", color: "#272727", minHeight: "100vh", fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#FFFFFF", borderBottom: "1px solid #EAEAEA", padding: "16px 20px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#1C1C1C", textDecoration: "none", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
            IDENTITY DESIGN™
          </Link>
          <span style={{ color: "#797F97", fontSize: "13px", fontWeight: 600 }}>
            🔒 Trang Thanh Toán An Toàn
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#797F97" }}>Đang tải trang thanh toán...</div>}>
        <CheckoutFormContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#F8F9FA", color: "#797F97", padding: "30px 20px", fontSize: "12px", borderTop: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <span>© 2026 IDENTITY DESIGN™. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
