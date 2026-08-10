"use me";
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    paymentMethod: "vietqr",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Redirect to Thank You page with params
    const query = new URLSearchParams({
      name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
    }).toString();

    setTimeout(() => {
      router.push(`/thank-you?${query}`);
    }, 600);
  };

  return (
    <div style={{ background: "#171A18", color: "#F5F2E9", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* HEADER BAR */}
      <header style={{ background: "#111311", borderBottom: "1px solid #384238", padding: "16px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FAD08B", textDecoration: "none", fontWeight: 900, fontSize: "18px", letterSpacing: "0.05em" }}>
            NON-SMOKER™
          </Link>
          <span style={{ background: "rgba(217,103,50,0.15)", border: "1px solid #D96732", color: "#FAD08B", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>
            🔒 THANH TOÁN BẢO MẬT 256-BIT
          </span>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main style={{ maxWidth: "1040px", margin: "0 auto", padding: "40px 20px 80px" }}>
        
        {/* TOP BANNER */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            XÁC NHẬN ĐĂNG KÝ HỌC
          </span>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", margin: "8px 0 12px", color: "#F5F2E9", fontWeight: 900 }}>
            HOÀN TẤT ĐĂNG KÝ NON-SMOKER™ (2026)
          </h1>
          <p style={{ color: "#A9B2AC", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
            Điền thông tin bên dưới để nhận tài khoản kích hoạt và toàn bộ bộ quà tặng đính kèm ngay lập tức.
          </p>
        </div>

        {/* TWO COLUMN LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>
          
          {/* COLUMN 1: FORM & PAYMENT INFO */}
          <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "16px", padding: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            
            <h2 style={{ fontSize: "20px", color: "#D96732", margin: "0 0 20px", fontWeight: 800, textTransform: "uppercase" }}>
              1. THÔNG TIN KHÁCH HÀNG
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
              
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
                  style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
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
                  style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
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
                  style={{ width: "100%", padding: "14px", background: "#171A18", border: "1px solid #384238", borderRadius: "8px", color: "#F5F2E9", fontSize: "15px", boxSizing: "border-box", outline: "none" }}
                />
              </div>

              {/* PAYMENT METHOD SELECTION */}
              <div style={{ marginTop: "12px" }}>
                <h2 style={{ fontSize: "20px", color: "#D96732", margin: "0 0 16px", fontWeight: 800, textTransform: "uppercase" }}>
                  2. PHƯƠNG THỨC THANH TOÁN
                </h2>

                <div style={{ background: "#171A18", border: "2px solid #D96732", padding: "18px", borderRadius: "10px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "20px" }}>🏦</span>
                    <strong style={{ color: "#FAD08B", fontSize: "16px" }}>Chuyển Khoản Ngân Hàng Quick QR (VietQR)</strong>
                  </div>
                  <p style={{ color: "#A9B2AC", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>
                    Mở ứng dụng ngân hàng quét mã QR để thanh toán tự động hoặc chuyển khoản theo số tài khoản bên dưới.
                  </p>
                </div>

                {/* BANK ACCOUNT DETAILS CARD */}
                <div style={{ background: "#111311", border: "1px dashed #384238", padding: "20px", borderRadius: "10px", display: "grid", gap: "8px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Ngân hàng:</span>
                    <strong style={{ color: "#F5F2E9" }}>Techcombank (TCB)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Số tài khoản:</span>
                    <strong style={{ color: "#FAD08B", fontSize: "16px" }}>19036888888</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Chủ tài khoản:</span>
                    <strong style={{ color: "#F5F2E9" }}>NGUYỄN QUỐC ĐẠT</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Số tiền:</span>
                    <strong style={{ color: "#D96732", fontSize: "18px", fontWeight: 900 }}>497.000đ</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #2B332B", paddingTop: "8px", marginTop: "4px" }}>
                    <span style={{ color: "#A9B2AC" }}>Nội dung CK:</span>
                    <strong style={{ color: "#FAD08B" }}>NONSMOKER {formData.phone || "SĐT"}</strong>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "18px 24px",
                  background: isSubmitting ? "#74766F" : "#D96732",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 900,
                  fontSize: "17px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 10px 30px rgba(217,103,50,0.4)",
                  marginTop: "12px",
                  textTransform: "uppercase",
                }}
              >
                {isSubmitting ? "ĐANG XỬ LÝ ĐƠN HÀNG..." : "✔ XÁC NHẬN ĐĂNG KÝ & THANH TOÁN 497.000Đ"}
              </button>

              <div style={{ textAlign: "center", color: "#A9B2AC", fontSize: "12px", lineHeight: 1.5 }}>
                🛡️ Cam kết hoàn tiền 100% nếu chương trình không phù hợp với bạn.<br />
                Thông tin được bảo mật tuyệt đối.
              </div>

            </form>
          </div>

          {/* COLUMN 2: ORDER SUMMARY */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "32px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
            
            <h2 style={{ fontSize: "20px", color: "#FAD08B", margin: "0 0 20px", fontWeight: 800, textTransform: "uppercase" }}>
              TÓM TẮT ĐƠN HÀNG
            </h2>

            <div style={{ display: "grid", gap: "16px", borderBottom: "1px solid #384238", paddingBottom: "20px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <strong style={{ color: "#F5F2E9", fontSize: "16px", display: "block" }}>
                    Chương trình NON-SMOKER™ (2026)
                  </strong>
                  <span style={{ color: "#A9B2AC", fontSize: "13px" }}>
                    Lộ trình 3 nền tảng + Video bài học online + Truy cập lâu dài
                  </span>
                </div>
                <span style={{ color: "#FAD08B", fontWeight: 800, whiteSpace: "nowrap" }}>497.000đ</span>
              </div>
            </div>

            {/* INCLUDED BONUSES LIST */}
            <h3 style={{ fontSize: "15px", color: "#D96732", margin: "0 0 12px", fontWeight: 800, textTransform: "uppercase" }}>
              🎁 ĐÃ BAO GỒM 3 BỘ QUÀ TẶNG (MIỄN PHÍ):
            </h3>

            <div style={{ display: "grid", gap: "12px", fontSize: "14px", borderBottom: "1px solid #384238", paddingBottom: "20px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
                <span>1. Bộ Nhật Ký Quan Sát Vòng Lặp Hút Thuốc™</span>
                <span style={{ textDecoration: "line-through", color: "#74766F" }}>990.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
                <span>2. Hệ Thống Xử Lý Cơn Thèm Trong Thực Tế™</span>
                <span style={{ textDecoration: "line-through", color: "#74766F" }}>1.500.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
                <span>3. Bộ Thiết Kế Lối Sống Không Thuốc Lá™</span>
                <span style={{ textDecoration: "line-through", color: "#74766F" }}>2.100.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#D5DFDB" }}>
                <span>4. Quyền lợi: Cộng đồng hỗ trợ & Cập nhật miễn phí</span>
                <span style={{ color: "#66735B", fontWeight: 800 }}>MIỄN PHÍ</span>
              </div>
            </div>

            {/* TOTAL PRICE BREAKDOWN */}
            <div style={{ display: "grid", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#A9B2AC", fontSize: "14px" }}>
                <span>Tổng giá trị thực tế:</span>
                <span style={{ textDecoration: "line-through" }}>5.087.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#FAD08B", fontSize: "15px", fontWeight: 700 }}>
                <span>Ưu đãi áp dụng hôm nay:</span>
                <span>-4.590.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #D96732", paddingTop: "14px", marginTop: "4px" }}>
                <strong style={{ color: "#F5F2E9", fontSize: "18px" }}>TỔNG THANH TOÁN:</strong>
                <strong style={{ color: "#D96732", fontSize: "28px", fontWeight: 900 }}>497.000đ</strong>
              </div>
            </div>

            <div style={{ background: "#171A18", padding: "16px", borderRadius: "10px", fontSize: "13px", color: "#A9B2AC", lineHeight: 1.6 }}>
              <strong style={{ color: "#F5F2E9", display: "block", marginBottom: "4px" }}>💡 Hướng dẫn nhận tài khoản:</strong>
              Sau khi xác nhận thanh toán, hệ thống sẽ tự động gửi Email kích hoạt tài khoản kèm thông tin tham gia cộng đồng Zalo hỗ trợ trong vòng 5 phút.
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "30px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "8px 0" }}>
            Chương trình cung cấp nội dung giáo dục về hành vi, tác nhân và lối sống.
          </p>
          <span>© 2026 NON-SMOKER™. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
