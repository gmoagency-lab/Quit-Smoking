"use client";

import { useEffect, useState } from "react";

const fourQuestions = [
  {
    icon: "☕",
    title: "Khi uống cà phê và thèm thuốc",
    action: "→ Làm gì?",
    desc: "Bản đồ xử lý phản xạ tự nhiên khi ly cà phê vừa đặt xuống.",
  },
  {
    icon: "⚡",
    title: "Khi stress",
    action: "→ Làm gì?",
    desc: "Phương án giải tỏa căng thẳng thay thế cho 5 phút ra ban công.",
  },
  {
    icon: "🍻",
    title: "Khi được mời thuốc trên bàn nhậu",
    action: "→ Nói gì?",
    desc: "Kịch bản từ chối tự nhiên không biến mình thành người khác biệt.",
  },
  {
    icon: "🔄",
    title: "Nếu lỡ hút lại một điếu",
    action: "→ Xử lý thế nào?",
    desc: "Quy trình khôi phục ngắn để không biến 1 điếu thành cả bao.",
  },
];

const fourMaps = [
  {
    num: "01",
    name: "TRIGGER MAP™",
    tagline: "Nhận diện 5–7 tình huống nguy hiểm nhất",
    desc: "Không còn nói chung chung 'Tui thèm thuốc'. Chuyển thành: 'Tui thường thèm thuốc vào lúc X, sau Y và khi cảm thấy Z'. Việc nhìn rõ pattern giúp ông làm chủ phản ứng.",
  },
  {
    num: "02",
    name: "PROTOCOL 3 PHÚT™",
    tagline: "Xử lý khoảnh khắc trước mắt",
    desc: "Cơn thèm lên xuống theo từng đợt. Chuẩn bị sẵn một chuỗi hành động ngắn 3 phút để tạo khoảng cách an toàn giữa Trigger và phản xạ châm thuốc.",
  },
  {
    num: "03",
    name: "SOCIAL NAVIGATION SCRIPT™",
    tagline: "Đời sống thật của đàn ông",
    desc: "Không thể bỏ thuốc bằng cách sống trong phòng kín. Chuẩn bị trước câu từ chối tự nhiên, exit strategy khi đi làm, cà phê, gặp đối tác và bàn nhậu.",
  },
  {
    num: "04",
    name: "RECOVERY MAP™",
    tagline: "Xóa bỏ tư duy All-Or-Nothing",
    desc: "Không quay lại hút vì 1 điếu thuốc, mà vì suy nghĩ 'Xong rồi, lỡ hút thì hút luôn'. Recovery Map giúp ông biết chính xác phải làm gì trong 1 giờ tiếp theo.",
  },
];

const sevenDays = [
  {
    day: "NGÀY 1",
    title: "NHÌN THẲNG VÀO VÒNG LẶP",
    desc: "Rà lại hành vi hút thuốc thực tế của mình. Không phán xét. Không tự chửi. Chỉ nhìn dữ liệu: Hút lúc nào? Ở đâu? Với ai? Trước và sau khi hút cảm thấy gì?",
    output: "Current Smoking Loop Map™",
  },
  {
    day: "NGÀY 2",
    title: "TÁCH CƠN THÈM KHỎI TRIGGER",
    desc: "Phân biệt: Đây là cảm giác cơ thể? Hay phản xạ bối cảnh? Hay chỉ vì 'đến giờ này bao năm nay mình đều hút'?",
    output: "Two-Loop Diagnostic™",
  },
  {
    day: "NGÀY 3",
    title: "LẬP TRIGGER MAP™",
    desc: "Tìm ra những tình huống nguy hiểm nhất. Không cố sửa tất cả cùng lúc. Chọn những Trigger có tần suất và sức kéo mạnh nhất.",
    output: "Personal Trigger Map™",
  },
  {
    day: "NGÀY 4",
    title: "PROTOCOL CHO CÀ PHÊ & THỜI ĐIỂM QUEN TAY",
    desc: "Xử lý những phản xạ nhỏ nhưng lặp lại nhiều nhất. Tạo một hành vi mới chen vào giữa Trigger → Hút thuốc.",
    output: "Daily Trigger Protocol™",
  },
  {
    day: "NGÀY 5",
    title: "PROTOCOL CHO STRESS & BÀN NHẬU",
    desc: "Hai trigger khiến nhiều người trượt nhất. Thiết kế trước: Khi stress làm gì? Khi cần break làm gì? Khi được mời thuốc nói gì?",
    output: "Stress + Social Navigation Card™",
  },
  {
    day: "NGÀY 6",
    title: "BẰNG CHỨNG LÀM CHỦ HÀNH VI",
    desc: "Tích lũy những chiến thắng nhỏ: 1 ly cà phê không hút, 1 lần stress không châm thuốc ngay, 1 lời từ chối. Thay đổi câu chuyện ông kể về chính mình.",
    output: "Micro-Proof Tracker™",
  },
  {
    day: "NGÀY 7",
    title: "RECOVERY MAP & KẾ HOẠCH ĐI TIẾP",
    desc: "Xây một kế hoạch có phương án khi mọi chuyện lệch khỏi dự kiến (deadline, bia rượu, mệt mỏi) thay vì chỉ hoạt động khi bình yên.",
    output: "Recovery Map + 21-Day Continuation Plan™",
  },
];

