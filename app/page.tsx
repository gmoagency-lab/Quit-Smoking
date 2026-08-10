"use client";

import { useEffect, useState } from "react";

const sevenDaysRoadmap = [
  {
    day: "NGÀY 1",
    title: "BẢN ĐỒ VÒNG LẶP HÚT THUỐC™",
    desc: "Ông chưa cần sửa gì cả. Chỉ quan sát: khi nào hút, ở đâu, với ai, điều gì xảy ra trước đó, cảm xúc lúc đó là gì và điếu nào gần như hoàn toàn tự động.",
    output: "Bản Đồ Vòng Lặp Hút Thuốc Hiện Tại™ + Bảng Quan Sát 24 Giờ™",
  },
  {
    day: "NGÀY 2",
    title: "CHẨN ĐOÁN HAI VÒNG LẶP™",
    desc: "Ông bắt đầu quan sát sự khác nhau giữa trải nghiệm có thể liên quan đến nicotine và những bối cảnh đã gắn với hành vi hút. Mục tiêu để không gom mọi cảm giác thành một chữ: 'Thèm'.",
    output: "Bản Chẩn Đoán Hai Vòng Lặp™",
  },
  {
    day: "NGÀY 3",
    title: "BẢN ĐỒ TÁC NHÂN CÁ NHÂN™",
    desc: "Ông xác định những tác nhân lớn nhất: Cà phê, Sau ăn, Stress, Lái xe, Giờ nghỉ, Nhậu, Bạn bè, Đối tác. Tìm điểm gãy quan trọng nhất để xử lý trước.",
    output: "Bản Đồ Tác Nhân Cá Nhân™ + Bản Đồ Tình Huống Nguy Cơ Cao™",
  },
  {
    day: "NGÀY 4",
    title: "KỊCH BẢN XỬ LÝ TÁC NHÂN HẰNG NGÀY™",
    desc: "Thay vì chỉ tự nhắc 'Đừng hút', ông bắt đầu thiết kế phản ứng cụ thể cho từng tác nhân (Khi X xảy ra → Tôi sẽ làm Y) để chèn một khoảng lựa chọn giữa tác nhân và phản xạ cũ.",
    output: "Kịch Bản Xử Lý Tác Nhân™ + Thẻ Xử Lý Nhanh™",
  },
  {
    day: "NGÀY 5",
    title: "XỬ LÝ STRESS & TÌNH HUỐNG XÃ GIAO™",
    desc: "Hai bối cảnh dễ gãy nhất là stress và xã giao. Chuẩn bị trước: Khi công việc căng thì nghỉ thế nào? Khi được mời thuốc thì nói gì? Khi người ta mời lần hai thì sao?",
    output: "Danh Sách Nghỉ Xả Stress™ + Kịch Bản Xử Lý Tình Huống Xã Giao™",
  },
  {
    day: "NGÀY 6",
    title: "BẰNG CHỨNG ĐỊNH DANH™",
    desc: "Ông bắt đầu ghi lại những bằng chứng nhỏ: Một tác nhân đã đi qua, một phản ứng mới, một lần từ chối, một lần stress nhưng xử lý khác đi. Tích lũy bằng chứng thực tế.",
    output: "Bảng Theo Dõi Bằng Chứng Định Danh™",
  },
  {
    day: "NGÀY 7",
    title: "BẢN ĐỒ QUAY LẠI + KẾ HOẠCH 21 NGÀY™",
    desc: "Chuẩn bị cho cả những ngày không hoàn hảo (deadline, nhậu, mất ngủ, ngày tệ, lỡ trượt). Nhìn rõ điểm hở nằm ở đâu và quay lại kế hoạch như thế nào.",
    output: "Bản Đồ Quay Lại™ + Kế Hoạch Tiếp Tục 21 Ngày™",
  },
];

const tenDeliverables = [
  "Bản Đồ Vòng Lặp Hút Thuốc™",
  "Bản Chẩn Đoán Hai Vòng Lặp™",
  "Bản Đồ Tác Nhân Cá Nhân™",
  "Kịch Bản Xử Lý Tác Nhân™",
  "Thẻ Xử Lý Nhanh™",
  "Danh Sách Nghỉ Xả Stress™",
  "Kịch Bản Xử Lý Tình Huống Xã Giao™",
  "Bảng Theo Dõi Bằng Chứng Định Danh™",
  "Bản Đồ Quay Lại™",
  "Kế Hoạch Tiếp Tục 21 Ngày™",
];

const bonusTools = [
  {
    num: "01",
    title: "NGHI THỨC CÀ PHÊ SÁNG MỚI™",
    desc: "Dành riêng cho tác nhân cà phê sáng, để bắt đầu tách cà phê khỏi phản xạ mặc định là thuốc.",
  },
  {
    num: "02",
    title: "DANH SÁCH NGHỈ XẢ STRESS™",
    desc: "Các cách tạo khoảng nghỉ, đổi trạng thái và giải tỏa mà không mặc định: Nghỉ = hút thuốc.",
  },
  {
    num: "03",
    title: "BẢNG THEO DÕI 21 NGÀY™",
    desc: "Theo dõi tác nhân, phản ứng, điểm khó, bằng chứng mới và những cách xử lý cần điều chỉnh sau chương trình.",
  },
];

