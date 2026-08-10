"use me";
"use client";

import React, { useState, useEffect, Suspense } from "react";
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
  const [isSepayPaid, setIsSepayPaid] = useState(false);
  const [pgFormState, setPgFormState] = useState<{ checkoutURL: string; fields: Record<string, string> } | null>(null);

  const basePrice = 497000;
  const bumpPrice = 99000;
  const totalPrice = basePrice + (includeBump ? bumpPrice : 0);

  const cleanPhone = formData.phone.replace(/\D/g, "") || "0912345678";
  const sepayMemo = `NONSMOKER${cleanPhone}`;
  
  // SePAY Dynamic VietQR URL (OCB - Ngân hàng Phương Đông)
  const ocbAccountNumber = process.env.NEXT_PUBLIC_SEPAY_ACC_NUMBER || "0004100000000";
  const sepayQrUrl = `https://qr.sepay.vn/img?acc=${ocbAccountNumber}&bank=OCB&amount=${totalPrice}&des=${sepayMemo}`;
  const vietqrFallbackUrl = `https://img.vietqr.io/image/OCB-${ocbAccountNumber}-compact2.png?amount=${totalPrice}&addInfo=${sepayMemo}&accountName=NGUYEN%20QUOC%20DAT`;

  const formatVND = (num: number) => {
    return num.toLocaleString("vi-VN") + "đ";
  };

  const isPolling = Boolean(formData.phone && !isSepayPaid);

  // Real-time SePAY Payment Polling Effect
  useEffect(() => {
    if (!formData.phone || isSepayPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/check-payment?phone=${encodeURIComponent(formData.phone)}`);
        const data = await res.json();

        if (data && data.paid) {
          setIsSepayPaid(true);
          clearInterval(interval);
          
          // Auto-redirect to Thank You page upon SePAY payment verification
          const query = new URLSearchParams({
            name: formData.fullName || "Học viên",
            phone: formData.phone,
            email: formData.email,
            hasBump: includeBump ? "true" : "false",
            total: totalPrice.toString(),
            sepayPaid: "true",
          }).toString();

          setTimeout(() => {
            router.push(`/thank-you?${query}`);
          }, 1200);
        }
      } catch (err) {
        console.error("SePAY polling check error:", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [formData.phone, formData.fullName, formData.email, includeBump, totalPrice, isSepayPaid, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // SePAY PG Form Redirect Handler
  const handleSepayPgRedirect = async () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      alert("Vui lòng nhập đầy đủ Họ tên, Số điện thoại và Email.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/sepay-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalPrice,
          phone: formData.phone,
          name: formData.fullName,
          email: formData.email,
          hasBump: includeBump,
        }),
      });

      const data = await res.json();
      if (data && data.success && data.fields) {
        setPgFormState({
          checkoutURL: data.checkoutURL,
          fields: data.fields,
        });

        // Submit form after render
        setTimeout(() => {
          const formElement = document.getElementById("sepayPgForm") as HTMLFormElement;
          if (formElement) {
            formElement.submit();
          }
        }, 100);
      }
    } catch (err) {
      console.error("SePAY PG Init Error:", err);
      setIsSubmitting(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!formData.phone) {
      alert("Vui lòng nhập Số điện thoại trước khi bấm test giả lập thanh toán.");
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(`/api/check-payment?phone=${encodeURIComponent(formData.phone)}&simulate=true`);
      setIsSepayPaid(true);
      
      const query = new URLSearchParams({
        name: formData.fullName || "Học viên Test",
        phone: formData.phone,
        email: formData.email,
        hasBump: includeBump ? "true" : "false",
        total: totalPrice.toString(),
        sepayPaid: "true",
      }).toString();

      setTimeout(() => {
        router.push(`/thank-you?${query}`);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
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
      router.push(`/thank-you?${query}`);
    }, 600);
  };

  return (
    <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "40px 20px 80px" }}>
      
      {/* TOP BANNER */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          CỔNG THANH TOÁN TỰ ĐỘNG SEPAY
        </span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", margin: "8px 0 12px", color: "#F5F2E9", fontWeight: 900 }}>
          HOÀN TẤT ĐĂNG KÝ NON-SMOKER™ (2026)
        </h1>
        <p style={{ color: "#A9B2AC", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
          Quét mã VietQR SePAY bên dưới để thanh toán tự động hoặc bấm chuyển hướng cổng thanh toán SePAY PG.
        </p>
      </div>

      {/* TWO COLUMN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>
        
        {/* COLUMN 1: FORM & SEPAY QR PAYMENT */}
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

            {/* ORDER BUMP SECTION (HIGH CONVERTING 1-CLICK ADD-ON) */}
            <div style={{ marginTop: "10px", background: "rgba(217, 103, 50, 0.12)", border: "2px dashed #D96732", padding: "20px", borderRadius: "12px" }}>
              <div style={{ display: "flex", alignItems: "start", gap: "12px", cursor: "pointer" }} onClick={() => setIncludeBump(!includeBump)}>
                <input
                  type="checkbox"
                  id="bumpCheckbox"
                  checked={includeBump}
                  onChange={(e) => setIncludeBump(e.target.checked)}
                  style={{ width: "20px", height: "20px", marginTop: "2px", accentColor: "#D96732", cursor: "pointer" }}
                />
                <div>
                  <label htmlFor="bumpCheckbox" style={{ color: "#FAD08B", fontWeight: 900, fontSize: "15px", cursor: "pointer", display: "block", marginBottom: "4px" }}>
                    ⚡ CÓ! THÊM BỘ AUDIO SƠ CỨU CƠN THÈM THUỐC 3 PHÚT (VẠN NĂNG) — CHỈ +99.000Đ
                  </label>
                  <div style={{ background: "#D96732", color: "white", fontSize: "11px", fontWeight: 800, padding: "2px 8px", borderRadius: "4px", display: "inline-block", marginBottom: "8px" }}>
                    TIẾT KIỆM 80% (GIÁ GỐC 490.000Đ)
                  </div>
                  <p style={{ color: "#D5DFDB", fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
                    Nghe trực tiếp trên điện thoại bất cứ khi nào cơn thèm xuất hiện đột ngột (khi cà phê, sau ăn, khi nhậu). Giúp bạn ngay lập tức làm dịu hệ thần kinh và vượt qua cơn thèm trong 180 giây mà không cần dùng ý chí.
                  </p>
                </div>
              </div>
            </div>

            {/* SEPAY AUTOMATED VIETQR PAYMENT CARD */}
            <div style={{ marginTop: "12px" }}>
              <h2 style={{ fontSize: "20px", color: "#D96732", margin: "0 0 16px", fontWeight: 800, textTransform: "uppercase" }}>
                2. QUÉT MÃ SEPAY VIETQR THANH TOÁN
              </h2>

              <div style={{ background: "#171A18", border: "2px solid #D96732", padding: "24px", borderRadius: "14px", textAlign: "center" }}>
                
                {/* SEPAY STATUS BADGE */}
                <div style={{ background: isSepayPaid ? "rgba(102, 115, 91, 0.3)" : "rgba(217, 103, 50, 0.15)", border: `1px solid ${isSepayPaid ? "#66735B" : "#D96732"}`, color: isSepayPaid ? "#FAD08B" : "#FAD08B", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <span>{isSepayPaid ? "🟢" : "🔴"}</span>
                  <span>
                    {isSepayPaid
                      ? "ĐÃ NHẬN THANH TOÁN THÀNH CÔNG QUA SEPAY! ĐANG CHUYỂN HƯỚNG..."
                      : isPolling
                      ? "Đang chờ SePAY nhận tiền... Hệ thống tự động kiểm tra mỗi 3 giây"
                      : "Nhập số điện thoại để kích hoạt kiểm tra tự động"}
                  </span>
                </div>

                {/* DYNAMIC SEPAY QR IMAGE */}
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                  <img
                    src={sepayQrUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = vietqrFallbackUrl;
                    }}
                    alt="Mã QR SePAY Chuyển Khoản Tự Động"
                    style={{
                      maxWidth: "280px",
                      width: "100%",
                      borderRadius: "12px",
                      border: "2px solid #384238",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  />
                </div>

                {/* BANK TRANSFER DETAILS TABLE */}
                <div style={{ background: "#111311", border: "1px dashed #384238", padding: "16px", borderRadius: "10px", display: "grid", gap: "8px", fontSize: "14px", textAlign: "left" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Ngân hàng:</span>
                    <strong style={{ color: "#F5F2E9" }}>Phương Đông (OCB)</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Số tài khoản:</span>
                    <strong style={{ color: "#FAD08B", fontSize: "16px" }}>{ocbAccountNumber}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Chủ tài khoản:</span>
                    <strong style={{ color: "#F5F2E9" }}>NGUYỄN QUỐC ĐẠT</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#A9B2AC" }}>Số tiền:</span>
                    <strong style={{ color: "#D96732", fontSize: "20px", fontWeight: 900 }}>{formatVND(totalPrice)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #2B332B", paddingTop: "8px", marginTop: "4px" }}>
                    <span style={{ color: "#A9B2AC" }}>Nội dung CK chuẩn SePAY:</span>
                    <strong style={{ color: "#FAD08B", fontSize: "15px" }}>{sepayMemo}</strong>
                  </div>
                </div>

              </div>
            </div>

            {/* SUBMIT BUTTON 1: DIRECT CONFIRM */}
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
              {isSubmitting ? "ĐANG XỬ LÝ ĐƠN HÀNG..." : `✔ ĐÃ CHUYỂN KHOẢN ${formatVND(totalPrice)} — VÀO HỌC NGAY`}
            </button>

            {/* SUBMIT BUTTON 2: OFFICIAL SEPAY PG GATEWAY REDIRECT FORM */}
            <button
              type="button"
              onClick={handleSepayPgRedirect}
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "14px 20px",
                background: "#0068FF",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 800,
                fontSize: "15px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                marginTop: "8px",
                textTransform: "uppercase",
                boxShadow: "0 8px 20px rgba(0,104,255,0.3)",
              }}
            >
              💳 THANH TOÁN QUA CỔNG SEPAY PG GATEWAY (SẼ CHUYỂN TRANG)
            </button>

            {/* SANDBOX SEPAY SIMULATION TEST BUTTON */}
            <button
              type="button"
              onClick={handleSimulatePayment}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#252B25",
                color: "#FAD08B",
                border: "1px dashed #D96732",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              ⚡ BẤM ĐÂY ĐỂ SIMULATE TEST SEPAY THANH TOÁN THÀNH CÔNG (SANDBOX)
            </button>

            <div style={{ textAlign: "center", color: "#A9B2AC", fontSize: "12px", lineHeight: 1.5 }}>
              🛡️ Cam kết hoàn tiền 100% nếu chương trình không phù hợp với bạn.<br />
              Hệ thống tự động xác nhận qua SePAY Webhook API.
            </div>

          </form>

          {/* HIDDEN SEPAY PG GATEWAY FORM */}
          {pgFormState && (
            <form id="sepayPgForm" action={pgFormState.checkoutURL} method="POST" style={{ display: "none" }}>
              {Object.keys(pgFormState.fields).map((field) => (
                <input key={field} type="hidden" name={field} value={pgFormState.fields[field]} />
              ))}
            </form>
          )}

        </div>

        {/* COLUMN 2: ORDER SUMMARY */}
        <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "36px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
          
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

            {includeBump && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", background: "rgba(217,103,50,0.1)", padding: "10px 12px", borderRadius: "6px", borderLeft: "3px solid #D96732" }}>
                <div>
                  <strong style={{ color: "#FAD08B", fontSize: "14px", display: "block" }}>
                    ⚡ Audio Sơ Cứu Cơn Thèm 3 Phút (Order Bump)
                  </strong>
                  <span style={{ color: "#A9B2AC", fontSize: "12px" }}>
                    Tài liệu Audio MP3 độc quyền kích hoạt tức thì
                  </span>
                </div>
                <span style={{ color: "#FAD08B", fontWeight: 800, whiteSpace: "nowrap" }}>+99.000đ</span>
              </div>
            )}
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
              <span style={{ textDecoration: "line-through" }}>{includeBump ? "5.577.000đ" : "5.087.000đ"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#FAD08B", fontSize: "15px", fontWeight: 700 }}>
              <span>Ưu đãi áp dụng hôm nay:</span>
              <span>-4.590.000đ</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #D96732", paddingTop: "14px", marginTop: "4px" }}>
              <strong style={{ color: "#F5F2E9", fontSize: "18px" }}>TỔNG THANH TOÁN:</strong>
              <strong style={{ color: "#D96732", fontSize: "28px", fontWeight: 900 }}>{formatVND(totalPrice)}</strong>
            </div>
          </div>

          <div style={{ background: "#171A18", padding: "16px", borderRadius: "10px", fontSize: "13px", color: "#A9B2AC", lineHeight: 1.6 }}>
            <strong style={{ color: "#F5F2E9", display: "block", marginBottom: "4px" }}>💡 Hướng dẫn nhận tài khoản:</strong>
            Mở ứng dụng ngân hàng quét mã QR bên cạnh hoặc chọn cổng SePAY PG. Sau khi thanh toán, hệ thống sẽ tự động gửi Email kích hoạt tài khoản và chuyển hướng bạn sang trang kích hoạt.
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
      <header style={{ background: "#111311", borderBottom: "1px solid #384238", padding: "16px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#FAD08B", textDecoration: "none", fontWeight: 900, fontSize: "18px", letterSpacing: "0.05em" }}>
            NON-SMOKER™
          </Link>
          <span style={{ background: "rgba(217,103,50,0.15)", border: "1px solid #D96732", color: "#FAD08B", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>
            🔒 ĐÃ TÍCH HỢP SEPAY AUTOMATED VIETQR & SEPAY PG
          </span>
        </div>
      </header>

      <Suspense fallback={<div style={{ textAlign: "center", padding: "60px 20px", color: "#A9B2AC" }}>Đang tải thông tin thanh toán SePAY...</div>}>
        <CheckoutFormContent />
      </Suspense>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "30px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "8px 0" }}>
            Cổng thanh toán tự động SePAY. Tự động xác nhận giao dịch ngân hàng 24/7.
          </p>
          <span>© 2026 NON-SMOKER™. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