const offerItems = [
  { name: "CHƯƠNG TRÌNH BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ (7 Module triển khai)", price: "590.000đ" },
  { name: "WORKBOOK BẢN ĐỒ TÁC CHIẾN™ (Nơi xây dựng 4 Bản đồ)", price: "290.000đ" },
  { name: "QUICK RESPONSE CARDS™ (Lưu điện thoại mở ra xem ngay)", price: "190.000đ" },
  { name: "SOCIAL NAVIGATION SCRIPT™ (Bộ câu từ chối xã giao)", price: "190.000đ" },
  { name: "RECOVERY MAP™ (Kế hoạch xử lý khi lỡ trượt)", price: "290.000đ" },
];

const bonusList = [
  {
    title: "BONUS #1 — THE MORNING COFFEE RESET™",
    value: "190.000đ",
    desc: "Mini-guide dành riêng cho trigger phổ biến nhất: Cà phê sáng. Thiết kế lại ritual buổi sáng để phá liên kết Cà phê = Phải có thuốc.",
  },
  {
    title: "BONUS #2 — THE STRESS BREAK MENU™",
    value: "190.000đ",
    desc: "Danh sách những cách tạo khoảng nghỉ ngắn khi công việc căng thẳng mà không mặc định 'Break = Hút thuốc'.",
  },
  {
    title: "BONUS #3 — THE 21-DAY CONTINUATION TRACKER™",
    value: "190.000đ",
    desc: "Bảng theo dõi 21 ngày tiếp theo khi ứng dụng bản đồ vào đời sống thật: ghi lại trigger, cách xử lý, chiến thắng nhỏ và điều chỉnh.",
  },
];

