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
                    poster="/images/video_poster_dat.jpg"
                    style={{ width: "100%", maxHeight: "560px", objectFit: "contain", background: "#171A18", display: "block" }}
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

      {/* SECTION: BÂY GIỜ NHÌN LẠI... (QUYỀN TỰ CHỦ & 3 NỀN TẢNG) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 24px", lineHeight: 1.25, fontWeight: 800 }}>
            BÂY GIỜ NHÌN LẠI...
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19", lineHeight: 1.8 }}>
            <p>Thỉnh thoảng tui vẫn nghĩ về phiên bản của mình ngày trước.</p>
            <p>
              Một thằng hút thuốc gần 8 năm.<br />
              Stress là hút.<br />
              Cà phê là hút.<br />
              Làm xong việc là hút.<br />
              Đi nhậu cũng hút.<br />
              Có hôm đang ho vẫn châm thêm một điếu.
            </p>
            <p>Và không biết đã bao nhiêu lần tự nói với mình: <em>“Mai bỏ.”</em></p>

            <p>
              Nếu gặp lại phiên bản đó, có lẽ tui sẽ không nói: <em>“Mày phải quyết tâm hơn.”</em><br />
              Cũng không nói: <em>“Mày phải có ý chí mạnh hơn.”</em>
            </p>

            <p>Tui chỉ muốn chỉ cho nó thấy một điều mà ngày đó tui chưa hiểu.</p>

            <div style={{ background: "#252B25", borderLeft: "4px solid #D96732", color: "#F5F2E9", padding: "24px 28px", borderRadius: "8px", margin: "28px 0" }}>
              <strong style={{ color: "#D96732", fontSize: "20px", display: "block", marginBottom: "10px", textTransform: "uppercase" }}>
                THỨ TUI CẦN LẤY LẠI KHÔNG CHỈ LÀ SỨC KHỎE. MÀ LÀ QUYỀN TỰ CHỦ.
              </strong>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px", fontSize: "15px", color: "#D5DFDB" }}>
                <li>✓ Quyền uống một ly cà phê mà không mặc định phải châm thuốc.</li>
                <li>✓ Quyền gặp một ngày stress mà không để tay tự tìm bao thuốc.</li>
                <li>✓ Quyền ngồi cùng bạn bè mà vẫn tự quyết định mình muốn làm gì.</li>
                <li>✓ Quyền có một khoảng nghỉ mà không cần điếu thuốc trở thành điều kiện để cảm thấy dễ chịu.</li>
                <li>✓ Và quan trọng nhất... Quyền không còn sống trong cảm giác mình biết điều gì tốt cho bản thân nhưng hết lần này tới lần khác vẫn không làm được.</li>
              </ul>
            </div>

            <p>Đó là thứ làm tui bắt đầu nhìn việc bỏ thuốc theo một cách khác.</p>

            <p style={{ color: "#D96732", fontWeight: 800, fontSize: "20px" }}>
              BỎ THUỐC KHÔNG CHỈ LÀ LOẠI BỎ MỘT ĐIẾU THUỐC.
            </p>
            <p>
              Nó còn là quá trình lấy lại quyền quyết định trong những khoảnh khắc mà trước đây mình gần như phản ứng theo quán tính.
            </p>

            <p><strong>Và đây cũng là điều quan trọng:</strong></p>
            <p style={{ color: "#191B19", fontWeight: 800 }}>
              QUYỀN TỰ CHỦ KHÔNG ĐẾN TỪ MỘT THỨ DUY NHẤT.
            </p>

            <ul style={{ listStyle: "circle", paddingLeft: "24px", color: "#74766F", margin: "0 0 20px" }}>
              <li>Không phải chỉ cần quyết tâm.</li>
              <li>Không phải chỉ cần né tất cả những nơi có người hút.</li>
              <li>Không phải chỉ cần thay một thói quen.</li>
              <li>Và cũng không phải chỉ cần tự nhủ: <em>“Tôi không còn là người hút thuốc.”</em></li>
            </ul>

            <p>Muốn thay đổi một hành vi đã lặp lại trong thời gian dài, có nhiều mảnh ghép phải bắt đầu ăn khớp với nhau.</p>
            <p style={{ color: "#D96732", fontWeight: 700 }}>
              Và nếu bạn đang tự hỏi những mảnh ghép đó là gì... thì đây là 3 điều quan trọng nhất tui đã bắt đầu nhìn thấy trong chính hành trình của mình, cũng là nền tảng của Hệ thống 7 ngày này:
            </p>

            {/* NỀN TẢNG 1 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px", margin: "32px 0" }}>
              <span style={{ background: "#D96732", color: "white", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                NỀN TẢNG 1
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                NHÌN THẤY VÒNG LẶP TRƯỚC KHI CỐ PHÁ NÓ
              </h3>
              <p style={{ color: "#191B19", fontSize: "16px" }}>
                Một thời gian dài, tui chỉ có một cách giải thích: <em>“Tui thèm thuốc.”</em>
              </p>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Nhưng “thèm thuốc” là một câu quá rộng. Vì nếu để ý kỹ, bạn sẽ thấy mình không hút giống nhau trong mọi thời điểm.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px", display: "grid", gap: "6px", fontSize: "14px", color: "#191B19" }}>
                <li>• Có người cứ mở mắt buổi sáng là muốn hút.</li>
                <li>• Có người phải có cà phê.</li>
                <li>• Có người ăn xong là tay tìm thuốc.</li>
                <li>• Có người bình thường cả ngày nhưng tới lúc công việc căng thì cảm giác muốn hút tăng lên.</li>
                <li>• Có người ít nghĩ đến thuốc khi ở một mình, nhưng chỉ cần ngồi vào bàn với bạn bè là mọi thứ tự động quay lại.</li>
              </ul>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Điều đó có nghĩa là trước điếu thuốc thường có một bối cảnh. Một khoảnh khắc. Một cảm xúc. Một hoạt động. Một người. Một nơi. Hoặc một nghi thức đã lặp lại quá nhiều lần.
              </p>
              <div style={{ background: "#F3F0E8", borderLeft: "3px solid #D96732", padding: "12px 16px", borderRadius: "4px", fontSize: "14px", margin: "14px 0", color: "#191B19", fontWeight: 600 }}>
                Ví dụ:<br />
                • Cà phê ➔ muốn hút ➔ châm thuốc.<br />
                • Stress ➔ muốn ra ngoài ➔ châm thuốc.<br />
                • Ăn xong ➔ cảm thấy thiếu thiếu ➔ châm thuốc.<br />
                • Bạn bè mời ➔ cầm thuốc ➔ hút.
              </div>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Từng lần riêng lẻ trông rất nhỏ. Nhưng khi lặp lại hàng trăm, hàng nghìn lần, nó bắt đầu trở thành một con đường quen thuộc. Và rồi tới một lúc... bạn không còn cảm giác mình đang quyết định nữa. Bạn chỉ đang phản ứng.
              </p>
              <p style={{ color: "#D96732", fontWeight: 800, margin: 0 }}>
                Đó là lý do bước đầu tiên không phải cố chống lại tất cả. Mà là: NHÌN THẤY CHÍNH XÁC VÒNG LẶP CỦA MÌNH.
              </p>
              <p style={{ color: "#74766F", fontSize: "14px", margin: "8px 0 0" }}>
                Khi bạn biết mình thường hút ở đâu, khi nào, sau điều gì và trong trạng thái nào... thứ từng có cảm giác rất mơ hồ bắt đầu trở nên cụ thể. Và thứ cụ thể thì mới có thể bắt đầu xử lý. Đó là nền tảng đầu tiên.
              </p>
            </div>

            {/* NỀN TẢNG 2 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px", margin: "32px 0" }}>
              <span style={{ background: "#D96732", color: "white", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                NỀN TẢNG 2
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                TÁC NHÂN CỦ KHÔNG NHẤT THIẾT PHẢI DẪN ĐẾN PHẢN ỨNG CỦ
              </h3>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Nhìn thấy vòng lặp thôi chưa đủ. Vì cuộc sống vẫn tiếp tục. Ngày mai bạn vẫn có thể uống cà phê. Vẫn có deadline. Vẫn ăn cơm. Vẫn lái xe. Vẫn gặp bạn bè. Vẫn có những ngày vui. Và cũng vẫn có những ngày cực kỳ tệ.
              </p>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Nếu kế hoạch bỏ thuốc chỉ hoạt động khi mọi thứ bình yên... thì tới lúc cuộc sống trở lại bình thường, phản ứng cũ rất dễ quay lại.
              </p>
              <div style={{ background: "#252B25", color: "#F5F2E9", padding: "18px 20px", borderRadius: "8px", margin: "16px 0" }}>
                <strong style={{ color: "#D96732", fontSize: "17px", display: "block", marginBottom: "8px" }}>
                  ĐÂY LÀ CHỖ MÌNH CẦN XÂY MỘT THỨ KHÁC: KHOẢNG LỰA CHỌN.
                </strong>
                <div style={{ fontSize: "14px", lineHeight: 1.7, color: "#D5DFDB" }}>
                  • Trước đây: Stress ➔ hút.<br />
                  &nbsp;&nbsp;➔ Ta bắt đầu tập: <strong>Stress ➔ Dừng lại ➔ Xử lý ➔ Quyết định.</strong><br />
                  • Trước đây: Cà phê ➔ hút.<br />
                  &nbsp;&nbsp;➔ Ta bắt đầu tạo một nghi thức khác.<br />
                  • Trước đây: “Làm điếu không?” ➔ nhận thuốc.<br />
                  &nbsp;&nbsp;➔ Ta chuẩn bị trước câu trả lời.
                </div>
              </div>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Điểm quan trọng không nằm ở một mẹo cụ thể. Vì không có một phản ứng duy nhất phù hợp với tất cả mọi người và mọi tình huống.
              </p>
              <p style={{ color: "#D96732", fontWeight: 800, margin: 0 }}>
                Điều quan trọng là: BẠN KHÔNG CÒN ĐỂ TÁC NHÂN VÀ ĐIẾU THUỐC NỐI THẲNG VỚI NHAU.
              </p>
              <p style={{ color: "#74766F", fontSize: "14px", margin: "8px 0 0" }}>
                Có một khoảng ở giữa. Và trong khoảng đó... bạn bắt đầu có quyền lựa chọn. Một lần. Rồi thêm một lần. Rồi thêm một lần nữa. Đó là nền tảng thứ hai.
              </p>
            </div>

            {/* NỀN TẢNG 3 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px", margin: "32px 0" }}>
              <span style={{ background: "#D96732", color: "white", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                NỀN TẢNG 3
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                CON NGƯỜI MỚI CẦN BẰNG CHỨNG MỚI
              </h3>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Đây là phần tui từng không để ý. Sau nhiều năm hút thuốc, nó không còn chỉ là một hành vi. Nó bắt đầu trở thành một phần trong cách mình nhìn chính mình: <em>“Tôi là người hút thuốc.”</em>
              </p>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Vậy nên khi bỏ, mình rất dễ đứng ở vị trí: <em>“Tôi là người hút thuốc đang cố không hút.”</em> Và mỗi ngày lại trở thành một cuộc giằng co. Một bên là: <em>“Tôi muốn hút.”</em> Một bên là: <em>“Tôi không được hút.”</em>
              </p>
              <p style={{ color: "#191B19", fontWeight: 700 }}>
                Nhưng thay đổi cách nhìn về bản thân không có nghĩa là chỉ đọc vài câu khẳng định rồi mọi thứ tự biến mất. Identity mới cần: BẰNG CHỨNG.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0", display: "grid", gap: "8px", fontSize: "14px", color: "#191B19" }}>
                <li>✓ Bạn uống một ly cà phê mà phản ứng khác đi ➔ <strong>Một bằng chứng.</strong></li>
                <li>✓ Bạn gặp stress và sử dụng cách xử lý đã chuẩn bị ➔ <strong>Một bằng chứng.</strong></li>
                <li>✓ Bạn được mời thuốc nhưng lựa chọn khác ➔ <strong>Một bằng chứng.</strong></li>
                <li>✓ Bạn có một ngày khó khăn nhưng không mặc định dùng điếu thuốc như nút xả ➔ <strong>Một bằng chứng.</strong></li>
              </ul>
              <p style={{ color: "#74766F", fontSize: "15px" }}>
                Từng hành động riêng nhìn rất nhỏ. Nhưng khi cộng lại, chúng bắt đầu gửi cho chính bạn một thông điệp khác: <em>“Có thể mình không nhất thiết phải sống theo cách cũ nữa.”</em> Rồi dần dần: <em>“Mình có thể tự quyết định.”</em>
              </p>
              <p style={{ color: "#D96732", fontWeight: 800, margin: 0 }}>
                Và cuối cùng, mục tiêu không còn chỉ là: “Tôi phải nhịn thuốc.” Mà tiến gần hơn đến: “Thuốc lá không còn là thứ tôi cần để đi qua những khoảnh khắc này.” Đó là nền tảng thứ ba.
              </p>
            </div>

            {/* INTEGRATION SUMMARY & 7-DAY ROADMAP INTRO */}
            <div style={{ background: "#171A18", color: "#F5F2E9", padding: "32px", borderRadius: "14px", margin: "40px 0" }}>
              <h3 style={{ color: "#D96732", fontSize: "20px", marginTop: 0, textTransform: "uppercase", fontWeight: 800 }}>
                NHƯNG NẾU CHỈ LÀM MỘT TRONG BA THỨ THÌ SAO?
              </h3>
              <p style={{ color: "#D5DFDB", fontSize: "15px", lineHeight: 1.7 }}>
                Nhiều người nghĩ: Chỉ cần hiểu Trigger là đủ. Hoặc chỉ cần tìm một hành vi thay thế là đủ. Hoặc chỉ cần thay đổi tư duy là đủ. Nhưng thay đổi hành vi hiếm khi đơn giản như vậy.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0", display: "grid", gap: "10px", fontSize: "14px", color: "#A9B2AC" }}>
                <li>• Bạn có thể hiểu rất rõ vì sao mình hút... nhưng nếu đúng lúc stress mà không biết phải làm gì tiếp theo, phản ứng cũ vẫn rất dễ quay lại.</li>
                <li>• Bạn có thể chuẩn bị hàng chục cách thay thế... nhưng nếu không biết tình huống nào thực sự làm mình dễ gãy, bạn không biết nên dùng cái nào lúc nào.</li>
                <li>• Bạn có thể nói: “Tôi không còn là người hút thuốc”... nhưng nếu hành vi mỗi ngày vẫn liên tục tạo bằng chứng ngược lại, câu nói đó rất khó đứng vững.</li>
              </ul>
              <div style={{ borderTop: "1px solid #384238", paddingTop: "18px", marginTop: "18px" }}>
                <strong style={{ color: "#F5F2E9" }}>
                  THAY ĐỔI KHÔNG ĐẾN TỪ MỘT MẢNH GHÉP DUY NHẤT.
                </strong>
                <p style={{ color: "#D5DFDB", fontSize: "15px", lineHeight: 1.7, margin: "10px 0 0 0" }}>
                  Nó đến khi nhiều phần bắt đầu đi cùng nhau: Bạn nhìn thấy vòng lặp. Bạn nhận ra tác nhân. Bạn chuẩn bị phản ứng mới. Bạn có kế hoạch cho những tình huống khó. Bạn biết phải làm gì nếu một ngày bị trượt. Và bạn liên tục tạo bằng chứng cho cách mình muốn sống tiếp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTING SECTION: ĐÓ LÀ 3 MẢNH GHÉP GIÚP BẠN BẮT ĐẦU LẤY LẠI QUYỀN TỰ CHỦ */}
      <section className="letter-section" style={{ padding: "80px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19", lineHeight: 1.8 }}>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
                3 MẢNH GHÉP TỰ CHỦ
              </div>
              <h3 style={{ fontSize: "clamp(22px, 3.2vw, 32px)", color: "#191B19", margin: "0 0 20px", fontWeight: 800, lineHeight: 1.3 }}>
                ĐÓ LÀ 3 MẢNH GHÉP GIÚP BẠN BẮT ĐẦU LẤY LẠI QUYỀN TỰ CHỦ
              </h3>

              <div style={{ background: "#E5DFD2", borderLeft: "4px solid #A94725", padding: "20px 24px", borderRadius: "6px", marginBottom: "24px" }}>
                <strong style={{ color: "#191B19", fontSize: "16px", display: "block", marginBottom: "8px" }}>
                  NẾU BẠN...
                </strong>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px", fontSize: "15px", color: "#191B19" }}>
                  <li>• Đã hút thuốc nhiều năm và thật sự muốn dừng lại.</li>
                  <li>• Từng quyết tâm bỏ nhiều lần nhưng rồi vẫn quay lại.</li>
                  <li>• Cứ stress, cà phê, sau ăn, lái xe hay gặp bạn bè là lại muốn hút.</li>
                  <li>• Đã thử nhịn, cố gắng nhiều hơn, nhưng cuối cùng vẫn rơi vào vòng lặp cũ.</li>
                  <li>• Và mỗi lần hút lại, bạn lại thất vọng rồi tự trách bản thân: <em>“Tại sao mình muốn bỏ mà vẫn không làm được?”</em></li>
                </ul>
              </div>

              <p style={{ fontWeight: 800, color: "#D96732", fontSize: "18px", margin: "24px 0 10px" }}>
                VẬY ĐIỀU GÌ ĐANG THỰC SỰ NGĂN CẢN BẠN?
              </p>
              <p style={{ color: "#191B19", margin: "0 0 8px" }}>Có thể bạn không thiếu quyết tâm.</p>
              <p style={{ color: "#191B19", margin: "0 0 16px" }}>Bạn cũng không thiếu kiến thức về tác hại của thuốc lá.</p>
              
              <div style={{ background: "#252B25", borderLeft: "4px solid #D96732", padding: "18px 22px", borderRadius: "8px", margin: "16px 0 24px" }}>
                <p style={{ color: "#F5F2E9", fontSize: "15px", fontWeight: 600, lineHeight: 1.7, margin: 0 }}>
                  Điều bạn đang thiếu là một hệ thống rõ ràng để biết mình cần bắt đầu từ đâu, làm gì khi cơn muốn hút xuất hiện và xử lý thế nào trong những tình huống dễ khiến mình quay lại.
                </p>
              </div>

              <p style={{ fontWeight: 800, color: "#191B19", fontSize: "18px", marginTop: "28px" }}>
                VẬY BẠN CẦN PHẢI LÀM GÌ?
              </p>
              <p style={{ color: "#191B19" }}><strong>Bạn cần một lộ trình chỉ cho mình từng bước:</strong></p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", display: "grid", gap: "8px", fontSize: "15px", color: "#191B19" }}>
                <li>1. Nhìn thấy vòng lặp.</li>
                <li>2. Nhận diện tác nhân.</li>
                <li>3. Xây phản ứng mới.</li>
                <li>4. Chuẩn bị cho tình huống khó.</li>
                <li>5. Và biết cách tiếp tục nếu hành trình không hoàn hảo.</li>
              </ul>

              <p style={{ color: "#191B19" }}>
                Khi có một lộ trình rõ ràng, bạn không còn phải đoán xem mình nên làm gì trước, làm gì sau.
              </p>
              <p style={{ color: "#191B19" }}>
                Bạn chỉ cần đi từng bước để bắt đầu trở thành phiên bản không còn để điếu thuốc quyết định thay mình.
              </p>

              <div style={{ background: "#171A18", color: "#F5F2E9", padding: "32px", borderRadius: "14px", textAlign: "center", margin: "32px 0 0", border: "2px solid #D96732", boxShadow: "0 15px 40px rgba(0,0,0,0.25)" }}>
                <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  ĐÓ LÀ LÝ DO TUI XÂY DỰNG
                </span>
                <h4 style={{ fontSize: "24px", color: "#F5F2E9", margin: "8px 0 10px", fontWeight: 800 }}>
                  LỘ TRÌNH HÀNH ĐỘNG TRONG 7 NGÀY
                </h4>
                <p style={{ color: "#D5DFDB", fontSize: "15px", margin: 0, lineHeight: 1.65 }}>
                  Một chương trình thực hành từng bước giúp bạn nhìn thấy vòng lặp ➔ thay đổi phản ứng ➔ bắt đầu lấy lại quyền tự chủ.
                </p>
              </div>
            </div>
          </div>
        </section>

      {/* SECTION: BẠN CÓ 2 SỰ LỰA CHỌN (STANDALONE SECTION WITH EXACT LITERAL COPY) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px, 3.8vw, 42px)", color: "#191B19", margin: "0 0 32px", lineHeight: 1.25, fontWeight: 800, textAlign: "center" }}>
            BẠN CÓ 2 SỰ LỰA CHỌN
          </h2>

          <div className="story-prose" style={{ fontSize: "18px", color: "#191B19", lineHeight: 1.8 }}>
            {/* LỰA CHỌN 1 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "32px", marginBottom: "32px" }}>
              <h3 style={{ fontSize: "22px", color: "#D96732", margin: "0 0 16px", fontWeight: 800 }}>
                LỰA CHỌN 1
              </h3>
              <p style={{ margin: "0 0 8px" }}>Bạn có thể tiếp tục tự tìm cách.</p>
              <p style={{ margin: "0 0 8px" }}>Xem thêm video.</p>
              <p style={{ margin: "0 0 8px" }}>Đọc thêm bài viết.</p>
              <p style={{ margin: "0 0 8px" }}>Thử một mẹo mới.</p>
              <p style={{ margin: "0 0 8px" }}>Tự nhủ lần này phải quyết tâm hơn.</p>
              <p style={{ margin: "0 0 16px" }}>Rồi tự ghép tất cả những gì mình biết lại với nhau và hy vọng khi cơn muốn hút xuất hiện, mình sẽ nhớ phải làm gì.</p>

              <div style={{ background: "#F3F0E8", borderLeft: "4px solid #A94725", padding: "20px 22px", borderRadius: "8px", margin: "16px 0 0" }}>
                <p style={{ margin: "0 0 8px" }}>Tui đã từng đi theo con đường đó.</p>
                <p style={{ margin: "0 0 8px" }}>Và với tui, nó kéo dài gần 8 năm.</p>
                <p style={{ margin: "0 0 8px" }}>Tui biết thuốc lá không tốt.</p>
                <p style={{ margin: "0 0 8px" }}>Tui từng muốn bỏ.</p>
                <p style={{ margin: "0 0 8px" }}>Từng tự nhủ:</p>
                <p style={{ margin: "0 0 4px" }}><em>“Hết bao này bỏ.”</em></p>
                <p style={{ margin: "0 0 4px" }}><em>“Qua đợt stress này bỏ.”</em></p>
                <p style={{ margin: "0 0 12px" }}><em>“Mai bỏ.”</em></p>
                <p style={{ margin: "0 0 8px" }}>Nhưng đến đúng lúc cà phê, stress, sau ăn, lái xe hay gặp bạn bè...</p>
                <p style={{ margin: "0 0 8px" }}>mọi quyết tâm rất dễ biến mất.</p>
                <p style={{ margin: "0 0 8px" }}>Không phải vì tui chưa biết đủ.</p>
                <p style={{ margin: 0 }}>Mà vì tui chưa có một hệ thống rõ ràng để áp dụng ngay trong những khoảnh khắc đời thật đó.</p>
              </div>
            </div>

            {/* LỰA CHỌN 2 SHOWCASE CONTAINER (MATCHING SAMPLE IMAGE DESIGN) */}
            <div style={{
              background: "linear-gradient(180deg, #1C1310 0%, #140C0A 100%)",
              border: "1px solid #3E2B23",
              borderRadius: "20px",
              padding: "48px 32px",
              color: "#F5F2E9",
              marginBottom: "40px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
              textAlign: "center"
            }}>
              {/* HEADER TITLE */}
              <h3 style={{
                fontSize: "clamp(28px, 4.5vw, 38px)",
                background: "linear-gradient(180deg, #FAD08B 0%, #D96732 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "0 0 12px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}>
                LỰA CHỌN 2
              </h3>
              
              <h4 style={{
                fontSize: "clamp(18px, 3vw, 24px)",
                color: "#FFFFFF",
                margin: "0 0 24px",
                fontWeight: 600,
                lineHeight: 1.4,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                Đi theo một lộ trình đã được sắp xếp từng bước
              </h4>

              {/* CURVED GOLD ARROW ABOVE PHOTOS */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 24C18 8 32 6 42 16" stroke="#D96732" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M34 18L42 16L40 8" stroke="#D96732" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* COMPARISON PHOTOS SIDE BY SIDE WITH LABELS ABOVE */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "24px",
                maxWidth: "680px",
                margin: "0 auto 36px"
              }}>
                {/* BEFORE ITEM */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{
                    background: "rgba(0,0,0,0.6)",
                    border: "1px solid #3E2B23",
                    color: "#A9B2AC",
                    fontSize: "14px",
                    fontWeight: 700,
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textAlign: "center"
                  }}>
                    2023 (Tự mò & giằng co)
                  </div>
                  <img
                    src="/images/dat_trade_fair_2023.png"
                    alt="Đạt trước đây - 2023"
                    style={{
                      width: "100%",
                      height: "440px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "1px solid #4A352C",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.5)"
                    }}
                  />
                </div>

                {/* AFTER ITEM */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{
                    background: "#D96732",
                    color: "#FFFFFF",
                    fontSize: "14px",
                    fontWeight: 800,
                    padding: "8px 14px",
                    borderRadius: "8px",
                    textAlign: "center",
                    boxShadow: "0 4px 14px rgba(217,103,50,0.3)"
                  }}>
                    Hiện tại (Tự chủ hoàn toàn)
                  </div>
                  <img
                    src="/images/dat_park_runner.jpg"
                    alt="Đạt bây giờ - Tự chủ & Khỏe mạnh"
                    style={{
                      width: "100%",
                      height: "440px",
                      objectFit: "cover",
                      borderRadius: "16px",
                      border: "2px solid #D96732",
                      boxShadow: "0 12px 35px rgba(217,103,50,0.25)"
                    }}
                  />
                </div>
              </div>

              {/* CARD PROSE CONTENT (MATCHING EXACT VERBATIM COPY) */}
              <div style={{
                textAlign: "left",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "#E8DFD5",
                maxWidth: "680px",
                margin: "0 auto",
                display: "grid",
                gap: "14px"
              }}>
                <p style={{ margin: 0 }}>
                  Bạn có thể đi theo một lộ trình đã được sắp xếp từng bước.
                </p>
                <p style={{ margin: 0 }}>
                  Không cần tự mò xem nên bắt đầu từ đâu.
                </p>
                <p style={{ margin: 0 }}>
                  Không cần cố nhớ hàng chục lời khuyên khác nhau.
                </p>
                <p style={{ margin: 0 }}>
                  Không cần mỗi sáng lại tự hỏi: <em style={{ color: "#F5F2E9" }}>“Hôm nay mình phải cố nhịn thế nào?”</em>
                </p>

                <p style={{ margin: "10px 0 0" }}>
                  Tui đã đi qua những lần thử, những lúc quay lại, những tình huống làm mình dễ gãy nhất và quá trình tự quan sát để hiểu điều gì thực sự đang xảy ra với hành vi của mình.
                </p>

                <p style={{ margin: 0 }}>
                  Sau đó tui gom những gì hữu ích nhất lại thành một <strong style={{ color: "#FAD08B" }}>Lộ trình hành động trong 7 ngày</strong>.
                </p>

                <p style={{ margin: "10px 0 0" }}>
                  Không phải để hứa với bạn rằng sau 7 ngày mọi thứ sẽ biến mất.
                </p>

                <div style={{
                  background: "rgba(217, 103, 50, 0.12)",
                  borderLeft: "4px solid #D96732",
                  padding: "18px 22px",
                  borderRadius: "8px",
                  margin: "8px 0"
                }}>
                  <strong style={{ color: "#F5F2E9", display: "block", marginBottom: "10px", fontSize: "18px" }}>
                    Mà để giúp bạn có một con đường rõ ràng hơn:
                  </strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px", color: "#F5F2E9", fontSize: "16px" }}>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D96732", fontWeight: 800 }}>✓</span> Nhìn thấy vòng lặp.
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D96732", fontWeight: 800 }}>✓</span> Nhận diện tác nhân.
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D96732", fontWeight: 800 }}>✓</span> Xây phản ứng mới.
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D96732", fontWeight: 800 }}>✓</span> Chuẩn bị cho những tình huống khó.
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#D96732", fontWeight: 800 }}>✓</span> Và biết cách tiếp tục nếu có một ngày không hoàn hảo.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CLOSING REFLECTION */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px", marginBottom: "28px" }}>
              <p style={{ margin: "0 0 10px" }}>Nếu bạn đang đọc đến đây, có lẽ bạn cũng đã mệt với việc cứ phải tự thử rồi tự đoán.</p>
              <p style={{ margin: "0 0 14px" }}>Bạn không cần thêm thật nhiều thông tin.</p>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "18px", margin: "0 0 14px", lineHeight: 1.6 }}>
                Bạn cần biết:<br />
                Hôm nay làm gì.<br />
                Ngày mai làm gì.<br />
                Và khi tình huống khó xuất hiện thì phải làm gì.
              </div>
              <p style={{ margin: "0 0 8px" }}>Đó là lý do tui xây dựng chương trình này.</p>
              <p style={{ margin: 0 }}>Để bạn không phải mất thêm nhiều năm chỉ để tự ráp từng mảnh lại với nhau.</p>
            </div>

            {/* CALLOUT BOX: LỘ TRÌNH HÀNH ĐỘNG TRONG 7 NGÀY */}
            <div style={{ background: "#171A18", color: "#F5F2E9", padding: "34px", borderRadius: "14px", textAlign: "center", border: "2px solid #D96732", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
              <h3 style={{ fontSize: "26px", color: "#D96732", margin: "0 0 12px", fontWeight: 800 }}>
                LỘ TRÌNH HÀNH ĐỘNG TRONG 7 NGÀY
              </h3>
              <p style={{ color: "#D5DFDB", fontSize: "16px", margin: "0 0 16px", lineHeight: 1.7 }}>
                Một hệ thống thực hành rõ ràng, từng bước, để bạn bắt đầu thay đổi cách mình phản ứng với thuốc lá trong chính cuộc sống hằng ngày.
              </p>
              <span style={{ color: "#A9B2AC", fontSize: "15px", fontWeight: 700, fontStyle: "italic" }}>
                Hãy đọc tiếp...
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: NHƯNG ĐẠT ƠI, NHỮNG ĐIỀU NÀY CÓ PHÙ HỢP VỚI TÔI KHÔNG? (NON-SMOKER™ CURRICULUM & QUALIFICATION) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          {/* 1. SECTION TITLE & SUITABILITY */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              DÀNH CHO AI?
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#191B19", margin: "10px 0 20px", fontWeight: 800, lineHeight: 1.3 }}>
              “NHƯNG ĐẠT ƠI, NHỮNG ĐIỀU NÀY CÓ PHÙ HỢP VỚI TÔI KHÔNG?”
            </h2>
            <div style={{ fontSize: "18px", color: "#191B19", lineHeight: 1.8, textAlign: "left", background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px" }}>
              <p style={{ margin: "0 0 12px" }}>
                Nếu bạn đang hút thuốc và thực sự muốn dừng lại, hoặc đã từng thử bỏ nhưng vẫn quay về với điếu thuốc, thì chương trình này được thiết kế dành cho bạn.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                Không quan trọng bạn mới bắt đầu nghĩ đến chuyện bỏ thuốc hay đã thử nhiều lần trước đây.
              </p>
              <div style={{ background: "#252B25", borderLeft: "4px solid #D96732", padding: "16px 20px", borderRadius: "6px", color: "#F5F2E9" }}>
                <strong style={{ color: "#D96732", fontSize: "17px", display: "block" }}>
                  ĐIỀU QUAN TRỌNG LÀ:
                </strong>
                <span style={{ fontSize: "16px" }}>Bạn không muốn tiếp tục lặp lại cách cũ nữa.</span>
              </div>
            </div>
          </div>

          {/* 2. PROGRAM INTRO BANNER (NON-SMOKER™) */}
          <div style={{
            background: "linear-gradient(180deg, #1C1310 0%, #140C0A 100%)",
            border: "2px solid #D96732",
            borderRadius: "16px",
            padding: "40px 32px",
            color: "#F5F2E9",
            marginBottom: "48px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
          }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                GIỚI THIỆU
              </span>
              <h3 style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#F5F2E9", margin: "12px 0 6px", fontWeight: 900, letterSpacing: "0.05em" }}>
                NON-SMOKER™
              </h3>
              <p style={{ color: "#D5DFDB", fontSize: "18px", margin: 0, fontStyle: "italic" }}>
                Trở thành người không còn cần đến thuốc lá.
              </p>
            </div>

            <p style={{ fontSize: "17px", lineHeight: 1.8, margin: "0 0 20px" }}>
              Tham gia chương trình, tui sẽ hướng dẫn bạn bắt đầu thay đổi mối quan hệ với thuốc lá dựa trên <strong>3 nền tảng</strong>:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginBottom: "24px" }}>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #3E2B23", padding: "16px", borderRadius: "8px", textAlign: "center", fontWeight: 800, color: "#FAD08B" }}>
                1. NHÌN THẤY VÒNG LẶP
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #3E2B23", padding: "16px", borderRadius: "8px", textAlign: "center", fontWeight: 800, color: "#FAD08B" }}>
                2. THAY ĐỔI PHẢN ỨNG
              </div>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid #3E2B23", padding: "16px", borderRadius: "8px", textAlign: "center", fontWeight: 800, color: "#FAD08B" }}>
                3. LẤY LẠI QUYỀN TỰ CHỦ
              </div>
            </div>

            <div style={{ borderTop: "1px solid #3E2B23", paddingTop: "20px" }}>
              <p style={{ color: "#A9B2AC", fontSize: "15px", margin: "0 0 8px" }}>
                Thay vì chỉ cố gắng: <em>“Lần này mình phải nhịn được.”</em>
              </p>
              <p style={{ color: "#F5F2E9", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
                Bạn sẽ bắt đầu hiểu rõ mình đang hút trong những tình huống nào, điều gì thường kéo mình quay lại và có thể chuẩn bị cách phản ứng ra sao khi những tình huống đó xuất hiện.
              </p>
            </div>
          </div>

          {/* 3. HOW THE PROGRAM WORKS */}
          <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "36px 32px", borderRadius: "14px", marginBottom: "48px" }}>
            <h3 style={{ fontSize: "22px", color: "#191B19", margin: "0 0 20px", fontWeight: 800, textTransform: "uppercase" }}>
              CÁCH CHƯƠNG TRÌNH HOẠT ĐỘNG NHƯ SAU:
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: "12px", fontSize: "16px", color: "#191B19", lineHeight: 1.7 }}>
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D96732", fontWeight: 800 }}>•</span>
                <span>Chương trình gồm các video hướng dẫn được thu sẵn trên website. Bạn có thể học online và xem lại bất cứ lúc nào.</span>
              </li>
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D96732", fontWeight: 800 }}>•</span>
                <span>Nội dung được sắp xếp theo từng phần, đi từ hiểu hành vi hiện tại → nhận diện những tác nhân kích hoạt → xây phản ứng mới → chuẩn bị cho những tình huống khó → củng cố quyền tự chủ.</span>
              </li>
              <li style={{ display: "flex", gap: "10px" }}>
                <span style={{ color: "#D96732", fontWeight: 800 }}>•</span>
                <span>Mỗi phần đều có hướng dẫn và công cụ thực hành để bạn biết mình cần quan sát gì, làm gì và áp dụng thế nào vào chính cuộc sống của mình.</span>
              </li>
            </ul>

            <div style={{ background: "#252B25", color: "#F5F2E9", padding: "20px 24px", borderRadius: "8px", marginBottom: "18px" }}>
              <strong style={{ color: "#D96732", fontSize: "16px", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>
                ĐIỂM QUAN TRỌNG NHẤT LÀ:
              </strong>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.75, color: "#D5DFDB" }}>
                Bạn không cần tự xem hàng chục video, đọc hàng chục bài viết rồi cố ghép chúng thành một cách làm của riêng mình. Tui đã sắp xếp mọi thứ thành một hệ thống theo thứ tự rõ ràng để bạn có thể học đến đâu, áp dụng đến đó.
              </p>
            </div>

            <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#191B19", margin: 0 }}>
              Chương trình không được thiết kế để bạn chỉ “biết thêm về cai thuốc”. Mà để những gì bạn học có thể được đưa vào đúng những lúc đời thật xảy ra: <strong>Khi stress. Khi uống cà phê. Sau bữa ăn. Khi bạn bè mời thuốc. Hay khi trong đầu bắt đầu xuất hiện câu: “Một điếu thôi chắc không sao.”</strong>
            </p>
          </div>

          {/* 4. QUALIFICATION QUESTIONNAIRE (7 CÂU HỎI "CÓ") */}
          <div style={{ background: "#171A18", color: "#F5F2E9", border: "2px solid #D96732", padding: "40px 32px", borderRadius: "16px", marginBottom: "48px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <h3 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: "#D96732", margin: "0 0 12px", fontWeight: 800, textAlign: "center" }}>
              BÂY GIỜ LÀ LÚC ĐỂ QUYẾT ĐỊNH CHƯƠNG TRÌNH NÀY CÓ DÀNH CHO BẠN KHÔNG.
            </h3>
            <p style={{ textAlign: "center", color: "#D5DFDB", fontSize: "17px", margin: "0 0 28px" }}>
              Nếu bạn trả lời <strong>“Có”</strong> với bất kỳ câu hỏi nào dưới đây... <span style={{ color: "#FAD08B" }}>thì chương trình này được thiết kế dành cho bạn.</span>
            </p>

            <div style={{ display: "grid", gap: "12px", marginBottom: "28px" }}>
              {[
                "Bạn đã hút thuốc đủ lâu và thực sự muốn dừng lại?",
                "Bạn đã từng quyết tâm bỏ nhưng sau một thời gian lại quay lại?",
                "Bạn cứ uống cà phê, ăn xong, stress, lái xe hay gặp bạn bè là muốn hút?",
                "Bạn mệt với việc ngày nào cũng phải đấu tranh với cảm giác muốn hút?",
                "Bạn muốn hiểu vì sao mình cứ quay lại thay vì tiếp tục tự trách bản thân?",
                "Bạn muốn biết mình có thể làm gì khi đúng tình huống khó xuất hiện?",
                "Bạn muốn việc bỏ thuốc không còn chỉ phụ thuộc vào câu “lần này mình sẽ cố hơn”?"
              ].map((q, idx) => (
                <div key={idx} style={{ background: "#252B25", border: "1px solid #384238", padding: "16px 20px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <span style={{ fontSize: "15px", color: "#F5F2E9", flex: "1 1 300px" }}>✓ {q}</span>
                  <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", whiteSpace: "nowrap" }}>
                    CHƯƠNG TRÌNH DÀNH CHO BẠN
                  </span>
                </div>
              ))}
            </div>

            <p style={{ textAlign: "center", color: "#A9B2AC", fontSize: "15px", margin: 0, fontStyle: "italic" }}>
              Nếu bạn trả lời “Có” với bất kỳ câu nào ở trên, hãy đọc tiếp để biết chính xác bạn sẽ được hướng dẫn những gì bên trong chương trình.
            </p>
          </div>

          {/* 5. COURSE CURRICULUM (7 PHẦN HỌC CHI TIẾT) */}
          <div style={{ marginBottom: "48px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                NỘI DUNG CHI TIẾT
              </span>
              <h2 style={{ fontSize: "clamp(26px, 3.8vw, 36px)", color: "#191B19", margin: "8px 0 0", fontWeight: 800 }}>
                7 PHẦN HỌC BÊN TRONG NON-SMOKER™
              </h2>
            </div>

            <div style={{ display: "grid", gap: "24px" }}>
              {/* PHẦN 1 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 1
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  HIỂU VÒNG LẶP HÚT THUỐC
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Phần này giúp bạn hiểu cách hành vi hút thuốc đang xuất hiện trong chính cuộc sống của mình trước khi cố thay đổi nó. Bạn sẽ bắt đầu nhìn thấy khi nào mình hút, chuyện gì thường xảy ra trước đó và những điếu thuốc nào gần như đã trở thành phản xạ tự động.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách nhận diện những thời điểm mình thường hút nhất.</li>
                    <li>• Cách quan sát điều gì thường xảy ra ngay trước một điếu thuốc.</li>
                    <li>• Cách nhận ra những bối cảnh, cảm xúc và hoạt động thường đi cùng hành vi hút.</li>
                    <li>• Cách nhìn hành vi hút thuốc như một vòng lặp có thể quan sát, thay vì chỉ kết luận: “Tôi nghiện nên tôi hút.”</li>
                  </ul>
                </div>
                <div style={{ color: "#D96732", fontWeight: 700, fontSize: "15px" }}>
                  Sau phần này, bạn không còn chỉ nói: <em>“Tôi thèm thuốc.”</em><br />
                  Mà bắt đầu thấy rõ: <em>“Tôi thường muốn hút mạnh nhất trong những tình huống này.”</em>
                </div>
              </div>

              {/* PHẦN 2 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 2
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  NHẬN DIỆN TÁC NHÂN KÍCH HOẠT
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Không phải mọi cảm giác muốn hút đều xuất hiện giống nhau. Có người cứ uống cà phê là muốn hút. Có người sau bữa ăn. Có người bình thường không sao nhưng chỉ cần công việc căng là bắt đầu tìm thuốc. Có người chỉ cần ngồi đúng nhóm bạn là phản xạ cũ quay trở lại.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>TRONG PHẦN NÀY, BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách xác định những tác nhân mạnh nhất của riêng mình.</li>
                    <li>• Cách nhận diện tác nhân từ môi trường, cảm xúc và những hoạt động quen thuộc.</li>
                    <li>• Cách tìm ra những tình huống có nguy cơ khiến mình quay lại cao nhất.</li>
                    <li>• Cách biết tình huống nào cần chuẩn bị trước thay vì chờ nó xảy ra mới nghĩ cách xử lý.</li>
                  </ul>
                </div>
                <div style={{ background: "#252B25", color: "#FAD08B", padding: "12px 18px", borderRadius: "6px", fontWeight: 800, fontSize: "15px" }}>
                  Sau phần này, bạn bắt đầu trả lời được câu hỏi: “ĐIỂM DỄ GÃY CỦA MÌNH NẰM Ở ĐÂU?”
                </div>
              </div>

              {/* PHẦN 3 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 3
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  HIỂU ĐIỀU GÌ NẰM SAU MỖI ĐIẾU THUỐC
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Không phải mọi điếu thuốc đều đang làm cùng một “nhiệm vụ”. Có lúc bạn đang muốn một khoảng nghỉ. Có lúc cần chuyển trạng thái sau khi làm việc căng. Có lúc thuốc đã trở thành nghi thức đi cùng cà phê hoặc sau bữa ăn. Có lúc nó xuất hiện trong giao tiếp. Và có lúc trải nghiệm liên quan đến phụ thuộc nicotine thực sự hiện diện.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách phân biệt những hoàn cảnh khác nhau dẫn tới hành vi hút.</li>
                    <li>• Cách nhận ra điếu thuốc đang đóng vai trò gì trong từng tình huống.</li>
                    <li>• Vì sao chỉ lấy đi điếu thuốc nhưng để nguyên khoảng trống phía sau có thể khiến việc thay đổi trở nên khó hơn.</li>
                    <li>• Cách tìm đúng thứ cần xử lý trước khi nghĩ đến phản ứng thay thế.</li>
                  </ul>
                </div>
                <div style={{ color: "#D96732", fontWeight: 800, fontSize: "15px" }}>
                  HƯỚNG ĐẾN CÂU HỎI: “TRONG TÌNH HUỐNG NÀY, MÌNH THỰC SỰ ĐANG CẦN GÌ?”
                </div>
              </div>

              {/* PHẦN 4 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 4
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  TẠO KHOẢNG DỪNG TRƯỚC KHI PHẢN ỨNG
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Một hành vi đã tồn tại lâu thường diễn ra rất nhanh: Cảm giác muốn hút xuất hiện ➔ Tay tìm thuốc ➔ Bật lửa ➔ Hút. Mọi thứ có thể xảy ra trước cả khi bạn kịp nghĩ: <em>“Mình có thực sự muốn hút điếu này không?”</em>
                </p>
                <div style={{ background: "#252B25", color: "#F5F2E9", padding: "14px 18px", borderRadius: "6px", marginBottom: "14px", fontSize: "15px", fontWeight: 700 }}>
                  TẠO KHOẢNG GIỮA: “TÔI MUỐN HÚT” → “TÔI QUYẾT ĐỊNH LÀM GÌ TIẾP THEO.”
                </div>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách nhận ra khoảnh khắc phản xạ cũ bắt đầu chạy.</li>
                    <li>• Một quy trình ngắn để tạo khoảng dừng trước khi phản ứng.</li>
                    <li>• Cách quan sát cảm giác muốn hút mà không cần lập tức hành động theo nó.</li>
                    <li>• Cách đưa quyền quyết định quay trở lại trước khi lựa chọn bước tiếp theo.</li>
                  </ul>
                </div>
                <div style={{ color: "#D96732", fontWeight: 700, fontSize: "15px" }}>
                  Mục tiêu không phải hứa rằng mọi cảm giác muốn hút sẽ biến mất. Mà là giúp bạn tạo thêm: <strong>KHOẢNG LỰA CHỌN.</strong>
                </div>
              </div>

              {/* PHẦN 5 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 5
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  XÂY PHẢN ỨNG MỚI
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Nhìn thấy vòng lặp là chưa đủ. Bạn còn cần biết: <em>“Lần tới khi tình huống đó xảy ra, mình sẽ làm gì?”</em> Bởi vì stress có thể cần một cách xử lý. Cà phê có thể cần một cách khác. Sau bữa ăn lại khác. Khoảng nghỉ giữa giờ lại khác.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>TRONG PHẦN NÀY, BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách xây lựa chọn thay thế cho những tác nhân quan trọng nhất.</li>
                    <li>• Cách chuẩn bị trước thay vì đợi tới lúc muốn hút mới nghĩ cách.</li>
                    <li>• Cách thay đổi những nghi thức đã gắn với thuốc lá.</li>
                    <li>• Cách thử và điều chỉnh để tìm ra phản ứng phù hợp với chính cuộc sống của mình.</li>
                  </ul>
                </div>
                <div style={{ background: "#171A18", color: "#F5F2E9", padding: "12px 18px", borderRadius: "6px", fontSize: "15px", fontWeight: 700 }}>
                  THAY VÌ: Tác nhân → Thuốc<br />
                  <span style={{ color: "#D96732" }}>BẠN XÂY: TÁC NHÂN → KHOẢNG DỪNG → PHẢN ỨNG MỚI → QUYẾT ĐỊNH</span>
                </div>
              </div>

              {/* PHẦN 6 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 6
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  XỬ LÝ NHỮNG TÌNH HUỐNG KHÓ
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Mọi thứ thường dễ hơn khi bạn ở nhà, tâm trạng tốt và chẳng có gì xảy ra. Nhưng cuộc sống thật còn có: Deadline, một ngày rất tệ, một buổi nhậu, bạn bè chìa thuốc, người xung quanh đang hút, một chuyến đi dài, hay một lúc cực kỳ stress.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>TRONG PHẦN NÀY, TUI SẼ GIÚP BẠN CHUẨN BỊ:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách xác định những tình huống nguy cơ cao nhất của riêng mình.</li>
                    <li>• Cách phản ứng khi được người khác mời thuốc.</li>
                    <li>• Cách xử lý khi xung quanh có nhiều người đang hút.</li>
                    <li>• Cách nhận ra khi đầu óc bắt đầu mặc cả: “Một điếu chắc không sao.”</li>
                    <li>• Cách chuẩn bị trước để không phải nghĩ cách xử lý từ con số 0 ngay giữa tình huống khó.</li>
                  </ul>
                </div>
                <div style={{ color: "#D96732", fontWeight: 700, fontSize: "15px" }}>
                  Bạn không kiểm soát được mọi thứ sẽ xảy ra. Nhưng bạn có thể chuẩn bị trước cách mình muốn phản ứng.
                </div>
              </div>

              {/* PHẦN 7 */}
              <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                  PHẦN 7
                </span>
                <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                  XÂY LẠI QUYỀN TỰ CHỦ
                </h3>
                <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                  Đây là phần kết nối tất cả những gì bạn đã học trước đó. Bởi vì mục tiêu cuối cùng không phải biến bạn thành một người <em>“ngày nào cũng phải cố nhịn thuốc”</em>, mà là từng bước giúp bạn có nhiều quyền lựa chọn hơn trước những tình huống từng khiến mình phản ứng gần như tự động.
                </p>
                <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                  <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>BẠN SẼ HỌC:</strong>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                    <li>• Cách ghi nhận những lần mình đã phản ứng khác với trước đây.</li>
                    <li>• Cách dùng những hành động nhỏ làm bằng chứng cho một cách sống mới.</li>
                    <li>• Cách không biến một lần trượt thành lý do để quay lại hoàn toàn.</li>
                    <li>• Cách tiếp tục điều chỉnh hệ thống của mình khi cuộc sống thay đổi.</li>
                  </ul>
                </div>
                <div style={{ background: "#252B25", color: "#F5F2E9", padding: "16px 20px", borderRadius: "8px", fontSize: "14px", lineHeight: 1.7 }}>
                  • Một ly cà phê mà bạn phản ứng khác ➔ <strong style={{ color: "#FAD08B" }}>Một bằng chứng.</strong><br />
                  • Một lần stress nhưng không lập tức tìm thuốc ➔ <strong style={{ color: "#FAD08B" }}>Một bằng chứng.</strong><br />
                  • Một lời mời thuốc mà bạn vẫn giữ được lựa chọn ➔ <strong style={{ color: "#FAD08B" }}>Một bằng chứng.</strong><br />
                  <span style={{ display: "block", marginTop: "8px", color: "#D96732", fontWeight: 800 }}>
                    Và đó là lúc việc bỏ thuốc trở thành quá trình: LẤY LẠI QUYỀN TỰ CHỦ VỚI CHÍNH LỰA CHỌN CỦA MÌNH.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. PRACTICAL TOOLS SUMMARY BANNER */}
          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "14px", color: "#F5F2E9", marginBottom: "48px" }}>
            <h3 style={{ fontSize: "22px", color: "#D96732", margin: "0 0 12px", fontWeight: 800, textTransform: "uppercase" }}>
              NGOÀI CÁC PHẦN HỌC CHÍNH...
            </h3>
            <p style={{ color: "#D5DFDB", fontSize: "16px", margin: "0 0 20px", lineHeight: 1.6 }}>
              Bạn còn nhận những công cụ thực hành để giúp những gì vừa học dễ được mang vào cuộc sống hơn:
            </p>
            <div style={{ display: "grid", gap: "12px", fontSize: "15px", color: "#F5F2E9" }}>
              <div style={{ background: "#171A18", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                <strong>SỔ THỰC HÀNH:</strong> Giúp bạn quan sát vòng lặp, ghi lại tác nhân, phản ứng và những gì đang xảy ra với chính mình.
              </div>
              <div style={{ background: "#171A18", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                <strong>BỘ THẺ ỨNG PHÓ NHANH:</strong> Dành cho những thời điểm bạn không cần thêm lý thuyết. Bạn chỉ cần biết: <em>“Bây giờ mình có thể làm gì?”</em>
              </div>
              <div style={{ background: "#171A18", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                <strong>NGHI THỨC CÀ PHÊ MỚI:</strong> Giúp bạn bắt đầu thay đổi một trong những liên kết quen thuộc nhất: Cà phê ➔ Thuốc lá.
              </div>
              <div style={{ background: "#171A18", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                <strong>DANH SÁCH NGHỈ XẢ STRESS:</strong> Thêm những lựa chọn cho những lúc thứ bạn thực sự đang cần là một khoảng nghỉ, một cách đổi trạng thái hoặc vài phút tách khỏi công việc.
              </div>
              <div style={{ background: "#171A18", padding: "14px 18px", borderRadius: "8px", borderLeft: "3px solid #D96732" }}>
                <strong>KỊCH BẢN XỬ LÝ TÌNH HUỐNG XÃ GIAO:</strong> Chuẩn bị trước cho những câu quen thuộc như: <em>“Làm điếu không?”, “Bỏ thật à?”, “Một điếu có sao đâu?”</em> để tới lúc tình huống xảy ra, bạn không phải bắt đầu nghĩ cách xử lý từ con số 0.
              </div>
            </div>
          </div>

          {/* 7. FINAL REFLECTION & TRANSITION TO OFFER */}
          <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "32px", borderRadius: "14px", textAlign: "center" }}>
            <h3 style={{ fontSize: "20px", color: "#D96732", margin: "0 0 12px", fontWeight: 800, textTransform: "uppercase" }}>
              ĐIỂM HAY NHẤT LÀ:
            </h3>
            <p style={{ fontSize: "16px", color: "#191B19", lineHeight: 1.7, margin: "0 0 16px" }}>
              Dù đây là lần đầu tiên bạn nghiêm túc muốn bỏ thuốc... hay bạn đã thử trước đây nhưng vẫn quay lại... bạn vẫn có thể bắt đầu từ chính nơi mình đang đứng.
            </p>
            <div style={{ background: "#252B25", color: "#F5F2E9", padding: "16px 20px", borderRadius: "8px", margin: "0 0 16px", fontWeight: 800, fontSize: "16px", letterSpacing: "0.05em" }}>
              HIỂU → QUAN SÁT → THỰC HÀNH → ÁP DỤNG
            </div>
            <p style={{ fontSize: "15px", color: "#74766F", lineHeight: 1.7, margin: "0 0 20px" }}>
              Không yêu cầu bạn phải hoàn hảo ngay từ đầu. Không yêu cầu bạn phải “có ý chí thép”. Điều quan trọng là bạn bắt đầu nhìn rõ hơn điều gì đang xảy ra với mình và có những lựa chọn cụ thể hơn để phản ứng khác đi.
            </p>
            <div style={{ color: "#191B19", fontSize: "18px", fontWeight: 800, margin: "0 0 12px", lineHeight: 1.5 }}>
              Vì vậy, câu hỏi tiếp theo không còn là: <em>“Liệu tôi có đủ ý chí để làm được không?”</em><br />
              Mà là: <span style={{ color: "#D96732", textTransform: "uppercase" }}>“CHƯƠNG TRÌNH NÀY CÓ PHẢI LÀ CÁCH TÔI MUỐN BẮT ĐẦU LẠI KHÔNG?”</span>
            </div>
            <span style={{ color: "#74766F", fontSize: "15px", fontStyle: "italic", fontWeight: 700 }}>
              Nếu câu trả lời là Có... hãy đọc tiếp để xem toàn bộ những gì bạn sẽ nhận được khi tham gia chương trình.
            </span>
          </div>

        </div>
      </section>

      {/* SECTION: KHI ĐĂNG KÝ HÔM NAY, BẠN CÒN NHẬN THÊM (3 QUYỀN LỢI DÀNH CHO BẠN) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              QUYỀN LỢI ĐÍNH KÈM
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#191B19", margin: "10px 0 20px", fontWeight: 800, lineHeight: 1.3 }}>
              KHI ĐĂNG KÝ HÔM NAY, BẠN CÒN NHẬN THÊM:
            </h2>
            
            <div style={{ fontSize: "17px", color: "#191B19", lineHeight: 1.8, textAlign: "left", background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "24px 28px", borderRadius: "12px", marginBottom: "32px" }}>
              <p style={{ margin: "0 0 10px", color: "#74766F", fontStyle: "italic" }}>Đến đây, có thể bạn đang nghĩ:</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 14px", display: "grid", gap: "6px", color: "#191B19", fontWeight: 600 }}>
                <li>“Nếu trong quá trình thực hiện tôi gặp một cơn thèm thuốc quá mạnh thì sao?”</li>
                <li>“Nếu tôi từng bỏ nhiều lần nhưng rồi lại hút lại thì sao?”</li>
                <li>“Nếu sau này chương trình có cập nhật thêm nội dung mới thì sao?”</li>
              </ul>
              <div style={{ background: "#252B25", color: "#FAD08B", padding: "14px 20px", borderRadius: "8px", fontWeight: 800, fontSize: "16px" }}>
                Không sao. Khi tham gia NON-SMOKER™, bạn không chỉ nhận chương trình chính. Bạn còn nhận thêm những quyền lợi giúp bạn có nhiều khả năng duy trì sự thay đổi hơn.
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gap: "24px" }}>
            {/* QUYỀN LỢI 1 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
              <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                QUYỀN LỢI 1
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                CỘNG ĐỒNG HỖ TRỢ ĐI KÈM
              </h3>
              <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                Một trong những lý do nhiều người bỏ thuốc thất bại không phải vì họ không biết thuốc lá có hại. Mà vì họ phải chiến đấu một mình. Khi tham gia NON-SMOKER™, bạn được tham gia cộng đồng những người đang trên cùng hành trình thay đổi.
              </p>
              <div style={{ background: "#F3F0E8", padding: "16px 20px", borderRadius: "8px", marginBottom: "14px" }}>
                <strong style={{ color: "#191B19", fontSize: "15px", display: "block", marginBottom: "8px" }}>TRONG QUÁ TRÌNH THỰC HIỆN:</strong>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 10px", display: "grid", gap: "6px", fontSize: "14px", color: "#74766F" }}>
                  <li>• Bạn có thể chia sẻ những khó khăn mình gặp phải.</li>
                  <li>• Đặt câu hỏi khi gặp tình huống khó.</li>
                  <li>• Học cách những người khác đang xử lý các thời điểm dễ tái hút như:</li>
                </ul>
                <div style={{ paddingLeft: "16px", display: "grid", gap: "4px", fontSize: "14px", color: "#191B19", fontWeight: 600 }}>
                  <span>✓ Sau khi uống cà phê.</span>
                  <span>✓ Khi căng thẳng công việc.</span>
                  <span>✓ Khi đi nhậu với bạn bè.</span>
                  <span>✓ Khi gặp áp lực hoặc mất kiểm soát cảm xúc.</span>
                </div>
              </div>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "16px" }}>
                Bạn không còn phải tự mò mẫm một mình.
              </div>
            </div>

            {/* QUYỀN LỢI 2 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
              <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                QUYỀN LỢI 2
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                CẬP NHẬT MIỄN PHÍ
              </h3>
              <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                NON-SMOKER™ sẽ tiếp tục được cập nhật dựa trên những trải nghiệm thực tế từ cộng đồng. Khi có: <strong>✓ Bài học mới • ✓ Công cụ mới • ✓ Cách xử lý tình huống mới</strong>, bạn sẽ được nhận cập nhật miễn phí.
              </p>
              <div style={{ background: "#252B25", color: "#F5F2E9", padding: "14px 18px", borderRadius: "6px", fontSize: "15px", fontWeight: 700 }}>
                Bạn không cần mua lại chương trình. Bạn đăng ký một lần. Và tiếp tục nhận những phiên bản cải tiến sau này.
              </div>
            </div>

            {/* QUYỀN LỢI 3 */}
            <div style={{ background: "#E5DFD2", border: "1px solid #D5CEBF", borderRadius: "12px", padding: "28px" }}>
              <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                QUYỀN LỢI 3
              </span>
              <h3 style={{ fontSize: "22px", color: "#191B19", margin: "12px 0 10px", fontWeight: 800 }}>
                TRUY CẬP LÂU DÀI
              </h3>
              <p style={{ color: "#191B19", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                Hành trình thay đổi thói quen không phải lúc nào cũng diễn ra theo một đường thẳng. Có những giai đoạn bạn làm rất tốt. Có những thời điểm công việc, áp lực hoặc cuộc sống khiến bạn dễ quay lại thói quen cũ. Vì vậy, NON-SMOKER™ cho phép bạn truy cập lâu dài.
              </p>
              <div style={{ background: "#F3F0E8", padding: "14px 18px", borderRadius: "8px", marginBottom: "14px", fontSize: "14px", color: "#74766F" }}>
                Bạn có thể: Xem lại bài học • Ôn lại những phần quan trọng • Quay lại hệ thống bất cứ khi nào cần.
              </div>
              <div style={{ color: "#D96732", fontWeight: 800, fontSize: "15px" }}>
                Mục tiêu không chỉ giúp bạn ngừng hút thuốc trong một khoảng thời gian. Mà là giúp bạn xây dựng một phiên bản mới: Một người không còn xem thuốc lá là một phần trong cuộc sống của mình.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: QUÀ TẶNG ĐẶC BIỆT KHI THAM GIA NON-SMOKER™ (2 GÓI QUÀ TẶNG ĐỈNH CAO) */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#171A18", color: "#F5F2E9", borderBottom: "1px solid #384238" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              BONUS ĐẶC BIỆT
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#F5F2E9", margin: "12px 0 14px", fontWeight: 800, lineHeight: 1.3 }}>
              QUÀ TẶNG ĐẶC BIỆT KHI THAM GIA NON-SMOKER™
            </h2>
            <p style={{ color: "#D5DFDB", fontSize: "17px", margin: 0, maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }}>
              Ngoài chương trình chính, bạn còn nhận thêm các công cụ thực hành giúp quá trình thay đổi dễ dàng hơn. Những công cụ này được thiết kế để xử lý những thời điểm khiến nhiều người quay lại thuốc lá nhất.
            </p>
          </div>

          <div style={{ display: "grid", gap: "32px" }}>
            {/* QUÀ TẶNG 1 */}
            <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "36px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>
                  QUÀ TẶNG 1
                </span>
                <span style={{ color: "#FAD08B", fontWeight: 800, fontSize: "18px" }}>
                  Trị giá: 1.500.000đ
                </span>
              </div>

              <h3 style={{ fontSize: "24px", color: "#F5F2E9", margin: "0 0 16px", fontWeight: 800 }}>
                HỆ THỐNG KIỂM SOÁT CƠN THÈM TRONG 7 NGÀY™
              </h3>

              <p style={{ color: "#D5DFDB", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                Rất nhiều người biết họ muốn bỏ thuốc. Nhưng vấn đề không nằm ở việc họ không hiểu tác hại. Vấn đề là một thời điểm nào đó... Cơn thèm xuất hiện. Một ngày stress. Một cuộc nhậu. Một ly cà phê quen thuộc. Và bộ não lại nói: <em>“Chỉ một điếu thôi.”</em> Rồi vòng lặp cũ quay trở lại.
              </p>

              <p style={{ color: "#F5F2E9", fontSize: "15px", lineHeight: 1.7, margin: "0 0 16px" }}>
                Bộ công cụ này giúp bạn hiểu: Cơn thèm thực sự đến từ đâu. Vì sao não bộ luôn tìm kiếm nicotine. Và quan trọng nhất: <strong>Bạn cần làm gì trong những phút đầu tiên khi ham muốn hút thuốc xuất hiện.</strong>
              </p>

              <div style={{ background: "#171A18", border: "1px solid #384238", padding: "20px 24px", borderRadius: "10px", marginBottom: "18px" }}>
                <strong style={{ color: "#D96732", fontSize: "15px", display: "block", marginBottom: "10px", textTransform: "uppercase" }}>
                  BÊN TRONG GỒM:
                </strong>
                <div style={{ display: "grid", gap: "10px", fontSize: "14px", color: "#D5DFDB" }}>
                  <div>
                    <strong style={{ color: "#F5F2E9" }}>✓ Bản Đồ Nhận Diện Trigger Cá Nhân:</strong> Phát hiện những tình huống khiến bạn dễ muốn hút nhất (Stress, Cà phê, Sau ăn, Nhậu, Lái xe, Giao tiếp xã hội...).
                  </div>
                  <div>
                    <strong style={{ color: "#F5F2E9" }}>✓ Protocol Xử Lý Cơn Thèm 5 Phút:</strong> Quy trình đơn giản giúp bạn vượt qua thời điểm khó khăn nhất mà không cần quay lại điếu thuốc.
                  </div>
                  <div>
                    <strong style={{ color: "#F5F2E9" }}>✓ Nhật Ký Theo Dõi Hành Trình Thay Đổi:</strong> Nhìn thấy sự tiến bộ mỗi ngày thay vì chỉ tập trung vào những lúc khó khăn.
                  </div>
                  <div>
                    <strong style={{ color: "#F5F2E9" }}>✓ Bộ Thay Thế Thói Quen Cũ:</strong> Xây dựng những hành vi mới để thay thế khoảnh khắc từng gắn với thuốc lá.
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(217, 103, 50, 0.15)", borderLeft: "4px solid #D96732", padding: "14px 18px", borderRadius: "6px", color: "#F5F2E9", fontSize: "15px" }}>
                <strong>KẾT QUẢ:</strong> Bạn không còn phải sống trong trạng thái: <em>“Hy vọng hôm nay mình không hút.”</em> Mà bắt đầu hiểu: <strong>“Tôi biết điều gì đang xảy ra trong cơ thể mình và tôi biết cách xử lý nó.”</strong>
              </div>
            </div>

            {/* QUÀ TẶNG 2 */}
            <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "36px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>
                  QUÀ TẶNG 2
                </span>
                <span style={{ color: "#FAD08B", fontWeight: 800, fontSize: "18px" }}>
                  Trị giá: 2.500.000đ
                </span>
              </div>

              <h3 style={{ fontSize: "24px", color: "#F5F2E9", margin: "0 0 16px", fontWeight: 800 }}>
                HỆ THỐNG XÂY DỰNG IDENTITY NGƯỜI KHÔNG HÚT THUỐC™
              </h3>

              <p style={{ color: "#D5DFDB", fontSize: "15px", lineHeight: 1.7, margin: "0 0 14px" }}>
                Đây là phần nhiều người bỏ qua. Họ cố bỏ thuốc bằng cách chiến đấu với bản thân mỗi ngày: <em>“Tôi phải nhịn.” “Tôi không được hút.” “Tôi đang cố bỏ thuốc.”</em> Nhưng sâu bên trong... Họ vẫn xem mình là: <strong>“Một người hút thuốc đang cố bỏ.”</strong> Và đó là lý do nhiều người quay lại.
              </p>

              <p style={{ color: "#F5F2E9", fontSize: "15px", lineHeight: 1.7, margin: "0 0 16px" }}>
                Bộ công cụ này giúp bạn xây dựng cách nhìn mới về bản thân: Không phải <em>“Tôi đang cố bỏ thuốc”</em>, mà là <strong>“Tôi là người không hút thuốc.”</strong>
              </p>

              <div style={{ background: "#171A18", border: "1px solid #384238", padding: "20px 24px", borderRadius: "10px", marginBottom: "18px" }}>
                <strong style={{ color: "#D96732", fontSize: "15px", display: "block", marginBottom: "10px", textTransform: "uppercase" }}>
                  BÊN TRONG GỒM:
                </strong>
                <div style={{ display: "grid", gap: "8px", fontSize: "14px", color: "#D5DFDB" }}>
                  <div>✓ Bài tập thay đổi nhận thức về thuốc lá.</div>
                  <div>✓ Hệ thống viết lại câu chuyện cá nhân.</div>
                  <div>✓ Bộ câu nhắc Identity mỗi ngày.</div>
                  <div>✓ Quy trình xây dựng thói quen mới thay thế thuốc lá.</div>
                </div>
              </div>

              <div style={{ background: "rgba(217, 103, 50, 0.15)", borderLeft: "4px solid #D96732", padding: "14px 18px", borderRadius: "6px", color: "#F5F2E9", fontSize: "15px" }}>
                <strong>KẾT QUẢ:</strong> Bạn không còn phải dùng ý chí để chống lại thuốc lá mỗi ngày. Bạn bắt đầu trở thành kiểu người: <strong>Không cần thuốc lá để giải tỏa. Không cần thuốc lá để tập trung. Không cần thuốc lá để cảm thấy mình ổn.</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: MAIN OFFER CARD & CHECKOUT (TỔNG GIÁ TRỊ, CAM KẾT, 2 LỰA CHỌN & CTA) */}
      <section id="offer" className="letter-offer" style={{ background: "#171A18", color: "#F5F2E9", padding: "90px 0" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          
          {/* MAIN OFFER CONTAINER */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", padding: "48px 36px", borderRadius: "20px", textAlign: "center", boxShadow: "0 25px 70px rgba(0,0,0,0.5)", marginBottom: "48px" }}>
            <span style={{ color: "#FAD08B", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "13px", fontWeight: 800 }}>
              TỔNG GIÁ TRỊ BẠN NHẬN ĐƯỢC
            </span>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "#F5F2E9", margin: "14px 0 24px", fontWeight: 900 }}>
              NON-SMOKER™ FULL PACKAGE
            </h2>

            {/* ITEM STACK */}
            <div style={{ textAlign: "left", background: "#171A18", border: "1px solid #384238", padding: "24px 28px", borderRadius: "12px", marginBottom: "28px", display: "grid", gap: "14px", fontSize: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #2B332B", paddingBottom: "10px" }}>
                <span style={{ color: "#F5F2E9", fontWeight: 700 }}>1. Chương trình NON-SMOKER™ (Tài khoản học Online)</span>
                <span style={{ color: "#A9B2AC" }}>Chính thức</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #2B332B", paddingBottom: "10px" }}>
                <span style={{ color: "#F5F2E9" }}>2. HỆ THỐNG KIỂM SOÁT CƠN THÈM TRONG 7 NGÀY™</span>
                <span style={{ color: "#FAD08B", fontWeight: 700 }}>1.500.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #2B332B", paddingBottom: "10px" }}>
                <span style={{ color: "#F5F2E9" }}>3. HỆ THỐNG XÂY DỰNG IDENTITY NGƯỜI KHÔNG HÚT THUỐC™</span>
                <span style={{ color: "#FAD08B", fontWeight: 700 }}>2.500.000đ</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#A9B2AC", fontSize: "14px" }}>
                <span>4. Quyền lợi: Cộng đồng hỗ trợ • Cập nhật miễn phí • Truy cập lâu dài</span>
                <span style={{ color: "#66735B", fontWeight: 700 }}>Bao gồm</span>
              </div>
            </div>

            <div style={{ background: "rgba(217, 103, 50, 0.15)", border: "1px solid #D96732", padding: "14px", borderRadius: "8px", marginBottom: "24px", color: "#FAD08B", fontWeight: 800, fontSize: "16px" }}>
              CHỈ RIÊNG QUÀ TẶNG ĐÁ GIÁ TRỊ: 4.000.000Đ
            </div>

            <p style={{ color: "#D5DFDB", fontSize: "16px", margin: "0 0 8px" }}>
              Nhưng hôm nay... Bạn nhận toàn bộ NON-SMOKER™ Cùng tất cả quyền lợi đi kèm:
            </p>

            <div style={{ fontSize: "clamp(36px, 5vw, 54px)", color: "#D96732", fontWeight: 900, margin: "0 0 24px" }}>
              Chỉ với: 497.000đ
            </div>

            <a href="mailto:?subject=Đăng ký NON-SMOKER™" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", maxWidth: "600px", width: "100%", padding: "18px 24px", background: "#D96732", color: "white", fontWeight: 900, fontSize: "clamp(15px, 2.3vw, 19px)", textDecoration: "none", borderRadius: "8px", boxShadow: "0 12px 35px rgba(217,103,50,0.4)", marginBottom: "14px", textTransform: "uppercase", lineHeight: 1.35, boxSizing: "border-box", textAlign: "center" }}>
              <span>[ TÔI MUỐN TRỞ THÀNH <span style={{ whiteSpace: "nowrap" }}>NGƯỜI KHÔNG HÚT THUỐC ]</span></span>
            </a>

            <div style={{ color: "#A9B2AC", fontSize: "13px", letterSpacing: "0.04em" }}>
              Thanh toán một lần duy nhất · Truy cập ngay lập tức · Không phí ẩn
            </div>
          </div>

          {/* CAM KẾT TRẢI NGHIỆM */}
          <div style={{ background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "14px", marginBottom: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px" }}>🛡️</span>
              <h3 style={{ color: "#D96732", fontSize: "20px", margin: 0, fontWeight: 800, textTransform: "uppercase" }}>
                CAM KẾT TRẢI NGHIỆM
              </h3>
            </div>
            <p style={{ color: "#D5DFDB", fontSize: "16px", lineHeight: 1.7, margin: "0 0 12px" }}>
              Bạn không cần tin ngay. Bạn có thể bắt đầu trải nghiệm hệ thống. Nếu bạn nhận ra chương trình không phù hợp với mình, bạn có thể yêu cầu hoàn tiền theo chính sách cam kết.
            </p>
            <p style={{ color: "#F5F2E9", fontSize: "15px", fontWeight: 700, margin: 0 }}>
              Bởi mục tiêu của NON-SMOKER™ không phải là bán cho bạn một khóa học. Mục tiêu là giúp bạn thật sự bước ra khỏi vòng lặp đã kéo dài nhiều năm.
            </p>
          </div>

          {/* BẠN CÓ 2 LỰA CHỌN (CLOSING OPTION BOX) */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", padding: "36px 30px", borderRadius: "16px", marginBottom: "48px" }}>
            <h3 style={{ fontSize: "24px", color: "#D96732", margin: "0 0 20px", fontWeight: 800, textAlign: "center", textTransform: "uppercase" }}>
              BẠN CÓ 2 LỰA CHỌN:
            </h3>

            <div style={{ display: "grid", gap: "20px", fontSize: "16px" }}>
              <div style={{ background: "#171A18", borderLeft: "4px solid #A94725", padding: "20px", borderRadius: "8px", color: "#A9B2AC" }}>
                <strong style={{ color: "#A94725", display: "block", marginBottom: "8px", fontSize: "17px" }}>LỰA CHỌN 1:</strong>
                Tiếp tục nói: <em>“Đợi lúc nào bớt stress rồi bỏ.”</em>, <em>“Mai mình bỏ.”</em>, <em>“Điếu cuối cùng thôi.”</em>... Và một năm nữa vẫn đang ở đúng vị trí hiện tại.
              </div>

              <div style={{ background: "#171A18", borderLeft: "4px solid #D96732", padding: "20px", borderRadius: "8px", color: "#F5F2E9" }}>
                <strong style={{ color: "#D96732", display: "block", marginBottom: "8px", fontSize: "17px" }}>LỰA CHỌN 2:</strong>
                Bắt đầu xây dựng một phiên bản mới của chính mình. Một người: <strong>Không còn phụ thuộc vào điếu thuốc • Có nhiều năng lượng hơn • Kiểm soát bản thân tốt hơn • Và tự hào vì cuối cùng mình đã làm được điều từng nghĩ là rất khó.</strong>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <h4 style={{ fontSize: "18px", color: "#F5F2E9", margin: "0 0 16px", fontWeight: 800, textTransform: "uppercase" }}>
                BẮT ĐẦU HÀNH TRÌNH TRỞ THÀNH NON-SMOKER™ HÔM NAY
              </h4>
              <a href="mailto:?subject=Đăng ký NON-SMOKER™" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", maxWidth: "560px", width: "100%", padding: "18px 24px", background: "#D96732", color: "white", fontWeight: 900, fontSize: "clamp(15px, 2.3vw, 19px)", textDecoration: "none", borderRadius: "8px", boxShadow: "0 12px 35px rgba(217,103,50,0.4)", textTransform: "uppercase", lineHeight: 1.35, boxSizing: "border-box", textAlign: "center" }}>
                <span>[ TÔI MUỐN TRỞ THÀNH <span style={{ whiteSpace: "nowrap" }}>NGƯỜI KHÔNG HÚT THUỐC ]</span></span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: VIỆC QUYẾT ĐỊNH HÔM NAY LÀ QUAN TRỌNG & CAM KẾT CỦA TUI */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#F3F0E8", borderBottom: "1px solid #E5DFD2" }}>
        <div className="letter-wrap" style={{ maxWidth: "800px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              THỜI ĐIỂM QUAN TRỌNG
            </span>
            <h2 style={{ fontSize: "clamp(24px, 3.8vw, 38px)", color: "#191B19", margin: "10px 0 20px", fontWeight: 800, lineHeight: 1.3 }}>
              VIỆC QUYẾT ĐỊNH HÔM NAY LÀ QUAN TRỌNG
            </h2>
            <div style={{ background: "#252B25", color: "#FAD08B", padding: "18px 22px", borderRadius: "10px", fontWeight: 800, fontSize: "16px", lineHeight: 1.6, marginBottom: "24px" }}>
              ĐÂY CHỈ LÀ GIÁ & QUYỀN LỢI TRONG THỜI GIAN NON-SMOKER™ MỚI RA MẮT & TUI KHÔNG CHẮC SẼ GIỮ CHÚNG BAO LÂU.
            </div>
            
            <div style={{ fontSize: "17px", color: "#191B19", lineHeight: 1.8, textAlign: "left", background: "#E5DFD2", border: "1px solid #D5CEBF", padding: "28px", borderRadius: "12px", display: "grid", gap: "14px" }}>
              <p style={{ margin: 0 }}>
                Phiên bản hiện tại của NON-SMOKER™ đang đi kèm đầy đủ các quyền lợi và công cụ thực hành ở trên. Tui đang tiếp tục cập nhật nội dung, bổ sung công cụ và hoàn thiện chương trình theo từng giai đoạn.
              </p>
              <p style={{ margin: 0 }}>
                Vì vậy, tui không chắc những quyền lợi hiện tại có còn được giữ nguyên trong tương lai hay không. Nếu bạn đăng ký ở thời điểm hiện tại, bạn sẽ được giữ trọn quyền lợi của phiên bản này.
              </p>
              <p style={{ margin: 0, fontWeight: 700, color: "#D96732" }}>
                Bạn không chỉ nhận được chương trình chính. Bạn còn nhận thêm những công cụ giúp bạn hiểu rõ hơn về hành vi hút thuốc, xử lý cơn thèm và từng bước xây dựng một lối sống không còn phụ thuộc vào thuốc lá.
              </p>
              <div style={{ background: "#F3F0E8", padding: "14px 18px", borderRadius: "8px", fontWeight: 800, color: "#191B19", textAlign: "center" }}>
                Vì vậy, nếu bạn thấy NON-SMOKER™ phù hợp với mình... Đây là thời điểm tốt để bắt đầu.
              </div>
            </div>
          </div>

          {/* CAM KẾT CỦA TUI */}
          <div style={{ background: "#171A18", color: "#F5F2E9", border: "2px solid #D96732", borderRadius: "16px", padding: "36px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <span style={{ fontSize: "32px", display: "block", marginBottom: "8px" }}>🛡️</span>
              <h3 style={{ fontSize: "24px", color: "#D96732", margin: 0, fontWeight: 800, textTransform: "uppercase" }}>
                CAM KẾT CỦA TUI
              </h3>
            </div>

            <div style={{ fontSize: "16px", lineHeight: 1.8, color: "#D5DFDB", display: "grid", gap: "14px" }}>
              <p style={{ margin: 0, fontSize: "18px", color: "#F5F2E9", fontWeight: 700, textAlign: "center" }}>
                Tui hoàn tiền 100% nếu trong thời gian đầu bạn cảm thấy NON-SMOKER™ không phù hợp với mình.
              </p>
              <p style={{ margin: 0, textAlign: "center", color: "#A9B2AC" }}>
                Bạn chỉ cần nhắn cho tui. Không cần giải thích dài dòng. Không phù hợp, tui hoàn tiền lại cho bạn.
              </p>
              <p style={{ margin: 0 }}>
                Tui đưa ra cam kết này vì tui tin vào giá trị của hệ thống NON-SMOKER™ và muốn mọi người có cơ hội trải nghiệm trước khi quyết định tiếp tục.
              </p>

              <div style={{ background: "#252B25", borderLeft: "4px solid #D96732", padding: "18px 22px", borderRadius: "8px", margin: "8px 0", color: "#F5F2E9" }}>
                <strong style={{ color: "#FAD08B", display: "block", marginBottom: "8px", fontSize: "17px" }}>
                  TUI KHÔNG THỂ BỎ THUỐC THAY BẠN:
                </strong>
                Nhưng tui đã thiết kế một hệ thống rõ ràng để bạn biết: <strong>Cần bắt đầu từ đâu • Cần thay đổi điều gì • Cần làm gì khi gặp những thời điểm dễ quay lại thuốc lá.</strong>
              </div>

              <p style={{ margin: 0, color: "#F5F2E9", fontWeight: 700, textAlign: "center" }}>
                Điều này giống như: Bạn cứ bắt đầu trước ➔ Áp dụng ➔ Quan sát sự thay đổi ➔ Và chỉ giữ lại chương trình khi bạn thấy nó thật sự có giá trị với mình.
              </p>
              <div style={{ textAlign: "center", fontSize: "20px", color: "#D96732", fontWeight: 900 }}>
                VẬY THÌ CUỐI CÙNG... BẠN KHÔNG MẤT GÌ CẢ.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION: CÂU HỎI THƯỜNG GẶP (8 CÂU HỎI FAQ) + HỖ TRỢ ZALO */}
      <section className="letter-section" style={{ padding: "90px 0", background: "#171A18", color: "#F5F2E9", borderBottom: "1px solid #384238" }}>
        <div className="letter-wrap" style={{ maxWidth: "840px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "44px" }}>
            <span style={{ color: "#D96732", fontWeight: 800, fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              GIẢI ĐÁP THẮC MẮC
            </span>
            <h2 style={{ fontSize: "clamp(26px, 3.8vw, 40px)", color: "#F5F2E9", margin: "10px 0 16px", fontWeight: 900 }}>
              CÂU HỎI THƯỜNG GẶP NHẤT
            </h2>
            <p style={{ color: "#A9B2AC", fontSize: "16px", margin: 0 }}>
              Tui trả lời một số câu hỏi thường gặp nhất ở bên dưới.
            </p>
          </div>

          {/* FAQ CARDS GRID */}
          <div style={{ display: "grid", gap: "20px", marginBottom: "48px" }}>
            
            {/* FAQ 1 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 1</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>NON-SMOKER™ có gì khác so với những nội dung bỏ thuốc miễn phí trên mạng không?</h3>
              </div>
              <div style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, display: "grid", gap: "10px" }}>
                <strong style={{ color: "#FAD08B" }}>Có. Khác ở 2 điểm chính:</strong>
                <div>
                  <strong style={{ color: "#F5F2E9" }}>1. Lộ trình đầy đủ, rõ ràng:</strong> Hiện nay có rất nhiều nội dung mảnh ghép nhỏ. Bạn biết nên bỏ thuốc nhưng khi gặp tình huống thật (stress, nhậu, cà phê...) bạn vẫn không biết làm gì tiếp theo. NON-SMOKER™ cho bạn lộ trình rõ ràng từng bước.
                </div>
                <div>
                  <strong style={{ color: "#F5F2E9" }}>2. Có hệ thống hỗ trợ bên cạnh:</strong> Tham gia cộng đồng NON-SMOKER™ cùng những người trên hành trình thay đổi để đặt câu hỏi và chia sẻ khó khăn.
                </div>
                <div style={{ background: "#171A18", padding: "12px 16px", borderRadius: "6px", color: "#F5F2E9", fontWeight: 700, borderLeft: "3px solid #D96732" }}>
                  Tóm lại: Nội dung miễn phí giúp bạn biết thêm thông tin. Còn NON-SMOKER™ giúp bạn có một hệ thống rõ ràng để bắt đầu thay đổi.
                </div>
              </div>
            </div>

            {/* FAQ 2 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 2</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>Nếu tôi bận thì sao? Tôi có bỏ lỡ điều gì không?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Không.</strong> NON-SMOKER™ được thiết kế để bạn có thể học theo tốc độ của mình. Không cần tham gia khung giờ cố định. Toàn bộ nội dung đã chuẩn bị sẵn để bạn học khi rảnh, dừng khi bận và xem lại bất cứ lúc nào.
              </p>
            </div>

            {/* FAQ 3 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 3</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>Mất bao lâu để hoàn thành NON-SMOKER™?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                Điều này phụ thuộc vào tốc độ của mỗi người. Giá trị nằm ở việc bạn quan sát thói quen, áp dụng công cụ, thử những cách phản ứng mới và điều chỉnh trong thực tế. Bạn có thể học theo tốc độ phù hợp với mình.
              </p>
            </div>

            {/* FAQ 4 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 4</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>Tôi đã hút thuốc rất nhiều năm rồi, NON-SMOKER™ có phù hợp với tôi không?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Có thể phù hợp.</strong> Bởi vấn đề không chỉ ở thời gian hút bao lâu, mà ở việc thuốc lá đã trở thành vòng lặp gắn với cảm xúc, hoàn cảnh và thói quen. NON-SMOKER™ giúp bạn nhìn ra những vòng lặp đó để từng bước thay đổi.
              </p>
            </div>

            {/* FAQ 5 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 5</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>Tôi đã từng bỏ thuốc nhiều lần nhưng đều thất bại. NON-SMOKER™ có dành cho tôi không?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Có.</strong> Điều đó không có nghĩa bạn không thể thay đổi, mà cho thấy bạn chưa xử lý được những yếu tố khiến mình quay lại. NON-SMOKER™ giúp bạn chuẩn bị trước những tình huống dễ mất kiểm soát thay vì chỉ dựa vào ý chí.
              </p>
            </div>

            {/* FAQ 6 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 6</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>NON-SMOKER™ có phải là thuốc hoặc phương pháp thay thế nicotine không?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Không.</strong> Đây là chương trình tập trung vào phần hành vi phía sau việc hút thuốc (thói quen, môi trường, cảm xúc). Nếu bạn đang sử dụng thuốc/miếng dán theo chỉ định y tế, bạn nên tiếp tục tuân thủ hướng dẫn.
              </p>
            </div>

            {/* FAQ 7 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 7</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>Nếu trong quá trình học tôi vẫn còn thèm thuốc thì sao?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Điều đó hoàn toàn bình thường.</strong> Mục tiêu không phải là khiến bạn không bao giờ thèm nữa, mà là giúp bạn biết cách xử lý khi cơn thèm xuất hiện để không lập tức quay lại hành vi cũ.
              </p>
            </div>

            {/* FAQ 8 */}
            <div style={{ background: "#252B25", border: "1px solid #384238", borderRadius: "14px", padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <span style={{ background: "#D96732", color: "#FFFFFF", fontSize: "12px", fontWeight: 800, padding: "4px 10px", borderRadius: "4px" }}>CÂU HỎI 8</span>
                <h3 style={{ fontSize: "18px", color: "#F5F2E9", margin: 0, fontWeight: 800 }}>NON-SMOKER™ có đảm bảo tôi chắc chắn bỏ thuốc hoàn toàn không?</h3>
              </div>
              <p style={{ fontSize: "15px", color: "#D5DFDB", lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: "#FAD08B" }}>Không.</strong> NON-SMOKER™ không bán lời hứa thiếu thực tế, mà giúp bạn có một cách hiểu đúng và một hệ thống rõ ràng để thực hành. Tui không thể thay đổi thay bạn, nhưng tui có thể giúp bạn có công cụ để bắt đầu.
              </p>
            </div>

          </div>

          {/* ZALO SUPPORT CARD WITH QR IMAGE */}
          <div style={{ background: "#252B25", border: "2px solid #D96732", borderRadius: "16px", padding: "36px", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontSize: "22px", color: "#F5F2E9", margin: "0 0 12px", fontWeight: 800 }}>
              BẠN VẪN CÒN CÂU HỎI CHƯA ĐƯỢC GIẢI ĐÁP?
            </h3>
            <p style={{ color: "#D5DFDB", fontSize: "16px", margin: "0 0 24px" }}>
              Hãy thoải mái liên hệ với Đạt & đội ngũ hỗ trợ qua Zalo bằng cách quét mã QR bên dưới:
            </p>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <img
                src="/images/zalo_contact_qr.png"
                alt="Nguyễn Quốc Đạt - Danh thiếp Zalo Hỗ trợ"
                style={{
                  maxWidth: "320px",
                  width: "100%",
                  borderRadius: "14px",
                  border: "1px solid #384238",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.5)"
                }}
              />
            </div>

            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 28px", background: "#0068FF", color: "white", fontWeight: 800, fontSize: "16px", textDecoration: "none", borderRadius: "8px", boxShadow: "0 8px 20px rgba(0,104,255,0.3)" }}>
              BẤM VÀO ĐÂY ĐỂ CHÁT ZALO HỖ TRỢ →
            </a>
          </div>

        </div>
      </section>

      {/* SECTION: NẾU BẠN ĐANG ĐỌC ĐẾN ĐÂY... (FINAL CLOSING & CTA) */}
      <section className="letter-closing" style={{ background: "#171A18", color: "#F5F2E9", padding: "100px 0" }}>
        <div className="letter-wrap" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", color: "#D96732", margin: "0 0 24px", fontWeight: 900, textTransform: "uppercase" }}>
            NẾU BẠN ĐANG ĐỌC ĐẾN ĐÂY...
          </h2>

          <div style={{ fontSize: "18px", color: "#D5DFDB", lineHeight: 1.8, textAlign: "left", background: "#252B25", border: "1px solid #384238", padding: "32px", borderRadius: "14px", marginBottom: "40px", display: "grid", gap: "14px" }}>
            <p style={{ margin: 0 }}>
              Có thể bạn đã từng nghĩ: <em>“Mai mình bỏ.”</em>
            </p>
            <p style={{ margin: 0 }}>
              Có thể bạn đã từng thử nhiều lần.
            </p>
            <p style={{ margin: 0 }}>
              Có thể bạn từng nghĩ: <em>“Chắc mình hút lâu quá rồi.”</em>
            </p>
            <p style={{ margin: "8px 0 0", color: "#F5F2E9", fontWeight: 700, fontSize: "19px" }}>
              Nhưng nếu bạn vẫn đang đọc đến đây... <span style={{ color: "#FAD08B" }}>Có một phần trong bạn vẫn muốn thay đổi.</span>
            </p>
            <p style={{ margin: 0 }}>
              NON-SMOKER™ không yêu cầu bạn trở thành một người hoàn hảo ngay lập tức. Chỉ cần bắt đầu bằng một quyết định nhỏ: <strong>Cho bản thân một cơ hội để thử một cách khác.</strong>
            </p>
          </div>

          <div style={{ margin: "0 0 32px" }}>
            <h3 style={{ fontSize: "28px", color: "#F5F2E9", margin: "0 0 8px", fontWeight: 800 }}>
              HÀNH TRÌNH NON-SMOKER™
            </h3>
            <div style={{ color: "#D96732", fontWeight: 900, fontSize: "32px", marginBottom: "20px" }}>
              CHỈ VỚI: 497.000Đ
            </div>
            <a href="mailto:?subject=Đăng ký NON-SMOKER™" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", maxWidth: "600px", width: "100%", padding: "20px 28px", background: "#D96732", color: "white", fontWeight: 900, fontSize: "clamp(15px, 2.3vw, 19px)", textDecoration: "none", borderRadius: "8px", boxShadow: "0 12px 35px rgba(217,103,50,0.4)", textTransform: "uppercase", lineHeight: 1.35, boxSizing: "border-box", textAlign: "center" }}>
              <span>[ TÔI MUỐN TRỞ THÀNH <span style={{ whiteSpace: "nowrap" }}>NGƯỜI KHÔNG HÚT THUỐC ]</span></span>
            </a>
          </div>

          <p style={{ color: "#74766F", fontSize: "14px", margin: 0 }}>
            Không cần hứa với ai. Không cần đăng lên Facebook. Không cần đợi thứ Hai. Chỉ cần bắt đầu từ chính hôm nay.
          </p>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111311", color: "#74766F", padding: "40px 0", fontSize: "12px" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <b style={{ color: "#A9B2AC" }}>NON-SMOKER™ — HỆ THỐNG LẤY LẠI QUYỀN TỰ CHỦ</b>
          <p style={{ margin: "10px 0" }}>
            Chương trình cung cấp nội dung giáo dục về hành vi, tác nhân và lối sống. Không thay thế tư vấn, chẩn đoán hoặc điều trị y tế chuyên môn.
          </p>
          <span>© 2026 NON-SMOKER™. All rights reserved.</span>
        </div>
      </footer>

      {/* MINIMALIST MOBILE & DESKTOP STICKY BAR */}
      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`} style={{ background: "#171A18", borderColor: "#384238" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "11px", color: "#A9B2AC", fontWeight: 600 }}>NON-SMOKER™</span>
          <b style={{ fontSize: "16px", color: "#D96732" }}>497.000đ</b>
        </div>
        <a href="#offer" style={{ background: "#D96732", color: "white", padding: "10px 18px", fontSize: "12px", fontWeight: 800, textDecoration: "none", borderRadius: "4px" }}>BẮT ĐẦU NGAY →</a>
      </div>
    </div>
  );
}
