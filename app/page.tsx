"use client";

import { useEffect, useState } from "react";

const fourMaps = [
  {
    num: "01",
    title: "TRIGGER MAP™",
    tag: "Bản Đồ Nhận Diện Tác Nhân",
    desc: "Tìm đúng khoảnh khắc khiến ông muốn hút. Không còn nói chung chung 'Tui thèm thuốc'. Chuyển thành: 'Tui thèm thuốc vào bối cảnh X, sau Y, khi cảm xúc Z'. Nhìn rõ pattern để làm chủ phản ứng.",
    badge: "WORKBOOK & APP ASSET",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #333833", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "var(--orange)", fontWeight: 700, marginBottom: "4px" }}>[ PATTERN MATRIX ]</div>
        <div>▸ Cà phê sáng → Reflex Score: 9/10</div>
        <div>▸ Stress deadline → Reflex Score: 8/10</div>
        <div>▸ Mời thuốc bàn nhậu → Reflex Score: 9.5/10</div>
      </div>
    ),
  },
  {
    num: "02",
    title: "PROTOCOL 3 PHÚT™",
    tag: "Biết Làm Gì Thay Vì Gồng Ý Chí",
    desc: "Xử lý khoảnh khắc thèm thuốc trước mắt. Chuẩn bị sẵn một chuỗi hành động 3 phút để tạo khoảng cách an toàn giữa Trigger bối cảnh và phản xạ châm thuốc.",
    badge: "QUICK RESPONSE CARD",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #333833", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "var(--orange)", fontWeight: 700, marginBottom: "4px" }}>[ EMERGENCY PROTOCOL ]</div>
        <div>00:00 - Nhận diện sóng thèm</div>
        <div>01:00 - Uống 200ml nước lạnh</div>
        <div>02:00 - Reset hơi thở 4-7-8</div>
      </div>
    ),
  },
  {
    num: "03",
    title: "SOCIAL NAVIGATION SCRIPT™",
    tag: "Kịch Bản Xã Giao Đời Thật",
    desc: "Không cần cai thuốc bằng cách trốn trong phòng kín. Chuẩn bị sẵn câu từ chối tự nhiên, phong thái lịch thiệp và exit strategy khi đi làm, cà phê hay trên bàn nhậu.",
    badge: "SOCIAL SCRIPT SET",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #333833", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "var(--orange)", fontWeight: 700, marginBottom: "4px" }}>[ TABLE RESPONSE ]</div>
        <div>“Thôi ông, tui bỏ món này rồi.”</div>
        <div>▸ Chuyển chủ đề tự nhiên</div>
        <div>▸ Giữ nguyên vị thế bản lĩnh</div>
      </div>
    ),
  },
  {
    num: "04",
    title: "RECOVERY MAP™",
    tag: "Bản Đồ Phục Hồi Khẩn Cấp",
    desc: "Loại bỏ suy nghĩ 'Lỡ hút 1 điếu là hỏng hết'. Recovery Map cho ông biết chính xác phải làm gì trong 60 phút tiếp theo để lập tức quay lại hành trình mà không dằn vặt.",
    badge: "RECOVERY PROTOCOL",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #333833", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "var(--orange)", fontWeight: 700, marginBottom: "4px" }}>[ 60-MIN RECOVERY ]</div>
        <div>▸ Step 1: Dừng dằn vặt bản thân</div>
        <div>▸ Step 2: Rà lại Trigger bối cảnh</div>
        <div>▸ Step 3: Kích hoạt lại Protocol</div>
      </div>
    ),
  },
];

