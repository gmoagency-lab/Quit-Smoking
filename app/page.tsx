"use client";

import React, { useState, useEffect } from "react";
import * as fpixel from "../lib/fpixel";

const fourModules = [
  {
    num: "01",
    label: "HỌC PHẦN 1",
    title: "Giải phẫu Bức Tranh Tự Thân & Bẻ gãy Điểm Nghẽn Căn Tính",
    desc: "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn. Xóa bỏ Hội chứng kẻ giả mạo và dọn sạch tiếng nói chỉ trích bên trong.",
    bullets: [
      "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn",
      "Xóa bỏ Hội chứng kẻ giả mạo (Imposter Syndrome) và dọn sạch tiếng nói tự phán xét",
      "Bẻ gãy neo cảm xúc tiêu cực và sự tự ti tích tụ trong quá khứ",
    ],
  },
  {
    num: "02",
    label: "HỌC PHẦN 2",
    title: "Reset Sinh Học & Kích Hoạt 4 Loại Năng Lượng",
    desc: "Làm chủ Thể chất – Tinh thần – Cảm xúc – Ý nghĩa để chấm dứt tình trạng dậy lờ đờ, mất tập trung. Thiết lập nhịp sinh học tự nhiên: ngủ sâu, dậy tỉnh táo trước 7h sáng không cần báo thức.",
    bullets: [
      "Làm chủ 4 loại năng lượng: Thể chất – Tinh thần – Cảm xúc – Ý nghĩa",
      "Chấm dứt hoàn toàn tình trạng dậy lờ đờ, sụt pin buổi chiều và kiệt sức mãn tính",
      "Thiết lập nhịp sinh học tự nhiên: Ngủ sâu, tự động dậy trước 7h sáng tràn trề sinh lực",
    ],
  },
  {
    num: "03",
    label: "HỌC PHẦN 3",
    title: "Công Thức Dịch Chuyển Căn Tính (Identity Shifting Protocol)",
    desc: "Phương pháp thay đổi niềm tin cốt lõi chỉ bằng kỹ thuật tái định hình danh xưng. Quy trình khóa chặt bản dạng mới vào tiềm thức thông qua cấu trúc nhật ký 21 ngày.",
    bullets: [
      "Phương pháp thay đổi niềm tin cốt lõi bằng kỹ thuật tái định hình danh xưng",
      "Dạy cho tiềm thức tin rằng việc bứt phá và kỷ luật là điều hoàn toàn hiển nhiên",
      "Quy trình khóa chặt bản dạng mới vào tiềm thức qua cấu trúc nhật ký 21 ngày",
    ],
  },
  {
    num: "04",
    label: "HỌC PHẦN 4",
    title: "Thiết Kế Trạng Thái Dòng Chảy & Hành Động Không Ma Sát",
    desc: "Kỹ thuật bước vào phiên làm việc sâu (Deep Work) 2–3 tiếng liên tục với hiệu suất gấp 3–5 lần bình thường. Chuyển hóa nội lực vững vàng thành kết quả tài chính, công việc và sự an tâm.",
    bullets: [
      "Kỹ thuật bước vào trạng thái dòng chảy (Flow State) 2–3 tiếng làm việc sâu mỗi ngày",
      "Xóa sạch ma sát tâm lý và thói quen trì hoãn: Thấy việc là làm ngay dứt khoát",
      "Chuyển hóa nội lực vững vàng thành kết quả tài chính, sự nghiệp và cuộc sống tự do",
    ],
  },
];

