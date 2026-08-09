"use client";

import { useEffect, useState } from "react";

const fourMaps = [
  {
    num: "01",
    title: "TRIGGER MAP™",
    tag: "Biết chính xác khi nào mình dễ trượt nhất",
    desc: "Không còn nói chung chung 'Tui thèm thuốc'. Bắt đầu nhìn rõ: Tui thường muốn hút vào thời điểm nào? Sau chuyện gì? Khi ở cùng ai? Khi đang cảm thấy thế nào? Điếu nào là phản xạ quen tay? Điếu nào là Trigger nguy hiểm?",
    badge: "WORKBOOK & APP ASSET",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "#D96732", fontWeight: 700, marginBottom: "4px" }}>[ PERSONAL TRIGGER MAP ]</div>
        <div>▸ Cà phê sáng: Bối cảnh cố định</div>
        <div>▸ Căng thẳng deadline: Trigger xả stress</div>
        <div>▸ Bàn nhậu: Trigger xã giao mạnh</div>
      </div>
    ),
  },
  {
    num: "02",
    title: "PROTOCOL 3 PHÚT™",
    tag: "Biết phải làm gì ngay khi cơn thèm xuất hiện",
    desc: "Không phải đứng gồng 'Cố lên. Không được hút'. Tạo một chuỗi hành động ngắn trong những phút đầu tiên để tạo khoảng cách an toàn giữa Trigger bối cảnh và phản xạ châm thuốc.",
    badge: "QUICK RESPONSE CARD",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "#D96732", fontWeight: 700, marginBottom: "4px" }}>[ EMERGENCY PROTOCOL ]</div>
        <div>00:00 - Nhận diện sóng thèm</div>
        <div>01:00 - Uống 200ml nước lạnh</div>
        <div>02:00 - Shift vị trí / Trạng thái</div>
      </div>
    ),
  },
  {
    num: "03",
    title: "SOCIAL NAVIGATION SCRIPT™",
    tag: "Biết nói gì khi người khác mời thuốc",
    desc: "Không cần cai thuốc bằng cách trốn khỏi xã hội hay né tránh anh em. Chuẩn bị sẵn kịch bản trả lời tự nhiên, lịch thiệp khi được mời lần một, lần hai và exit strategy khi cần.",
    badge: "SOCIAL SCRIPT SET",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "#D96732", fontWeight: 700, marginBottom: "4px" }}>[ TABLE RESPONSE ]</div>
        <div>“Thôi ông, tui bỏ món này rồi.”</div>
        <div>▸ Trả lời tự nhiên, lịch thiệp</div>
        <div>▸ Giữ nguyên vị thế bản lĩnh</div>
      </div>
    ),
  },
  {
    num: "04",
    title: "RECOVERY MAP™",
    tag: "Biết phải làm gì nếu lỡ hút lại một điếu",
    desc: "Đập tan cái bẫy 'MỘT ĐIẾU THÔI' và 'ĐẰNG NÀO CŨNG HÚT RỒI'. Nếu lỡ trượt, đừng để sự tự trách biến 1 điếu thành lý do quay lại cả bao. Mở Recovery Map để khôi phục ngay.",
    badge: "RECOVERY PROTOCOL",
    mockup: (
      <div style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "6px", padding: "12px", marginTop: "14px", fontFamily: "monospace", fontSize: "11px", color: "#A9B2AC" }}>
        <div style={{ color: "#D96732", fontWeight: 700, marginBottom: "4px" }}>[ 60-MIN RECOVERY ]</div>
        <div>▸ Dừng tự trách bản thân</div>
        <div>▸ Rà lại điểm hở Trigger</div>
        <div>▸ Quay lại kế hoạch ngay</div>
      </div>
    ),
  },
];