const coachingFeedbacks = [
  {
    name: "Lê Tuấn",
    role: "Group Coaching T8",
    img: "/images/feedback_le_tuan.png",
    quote: "“Em cảm thấy một sự rõ ràng trên hành trình, những niềm tin cũ và hoài nghi cũng bị đập tan.”",
  },
  {
    name: "Chị Trúc",
    role: "Group Coaching T4",
    img: "/images/feedback_truc.png",
    quote: "“Sau buổi nói chuyện với em chị cảm thấy nhẹ lòng hơn, bớt hoang mang và có thêm sự tự tin để tiếp tục.”",
  },
  {
    name: "Chị Bích Thuận",
    role: "Group Coaching T6",
    img: "/images/feedback_bich_thuan.png",
    quote: "“Chỉ vài cụm từ khóa nhưng đã tóm tắt lại hành trình tôi phải đi để đạt được sự chuyển hóa và kết quả.”",
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
    <div className="letter-page" style={{ background: "#F3F0E8", color: "#191B19", fontFamily: "var(--font-body), sans-serif", lineHeight: 1.85 }}>
      {/* Top Banner */}
      <div className="letter-announcement" style={{ background: "#252B25", color: "#F5F2E9", padding: "10px 16px", textAlign: "center", fontSize: "13px", fontWeight: 600 }}>
        Dành cho bất kỳ ai thực sự muốn khép lại hành trình với thuốc lá
      </div>

      {/* HERO SECTION — THE YOUNG LOVE STYLE (CHARCOAL BLACK #171A18) */}
      <header className="hero blueprint" style={{ background: "#171A18", color: "#F5F2E9", padding: "45px 0 65px" }}>
        <div className="wrap" style={{ maxWidth: "840px", margin: "0 auto", textAlign: "center" }}>
          {/* Main Headline */}
          <h1 style={{ fontSize: "clamp(26px, 4.2vw, 48px)", color: "#D96732", lineHeight: 1.25, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            <span style={{ display: "block" }}>CÁCH TRỞ THÀNH NGƯỜI ĐÀN ÔNG</span>
            <span style={{ display: "block" }}>KHÔNG CÒN CẦN ĐẾN THUỐC LÁ</span>
          </h1>

          {/* Subheadline */}
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#D5DFDB", lineHeight: 1.65, maxWidth: "720px", margin: "0 auto 36px", fontWeight: 400 }}>
            Ngay cả khi bạn đã hút thuốc nhiều năm, từng nhiều lần quyết tâm bỏ nhưng vẫn quay lại, và đã quá mệt với việc cứ phải đấu tranh với cơn thèm rồi tự trách chính mình.
          </p>

          {/* Image Comparison Box (Đạt thời hút thuốc → Đạt hiện tại) */}
          <div style={{ maxWidth: "580px", margin: "0 auto 40px", position: "relative" }}>
            {/* Top Connector Arrow */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ background: "#252B25", color: "#D96732", border: "1px solid #384238", fontSize: "13px", fontWeight: 700, padding: "5px 16px", borderRadius: "20px", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}>
                <span>Thời hút thuốc</span>
                <span style={{ fontSize: "15px", fontWeight: 900 }}>➔</span>
                <span style={{ color: "#F5F2E9" }}>Hiện tại</span>
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", alignItems: "stretch" }}>
              {/* Photo 1: Đạt thời hút thuốc (BW) */}
              <div style={{ overflow: "hidden", borderRadius: "12px", border: "1px solid #384238", background: "#252B25", boxShadow: "0 12px 30px rgba(0,0,0,0.4)" }}>
                <img
                  src="/images/dat_before_bw.jpg"
                  alt="Đạt thời hút thuốc"
                  style={{ width: "100%", height: "370px", objectFit: "cover", objectPosition: "center 65%", display: "block", filter: "grayscale(100%) contrast(110%)" }}
                />
              </div>

              {/* Photo 2: Đạt hiện tại (Gym fit) */}
              <div style={{ overflow: "hidden", borderRadius: "12px", border: "2px solid #D96732", background: "#252B25", boxShadow: "0 12px 30px rgba(217,103,50,0.25)" }}>
                <img
                  src="/images/dat_after_gym.jpg"
                  alt="Đạt hiện tại"
                  style={{ width: "100%", height: "370px", objectFit: "cover", objectPosition: "top center", display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <a href="#offer" className="button" style={{ display: "inline-block", background: "#D96732", color: "white", fontWeight: 800, padding: "20px 48px", borderRadius: "8px", fontSize: "18px", textDecoration: "none", boxShadow: "0 14px 40px rgba(217,103,50,0.45)", letterSpacing: "0.02em" }}>
              BẮT ĐẦU NGÀY 1 NGAY →
            </a>
            <span style={{ color: "#74766F", fontSize: "13px", letterSpacing: "0.04em" }}>
              Truy cập ngay sau đăng ký · 497.000đ · Thanh toán một lần
            </span>
          </div>
        </div>
      </header>

      {/* SECTION: TỪ MỘT THẰNG TỪNG NGHĨ MÌNH SẼ HÚT CẢ ĐỜI... (WARM IVORY #F3F0E8) */}
      <section id="intro" className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 24px", lineHeight: 1.25 }}>
            TỪ MỘT THẰNG TỪNG NGHĨ MÌNH SẼ HÚT CẢ ĐỜI...
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>
              Tui không bắt đầu câu chuyện này với tư cách bác sĩ. Cũng không phải một người chưa từng hút thuốc rồi đứng ngoài nói ông phải sống thế nào.
            </p>
            <p>
              <strong>Tui từng ở phía bên kia gần 8 năm.</strong>
            </p>
            <p>
              Stress là hút. Làm xong việc cũng hút. Cà phê hút. Lái xe hút. Nhậu với anh em thì càng khỏi nói. Có những hôm đang ho vẫn châm thêm một điếu.
            </p>
            <p>
              Rồi có một giai đoạn, tui bắt đầu thay đổi từng thứ một: thuốc lá, giấc ngủ, ăn uống, vận động, cách làm việc và cuối cùng là cách nhìn về chính mình.
            </p>

            {/* 2017 WORK SHIFT STORY PHOTO CARD */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "24px", margin: "36px 0", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
              <div style={{ overflow: "hidden", borderRadius: "10px", border: "1px solid #D5CEBF", marginBottom: "16px", background: "#171A18" }}>
                <img
                  src="/images/dat_2017_work.jpg"
                  alt="Hình ảnh giao ca 26/07/2017"
                  style={{ width: "100%", height: "auto", maxHeight: "480px", objectFit: "cover", display: "block" }}
                />
              </div>
              <p style={{ margin: 0, fontSize: "15px", color: "#191B19", fontStyle: "italic", lineHeight: 1.6, textAlign: "center", fontWeight: 600 }}>
                Hình ảnh giao ca sau phiên làm việc từ 9h đêm ➔ 5h sáng hôm sau và đây cũng là thời điểm những điếu thuốc đầu bắt đầu đến với tui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: NHƯNG TRƯỚC KHI KỂ ÔNG CHUYỆN CAI THUỐC... (3 COACHING FEEDBACKS) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", color: "#191B19", margin: "0 0 20px" }}>
            NHƯNG TRƯỚC KHI KỂ ÔNG CHUYỆN CAI THUỐC...
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>Có một thứ khác tui muốn ông biết.</p>
            <p>
              Trong công việc hiện tại, tui đồng hành cùng những Coach, Trainer và người kinh doanh sản phẩm tri thức đang mắc kẹt với công việc kinh doanh, sự nghi ngờ bản thân, suy nghĩ quá nhiều hoặc biết mình cần làm gì nhưng mãi chưa hành động.
            </p>
            <p>
              Điều làm tui chú ý là sau những buổi coaching, họ hiếm khi nói: <em>“Đạt cho tôi thêm thật nhiều kiến thức.”</em>
            </p>
            <p><strong>Họ thường dùng những từ khác:</strong></p>

            {/* 3 FATHOM 1-1 COACHING SESSIONS PROOF SHOWCASE */}
            <div style={{ margin: "28px 0 36px" }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "14px", textAlign: "center" }}>
                📸 HÌNH ẢNH THỰC TẾ CÁC PHIÊN COACHING 1-1 TRÊN FATHOM
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                {[
                  { img: "/images/coaching_session_1.png", title: "Nhật ký các phiên Google Meet & Zoom Coaching 1-1 trực tiếp cùng Đạt" },
                  { img: "/images/coaching_session_2.png", title: "Lưu trữ hàng trăm giờ đồng hành tháo gỡ điểm nghẽn & xây dựng hệ thống" },
                  { img: "/images/coaching_session_3.png", title: "Hành trình thực tế lắng nghe, chẩn đoán và chuyển hóa định danh cùng học viên" },
                ].map((session, idx) => (
                  <div key={idx} style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "10px", padding: "12px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}>
                    <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid #252B25", marginBottom: "8px" }}>
                      <img
                        src={session.img}
                        alt={session.title}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                    <div style={{ color: "#A9B2AC", fontSize: "12px", fontStyle: "italic", textAlign: "center" }}>
                      {session.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 TESTIMONIAL SCREENSHOT FEEDBACK CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", margin: "36px 0" }}>
              {coachingFeedbacks.map((fb) => (
                <div key={fb.name} style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "16px", borderRadius: "12px", display: "flex", flexDirection: "column", boxShadow: "0 8px 25px rgba(0,0,0,0.03)" }}>
                  {/* SCREENSHOT IMAGE CONTAINER */}
                  <div style={{ overflow: "hidden", borderRadius: "8px", border: "1px solid #D5CEBF", marginBottom: "14px", background: "#fff" }}>
                    <img
                      src={fb.img}
                      alt={`Feedback ${fb.name}`}
                      style={{ width: "100%", height: "auto", maxHeight: "320px", objectFit: "cover", objectPosition: "top", display: "block" }}
                    />
                  </div>

                  <p style={{ fontStyle: "italic", fontSize: "14px", color: "#191B19", margin: "0 0 12px", lineHeight: 1.6, flexGrow: 1 }}>
                    {fb.quote}
                  </p>

                  <div style={{ borderTop: "1px solid #D5CEBF", paddingTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "#D96732", fontSize: "14px" }}>— {fb.name}</strong>
                    <span style={{ fontSize: "11px", color: "#74766F", background: "#F3F0E8", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>{fb.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <p>
              Những feedback này không phải phản hồi về cai thuốc. Nhưng chúng phản ánh một phần công việc tui đã làm trong nhiều cuộc coaching:
            </p>
            <p style={{ fontSize: "20px", fontWeight: 700, color: "#D96732" }}>
              Biến một mớ hỗn độn thành một bản đồ đủ rõ để một người nhìn thấy mình đang ở đâu và bước tiếp.
            </p>
            <p>Và kỳ lạ là... Đó cũng chính là thứ tui từng thiếu với thuốc lá.</p>
          </div>
        </div>
      </section>



      {/* SECTION: DEEP PERSONAL LETTER ("HEY BRO. ĐIẾU THUỐC CUỐI CÙNG CỦA TUI?") */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 20px", lineHeight: 1.3 }}>
            Hey bro. Điếu thuốc cuối cùng của tui?
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19" }}>
            <p>Tui kể ông nghe về một quyết định nhỏ mà phải mất gần 8 năm tui mới làm được.</p>
            <p>
              Đừng lo. Tui không định giảng đạo lý, cũng không định kể cho ông nghe thuốc lá có bao nhiêu chất độc, ung thư thế nào hay phổi ra sao. Mấy cái đó chắc ông nghe đủ rồi. Thiệt ra tui cũng từng biết hết.
            </p>
            <p>
              Biết hút thuốc không tốt. Biết cơ thể mình đang xuống. Biết mình nên bỏ. Biết mỗi ngày mình đang đốt tiền vào nó. Nhưng biết là một chuyện. Thay đổi được hay không lại là chuyện khác.
            </p>

            {/* NẾU ÔNG TỪNG NÓI MAI BỎ */}
            <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid #D5CEBF" }}>
              <h3 style={{ fontSize: "24px", color: "#191B19", marginTop: 0 }}>Nếu ông từng nói “MAI BỎ”...</h3>
              <p style={{ fontStyle: "italic", color: "#D96732", fontWeight: 700 }}>
                “Hết gói này bỏ.” • “Qua đợt stress này rồi bỏ.” • “Nhậu hôm nay thôi.” • “Qua Tết bỏ.” • “Mai bỏ.”
              </p>
              <p>
                Tui đã nói mấy câu đó không biết bao nhiêu lần. Stress là hút. Làm xong việc hút. Cà phê hút. Lái xe hút. Nhậu hút. Có hôm cổ họng đang ho vẫn châm.
              </p>
              <p>
                Và lúc nào cũng tìm được một lý do nghe rất hợp lý: <em>“Stress mà.” “Hút tí cho tỉnh.” “Ra ngoài suy nghĩ vài phút.” “Một điếu thôi.”</em>
              </p>
              <p>
                Và cứ như vậy... gần 8 năm trôi qua. Tui cao 1m77 nhưng cân nặng trong một thời gian dài cứ quanh quẩn 55–56kg. Ngủ 2–3 giờ sáng là chuyện bình thường. Sáng mở mắt người như chưa từng được ngủ. Ăn uống thất thường, thể trạng lúc nào cũng thiếu pin.
              </p>

              <div style={{ background: "#E5DFD2", borderLeft: "4px solid #A94725", padding: "20px 24px", borderRadius: "4px", margin: "28px 0" }}>
                <strong style={{ color: "#191B19", fontSize: "18px", display: "block", marginBottom: "6px" }}>
                  TUI BIẾT MÌNH KHÔNG MUỐN TIẾP TỤC NHƯ VẬY.
                </strong>
                <p style={{ margin: 0, color: "#74766F", fontSize: "15px" }}>
                  Nhưng tui vẫn quay lại. Mỗi lần như thế, niềm tin vào bản thân lại mất đi một chút: <em>“Chắc mình nghiện nặng.” “Chắc ý chí yếu.” “Hay mình sẽ hút cả đời?”</em>
                </p>
              </div>
            </div>

            {/* KHOẢNH KHẮC THAY ĐỔI MỌI THỨ */}
            <div style={{ marginTop: "40px", paddingTop: "32px", borderTop: "1px solid #D5CEBF" }}>
              <h3 style={{ fontSize: "24px", color: "#191B19", marginTop: 0 }}>KHOẢNH KHẮC THAY ĐỔI MỌI THỨ...</h3>
              <p>Nó không xảy ra trong một buổi sáng tui thức dậy và tự nhiên trở thành người mới.</p>
              <p>
                Trước đó cuộc sống tui khá hỗn độn. Công việc kinh doanh có lúc lên đội ngũ hàng chục người, chạy rất nhiều dự án, có giai đoạn làm 16–17 tiếng/ngày. Có chiến thắng, nhưng cũng có những lần mất đội ngũ, kiệt sức, mất phương hướng, tài chính áp lực và gia đình liên tục có biến cố sức khỏe. Càng stress, tui càng hút.
              </p>
              <p>Đến cuối 2025 – đầu 2026, nhiều thứ cùng dồn lại và tui bắt đầu có cảm giác:</p>

              <div style={{ background: "#171A18", color: "#F5F2E9", padding: "28px", borderRadius: "10px", textAlign: "center", margin: "28px 0" }}>
                <p style={{ color: "#D96732", fontWeight: 800, fontSize: "20px", margin: 0, lineHeight: 1.5 }}>
                  MÌNH KHÔNG CÒN ĐIỀU KHIỂN CUỘC SỐNG.<br />CUỘC SỐNG ĐANG KÉO MÌNH ĐI.
                </p>
              </div>

              <p>
                Lần đầu tiên tui dừng lại và quan sát một ngày của mình thật sự diễn ra thế nào: Tui ngủ lúc nào? Ăn lúc nào? Trì hoãn lúc nào? Mệt khi nào? Hút lúc nào? Và chuyện gì thường xảy ra ngay trước mỗi điếu thuốc?
              </p>
              <p>Và đây là lúc một thứ bắt đầu hiện ra.</p>

              {/* DAT'S SPORTS / HEALTH RECOVERY VIDEO SHOWCASE */}
              <div style={{ background: "#171A18", border: "1px solid #384238", borderRadius: "14px", padding: "20px", margin: "32px 0", boxShadow: "0 15px 35px rgba(0,0,0,0.3)" }}>
                <div style={{ overflow: "hidden", borderRadius: "10px", background: "#000", border: "1px solid #252B25", marginBottom: "16px" }}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: "100%", maxHeight: "520px", display: "block" }}
                    src="/videos/dat_sports_video.mp4"
                  >
                    Your browser does not support HTML5 video playback.
                  </video>
                </div>
                <p style={{ margin: 0, fontSize: "14px", color: "#D5DFDB", fontStyle: "italic", lineHeight: 1.6, textAlign: "center" }}>
                  “Tui không đăng để khoe khoang, chỉ là đây là thứ suốt thời gian đó tui không bao giờ có được, vận động mạnh một chút là đã buồn nôn chóng mặt chứ đừng nói sẽ có thể chơi các môn thể thao cường độ cao như hiện tại nó là 1 chiến thắng lớn tui đã lấy lại được từ khi bỏ thuốc kk”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: IDENTITY SHIFT & MICRO-PROOFS (DARK CHARCOAL #171A18) */}
      <section className="letter-section letter-dark" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", color: "#F5F2E9", margin: "0 0 20px" }}>
            TUI TỪNG NGHĨ BÀI TOÁN LÀ: “LÀM SAO ĐỂ KHÔNG HÚT?”
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#A9B2AC" }}>
            <p style={{ color: "#F5F2E9" }}>
              Nhưng nếu biết thuốc lá có hại là đủ, tui đã bỏ từ lâu. Nếu muốn bỏ là đủ, tui đã muốn bỏ hàng trăm lần. Vậy tại sao sáng còn quyết tâm nhưng tới lúc công việc căng, cà phê hoặc bàn nhậu thì mọi thứ lại khác?
            </p>
            <p style={{ color: "#D96732", fontWeight: 700 }}>
              Tui đổi câu hỏi thành: <em>“TẠI SAO TỚI MỘT SỐ THỜI ĐIỂM, TUI LẠI TRỞ THÀNH NGƯỜI CẦN MỘT ĐIẾU THUỐC?”</em>
            </p>

            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "10px", margin: "28px 0" }}>
              <h3 style={{ color: "#F5F2E9", marginTop: 0, fontSize: "20px" }}>
                TUI KHÔNG CHỈ HÚT THUỐC. TUI ĐÃ XÂY MỘT CUỘC SỐNG CÓ ĐIẾU THUỐC NẰM BÊN TRONG.
              </h3>
              <p style={{ color: "#A9B2AC", fontSize: "15px", margin: 0, lineHeight: 1.7 }}>
                Cà phê đi với thuốc. Stress đi với thuốc. Lái xe đi với thuốc. Nghỉ giữa giờ đi với thuốc. Làm xong việc đi với thuốc. Nhậu với anh em đi với thuốc. Sau gần 8 năm, hút thuốc len vào cách tui nhìn chính mình: <em>“Tui là người hút thuốc.”</em>
              </p>
            </div>

            <h3 style={{ color: "#D96732", fontSize: "26px", marginTop: "36px" }}>
              IDENTITY SHIFT — DỊCH CHUYỂN ĐỊNH DANH
            </h3>
            <p style={{ color: "#F5F2E9" }}>
              Thay đổi cách mình nhìn về con người mình đang là — rồi dùng hành động thực tế để tạo bằng chứng cho con người mình muốn trở thành.
            </p>
            <p>
              Có một câu tui từng thử nói với chính mình: <strong>“Tui không biết hút thuốc.”</strong> Nghe hơi khùng ha. Nhưng thứ đáng chú ý là cách nó thay đổi vị trí ra quyết định. Từ một người muốn hút nhưng cố kiềm mình lại → chuyển thành: <em>“Đây không còn là thứ thuộc về cách mình muốn sống.”</em>
            </p>

            <div style={{ background: "rgba(102,115,91,0.25)", border: "1px solid #66735B", padding: "24px", borderRadius: "8px", margin: "28px 0", color: "#D5E2D8" }}>
              <strong style={{ color: "#F5F2E9", fontSize: "18px", display: "block", marginBottom: "6px" }}>
                CON NGƯỜI MỚI CẦN NHỮNG BẰNG CHỨNG MỚI.
              </strong>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.65 }}>
                Một buổi cà phê khác đi • Một lần stress phản ứng khác • Một lời mời được đi qua • Một ngày ngủ đúng hơn • Một buổi tập • Một bữa ăn đủ. Mỗi hành động là một <strong>BẰNG CHỨNG NHỎ</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 3 DỊCH CHUYỂN CỰC KỲ QUAN TRỌNG (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 28px" }}>
            3 DỊCH CHUYỂN CỰC KỲ QUAN TRỌNG
          </h2>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "10px" }}>
              <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px" }}>01</span>
              <h3 style={{ margin: "6px 0 10px", fontSize: "20px", color: "#191B19" }}>1. NHÌN THẤY VÒNG LẶP™</h3>
              <p style={{ color: "#74766F", fontSize: "15px", margin: 0, lineHeight: 1.7 }}>
                Trước khi cố phá nó. Công việc căng → Bức bối → Ra ngoài hút → Cảm thấy nhẹ hơn. Qua thời gian, não không chỉ học <em>“Thuốc = phần thưởng”</em> mà học <em>“Stress = đến lúc hút”</em>. Nếu không nhìn thấy vòng lặp, chiến thuật duy nhất còn lại là: <em>“RÁNG NHỊN”</em>.
              </p>
            </div>

            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "10px" }}>
              <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px" }}>02</span>
              <h3 style={{ margin: "6px 0 10px", fontSize: "20px", color: "#191B19" }}>2. BẺ GÃY LIÊN KẾT™</h3>
              <p style={{ color: "#74766F", fontSize: "15px", margin: 0, lineHeight: 1.7 }}>
                Thay vì: <code>TÁC NHÂN → THUỐC</code>, ta bắt đầu chèn vào giữa một khoảng: <code>TÁC NHÂN → CÁCH XỬ LÝ → QUYẾT ĐỊNH</code> (Đổi vị trí, uống nước, đi bộ ngắn, chuyển hành vi tay/miệng, trì hoãn quyết định, mở Thẻ Xử Lý Nhanh hoặc Social Script).
              </p>
            </div>

            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "10px" }}>
              <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px" }}>03</span>
              <h3 style={{ margin: "6px 0 10px", fontSize: "20px", color: "#191B19" }}>3. XÂY ĐỊNH DANH MỚI™</h3>
              <p style={{ color: "#74766F", fontSize: "15px", margin: 0, lineHeight: 1.7 }}>
                Đừng chỉ nói mình là ai. Hãy tạo bằng chứng. Từng bằng chứng nhỏ bắt đầu thay đổi câu chuyện từ: <em>“Tui là người cứ bỏ rồi hút lại”</em> sang: <em>“Tui đang trở thành người có thể đi qua những khoảnh khắc này mà không cần thuốc.”</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ĐÂY LÀ CÁCH 7 NGÀY HOẠT ĐỘNG (WARM IVORY #F3F0E8) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ color: "#D96732", fontWeight: 700, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "10px" }}>
            LỘ TRÌNH THỰC THẾ
          </div>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 16px" }}>
            ĐÂY LÀ CÁCH 7 NGÀY HOẠT ĐỘNG
          </h2>
          <p style={{ color: "#74766F", fontSize: "16px", marginBottom: "36px" }}>
            Mỗi ngày: 1 video ngắn + 1 hướng dẫn + 1 bài thực hành + 1 thành phẩm.
          </p>

          {/* ROADMAP TIMELINE */}
          <div style={{ display: "grid", gap: "16px" }}>
            {sevenDaysRoadmap.map((item) => (
              <div key={item.day} style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span style={{ background: "#D96732", color: "white", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", fontSize: "12px" }}>{item.day}</span>
                  <h3 style={{ margin: 0, fontSize: "18px", color: "#191B19" }}>{item.title}</h3>
                </div>
                <p style={{ color: "#74766F", fontSize: "14px", margin: "8px 0 10px", lineHeight: 1.65 }}>{item.desc}</p>
                <span style={{ background: "#F3F0E8", color: "#66735B", fontWeight: 700, fontSize: "12px", padding: "4px 10px", borderRadius: "4px", display: "inline-block" }}>
                  Thành phẩm: {item.output}
                </span>
              </div>
            ))}
          </div>

          {/* 10 DELIVERABLES RECAP BOX */}
          <div style={{ background: "#171A18", color: "#F5F2E9", padding: "34px", borderRadius: "12px", marginTop: "42px" }}>
            <h3 style={{ color: "#D96732", marginTop: 0, fontSize: "20px", borderBottom: "1px solid #384238", paddingBottom: "12px", marginBottom: "18px" }}>
              SAU 7 NGÀY, ÔNG CÓ TRONG TAY TOÀN BỘ 10 THÀNH PHẨM:
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
              {tenDeliverables.map((d) => (
                <div key={d} style={{ background: "#252B25", padding: "10px 14px", borderRadius: "6px", fontSize: "13px", color: "#D5DFDB" }}>
                  ✓ {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 3 CÔNG CỤ THỰC HÀNH (BONUS) */}
      <section className="letter-section" style={{ padding: "80px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 38px)", color: "#191B19", margin: "0 0 28px", textAlign: "center" }}>
            ÔNG CŨNG NHẬN THÊM 3 CÔNG CỤ THỰC HÀNH
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            {bonusTools.map((b) => (
              <div key={b.num} style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px", borderRadius: "10px" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "20px", display: "block", marginBottom: "6px" }}>{b.num}</span>
                <h3 style={{ fontSize: "17px", color: "#191B19", margin: "0 0 8px" }}>{b.title}</h3>
                <p style={{ color: "#74766F", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: MAIN OFFER CARD & QUALIFICATION (DARK CHARCOAL #171A18) */}
      <section id="offer" className="letter-offer" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          {/* MAIN OFFER CARD */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", padding: "45px", borderRadius: "14px", textAlign: "center", boxShadow: "0 25px 70px rgba(0,0,0,0.5)", marginBottom: "45px" }}>
            <span style={{ color: "#A9B2AC", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "13px", fontWeight: 700 }}>
              TOÀN BỘ HỆ THỐNG BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", color: "#F5F2E9", margin: "14px 0 8px", fontWeight: 800 }}>
              NHÓM TRẢI NGHIỆM ĐẦU TIÊN — 497.000Đ
            </h2>
            <p style={{ color: "#74766F", fontSize: "14px", marginBottom: "28px" }}>Thanh toán một lần duy nhất • Không phát sinh chi phí</p>

            <a href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ display: "inline-block", maxWidth: "560px", width: "100%", padding: "20px 36px", background: "#D96732", color: "white", fontWeight: 800, fontSize: "18px", textDecoration: "none", borderRadius: "6px", boxShadow: "0 12px 35px rgba(217,103,50,0.4)", marginBottom: "10px" }}>
              BẮT ĐẦU NGÀY 1 NGAY →
            </a>
            <div style={{ color: "#74766F", fontSize: "13px", letterSpacing: "0.04em" }}>
              Truy cập ngay sau đăng ký · 497.000đ · Thanh toán một lần
            </div>
          </div>

          {/* QUALIFICATION: FOR YOU / NOT FOR YOU */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "10px" }}>
              <h3 style={{ color: "#66735B", marginTop: 0, fontSize: "18px", borderBottom: "1px solid #384238", paddingBottom: "10px" }}>
                CHƯƠNG TRÌNH NÀY DÀNH CHO ÔNG NẾU...
              </h3>
              <p style={{ color: "#A9B2AC", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Ông đã hút nhiều năm, từng muốn bỏ thật, từng thử nhưng quay lại và thường hút khi stress, cà phê, sau ăn, nhậu, lái xe hoặc gặp những tác nhân quen thuộc. Ông muốn hiểu <em>“Tại sao mình cứ quay lại?”</em> và có một hệ thống rõ ràng để xử lý nó.
              </p>
            </div>

            <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px", borderRadius: "10px" }}>
              <h3 style={{ color: "#A94725", marginTop: 0, fontSize: "18px", borderBottom: "1px solid #384238", paddingBottom: "10px" }}>
                NÓ KHÔNG DÀNH CHO ÔNG NẾU...
              </h3>
              <p style={{ color: "#A9B2AC", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Ông chỉ đang tìm một mẹo thần kỳ, một lời hứa <em>“7 ngày hết nghiện 100%”</em> hoặc muốn mua về rồi không thực hiện gì. Điều tui có thể đưa ông là: <strong>MỘT BẢN ĐỒ + MỘT QUY TRÌNH + MỘT ĐIỂM BẮT ĐẦU.</strong>
              </p>
            </div>
          </div>

          {/* GUARANTEE BOX */}
          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "28px 32px", borderRadius: "10px", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <span style={{ fontSize: "24px" }}>🛡️</span>
              <h4 style={{ color: "#D96732", fontSize: "16px", margin: 0, textTransform: "uppercase" }}>
                CAM KẾT ĐỒNG HÀNH HOÀN THIỆN™
              </h4>
            </div>
            <p style={{ color: "#A9B2AC", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
              Một lần nữa, tui không hứa: <em>“Sau 7 ngày ông chắc chắn bỏ thuốc hoàn toàn.”</em> Nhưng nếu ông hoàn thành đủ chương trình, làm các bài tập yêu cầu và vẫn chưa hoàn thiện được Bản Đồ Tác Chiến cá nhân, ông được thêm: <strong>14 NGÀY HỖ TRỢ HOÀN THIỆN</strong> mà không mất thêm phí.
            </p>
          </div>

          {/* OBJECTION: ĐỂ TUI QUA ĐỢT STRESS NÀY RỒI TÍNH... */}
          <div style={{ background: "#252B25", borderLeft: "4px solid #D96732", padding: "28px", borderRadius: "8px" }}>
            <h4 style={{ color: "#D96732", margin: "0 0 10px", fontSize: "18px" }}>
              “ĐỂ TUI QUA ĐỢT STRESS NÀY RỒI TÍNH...”
            </h4>
            <p style={{ color: "#A9B2AC", fontSize: "15px", lineHeight: 1.7, margin: "0 0 12px" }}>
              Tui từng nói y chang. Qua dự án này. Qua đợt bận này. Qua Tết. Qua chuyến công tác. Qua mấy buổi nhậu. Rồi bỏ. Nhưng nếu stress chính là thứ kích hoạt ông hút thuốc, thì đợi tới ngày cuộc sống không còn stress mới bắt đầu... <strong>ÔNG SẼ PHẢI ĐỢI TỚI BAO GIỜ?</strong>
            </p>
            <p style={{ color: "#F5F2E9", fontSize: "15px", fontWeight: 700, margin: 0 }}>
              Mục tiêu không phải tạo một cuộc sống không stress hay không bàn nhậu. Mục tiêu là: KHÔNG CÒN BƯỚC VÀO NHỮNG TÌNH HUỐNG ĐÓ VỚI HAI BÀN TAY TRẮNG.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CLOSING LETTER (DARK CHARCOAL #171A18) */}
      <section className="letter-closing" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(30px, 4.2vw, 50px)", color: "#F5F2E9", margin: "0 0 24px", lineHeight: 1.25 }}>
            HEY BRO.
          </h2>

          <div className="story-prose" style={{ textAlign: "left", fontSize: "18px", color: "#A9B2AC" }}>
            <p>
              Nếu ông vẫn còn ở đây, tui nghĩ tui không cần thuyết phục ông rằng thuốc lá có hại nữa. Ông biết. Tui cũng từng biết. Và có thể ông đã nghĩ tới việc bỏ nhiều lần hơn số lần ông nhớ được.
            </p>
            <p style={{ color: "#D96732", fontWeight: 700 }}>
              <em>“Mai bỏ.”</em> — Tui từng nói câu đó gần 8 năm. Vấn đề của “mai” là... NÓ LUÔN ĐỨNG CÁCH MÌNH ĐÚNG MỘT NGÀY.
            </p>
            <p>
              Tui không muốn bán ông một lời hứa rằng 7 ngày sẽ giải quyết toàn bộ một hành vi đã tồn tại nhiều năm. Nhưng tui có thể đưa cho ông thứ mà tui ước mình có khi bắt đầu: <strong>MỘT BẢN ĐỒ.</strong>
            </p>
            <p style={{ color: "#F5F2E9" }}>
              Có thể 7 ngày tới không phải là 7 ngày <em>“TUI ĐANG CỐ BỎ THUỐC”</em> mà là 7 ngày đầu tiên ông bắt đầu tạo bằng chứng cho một câu chuyện khác: <strong>“TUI ĐANG HỌC CÁCH SỐNG MÀ KHÔNG CÒN CẦN ĐIẾU THUỐC TRONG NHỮNG KHOẢNH KHẮC NÀY.”</strong>
            </p>
          </div>

          <div style={{ margin: "40px 0 20px" }}>
            <div style={{ color: "#D96732", fontWeight: 800, fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
              DỊCH CHUYỂN ĐỊNH DANH — KHÔNG CHỈ LÀ NICOTINE.
            </div>
            <h3 style={{ fontSize: "32px", color: "#F5F2E9", margin: "0 0 8px" }}>
              BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™
            </h3>
            <span style={{ color: "#A9B2AC", fontSize: "14px" }}>NHÓM TRẢI NGHIỆM ĐẦU TIÊN — 497.000Đ</span>
          </div>

          <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày" style={{ maxWidth: "580px", margin: "0 auto 10px", fontSize: "18px", padding: "20px 36px", background: "#D96732", color: "white", textDecoration: "none", borderRadius: "6px", boxShadow: "0 12px 35px rgba(217,103,50,0.4)", display: "block" }}>
            BẮT ĐẦU NGÀY 1 NGAY →
          </a>
          <div style={{ color: "#74766F", fontSize: "13px", letterSpacing: "0.04em", marginBottom: "16px" }}>
            Truy cập ngay sau đăng ký · 497.000đ · Thanh toán một lần
          </div>

          <p style={{ color: "#74766F", fontSize: "14px", margin: 0 }}>
            Không cần hứa với tui. Không cần đăng lên Facebook. Không cần đợi thứ Hai. Chỉ cần bắt đầu Ngày 1.
          </p>
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
        <a href="#offer" style={{ background: "#D96732", color: "white", padding: "10px 18px", fontSize: "12px", fontWeight: 800, textDecoration: "none", borderRadius: "4px" }}>BẮT ĐẦU NGÀY 1 NGAY →</a>
      </div>
    </div>
  );
}