const testimonials = [
  {
    name: "Chị Đinh Mai",
    role: "Học viên Coaching Chuyển Hóa",
    quote:
      "Buổi làm việc với anh Đạt vượt ngoài kỳ vọng của em. Em tưởng chỉ giới thiệu thông thường, ai ngờ như một buổi chữa lành luôn, lại còn siêu hiệu quả. Anh rất thẳng thắn, thực tế, nhìn ra nỗi buồn của em để giúp em hưởng sái góc nhìn và tư duy...",
  },
  {
    name: "Chị Yến Nguyễn Thị",
    role: "Học viên Tái Thiết Lập Bản Thân",
    quote:
      "Đạt cho chị một năng lượng hoàn toàn khác, sâu sắc và biết rất rõ mình đang ở đâu, cần phải làm gì. Chị thấy năng lượng và tư duy match với Đạt nhiều hơn, cho chị niềm tin chắc chắn hơn...",
  },
  {
    name: "Chị Hiền Trần",
    role: "Học viên Reset Hệ Điều Hành",
    quote:
      "Chị thấy chính mình trong câu chuyện của em. Nhờ hiểu được những bế tắc em từng trải qua, chị đã tự gỡ rối được từng chút một. Chị áp dụng, thay đổi cách suy nghĩ thấy nhẹ nhàng hơn, không bị phản ứng thái quá...",
  },
  {
    name: "Chị Lành Leanova",
    role: "Học viên Chuyển Đổi Căn Tính",
    quote:
      "Sau khi trò chuyện cùng Đạt, chị đã thấy rõ ràng hơn con đường phía trước mình sẽ đi, không còn cảm thấy cô đơn lẻ loi nữa. Con tim đã vui trở lại, có động lực và đầy hứng khởi để bắt đầu lại...",
  },
  {
    name: "Trần Nam",
    role: "Học viên khóa T5",
    quote:
      "Mình từng mất ngủ triền miên và luôn thức dậy lúc 9h sáng trong trạng thái uể oải. Sau khi áp dụng quy trình cài đặt nhịp sinh học và bài tập journaling của Đạt, tuần vừa rồi mình đã tự động dậy lúc 6h30 sáng, đầu óc tỉnh táo và không còn bị cảm giác lo âu đè nặng...",
  },
];