const sevenDays = [
  {
    day: "NGÀY 1",
    title: "Tìm Ra “Những Điếu Thuốc Nguy Hiểm Nhất” Của Ông",
    desc: "Không sửa gì cả. Nhìn dữ liệu: Hút lúc nào? Ở đâu? Với ai? Điều gì xảy ra trước đó? Sau đó cảm thấy thế nào? Phân loại điếu do nicotine, stress, hay phản xạ quen tay.",
    output: "Current Smoking Loop Map™",
  },
  {
    day: "NGÀY 2",
    title: "Tách Nicotine Khỏi Trigger Bối Cảnh",
    desc: "Quan sát và phân biệt: 'Tui đang thật sự khó chịu do nicotine' hay 'Chỉ vì đang ngồi quán cà phê cũ nên tự nhiên nhớ thuốc?'. Xử lý có chủ đích hơn.",
    output: "Two-Loop Diagnostic™",
  },
  {
    day: "NGÀY 3",
    title: "Vẽ Trigger Map™ Cá Nhân",
    desc: "Khoanh vùng những bối cảnh kéo ông quay lại nhiều nhất: Cà phê, Sau ăn, Stress, Lái xe, Bàn nhậu, Khoảng nghỉ. Chọn các điểm gãy lớn nhất để xử lý trước.",
    output: "Personal Trigger Map™",
  },
  {
    day: "NGÀY 4",
    title: "Thiết Kế Phản Ứng Mới (Daily Protocol)",
    desc: "Thay vì 'Trigger → Thuốc', chèn phương án mới: 'Trigger → Protocol → Quyết định'. Tạo thêm một lựa chọn thông minh trước khi tay cầm bật lửa.",
    output: "Daily Trigger Protocol™",
  },
  {
    day: "NGÀY 5",
    title: "Xây Protocol Cho Stress & Bàn Nhậu",
    desc: "Stress break kiểu gì? Bế tắc đổi trạng thái ra sao? Được mời thuốc trả lời câu gì? Người ta mời lần hai xử lý thế nào? Tách khỏi tình huống thế nào?",
    output: "Stress + Social Navigation Card™",
  },
  {
    day: "NGÀY 6",
    title: "Từ “Người Đang Cố Bỏ” → “Người Không Cần Thuốc”",
    desc: "Tạo dựng Identity mới bằng bằng chứng thực tế: 1 ly cà phê đi qua, 1 lần từ chối bàn nhậu, 1 lần stress dùng Protocol. Tích lũy bằng chứng 'Tui là người có thể làm chủ hành vi'.",
    output: "Identity Micro-Proof Tracker™",
  },
  {
    day: "NGÀY 7",
    title: "Chuẩn Bị Cho Cả Những Ngày Không Hoàn Hảo",
    desc: "Chuẩn bị sẵn cho deadline, bia rượu, tranh cãi, mất ngủ, 1 ngày tệ. Xây kế hoạch ứng phó khi Trigger cũ quay lại hoặc tuần sau stress gấp đôi.",
    output: "Recovery Map + 21-Day Continuation Plan™",
  },
];

const offerStack = [
  { name: "CHƯƠNG TRÌNH BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ (Lộ trình 7 ngày triển khai từng bước)", val: "590.000đ" },
  { name: "WORKBOOK BẢN ĐỒ TÁC CHIẾN™ (Nơi trực tiếp tự xây 4 Bản đồ tác chiến)", val: "290.000đ" },
  { name: "QUICK RESPONSE CARDS™ (Thẻ ứng phó khẩn cấp lưu trên điện thoại)", val: "190.000đ" },
  { name: "SOCIAL NAVIGATION SCRIPT™ (Bộ câu từ chối xã giao tự nhiên & phong thái)", val: "190.000đ" },
  { name: "RECOVERY MAP™ (Kế hoạch khôi phục khẩn cấp để 1 điếu không thành cả bao)", val: "290.000đ" },
];

const bonusStack = [
  {
    title: "BONUS #1 — THE MORNING COFFEE RESET™",
    val: "190.000đ",
    desc: "Hướng dẫn riêng cho Trigger quen thuộc nhất: Cà phê sáng. Thiết kế lại ritual buổi sáng để uống cà phê mà không cần thuốc.",
  },
  {
    title: "BONUS #2 — THE STRESS BREAK MENU™",
    val: "190.000đ",
    desc: "Danh sách các cách tạo khoảng nghỉ ngắn 5 phút khi căng thẳng mà không mặc định 'Break = Thuốc'.",
  },
  {
    title: "BONUS #3 — THE 21-DAY CONTINUATION TRACKER™",
    val: "190.000đ",
    desc: "Bảng theo dõi 21 ngày tiếp theo khi ứng dụng Bản Đồ vào đời sống thật: ghi nhận chiến thắng nhỏ và tinh chỉnh Protocol.",
  },
];

