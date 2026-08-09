"use client";

import { useEffect, useState } from "react";

const fourQuestions = [
  {
    icon: "☕",
    situation: "7:00 SÁNG — LY CÀ PHÊ BÁO ĐỘNG",
    question: "Khi uống cà phê và thèm thuốc → Làm gì?",
    answer: "Một Protocol ngắn 3 phút thay thế phản xạ quen tay tự nhiên mà không cần phải gồng gánh ý chí.",
  },
  {
    icon: "⚡",
    situation: "11:45 TRƯA — CĂNG THẲNG DEADLINE",
    question: "Khi stress áp lực → Làm gì?",
    answer: "Phương án nghỉ ngắn giải tỏa trạng thái thần kinh mà không mặc định 'Break = Ra ban công châm thuốc'.",
  },
  {
    icon: "🍻",
    situation: "8:00 TỐI — MỜI THUỐC BÀN NHẬU",
    question: "Khi đối tác chìa bao thuốc → Nói gì?",
    answer: "Kịch bản Social Script từ chối tự nhiên, bản lĩnh mà không tự tách mình ra khỏi anh em.",
  },
  {
    icon: "🔄",
    situation: "KHI LỠ TRƯỢT 1 ĐIẾU",
    question: "Nếu lỡ hút lại một điếu → Xử lý thế nào?",
    answer: "Recovery Protocol giúp dập tắt tâm lý All-or-Nothing để không biến 1 điếu thành quay lại hút cả bao.",
  },
];

const fourMaps = [
  {
    num: "01",
    title: "TRIGGER MAP™",
    tag: "Bản Đồ Nhận Diện Tác Nhân",
    desc: "Không còn nói chung chung 'Tui thèm thuốc'. Chuyển thành câu lệnh chính xác: 'Tui thường thèm thuốc vào bối cảnh X, sau hành vi Y, khi cảm xúc Z'. Nhìn rõ pattern là bước đầu tiên để làm chủ nó.",
  },
  {
    num: "02",
    title: "PROTOCOL 3 PHÚT™",
    tag: "Quy Trình Ứng Phó Khẩn Cấp",
    desc: "Cơn thèm xuất hiện theo hình gợn sóng. Bạn chuẩn bị sẵn một chuỗi hành động 3 phút để tạo khoảng cách an toàn giữa Trigger bối cảnh và phản xạ châm thuốc.",
  },
  {
    num: "03",
    title: "SOCIAL NAVIGATION SCRIPT™",
    tag: "Kịch Bản Xã Giao Đời Thật",
    desc: "Bạn không thể cai thuốc bằng cách trốn trong phòng kín. Chuẩn bị sẵn những câu từ chối tự nhiên, phong thái lịch thiệp và exit strategy khi đi làm, cà phê hay trên bàn nhậu.",
  },
  {
    num: "04",
    title: "RECOVERY MAP™",
    tag: "Bản Đồ Phục Hồi 24 Giờ",
    desc: "Loại bỏ suy nghĩ nguy hiểm: 'Lỡ hút 1 điếu là hỏng hết rồi'. Recovery Map cho bạn biết chính xác phải làm gì trong 60 phút tiếp theo để lập tức quay lại hành trình.",
  },
];