const sevenDays = [
  {
    day: "DAY 01",
    title: "Nhìn Thẳng Vào Vòng Lặp Hiện Tại",
    desc: "Rà lại toàn bộ thói quen hút thuốc thực tế. Không tự trách, chỉ nhìn dữ liệu: Hút lúc nào? Ở đâu? Với ai? Trước và sau khi châm thuốc tâm trí đang cảm thấy gì?",
    output: "Current Smoking Loop Map™",
  },
  {
    day: "DAY 02",
    title: "Tách Cơn Thèm Khỏi Trigger Bối Cảnh",
    desc: "Giải mã bài toán The Two-Loop Problem™. Phân biệt rõ đâu là cơn thèm thể chất nicotine, đâu là phản xạ thói quen bối cảnh lặp lại nhiều năm.",
    output: "Two-Loop Diagnostic™",
  },
  {
    day: "DAY 03",
    title: "Lập Bản Đồ Tác Nhân Trigger Map™",
    desc: "Khoanh vùng 5–7 tình huống có sức kéo mạnh nhất. Không cố sửa tất cả cùng lúc mà tập trung vào những mắt xích nguy hiểm nhất.",
    output: "Personal Trigger Map™",
  },
  {
    day: "DAY 04",
    title: "Thiết Kế Protocol Cho Cà Phê & Quen Tay",
    desc: "Xử lý những phản xạ nhỏ lặp đi lặp lại hàng ngày. Chèn một hành vi thay thế thông minh vào giữa Trigger bối cảnh và thói quen châm thuốc.",
    output: "Daily Trigger Protocol™",
  },
  {
    day: "DAY 05",
    title: "Xây Protocol Cho Stress & Bàn Nhậu",
    desc: "Hai bối cảnh dễ khiến đàn ông trượt nhất. Chuẩn bị sẵn: Stress làm gì? Cần break làm gì? Được mời thuốc trên bàn nhậu trả lời câu gì?",
    output: "Stress + Social Navigation Card™",
  },
  {
    day: "DAY 06",
    title: "Tích Lũy Bằng Chứng 'Tôi Làm Chủ Hành Vi'",
    desc: "Ghi nhận những chiến thắng nhỏ thực tế: 1 ly cà phê không thuốc, 1 lần căng thẳng không châm thuốc ngay. Thay đổi câu chuyện ông tự kể về chính mình.",
    output: "Micro-Proof Tracker™",
  },
  {
    day: "DAY 07",
    title: "Hoàn Thiện Recovery Map & Kế Hoạch 21 Ngày",
    desc: "Xây phương án ứng phó khi cuộc sống lệch khỏi dự kiến (deadline, bia rượu, mệt mỏi) thay vì một kế hoạch chỉ hoạt động khi mọi thứ bình yên.",
    output: "Recovery Map + 21-Day Continuation Plan™",
  },
];

const offerStack = [
  { name: "CHƯƠNG TRÌNH BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ (7 Video & Module triển khai)", val: "590.000đ" },
  { name: "WORKBOOK BẢN ĐỒ TÁC CHIẾN™ (Trực tiếp xây dựng 4 Bản đồ tác chiến)", val: "290.000đ" },
  { name: "QUICK RESPONSE CARDS™ (Thẻ ứng phó nhanh lưu trên điện thoại)", val: "190.000đ" },
  { name: "SOCIAL NAVIGATION SCRIPT™ (Bộ câu từ chối xã giao tự nhiên)", val: "190.000đ" },
  { name: "RECOVERY MAP™ (Kế hoạch khôi phục khẩn cấp khi lỡ trượt)", val: "290.000đ" },
];

const bonusStack = [
  {
    title: "BONUS #1 — THE MORNING COFFEE RESET™",
    val: "190.000đ",
    desc: "Cẩm nang thiết kế lại thói quen buổi sáng để phá vỡ liên kết ngầm giữa Cà phê và Điếu thuốc lá.",
  },
  {
    title: "BONUS #2 — THE STRESS BREAK MENU™",
    val: "190.000đ",
    desc: "Danh sách các phương án giải tỏa căng thẳng nhanh trong 5 phút mà không cần ra ban công châm thuốc.",
  },
  {
    title: "BONUS #3 — THE 21-DAY CONTINUATION TRACKER™",
    val: "190.000đ",
    desc: "Bảng theo dõi hành trình 21 ngày tiếp theo giúp ông ghi nhận chiến thắng nhỏ và tinh chỉnh Protocol.",
  },
];

