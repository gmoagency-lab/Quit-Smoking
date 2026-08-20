"use client";

import { useEffect, useState } from "react";
import * as fpixel from "../lib/fpixel";

const fourModules = [
  {
    num: "HỌC PHẦN 1",
    title: "GIẢI PHẪU BỨC TRANH TỰ THÂN & BẺ GÃY ĐIỂM NGHẼN CĂN TÍNH",
    desc: "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn. Xóa bỏ Hội chứng kẻ giả mạo và dọn sạch tiếng nói chỉ trích bên trong.",
    outcomes: [
      "Nhận diện chính xác cơ chế tự hủy hoại vô thức đang kẹp giữ bạn",
      "Xóa bỏ Hội chứng kẻ giả mạo (Imposter Syndrome) và dọn sạch tiếng nói tự phán xét",
      "Bẻ gãy neo cảm xúc tiêu cực và sự tự ti tích tụ trong quá khứ",
    ],
  },
  {
    num: "HỌC PHẦN 2",
    title: "RESET SINH HỌC & KÍCH HOẠT 4 LOẠI NĂNG LƯỢNG",
    desc: "Làm chủ Thể chất – Tinh thần – Cảm xúc – Ý nghĩa để chấm dứt tình trạng dậy lờ đờ, mất tập trung. Thiết lập nhịp sinh học tự nhiên: ngủ sâu, dậy tỉnh táo trước 7h sáng không cần báo thức.",
    outcomes: [
      "Làm chủ 4 loại năng lượng: Thể chất – Tinh thần – Cảm xúc – Ý nghĩa",
      "Chấm dứt hoàn toàn tình trạng dậy lờ đờ, sụt pin buổi chiều và kiệt sức mãn tính",
      "Thiết lập nhịp sinh học tự nhiên: Ngủ sâu, tự động dậy trước 7h sáng tràn trề sinh lực",
    ],
  },
  {
    num: "HỌC PHẦN 3",
    title: "CÔNG THỨC DỊCH CHUYỂN CĂN TÍNH (IDENTITY SHIFTING PROTOCOL)",
    desc: "Phương pháp thay đổi niềm tin cốt lõi chỉ bằng kỹ thuật tái định hình danh xưng. Quy trình khóa chặt bản dạng mới vào tiềm thức thông qua cấu trúc nhật ký 21 ngày.",
    outcomes: [
      "Phương pháp thay đổi niềm tin cốt lõi bằng kỹ thuật tái định hình danh xưng",
      "Dạy cho tiềm thức tin rằng việc bứt phá và kỷ luật là điều hoàn toàn hiển nhiên",
      "Quy trình khóa chặt bản dạng mới vào tiềm thức qua cấu trúc nhật ký 21 ngày",
    ],
  },
  {
    num: "HỌC PHẦN 4",
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
      setShowSticky(window.scrollY > window.innerHeight * 0.6 && !inOffer);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="letter-page"
      style={{
        background: "#F3F0E8",
        color: "#191B19",
        fontFamily: "var(--font-body), system-ui, -apple-system, sans-serif",
        lineHeight: 1.85,
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          background: "#252B25",
          color: "#FAD08B",
          padding: "12px 16px",
          textAlign: "center",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.05em",
        }}
      >
        ⚡ DÀNH RIÊNG CHO NGƯỜI MUỐN CHẤM DỨT VÒNG LẶP TRÌ HOÃN & BỨT PHÁ BẢN DẠNG HIỆU SUẤT CAO
      </div>

      {/* HERO SECTION — CHARCOAL BLACK */}
      <header
        style={{
          background: "#171A18",
          color: "#F5F2E9",
          padding: "50px 20px 70px",
          borderBottom: "1px solid #2B332B",
        }}
      >
        <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-block",
              background: "rgba(217, 103, 50, 0.18)",
              border: "1px solid #D96732",
              color: "#FAD08B",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            BẬT MÃ NGUỒN CĂN TÍNH MỚI (IDENTITY DESIGN™)
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(26px, 4.5vw, 46px)",
              color: "#D96732",
              lineHeight: 1.25,
              fontWeight: 900,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            TẠI SAO BẠN KHÔNG THỂ BỨT PHÁ<br />DÙ ĐÃ THỬ ĐỦ MỌI CÁCH?
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 20px)",
              color: "#FAD08B",
              lineHeight: 1.6,
              maxWidth: "760px",
              margin: "0 auto 32px",
              fontWeight: 700,
            }}
          >
            Tại sao 95% nỗ lực thay đổi của bạn đều thất bại?<br />
            <span style={{ color: "#D5DFDB", fontWeight: 400, fontSize: "16px" }}>
              Và 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững.
            </span>
          </p>

          {/* Primary CTA Button in Hero */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "24px" }}>
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{
                display: "inline-block",
                background: "#D96732",
                color: "white",
                fontWeight: 900,
                padding: "20px 42px",
                borderRadius: "8px",
                fontSize: "clamp(15px, 2.5vw, 19px)",
                textDecoration: "none",
                boxShadow: "0 14px 40px rgba(217,103,50,0.45)",
                textTransform: "uppercase",
                lineHeight: 1.35,
                textAlign: "center",
              }}
            >
              [ TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG NGAY → ]
            </a>
            <span style={{ color: "#74766F", fontSize: "13px" }}>
              Truy cập khóa học trọn đời · Ưu đãi 1.499.000đ · Bảo hành hoàn tiền 100% trong 14 ngày
            </span>
          </div>

        </div>
      </header>

      {/* SECTION 1: ATTENTION & HOOK (WARM IVORY) */}
      <section style={{ padding: "80px 20px", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", fontSize: "18px", color: "#191B19" }}>
          
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#171A18", margin: "0 0 24px", fontWeight: 900, lineHeight: 1.3 }}>
            [1] NẾU BẠN ĐANG CẢM THẤY MÌNH RƠI VÀO MỘT CÁI BẪY VÔ HÌNH:
          </h2>

          <div style={{ background: "#FFFFFF", borderLeft: "4px solid #D96732", padding: "24px 28px", borderRadius: "8px", margin: "24px 0", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
            <p style={{ margin: "0 0 16px", fontWeight: 600 }}>
              👉 Bạn ấp ủ rất nhiều dự định lớn, muốn đổi nghề, muốn bứt phá thu nhập, muốn xây dựng một sự nghiệp tự do.
            </p>
            <p style={{ margin: "0 0 16px", fontWeight: 600 }}>
              👉 Bạn bắt đầu hừng hực khí thế, nhưng chỉ sau vài ngày, cảm giác bất an và tiếng nói <em>&ldquo;Mày chưa đủ giỏi đâu&rdquo;</em> lại kéo bạn sụp đổ.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              👉 Bạn nhìn bạn bè đồng trang lứa tiến xa, còn mình thì dậm chân tại chỗ trong sự mông lung và tự dằn vặt...
            </p>
          </div>

          <p style={{ fontSize: "20px", fontWeight: 800, color: "#92400E", margin: "32px 0 16px" }}>
            Thì xin bạn hãy dừng lại một phút và đọc thật kỹ bài viết này.
          </p>

          <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
            Bởi vì sự thật giải thoát nhất mà bạn sắp biết là: <strong>Bạn không hề thiếu năng lực.</strong> Bạn chỉ đang là nạn nhân của một hiện tượng tâm lý ngầm chưa từng được ai chỉ ra.
          </p>

        </div>
      </section>

      {/* SECTION 2: RESEARCH & PROBLEM SETUP — VÒNG XOÁY BẾ TẮC CỦA Ý CHÍ (WHITE PAPER) */}
      <section style={{ padding: "80px 20px", background: "#FFFFFF", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", fontSize: "18px", color: "#191B19" }}>
          
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", color: "#171A18", margin: "0 0 24px", fontWeight: 900, lineHeight: 1.3 }}>
            [2] VÒNG XOÁY BẾ TẮC CỦA Ý CHÍ
          </h2>

          <p>Tôi biết rất rõ cảm giác này.</p>

          <div style={{ background: "#F9F8F5", border: "1px solid #E5DFD2", padding: "24px 28px", borderRadius: "12px", margin: "24px 0", fontStyle: "italic", color: "#4B5563", lineHeight: 1.8 }}>
            &ldquo;Cảm giác sáng thức dậy không muốn bước ra khỏi giường. Cảm giác ôm hàng tá việc, hút thuốc liên tục, thức xuyên đêm, làm việc 16–17 tiếng mỗi ngày chỉ để chứng minh giá trị của mình... nhưng đổi lại là cơ thể suy kiệt, công việc đổ vỡ và rơi vào trầm cảm suốt 3 tháng không dám gặp ai.&rdquo;
          </div>

          <p style={{ fontWeight: 800, fontSize: "19px", color: "#D96732", margin: "28px 0 12px" }}>
            Khi đó, phản xạ tự nhiên của chúng ta là gì?
          </p>

          <ul style={{ paddingLeft: "24px", margin: "0 0 24px", display: "grid", gap: "12px" }}>
            <li><strong>Mua thêm một khóa học kỹ năng cứng</strong> (marketing, sales, quản trị, công cụ mới).</li>
            <li><strong>Đọc thêm sách self-help</strong> để tìm động lực và hưng phấn ngắn hạn.</li>
            <li><strong>Ép bản thân phải kỷ luật sắt đá:</strong> Dậy sớm 5h sáng, ghi chép, làm việc điên cuồng bằng ý chí.</li>
          </ul>

          <div style={{ background: "rgba(217, 103, 50, 0.1)", border: "1px solid #D96732", padding: "20px 24px", borderRadius: "10px", margin: "28px 0" }}>
            <p style={{ margin: 0, fontWeight: 700, color: "#92400E" }}>
              Nhưng chuyện gì xảy ra sau đó? Chỉ được dăm ba bữa, bạn lại quay về lối sống cũ. Bạn cảm thấy tội lỗi, mất niềm tin vào chính mình và bắt đầu tin vào lời nguyền: <em>&ldquo;Chắc số mình sinh ra chỉ đến thế thôi&rdquo;</em>.
            </p>
          </div>

          <p style={{ fontSize: "20px", fontWeight: 900, color: "#171A18", marginTop: "24px" }}>
            Tại sao lại có nghịch lý này? Tại sao những người thông minh, chăm chỉ như bạn lại liên tục thất bại trong việc thay đổi chính mình?
          </p>

        </div>
      </section>

      {/* SECTION 3: UMP — HIỆN TƯỢNG ĐOẢN MẠCH BỨC TRANH TỰ THÂN (CHARCOAL DARK) */}
      <section style={{ padding: "90px 20px", background: "#171A18", color: "#F5F2E9", borderBottom: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              NGUYÊN NHÂN GỐC RỄ (UNIQUE MECHANISM OF PROBLEM)
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#F5F2E9", margin: "10px 0 16px", fontWeight: 900 }}>
              [3] HIỆN TƯỢNG ĐOẢN MẠCH BỨC TRANH TỰ THÂN
            </h2>
            <p style={{ color: "#FAD08B", fontSize: "18px", maxWidth: "680px", margin: "0 auto", fontWeight: 700 }}>
              Các phương pháp ngoài kia thất bại vì chỉ sửa 5% Ý thức (kỹ năng, hành vi), nhưng bỏ quên 95% Tiềm thức (bản dạng cốt lõi).
            </p>
          </div>

          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "16px", marginBottom: "32px", fontSize: "17px", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 18px" }}>
              Theo khoa học thần kinh nhận thức, bên trong tiềm thức của bạn luôn lưu giữ một <strong>Bức Tranh Tự Thân (Self-Image)</strong>. Bức tranh này được vẽ nên từ những tổn thương thời thơ ấu, định kiến gia đình và những lần vấp ngã trong quá khứ.
            </p>
            <p style={{ margin: 0, color: "#FAD08B", fontWeight: 700 }}>
              Nó âm thầm định nghĩa: Bạn là ai, bạn xứng đáng với điều gì, và giới hạn an toàn của bạn ở đâu.
            </p>
          </div>

          {/* 3 Mechanisms */}
          <div style={{ display: "grid", gap: "20px" }}>
            
            <div style={{ background: "#1F241F", borderLeft: "4px solid #D96732", padding: "20px 24px", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 8px", fontWeight: 800 }}>
                1. Não bộ luôn bắt hành động phải khớp với niềm tin bên trong:
              </h3>
              <p style={{ margin: 0, color: "#D5DFDB", fontSize: "16px" }}>
                Bạn không bao giờ vượt qua được giới hạn mà tiềm thức tự gán cho mình. Dù bạn cố gắng đến đâu ngoài mặt ý thức, tiềm thức sẽ luôn kéo bạn về lại mức trung bình cũ.
              </p>
            </div>

            <div style={{ background: "#1F241F", borderLeft: "4px solid #D96732", padding: "20px 24px", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 8px", fontWeight: 800 }}>
                2. Sự đoản mạch giữa hành động và niềm tin:
              </h3>
              <p style={{ margin: 0, color: "#D5DFDB", fontSize: "16px" }}>
                Bạn muốn bứt phá ra ngoài đời thực. Nhưng tiềm thức của bạn lại chỉ tin vào những thất bại, nỗi sợ và sự tự ti trong quá khứ.
              </p>
            </div>

            <div style={{ background: "#1F241F", borderLeft: "4px solid #D96732", padding: "20px 24px", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 8px", fontWeight: 800 }}>
                3. Hội chứng kẻ giả mạo & Tự hủy hoại (Self-Sabotage):
              </h3>
              <p style={{ margin: 0, color: "#D5DFDB", fontSize: "16px" }}>
                Hành vi bên ngoài lệch pha với con người bên trong sẽ khiến não bộ báo động đỏ. Kết quả là đầu óc bạn tự sinh ra nỗi sợ và sự trì hoãn. Bạn tự bỏ cuộc ngay trước vạch đích chỉ để cảm thấy an toàn như trước đây.
              </p>
            </div>

          </div>

          <div style={{ textAlign: "center", marginTop: "36px", padding: "20px", background: "rgba(217, 103, 50, 0.15)", border: "2px dashed #D96732", borderRadius: "12px" }}>
            <p style={{ margin: 0, fontSize: "19px", fontWeight: 900, color: "#FAD08B" }}>
              📌 KẾT LUẬN: Hành vi không thể bền nếu chưa thay đổi được con người bên trong. Mọi nỗ lực gồng ép chỉ khiến bạn thêm mệt mỏi và nhanh bỏ cuộc.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: UMS — QUY TRÌNH ĐỒNG BỘ HÓA BẢN DẠNG 3 CHIỀU (TIA) (WARM IVORY) */}
      <section style={{ padding: "90px 20px", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              GIẢI PHÁP ĐỘT PHÁ (UNIQUE MECHANISM OF SOLUTION)
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#171A18", margin: "10px 0 16px", fontWeight: 900 }}>
              [4] QUY TRÌNH ĐỒNG BỘ HÓA BẢN DẠNG 3 CHIỀU (TIA™)
            </h2>
            <p style={{ color: "#74766F", fontSize: "18px", maxWidth: "680px", margin: "0 auto" }}>
              Đừng cố ép bản thân thay đổi hành vi trong kiệt sức nữa. Giải pháp thực sự là Quy trình 3 bước giúp bạn cài đặt lại chính xác 3 điểm nghẽn bên trong tiềm thức:
            </p>
          </div>

          {/* 3 STEPS CARDS */}
          <div style={{ display: "grid", gap: "24px" }}>
            
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "28px 32px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "white", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>1</span>
                <h3 style={{ fontSize: "20px", color: "#171A18", margin: 0, fontWeight: 900 }}>
                  BƯỚC 1: Dọn sạch cảm xúc và nhổ bỏ niềm tin giới hạn
                </h3>
              </div>
              <p style={{ margin: 0, color: "#4B5563", fontSize: "17px", lineHeight: 1.7, paddingLeft: "50px" }}>
                Gỡ bỏ những nỗi sợ, sự tự ti và ký ức thất bại trong quá khứ mà không cần phải nhắc lại nỗi đau hay trị liệu phức tạp.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "28px 32px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "white", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>2</span>
                <h3 style={{ fontSize: "20px", color: "#171A18", margin: 0, fontWeight: 900 }}>
                  BƯỚC 2: Cài lại tiếng nói trong đầu và đổi danh xưng con người mới
                </h3>
              </div>
              <p style={{ margin: 0, color: "#4B5563", fontSize: "17px", lineHeight: 1.7, paddingLeft: "50px" }}>
                Tự định vị mình là người tự tin, kỷ luật và bản lĩnh — dạy cho tiềm thức tin rằng việc bứt phá là điều hoàn toàn hiển nhiên.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "28px 32px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "white", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "16px" }}>3</span>
                <h3 style={{ fontSize: "20px", color: "#171A18", margin: 0, fontWeight: 900 }}>
                  BƯỚC 3: Nạp đầy pin và thiết lập nhịp sinh học tràn trề năng lượng
                </h3>
              </div>
              <p style={{ margin: 0, color: "#4B5563", fontSize: "17px", lineHeight: 1.7, paddingLeft: "50px" }}>
                Cân bằng lại nhịp sinh học tự nhiên: Sáng dậy tỉnh táo, làm việc tập trung sâu mà không còn bị kiệt sức.
              </p>
            </div>

          </div>

          <div style={{ background: "#171A18", color: "#F5F2E9", padding: "28px 32px", borderRadius: "16px", marginTop: "36px", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "18px", lineHeight: 1.8, color: "#FAD08B", fontWeight: 700 }}>
              ✨ Khi 3 trục này được đồng bộ, Bản Dạng Mới sẽ trở thành Cài Đặt Mặc Định.<br />
              <span style={{ color: "#D5DFDB", fontWeight: 400, fontSize: "16px" }}>
                Bạn hành động dứt khoát, tự tin xuất hiện và đạt kết quả mà không cần tốn một giọt năng lượng nào để đấu tranh nội tâm.
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5: KHÓA HỌC DÀNH CHO AI & KHÔNG DÀNH CHO AI? (WHITE PAPER) */}
      <section style={{ padding: "90px 20px", background: "#FFFFFF", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          
          <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", color: "#171A18", margin: "0 0 36px", fontWeight: 900, textAlign: "center" }}>
            [5] KHÓA HỌC DÀNH CHO AI & KHÔNG DÀNH CHO AI?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            
            {/* DÀNH CHO AI */}
            <div style={{ background: "#F0FDF4", border: "2px solid #22C55E", padding: "30px 24px", borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ fontSize: "24px" }}>✅</span>
                <h3 style={{ fontSize: "19px", color: "#166534", margin: 0, fontWeight: 900 }}>
                  CHƯƠNG TRÌNH NÀY DÀNH CHO BẠN NẾU:
                </h3>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0, display: "grid", gap: "12px", fontSize: "16px", color: "#14532D", lineHeight: 1.6 }}>
                <li>Bạn đang ở độ tuổi <strong>23–35</strong>, cảm thấy bị kẹt trong vùng an toàn, bất an vô định hoặc đang trải qua khủng hoảng 1/4 cuộc đời.</li>
                <li>Bạn từng thử dậy sớm, lập kế hoạch, mua nhiều khóa học kỹ năng nhưng chỉ duy trì được vài ngày rồi bỏ cuộc do <strong>cạn pin ý chí</strong>.</li>
                <li>Bạn cần một phương pháp chuyển hóa <strong>chuẩn khoa học và thực chiến</strong> — không lý thuyết suông, không thần thánh hóa tâm linh.</li>
              </ul>
            </div>

            {/* KHÔNG DÀNH CHO AI */}
            <div style={{ background: "#FEF2F2", border: "2px solid #EF4444", padding: "30px 24px", borderRadius: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <span style={{ fontSize: "24px" }}>❌</span>
                <h3 style={{ fontSize: "19px", color: "#991B1B", margin: 0, fontWeight: 900 }}>
                  CHƯƠNG TRÌNH KHÔNG DÀNH CHO BẠN NẾU:
                </h3>
              </div>
              <ul style={{ paddingLeft: "20px", margin: 0, display: "grid", gap: "12px", fontSize: "16px", color: "#7F1D1D", lineHeight: 1.6 }}>
                <li>Bạn đang tìm một <strong>&ldquo;viên thuốc thần&rdquo;</strong> để đổi đời sau một đêm, mà không chịu dành thời gian rèn luyện và sửa đổi lối sống.</li>
                <li>Bạn chỉ muốn tích lũy thêm lý thuyết để phán xét người khác mà không muốn trung thực đối diện với các thói quen cũ của chính mình.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: GIỚI THIỆU SẢN PHẨM & CÁC OUTCOME CHUYỂN HÓA ĐỘT PHÁ (CHARCOAL DARK) */}
      <section style={{ padding: "90px 20px", background: "#171A18", color: "#F5F2E9", borderBottom: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              GIỚI THIỆU CHƯƠNG TRÌNH ĐẶC BIỆT
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4.2vw, 42px)", color: "#FAD08B", margin: "10px 0 14px", fontWeight: 900 }}>
              IDENTITY DESIGN™
            </h2>
            <h3 style={{ fontSize: "clamp(18px, 3vw, 24px)", color: "#F5F2E9", margin: "0 0 16px", fontWeight: 800 }}>
              TÁI LẬP BẢN THÂN, RESET HỆ ĐIỀU HÀNH
            </h3>
            <p style={{ color: "#A9B2AC", fontSize: "17px", maxWidth: "680px", margin: "0 auto" }}>
              Hệ thống chuyển giao toàn diện giúp bạn bẻ gãy bản dạng kẹp giữ cũ và thiết lập phiên bản hiệu suất cao.
            </p>
          </div>

          <h3 style={{ fontSize: "20px", color: "#D96732", fontWeight: 900, textAlign: "center", textTransform: "uppercase", marginBottom: "28px" }}>
            🔥 ĐÂY LÀ NHỮNG OUTCOME CỤ THỂ BẠN SẼ NHẬN ĐƯỢC:
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
            
            {/* Outcome 1 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "24px" }}>⚡</span>
                <h4 style={{ fontSize: "18px", color: "#FAD08B", margin: 0, fontWeight: 900 }}>
                  1. Về Năng Lượng & Thể Chất<br />
                  <span style={{ fontSize: "12px", color: "#A9B2AC", fontWeight: 600 }}>(Health & Biology Reset)</span>
                </h4>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "15px", color: "#D5DFDB", lineHeight: 1.6 }}>
                <li>Tự động thức dậy trước 7h sáng với đầu óc tỉnh táo, sảng khoái — không cần chuông báo thức hay cảm giác uể oải.</li>
                <li>Chấm dứt hoàn toàn tình trạng kiệt sức mãn tính (burnout) và lờ đờ buổi chiều; năng lượng duy trì ổn định suốt 14 tiếng mỗi ngày.</li>
                <li>Chấm dứt cảnh thức khuya lướt điện thoại, ăn uống thất thường hay lạm dụng chất kích thích — nhờ cài đặt lại con người bên trong.</li>
              </ul>
            </div>

            {/* Outcome 2 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "24px" }}>🎯</span>
                <h4 style={{ fontSize: "18px", color: "#FAD08B", margin: 0, fontWeight: 900 }}>
                  2. Về Hiệu Suất & Công Việc<br />
                  <span style={{ fontSize: "12px", color: "#A9B2AC", fontWeight: 600 }}>(Wealth & Peak Performance)</span>
                </h4>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "15px", color: "#D5DFDB", lineHeight: 1.6 }}>
                <li>X3 hiệu suất: Chỉ 2–3 tiếng tập trung sâu mỗi ngày để giải quyết lượng việc cả tuần, trả lại bạn thời gian thảnh thơi.</li>
                <li>Xóa bỏ thói quen trì hoãn: Thấy việc là làm ngay — không do dự, không ngại ngùng, không nghĩ ngợi lung tung.</li>
                <li>Tự tin xuất hiện, xây thương hiệu cá nhân và triển khai dự án ấp ủ bấy lâu — không còn sợ hãi ánh nhìn hay phán xét của người khác.</li>
              </ul>
            </div>

            {/* Outcome 3 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "24px" }}>🧠</span>
                <h4 style={{ fontSize: "18px", color: "#FAD08B", margin: 0, fontWeight: 900 }}>
                  3. Về Tâm Trí & Nội Tâm<br />
                  <span style={{ fontSize: "12px", color: "#A9B2AC", fontWeight: 600 }}>(Self & Mindset Mastery)</span>
                </h4>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "15px", color: "#D5DFDB", lineHeight: 1.6 }}>
                <li>Tắt hẳn tiếng nói tự chỉ trích và hội chứng kẻ giả mạo; xác lập niềm tin vững chắc vào năng lực chính mình.</li>
                <li>Vững vàng, điềm đạm trước mọi biến cố công việc hay áp lực tài chính — không còn bị cảm xúc chi phối hay hoảng loạn vô cớ.</li>
                <li>Sở hữu lộ trình cuộc sống sáng rõ: biết mình là ai, muốn gì và từng bước tiến tới mục tiêu trong sự thong dong, bình an.</li>
              </ul>
            </div>

            {/* Outcome 4 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <span style={{ fontSize: "24px" }}>🌱</span>
                <h4 style={{ fontSize: "18px", color: "#FAD08B", margin: 0, fontWeight: 900 }}>
                  4. Về Mối Quan Hệ & Lối Sống<br />
                  <span style={{ fontSize: "12px", color: "#A9B2AC", fontWeight: 600 }}>(Love & Lifestyle Design)</span>
                </h4>
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "10px", fontSize: "15px", color: "#D5DFDB", lineHeight: 1.6 }}>
                <li>Tự tin thiết lập ranh giới lành mạnh, dứt bỏ cảm giác cả nể và không còn bị chi phối bởi kỳ vọng của người khác.</li>
                <li>Nâng cao vị thế cá nhân trong mắt gia đình, bạn bè và đối tác; trở thành chỗ dựa vững chãi, đáng tin cậy.</li>
                <li>Làm chủ thời gian biểu: Vừa bứt phá thu nhập, vừa thảnh thơi chăm sóc bản thân, gia đình và tận hưởng cuộc sống.</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: CẤU TRÚC CHI TIẾT CÁC HỌC PHẦN & HÌNH THỨC HỌC (WARM IVORY) */}
      <section style={{ padding: "90px 20px", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              LỘ TRÌNH THỰC THI
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#171A18", margin: "10px 0 16px", fontWeight: 900 }}>
              [7] CẤU TRÚC CHI TIẾT CÁC HỌC PHẦN & HÌNH THỨC HỌC
            </h2>
          </div>

          {/* Formats Overview Box */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "36px" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎬</div>
              <strong style={{ display: "block", color: "#171A18", fontSize: "16px", marginBottom: "4px" }}>Hình thức học</strong>
              <span style={{ color: "#4B5563", fontSize: "14px" }}>Video ngắn gọn 10–15 phút/video, đi thẳng vào bản chất, không lan man lý thuyết.</span>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📝</div>
              <strong style={{ display: "block", color: "#171A18", fontSize: "16px", marginBottom: "4px" }}>Công cụ đi kèm</strong>
              <span style={{ color: "#4B5563", fontSize: "14px" }}>Hệ thống Action-Sheet & Nhật ký tự điền mỗi ngày (chỉ mất 10 phút sáng/tối).</span>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🗓️</div>
              <strong style={{ display: "block", color: "#171A18", fontSize: "16px", marginBottom: "4px" }}>Thời gian hoàn thành</strong>
              <span style={{ color: "#4B5563", fontSize: "14px" }}>Lộ trình tinh gọn 21 ngày — tích hợp mượt mà cho người bận rộn nhất.</span>
            </div>
          </div>

          {/* 4 Modules Detailed */}
          <div style={{ display: "grid", gap: "20px" }}>
            {fourModules.map((m, idx) => (
              <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "28px 32px", borderRadius: "16px", boxShadow: "0 8px 25px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ background: "rgba(217, 103, 50, 0.15)", color: "#D96732", fontWeight: 900, fontSize: "12px", padding: "4px 10px", borderRadius: "4px" }}>
                    {m.num}
                  </span>
                  <h3 style={{ fontSize: "18px", color: "#171A18", margin: 0, fontWeight: 900 }}>
                    {m.title}
                  </h3>
                </div>
                <p style={{ color: "#4B5563", fontSize: "15px", margin: "0 0 14px", lineHeight: 1.6 }}>
                  {m.desc}
                </p>
                <div style={{ background: "#F9F8F5", padding: "12px 16px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                  <strong style={{ color: "#92400E", fontSize: "13px", display: "block", marginBottom: "6px" }}>🎯 Kết quả đạt được sau học phần:</strong>
                  <ul style={{ paddingLeft: "18px", margin: 0, display: "grid", gap: "4px", fontSize: "14px", color: "#1F2937" }}>
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

      {/* SECTION 8: BẰNG CHỨNG XÃ HỘI TỪ HỌC VIÊN THỰC TẾ (WHITE PAPER) */}
      <section style={{ padding: "90px 20px", background: "#FFFFFF", borderBottom: "1px solid #E5DFD2" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              CHUYỂN HÓA THỰC TẾ
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", color: "#171A18", margin: "10px 0 16px", fontWeight: 900 }}>
              [8] BẰNG CHỨNG XÃ HỘI TỪ HỌC VIÊN THỰC TẾ
            </h2>
            <p style={{ color: "#74766F", fontSize: "17px", maxWidth: "680px", margin: "0 auto" }}>
              Những người từng loay hoay, tự ti và hoang mang nhất đã chuyển hóa như thế nào sau khi làm việc cùng Đạt và áp dụng hệ thống này:
            </p>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: "#F9F8F5",
                  border: "1px solid #E5DFD2",
                  padding: "24px 28px",
                  borderRadius: "14px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                }}
              >
                <p style={{ color: "#1F2937", fontSize: "16px", fontStyle: "italic", margin: "0 0 14px", lineHeight: 1.75 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#D96732", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "15px" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <strong style={{ color: "#171A18", fontSize: "15px", display: "block" }}>{t.name}</strong>
                    <span style={{ color: "#74766F", fontSize: "13px" }}>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: ĐẦU TƯ, BẢO HÀNH & ƯU ĐÃI KHAN HIẾM (CHARCOAL DARK) */}
      <section id="offer" style={{ padding: "90px 20px", background: "#171A18", color: "#F5F2E9", borderBottom: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              BẮT ĐẦU NGAY HÔM NAY
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#FAD08B", margin: "10px 0 16px", fontWeight: 900 }}>
              [9] ĐẦU TƯ, BẢO HÀNH & ƯU ĐÃI KHAN HIẾM
            </h2>
            <p style={{ color: "#D5DFDB", fontSize: "17px", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
              Để tự mình tìm ra và đóng gói hệ thống này, tôi đã phải trả giá bằng 10 năm va vấp, những lần trắng tay, vỡ nợ và kiệt quệ sức khỏe. Bạn không cần phải mất 10 năm chịu đựng những nỗi đau đó.
            </p>
          </div>

          {/* MAIN PRICING CARD */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "20px", padding: "40px 32px", boxShadow: "0 25px 70px rgba(0,0,0,0.5)", marginBottom: "40px" }}>
            
            <div style={{ textAlign: "center", borderBottom: "1px solid #384238", paddingBottom: "24px", marginBottom: "28px" }}>
              <span style={{ color: "#A9B2AC", fontSize: "16px" }}>Giá trị thực tế của toàn bộ chương trình: </span>
              <span style={{ textDecoration: "line-through", color: "#74766F", fontSize: "18px", fontWeight: 700 }}>4.500.000đ</span>
              
              <div style={{ margin: "14px 0 8px" }}>
                <span style={{ fontSize: "14px", color: "#FAD08B", fontWeight: 800, textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  ƯU ĐÃI ĐẶC BIỆT ÁP DỤNG HÔM NAY:
                </span>
                <div style={{ fontSize: "clamp(42px, 6vw, 60px)", color: "#D96732", fontWeight: 900, lineHeight: 1 }}>
                  1.499.000đ
                </div>
              </div>

              <div style={{ background: "rgba(217, 103, 50, 0.2)", border: "1px solid #D96732", color: "#FAD08B", display: "inline-block", padding: "4px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: 800, marginTop: "8px" }}>
                ⚠️ Chỉ dành cho 100 suất đầu tiên (Sau đó tăng về giá gốc 3.000.000đ)
              </div>
            </div>

            {/* BONUSES LIST */}
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontSize: "17px", color: "#FAD08B", margin: "0 0 16px", fontWeight: 900, textTransform: "uppercase" }}>
                🎁 QUÀ TẶNG KÈM THEO KHI ĐĂNG KÝ HÔM NAY:
              </h3>

              <div style={{ display: "grid", gap: "12px", fontSize: "15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#F5F2E9", borderBottom: "1px dashed #384238", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 1:</strong> Template Nhật Ký Cài Đặt Bản Dạng 21 Ngày (Notion/PDF)</span>
                  <strong style={{ color: "#FAD08B", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 500.000đ</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#F5F2E9", borderBottom: "1px dashed #384238", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 2:</strong> Audio Dẫn Thiền Xóa Bỏ Neo Cảm Xúc Tiêu Cực Trước Khi Ngủ</span>
                  <strong style={{ color: "#FAD08B", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 700.000đ</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#F5F2E9", borderBottom: "1px dashed #384238", paddingBottom: "8px" }}>
                  <span>• <strong>Bonus 3:</strong> Cẩm Nang Điều Chỉnh 4 Hormone Sinh Học Tự Nhiên</span>
                  <strong style={{ color: "#FAD08B", whiteSpace: "nowrap", marginLeft: "8px" }}>Trị giá 400.000đ</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#FAD08B", paddingTop: "4px" }}>
                  <span>• <strong>Fast-Action Bonus:</strong> 1 Buổi Group Q&A trực tiếp giải đáp điểm nghẽn cùng Đạt (50 người đầu)</span>
                  <strong style={{ color: "#22C55E", whiteSpace: "nowrap", marginLeft: "8px" }}>VÔ GIÁ</strong>
                </div>
              </div>
            </div>

            {/* 14-DAY GUARANTEE BOX */}
            <div style={{ background: "#171A18", border: "1px solid #384238", padding: "24px", borderRadius: "12px", marginBottom: "28px", textAlign: "center" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛡️</div>
              <h4 style={{ fontSize: "18px", color: "#FAD08B", margin: "0 0 8px", fontWeight: 900 }}>
                CAM KẾT HOÀN TIỀN 100% TRONG 14 NGÀY
              </h4>
              <p style={{ margin: 0, color: "#D5DFDB", fontSize: "15px", lineHeight: 1.65 }}>
                Nếu sau khi học và làm theo bài tập, bạn thấy tư duy và năng lượng của mình không có gì thay đổi:<br />
                <strong>Chỉ cần nhắn một tin, tôi sẽ hoàn lại 100% học phí cho bạn ngay lập tức. Không hỏi khó, không lý do.</strong>
              </p>
            </div>

            {/* CTA BUTTON */}
            <div style={{ textAlign: "center" }}>
              <a
                href="/checkout"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: "640px",
                  padding: "22px 28px",
                  background: "#D96732",
                  color: "white",
                  fontWeight: 900,
                  fontSize: "clamp(16px, 2.5vw, 20px)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  boxShadow: "0 14px 40px rgba(217,103,50,0.45)",
                  textTransform: "uppercase",
                  lineHeight: 1.35,
                  boxSizing: "border-box",
                }}
              >
                👉 [ TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG & RESET HỆ ĐIỀU HÀNH NGAY ]
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 10: NGÃ RẼ CUỘC ĐỜI (FORK IN THE ROAD) & P.S. (WARM IVORY) */}
      <section style={{ padding: "90px 20px", background: "#F3F0E8" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", fontSize: "18px", color: "#191B19" }}>
          
          <h2 style={{ fontSize: "clamp(24px, 3.8vw, 36px)", color: "#171A18", margin: "0 0 28px", fontWeight: 900 }}>
            [10] NGÃ RẼ CUỘC ĐỜI (FORK IN THE ROAD)
          </h2>

          <p style={{ fontSize: "20px", fontWeight: 800, color: "#171A18", margin: "0 0 20px" }}>
            Bạn luôn có 2 sự lựa chọn:
          </p>

          <div style={{ display: "grid", gap: "20px", marginBottom: "36px" }}>
            
            <div style={{ background: "#FFFFFF", borderLeft: "4px solid #74766F", padding: "20px 24px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <strong style={{ color: "#74766F", fontSize: "18px", display: "block", marginBottom: "6px" }}>
                ❌ LỰA CHỌN 1:
              </strong>
              <p style={{ margin: 0, color: "#4B5563" }}>
                Đóng trang này lại, tiếp tục dùng 5% ý chí để đánh vật với 95% tiềm thức cũ. Chấp nhận vòng lặp kiệt sức, trì hoãn và nhìn thêm vài năm tuổi trẻ trôi qua trong vô định.
              </p>
            </div>

            <div style={{ background: "#FFFFFF", borderLeft: "4px solid #D96732", padding: "20px 24px", borderRadius: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
              <strong style={{ color: "#D96732", fontSize: "18px", display: "block", marginBottom: "6px" }}>
                ✅ LỰA CHỌN 2:
              </strong>
              <p style={{ margin: 0, color: "#171A18", fontWeight: 600 }}>
                Bấm vào nút đăng ký, đầu tư 1.499k để nhận ngay quy trình cài lại con người mới, xóa sạch mông lung và bắt đầu một cuộc sống tự tin, thảnh thơi từ hôm nay.
              </p>
            </div>

          </div>

          <div style={{ textAlign: "center", margin: "36px 0" }}>
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{
                display: "inline-block",
                background: "#D96732",
                color: "white",
                fontWeight: 900,
                padding: "20px 36px",
                borderRadius: "8px",
                fontSize: "clamp(15px, 2.5vw, 19px)",
                textDecoration: "none",
                boxShadow: "0 12px 35px rgba(217,103,50,0.4)",
                textTransform: "uppercase",
                lineHeight: 1.35,
              }}
            >
              👉 [ TÔI MUỐN TÁI THIẾT KẾ BẢN DẠNG & RESET HỆ ĐIỀU HÀNH NGAY BÂY GIỜ ]
            </a>
          </div>

          {/* P.S. BOX */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E5DFD2", padding: "28px", borderRadius: "12px", marginTop: "40px", fontSize: "16px", lineHeight: 1.8 }}>
            <p style={{ margin: "0 0 12px", fontWeight: 800, color: "#92400E" }}>
              P.S.: Nếu bạn lướt thẳng xuống đây:
            </p>
            <p style={{ margin: "0 0 16px", color: "#4B5563" }}>
              Bạn không cần mất 10 năm trả giá bằng kiệt sức, trầm cảm hay nợ nần như tôi. Chỉ với <strong>1.499k</strong>, bạn có ngay quy trình từng bước để đổi mới con người bên trong, lấy lại năng lượng và làm việc tập trung mỗi ngày. Khóa học có bảo hành hoàn tiền 100% trong 14 ngày nếu không mang lại hiệu quả, nên bạn hoàn toàn không có rủi ro nào cả.
            </p>
            <a
              href="/checkout"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              style={{ color: "#D96732", fontWeight: 800, textDecoration: "underline", fontSize: "16px" }}
            >
              👉 [Bấm vào đây để nhận tài khoản học ngay lập tức]
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "40px 0", fontSize: "12px", borderTop: "1px solid #2B332B" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "0 20px" }}>
          <b style={{ color: "#A9B2AC", fontSize: "14px" }}>IDENTITY DESIGN™ — TÁI LẬP BẢN THÂN, RESET HỆ ĐIỀU HÀNH</b>
          <p style={{ margin: "10px 0", lineHeight: 1.6 }}>
            Chương trình cung cấp nội dung đào tạo chuyên sâu về tâm lý học nhận thức, nhịp sinh học và phương pháp thiết kế bản dạng cá nhân.
          </p>
          <span>© 2026 IDENTITY DESIGN™. All rights reserved.</span>
        </div>
      </footer>

      {/* STICKY BAR FOR MOBILE & DESKTOP */}
      <div
        className={`letter-mobile-sticky ${showSticky ? "show" : ""}`}
        style={{
          background: "#171A18",
          borderColor: "#384238",
          display: showSticky ? "flex" : "none",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 16px",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #384238",
          zIndex: 9999,
          boxShadow: "0 -5px 25px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#A9B2AC", fontWeight: 600 }}>IDENTITY DESIGN™</span>
          <b style={{ fontSize: "17px", color: "#D96732" }}>1.499.000đ</b>
        </div>
        <a
          href="/checkout"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
          style={{
            background: "#D96732",
            color: "white",
            padding: "10px 20px",
            fontSize: "13px",
            fontWeight: 800,
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          ĐĂNG KÝ NGAY →
        </a>
      </div>

      {/* LEAD CAPTURE MODAL POPUP */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.75)",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              color: "#111311",
              borderRadius: "16px",
              padding: "36px 30px",
              maxWidth: "460px",
              width: "100%",
              position: "relative",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
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
                fontSize: "24px",
                color: "#74766F",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "22px", margin: "0 0 6px", fontWeight: 900, textAlign: "center", color: "#111311" }}>
              Nhập thông tin của bạn
            </h3>
            <p style={{ color: "#6B7280", fontSize: "14px", textAlign: "center", margin: "0 0 20px" }}>
              Nhận tài khoản học IDENTITY DESIGN™ & Bộ quà tặng 4 phần
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
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#111311",
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
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#111311",
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
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    outline: "none",
                    color: "#111311",
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  background: "#D96732",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 900,
                  fontSize: "16px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  boxShadow: "0 8px 25px rgba(217,103,50,0.4)",
                  marginTop: "6px",
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