const sevenDays = [
  {
    day: "NGÀY 01",
    title: "Nhìn Thẳng Vào Vòng Lặp Hiện Tại",
    desc: "Rà lại toàn bộ thói quen hút thuốc thực tế. Không tự trách, không dằn dỗi. Chỉ quan sát dữ liệu: Hút lúc nào? Ở đâu? Với ai? Trước và sau khi châm thuốc tâm trí đang cảm thấy gì?",
    output: "Current Smoking Loop Map™",
  },
  {
    day: "NGÀY 02",
    title: "Tách Cơn Thèm Khỏi Trigger Bối Cảnh",
    desc: "Giải mã bài toán The Two-Loop Problem™. Phân biệt rõ đâu là cảm giác thèm thể chất nicotine, đâu là phản xạ thói quen bối cảnh lặp lại nhiều năm.",
    output: "Two-Loop Diagnostic™",
  },
  {
    day: "NGÀY 03",
    title: "Lập Bản Đồ Tác Nhân Trigger Map™",
    desc: "Khoanh vùng 5–7 tình huống có sức kéo mạnh nhất. Không cố sửa tất cả cùng lúc mà tập trung vào những mắt xích nguy hiểm nhất.",
    output: "Personal Trigger Map™",
  },
  {
    day: "NGÀY 04",
    title: "Thiết Kế Protocol Cho Cà Phê & Quen Tay",
    desc: "Xử lý những phản xạ nhỏ lặp đi lặp lại hàng ngày. Chèn một hành vi thay thế thông minh vào giữa Trigger bối cảnh và thói quen châm thuốc.",
    output: "Daily Trigger Protocol™",
  },
  {
    day: "NGÀY 05",
    title: "Xây Protocol Cho Stress & Bàn Nhậu",
    desc: "Hai bối cảnh dễ khiến đàn ông trượt nhất. Chuẩn bị sẵn: Stress làm gì? Cần break làm gì? Được mời thuốc trên bàn nhậu trả lời câu gì?",
    output: "Stress + Social Navigation Card™",
  },
  {
    day: "NGÀY 06",
    title: "Tích Lũy Bằng Chứng 'Tôi Làm Chủ Hành Vi'",
    desc: "Ghi nhận những chiến thắng nhỏ thực tế: 1 ly cà phê không thuốc, 1 lần căng thẳng không châm thuốc ngay. Thay đổi câu chuyện bạn tự kể về chính mình.",
    output: "Micro-Proof Tracker™",
  },
  {
    day: "NGÀY 07",
    title: "Hoàn Thiện Recovery Map & Kế Hoạch 21 Ngày",
    desc: "Xây phương án ứng phó khi cuộc sống lệch khỏi dự kiến (deadline, bia rượu, mệt mỏi) thay vì một kế hoạch chỉ hoạt động khi mọi thứ bình yên.",
    output: "Recovery Map + 21-Day Continuation Plan™",
  },
];

const offerStack = [
  { name: "CHƯƠNG TRÌNH BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ (7 Video & Module triển khai)", val: "590.000đ" },
  { name: "WORKBOOK BẢN ĐỒ TÁC CHIẾN™ (Nơi trực tiếp xây dựng 4 Bản đồ)", val: "290.000đ" },
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
    desc: "Bảng theo dõi hành trình 21 ngày tiếp theo giúp bạn ghi nhận chiến thắng nhỏ và tinh chỉnh Protocol.",
  },
];