const faqs = [
  {
    q: "1. 7 ngày có phải cam kết tôi sẽ cai hoàn toàn thuốc lá không?",
    a: "Không. 7 ngày là giai đoạn ông xây và bắt đầu triển khai hệ thống cá nhân gồm Trigger Map, Protocol, Social Script và Recovery Plan. Kết quả thực tế khác nhau tùy mức độ phụ thuộc nicotine, lịch sử hút thuốc, tình trạng sức khỏe và mức độ triển khai.",
  },
  {
    q: "2. Tôi hút hơn 10 năm có tham gia được không?",
    a: "Có thể. Đặc biệt nếu ông nhận thấy mình hút nhiều theo những trigger quen thuộc như cà phê, stress, sau ăn hoặc xã giao. Nếu mức độ phụ thuộc nicotine cao, từng có phản ứng cai mạnh hoặc có tình trạng sức khỏe liên quan, nên trao đổi thêm với bác sĩ/chuyên gia y tế về phương án hỗ trợ phù hợp.",
  },
  {
    q: "3. Tôi đang sử dụng kẹo/miếng dán nicotine thì sao?",
    a: "Chương trình tập trung vào hành vi, trigger và kế hoạch ứng phó. Nó không thay thế hoặc tự ý thay đổi phác đồ sử dụng sản phẩm/thuốc đang được chuyên gia y tế hướng dẫn.",
  },
  {
    q: "4. Tôi có phải bỏ cà phê không?",
    a: "Không phải mục tiêu mặc định. Chúng ta muốn nhận diện cách cà phê đang liên kết với hành vi hút thuốc và thiết kế lại phản ứng của ông trong bối cảnh đó.",
  },
  {
    q: "5. Tôi vẫn phải đi nhậu và tiếp khách thì sao?",
    a: "Đó là lý do có Social Navigation Script™. Thay vì giả định ông có thể né tất cả môi trường xã hội, chương trình giúp ông chuẩn bị trước cho chúng. Tuy nhiên, rượu bia có thể làm giảm khả năng tự kiểm soát và là trigger mạnh đối với nhiều người, nên việc giảm hoặc điều chỉnh mức sử dụng vẫn có thể hữu ích.",
  },
  {
    q: "6. Mỗi ngày mất bao lâu?",
    a: "Khoảng 5–10 phút cho nội dung chính, cộng thêm thời gian ngắn để hoàn thành bài tập tương ứng. Mục tiêu là triển khai, không phải xem thật nhiều video.",
  },
  {
    q: "7. Tôi từng bỏ rồi hút lại nhiều lần. Có phù hợp không?",
    a: "Đây chính là nhóm có thể hưởng lợi nhiều từ phần Trigger Mapping và Recovery Map. Thay vì chỉ hỏi 'Làm sao để quyết tâm hơn?', ta tìm 'Chính xác mình thường quay lại ở đâu?'.",
  },
  {
    q: "8. Tôi lỡ hút lại một điếu thì sao?",
    a: "Không xem một lần trượt là lý do để bỏ toàn bộ kế hoạch. Ông sử dụng Recovery Map để xem lại trigger, điều chỉnh Protocol và quay trở lại kế hoạch càng sớm càng tốt.",
  },
  {
    q: "9. Đây có phải chương trình điều trị y tế không?",
    a: "Không. Đây là chương trình giáo dục và thay đổi hành vi. Nó không chẩn đoán, điều trị hoặc thay thế bác sĩ, thuốc kê đơn hay phương pháp điều trị cai thuốc lá chuyên môn.",
  },
  {
    q: "10. Tại sao không xem YouTube miễn phí?",
    a: "Ông hoàn toàn có thể. Điểm khác biệt của chương trình là thay vì thu thập thêm nhiều mẹo rời rạc, ông đi qua một flow có thứ tự để tạo ra các thành phẩm cá nhân cụ thể. Nếu ông có thể tự nghiên cứu, tự hệ thống hóa và tự triển khai tốt, ông không nhất thiết cần chương trình này. Nếu ông muốn một lộ trình đã đóng gói để bắt đầu ngay... Đó là lúc BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ có ý nghĩa.",
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
    <div className="letter-page" style={{ background: "#f5f1e8", color: "#17201c" }}>
      {/* Announcement Bar */}
      <div className="letter-announcement" style={{ background: "#168a4d", color: "white" }}>
        <span>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</span> — Từ một lời hứa mơ hồ thành một kế hoạch có thể thực hiện
      </div>

      {/* HERO SECTION */}
      <header className="hero blueprint" style={{ background: "#0e1815", color: "white", padding: "80px 0 60px" }}>
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow" style={{ color: "var(--bright)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              <i></i> BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </div>
            <h1 style={{ fontSize: "clamp(34px, 4.5vw, 54px)", color: "white", margin: "20px 0 16px", lineHeight: "1.15" }}>
              Lần này đừng hứa với bản thân rằng ông sẽ bỏ thuốc.
            </h1>
            <p className="hero-line" style={{ fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--bright)", fontWeight: 700, margin: "0 0 24px" }}>
              Hãy có một kế hoạch cho lúc ông muốn hút.
            </p>
            <p style={{ fontSize: "17px", color: "#b8c7c1", lineHeight: "1.7", marginBottom: "28px" }}>
              Trong 7 ngày, ông xây cho mình một <strong>Bản Đồ Tác Chiến Cá Nhân</strong> để chuẩn bị sẵn phương án xử lý cho từng tình huống đang kéo mình quay lại điếu thuốc.
            </p>

            <div className="hero-cta" style={{ gap: "18px", flexWrap: "wrap" }}>
              <a href="#offer" className="button" style={{ background: "var(--green)", color: "#07120d", fontWeight: 800, padding: "18px 32px", borderRadius: "6px", fontSize: "15px" }}>
                [ TẠO BẢN ĐỒ CỦA TÔI ]
              </a>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <small style={{ color: "#7fa493", fontSize: "10px", letterSpacing: "0.1em" }}>PILOT COHORT OFFER</small>
                <strong style={{ color: "var(--bright)", fontSize: "24px" }}>497.000Đ</strong>
              </div>
            </div>
          </div>

          {/* 4 Questions Grid */}
          <div style={{ background: "#13231e", border: "1px solid #2e473d", borderRadius: "12px", padding: "28px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
            <h3 style={{ color: "var(--bright)", fontSize: "15px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px", borderBottom: "1px solid #243a32", paddingBottom: "12px" }}>
              TRẢ LỜI 4 CÂU HỎI QUYẾT ĐỊNH:
            </h3>
            <div style={{ display: "grid", gap: "14px" }}>
              {fourQuestions.map((q) => (
                <div key={q.title} style={{ background: "#0a1310", border: "1px solid #253931", padding: "14px 18px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>{q.icon} {q.title}</span>
                    <span style={{ color: "var(--bright)", fontWeight: 800, fontSize: "13px" }}>{q.action}</span>
                  </div>
                  <p style={{ color: "#95a8a1", fontSize: "13px", margin: 0 }}>{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: KHÔNG CẦN THÊM BÀI GIẢNG TÁC HẠI */}
      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">01 — THỰC TẾ ĐỜI THƯỜNG</p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", margin: "0 0 24px" }}>
            ÔNG KHÔNG CẦN THÊM MỘT BÀI GIẢNG VỀ TÁC HẠI CỦA THUỐC LÁ.
          </h2>
          <div style={{ fontStyle: "italic", color: "#56615b", fontSize: "19px", marginBottom: "28px", paddingLeft: "20px", borderLeft: "3px solid var(--green)" }}>
            Ông biết rồi. Ung thư. Tim mạch. Phổi. Hơi thở. Mùi thuốc trên quần áo. Khói thuốc quanh vợ con. Có thể ông đã nghe những điều đó hàng trăm lần.
          </div>
          <p style={{ fontSize: "18px", lineHeight: "1.85", color: "#3d4843" }}>
            Vấn đề là... <strong>Biết thuốc lá có hại chưa bao giờ là phần khó nhất.</strong> Phần khó nhất thường xảy ra vào những lúc rất đời thường:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "18px", margin: "30px 0" }}>
            <div style={{ background: "white", border: "1px solid #dce0dc", padding: "24px", borderRadius: "8px" }}>
              <span style={{ color: "var(--green)", fontWeight: 800, fontSize: "20px" }}>7:00 AM</span>
              <h4 style={{ margin: "10px 0 8px", fontSize: "17px" }}>Ly cà phê sáng</h4>
              <p style={{ color: "#66726d", fontSize: "14px", margin: 0 }}>Ly cà phê vừa được đặt xuống. Tay tự nhiên muốn tìm bao thuốc.</p>
            </div>
            <div style={{ background: "white", border: "1px solid #dce0dc", padding: "24px", borderRadius: "8px" }}>
              <span style={{ color: "var(--green)", fontWeight: 800, fontSize: "20px" }}>11:45 AM</span>
              <h4 style={{ margin: "10px 0 8px", fontSize: "17px" }}>Cuộc họp căng thẳng</h4>
              <p style={{ color: "#66726d", fontSize: "14px", margin: 0 }}>Vừa xử lý xong một deadline. Đầu óc muốn có 5 phút ra ban công.</p>
            </div>
            <div style={{ background: "white", border: "1px solid #dce0dc", padding: "24px", borderRadius: "8px" }}>
              <span style={{ color: "var(--green)", fontWeight: "800", fontSize: "20px" }}>8:00 PM</span>
              <h4 style={{ margin: "10px 0 8px", fontSize: "17px" }}>Bàn nhậu anh em</h4>
              <p style={{ color: "#66726d", fontSize: "14px", margin: 0 }}>Anh em rút bao thuốc: “Làm điếu không?”. Trong vài giây, tất cả lời tự hứa bắt đầu lung lay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GIẢI QUYẾT SAI BÀI TOÁN */}
      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">02 — BẤT AN VÀ VÒNG LẶP</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "0 0 20px" }}>
            NẾU ÔNG MUỐN THOÁT KHỎI CẢNH “BỎ RỒI LẠI HÚT”...
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.85", color: "#3f4b46" }}>
            ...thì đây có thể là một trong những thông tin quan trọng nhất ông đọc hôm nay. Bởi vì rất có thể vấn đề không nằm ở chỗ ông chưa đủ quyết tâm. <strong>Mà nằm ở chỗ ông đang cố giải quyết sai bài toán.</strong>
          </p>

          <div style={{ background: "white", borderLeft: "4px solid #d8665b", padding: "28px", margin: "30px 0", borderRadius: "0 8px 8px 0" }}>
            <h3 style={{ marginTop: 0, fontSize: "20px", color: "#17201c" }}>CÓ THỂ ÔNG ĐÃ TỪNG TRẢI QUA CHUYỆN NÀY:</h3>
            <p style={{ fontSize: "16px", color: "#525e59", lineHeight: "1.8" }}>
              Một ngày ông quyết định: <em>“Đủ rồi. Từ mai bỏ.”</em> Ông vứt bao thuốc, cất bật lửa, tuyên bố với vợ. Ngày đầu ổn, ngày thứ 2 bứt rứt... Rồi một deadline, một cuộc nhậu, một buổi cà phê xảy ra. <em>“Một điếu chắc không sao.”</em> Một điếu biến thành hai. Vài hôm sau... bao thuốc lại nằm trong túi.
            </p>
          </div>

          <div style={{ background: "#15211d", color: "white", padding: "35px", borderRadius: "10px", margin: "30px 0" }}>
            <h3 style={{ color: "var(--bright)", marginTop: 0, fontSize: "22px" }}>VÀ PHẦN KHÓ CHỊU NHẤT KHÔNG PHẢI LÀ ĐIẾU THUỐC.</h3>
            <p style={{ color: "#c0cbc6", fontSize: "17px", lineHeight: "1.8" }}>
              Mà là cảm giác sau đó: <em>“Lại nữa.” “Mình nói bao nhiêu lần rồi?” “Có mỗi chuyện này cũng không làm nổi?”</em>
            </p>
            <p style={{ color: "#e4ebe7", fontSize: "16px", lineHeight: "1.8" }}>
              Có những người quản lý cả một đội ngũ, điều hành công ty, xử lý những quyết định hàng trăm triệu, gánh cả một gia đình... Nhưng lại đứng ngoài ban công lúc 11 giờ đêm nhìn điếu thuốc và tự hỏi: <strong>“Sao mình làm chủ được bao nhiêu thứ mà lại không làm chủ nổi cái này?”</strong>
            </p>
            <div style={{ borderTop: "1px solid #2e443c", paddingTop: "16px", marginTop: "20px", color: "var(--bright)", fontWeight: 700 }}>
              Đây mới là thứ âm thầm khó chịu: Cảm giác tôi đang mất quyền quyết định đối với chính hành vi của mình.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TWO-LOOP PROBLEM */}
      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">03 — BẢN CHẤT VẤN ĐỀ</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "0 0 20px" }}>
            HỆ THỐNG KHOẢNG TRỐNG TÁC CHIẾN — THE TWO-LOOP PROBLEM™
          </h2>
          <p style={{ fontSize: "18px", lineHeight: "1.85", color: "#3f4b46" }}>
            Hầu hết mọi người cố gắng cai bằng 4 cách quen thuộc: <strong>(1) Gồng ý chí</strong>, <strong>(2) Kẹo / Miếng dán</strong>, <strong>(3) Né hoàn cảnh</strong>, <strong>(4) Đọc thêm / Xem video</strong>. Nhưng tất cả đều thiếu câu trả lời cho khoảnh khắc đời thật khi phản xạ châm thuốc bật lên.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "35px 0" }}>
            <div style={{ background: "#f0f4f1", border: "1px solid #ccd5ce", padding: "28px", borderRadius: "8px" }}>
              <span style={{ color: "var(--green)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em" }}>VÒNG 1</span>
              <h3 style={{ margin: "8px 0 12px", fontSize: "20px" }}>Cơn Thèm Nicotine</h3>
              <p style={{ color: "#56625c", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                Cơ thể đã quen với nicotine và xuất hiện cảm giác khó chịu về thể chất khi ngừng sử dụng.
              </p>
            </div>
            <div style={{ background: "#13221d", color: "white", border: "1px solid #2d453b", padding: "28px", borderRadius: "8px" }}>
              <span style={{ color: "var(--bright)", fontWeight: 800, fontSize: "12px", letterSpacing: "0.1em" }}>VÒNG 2 (QUAN TRỌNG HƠN)</span>
              <h3 style={{ color: "white", margin: "8px 0 12px", fontSize: "20px" }}>Vòng Lặp Trigger</h3>
              <p style={{ color: "#b6c7c0", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                Bối cảnh gắn liền với thói quen: Cà phê → thuốc; Stress → thuốc; Nhậu → thuốc; Lái xe → thuốc; Nghỉ giải lao → thuốc.
              </p>
            </div>
          </div>
          <p style={{ fontSize: "17px", fontStyle: "italic", color: "#48544f", textAlign: "center" }}>
            “Thay vì hút, trong tình huống cụ thể này tôi sẽ làm gì?” — Đó mới là lúc Bản Đồ Tác Chiến trở nên quan trọng.
          </p>
        </div>
      </section>

      {/* SECTION 4: 4 BẢN ĐỒ TÁC CHIẾN */}
      <section className="letter-section letter-dark" style={{ background: "#0e1815", color: "white", padding: "90px 0" }}>
        <div className="letter-wrap">
          <p className="letter-number" style={{ color: "var(--bright)" }}>04 — THÀNH PHẨM CỐT LÕI</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "white", margin: "0 0 16px" }}>
            SAU 7 NGÀY, ÔNG SẼ CÓ TRONG TAY 4 BẢN ĐỒ TÁC CHIẾN
          </h2>
          <p style={{ color: "#aab8b2", fontSize: "17px", marginBottom: "40px" }}>
            Mỗi ngày 5–10 phút nội dung + 1 bài tập nhỏ. Mục tiêu cuối cùng là biết chính xác phải làm gì khi cơn thèm xuất hiện.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {fourMaps.map((m) => (
              <div key={m.num} style={{ background: "#14251f", border: "1px solid #2b443a", padding: "30px", borderRadius: "10px" }}>
                <span style={{ color: "var(--bright)", fontWeight: 800, fontSize: "28px" }}>{m.num}</span>
                <h3 style={{ color: "white", fontSize: "20px", margin: "12px 0 6px" }}>{m.name}</h3>
                <small style={{ color: "var(--gold)", fontWeight: 700, display: "block", marginBottom: "14px" }}>{m.tagline}</small>
                <p style={{ color: "#b9c7c1", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LỘ TRÌNH 7 NGÀY */}
      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">05 — LỘ TRÌNH CHI TIẾT</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", margin: "0 0 35px" }}>
            ĐÂY LÀ CÁCH CHƯƠNG TRÌNH HOẠT ĐỘNG TRONG 7 NGÀY
          </h2>

          <div style={{ display: "grid", gap: "16px" }}>
            {sevenDays.map((d) => (
              <div key={d.day} style={{ background: "white", border: "1px solid #d8ddd9", padding: "26px 30px", borderRadius: "8px", display: "grid", gridTemplateColumns: "100px 1fr", gap: "20px", alignItems: "start" }}>
                <div>
                  <span style={{ background: "var(--green)", color: "#07120d", fontWeight: 800, padding: "6px 12px", borderRadius: "4px", fontSize: "12px" }}>{d.day}</span>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "19px" }}>{d.title}</h3>
                  <p style={{ color: "#54605b", fontSize: "15px", lineHeight: "1.7", margin: "0 0 10px" }}>{d.desc}</p>
                  <div style={{ color: "var(--green)", fontWeight: 700, fontSize: "13px" }}>
                    ✓ Thành phẩm: <span>{d.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CUỘC SỐNG SAU 7 NGÀY */}
      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">06 — KỊCH BẢN ĐỜI THỰC</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", margin: "0 0 28px" }}>
            SAU 7 NGÀY, CUỘC SỐNG CÓ THỂ BẮT ĐẦU TRÔNG KHÁC ĐI NHƯ THẾ NÀO?
          </h2>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>☀️ BUỔI SÁNG (CÀ PHÊ)</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                Ngồi đúng quán cũ, ly cà phê đen. Cảm giác thèm xuất hiện → Ông nhận ra nó, không hoảng, không tranh cãi. Mở đúng Protocol, làm những gì đã chuẩn bị và tiếp tục buổi sáng.
              </p>
            </div>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>💼 BUỔI CHIỀU (STRESS CÔNG VIỆC)</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                Sự cố deadline xảy ra. Ông biết mình đang cần 1 khoảng nghỉ ngắn chứ không nhất thiết cần điếu thuốc. Dùng phương án break khác, quay lại bàn làm tiếp.
              </p>
            </div>
            <div style={{ background: "white", padding: "28px", borderRadius: "8px", borderLeft: "4px solid var(--green)" }}>
              <h4 style={{ color: "var(--green)", margin: "0 0 8px", fontSize: "18px" }}>🍻 BUỔI TỐI (BÀN NHẬU / ĐỐI TÁC)</h4>
              <p style={{ color: "#45524d", fontSize: "15px", lineHeight: "1.7", margin: 0 }}>
                Đối tác rút thuốc: “Làm điếu không?”. Đã có Script sẵn, trả lời tự nhiên. Cuộc trò chuyện tiếp tục. Ông có thêm 1 bằng chứng làm chủ hành vi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: OFFER STACK & PRICING */}
      <section id="offer" className="letter-offer" style={{ background: "#0e1815", color: "white", padding: "90px 0" }}>
        <div className="letter-wrap">
          <p className="letter-number" style={{ color: "var(--bright)" }}>07 — PILOT COHORT OFFER</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "white", margin: "0 0 16px", textTransform: "uppercase" }}>
            ÔNG NHẬN ĐƯỢC GỊ KHI THAM GIA HÔM NAY?
          </h2>

          <div style={{ background: "#14251f", border: "1px solid #2b443a", padding: "35px", borderRadius: "10px", margin: "30px 0" }}>
            <h3 style={{ color: "white", marginTop: 0, fontSize: "22px", borderBottom: "1px solid #263e34", paddingBottom: "14px", marginBottom: "20px" }}>
              BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ (HỆ THỐNG CHÍNH)
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {offerItems.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", color: "#e4ebe7", fontSize: "15px", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "10px" }}>
                  <span>✓ {item.name}</span>
                  <span style={{ color: "#8aa096" }}>{item.price}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "right", marginTop: "18px", color: "#8aa096", fontSize: "14px" }}>
              Tổng giá trị tham chiếu: <strong style={{ color: "white" }}>1.550.000đ</strong>
            </div>
          </div>

          {/* BONUS STACK */}
          <div style={{ marginTop: "40px" }}>
            <h3 style={{ color: "var(--bright)", fontSize: "22px", textAlign: "center", marginBottom: "25px", textTransform: "uppercase" }}>
              TẶNG KÈM #3 BONUS ĐẶC QUYỀN
            </h3>
            <div style={{ display: "grid", gap: "20px" }}>
              {bonusList.map((b) => (
                <div key={b.title} style={{ background: "#111f1a", border: "1px solid #263e34", padding: "26px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                    <h4 style={{ color: "var(--bright)", margin: 0, fontSize: "18px" }}>{b.title}</h4>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "14px" }}>
                      Giá trị: {b.value} → <span style={{ color: "var(--bright)", fontWeight: 800 }}>MIỄN PHÍ</span>
                    </span>
                  </div>
                  <p style={{ color: "#b9c7c1", fontSize: "14px", margin: 0, lineHeight: "1.6" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PRICE PRICING CARD */}
          <div style={{ background: "linear-gradient(135deg, #173228, #0a1411)", border: "2px solid var(--green)", padding: "40px", borderRadius: "12px", margin: "50px 0 30px", textAlign: "center" }}>
            <small style={{ color: "var(--bright)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>TỔNG GIÁ TRỊ TOÀN BỘ: 2.120.000Đ</small>
            <div className="letter-price" style={{ margin: "20px 0 15px" }}>
              <span style={{ color: "#a5b8b0", fontSize: "13px" }}>MỨC PHÍ PILOT COHORT HÔM NAY</span>
              <b style={{ fontSize: "62px", color: "var(--bright)", lineHeight: 1 }}>497.000Đ</b>
              <span style={{ color: "#a5b8b0", marginTop: "8px" }}>Thanh toán 1 lần duy nhất · Tương đương tiền 1 tuần hút thuốc</span>
            </div>

            <div style={{ background: "#0c1714", border: "1px solid #2a4239", borderRadius: "10px", padding: "26px", margin: "25px 0", textAlign: "left" }}>
              <h4 style={{ color: "var(--bright)", fontSize: "16px", margin: "0 0 14px", textTransform: "uppercase" }}>
                IMPLEMENTATION GUARANTEE™ — CAM KẾT ĐỒNG HÀNH TriỂN KHAI:
              </h4>
              <p style={{ color: "#c2d4cd", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
                Nếu ông hoàn thành đầy đủ 7 ngày, thực hiện bài tập nhưng đến cuối chương trình vẫn chưa xây xong được Bản Đồ Tác Chiếc cá nhân → Ông sẽ nhận thêm 14 ngày hỗ trợ review bổ sung mà không mất thêm phí. Mục tiêu là không để ông mua rồi bỏ đó.
              </p>
            </div>

            <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ maxWidth: "560px", width: "100%", margin: "15px auto 0", fontSize: "16px", padding: "18px 25px" }}>
              [ TÔI MUỐN XÂY BẢN ĐỒ CỦA MÌNH — 497.000Đ ]
            </a>
            <p style={{ fontSize: "12px", color: "#7f928a", marginTop: "14px" }}>
              *Không cần hứa “cả đời không hút”. Bắt đầu bằng việc hiểu điều gì đang kéo mình và xử lý từng bước.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: 2 LỰA CHỌN */}
      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">08 — LỰA CHỌN CỦA ÔNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "0 0 28px", textAlign: "center" }}>
            VÀ BÂY GIỜ ÔNG CÓ HAI LỰA CHỌN
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ background: "#f5f0f0", border: "1px solid #e2d2d2", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "#b83b3b", marginTop: 0, fontSize: "20px" }}>LỰA CHỌN #1</h3>
              <p style={{ color: "#5a4d4d", fontSize: "15px", lineHeight: "1.7" }}>
                Đóng trang này. Không có gì thay đổi. Sáng mai vẫn cà phê, vẫn điếu thuốc. Stress vẫn ra ngoài hút. Nhậu vẫn “Thôi một điếu”. Vài tuần nữa lại thử chiến thuật cũ và quay về đúng vòng lặp hiện tại.
              </p>
            </div>
            <div style={{ background: "#edf7f1", border: "2px solid var(--green)", padding: "30px", borderRadius: "8px" }}>
              <h3 style={{ color: "var(--green)", marginTop: 0, fontSize: "20px" }}>LỰA CHỌN #2 (KHUYÊN DÙNG)</h3>
              <p style={{ color: "#2d4538", fontSize: "15px", lineHeight: "1.7" }}>
                Dành 7 ngày để hiểu hệ thống điều khiển hành vi của mình. Tìm trigger, xây Protocol, chuẩn bị bàn nhậu, stress, và lúc lỡ trượt. Bắt đầu tích lũy từng bằng chứng nhỏ để lấy lại quyền kiểm soát.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">09 — CÂU HỎI THƯỜNG GẶP</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "0 0 35px" }}>
            FAQ — GIẢI ĐÁP THẮC MẮC
          </h2>
          <div className="letter-faq">
            {faqs.map((faq, index) => (
              <details key={faq.q} open={index === 0} style={{ margin: "10px 0", background: "white", padding: "14px 20px", borderRadius: "6px", border: "1px solid #dbe0dc" }}>
                <summary style={{ fontStyle: "normal", fontWeight: 700, fontSize: "16px", color: "#17201c" }}>{faq.q}</summary>
                <p style={{ margin: "14px 0 0", color: "#4c5953", fontSize: "15px", lineHeight: "1.75" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="letter-closing" style={{ background: "#0a1310", color: "white", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ textAlign: "center" }}>
          <p className="letter-salutation" style={{ color: "var(--bright)", fontStyle: "normal", fontWeight: 700, letterSpacing: "0.1em" }}>
            CÂU HỎI CUỐI CÙNG
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4.5vw, 54px)", color: "white", margin: "20px 0 24px" }}>
            Ông có muốn tiếp tục để mỗi ly cà phê, mỗi deadline và mỗi bàn nhậu quyết định thay mình hay không?
          </h2>
          <p style={{ fontSize: "19px", color: "#aebdb7", maxWidth: "700px", margin: "0 auto 35px" }}>
            Nếu câu trả lời là không... Đừng bắt đầu bằng một lời thề nữa. Bắt đầu bằng một Bản Đồ.
          </p>

          <a className="letter-button" href="#offer" style={{ maxWidth: "580px", margin: "0 auto", fontSize: "17px", padding: "20px 32px" }}>
            [ BẮT ĐẦU BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — 497.000Đ ]
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060a09", color: "#6e7e78", padding: "40px 0", fontSize: "12px" }}>
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
