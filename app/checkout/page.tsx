"use me";
"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

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

  const basePrice = 497000;
  const bumpPrice = 99000;
  const totalPrice = basePrice + (includeBump ? bumpPrice : 0);

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

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
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "24px 14px 60px", boxSizing: "border-box" }}>
      
      {/* TOP BANNER */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <span style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          BƯỚC 1/2: ĐIỀN THÔNG TIN ĐĂNG KÝ
        </span>
        <h1 style={{ fontSize: "clamp(22px, 5.5vw, 36px)", margin: "6px 0 10px", color: "#F5F2E9", fontWeight: 900, lineHeight: 1.3 }}>
          HOÀN TẤT ĐĂNG KÝ NON-SMOKER™ (2026)
        </h1>
        <p style={{ color: "#A9B2AC", fontSize: "15px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.55 }}>
          Nhập thông tin nhận tài khoản bên dưới để hệ thống tạo đơn hàng và tạo mã VietQR SePAY cho bạn.
        </p>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "24px", alignItems: "start" }}>
        
        {/* COLUMN 1: FORM */}
        <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "16px", padding: "24px 18px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)", boxSizing: "border-box" }}>
          
          <h2 style={{ fontSize: "18px", color: "#D96732", margin: "0 0 18px", fontWeight: 800, textTransform: "uppercase" }}>
            1. THÔNG TIN KHÁCH HÀNG
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            
            <div>
              <label style={{ display: "block", color: "#F5F2E9", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
                Họ và Tên của bạn *
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Ví dụ: Nguyễn Văn A"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "16px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#F5F2E9", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
                Số điện thoại (Dùng Zalo hỗ trợ) *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Ví dụ: 0912345678"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "16px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#F5F2E9", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>
                Địa chỉ Email nhận bài học *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ví dụ: email@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "16px", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            {/* ORDER BUMP SECTION */}
            <div style={{ marginTop: "8px", background: "rgba(217, 103, 50, 0.12)", border: "2px dashed #D96732", padding: "16px", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "start", gap: "10px", cursor: "pointer" }} onClick={() => setIncludeBump(!includeBump)}>
                <input
                  type="checkbox"
                  id="bumpCheckbox"
                  checked={includeBump}
                  onChange={(e) => setIncludeBump(e.target.checked)}
                  style={{ width: "20px", height: "20px", marginTop: "2px", accentColor: "#D96732", cursor: "pointer" }}
                />
                <div>
                  <label htmlFor="bumpCheckbox" style={{ color: "#FAD08B", fontWeight: 900, fontSize: "14px", cursor: "pointer", display: "block", marginBottom: "4px", lineHeight: 1.4 }}>
                    ⚡ CÓ! THÊM BỘ AUDIO SƠ CỨU CƠN THÈM THUỐC 3 PHÚT (VẠN NĂNG) — CHỈ +99.000Đ
                  </label>
                  <div style={{ background: "#D96732", color: "white", fontSize: "11px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px", display: "inline-block", marginBottom: "6px" }}>
                    TIẾT KIỆM 80% (GIÁ GỐC 490.000Đ)
                  </div>
                  <p style={{ color: "#D5DFDB", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
                    Nghe trực tiếp trên điện thoại bất cứ khi nào cơn thèm xuất hiện đột ngột (khi cà phê, sau ăn, khi nhậu). Giúp bạn ngay lập tức làm dịu hệ thần kinh và vượt qua cơn thèm trong 180 giây mà không cần dùng ý chí.
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
                background: isSubmitting ? "#74766F" : "#D96732",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 900,
                fontSize: "clamp(14px, 4vw, 17px)",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "0 10px 30px rgba(217,103,50,0.4)",
                marginTop: "10px",
                textTransform: "uppercase",
                lineHeight: 1.4,
              }}
            >
              {isSubmitting ? "ĐANG TẠO MÃ THANH TOÁN..." : `HOÀN TẤT ĐẶT HÀNG & TẠO MÃ THANH TOÁN QR (${formatVND(totalPrice)}) →`}
            </button>

            <div style={{ textAlign: "center", color: "#A9B2AC", fontSize: "12px", lineHeight: 1.5 }}>
              🛡️ Cam kết hoàn tiền 100% nếu chương trình không phù hợp với bạn.<br />
              Bấm nút trên để tạo mã QR VietQR OCB thanh toán tự động qua SePAY.
            </div>

          </form>

        </div>

        {/* COLUMN 2: ORDER SUMMARY */}
        <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "24px 18px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)", boxSizing: "border-box" }}>
          
          <h2 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 16px", fontWeight: 800, textTransform: "uppercase" }}>
            TÓM TẮT ĐƠN HÀNG
          </h2>

          <div style={{ display: "grid", gap: "14px", borderBottom: "1px solid #384238", paddingBottom: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "15px", display: "block" }}>
                  Chương trình NON-SMOKER™ (2026)
                </strong>
                <span style={{ color: "#A9B2AC", fontSize: "12px" }}>
                  Lộ trình 3 nền tảng + Video bài học online + Truy cập lâu dài
                </span>
              </div>
              <span style={{ color: "#FAD08B", fontWeight: 800, whiteSpace: "nowrap", marginLeft: "8px" }}>497.000đ</span>
            </div>

            {includeBump && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", background: "rgba(217,103,50,0.1)", padding: "10px 12px", borderRadius: "6px", borderLeft: "3px solid #D96732" }}>
                <div>
                  <strong style={{ color: "#FAD08B", fontSize: "13px", display: "block" }}>
                    ⚡ Audio Sơ Cứu Cơn Thèm 3 Phút (Order Bump)
                  </strong>
                  <span style={{ color: "#A9B2AC", fontSize: "12px" }}>
                    Tài liệu Audio MP3 độc quyền kích hoạt tức thì
                  </span>
                </div>
                <span style={{ color: "#FAD08B", fontWeight: 800, whiteSpace: "nowrap", marginLeft: "8px" }}>+99.000đ</span>
              </div>
            )}
          </div>

          {/* INCLUDED BONUSES LIST */}
          <h3 style={{ fontSize: "14px", color: "#D96732", margin: "0 0 10px", fontWeight: 800, textTransform: "uppercase" }}>
            🎁 ĐÃ BAO GỒM 3 BỘ QUÀ TẶNG (MIỄN PHÍ):
          </h3>

          <div style={{ display: "grid", gap: "10px", fontSize: "13px", borderBottom: "1px solid #384238", paddingBottom: "16px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
              <span>1. Bộ Nhật Ký Quan Sát Vòng Lặp Hút Thuốc™</span>
              <span style={{ textDecoration: "line-through", color: "#74766F", marginLeft: "6px" }}>990.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
              <span>2. Hệ Thống Xử Lý Cơn Thèm Trong Thực Tế™</span>
              <span style={{ textDecoration: "line-through", color: "#74766F", marginLeft: "6px" }}>1.500.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
              <span>3. Bộ Thiết Kế Lối Sống Không Thuốc Lá™</span>
              <span style={{ textDecoration: "line-through", color: "#74766F", marginLeft: "6px" }}>2.100.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
              <span>4. Quyền lợi: Cộng đồng hỗ trợ & Cập nhật miễn phí</span>
              <span style={{ color: "#66735B", fontWeight: 800, marginLeft: "6px" }}>MIỄN PHÍ</span>
            </div>
          </div>

          {/* TOTAL PRICE BREAKDOWN */}
          <div style={{ display: "grid", gap: "8px", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#A9B2AC", fontSize: "13px" }}>
              <span>Tổng giá trị thực tế:</span>
              <span style={{ textDecoration: "line-through" }}>{includeBump ? "5.577.000đ" : "5.087.000đ"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#FAD08B", fontSize: "14px", fontWeight: 700 }}>
              <span>Ưu đãi áp dụng hôm nay:</span>
              <span>-4.590.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #D96732", paddingTop: "12px", marginTop: "4px" }}>
              <strong style={{ color: "#F5F2E9", fontSize: "16px" }}>TỔNG THANH TOÁN:</strong>
              <strong style={{ color: "#D96732", fontSize: "24px", fontWeight: 900 }}>{formatVND(totalPrice)}</strong>
            </div>
          </div>

          <div style={{ background: "#171A18", padding: "14px", borderRadius: "10px", fontSize: "12px", color: "#A9B2AC", lineHeight: 1.55 }}>
            <strong style={{ color: "#F5F2E9", display: "block", marginBottom: "4px" }}>💡 Hướng dẫn bước tiếp theo:</strong>
            Điền thông tin và bấm nút &quot;Hoàn tất đặt hàng&quot;. Hệ thống sẽ chuyển sang trang mã QR VietQR OCB để bạn quét thanh toán tự động.
          </div>

        </div>

      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div style={{ background: "#171A18", color: "#F5F2E9", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* HEADER BAR */}
      <header style={{ background: "#111311", borderBottom: "1px solid #384238", padding: "14px 16px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FAD08B", textDecoration: "none", fontWeight: 900, fontSize: "17px", letterSpacing: "0.05em" }}>
            NON-SMOKER™
          </Link>
          <span style={{ background: "rgba(217,103,50,0.15)", border: "1px solid #D96732", color: "#FAD08B", fontSize: "11px", fontWeight: 800, padding: "4px 8px", borderRadius: "4px" }}>
            🔒 ĐẶT HÀNG AN TOÀN & BẢO MẬT
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#A9B2AC" }}>Đang tải trang đặt hàng...</div>}>
        <CheckoutFormContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "24px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "6px 0" }}>
            Hệ thống đặt hàng và thanh toán tự động qua SePAY.
          </p>
          <span>© 2026 NON-SMOKER™. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