const faqs = [
  {
    q: "Khóa học này có phù hợp với người chưa từng học phát triển bản thân không?",
    a: "Hoàn toàn phù hợp. Toàn bộ phương pháp được đúc kết từ khoa học thần kinh nhận thức và thiết kế dưới dạng khung tư duy hình ảnh (Visual Frameworks) trực quan, đi thẳng vào nguyên nhân gốc rễ mà không dùng thuật ngữ khó hiểu hay lý thuyết suông.",
  },
  {
    q: "Mỗi ngày tôi cần dành bao nhiêu thời gian để thực hành?",
    a: "Chỉ từ 10 đến 15 phút mỗi ngày. Các bài học video được thiết kế ngắn gọn (10–15 phút/bài), kết hợp với Action-Sheet nhật ký tự điền 10 phút sáng/tối để người bận rộn nhất cũng dễ dàng duy trì.",
  },
  {
    q: "Sau khi đăng ký tôi sẽ nhận bài học như thế nào?",
    a: "Hệ thống sẽ gửi email tự động kích hoạt tài khoản học và link tải toàn bộ bộ công cụ, file Notion, Action-Sheet PDF và audio dẫn thiền ngay sau khi thanh toán thành công.",
  },
  {
    q: "Chính sách cam kết hoàn tiền trong 14 ngày hoạt động ra sao?",
    a: "Nếu bạn tham gia học và làm theo bài tập nhưng cảm thấy tư duy và năng lượng của mình không có gì thay đổi, bạn chỉ cần nhắn tin qua Zalo hoặc Email, chúng tôi sẽ hoàn lại 100% học phí cho bạn mà không hỏi thêm điều gì.",
  },
];

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Vui lòng điền đầy đủ Họ tên, Email và Số điện thoại.");
      return;
    }

    // Trigger Meta Pixel Lead
    fpixel.event("Lead", {
      content_name: "IDENTITY DESIGN Rui Style Form",
      currency: "VND",
      value: 1499000,
    });

    const query = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      total: "1499000",
    }).toString();

    window.location.href = `/checkout?${query}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: "#FFFFFF",
        color: "#272727",
        fontFamily: "var(--font-sans), 'Poppins', -apple-system, sans-serif",
        lineHeight: 1.6,
        overflowX: "hidden",
      }}
    >
      {/* TOP ANNOUNCEMENT BADGE */}
      <div
        style={{
          background: "#1C1C1C",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "10px 16px",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "#E6D3A3", marginRight: "8px" }}>✦ ƯU ĐÃI ĐẶC BIỆT</span>
        100 SUẤT ĐẦU TIÊN · TIẾT KIỆM 50% · BẢO HÀNH HOÀN TIỀN 14 NGÀY
      </div>

      {/* BRAND HEADER */}
      <header style={{ padding: "28px 20px 10px", textAlign: "center" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "#1C1C1C",
              textTransform: "uppercase",
              display: "inline-block",
            }}
          >
            IDENTITY DESIGN™
          </span>
        </div>
      </header>

      {/* HERO SECTION — RUIDIGITAL 2-COLUMN LUXURY EDITORIAL STYLE */}
      <section style={{ padding: "20px 20px 60px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {/* LEFT COLUMN: HERO HEADLINE & VALUE SUMMARY */}
            <div>
              {/* TOP SUB-HEADING */}
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#797F97", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                The 21-Day Identity Shift Protocol
              </div>

              {/* SERIF ITALIC HERO TITLE (LORA) */}
              <h1
                style={{
                  fontFamily: "var(--font-serif), 'Lora', serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "clamp(34px, 4.5vw, 48px)",
                  lineHeight: 1.18,
                  letterSpacing: "-1.5px",
                  color: "#1C1C1C",
                  margin: "0 0 16px",
                }}
              >
                Bật Mã Nguồn Căn Tính Mới:
              </h1>

              {/* SANS SUB-HEADLINE */}
              <h2
                style={{
                  fontFamily: "var(--font-sans), 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(20px, 2.8vw, 28px)",
                  lineHeight: 1.3,
                  color: "#272727",
                  margin: "0 0 20px",
                  letterSpacing: "-0.5px",
                }}
              >
                Tại sao bạn không thể bứt phá dù đã thử đủ mọi cách?
              </h2>

              <p style={{ fontSize: "16px", color: "#555555", lineHeight: 1.7, margin: "0 0 24px" }}>
                Tại sao <strong style={{ color: "#1C1C1C" }}>95% nỗ lực thay đổi</strong> của bạn đều thất bại? Và 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững, x3 hiệu suất mà không bị kiệt sức.
              </p>

              {/* PRICE HIGHLIGHT CARD */}
              <div
                style={{
                  background: "#F8F9FA",
                  border: "1px solid #E5E5E5",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  marginBottom: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div>
                  <span style={{ fontSize: "13px", color: "#797F97", textDecoration: "line-through", display: "block" }}>
                    Giá gốc: 3.000.000đ
                  </span>
                  <span style={{ fontSize: "28px", fontWeight: 800, color: "#1C1C1C", letterSpacing: "-0.5px" }}>
                    1.499.000đ
                  </span>
                </div>
                <div style={{ background: "#E6D3A3", color: "#1C1C1C", fontWeight: 700, fontSize: "12px", padding: "6px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  TIẾT KIỆM 50% HÔM NAY
                </div>
              </div>

              {/* WHAT'S INCLUDED QUICK BULLETS */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#1C1C1C", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                  BẠN SẼ NHẬN ĐƯỢC NGAY:
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px", fontSize: "14px", color: "#444444" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#1C1C1C", fontWeight: 700 }}>✓</span>
                    <span><strong>Lộ trình 4 Học Phần Chuyển Hóa:</strong> Video cô đọng 10–15 phút/bài học trọn đời.</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#1C1C1C", fontWeight: 700 }}>✓</span>
                    <span><strong>Template Nhật Ký Cài Đặt Bản Dạng 21 Ngày:</strong> Định dạng Notion & Action-Sheet PDF (Trị giá 500k).</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#1C1C1C", fontWeight: 700 }}>✓</span>
                    <span><strong>Audio Dẫn Thiền Xóa Bỏ Neo Cảm Xúc Tiêu Cực:</strong> Trị giá 700k (Tặng kèm miễn phí).</span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#1C1C1C", fontWeight: 700 }}>✓</span>
                    <span><strong>Cẩm Nang Điều Chỉnh 4 Hormone Sinh Học:</strong> Trị giá 400k (Tặng kèm miễn phí).</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* RIGHT COLUMN: RUIDIGITAL QUICK CHECKOUT / LEAD FORM CARD */}
            <div>
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  borderRadius: "16px",
                  padding: "32px 28px",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                  <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                    INSTANT DIGITAL ACCESS
                  </span>
                  <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1C1C1C", margin: "0 0 6px" }}>
                    Đăng Ký Tài Khoản Học Ngay
                  </h3>
                  <p style={{ fontSize: "13px", color: "#797F97", margin: 0 }}>
                    Điền thông tin nhận mã kích hoạt và chuyển tiếp thanh toán QR SePAY:
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
                      Họ và tên của bạn:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        fontSize: "15px",
                        boxSizing: "border-box",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
                      Email nhận tài liệu & bài học:
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        fontSize: "15px",
                        boxSizing: "border-box",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
                      Số điện thoại (có Zalo):
                    </label>
                    <input
                      type="tel"
                      placeholder="0912345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        fontSize: "15px",
                        boxSizing: "border-box",
                        outline: "none",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "#1C1C1C",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: 700,
                      fontSize: "16px",
                      cursor: "pointer",
                      marginTop: "6px",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                      transition: "background 0.2s ease",
                    }}
                  >
                    TIẾP TỤC ĐẶT HÀNG (1.499.000Đ) →
                  </button>

                  <div style={{ textAlign: "center", fontSize: "12px", color: "#797F97", marginTop: "4px" }}>
                    🛡️ Cam kết hoàn tiền 100% trong 14 ngày nếu không hiệu quả
                  </div>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 1 & 2: THE PROBLEM (RUIDIGITAL BREAKAWAY STYLE) */}
      <section style={{ padding: "70px 20px", background: "#FAF8FF", borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
          
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#797F97", textTransform: "uppercase" }}>
            VÒNG XOÁY BẾ TẮC CỦA Ý CHÍ
          </span>

          <h2
            style={{
              fontFamily: "var(--font-serif), 'Lora', serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#1C1C1C",
              margin: "12px 0 24px",
              lineHeight: 1.25,
            }}
          >
            Bạn biết chính xác mình cần làm gì...<br />
            Vậy tại sao bạn lại liên tục tự cản trở chính mình?
          </h2>

          <div style={{ textAlign: "left", background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "16px", padding: "32px", margin: "32px 0", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
            <p style={{ fontSize: "16px", color: "#444444", marginBottom: "16px", fontWeight: 600 }}>
              Vấn đề của bạn không phải là thiếu một hệ thống mới:
            </p>

            <div style={{ display: "grid", gap: "12px", fontSize: "15px", color: "#555" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <span>💔</span>
                <span>Bạn đã từng mua hàng chục khóa học kỹ năng, đọc hàng chồng sách self-help, đổi qua hàng loạt ứng dụng quản lý công việc và thói quen.</span>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span>💔</span>
                <span>Bạn đã từng lên kế hoạch hoàn hảo để thức dậy lúc 6h sáng, tràn trề khí thế trong vài ngày đầu tiên... rồi sau đó mọi thứ lại sụp đổ.</span>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <span>🔁</span>
                <span>Ngay trước khi bạn chuẩn bị ra mắt sản phẩm hoặc xuất hiện trước đám đông: tiếng nói <em>“Mày chưa đủ giỏi đâu”</em> lại kéo bạn dừng lại.</span>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #EEEEEE", fontStyle: "italic", color: "#1C1C1C", fontWeight: 600, fontSize: "16px" }}>
              “Đây không phải là vấn đề về kỷ luật. Đây là một khuôn mẫu tiềm thức đã chạy ngầm trong bạn suốt nhiều năm trước khi bạn kịp nhận ra.”
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: UMP — THE ROOT CAUSE */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#E87A3E", textTransform: "uppercase" }}>
              CƠ CHẾ GỐC RỄ (UMP)
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(26px, 3.8vw, 38px)",
                color: "#1C1C1C",
                margin: "10px 0 16px",
              }}
            >
              Hiện Tượng Đoản Mạch Bức Tranh Tự Thân
            </h2>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "680px", margin: "0 auto" }}>
              Các phương pháp ngoài kia thất bại vì chỉ cố sửa <strong>5% Ý thức</strong> (hành vi, kỹ năng), nhưng bỏ quên <strong>95% Tiềm thức</strong> (bản dạng cốt lõi).
            </p>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "24px" }}>
              <strong style={{ fontSize: "16px", color: "#1C1C1C", display: "block", marginBottom: "6px" }}>
                1. Não bộ luôn bắt hành động phải khớp với niềm tin bên trong:
              </strong>
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                Bạn không bao giờ vượt qua được giới hạn mà tiềm thức tự gán cho chính mình.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "24px" }}>
              <strong style={{ fontSize: "16px", color: "#1C1C1C", display: "block", marginBottom: "6px" }}>
                2. Sự đoản mạch giữa hành động và niềm tin:
              </strong>
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                Bạn muốn bứt phá ra ngoài đời thực. Nhưng tiềm thức của bạn lại chỉ lưu giữ những thất bại và sự tự ti trong quá khứ.
              </p>
            </div>

            <div style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "12px", padding: "24px" }}>
              <strong style={{ fontSize: "16px", color: "#1C1C1C", display: "block", marginBottom: "6px" }}>
                3. Hội chứng kẻ giả mạo & Cơ chế tự hủy hoại:
              </strong>
              <p style={{ margin: 0, fontSize: "15px", color: "#555" }}>
                Hành vi bên ngoài lệch pha với con người bên trong sẽ khiến não bộ báo động đỏ. Bạn tự sinh ra nỗi sợ và sự trì hoãn ngay trước vạch đích để kéo bạn về lại vùng an toàn.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: UMS — THE 3-STEP SOLUTION */}
      <section style={{ padding: "80px 20px", background: "#FAF8FF", borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#797F97", textTransform: "uppercase" }}>
              GIẢI PHÁP ĐỘT PHÁ (UMS)
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(26px, 3.8vw, 38px)",
                color: "#1C1C1C",
                margin: "10px 0 16px",
              }}
            >
              Quy Trình Đồng Bộ Hóa Bản Dạng 3 Chiều (TIA™)
            </h2>
            <p style={{ fontSize: "16px", color: "#666" }}>
              3 bước chính xác giúp bạn cài đặt lại tiềm thức để hành động dứt khoát không ma sát:
            </p>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "12px", padding: "28px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#1C1C1C", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px" }}>
                01
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#1C1C1C", margin: "0 0 6px", fontWeight: 700 }}>
                  Bước 1: Dọn sạch cảm xúc và nhổ bỏ niềm tin giới hạn
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "15px", lineHeight: 1.6 }}>
                  Gỡ bỏ những nỗi sợ, sự tự ti và ký ức thất bại trong quá khứ mà không cần phải nhắc lại nỗi đau hay trị liệu phức tạp.
                </p>
              </div>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "12px", padding: "28px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#1C1C1C", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px" }}>
                02
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#1C1C1C", margin: "0 0 6px", fontWeight: 700 }}>
                  Bước 2: Cài lại tiếng nói trong đầu & Đổi danh xưng con người mới
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "15px", lineHeight: 1.6 }}>
                  Tự định vị mình là người tự tin, kỷ luật và bản lĩnh — dạy cho tiềm thức tin rằng việc bứt phá là điều hoàn toàn hiển nhiên.
                </p>
              </div>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E5E5E5", borderRadius: "12px", padding: "28px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "#1C1C1C", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "18px" }}>
                03
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#1C1C1C", margin: "0 0 6px", fontWeight: 700 }}>
                  Bước 3: Nạp đầy pin & Thiết lập nhịp sinh học tràn trề năng lượng
                </h3>
                <p style={{ margin: 0, color: "#666", fontSize: "15px", lineHeight: 1.6 }}>
                  Cân bằng lại nhịp sinh học tự nhiên: Sáng dậy tỉnh táo, làm việc tập trung sâu suốt ngày dài mà không còn bị kiệt sức.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 & 7: 4 MODULES ARCHITECTURE */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#797F97", textTransform: "uppercase" }}>
              CURRICULUM ARCHITECTURE
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(26px, 3.8vw, 38px)",
                color: "#1C1C1C",
                margin: "10px 0 16px",
              }}
            >
              Cấu Trúc Chi Tiết 4 Học Phần
            </h2>
            <p style={{ fontSize: "15px", color: "#666" }}>
              Thiết kế tinh gọn trong 21 ngày · Video 10–15 phút/bài · Action-Sheet thực hành 10 phút/ngày
            </p>
          </div>

          <div style={{ display: "grid", gap: "18px" }}>
            {fourModules.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  borderRadius: "14px",
                  padding: "26px 28px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span style={{ color: "#E87A3E", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em" }}>
                    {m.label}
                  </span>
                  <span style={{ color: "#888888", fontSize: "12px", fontFamily: "monospace" }}>MODULE {m.num}</span>
                </div>
                <h3 style={{ fontSize: "18px", color: "#1C1C1C", margin: "0 0 8px", fontWeight: 700 }}>
                  {m.title}
                </h3>
                <p style={{ color: "#666666", fontSize: "14px", margin: "0 0 14px", lineHeight: 1.6 }}>
                  {m.desc}
                </p>
                <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: "12px" }}>
                  <ul style={{ paddingLeft: "16px", margin: 0, display: "grid", gap: "6px", fontSize: "13px", color: "#444444" }}>
                    {m.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: SOCIAL PROOF & CLIENT REVIEWS */}
      <section style={{ padding: "80px 20px", background: "#FAF8FF", borderTop: "1px solid #EAEAEA", borderBottom: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#797F97", textTransform: "uppercase" }}>
              PAST STUDENTS & CLIENTS
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(26px, 3.8vw, 38px)",
                color: "#1C1C1C",
                margin: "10px 0 16px",
              }}
            >
              Bằng Chứng Xã Hội Từ Học Viên Thực Tế
            </h2>
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E5E5E5",
                  borderRadius: "12px",
                  padding: "24px 28px",
                }}
              >
                <p style={{ color: "#333333", fontSize: "15px", fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.7 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#1C1C1C",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <strong style={{ color: "#1C1C1C", fontSize: "14px", display: "block" }}>{t.name}</strong>
                    <span style={{ color: "#797F97", fontSize: "12px" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: INVESTMENT & GUARANTEE */}
      <section id="offer" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div
            style={{
              background: "#FFFFFF",
              border: "2px solid #1C1C1C",
              borderRadius: "16px",
              padding: "40px 32px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              ƯU ĐÃI KHAN HIẾM HÔM NAY
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(30px, 4.5vw, 44px)",
                color: "#1C1C1C",
                margin: "12px 0 8px",
              }}
            >
              IDENTITY DESIGN™
            </h2>
            <div style={{ fontSize: "15px", color: "#797F97", marginBottom: "20px" }}>
              Tái Lập Bản Thân · Reset Hệ Điều Hành · Lộ Trình 21 Ngày
            </div>

            <div style={{ margin: "20px 0" }}>
              <span style={{ textDecoration: "line-through", color: "#888888", fontSize: "18px", marginRight: "10px" }}>
                3.000.000đ
              </span>
              <span style={{ fontSize: "clamp(42px, 6vw, 56px)", fontWeight: 900, color: "#1C1C1C", letterSpacing: "-1px" }}>
                1.499.000đ
              </span>
            </div>

            <div style={{ background: "#FAF8FF", border: "1px solid #EAEAEA", borderRadius: "10px", padding: "20px", margin: "28px 0", textAlign: "left" }}>
              <strong style={{ color: "#1C1C1C", fontSize: "15px", display: "block", marginBottom: "6px" }}>
                🛡️ Cam Kết Hoàn Tiền 100% Trong 14 Ngày:
              </strong>
              <p style={{ margin: 0, color: "#555", fontSize: "14px", lineHeight: 1.6 }}>
                Nếu sau khi học và làm theo bài tập, bạn thấy tư duy và năng lượng của mình không có gì thay đổi: Chỉ cần nhắn một tin, tôi sẽ hoàn lại 100% học phí cho bạn ngay lập tức. Không hỏi khó, không lý do.
              </p>
            </div>

            <a
              href="/checkout"
              style={{
                display: "inline-block",
                width: "100%",
                maxWidth: "460px",
                background: "#1C1C1C",
                color: "#FFFFFF",
                fontWeight: 700,
                padding: "20px 32px",
                borderRadius: "6px",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                letterSpacing: "-0.01em",
              }}
            >
              TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG NGAY →
            </a>
          </div>

        </div>
      </section>

      {/* SECTION: FREQUENTLY ASKED QUESTIONS (ACCORDION STYLE) */}
      <section style={{ padding: "70px 20px", background: "#FAF8FF", borderTop: "1px solid #EAEAEA" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", color: "#797F97", textTransform: "uppercase" }}>
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Lora', serif",
                fontStyle: "italic",
                fontWeight: 600,
                fontSize: "clamp(24px, 3.5vw, 36px)",
                color: "#1C1C1C",
                margin: "8px 0 0",
              }}
            >
              Câu Hỏi Thường Gặp
            </h2>
          </div>

          <div style={{ display: "grid", gap: "10px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E5E5",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "18px 20px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "left",
                      fontFamily: "inherit",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1C1C1C",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ fontSize: "18px", color: "#797F97", marginLeft: "12px" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 18px", fontSize: "14px", color: "#555", lineHeight: 1.65, borderTop: "1px solid #F0F0F0" }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1C1C1C", color: "#94A3B8", padding: "60px 20px 30px", fontSize: "13px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "16px", letterSpacing: "0.1em", marginBottom: "12px" }}>
            IDENTITY DESIGN™
          </div>
          <p style={{ color: "#797F97", maxWidth: "500px", margin: "0 auto 24px", fontSize: "13px" }}>
            Hệ thống chuyển giao toàn diện giúp tái lập bản thân, bẻ gãy điểm nghẽn căn tính và thiết lập nhịp sinh học năng lượng đỉnh cao.
          </p>
          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)", paddingTop: "20px", fontSize: "12px", color: "#64748B" }}>
            © 2026 IDENTITY DESIGN™. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* FLOATING STICKY BAR */}
      {showSticky && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(28, 28, 28, 0.96)",
            backdropFilter: "blur(10px)",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 9999,
            boxShadow: "0 -5px 25px rgba(0,0,0,0.15)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", color: "#E6D3A3", fontWeight: 600 }}>IDENTITY DESIGN™</span>
            <strong style={{ fontSize: "16px", color: "#FFFFFF" }}>1.499.000đ</strong>
          </div>
          <a
            href="/checkout"
            style={{
              background: "#E6D3A3",
              color: "#1C1C1C",
              padding: "10px 22px",
              fontSize: "13px",
              fontWeight: 800,
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            ĐĂNG KÝ NGAY →
          </a>
        </div>
      )}

    </div>
  );
}
