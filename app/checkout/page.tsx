"use me";
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
        <h1 style={{ fontSize: "clamp(24px, 4.5vw, 36px)", margin: "8px 0 10px", color: "#FFFFFF", fontWeight: 800, letterSpacing: "-0.02em" }}>
          Hoàn tất đăng ký IDENTITY DESIGN™ (2026)
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
          Nhập thông tin nhận tài khoản bên dưới để hệ thống tạo đơn hàng và tạo mã VietQR SePAY cho bạn.
        </p>
      </div>

      {/* TWO COLUMN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "24px", alignItems: "start" }}>
        
        {/* COLUMN 1: FORM */}
        <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "28px 24px", boxSizing: "border-box" }}>
          
          <h2 style={{ fontSize: "15px", color: "#FFFFFF", margin: "0 0 20px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            1. Thông tin khách hàng
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            
            <div>
              <label style={{ display: "block", color: "#CBD5E1", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Họ và Tên của bạn *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#FFFFFF", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#CBD5E1", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Số điện thoại (Dùng Zalo hỗ trợ) *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Ví dụ: 0912345678"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#FFFFFF", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#CBD5E1", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Địa chỉ Email nhận bài học *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ví dụ: email@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#08090A", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "6px", color: "#FFFFFF", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            {/* ORDER BUMP SECTION */}
            <div style={{ marginTop: "8px", background: "rgba(232, 122, 62, 0.08)", border: "1px solid rgba(232, 122, 62, 0.3)", padding: "16px", borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "start", gap: "12px", cursor: "pointer" }} onClick={() => setIncludeBump(!includeBump)}>
                <input
                  type="checkbox"
                  id="bumpCheckbox"
                  checked={includeBump}
                  onChange={(e) => setIncludeBump(e.target.checked)}
                  style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "#E87A3E", cursor: "pointer" }}
                />
                <div>
                  <label htmlFor="bumpCheckbox" style={{ color: "#FFFFFF", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "block", marginBottom: "4px", lineHeight: 1.4 }}>
                    ⚡ CÓ! THÊM BỘ AUDIO DẪN THIỀN NẠP PIN & RESET NÃO BỘ 3 PHÚT — CHỈ +199.000Đ
                  </label>
                  <div style={{ background: "rgba(255, 255, 255, 0.1)", color: "#FDBA74", fontSize: "11px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                    TIẾT KIỆM 75% (GIÁ GỐC 790.000Đ)
                  </div>
                  <p style={{ color: "#94A3B8", fontSize: "13px", lineHeight: 1.55, margin: 0 }}>
                    Nghe trực tiếp trên điện thoại bất cứ khi nào bạn cảm thấy quá tải hoặc lo âu. Giúp lập tức làm dịu hệ thần kinh và đưa não bộ về trạng thái tỉnh thức, minh mẫn chỉ sau 180 giây.
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
                padding: "16px 20px",
                background: isSubmitting ? "#475569" : "#FFFFFF",
                color: "#08090A",
                border: "none",
                borderRadius: "4px",
                fontWeight: 800,
                fontSize: "15px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)",
                marginTop: "8px",
                letterSpacing: "-0.01em",
              }}
            >
              {isSubmitting ? "ĐANG TẠO MÃ THANH TOÁN..." : `HOÀN TẤT & TẠO MÃ QR SEPAY (${formatVND(totalPrice)}) →`}
            </button>

            <div style={{ textAlign: "center", color: "#64748B", fontSize: "12px", lineHeight: 1.5 }}>
              🛡️ Cam kết hoàn tiền 100% trong 14 ngày nếu chương trình không hiệu quả.
            </div>

          </form>

        </div>

        {/* COLUMN 2: ORDER SUMMARY */}
        <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "12px", padding: "28px 24px", boxSizing: "border-box" }}>
          
          <h2 style={{ fontSize: "15px", color: "#FFFFFF", margin: "0 0 18px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Tóm tắt đơn hàng
          </h2>

          <div style={{ display: "grid", gap: "14px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <strong style={{ color: "#FFFFFF", fontSize: "15px", display: "block" }}>
                  Chương trình IDENTITY DESIGN™ (2026)
                </strong>
                <span style={{ color: "#64748B", fontSize: "12px" }}>
                  Lộ trình 4 học phần + Action-Sheets 21 ngày + Truy cập trọn đời
                </span>
              </div>
              <span style={{ color: "#FFFFFF", fontWeight: 800, whiteSpace: "nowrap", marginLeft: "8px" }}>1.499.000đ</span>
            </div>

            {includeBump && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", background: "rgba(255, 255, 255, 0.03)", padding: "10px 12px", borderRadius: "6px" }}>
                <div>
                  <strong style={{ color: "#FDBA74", fontSize: "13px", display: "block" }}>
                    ⚡ Audio Dẫn Thiền Nạp Pin 3 Phút (Order Bump)
                  </strong>
                  <span style={{ color: "#64748B", fontSize: "12px" }}>
                    Tài liệu Audio MP3 độc quyền kích hoạt tức thì
                  </span>
                </div>
                <span style={{ color: "#FDBA74", fontWeight: 800, whiteSpace: "nowrap", marginLeft: "8px" }}>+199.000đ</span>
              </div>
            )}
          </div>

          {/* INCLUDED BONUSES LIST */}
          <div style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>
            ĐÃ BAO GỒM 4 PHẦN QUÀ TẶNG (MIỄN PHÍ):
          </div>

          <div style={{ display: "grid", gap: "10px", fontSize: "13px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8" }}>
              <span>1. Template Nhật Ký Cài Đặt Bản Dạng 21 Ngày</span>
              <span style={{ textDecoration: "line-through", color: "#475569", marginLeft: "6px" }}>500.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8" }}>
              <span>2. Audio Dẫn Thiền Xóa Bỏ Neo Cảm Xúc Tiêu Cực</span>
              <span style={{ textDecoration: "line-through", color: "#475569", marginLeft: "6px" }}>700.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8" }}>
              <span>3. Cẩm Nang Điều Chỉnh 4 Hormone Sinh Học</span>
              <span style={{ textDecoration: "line-through", color: "#475569", marginLeft: "6px" }}>400.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#CBD5E1" }}>
              <span>4. 1 Buổi Group Q&A trực tiếp cùng Đạt</span>
              <span style={{ color: "#10B981", fontWeight: 700, marginLeft: "6px" }}>MIỄN PHÍ</span>
            </div>
          </div>

          {/* TOTAL PRICE BREAKDOWN */}
          <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#64748B", fontSize: "13px" }}>
              <span>Tổng giá trị thực tế:</span>
              <span style={{ textDecoration: "line-through" }}>{includeBump ? "4.699.000đ" : "4.500.000đ"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#94A3B8", fontSize: "13px" }}>
              <span>Ưu đãi áp dụng hôm nay:</span>
              <span>-3.001.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "12px", marginTop: "4px" }}>
              <strong style={{ color: "#FFFFFF", fontSize: "15px" }}>TỔNG THANH TOÁN:</strong>
              <strong style={{ color: "#FFFFFF", fontSize: "24px", fontWeight: 900 }}>{formatVND(totalPrice)}</strong>
            </div>
          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "14px", borderRadius: "8px", fontSize: "12px", color: "#64748B", lineHeight: 1.55 }}>
            <strong style={{ color: "#CBD5E1", display: "block", marginBottom: "4px" }}>💡 Hướng dẫn bước tiếp theo:</strong>
            Điền thông tin và bấm nút hoàn tất để tạo mã QR VietQR OCB quét thanh toán tự động qua SePAY.
          </div>

        </div>

      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ background: "#08090A", color: "#E2E8F0", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header style={{ background: "#060708", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", padding: "14px 20px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FFFFFF", textDecoration: "none", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
            IDENTITY DESIGN™
          </Link>
          <span style={{ border: "1px solid rgba(255, 255, 255, 0.15)", background: "rgba(255, 255, 255, 0.04)", color: "#94A3B8", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>
            🔒 256-BIT ENCRYPTION
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>Đang tải trang đặt hàng...</div>}>
        <CheckoutFormContent />
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