const faqs = [
  {
    q: "1. Tôi phải dừng hút hoàn toàn ngay từ Ngày 1 không?",
    a: "Không. Ngày đầu tiên là ngày rà lại dữ liệu thói quen hiện tại (Current Smoking Loop Map™). Chương trình có hướng dẫn rõ ràng từng bước quan sát, chuẩn bị và triển khai để ông bước vào lộ trình một cách tự tin nhất.",
  },
  {
    q: "2. 7 ngày có nghĩa tôi chắc chắn bỏ hoàn toàn thuốc lá không?",
    a: "Không. 7 ngày là giai đoạn ông xây và bắt đầu triển khai hệ thống cá nhân gồm Trigger Map, Protocol, Social Script, Recovery Plan và Identity Micro-Proof. Kết quả thực tế phụ thuộc vào lịch sử sử dụng nicotine, mức độ phụ thuộc, sức khỏe, hoàn cảnh và mức độ triển khai.",
  },
  {
    q: "3. Tôi hút hơn 10 năm thì sao?",
    a: "Chương trình vẫn có thể giúp ông làm rõ phần hành vi và Trigger bối cảnh. Nếu ông có mức phụ thuộc nicotine cao, từng gặp triệu chứng cai nghiêm trọng hoặc có tình trạng sức khỏe liên quan, nên trao đổi thêm với bác sĩ hoặc chuyên gia y tế về phương án hỗ trợ phù hợp.",
  },
  {
    q: "4. Tôi hút 20–30 điếu/ngày thì sao?",
    a: "Bản Đồ tập trung vào Hành vi, Môi trường, Trigger và Kế hoạch ứng phó. Nếu mức sử dụng nicotine của ông quá cao, chương trình không nên được xem là phương án thay thế cho việc đánh giá hoặc hỗ trợ y tế chuyên môn.",
  },
  {
    q: "5. Tôi đang sử dụng kẹo, miếng dán hoặc thuốc hỗ trợ thì sao?",
    a: "Không tự ý dừng hoặc thay đổi các phương án điều trị/hỗ trợ đang được chuyên gia y tế hướng dẫn chỉ vì tham gia chương trình. Bản Đồ tập trung vào phần hành vi và Trigger bối cảnh.",
  },
  {
    q: "6. Tôi phải bỏ cà phê không?",
    a: "Không phải mục tiêu mặc định. Mục tiêu là giúp ông nhìn thấy cách cà phê đang gắn với phản xạ hút thuốc... sau đó chuẩn bị một phản ứng khác để thưởng thức cà phê mà không cần thuốc.",
  },
  {
    q: "7. Tôi vẫn phải đi nhậu thì sao?",
    a: "Đây chính là lý do có Social Navigation Script™. Chương trình không giả định ông có thể biến mất khỏi mọi tình huống xã hội. Tuy nhiên, rượu bia có thể khiến việc giữ kế hoạch khó hơn, nên việc điều chỉnh mức sử dụng vẫn rất hữu ích.",
  },
  {
    q: "8. Nếu tôi nghĩ “chỉ một điếu thôi” thì sao?",
    a: "Đây là một trong những tình huống chương trình muốn ông chuẩn bị trước. Thay vì chờ tới đúng lúc đó mới quyết định... ông xây trước một response: Khi suy nghĩ này xuất hiện → tôi sẽ làm gì?",
  },
  {
    q: "9. Tôi lỡ hút lại một điếu thì sao?",
    a: "Không sử dụng nó làm lý do để vứt bỏ toàn bộ kế hoạch. Ông mở Recovery Map, nhìn lại Trigger là gì, điểm nào bị hở, điều chỉnh Protocol và quay lại kế hoạch càng sớm càng tốt.",
  },
  {
    q: "10. Mỗi ngày mất bao lâu?",
    a: "Nội dung chính được thiết kế khoảng 5–10 phút/ngày cộng thêm thời gian ngắn thực hiện bài tập Workbook. Đây là chương trình triển khai thực tế, không phải khóa học ngồi xem video dông dài.",
  },
  {
    q: "11. Đây có phải chương trình điều trị y tế không?",
    a: "Không. Đây là chương trình giáo dục và hỗ trợ thay đổi hành vi. Nó không chẩn đoán, điều trị hoặc thay thế bác sĩ, thuốc kê đơn, NRT hay tư vấn cai thuốc lá chuyên môn.",
  },
  {
    q: "12. Tại sao không xem YouTube hoặc đọc sách miễn phí?",
    a: "Ông hoàn toàn có thể. Thông tin cai thuốc không thiếu, thứ thường thiếu là Một hệ thống triển khai cá nhân. Nếu ông muốn một Bản Đồ đã đóng gói sẵn để bắt đầu... đó là lý do chương trình tồn tại.",
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
        BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ — TỪ MỘT LỜI HỨA MƠ HỒ THÀNH KẾ HOẠCH CÓ THỂ THỰC HIỆN
      </div>

      {/* HERO SECTION — CHARCOAL BLACK (#171A18) */}
      <header className="hero blueprint" style={{ background: "#171A18", color: "#F5F2E9", padding: "80px 0 70px" }}>
        <div className="wrap hero-split-grid">
          {/* Left Column: Copy & Scan Grid */}
          <div>
            <div style={{ color: "#D96732", fontSize: "12px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "14px" }}>
              BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </div>
            <h1 style={{ fontSize: "clamp(30px, 4.2vw, 50px)", color: "#F5F2E9", lineHeight: 1.15, fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
              Đừng bắt đầu bằng một lời hứa bỏ thuốc nữa.
            </h1>
            <p style={{ fontSize: "clamp(24px, 3.2vw, 38px)", color: "#D96732", fontWeight: 800, margin: "0 0 22px", lineHeight: 1.25 }}>
              Lần này, hãy có một Bản Đồ.
            </p>
            <p style={{ fontSize: "16px", color: "#A9B2AC", lineHeight: 1.7, marginBottom: "22px" }}>
              Trong 7 ngày, tự xây <strong>Bản Đồ Tác Chiến Cá Nhân</strong> cho những Trigger khiến mình cứ bỏ rồi lại hút.
            </p>

            {/* 4 Micro-Rows Scan Grid */}
            <div style={{ display: "grid", gap: "10px", marginBottom: "28px" }}>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>☕</span> <span><strong>07:00 Cà phê sáng</strong> → Tay tự động tìm thuốc</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>💼</span> <span><strong>11:45 Deadline</strong> → “Làm một điếu rồi vào làm tiếp”</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🍻</span> <span><strong>20:00 Bàn nhậu</strong> → “Làm điếu không?”</span>
              </div>
              <div style={{ background: "#252B25", border: "1px solid #384238", padding: "10px 14px", borderRadius: "6px", fontSize: "14px", color: "#F5F2E9", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🔄</span> <span><strong>Lỡ trượt 1 điếu</strong> → Không để sự tự trách biến thành cả bao</span>
              </div>
            </div>

            {/* CTA & Micro-Trust Price */}
            <div className="hero-cta" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
              <a href="#offer" className="button" style={{ background: "#D96732", color: "white", fontWeight: 800, padding: "18px 36px", borderRadius: "6px", fontSize: "16px", textDecoration: "none", boxShadow: "0 10px 30px rgba(217,103,50,0.35)" }}>
                [ TẠO BẢN ĐỒ CỦA TÔI → ]
              </a>
              <span style={{ color: "#74766F", fontSize: "13px", letterSpacing: "0.04em", fontWeight: 500 }}>
                Pilot Cohort · 497.000đ
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
                <small style={{ color: "#74766F", fontSize: "12px" }}>Biết chính xác khi nào dễ trượt nhất</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 1 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>02 | PROTOCOL 3 PHÚT™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Biết làm gì ngay khi cơn thèm xuất hiện</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 2 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>03 | SOCIAL NAVIGATION SCRIPT™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Biết nói gì khi người khác mời thuốc</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 3 ]</span>
            </div>

            <div className="product-card-preview" style={{ background: "#171A18", borderColor: "#384238" }}>
              <div>
                <strong style={{ color: "#F5F2E9", fontSize: "14px", display: "block" }}>04 | RECOVERY MAP™</strong>
                <small style={{ color: "#74766F", fontSize: "12px" }}>Biết làm gì nếu lỡ trượt một điếu</small>
              </div>
              <span style={{ color: "#D96732", fontWeight: 700, fontSize: "12px" }}>[ ASSET 4 ]</span>
            </div>

            <div style={{ marginTop: "14px", background: "rgba(217,103,50,0.1)", border: "1px dashed #D96732", padding: "10px 14px", borderRadius: "6px", textAlign: "center" }}>
              <span style={{ color: "#D96732", fontSize: "12px", fontWeight: 700 }}>+ TẶNG KÈM #3 BONUS KHI ĐĂNG KÝ HÔM NAY</span>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1: MỘT NGÀY RẤT BÌNH THƯỜNG (WARM IVORY #F3F0E8) */}
      <section id="story" className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 01 — NHỮNG KHOẢNH KHẮC BÌNH THƯỜNG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 20px", lineHeight: 1.25, color: "#191B19" }}>
            ÔNG KHÔNG CẦN THÊM MỘT BÀI GIẢNG VỀ TÁC HẠI CỦA THUỐC LÁ.
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Ông biết rồi. Phổi. Tim mạch. Hơi thở. Răng. Mùi thuốc ám trên quần áo. Khói thuốc quanh vợ con. Có thể ông đã nghe những thứ đó hàng trăm lần.
            </p>
            <p>
              Vấn đề chưa bao giờ nằm ở chỗ: <strong>“Tôi có biết thuốc lá không tốt hay không?”</strong>. Phần khó nằm ở những khoảnh khắc rất bình thường:
            </p>

            {/* 3 Pattern Interrupt Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", margin: "32px 0" }}>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>07:00</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>☕ Cà phê sáng</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Ly cà phê vừa đặt xuống. Chưa kịp nghĩ gì nhiều, tay đã bắt đầu thấy thiếu thiếu.</p>
              </div>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>11:45</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>💼 Căng thẳng Deadline</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Cuộc họp căng thẳng vừa xong. Đầu óc căng. “Làm một điếu rồi vào làm tiếp.”</p>
              </div>
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "8px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "22px" }}>20:00</span>
                <h4 style={{ margin: "10px 0 6px", fontSize: "18px", color: "#191B19" }}>🍻 Bàn nhậu anh em</h4>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>Anh em chìa bao thuốc: <em>“Làm điếu không?”</em>. Lời tự hứa bắt đầu lung lay.</p>
              </div>
            </div>

            <p style={{ fontSize: "18px", lineHeight: 1.8 }}>
              Và nhiều lúc mọi chuyện còn diễn ra nhanh hơn thế. Ông chưa thật sự ngồi xuống để “quyết định” hút. Tay đã tìm bao thuốc trước. Bật lửa đã nằm trong tay. Đến lúc rít hơi đầu tiên... ông mới chợt nghĩ:
            </p>

            <h3 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", color: "#D96732", margin: "24px 0", textAlign: "center", fontWeight: 800 }}>
              “Ủa... mình vừa bảo sẽ bỏ mà?”
            </h3>
          </div>
        </div>
      </section>

      {/* SECTION 2: IDENTITY WOUND & THE DEPRIVATION TRAP (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 02 — CẢM GIÁC THẬT SỰ BÊN TRONG</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 20px", lineHeight: 1.25, color: "#191B19" }}>
            PHẦN KHÓ CHỊU NHẤT KHÔNG PHẢI LÀ ĐIẾU THUỐC.
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Mà là cảm giác sau đó: <em>“Lại nữa.” “Mình nói bao nhiêu lần rồi?” “Có mỗi chuyện này cũng không làm được?”</em>
            </p>

            {/* Full-Width Identity Wound Quote Block */}
            <div style={{ background: "#171A18", color: "#F5F2E9", padding: "45px 40px", borderRadius: "12px", margin: "45px 0", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
              <p style={{ fontStyle: "italic", fontSize: "clamp(22px, 3vw, 30px)", lineHeight: 1.4, color: "#D96732", margin: "0 0 16px", fontWeight: 700 }}>
                “Sao mình làm chủ được bao nhiêu thứ<br />mà lại không làm chủ nổi chuyện này?”
              </p>
              <span style={{ color: "#74766F", fontSize: "14px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                — Câu hỏi đứng ngoài ban công lúc 11h đêm của người đàn ông tự chủ.
              </span>
            </div>

            <p>
              Mỗi lần quay lại thuốc không chỉ là thêm một lần hút. Một chút niềm tin vào chính mình cũng mất theo. Rồi dần dần một câu chuyện hình thành: <em>“Chắc mình không bỏ được đâu.”</em>
            </p>
            <p style={{ fontWeight: 700, color: "#191B19" }}>
              Một thứ nhỏ như vậy đang có quá nhiều quyền quyết định trong ngày của ông: khi nào nghỉ, khi nào thấy nhẹ đầu, khi nào tập trung, khi nào vui uống cà phê...
            </p>

            {/* THE DEPRIVATION TRAP SUB-SECTION */}
            <div style={{ marginTop: "48px", paddingTop: "36px", borderTop: "1px solid #D5CEBF" }}>
              <h3 style={{ fontSize: "24px", color: "#191B19", marginTop: 0 }}>NHƯNG CÓ KHI THỨ GIỮ ÔNG LẠI KHÔNG CHỈ LÀ CƠN THÈM.</h3>
              <p>
                Có một nỗi sợ khác khó nói thành lời: <em>“Không hút nữa thì lúc stress làm gì?”, “Cà phê sáng còn gì vui?”, “Đi nhậu không hút có lệch pha không?”</em>
              </p>
              <p>
                Một phần trong ông muốn bỏ, nhưng phần khác tin rằng: <strong>Nếu bỏ thuốc, mình sẽ phải mất đi một thứ gì đó</strong> (khoảng nghỉ, ritual sáng, thứ cầm tay, cách bắt chuyện, xả stress).
              </p>
              <p>
                Và khi ông tự nói: <em>“Từ hôm nay tao không được hút nữa”</em>, não không chỉ nghe <em>“Bỏ thuốc”</em>, nó nghe thành: <em>“Từ hôm nay tao phải sống thiếu tất cả những thứ này.”</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE TWO-LOOP PROBLEM™ & THE DEPRIVATION TRAP™ (DARK CHARCOAL #171A18) */}
      <section className="letter-section letter-dark" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 03 — BÀI TOÁN HỆ THỐNG</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#F5F2E9", margin: "16px 0 20px" }}>
            ÔNG KHÔNG CHỈ ĐANG BỎ MỘT ĐIẾU THUỐC. ÔNG ĐANG XỬ LÝ HAI VÒNG LẶP.
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#A9B2AC" }}>
            <p style={{ color: "#F5F2E9" }}>
              Có thể ông chưa thất bại vì thiếu quyết tâm. Ông đang cố dùng một công cụ quá đơn giản để xử lý một hệ thống đã được lặp đi lặp lại hàng nghìn lần:
            </p>

            {/* Visual Centerpiece Diagram */}
            <div className="two-loop-box" style={{ background: "#252B25", borderColor: "#384238", margin: "36px 0" }}>
              <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", marginBottom: "20px" }}>
                HỆ THỐNG HAI VÒNG LẶP — THE TWO-LOOP PROBLEM™
              </div>

              <div className="two-loop-grid">
                <div style={{ background: "#171A18", border: "1px solid #384238", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", marginBottom: "6px" }}>VÒNG LẶP #1</div>
                  <strong style={{ color: "#F5F2E9", fontSize: "17px", display: "block", marginBottom: "6px" }}>CƠN THÈM NICOTINE</strong>
                  <p style={{ color: "#74766F", fontSize: "13px", margin: 0 }}>Bồn chồn, bứt rứt thể chất khi dừng nicotine. Cần được nhìn nhận nghiêm túc.</p>
                </div>

                <div style={{ background: "#171A18", border: "2px solid #D96732", padding: "20px", borderRadius: "8px" }}>
                  <div style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", marginBottom: "6px" }}>VÒNG LẶP #2 (CỐT LÕI)</div>
                  <strong style={{ color: "#F5F2E9", fontSize: "17px", display: "block", marginBottom: "6px" }}>TRIGGER BỐI CẢNH</strong>
                  <p style={{ color: "#A9B2AC", fontSize: "13px", margin: 0 }}>Cà phê, Sau ăn, Stress, Lái xe, Giờ nghỉ, Bàn nhậu (X xảy ra → Hút).</p>
                </div>
              </div>

              <div style={{ textAlign: "center", margin: "20px 0 10px", color: "#D96732", fontWeight: 800, fontSize: "15px" }}>
                ↓ THE DEPRIVATION TRAP™: BẪY “TUI ĐANG PHẢI NHỊN VÀ THIẾU THÓN”
              </div>

              <div style={{ background: "rgba(217,103,50,0.15)", border: "1px solid #D96732", padding: "16px", borderRadius: "6px", color: "#F5F2E9", fontSize: "14px", marginTop: "16px" }}>
                <strong>CHUYỂN ĐỔI MỤC TIÊU CỐT LÕI:</strong><br />
                Không phải: <em>“Tui không được hút (đang nhịn hy sinh)”</em><br />
                Mà là: <strong>“TUI KHÔNG CÒN CẦN THUỐC ĐỂ LÀM VIỆC NÀY NỮA.”</strong> (Vẫn cà phê, vẫn nghỉ giữa giờ, vẫn đi nhậu mà không cần thuốc).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: 4 BẢN ĐỒ TÁC CHIẾN (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ background: "#F3F0E8", padding: "90px 0", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "880px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 04 — THÀNH PHẨM TÁC CHIẾN</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#191B19", margin: "16px 0 12px" }}>
            SAU 7 NGÀY, ĐÂY LÀ 4 THỨ ÔNG SẼ CÓ TRONG TAY.
          </h2>
          <p style={{ color: "#74766F", fontSize: "16px", marginBottom: "40px" }}>
            Một hệ thống ứng phó cá nhân được đóng gói ngăn nắp dành riêng cho ông.
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

      {/* SECTION 5: LỘ TRÌNH 7 NGÀY (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 05 — HÀNH TRÌNH 7 NGÀY</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 36px", color: "#191B19" }}>
            7 NGÀY ĐÓ DIỄN RA NHƯ THẾ NÀO?
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
                  Thành phẩm: {d.output}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: FOUNDER STORY — ĐẠT (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 06 — LỜI TÂM SỰ CỦA ĐẠT</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 20px", lineHeight: 1.25, color: "#191B19" }}>
            VÌ SAO TUI LẠI XÂY THỨ NÀY?
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Tui là Đạt. Tui không bắt đầu hành trình này với tư cách bác sĩ hay chuyên gia điều trị nghiện. Tui bắt đầu nó với tư cách: <strong>Một thằng từng để cuộc sống của mình chạy khỏi tay.</strong>
            </p>
            <p>
              Tui lớn lên ở Kon Tum, tuổi thơ gắn với những hàng cao su, đất đỏ. 17 tuổi chạy hơn 300km ra Đà Nẵng, qua đa cấp, học nghề tóc, đại học, kinh doanh, 40 nhân sự, mất team, xây lại... Rồi burnout. Thuốc lá luôn nằm đâu đó trong những giai đoạn stress, làm việc, tiếp khách, lái xe.
            </p>
            <p>
              Cho đến khi tui bắt đầu áp dụng <strong>Identity Shift</strong>. Thay vì câu nói dằn vặt <em>“Tui đang cố cai thuốc”</em>, tui chuyển sang một góc nhìn mới: <strong>“Tui không biết hút thuốc.”</strong>
            </p>

            <div style={{ background: "#171A18", color: "#F5F2E9", padding: "32px", borderRadius: "10px", margin: "32px 0" }}>
              <h4 style={{ color: "#D96732", marginTop: 0, fontSize: "18px" }}>BẢN ĐỒ TÁC CHIẾN ĐƯỢC ĐÓNG GÓI TỪ TRẢI NGHIỆM THỰC THẾ:</h4>
              <p style={{ color: "#A9B2AC", fontSize: "15px", margin: 0, lineHeight: 1.7 }}>
                Tui đã dành rất nhiều năm cố thay đổi KẾT QUẢ nhưng không thay đổi HỆ THỐNG TẠO RA KẾT QUẢ. Bản Đồ 7 Ngày được tạo ra để ông không bước vào cuộc chiến chỉ với ý chí suông.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PROOF SECTIONS (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 07 — BẰNG CHỨNG THỰC TẾ</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", margin: "16px 0 24px", color: "#191B19" }}>
            NHỮNG GÌ TUI ĐANG NÓI KHÔNG CHỈ NẰM TRÊN LÝ THUYẾT.
          </h2>

          <div style={{ display: "grid", gap: "24px" }}>
            <div style={{ background: "#E5DFD2", padding: "28px", borderRadius: "8px", borderLeft: "4px solid #66735B" }}>
              <h4 style={{ color: "#66735B", margin: "0 0 8px", fontSize: "18px" }}>PROOF #1 — HÀNH TRÌNH CỦA CHÍNH TUI</h4>
              <p style={{ color: "#191B19", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Từ một người hút lâu năm khi stress, ngủ muộn, thể trạng 55kg → Chuyển đổi hệ thống habit tracker, giấc ngủ ổn định, vận động và duy trì lối sống không thuốc lá.
              </p>
            </div>

            <div style={{ background: "#E5DFD2", padding: "28px", borderRadius: "8px", borderLeft: "4px solid #66735B" }}>
              <h4 style={{ color: "#66735B", margin: "0 0 8px", fontSize: "18px" }}>PROOF #2 — IDENTITY SHIFT & THAY ĐỔI HÀNH VI</h4>
              <p style={{ color: "#191B19", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Ứng dụng nguyên lý Identity Shifting & Micro-Proof giúp học viên vượt qua các vòng lặp trì hoãn, xây dựng bằng chứng mới về sự tự chủ.
              </p>
            </div>

            <div style={{ background: "#E5DFD2", padding: "28px", borderRadius: "8px", borderLeft: "4px solid #66735B" }}>
              <h4 style={{ color: "#66735B", margin: "0 0 8px", fontSize: "18px" }}>PROOF #3 — KẾT QUẢ TỪ PILOT COHORT</h4>
              <p style={{ color: "#191B19", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Các trường hợp thực tế ứng dụng Bản Đồ cho Cà phê sáng, Căng thẳng Deadline, Bàn nhậu và xử lý cái bẫy “Một điếu thôi”.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: CINEMATIC FUTURE PACING (DARK CHARCOAL #171A18) */}
      <section className="letter-section letter-dark" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 08 — TƯƠNG LAI ĐỜI THỰC</p>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", color: "#F5F2E9", margin: "16px 0 12px" }}>
            HÃY THỬ HÌNH DUNG... CÙNG MỘT CUỘC SỐNG. NHƯNG MỘT PHẢN ỨNG KHÁC.
          </h2>

          <div style={{ display: "grid", gap: "14px", marginTop: "28px" }}>
            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>07:00 — QUÁN CÀ PHÊ SÁNG</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Vẫn ly cà phê đó. Cảm giác muốn hút có thể xuất hiện, nhưng ông nhận ra: <em>“Đây là Trigger của mình”</em>. Mở Protocol, thực hiện và tiếp tục buổi sáng.
              </p>
            </div>

            <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "18px" }}>↓</div>

            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>15:30 — DEADLINE CĂNG THẲNG</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                Ông nhận ra thứ mình cần là một khoảng nghỉ chứ không nhất thiết là điếu thuốc. Áp dụng Stress Break Menu và quay lại bàn làm việc.
              </p>
            </div>

            <div style={{ textAlign: "center", color: "#D96732", fontWeight: 800, fontSize: "18px" }}>↓</div>

            <div style={{ background: "#252B25", padding: "24px 28px", borderRadius: "8px", borderLeft: "4px solid #D96732" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", marginBottom: "4px" }}>20:15 — BÀN NHẬU ANH EM</div>
              <p style={{ color: "#F5F2E9", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                <em>“Làm điếu không?”</em> — Đáp lời tự nhiên theo Social Script. Cuộc trò chuyện tiếp tục. Ông có thêm 1 bằng chứng làm chủ hành vi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: OFFER & VALUE STACK (DARK CHARCOAL #171A18 & BURNT ORANGE #D96732 CTA) */}
      <section id="offer" className="letter-offer" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 09 — PILOT COHORT OFFER</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", color: "#F5F2E9", margin: "16px 0 24px", textTransform: "uppercase" }}>
            ÔNG KHÔNG MUA 7 VIDEO. ÔNG NHẬN MỘT HỆ THỐNG TRIỂN KHAI.
          </h2>

          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "12px", margin: "30px 0" }}>
            <h3 style={{ color: "#F5F2E9", marginTop: 0, fontSize: "20px", borderBottom: "1px solid #384238", paddingBottom: "14px", marginBottom: "18px" }}>
              DANH MỤC HỆ THỐNG BÀN GIAO:
            </h3>
            <div style={{ display: "grid", gap: "12px" }}>
              {offerStack.map((item) => (
                <div key={item.name} style={{ display: "flex", justifyContent: "space-between", color: "#F5F2E9", fontSize: "15px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
                  <span>✓ {item.name}</span>
                  <span style={{ color: "#74766F" }}>{item.val}</span>
                </div>
              ))}
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
              MỨC PHÍ PILOT COHORT ĐẦU TIÊN
            </span>
            <div style={{ margin: "18px 0 14px" }}>
              <b style={{ fontSize: "68px", color: "#D96732", lineHeight: 1, display: "block", margin: "8px 0" }}>497.000Đ</b>
              <span style={{ color: "#74766F", fontSize: "14px" }}>Thanh toán một lần duy nhất • Không phát sinh chi phí</span>
            </div>

            <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ maxWidth: "560px", width: "100%", margin: "20px auto 0", fontSize: "17px", padding: "20px 32px", background: "#D96732", color: "white", textDecoration: "none", boxShadow: "0 12px 35px rgba(217,103,50,0.4)" }}>
              [ TẠO BẢN ĐỒ CỦA TÔI → ]
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
              Hoàn thành đủ 7 ngày bài tập Workbook nhưng chưa xây xong được Bản Đồ Tác Chiến cá nhân? → Ông nhận thêm 14 ngày hỗ trợ review hoàn thiện bổ sung không mất thêm phí.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: TWO CHOICES (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 10 — VÀ BÂY GIỜ ÔNG CÓ HAI LỰA CHỌN</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 32px", textAlign: "center", color: "#191B19" }}>
            VÀ BÂY GIỜ ÔNG CÓ HAI LỰA CHỌN.
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* LEFT — GIỮ NGUYÊN CÁCH CŨ */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "30px", borderRadius: "10px" }}>
              <h3 style={{ color: "#A94725", marginTop: 0, fontSize: "19px", borderBottom: "1px solid #D5CEBF", paddingBottom: "10px" }}>LỰA CHỌN #1 — GIỮ NGUYÊN CÁCH CŨ</h3>
              <p style={{ fontSize: "14px", color: "#74766F", lineHeight: 1.7 }}>
                Đóng trang này. Ngày mai vẫn đi làm, cà phê, stress, bàn nhậu. Rồi một buổi tối lại nhìn điếu thuốc trên tay và tự dằn vặt... Bắt đầu lại bằng gồng nhịn và hy vọng lần này khác.
              </p>
            </div>

            {/* RIGHT — THỬ MỘT CÁCH KHÁC */}
            <div style={{ background: "#E5DFD2", border: "2px solid #D96732", padding: "30px", borderRadius: "10px" }}>
              <h3 style={{ color: "#D96732", marginTop: 0, fontSize: "19px", borderBottom: "1px solid #D5CEBF", paddingBottom: "10px" }}>LỰA CHỌN #2 — THỬ MỘT CÁCH KHÁC</h3>
              <p style={{ fontSize: "14px", color: "#191B19", lineHeight: 1.7 }}>
                Dành 7 ngày trả lời: Trigger của tui là gì? Đang sợ mất điều gì? Khi Trigger xảy ra làm gì? Khi lỡ trượt xử lý thế nào? Bước vào tình huống với Bản Đồ, Protocol và Script rõ ràng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8" }}>
        <div className="letter-wrap" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <p className="letter-number" style={{ color: "#D96732", fontWeight: 700, letterSpacing: "0.15em" }}>CHƯƠNG 11 — GIẢI ĐÁP THẮC MẮC</p>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", margin: "16px 0 32px", color: "#191B19" }}>
            CÂU HỎI THƯỜNG GẶP
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
            BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
          </p>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 52px)", color: "#F5F2E9", margin: "20px 0 24px", lineHeight: 1.25 }}>
            Không cần thêm một lời thề.<br />Lần này, hãy có một Bản Đồ.
          </h2>
          <p style={{ fontSize: "18px", color: "#A9B2AC", marginBottom: "36px" }}>
            Lần tới khi cà phê, stress hay bàn nhậu xuất hiện... ông muốn tiếp tục hy vọng mình đủ mạnh hay muốn biết chính xác mình sẽ làm gì?
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