const faqs = [
  {
    q: "1. 7 ngày có phải cam kết tui sẽ cai hoàn toàn thuốc lá không?",
    a: "Không. 7 ngày là giai đoạn ông xây dựng và làm chủ hệ thống ứng phó cá nhân gồm Trigger Map, Protocol, Social Script và Recovery Plan. Kết quả thực tế phụ thuộc vào mức độ áp dụng và sự kiên trì của ông.",
  },
  {
    q: "2. Tui đã hút hơn 10 năm rồi thì có phù hợp không?",
    a: "Rất phù hợp. Đặc biệt nếu ông nhận thấy mình hút nhiều theo bối cảnh quen thuộc như cà phê, stress, sau bữa ăn hay trên bàn nhậu. Nếu mức độ phụ thuộc nicotine quá cao hoặc có bệnh lý đi kèm, ông nên kết hợp tham vấn thêm ý kiến bác sĩ chuyên khoa.",
  },
  {
    q: "3. Tui có cần phải bỏ thói quen uống cà phê sáng không?",
    a: "Không. Mục tiêu không phải là bắt ông từ bỏ niềm vui uống cà phê, mà là giúp ông tái thiết kế lại phản ứng của tâm trí để thưởng thức cà phê mà không cần đi kèm điếu thuốc.",
  },
  {
    q: "4. Tui vẫn phải đi nhậu tiếp khách thì làm sao?",
    a: "Đó là lý do bộ Social Navigation Script™ ra đời. Chương trình không dạy ông né tránh xã hội, mà chuẩn bị cho ông những câu trả lời tự nhiên và phong thái bản lĩnh trên bàn nhậu.",
  },
  {
    q: "5. Mỗi ngày tui cần dành bao nhiêu thời gian?",
    a: "Khoảng 5–10 phút để nắm bài học chính và thêm vài phút ngắn hoàn thiện Workbook. Mục tiêu là bài tập áp dụng thực tế, không phải ngồi học lý thuyết dông dài.",
  },
  {
    q: "6. Nếu lỡ trượt hút lại một điếu thì sao?",
    a: "Ông sẽ dùng ngay Recovery Map™ để phân tích trigger vừa xảy ra, điều chỉnh Protocol và quay lại hành trình ngay trong 60 phút mà không dằn vặt hay bỏ cuộc.",
  },
  {
    q: "7. Đây có phải là một chương trình điều trị y khoa không?",
    a: "Không. Đây là chương trình huấn luyện về định danh, hành vi và lối sống. Chương trình không thay thế chẩn đoán, kê đơn hay tư vấn điều trị từ bác sĩ y tế.",
  },
  {
    q: "8. Tại sao tui không tự xem video miễn phí trên mạng?",
    a: "Ông hoàn toàn có thể tự tìm kiếm. Điểm khác biệt ở đây là ông không nhận những mẹo rời rạc, mà đi theo một lộ trình đóng gói 7 ngày ngăn nắp để tạo ra 4 thành phẩm tác chiến của riêng mình.",
  },
];

