"use client";

import { useEffect, useState } from "react";
import * as fpixel from "../lib/fpixel";

const fourModules = [
  {
    num: "01",
    label: "HỌC PHẦN 1",
    title: "GIẢI PHẪU BỨC TRANH TỰ THÂN & BẺ GÃY ĐIỂM NGHẼN CĂN TÍNH",
    desc: "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn. Xóa bỏ Hội chứng kẻ giả mạo và dọn sạch tiếng nói chỉ trích bên trong.",
    outcomes: [
      "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn",
      "Xóa bỏ Hội chứng kẻ giả mạo (Imposter Syndrome) và dọn sạch tiếng nói tự phán xét",
      "Bẻ gãy neo cảm xúc tiêu cực và sự tự ti tích tụ trong quá khứ",
    ],
  },
  {
    num: "02",
    label: "HỌC PHẦN 2",
    title: "RESET SINH HỌC & KÍCH HOẠT 4 LOẠI NĂNG LƯỢNG",
    desc: "Làm chủ Thể chất – Tinh thần – Cảm xúc – Ý nghĩa để chấm dứt tình trạng dậy lờ đờ, mất tập trung. Thiết lập nhịp sinh học tự nhiên: ngủ sâu, dậy tỉnh táo trước 7h sáng không cần báo thức.",
    outcomes: [
      "Làm chủ 4 loại năng lượng: Thể chất – Tinh thần – Cảm xúc – Ý nghĩa",
      "Chấm dứt hoàn toàn tình trạng dậy lờ đờ, sụt pin buổi chiều và kiệt sức mãn tính",
      "Thiết lập nhịp sinh học tự nhiên: Ngủ sâu, tự động dậy trước 7h sáng tràn trề sinh lực",
    ],
  },
  {
    num: "03",
    label: "HỌC PHẦN 3",
    title: "CÔNG THỨC DỊCH CHUYỂN CĂN TÍNH (IDENTITY SHIFTING PROTOCOL)",
    desc: "Phương pháp thay đổi niềm tin cốt lõi chỉ bằng kỹ thuật tái định hình danh xưng. Quy trình khóa chặt bản dạng mới vào tiềm thức thông qua cấu trúc nhật ký 21 ngày.",
    outcomes: [
      "Phương pháp thay đổi niềm tin cốt lõi bằng kỹ thuật tái định hình danh xưng",
      "Dạy cho tiềm thức tin rằng việc bứt phá và kỷ luật là điều hoàn toàn hiển nhiên",
      "Quy trình khóa chặt bản dạng mới vào tiềm thức qua cấu trúc nhật ký 21 ngày",
    ],
  },
  {
    num: "04",
    label: "HỌC PHẦN 4",
    title: "THIẾT KẾ TRẠNG THÁI DÒNG CHẢY & HÀNH ĐỘNG KHÔNG MA SÁT",
    desc: "Kỹ thuật bước vào phiên làm việc sâu (Deep Work) 2–3 tiếng liên tục với hiệu suất gấp 3–5 lần bình thường. Chuyển hóa nội lực vững vàng thành kết quả tài chính, công việc và sự an tâm trong cuộc sống.",
    outcomes: [
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

export default function Home() {
  const [showSticky, setShowSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: "", email: "", phone: "" });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalData.name || !modalData.email || !modalData.phone) {
      alert("Vui lòng điền đầy đủ Tên, Email và Số điện thoại.");
      return;
    }

    // Trigger Meta/Facebook Pixel Lead Event
    fpixel.event("Lead", {
      content_name: "IDENTITY DESIGN Lead Form",
      currency: "VND",
      value: 1499000,
    });

    const query = new URLSearchParams({
      name: modalData.name,
      email: modalData.email,
      phone: modalData.phone,
      total: "1499000",
    }).toString();
    window.location.href = `/checkout?${query}`;
  };

  useEffect(() => {
    const onScroll = () => {
      const offer = document.getElementById("offer");
      const inOffer = offer
        ? offer.getBoundingClientRect().top < window.innerHeight && offer.getBoundingClientRect().bottom > 0
        : false;
      setShowSticky(window.scrollY > window.innerHeight * 0.5 && !inOffer);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        background: "#08090A",
        color: "#E2E8F0",
        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        lineHeight: 1.8,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* TOP ANNOUNCEMENT TICKER */}
      <div
        style={{
          background: "rgba(18, 20, 24, 0.9)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          color: "#94A3B8",
          padding: "10px 16px",
          textAlign: "center",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ color: "#E87A3E", fontWeight: 700, marginRight: "8px" }}>● SYSTEM PROTOCOL</span>
        Bật mã nguồn căn tính mới — Tái lập bản thân & Reset hệ điều hành 2026
      </div>

      {/* HERO SECTION WITH POINTILLIST / STIPPLED PARTICLES ARTWORK */}
      <header
        style={{
          position: "relative",
          background: "#08090A",
          padding: "60px 20px 100px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          overflow: "hidden",
        }}
      >
        {/* Background glow radial */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "500px",
            background: "radial-gradient(circle at 50% 20%, rgba(217, 103, 50, 0.12) 0%, rgba(8, 9, 10, 0) 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ maxWidth: "1040px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          
          {/* ARTWORK DISPLAY: STIPPLED DUAL ENTITIES / MESH OF CONSCIOUSNESS */}
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              marginBottom: "48px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
              background: "#000000",
            }}
          >
            <img
              src="/images/hero_identity_mesh.jpg"
              alt="Identity Design Mesh of Particles - Dual Consciousness Reconnection"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "520px",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                opacity: 0.95,
              }}
            />
            
            {/* Subtle bottom gradient fade */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background: "linear-gradient(to top, #08090A 0%, rgba(8,9,10,0) 100%)",
              }}
            />
          </div>

          {/* HEADLINE GRID (STYLE OF THE REFERENCE UI) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "36px",
              alignItems: "end",
            }}
          >
            {/* LEFT: LAYERED CONTRAST TYPOGRAPHY */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  background: "rgba(255, 255, 255, 0.04)",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: "#94A3B8",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E87A3E", display: "inline-block" }}></span>
                IDENTITY DESIGN™ PROTOCOL
              </div>

              <h1
                style={{
                  fontSize: "clamp(30px, 4.8vw, 56px)",
                  lineHeight: 1.18,
                  fontWeight: 300,
                  color: "#7E8691",
                  margin: "0 0 16px",
                  letterSpacing: "-0.03em",
                }}
              >
                Bật <span style={{ fontWeight: 800, color: "#FFFFFF" }}>mã nguồn căn tính</span> mới:
                <br />
                Tại sao bạn <span style={{ fontWeight: 800, color: "#FFFFFF" }}>không thể bứt phá</span> dù đã thử đủ mọi cách?
              </h1>

              <p
                style={{
                  fontSize: "clamp(16px, 2vw, 19px)",
                  color: "#94A3B8",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Tại sao <strong style={{ color: "#F8FAFC" }}>95% nỗ lực thay đổi</strong> của bạn đều thất bại?
                Và 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững.
              </p>
            </div>

            {/* RIGHT: CLEAN WHITE HERO CTA BUTTON */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
              <a
                href="/checkout"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFFFFF",
                  color: "#08090A",
                  fontWeight: 800,
                  padding: "18px 36px",
                  borderRadius: "4px",
                  fontSize: "16px",
                  textDecoration: "none",
                  boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)",
                  letterSpacing: "-0.01em",
                  transition: "all 0.2s ease",
                  width: "100%",
                  maxWidth: "420px",
                  boxSizing: "border-box",
                }}
              >
                TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG →
              </a>

              <div style={{ color: "#64748B", fontSize: "13px", lineHeight: 1.5 }}>
                ⚡ Ưu đãi 1.499.000đ cho 100 suất đầu tiên · Cam kết hoàn tiền 100% trong 14 ngày
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* SECTION 1: ATTENTION & HOOK */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#0B0D0F" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 01 · ATTENTION & HOOK
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Nếu bạn đang cảm thấy mình rơi vào một cái bẫy vô hình:
          </h2>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "30px",
              margin: "28px 0",
              display: "grid",
              gap: "18px",
            }}
          >
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ color: "#E87A3E", fontSize: "18px", marginTop: "2px" }}>▹</span>
              <p style={{ margin: 0, fontSize: "17px", color: "#CBD5E1", lineHeight: 1.7 }}>
                Bạn ấp ủ rất nhiều dự định lớn, muốn đổi nghề, muốn bứt phá thu nhập, muốn xây dựng một sự nghiệp tự do.
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ color: "#E87A3E", fontSize: "18px", marginTop: "2px" }}>▹</span>
              <p style={{ margin: 0, fontSize: "17px", color: "#CBD5E1", lineHeight: 1.7 }}>
                Bạn bắt đầu hừng hực khí thế, nhưng chỉ sau vài ngày, cảm giác bất an và tiếng nói <em style={{ color: "#FFFFFF" }}>&ldquo;Mày chưa đủ giỏi đâu&rdquo;</em> lại kéo bạn sụp đổ.
              </p>
            </div>
            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              <span style={{ color: "#E87A3E", fontSize: "18px", marginTop: "2px" }}>▹</span>
              <p style={{ margin: 0, fontSize: "17px", color: "#CBD5E1", lineHeight: 1.7 }}>
                Bạn nhìn bạn bè đồng trang lứa tiến xa, còn mình thì dậm chân tại chỗ trong sự mông lung và tự dằn vặt...
              </p>
            </div>
          </div>

          <p style={{ fontSize: "20px", fontWeight: 700, color: "#F8FAFC", margin: "32px 0 14px" }}>
            Thì xin bạn hãy dừng lại một phút và đọc thật kỹ bài viết này.
          </p>

          <p style={{ fontSize: "17px", color: "#94A3B8", lineHeight: 1.8 }}>
            Bởi vì sự thật giải thoát nhất mà bạn sắp biết là: <strong style={{ color: "#FFFFFF" }}>Bạn không hề thiếu năng lực.</strong> Bạn chỉ đang là nạn nhân của một hiện tượng tâm lý ngầm chưa từng được ai chỉ ra.
          </p>

        </div>
      </section>

      {/* SECTION 2: RESEARCH & PROBLEM SETUP — VÒNG XOÁY BẾ TẮC CỦA Ý CHÍ */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#08090A" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 02 · RESEARCH & PROBLEM SETUP
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Vòng xoáy bế tắc của ý chí
          </h2>

          <p style={{ fontSize: "18px", color: "#E2E8F0", margin: "0 0 20px" }}>Tôi biết rất rõ cảm giác này.</p>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderLeft: "2px solid #E87A3E",
              padding: "24px 28px",
              borderRadius: "0 10px 10px 0",
              margin: "24px 0 32px",
              fontStyle: "italic",
              color: "#CBD5E1",
              fontSize: "17px",
              lineHeight: 1.8,
            }}
          >
            &ldquo;Cảm giác sáng thức dậy không muốn bước ra khỏi giường. Cảm giác ôm hàng tá việc, hút thuốc liên tục, thức xuyên đêm, làm việc 16–17 tiếng mỗi ngày chỉ để chứng minh giá trị của mình... nhưng đổi lại là cơ thể suy kiệt, công việc đổ vỡ và rơi vào trầm cảm suốt 3 tháng không dám gặp ai.&rdquo;
          </div>

          <h3 style={{ fontSize: "19px", color: "#FFFFFF", fontWeight: 700, margin: "28px 0 16px" }}>
            Khi đó, phản xạ tự nhiên của chúng ta là gì?
          </h3>

          <div style={{ display: "grid", gap: "14px", marginBottom: "30px" }}>
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "16px 20px", borderRadius: "8px", fontSize: "16px", color: "#94A3B8" }}>
              <strong style={{ color: "#FFFFFF" }}>1. Mua thêm một khóa học kỹ năng cứng</strong> (marketing, sales, quản trị).
            </div>
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "16px 20px", borderRadius: "8px", fontSize: "16px", color: "#94A3B8" }}>
              <strong style={{ color: "#FFFFFF" }}>2. Đọc thêm sách self-help</strong> để tìm động lực ngắn hạn.
            </div>
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "16px 20px", borderRadius: "8px", fontSize: "16px", color: "#94A3B8" }}>
              <strong style={{ color: "#FFFFFF" }}>3. Ép bản thân phải kỷ luật sắt đá:</strong> dậy sớm, ghi chép, làm việc điên cuồng.
            </div>
          </div>

          <p style={{ fontSize: "17px", color: "#CBD5E1", lineHeight: 1.8 }}>
            Nhưng chuyện gì xảy ra sau đó? Chỉ được dăm ba bữa, bạn lại quay về lối sống cũ. Bạn cảm thấy tội lỗi, mất niềm tin vào chính mình và bắt đầu tin vào lời nguyền: <em style={{ color: "#E87A3E" }}>&ldquo;Chắc số mình sinh ra chỉ đến thế thôi&rdquo;</em>.
          </p>

          <p style={{ fontSize: "19px", fontWeight: 700, color: "#FFFFFF", marginTop: "24px" }}>
            Tại sao lại có nghịch lý này? Tại sao những người thông minh, chăm chỉ như bạn lại liên tục thất bại trong việc thay đổi chính mình?
          </p>

        </div>
      </section>

      {/* SECTION 3: UMP — HIỆN TƯỢNG ĐOẢN MẠCH BỨC TRANH TỰ THÂN */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#0B0D0F" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 03 · UNIQUE MECHANISM OF PROBLEM (UMP)
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 20px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Hiện tượng đoản mạch Bức Tranh Tự Thân
          </h2>

          <div style={{ background: "rgba(232, 122, 62, 0.08)", border: "1px solid rgba(232, 122, 62, 0.25)", padding: "20px 24px", borderRadius: "10px", marginBottom: "32px" }}>
            <p style={{ margin: 0, fontSize: "17px", color: "#FDBA74", fontWeight: 600, lineHeight: 1.6 }}>
              Các phương pháp ngoài kia thất bại vì chỉ sửa 5% Ý thức (kỹ năng, hành vi), nhưng bỏ quên 95% Tiềm thức (bản dạng cốt lõi).
            </p>
          </div>

          <p style={{ fontSize: "17px", color: "#CBD5E1", lineHeight: 1.8, marginBottom: "28px" }}>
            Theo khoa học thần kinh nhận thức, bên trong tiềm thức của bạn luôn lưu giữ một <strong style={{ color: "#FFFFFF" }}>Bức Tranh Tự Thân (Self-Image)</strong>. Bức tranh này được vẽ nên từ những tổn thương thời thơ ấu, định kiến gia đình và những lần vấp ngã trong quá khứ. Nó âm thầm định nghĩa: <span style={{ color: "#FFFFFF" }}>Bạn là ai, bạn xứng đáng với điều gì, và giới hạn an toàn của bạn ở đâu.</span>
          </p>

          <h3 style={{ fontSize: "18px", color: "#FFFFFF", fontWeight: 700, marginBottom: "16px" }}>
            Và đây là cơ chế khiến bạn luôn thất bại:
          </h3>

          <div style={{ display: "grid", gap: "16px" }}>
            
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "22px 24px" }}>
              <strong style={{ color: "#FFFFFF", fontSize: "16px", display: "block", marginBottom: "6px" }}>
                1. Não bộ luôn bắt hành động phải khớp với niềm tin bên trong:
              </strong>
              <span style={{ color: "#94A3B8", fontSize: "15px" }}>
                Bạn không bao giờ vượt qua được giới hạn mà tiềm thức tự gán cho mình.
              </span>
            </div>

            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "22px 24px" }}>
              <strong style={{ color: "#FFFFFF", fontSize: "16px", display: "block", marginBottom: "6px" }}>
                2. Sự đoản mạch giữa hành động và niềm tin:
              </strong>
              <span style={{ color: "#94A3B8", fontSize: "15px" }}>
                Bạn muốn bứt phá ra ngoài đời thực. Nhưng tiềm thức của bạn lại chỉ tin vào những thất bại và sự tự ti trong quá khứ.
              </span>
            </div>

            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "22px 24px" }}>
              <strong style={{ color: "#FFFFFF", fontSize: "16px", display: "block", marginBottom: "6px" }}>
                3. Hội chứng kẻ giả mạo & Tự hủy hoại:
              </strong>
              <span style={{ color: "#94A3B8", fontSize: "15px" }}>
                Hành vi bên ngoài lệch pha với con người bên trong sẽ khiến não bộ báo động đỏ. Kết quả là đầu óc bạn tự sinh ra nỗi sợ và sự trì hoãn. Bạn tự bỏ cuộc ngay trước vạch đích chỉ để cảm thấy an toàn như trước đây.
              </span>
            </div>

          </div>

          <div style={{ marginTop: "32px", borderLeft: "2px solid #E87A3E", paddingLeft: "18px" }}>
            <p style={{ margin: 0, fontSize: "17px", color: "#FFFFFF", fontWeight: 700 }}>
              Kết luận: Hành vi không thể bền nếu chưa thay đổi được con người bên trong. Mọi nỗ lực gồng ép chỉ khiến bạn thêm mệt mỏi và nhanh bỏ cuộc.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: UMS — QUY TRÌNH ĐỒNG BỘ HÓA BẢN DẠNG 3 CHIỀU (TIA) */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#08090A" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 04 · UNIQUE MECHANISM OF SOLUTION (UMS)
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 20px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Quy trình đồng bộ hóa bản dạng 3 chiều (TIA™)
          </h2>

          <p style={{ fontSize: "17px", color: "#94A3B8", lineHeight: 1.8, marginBottom: "32px" }}>
            Đừng cố ép bản thân thay đổi hành vi trong kiệt sức nữa. Giải pháp thực sự là Quy trình 3 bước giúp bạn cài đặt lại chính xác 3 điểm nghẽn bên trong tiềm thức:
          </p>

          <div style={{ display: "grid", gap: "20px" }}>
            
            {/* STEP 1 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#FFFFFF", fontSize: "18px" }}>
                01
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#FFFFFF", margin: "0 0 8px", fontWeight: 800 }}>
                  Bước 1: Dọn sạch cảm xúc và nhổ bỏ niềm tin giới hạn.
                </h3>
                <p style={{ margin: 0, color: "#94A3B8", fontSize: "15px", lineHeight: 1.65 }}>
                  Gỡ bỏ những nỗi sợ, sự tự ti và ký ức thất bại trong quá khứ mà không cần phải nhắc lại nỗi đau hay trị liệu phức tạp.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#FFFFFF", fontSize: "18px" }}>
                02
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#FFFFFF", margin: "0 0 8px", fontWeight: 800 }}>
                  Bước 2: Cài lại tiếng nói trong đầu và đổi danh xưng con người mới.
                </h3>
                <p style={{ margin: 0, color: "#94A3B8", fontSize: "15px", lineHeight: 1.65 }}>
                  Tự định vị mình là người tự tin, kỷ luật và bản lĩnh — dạy cho tiềm thức tin rằng việc bứt phá là điều hoàn toàn hiển nhiên.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px", display: "grid", gridTemplateColumns: "48px 1fr", gap: "20px", alignItems: "start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#FFFFFF", fontSize: "18px" }}>
                03
              </div>
              <div>
                <h3 style={{ fontSize: "18px", color: "#FFFFFF", margin: "0 0 8px", fontWeight: 800 }}>
                  Bước 3: Nạp đầy pin và thiết lập nhịp sinh học tràn trề năng lượng.
                </h3>
                <p style={{ margin: 0, color: "#94A3B8", fontSize: "15px", lineHeight: 1.65 }}>
                  Cân bằng lại nhịp sinh học tự nhiên: Sáng dậy tỉnh táo, làm việc tập trung sâu mà không còn bị kiệt sức.
                </p>
              </div>
            </div>

          </div>

          <div style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "24px 28px", marginTop: "32px" }}>
            <p style={{ margin: 0, color: "#E2E8F0", fontSize: "16px", lineHeight: 1.75 }}>
              ✨ <strong style={{ color: "#FFFFFF" }}>Khi 3 trục này được đồng bộ, Bản Dạng Mới sẽ trở thành Cài Đặt Mặc Định.</strong> Bạn hành động dứt khoát, tự tin xuất hiện và đạt kết quả mà không cần tốn một giọt năng lượng nào để đấu tranh nội tâm.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: KHÓA HỌC DÀNH CHO AI & KHÔNG DÀNH CHO AI? */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#0B0D0F" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 05 · FIT CRITERIA
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 32px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Khóa học dành cho ai & Không dành cho ai?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            {/* DÀNH CHO BẠN */}
            <div style={{ background: "#111317", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "12px", padding: "28px" }}>
              <div style={{ color: "#10B981", fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                ✓ DÀNH RIÊNG CHO BẠN NẾU:
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "12px", fontSize: "15px", color: "#CBD5E1", lineHeight: 1.6 }}>
                <li>Bạn đang ở độ tuổi <strong>23–35</strong>, cảm thấy bị kẹt trong vùng an toàn, bất an vô định hoặc đang trải qua khủng hoảng 1/4 cuộc đời.</li>
                <li>Bạn từng thử dậy sớm, lập kế hoạch, mua nhiều khóa học kỹ năng nhưng chỉ duy trì được vài ngày rồi bỏ cuộc do <strong>cạn pin ý chí</strong>.</li>
                <li>Bạn cần một phương pháp chuyển hóa <strong>chuẩn khoa học và thực chiến</strong> — không lý thuyết suông, không thần thánh hóa tâm linh.</li>
              </ul>
            </div>

            {/* KHÔNG DÀNH CHO BẠN */}
            <div style={{ background: "#111317", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "12px", padding: "28px" }}>
              <div style={{ color: "#EF4444", fontSize: "13px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                ✕ KHÔNG DÀNH CHO BẠN NẾU:
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "12px", fontSize: "15px", color: "#CBD5E1", lineHeight: 1.6 }}>
                <li>Bạn đang tìm một <strong>&ldquo;viên thuốc thần&rdquo;</strong> để đổi đời sau một đêm, mà không chịu dành thời gian rèn luyện và sửa đổi lối sống.</li>
                <li>Bạn chỉ muốn tích lũy thêm lý thuyết để phán xét người khác mà không muốn trung thực đối diện với các thói quen cũ của chính mình.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: GIỚI THIỆU SẢN PHẨM & CÁC OUTCOME CHUYỂN HÓA ĐỘT PHÁ */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#08090A" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 06 · SYSTEM OUTCOMES
          </span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "#FFFFFF", margin: "12px 0 10px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            IDENTITY DESIGN™
          </h2>
          <h3 style={{ fontSize: "clamp(17px, 2.5vw, 22px)", color: "#94A3B8", margin: "0 0 16px", fontWeight: 400 }}>
            Tái Lập Bản Thân, Reset Hệ Điều Hành
          </h3>
          <p style={{ color: "#64748B", fontSize: "16px", margin: "0 0 36px" }}>
            Hệ thống chuyển giao toàn diện giúp bạn bẻ gãy bản dạng kẹp giữ cũ và thiết lập phiên bản hiệu suất cao.
          </p>

          <div style={{ fontSize: "14px", color: "#FFFFFF", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "20px" }}>
            ĐÂY LÀ NHỮNG OUTCOME CỤ THỂ BẠN SẼ NHẬN ĐƯỢC:
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
            
            {/* Outcome 1 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px" }}>
              <h4 style={{ fontSize: "17px", color: "#FFFFFF", margin: "0 0 14px", fontWeight: 700 }}>
                1. Về Năng Lượng & Thể Chất<br />
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 600 }}>(Health & Biology Reset)</span>
              </h4>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                <li>Tự động thức dậy trước 7h sáng với đầu óc tỉnh táo, sảng khoái — không cần chuông báo thức hay cảm giác uể oải.</li>
                <li>Chấm dứt hoàn toàn tình trạng kiệt sức mãn tính (burnout) và lờ đờ buổi chiều; năng lượng duy trì ổn định suốt 14 tiếng mỗi ngày.</li>
                <li>Chấm dứt cảnh thức khuya lướt điện thoại, ăn uống thất thường hay lạm dụng chất kích thích — nhờ cài đặt lại con người bên trong.</li>
              </ul>
            </div>

            {/* Outcome 2 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px" }}>
              <h4 style={{ fontSize: "17px", color: "#FFFFFF", margin: "0 0 14px", fontWeight: 700 }}>
                2. Về Hiệu Suất & Công Việc<br />
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 600 }}>(Wealth & Peak Performance)</span>
              </h4>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                <li>X3 hiệu suất: Chỉ 2–3 tiếng tập trung sâu mỗi ngày để giải quyết lượng việc cả tuần, trả lại bạn thời gian thảnh thơi.</li>
                <li>Xóa bỏ thói quen trì hoãn: Thấy việc là làm ngay — không do dự, không ngại ngùng, không nghĩ ngợi lung tung.</li>
                <li>Tự tin xuất hiện, xây thương hiệu cá nhân và triển khai dự án ấp ủ bấy lâu — không còn sợ hãi ánh nhìn hay phán xét của người khác.</li>
              </ul>
            </div>

            {/* Outcome 3 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px" }}>
              <h4 style={{ fontSize: "17px", color: "#FFFFFF", margin: "0 0 14px", fontWeight: 700 }}>
                3. Về Tâm Trí & Nội Tâm<br />
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 600 }}>(Self & Mindset Mastery)</span>
              </h4>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                <li>Tắt hẳn tiếng nói tự chỉ trích và hội chứng kẻ giả mạo; xác lập niềm tin vững chắc vào năng lực chính mình.</li>
                <li>Vững vàng, điềm đạm trước mọi biến cố công việc hay áp lực tài chính — không còn bị cảm xúc chi phối hay hoảng loạn vô cớ.</li>
                <li>Sở hữu lộ trình cuộc sống sáng rõ: biết mình là ai, muốn gì và từng bước tiến tới mục tiêu trong sự thong dong, bình an.</li>
              </ul>
            </div>

            {/* Outcome 4 */}
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "26px" }}>
              <h4 style={{ fontSize: "17px", color: "#FFFFFF", margin: "0 0 14px", fontWeight: 700 }}>
                4. Về Mối Quan Hệ & Lối Sống<br />
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 600 }}>(Love & Lifestyle Design)</span>
              </h4>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                <li>Tự tin thiết lập ranh giới lành mạnh, dứt bỏ cảm giác cả nể và không còn bị chi phối bởi kỳ vọng của người khác.</li>
                <li>Nâng cao vị thế cá nhân trong mắt gia đình, bạn bè và đối tác; trở thành chỗ dựa vững chãi, đáng tin cậy.</li>
                <li>Làm chủ thời gian biểu: Vừa bứt phá thu nhập, vừa thảnh thơi chăm sóc bản thân, gia đình và tận hưởng cuộc sống.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CẤU TRÚC CHI TIẾT CÁC HỌC PHẦN & HÌNH THỨC HỌC */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#0B0D0F" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 07 · CURRICULUM ARCHITECTURE
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 32px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Cấu trúc chi tiết các học phần & Hình thức học
          </h2>

          {/* Formats Overview Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "36px" }}>
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "10px" }}>
              <div style={{ color: "#E87A3E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>HÌNH THỨC HỌC</div>
              <div style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>Video bài giảng ngắn gọn</div>
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>10–15 phút/video, đi thẳng vào bản chất, không lan man lý thuyết.</span>
            </div>

            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "10px" }}>
              <div style={{ color: "#E87A3E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>CÔNG CỤ ĐI KÈM</div>
              <div style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>Hệ thống Action-Sheet</div>
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>Nhật ký tự điền mỗi ngày (chỉ mất 10 phút sáng/tối).</span>
            </div>

            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "20px", borderRadius: "10px" }}>
              <div style={{ color: "#E87A3E", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>THỜI GIAN HOÀN THÀNH</div>
              <div style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>Lộ trình 21 ngày</div>
              <span style={{ color: "#94A3B8", fontSize: "13px" }}>Thiết kế tinh gọn, tích hợp mượt mà cho người bận rộn nhất.</span>
            </div>
          </div>

          {/* 4 MODULES CARDS */}
          <div style={{ display: "grid", gap: "18px" }}>
            {fourModules.map((m, idx) => (
              <div
                key={idx}
                style={{
                  background: "#111317",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "26px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#E87A3E", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em" }}>
                    {m.label}
                  </span>
                  <span style={{ color: "#64748B", fontSize: "12px", fontFamily: "monospace" }}>MODULE {m.num}</span>
                </div>
                <h3 style={{ fontSize: "18px", color: "#FFFFFF", margin: "0 0 10px", fontWeight: 700 }}>
                  {m.title}
                </h3>
                <p style={{ color: "#94A3B8", fontSize: "14px", margin: "0 0 16px", lineHeight: 1.65 }}>
                  {m.desc}
                </p>
                <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "12px" }}>
                  <ul style={{ paddingLeft: "16px", margin: 0, display: "grid", gap: "6px", fontSize: "13px", color: "#CBD5E1" }}>
                    {m.outcomes.map((item, oIdx) => (
                      <li key={oIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: BẰNG CHỨNG XÃ HỘI TỪ HỌC VIÊN THỰC TẾ */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#08090A" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 08 · SOCIAL PROOF & FEEDBACK
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 16px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Bằng chứng xã hội từ học viên thực tế
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "16px", margin: "0 0 36px" }}>
            Những người từng loay hoay, tự ti và hoang mang nhất đã chuyển hóa như thế nào sau khi làm việc cùng Đạt và áp dụng hệ thống này:
          </p>

          <div style={{ display: "grid", gap: "18px" }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#111317",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "24px 28px",
                }}
              >
                <p style={{ color: "#E2E8F0", fontSize: "15px", fontStyle: "italic", margin: "0 0 16px", lineHeight: 1.75 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      fontSize: "14px",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <strong style={{ color: "#FFFFFF", fontSize: "14px", display: "block" }}>{t.name}</strong>
                    <span style={{ color: "#64748B", fontSize: "12px" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: ĐẦU TƯ, BẢO HÀNH & ƯU ĐÃI KHAN HIẾM */}
      <section id="offer" style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#0B0D0F" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 09 · INVESTMENT & BONUSES
          </span>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "#FFFFFF", margin: "12px 0 16px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Đầu tư, Bảo hành & Ưu đãi khan hiếm
          </h2>
          <p style={{ color: "#94A3B8", fontSize: "16px", margin: "0 0 36px", lineHeight: 1.7 }}>
            Để tự mình tìm ra và đóng gói hệ thống này, tôi đã phải trả giá bằng 10 năm va vấp, những lần trắng tay, vỡ nợ và kiệt quệ sức khỏe. Bạn không cần phải mất 10 năm chịu đựng những nỗi đau đó.
          </p>

          {/* MAIN PRICE BOX */}
          <div
            style={{
              background: "#111317",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "16px",
              padding: "36px 30px",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6)",
              marginBottom: "36px",
            }}
          >
            <div style={{ textAlign: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "24px", marginBottom: "28px" }}>
              <span style={{ color: "#64748B", fontSize: "14px" }}>Giá trị thực tế của toàn bộ chương trình: </span>
              <span style={{ textDecoration: "line-through", color: "#64748B", fontSize: "16px" }}>4.500.000đ</span>
              
              <div style={{ margin: "12px 0 6px" }}>
                <span style={{ fontSize: "12px", color: "#E87A3E", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  ƯU ĐÃI ÁP DỤNG HÔM NAY:
                </span>
                <div style={{ fontSize: "clamp(44px, 6vw, 64px)", color: "#FFFFFF", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em" }}>
                  1.499.000đ
                </div>
              </div>

              <div style={{ color: "#94A3B8", fontSize: "13px", marginTop: "8px" }}>
                ⚠️ Chỉ dành cho 100 suất đầu tiên, sau đó tăng về giá gốc 3.000.000đ
              </div>
            </div>

            {/* BONUSES */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "14px" }}>
                QUÀ TẶNG KÈM THEO KHI ĐĂNG KÝ HÔM NAY:
              </div>

              <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#CBD5E1", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 1:</strong> Template Nhật Ký Cài Đặt Bản Dạng 21 Ngày trên Notion/PDF</span>
                  <span style={{ color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 500k</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#CBD5E1", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 2:</strong> Audio Dẫn Thiền Xóa Bỏ Neo Cảm Xúc Tiêu Cực Trước Khi Ngủ</span>
                  <span style={{ color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 700k</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#CBD5E1", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 3:</strong> Cẩm Nang Điều Chỉnh 4 Hormone Sinh Học Tự Nhiên</span>
                  <span style={{ color: "#94A3B8", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 400k</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#FFFFFF", paddingTop: "4px" }}>
                  <span>• <strong>Fast-Action Bonus:</strong> 1 Buổi Group Q&A trực tiếp giải đáp điểm nghẽn cùng Đạt (50 người đầu)</span>
                  <span style={{ color: "#10B981", fontWeight: 700, whiteSpace: "nowrap", marginLeft: "8px" }}>VÔ GIÁ</span>
                </div>
              </div>
            </div>

            {/* 14-DAY GUARANTEE */}
            <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "10px", padding: "20px", marginBottom: "24px" }}>
              <strong style={{ color: "#FFFFFF", fontSize: "15px", display: "block", marginBottom: "4px" }}>
                🛡️ CAM KẾT HOÀN TIỀN 100% TRONG 14 NGÀY:
              </strong>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: "14px", lineHeight: 1.6 }}>
                Nếu sau khi học và làm theo bài tập, bạn thấy tư duy và năng lượng của mình không có gì thay đổi: Chỉ cần nhắn một tin, tôi sẽ hoàn lại 100% học phí cho bạn ngay lập tức. Không hỏi khó, không lý do.
              </p>
            </div>

            {/* CLEAN WHITE CTA BUTTON */}
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#08090A",
                fontWeight: 800,
                padding: "20px 32px",
                borderRadius: "4px",
                fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)",
                width: "100%",
                boxSizing: "border-box",
                textAlign: "center",
              }}
            >
              TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG & RESET HỆ ĐIỀU HÀNH NGAY →
            </a>

          </div>

        </div>
      </section>

      {/* SECTION 10: NGÃ RẼ CUỘC ĐỜI (FORK IN THE ROAD) & P.S. */}
      <section style={{ padding: "90px 20px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", background: "#08090A" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <span style={{ color: "#E87A3E", fontWeight: 700, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SECTION 10 · FORK IN THE ROAD
          </span>
          <h2 style={{ fontSize: "clamp(24px, 3.6vw, 38px)", color: "#FFFFFF", margin: "12px 0 24px", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em" }}>
            Ngã rẽ cuộc đời (Fork in the road)
          </h2>

          <p style={{ fontSize: "18px", color: "#E2E8F0", margin: "0 0 24px" }}>
            Bạn luôn có 2 sự lựa chọn:
          </p>

          <div style={{ display: "grid", gap: "16px", marginBottom: "36px" }}>
            
            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.06)", padding: "20px 24px", borderRadius: "10px" }}>
              <strong style={{ color: "#64748B", fontSize: "14px", display: "block", textTransform: "uppercase", marginBottom: "4px" }}>
                ✕ LỰA CHỌN 1:
              </strong>
              <p style={{ margin: 0, color: "#94A3B8", fontSize: "15px" }}>
                Đóng trang này lại, tiếp tục dùng 5% ý chí để đánh vật với 95% tiềm thức cũ. Chấp nhận vòng lặp kiệt sức, trì hoãn và nhìn thêm vài năm tuổi trẻ trôi qua trong vô định.
              </p>
            </div>

            <div style={{ background: "#111317", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "20px 24px", borderRadius: "10px" }}>
              <strong style={{ color: "#E87A3E", fontSize: "14px", display: "block", textTransform: "uppercase", marginBottom: "4px" }}>
                ✓ LỰA CHỌN 2:
              </strong>
              <p style={{ margin: 0, color: "#FFFFFF", fontSize: "15px", fontWeight: 600 }}>
                Bấm vào nút đăng ký, đầu tư 1.499k để nhận ngay quy trình cài lại con người mới, xóa sạch mông lung và bắt đầu một cuộc sống tự tin, thảnh thơi từ hôm nay.
              </p>
            </div>

          </div>

          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFFFFF",
                color: "#08090A",
                fontWeight: 800,
                padding: "18px 36px",
                borderRadius: "4px",
                fontSize: "15px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(255, 255, 255, 0.15)",
              }}
            >
              TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG & RESET HỆ ĐIỀU HÀNH NGAY BÂY GIỜ →
            </a>
          </div>

          {/* P.S. BOX */}
          <div style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.08)", padding: "24px 28px", borderRadius: "12px", fontSize: "15px", lineHeight: 1.75 }}>
            <strong style={{ color: "#FFFFFF", display: "block", marginBottom: "6px" }}>
              P.S.: Nếu bạn lướt thẳng xuống đây:
            </strong>
            <p style={{ margin: "0 0 12px", color: "#94A3B8" }}>
              Bạn không cần mất 10 năm trả giá bằng kiệt sức, trầm cảm hay nợ nần như tôi. Chỉ với <strong style={{ color: "#FFFFFF" }}>1.499k</strong>, bạn có ngay quy trình từng bước để đổi mới con người bên trong, lấy lại năng lượng và làm việc tập trung mỗi ngày. Khóa học có bảo hành hoàn tiền 100% trong 14 ngày nếu không mang lại hiệu quả, nên bạn hoàn toàn không có rủi ro nào cả.
            </p>
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{ color: "#E87A3E", fontWeight: 700, textDecoration: "underline", fontSize: "14px" }}
            >
              [Bấm vào đây để nhận tài khoản học ngay lập tức →]
            </a>
          </div>

        </div>
      </section>

      {/* MULTI-COLUMN EDITORIAL FOOTER (MATCHING REFERENCE UI) */}
      <footer style={{ background: "#060708", color: "#64748B", padding: "80px 20px 40px", fontSize: "13px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "36px", marginBottom: "60px" }}>
            <div>
              <span style={{ display: "block", color: "#94A3B8", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                SYSTEM
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Interactive Protocol</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Identity Shifting</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Energy Calibration</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Deep Work Routine</a></li>
              </ul>
            </div>

            <div>
              <span style={{ display: "block", color: "#94A3B8", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                CURRICULUM
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Học phần 1: Bức tranh tự thân</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Học phần 2: Reset sinh học</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Học phần 3: Identity Shift</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Học phần 4: Flow State</a></li>
              </ul>
            </div>

            <div>
              <span style={{ display: "block", color: "#94A3B8", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                HELP CENTER
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                <li><a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Zalo Support 24/7</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Chính sách hoàn tiền 14 ngày</a></li>
                <li><a href="#offer" style={{ color: "#CBD5E1", textDecoration: "none" }}>Hướng dẫn thanh toán SePAY OCB</a></li>
              </ul>
            </div>

            <div>
              <span style={{ display: "block", color: "#94A3B8", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>
                GET STARTED TODAY
              </span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
                <li><a href="/checkout" style={{ color: "#CBD5E1", textDecoration: "none" }}>Đăng ký gói 1.499.000đ</a></li>
                <li><a href="/checkout" style={{ color: "#CBD5E1", textDecoration: "none" }}>Tải Action-Sheet 21 Ngày</a></li>
                <li><a href="/checkout" style={{ color: "#CBD5E1", textDecoration: "none" }}>Nhận 4 Quà Tặng Độc Quyền</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontSize: "12px" }}>
            <span>© 2026 IDENTITY DESIGN™. ALL RIGHTS RESERVED.</span>
            <span style={{ color: "#475569" }}>Designed with Dark Stippled Minimalist System</span>
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
            background: "rgba(11, 13, 15, 0.95)",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 9999,
            backdropFilter: "blur(10px)",
            boxShadow: "0 -10px 30px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 600 }}>IDENTITY DESIGN™</span>
            <strong style={{ fontSize: "16px", color: "#FFFFFF" }}>1.499.000đ</strong>
          </div>
          <a
            href="/checkout"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            style={{
              background: "#FFFFFF",
              color: "#08090A",
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

      {/* LEAD CAPTURE MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.85)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              background: "#111317",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              borderRadius: "14px",
              padding: "36px 30px",
              maxWidth: "440px",
              width: "100%",
              position: "relative",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
              boxSizing: "border-box",
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                fontSize: "22px",
                color: "#64748B",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "20px", margin: "0 0 6px", fontWeight: 800, textAlign: "center", color: "#FFFFFF" }}>
              Nhập thông tin của bạn
            </h3>
            <p style={{ color: "#94A3B8", fontSize: "13px", textAlign: "center", margin: "0 0 22px" }}>
              Nhận tài khoản học IDENTITY DESIGN™ & Bộ 4 quà tặng
            </p>

            <form onSubmit={handleModalSubmit} style={{ display: "grid", gap: "14px" }}>
              <div>
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={modalData.name}
                  onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#08090A",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email của bạn"
                  value={modalData.email}
                  onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#08090A",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại (có Zalo)"
                  value={modalData.phone}
                  onChange={(e) => setModalData({ ...modalData, phone: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    background: "#08090A",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "6px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "#FFFFFF",
                  color: "#08090A",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 800,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(255,255,255,0.15)",
                  marginTop: "6px",
                  letterSpacing: "-0.01em",
                }}
              >
                TIẾP TỤC ĐẶT HÀNG (1.499.000Đ) →
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