const faqs = [
  {
    q: "1. 7 ngày có phải cam kết tôi sẽ cai hoàn toàn thuốc lá không?",
    a: "Không. 7 ngày là giai đoạn bạn xây dựng và làm chủ hệ thống ứng phó cá nhân gồm Trigger Map, Protocol, Social Script và Recovery Plan. Kết quả thực tế phụ thuộc vào mức độ áp dụng và sự kiên trì của bạn.",
  },
  {
    q: "2. Tôi đã hút hơn 10 năm rồi thì có phù hợp không?",
    a: "Rất phù hợp. Đặc biệt nếu bạn nhận thấy mình hút nhiều theo bối cảnh quen thuộc như cà phê, stress, sau bữa ăn hay trên bàn nhậu. Nếu mức độ phụ thuộc nicotine quá cao hoặc có bệnh lý đi kèm, bạn nên kết hợp tham vấn thêm ý kiến bác sĩ chuyên khoa.",
  },
  {
    q: "3. Tôi có cần phải bỏ thói quen uống cà phê sáng không?",
    a: "Không. Mục tiêu không phải là bắt bạn từ bỏ niềm vui uống cà phê, mà là giúp bạn tái thiết kế lại phản ứng của tâm trí để thưởng thức cà phê mà không cần đi kèm điếu thuốc.",
  },
  {
    q: "4. Tôi vẫn phải đi nhậu tiếp khách thì làm sao?",
    a: "Đó là lý do bộ Social Navigation Script™ ra đời. Chương trình không dạy bạn né tránh xã hội, mà chuẩn bị cho bạn những câu trả lời tự nhiên và phong thái bản lĩnh trên bàn nhậu.",
  },
  {
    q: "5. Mỗi ngày tôi cần dành bao nhiêu thời gian?",
    a: "Khoảng 5–10 phút để nắm bài học chính và thêm vài phút ngắn hoàn thiện Workbook. Mục tiêu là bài tập áp dụng thực tế, không phải ngồi học lý thuyết dông dài.",
  },
  {
    q: "6. Nếu lỡ trượt hút lại một điếu thì sao?",
    a: "Bạn sẽ dùng ngay Recovery Map™ để phân tích trigger vừa xảy ra, điều chỉnh Protocol và quay lại hành trình ngay trong 60 phút mà không dằn dỗi hay bỏ cuộc.",
  },
  {
    q: "7. Đây có phải là một chương trình điều trị y khoa không?",
    a: "Không. Đây là chương trình huấn luyện về định danh, hành vi và lối sống. Chương trình không thay thế chẩn đoán, kê đơn hay tư vấn điều trị từ bác sĩ y tế.",
  },
  {
    q: "8. Tại sao tôi không tự xem video miễn phí trên mạng?",
    a: "Bạn hoàn toàn có thể tự tìm kiếm. Điểm khác biệt ở đây là bạn không nhận những mẹo rời rạc, mà đi theo một lộ trình đóng gói 7 ngày ngăn nắp để tạo ra 4 thành phẩm tác chiến của riêng mình.",
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
    <div className="letter-page" style={{ background: "#f5f1e8", color: "#17201c", fontFamily: "var(--font-body), sans-serif", lineHeight: 1.8 }}>
      {/* Top Banner */}
      <div className="letter-announcement" style={{ background: "#168a4d", color: "white", padding: "10px 16px", textAlign: "center", fontSize: "13px", fontWeight: 600 }}>
        BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — TỰ SỰ VỀ HÀNH TRÌNH LẤY LẠI QUYỀN LÀM CHỦ BẢN THÂN
      </div>

      {/* HERO SECTION — MANUSCRIPT STYLE */}
      <header className="hero blueprint" style={{ background: "#0c1714", color: "white", padding: "90px 0 70px" }}>
        <div className="wrap story-manuscript" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ color: "var(--bright)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
            BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
          </div>
          <h1 style={{ fontSize: "clamp(34px, 4.8vw, 56px)", color: "white", lineHeight: 1.18, fontWeight: 800, margin: "0 0 24px", letterSpacing: "-0.03em" }}>
            Lần này, đừng hứa với bản thân rằng ông sẽ bỏ thuốc.
          </h1>
          <p style={{ fontSize: "clamp(22px, 2.6vw, 32px)", color: "var(--bright)", fontWeight: 700, margin: "0 0 28px", lineHeight: 1.3 }}>
            Hãy có một kế hoạch cụ thể cho những lúc ông muốn hút.
          </p>

          <div style={{ background: "rgba(255,255,255,0.05)", borderLeft: "4px solid var(--bright)", padding: "24px 28px", borderRadius: "0 8px 8px 0", margin: "30px 0" }}>
            <p style={{ fontSize: "18px", color: "#d2ded9", margin: 0, fontStyle: "italic" }}>
              “Trong 7 ngày, ông sẽ tự xây cho mình một Bản Đồ Tác Chiến Cá Nhân để trả lời 4 câu hỏi đời thật: Cà phê sáng làm gì? Stress làm gì? Bàn nhậu nói gì? Và lỡ trượt thì xử lý thế nào?”
            </p>
          </div>

          <div className="hero-cta" style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "36px", flexWrap: "wrap" }}>
            <a href="#story" className="button" style={{ background: "var(--green)", color: "#07120d", fontWeight: 800, padding: "18px 36px", borderRadius: "6px", fontSize: "16px", textDecoration: "none" }}>
              [ ĐỌC CÂU CHUYỆN & TẠO BẢN ĐỒ ]
            </a>
            <div>
              <small style={{ color: "#7fa493", fontSize: "10px", letterSpacing: "0.12em" }}>PILOT COHORT OFFER</small>
              <div style={{ color: "var(--bright)", fontSize: "26px", fontWeight: 800 }}>497.000Đ</div>
            </div>
          </div>
        </div>
      </header>

      {/* STORY CHAPTER 1: LỜI THỀ VÀ THỰC TẾ */}
      <section id="story" className="letter-section" style={{ padding: "90px 0", borderBottom: "1px solid #dce0dc" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 01 — NHỮNG LẦN TỰ HỨA</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 24px", lineHeight: 1.25 }}>
            Ông không cần thêm một bài giảng về tác hại của thuốc lá.
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#38443f" }}>
            <p>
              Ông biết rõ rồi. Ung thư. Tim mạch. Tổn thương phổi. Hơi thở hôi. Mùi khói ám vào áo quần. Khói thuốc thụ động quanh vợ con. Có thể ông đã nghe người thân hay bác sĩ nhắc lại những điều đó hàng trăm lần.
            </p>
            <p>
              Nhưng biết thuốc lá có hại <strong>chưa bao giờ là phần khó nhất</strong>.
            </p>

            <div style={{ margin: "36px 0", padding: "24px 28px", background: "#eae7dd", borderLeft: "3px solid var(--green)", borderRadius: "0 6px 6px 0" }}>
              <p style={{ margin: 0, fontWeight: 600, color: "#17201c", fontSize: "19px" }}>
                Phần khó nhất luôn xảy ra vào những khoảnh khắc rất đời thường:
              </p>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "24px 0 32px", display: "grid", gap: "16px" }}>
              <li style={{ background: "white", padding: "20px 24px", border: "1px solid #dcdfdc", borderRadius: "8px" }}>
                <strong style={{ color: "var(--green)", fontSize: "16px" }}>7 giờ 00 sáng.</strong> Ly cà phê vừa được đặt xuống bàn. Tay ông tự động tìm bao thuốc như một phản xạ lập trình sẵn.
              </li>
              <li style={{ background: "white", padding: "20px 24px", border: "1px solid #dcdfdc", borderRadius: "8px" }}>
                <strong style={{ color: "var(--green)", fontSize: "16px" }}>11 giờ 45 trưa.</strong> Vừa gánh xong một cuộc họp căng thẳng hay một deadline dồn dập. Đầu óc thúc giục ông ra ban công 5 phút.
              </li>
              <li style={{ background: "white", padding: "20px 24px", border: "1px solid #dcdfdc", borderRadius: "8px" }}>
                <strong style={{ color: "var(--green)", fontSize: "16px" }}>8 giờ 00 tối.</strong> Ngồi cùng anh em bàn nhậu. Một người bạn rút bao thuốc chìa sang: <em>“Làm điếu không ông?”</em>
              </li>
            </ul>

            <p style={{ fontSize: "19px", fontWeight: 600, color: "#17201c" }}>
              Và chỉ trong vài giây ngắn ngủi... tất cả những gì ông từng tự hứa với lòng mình bắt đầu lung lay.
            </p>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 2: VÒNG LẶP DẰN DỖI */}
      <section className="letter-section letter-tint" style={{ padding: "90px 0", background: "#ebe7dc" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 02 — VÒNG LẶP THƯƠNG LƯỢNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 24px", lineHeight: 1.25 }}>
            Nếu ông muốn thoát khỏi cảnh “bỏ rồi lại hút”...
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#38443f" }}>
            <p>
              Rất có thể vấn đề không nằm ở chỗ ông chưa đủ quyết tâm hay thiếu bản lĩnh. <strong>Mà nằm ở chỗ ông đang cố dùng một công cụ quá đơn giản để giải quyết một hệ thống thói quen đã lặp lại hàng nghìn lần.</strong>
            </p>

            <div style={{ background: "white", padding: "30px", border: "1px solid #d5dad6", borderRadius: "10px", margin: "32px 0" }}>
              <h3 style={{ marginTop: 0, fontSize: "20px", color: "#17201c" }}>KỊCH BẢN QUEN THUỘC CỦA NHIỀU NGƯỜI ĐÀN ÔNG:</h3>
              <p style={{ fontSize: "16px", color: "#4f5c56", lineHeight: 1.8 }}>
                Một ngày đẹp trời ông quyết định: <em>“Đủ rồi, từ mai bỏ!”</em>. Ông vứt bao thuốc, cất bật lửa, tuyên bố với gia đình. Ngày đầu tiên ổn. Ngày thứ hai hơi bứt rứt. Ngày thứ ba dồn nén... Rồi một sự cố deadline, một cuộc nhậu, một buổi cà phê với đối tác diễn ra.
              </p>
              <p style={{ fontSize: "16px", color: "#4f5c56", lineHeight: 1.8, margin: 0 }}>
                Tâm trí thì thầm: <em>“Chỉ một điếu thôi chắc không sao.”</em> Một điếu biến thành hai điếu. Hai điếu thành nửa bao. Vài hôm sau... bao thuốc lại nằm gọn trong túi quần.
              </p>
            </div>

            <div style={{ background: "#0e1815", color: "white", padding: "36px", borderRadius: "10px", margin: "36px 0" }}>
              <h3 style={{ color: "var(--bright)", marginTop: 0, fontSize: "22px" }}>VÀ PHẦN KHÓ CHỊU NHẤT KHÔNG PHẢI LÀ ĐIẾU THUỐC.</h3>
              <p style={{ color: "#bdcbc5", fontSize: "17px", lineHeight: 1.85 }}>
                Mà là cảm giác dằn dỗi sau đó: <em>“Lại nữa rồi.” “Có mỗi việc này mà làm hoài không xong?”</em>
              </p>
              <p style={{ color: "#e4ebe7", fontSize: "16px", lineHeight: "1.8", margin: 0 }}>
                Có những người đàn ông điều hành công ty, quản lý hàng chục nhân sự, chốt những hợp đồng lớn... Nhưng rồi lại đứng ngoài ban công lúc 11 giờ đêm nhìn điếu thuốc cháy dở trên tay và tự hỏi: <strong>“Tại sao mình làm chủ được nhiều thứ mà lại mất quyền quyết định với chính hành vi này?”</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 3: THE TWO-LOOP PROBLEM */}
      <section className="letter-section" style={{ padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 03 — KHOẢNG TRỐNG TÁC CHIẾN</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 24px", lineHeight: 1.25 }}>
            GIẢI MÃ BÀI TOÁN HỆ THỐNG — THE TWO-LOOP PROBLEM™
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#38443f" }}>
            <p>
              Hầu hết mọi người khi cai thuốc đều gồng ý chí, tìm kẹo nhai, né tránh nhậu nhẹt hoặc đọc thêm sách báo. Nhưng những cách đó bỏ trống một câu hỏi quan trọng nhất:
            </p>
            <p style={{ fontStyle: "italic", fontWeight: 600, color: "var(--green)", fontSize: "20px", textAlign: "center", margin: "24px 0" }}>
              “Ngay trong khoảnh khắc thèm thuốc bật lên, tôi phải làm chính xác điều gì?”
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "36px 0" }}>
              <div style={{ background: "#f0f4f1", border: "1px solid #ccd5ce", padding: "26px", borderRadius: "8px" }}>
                <span style={{ color: "var(--green)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em" }}>VÒNG LẶP 1</span>
                <h4 style={{ margin: "8px 0 10px", fontSize: "18px" }}>Cơn Thèm Nicotine</h4>
                <p style={{ color: "#56625c", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Phản ứng sinh học của cơ thể khi thiếu hụt nicotine. Cảm giác bứt rứt tạm thời trong vài phút.
                </p>
              </div>
              <div style={{ background: "#0e1815", color: "white", border: "1px solid #2d453b", padding: "26px", borderRadius: "8px" }}>
                <span style={{ color: "var(--bright)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em" }}>VÒNG LẶP 2 (CỐT LÕI)</span>
                <h4 style={{ color: "white", margin: "8px 0 10px", fontSize: "18px" }}>Trigger Bối Cảnh</h4>
                <p style={{ color: "#b6c7c0", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Thói quen ăn sâu qua hàng nghìn lần lặp lại: Cà phê → Thuốc; Stress → Thuốc; Nhậu → Thuốc; Lái xe → Thuốc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 4: 4 BẢN ĐỒ TÁC CHIẾN */}
      <section className="letter-section letter-dark" style={{ background: "#091310", color: "white", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--bright)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 04 — VŨ KHÍ TÁC CHIẾN</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "white", margin: "16px 0 24px" }}>
            SAU 7 NGÀY, ÔNG NẮM TRONG TAY 4 BẢN ĐỒ TÁC CHIẾN CÁ NHÂN
          </h2>
          <p style={{ color: "#aab8b2", fontSize: "17px", marginBottom: "40px" }}>
            Mỗi ngày dành 5–10 phút học + 1 bài tập hoàn thiện Workbook. Bạn chuyển từ hy vọng suông sang việc sở hữu kế hoạch chuẩn bị trước.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {fourMaps.map((m) => (
              <div key={m.num} style={{ background: "#13231d", border: "1px solid #2b443a", padding: "28px", borderRadius: "10px" }}>
                <div style={{ color: "var(--bright)", fontWeight: 800, fontSize: "32px", lineHeight: 1 }}>{m.num}</div>
                <h3 style={{ color: "white", fontSize: "20px", margin: "14px 0 6px" }}>{m.title}</h3>
                <small style={{ color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: "12px" }}>{m.tag}</small>
                <p style={{ color: "#b9c7c1", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 5: LỘ TRÌNH 7 NGÀY THỰC HÀNH */}
      <section className="letter-section" style={{ padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 05 — HÀNH TRÌNH 7 NGÀY</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 36px" }}>
            TỪNG BƯỚC XÂY BẢN ĐỒ QUA LỘ TRÌNH 7 NGÀY
          </h2>

          <div style={{ display: "grid", gap: "18px" }}>
            {sevenDays.map((d) => (
              <div key={d.day} style={{ background: "white", border: "1px solid #d8ddd9", padding: "26px 30px", borderRadius: "8px", display: "grid", gridTemplateColumns: "100px 1fr", gap: "20px", alignItems: "start" }}>
                <span style={{ background: "var(--green)", color: "#07120d", fontWeight: 800, padding: "6px 12px", borderRadius: "4px", fontSize: "12px", textAlign: "center" }}>
                  {d.day}
                </span>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "19px", color: "#17201c" }}>{d.title}</h3>
                  <p style={{ color: "#54605b", fontSize: "15px", lineHeight: 1.7, margin: "0 0 10px" }}>{d.desc}</p>
                  <div style={{ color: "var(--green)", fontWeight: 700, fontSize: "13px" }}>
                    ✓ Thành phẩm hoàn thành: <span>{d.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 6: KỊCH BẢN ĐỜI THỰC SAU 7 NGÀY */}
      <section className="letter-section letter-tint" style={{ padding: "90px 0", background: "#ebe7dc" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 06 — KỊCH BẢN ĐỜI THỰC</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", margin: "16px 0 28px" }}>
            SAU 7 NGÀY, ĐỜI SỐNG THẬT CỦA ÔNG THAY ĐỔI NHƯ THẾ NÀO?
          </h2>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>☀️ SÁNG THƯỞNG THỨC CÀ PHÊ</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                Ngồi quán cà phê quen thuộc. Cảm giác thèm thuốc xuất hiện → Ông nhận diện nó, không hoảng lốt, mở đúng Protocol 3 phút và tiếp tục tận hưởng buổi sáng.
              </p>
            </div>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>💼 CHIỀU XỬ LÝ STRESS</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                Sự cố công việc ập đến. Ông nhận ra bộ não đang cần một khoảng nghỉ phục hồi chứ không phải độc tố nicotine. Dùng Stress Break Menu để quay lại làm việc tràn năng lượng.
              </p>
            </div>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>🍻 TỐI BẢN LĨNH BÀN NHẬU</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                Đối tác chìa thuốc: <em>“Làm điếu không?”</em>. Ông đáp lời tự nhiên theo Social Script đã chuẩn bị, giữ nguyên vị thế bản lĩnh mà không tự tách mình khỏi cuộc vui.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 7: PILOT OFFER & REGISTER */}
      <section id="offer" className="letter-offer" style={{ background: "#0a1310", color: "white", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--bright)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 07 — PILOT COHORT OFFER</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "white", margin: "16px 0 24px", textTransform: "uppercase" }}>
            TOÀN BỘ HỆ THỐNG ANH NHẬN ĐƯỢC HÔM NAY
          </h2>

          <div style={{ background: "#13231d", border: "1px solid #2b443a", padding: "32px", borderRadius: "10px", margin: "30px 0" }}>
            <h3 style={{ color: "white", marginTop: 0, fontSize: "22px", borderBottom: "1px solid #263e34", paddingBottom: "14px", marginBottom: "20px" }}>
              HỆ THỐNG BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {offerStack.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", color: "#e4ebe7", fontSize: "15px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                  <span>✓ {item.name}</span>
                  <span style={{ color: "#8aa096" }}>{item.val}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: "18px", color: "#8aa096", fontSize: "14px" }}>
              Giá trị tham chiếu: <strong style={{ color: "white" }}>1.550.000đ</strong>
            </div>
          </div>

          {/* BONUS STACK */}
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ color: "var(--bright)", fontSize: "22px", textAlign: "center", marginBottom: "25px", textTransform: "uppercase" }}>
              #3 BONUS ĐẶC QUYỀN TẶNG KÈM
            </h3>
            <div style={{ display: "grid", gap: "18px" }}>
              {bonusStack.map((b) => (
                <div key={b.title} style={{ background: "#111f1a", border: "1px solid #263e34", padding: "24px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                    <h4 style={{ color: "var(--bright)", margin: 0, fontSize: "18px" }}>{b.title}</h4>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "14px" }}>
                      Trị giá: {b.val} → <span style={{ color: "var(--bright)", fontWeight: 800 }}>MIỄN PHÍ</span>
                    </span>
                  </div>
                  <p style={{ color: "#b9c7c1", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PRICING CARD */}
          <div style={{ background: "linear-gradient(135deg, #173228, #070d0b)", border: "2px solid var(--green)", padding: "40px", borderRadius: "12px", margin: "50px 0 30px", textAlign: "center" }}>
            <small style={{ color: "var(--bright)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>TỔNG GIÁ TRỊ TOÀN BỘ: 2.120.000Đ</small>
            <div className="letter-price" style={{ margin: "20px 0 15px" }}>
              <span style={{ color: "#a5b8b0", fontSize: "13px" }}>MỨC PHÍ PILOT COHORT HÔM NAY</span>
              <b style={{ fontSize: "62px", color: "var(--bright)", lineHeight: 1 }}>497.000Đ</b>
              <span style={{ color: "#a5b8b0", marginTop: "8px" }}>Thanh toán 1 lần duy nhất · Nhận trọn bộ 4 Bản đồ tác chiến & #3 Bonus</span>
            </div>

            <div style={{ background: "#0c1714", border: "1px solid #2a4239", borderRadius: "10px", padding: "24px", margin: "25px 0", textAlign: "left" }}>
              <h4 style={{ color: "var(--bright)", fontSize: "15px", margin: "0 0 10px", textTransform: "uppercase" }}>
                IMPLEMENTATION GUARANTEE™ — CAM KẾT ĐỒNG HÀNH:
              </h4>
              <p style={{ color: "#c2d4cd", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Nếu ông kiên trì hoàn thành 7 ngày bài tập nhưng chưa xây xong được Bản Đồ Tác Chiếc cá nhân → Ông nhận thêm 14 ngày hỗ trợ review bổ sung hoàn toàn miễn phí.
              </p>
            </div>

            <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ maxWidth: "560px", width: "100%", margin: "15px auto 0", fontSize: "16px", padding: "18px 25px", textDecoration: "none" }}>
              [ TÔI MUỐN XÂY BẢN ĐỒ CỦA MÌNH — 497.000Đ ]
            </a>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 8: 2 LỰA CHỌN */}
      <section className="letter-section" style={{ padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 08 — QUYẾT ĐỊNH CỦA ÔNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 28px", textAlign: "center" }}>
            VÀ BÂY GIỜ ÔNG CÓ HAI LỰA CHỌN
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ background: "#f5f0f0", border: "1px solid #e2d2d2", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "#b83b3b", marginTop: 0, fontSize: "20px" }}>LỰA CHỌN #1</h3>
              <p style={{ color: "#5a4d4d", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                Đóng trang này. Tiếp tục vòng lặp cũ. Sáng mai cà phê vẫn thèm thuốc. Stress vẫn ra ban công. Nhậu vẫn tặc lưỡi hút lại và tiếp tục cảm giác dằn dỗi bản thân.
              </p>
            </div>
            <div style={{ background: "#edf7f1", border: "2px solid var(--green)", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "var(--green)", marginTop: 0, fontSize: "20px" }}>LỰA CHỌN #2</h3>
              <p style={{ color: "#2d4538", fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
                Dành 7 ngày tự tay xây Bản Đồ Tác Chiếc. Chuẩn bị sẵn phương án cho cà phê, stress, bàn nhậu và tích lũy từng chiến thắng nhỏ để lấy lại quyền làm chủ cuộc đời.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY CHAPTER 9: FAQ */}
      <section className="letter-section letter-tint" style={{ padding: "90px 0", background: "#ebe7dc" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "var(--green)", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 09 — GIẢI ĐÁP THẮC MẮC</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 32px" }}>
            FAQ — CÂU HỎI THƯỜNG GẶP
          </h2>
          <div className="letter-faq">
            {faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0} style={{ margin: "12px 0", background: "white", padding: "16px 20px", borderRadius: "6px", border: "1px solid #dbe0dc" }}>
                <summary style={{ fontStyle: "normal", fontWeight: 700, fontSize: "16px", color: "#17201c", cursor: "pointer" }}>{faq.q}</summary>
                <p style={{ margin: "14px 0 0", color: "#4c5953", fontSize: "15px", lineHeight: 1.75 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="letter-closing" style={{ background: "#060d0b", color: "white", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ color: "var(--bright)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            LỜI KẾT
          </p>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "white", margin: "20px 0 24px", lineHeight: 1.25 }}>
            Đừng bắt đầu bằng một lời thề nữa. Hãy bắt đầu bằng một Bản Đồ.
          </h2>
          <p style={{ fontSize: "18px", color: "#aebdb7", marginBottom: "36px" }}>
            Ông có muốn tiếp tục để mỗi ly cà phê, mỗi deadline và mỗi bàn nhậu quyết định thay mình hay không?
          </p>

          <a className="letter-button" href="#offer" style={{ maxWidth: "580px", margin: "0 auto", fontSize: "17px", padding: "20px 36px", textDecoration: "none" }}>
            [ BẮT ĐẦU BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — 497.000Đ ]
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#040706", color: "#6e7e78", padding: "40px 0", fontSize: "12px" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <b style={{ color: "#b2c1bc" }}>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</b>
          <p style={{ margin: "10px 0" }}>
            Chương trình cung cấp nội dung giáo dục về hành vi, tác nhân và lối sống. Không thay thế tư vấn, chẩn đoán hoặc điều trị y tế chuyên môn.
          </p>
          <span>© 2026 Bản Đồ Cai Thuốc Lá 7 Ngày™. All rights reserved.</span>
        </div>
      </footer>

      {/* MOBILE STICKY BAR */}
      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`}>
        <div>
          <small>PILOT COHORT</small>
          <b>497.000Đ</b>
        </div>
        <a href="#offer">TẠO BẢN ĐỒ CỦA TÔI →</a>
      </div>
    </div>
  );
}