export default function Home() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const offer = document.getElementById("offer");
      const inOffer = offer
        ? offer.getBoundingClientRect().top < innerHeight && offer.getBoundingClientRect().bottom > 0
        : false;
      setShowSticky(scrollY > innerHeight * 0.7 && !inOffer);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="letter-page" style={{ background: "#F3F0E8", color: "#191B19", fontFamily: "var(--font-body), sans-serif", lineHeight: 1.8 }}>
      {/* Top Banner */}
      <div className="letter-announcement" style={{ background: "#252B25", color: "#F5F2E9", padding: "10px 16px", textAlign: "center", fontSize: "13px", fontWeight: 600 }}>
        BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — TỰ SỰ VỀ HÀNH TRÌNH LẤY LẠI QUYỀN LÀM CHỦ BẢN THÂN
      </div>

      {/* HERO SECTION — CHARCOAL BLACK (#171A18) */}
      <header className="hero blueprint" style={{ background: "#171A18", color: "#F5F2E9", padding: "80px 0 70px" }}>
        <div className="wrap hero-split-grid">
          {/* Left Column: Copy & Scan Grid */}
          <div>
            <div style={{ color: "#D96732", fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>
              BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </div>
            <h1 style={{ fontSize: "clamp(32px, 4.2vw, 52px)", color: "#F5F2E9", lineHeight: 1.15, fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
              Lần này, đừng hứa với bản thân rằng ông sẽ bỏ thuốc.
            </h1>
            <p style={{ fontSize: "clamp(20px, 2.4vw, 28px)", color: "#D96732", fontWeight: 700, margin: "0 0 22px", lineHeight: 1.3 }}>
              Hãy có một kế hoạch cho lúc ông muốn hút.
            </p>
            <p style={{ fontSize: "16px", color: "#A9B2AC", lineHeight: 1.7, marginBottom: "22px" }}>
              Trong 7 ngày, tự xây <strong>Bản Đồ Tác Chiến Cá Nhân</strong> để biết mình sẽ làm gì khi:
            </p>

            {/* 4 Micro-Rows Scan Grid */}
            <div style={{ display: "grid", gap: "10px", marginBottom: "28px" }}>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>☕</span> <span><strong>Cà phê sáng</strong> → Thèm thuốc</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>💼</span> <span><strong>Deadline</strong> → Muốn ra ban công</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🍻</span> <span><strong>Bàn nhậu</strong> → Được mời một điếu</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>↩️</span> <span><strong>Lỡ trượt</strong> → Không để một điếu thành cả bao</span>
              </div>
            </div>

            {/* CTA & Micro-Trust Price (Burnt Orange #D96732) */}
            <div className="hero-cta" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
              <a href="#offer" className="button" style={{ background: "#D96732", color: "white", fontWeight: 800, padding: "18px 36px", borderRadius: "6px", fontSize: "16px", textDecoration: "none", boxShadow: "0 10px 30px rgba(217,103,50,0.35)" }}>
                [ TẠO BẢN ĐỒ CỦA TÔI → ]
              </a>
              <span style={{ color: "#74766F", fontSize: "13px", letterSpacing: "0.04em", fontWeight: 500 }}>
                Pilot Cohort · Trọn bộ 7 ngày · 497.000đ
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Product Visual Mockup Card Deck */}
          <div className="product-mockup-stack" style={{ background: "#252B25", borderColor: "#384238" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #384238", paddingBottom: "12px", marginBottom: "16px" }}>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px", letterSpacing: "0.12em" }}>HỆ THỐNG BẢN ĐỒ TÁC CHIẾN™</span>
              <span style={{ background: "rgba(217,103,50,0.2)", color: "#D96732", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>🟧 PILOT COHORT</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>01 | TRIGGER MAP™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Bản đồ khoanh vùng 5-7 tác nhân châm thuốc</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 1 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>02 | PROTOCOL 3 PHÚT™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Quy trình ứng phó khẩn cấp khoảnh khắc thèm</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 2 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>03 | SOCIAL NAVIGATION SCRIPT™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Bộ câu từ chối tự nhiên trên bàn nhậu & cà phê</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 3 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>04 | RECOVERY MAP™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Quy trình khôi phục 60 phút khi lỡ trượt 1 điếu</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 4 ]</span>
            </div>

            <div style={{ marginTop: "14px", background: "rgba(217,103,50,0.1)", border: "1px dashed #D96732", padding: "10px 14px", borderRadius: "6px", textAlign: "center" }}>
              <span style={{ color: "#D96732", fontSize: "12px", fontWeight: 700 }}>+ TẶNG KÈM #3 BONUS KHI ĐĂNG KÝ HÔM NAY</span>
            </div>
          </div>
        </div>
      </header>

      {/* CHAPTER 01 — WARM IVORY (#F3F0E8) */}
      <section id="story" className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 01 — MỘT NGÀY RẤT QUEN</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 20px", lineHeight: 1.25, color: "#191B19" }}>
            Ông không cần thêm một bài giảng về tác hại của thuốc lá.
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Ông biết rõ rồi. Ung thư. Tim mạch. Phổi. Hơi thở. Mùi thuốc trên quần áo. Khói thuốc quanh vợ con... Biết thuốc lá có hại <strong>chưa bao giờ là phần khó nhất</strong>.
            </p>
            <p>
              Phần khó nhất luôn xảy ra vào những khoảnh khắc rất đời thường:
            </p>

            {/* 3 Pattern Interrupt Cards (Sand background #E5DFD2) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", margin: "32px 0" }}>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>07:00</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>☕ Cà phê sáng</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Tay tự động tìm bao thuốc như một phản xạ lập trình sẵn.</p>
              </div>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>11:45</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>💼 Căng thẳng Deadline</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Đầu óc thúc giục ông ra ban công 5 phút để tìm cảm giác nghỉ.</p>
              </div>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>20:00</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>🍻 Bàn nhậu anh em</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Anh em chìa bao thuốc: <em>“Làm điếu không ông?”</em></p>
              </div>
            </div>

            <p style={{ fontSize: "19px", fontWeight: 700, color: "#191B19", textAlign: "center", margin: "24px 0 0" }}>
              Và chỉ trong vài giây... tất cả những gì ông từng tự hứa bắt đầu lung lay.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 02 — WARM IVORY (#F3F0E8) + IDENTITY WOUND QUOTE */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 02 — VÒNG LẶP THƯƠNG LƯỢNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 20px", lineHeight: 1.25, color: "#191B19" }}>
            Nếu ông muốn thoát khỏi cảnh “bỏ rồi lại hút”...
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Rất có thể vấn đề không nằm ở chỗ ông chưa đủ quyết tâm. <strong>Mà nằm ở chỗ ông đang cố dùng một công cụ quá đơn giản để giải quyết một hệ thống thói quen đã lặp lại hàng nghìn lần.</strong>
            </p>
            <p>
              Một ngày ông quyết định: <em>“Đủ rồi, từ mai bỏ!”</em>. Vứt bao thuốc, cất bật lửa. Ngày đầu ổn, ngày thứ hai bứt rứt. Rồi 1 deadline, 1 cuộc nhậu, 1 chiếc ghế quen thuộc... Tâm trí thì thầm: <em>“Chỉ một điếu thôi chắc không sao.”</em> Một điếu thành hai điếu. Nửa bao. Vài hôm sau... bao thuốc lại nằm trong túi.
            </p>

            {/* Full-Width Identity Wound Quote Block (Charcoal #171A18) */}
            <div style={{ background: "#171A18", color: "#F5F2E9", padding: "45px 40px", borderRadius: "12px", margin: "45px 0", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
              <p style={{ fontStyle: "italic", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.4, color: "#D96732", margin: "0 0 16px", fontWeight: 700 }}>
                “Tôi quản lý được bao nhiêu việc.<br />Tại sao lại không làm chủ nổi chuyện này?”
              </p>
              <span style={{ color: "#74766F", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                — Câu hỏi rất nhiều người hút lâu năm từng tự hỏi mình.
              </span>
            </div>

            <p style={{ color: "#191B19", fontSize: "18px", margin: 0 }}>
              Đây mới là thứ âm thầm dằn vặt: Không chỉ chuyện hút thuốc. Mà là cảm giác <strong>tôi đang mất quyền quyết định đối với chính hành vi của mình.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 03 — EPIPHANY (VISUAL TRANSITION TO DARK CHARCOAL #171A18) */}
      <section className="letter-section letter-dark" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 03 — CƠ CHẾ CỐT LÕI</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", color: "#F5F2E9", margin: "16px 0 24px", lineHeight: 1.25 }}>
            VÌ SAO ÔNG CỨ QUAY LẠI? — THE TWO-LOOP PROBLEM™
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#A9B2AC" }}>
            <p style={{ color: "#F5F2E9" }}>
              Hầu hết mọi người cai thuốc thất bại vì họ chỉ tập trung giải quyết cơn thèm thể chất, nhưng bỏ trống hoàn toàn phản xạ bối cảnh:
            </p>

            {/* Visual Centerpiece Diagram */}
            <div className="two-loop-box" style={{ background: "#252B25", borderColor: "#384238", margin: "36px 0" }}>
              <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", marginBottom: "20px" }}>
                SƠ ĐỒ NGUYÊN NHÂN THẤT BẠI — THE TWO-LOOP PROBLEM™
              </div>

              <div className="two-loop-grid">
                <div style={{ background: "#171A18", border: "1px solid #384238", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", marginBottom: "6px" }}>VÒNG LẶP #1</div>
                  <strong style={{ color: "#F5F2E9", fontSize: "17px", display: "block", marginBottom: "6px" }}>CƠN THÈM NICOTINE</strong>
                  <p style={{ color: "#74766F", fontSize: "13px", margin: 0 }}>Phản ứng thèm sinh học của cơ thể (Chỉ chiếm 20% khó khăn)</p>
                </div>

                <div style={{ background: "#171A18", border: "2px solid #D96732", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", marginBottom: "6px" }}>VÒNG LẶP #2 (CỐT LÕI)</div>
                  <strong style={{ color: "#F5F2E9", fontSize: "17px", display: "block", marginBottom: "6px" }}>TRIGGER BỐI CẢNH</strong>
                  <p style={{ color: "#A9B2AC", fontSize: "13px", margin: 0 }}>Cà phê / Stress / Bàn nhậu / Sau ăn (Chiếm 80% nguyên nhân tái hút)</p>
                </div>
              </div>

              {/* Dynamic Flow Result */}
              <div style={{ textAlign: "center", margin: "20px 0 10px", color: "#D96732", fontWeight: 800, fontSize: "15px" }}>
                ↓ VÒNG 1 + VÒNG 2 = CHÂM THUỐC KHI KHÔNG CÓ BẢN ĐỒ
              </div>

              {/* Dynamic Comparison Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px", paddingTop: "20px", borderTop: "1px solid #384238" }}>
                <div style={{ background: "rgba(169,71,37,0.15)", border: "1px solid rgba(169,71,37,0.4)", padding: "14px", borderRadius: "6px", color: "#E5A490", fontSize: "13px" }}>
                  <strong>CÁCH CŨ THƯỜNG XỬ LÝ:</strong><br />Nicotine ✓ | Trigger ✕ (Chỉ né tránh & gồng ý chí)
                </div>
                <div style={{ background: "rgba(102,115,91,0.25)", border: "1px solid #66735B", padding: "14px", borderRadius: "6px", color: "#D5E2D8", fontSize: "13px" }}>
                  <strong>BẢN ĐỒ 7 NGÀY XỬ LÝ:</strong><br />Nicotine → Nhận diện | Trigger → Chuẩn bị Protocol
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 04 — WARM IVORY (#F3F0E8) EQUIPMENT SHOWCASE */}
      <section className="letter-section" style={{ background: "#F3F0E8", padding: "90px 0", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "880px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 04 — SHOWCASE SẢN PHẨM</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#191B19", margin: "16px 0 12px" }}>
            Sau 7 ngày, đây là thứ nằm trong điện thoại và Workbook của ông.
          </h2>
          <p style={{ color: "#74766F", fontSize: "16px", marginBottom: "40px" }}>
            Không phải tài liệu lý thuyết suông. Đây là 4 tài sản tác chiến cụ thể được thiết kế riêng cho ông.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {fourMaps.map((m) => (
              <div key={m.num} style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "26px", borderRadius: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ color: "#D96732", fontWeight: 800, fontSize: "24px" }}>{m.num}</span>
                    <span style={{ background: "rgba(217,103,50,0.15)", color: "#D96732", fontSize: "9px", fontWeight: 700, padding: "3px 8px", borderRadius: "4px" }}>{m.badge}</span>
                  </div>
                  <h3 style={{ color: "#191B19", fontSize: "19px", margin: "0 0 6px" }}>{m.title}</h3>
                  <small style={{ color: "#A94725", fontWeight: 700, display: "block", marginBottom: "12px" }}>{m.tag}</small>
                  <p style={{ color: "#74766F", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                  {m.mockup}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 05 — WARM IVORY (#F3F0E8) VERTICAL ROADMAP */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 05 — HÀNH TRÌNH 7 NGÀY</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 36px", color: "#191B19" }}>
            LỘ TRÌNH 7 NGÀY TRIỂN KHAI THỰC THẾ
          </h2>

          {/* Vertical Timeline Roadmap */}
          <div style={{ margin: "20px 0" }}>
            {sevenDays.map((d) => (
              <div key={d.day} className="vertical-roadmap-item" style={{ borderColor: "#D5CEBF" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <span style={{ background: "#D96732", color: "white", fontWeight: 800, padding: "3px 8px", borderRadius: "4px", fontSize: "11px" }}>{d.day}</span>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#191B19" }}>{d.title}</h3>
                </div>
                <p style={{ color: "#74766F", fontSize: "14px", lineHeight: 1.65, margin: "6px 0 8px" }}>{d.desc}</p>
                <span style={{ background: "#E5DFD2", color: "#66735B", fontWeight: 700, fontSize: "12px", padding: "4px 10px", borderRadius: "4px", display: "inline-block" }}>
                  ✓ {d.output}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 06 — CINEMATIC FUTURE PACING (DARK CHARCOAL #171A18) */}
      <section className="letter-section letter-dark" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 06 — TƯƠNG LAI ĐỜI THỰC</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#F5F2E9", margin: "16px 0 12px" }}>
            Cùng một cuộc sống. Một phản ứng khác.
          </h2>
          <p style={{ color: "#A9B2AC", fontSize: "17px", marginBottom: "32px" }}>
            Sau 7 ngày, bối cảnh đời sống của ông vẫn vậy, nhưng ông đã nắm quyền làm chủ hoàn toàn:
          </p>

          <div style={{ display: "grid", gap: "14px" }}>
            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>07:00 — QUÁN CÀ PHÊ SÁNG</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Trigger thèm thuốc vẫn xuất hiện. Nhưng lần này ông nhận diện được nó, mở đúng Protocol 3 phút và thong dong thưởng thức ly cà phê.
              </p>
            </div>

            <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "18px" }}>↓</div>

            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>15:30 — CĂNG THẲNG DEADLINE</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Ông nhận ra bộ não đang cần một khoảng nghỉ phục hồi trạng thái. Không nhất thiết cần một điếu thuốc. Ông áp dụng Stress Break Menu và tiếp tục công việc.
              </p>
            </div>

            <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "18px" }}>↓</div>

            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>20:15 — BÀN NHẬU ANH EM</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                <em>“Làm điếu không ông?”</em> — <em>“Thôi ông, tui bỏ cái này rồi.”</em> Đáp lời tự nhiên theo Social Script, giữ nguyên vị thế phong thái bản lĩnh.
              </p>
            </div>
          </div>

          <p style={{ fontSize: "18px", fontWeight: 700, color: "#F5F2E9", textAlign: "center", marginTop: "32px" }}>
            Cuộc sống không cần biến mất. Điếu thuốc chỉ không còn quyết định thay ông.
          </p>
        </div>
      </section>

      {/* CHAPTER 07 — OFFER SECTION (DARK CHARCOAL #171A18 & BURNT ORANGE #D96732 CTA) */}
      <section id="offer" className="letter-offer" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 07 — TOÀN BỘ HỆ THỐNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "#F5F2E9", margin: "16px 0 24px", textTransform: "uppercase" }}>
            TOÀN BỘ HỆ THỐNG ÔNG NHẬN ĐƯỢC
          </h2>

          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "12px", margin: "30px 0" }}>
            <h3 style={{ color: "#F5F2E9", marginTop: 0, fontSize: "20px", borderBottom: "1px solid #384238", paddingBottom: "14px", marginBottom: "18px" }}>
              DANH MỤC TÀI SẢN BÀN GIAO:
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {offerStack.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", color: "#F5F2E9", fontSize: "15px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                  <span>✓ {item.name}</span>
                  <span style={{ color: "#74766F" }}>{item.val}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: "16px", color: "#74766F", fontSize: "14px" }}>
              Tổng giá trị tham chiếu: <strong style={{ color: "#F5F2E9" }}>1.550.000đ</strong>
            </div>
          </div>

          {/* BONUS STACK */}
          <div style={{ marginTop: "36px" }}>
            <h3 style={{ color: "#D96732", fontSize: "20px", textAlign: "center", marginBottom: "20px", textTransform: "uppercase" }}>
              + 3 BONUS ĐẶC QUYỀN TẶNG KÈM
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {bonusStack.map((b) => (
                <div key={b.title} style={{ background: "#252B25", border: "1px solid #384238", padding: "22px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "6px" }}>
                    <h4 style={{ color: "#D96732", margin: 0, fontSize: "17px" }}>{b.title}</h4>
                    <span style={{ color: "#D96732", fontWeight: 700, fontSize: "13px" }}>
                      Trị giá: {b.val} → <span style={{ color: "#D96732", fontWeight: 800 }}>MIỄN PHÍ</span>
                    </span>
                  </div>
                  <p style={{ color: "#A9B2AC", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DRAMATIC PRICE REVEAL CARD */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", padding: "42px", borderRadius: "12px", margin: "45px 0 30px", textAlign: "center", boxShadow: "0 25px 70px rgba(0,0,0,0.5)" }}>
            <span style={{ color: "#A9B2AC", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "13px", fontWeight: 700 }}>
              TỔNG GIÁ TRỊ THỰC TẾ: 2.120.000Đ
            </span>
            <div style={{ margin: "18px 0 14px" }}>
              <div style={{ color: "#D96732", fontSize: "14px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>MỨC PHÍ PILOT COHORT HÔM NAY</div>
              <b style={{ fontSize: "68px", color: "#D96732", lineHeight: 1, display: "block", margin: "8px 0" }}>497.000Đ</b>
              <span style={{ color: "#74766F", fontSize: "14px" }}>Thanh toán một lần duy nhất • Không phát sinh chi phí</span>
            </div>

            <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ maxWidth: "560px", width: "100%", margin: "20px auto 0", fontSize: "17px", padding: "20px 32px", background: "#D96732", color: "white", textDecoration: "none", boxShadow: "0 12px 35px rgba(217,103,50,0.4)" }}>
              [ TÔI MUỐN XÂY BẢN ĐỒ CỦA MÌNH — 497.000Đ → ]
            </a>
          </div>

          {/* ISOLATED GUARANTEE CARD / SEAL */}
          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "26px 30px", borderRadius: "10px", margin: "28px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px" }}>🛡️</span>
              <h4 style={{ color: "#D96732", fontSize: "16px", margin: 0, textTransform: "uppercase" }}>
                IMPLEMENTATION GUARANTEE™
              </h4>
            </div>
            <p style={{ color: "#A9B2AC", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
              Làm đủ 7 ngày nhưng vẫn chưa hoàn thiện được Bản Đồ Tác Chiến? → Ông nhận thêm 14 ngày hỗ trợ review không mất thêm phí.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 08 — TWO CHOICES (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 08 — QUYẾT ĐỊNH CỦA ÔNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 32px", textAlign: "center", color: "#191B19" }}>
            VÀ BÂY GIỜ ÔNG CÓ HAI LỰA CHỌN
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* LEFT — GIỮ NGUYÊN */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "30px", borderRadius: "10px" }}>
              <h3 style={{ color: "#A94725", marginTop: 0, fontSize: "19px", borderBottom: "1px solid #D5CEBF", paddingBottom: "10px" }}>LEFT — GIỮ NGUYÊN</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0", fontSize: "14px", color: "#74766F", display: "grid", gap: "10px" }}>
                <li>❌ Sáng → Thèm thuốc</li>
                <li>❌ Stress → Ban công châm thuốc</li>
                <li>❌ Nhậu → “Một điếu thôi chắc không sao”</li>
                <li>❌ Trượt 1 điếu → Hút lại cả bao</li>
              </ul>
              <div style={{ borderTop: "1px solid #D5CEBF", paddingTop: "12px", fontWeight: 700, color: "#A94725", fontSize: "14px" }}>
                ↓ Tiếp tục vòng lặp dằn vặt bản thân
              </div>
            </div>

            {/* RIGHT — CÓ BẢN ĐỒ */}
            <div style={{ background: "#E5DFD2", border: "2px solid #D96732", padding: "30px", borderRadius: "10px" }}>
              <h3 style={{ color: "#D96732", marginTop: 0, fontSize: "19px", borderBottom: "1px solid #D5CEBF", paddingBottom: "10px" }}>RIGHT — CÓ BẢN ĐỒ</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "16px 0", fontSize: "14px", color: "#191B19", display: "grid", gap: "10px" }}>
                <li>✓ Trigger → Nhận diện & Protocol 3 Phút</li>
                <li>✓ Stress → Stress Break Menu</li>
                <li>✓ Nhậu → Social Script lịch thiệp</li>
                <li>✓ Lỡ trượt → Recovery Map khôi phục ngay</li>
              </ul>
              <div style={{ borderTop: "1px solid #D5CEBF", paddingTop: "12px", fontWeight: 700, color: "#66735B", fontSize: "14px" }}>
                ↓ Tích lũy bằng chứng làm chủ hành vi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 09 — FAQ (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 09 — GIẢI ĐÁP THẮC MẮC</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 32px", color: "#191B19" }}>
            FAQ — CÂU HỎI THƯỜNG GẶP
          </h2>
          <div className="letter-faq">
            {faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0} style={{ margin: "12px 0", background: "#E5DFD2", padding: "16px 20px", borderRadius: "6px", border: "1px solid #D5CEBF" }}>
                <summary style={{ fontStyle: "normal", fontWeight: 700, fontSize: "16px", color: "#191B19", cursor: "pointer" }}>{faq.q}</summary>
                <p style={{ margin: "14px 0 0", color: "#74766F", fontSize: "15px", lineHeight: 1.75 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CLOSING CTA — CHARCOAL BLACK (#171A18) */}
      <section className="letter-closing" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            LỜI KẾT
          </p>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "#F5F2E9", margin: "20px 0 24px", lineHeight: 1.25 }}>
            Đừng bắt đầu bằng một lời thề nữa. Hãy bắt đầu bằng một Bản Đồ.
          </h2>
          <p style={{ fontSize: "18px", color: "#A9B2AC", marginBottom: "36px" }}>
            Ông có muốn tiếp tục để mỗi ly cà phê, mỗi deadline và mỗi bàn nhậu quyết định thay mình hay không?
          </p>

          <a className="letter-button" href="#offer" style={{ maxWidth: "580px", margin: "0 auto", fontSize: "17px", padding: "20px 36px", background: "#D96732", color: "white", textDecoration: "none", boxShadow: "0 12px 35px rgba(217,103,50,0.4)" }}>
            [ BẮT ĐẦU BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — 497.000Đ ]
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "40px 0", fontSize: "12px" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <b style={{ color: "#A9B2AC" }}>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</b>
          <p style={{ margin: "10px 0" }}>
            Chương trình cung cấp nội dung giáo dục về hành vi, tác nhân và lối sống. Không thay thế tư vấn, chẩn đoán hoặc điều trị y tế chuyên môn.
          </p>
          <span>© 2026 Bản Đồ Cai Thuốc Lá 7 Ngày™. All rights reserved.</span>
        </div>
      </footer>

      {/* MINIMALIST MOBILE & DESKTOP STICKY BAR */}
      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`} style={{ background: "#171A18", borderColor: "#384238" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "#A9B2AC", fontWeight: 600 }}>BẢN ĐỒ 7 NGÀY™</span>
          <b style={{ fontSize: "16px", color: "#D96732" }}>497.000đ</b>
        </div>
        <a href="#offer" style={{ background: "#D96732", color: "white", padding: "10px 16px", fontSize: "12px" }}>[ TẠO BẢN ĐỒ CỦA TÔI → ]</a>
      </div>
    </div>
  );
}
