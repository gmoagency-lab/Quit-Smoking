"use client";

import { useEffect, useState } from "react";

const days = [
  {
    n: 1,
    label: "NGÀY 1 — GIẢI MÃ VÒNG LẶP HÚT THUỐC™",
    title: "Nhìn rõ điều gì đang khiến anh tiếp tục hút",
    points: [
      "Những thời điểm mình thường hút.",
      "Các tác nhân thường xuyên lặp lại.",
      "Nhu cầu thực sự phía sau điếu thuốc.",
      "Nguyên nhân khiến những lần cai trước bị đứt gãy.",
    ],
    output: "Bản Đồ Vòng Lặp Hút Thuốc™—cho thấy vòng lặp của riêng anh đang vận hành như thế nào.",
  },
  {
    n: 2,
    label: "NGÀY 2 — IDENTITY SHIFT KHÔNG KHÓI THUỐC™",
    title: "Tách hành vi hút thuốc khỏi định nghĩa về bản thân",
    points: [
      "Những nhãn dán đang giữ mình trong vai trò 'người nghiện'.",
      "Định danh hiện tại và con người anh muốn trở thành.",
      "Những bằng chứng hành vi cần tạo để thu hẹp khoảng cách giữa hai trạng thái.",
    ],
    shiftText: "Anh bắt đầu chuyển từ: 'Tôi là người nghiện đang cố bỏ.' sang: 'Tôi đang học cách sống và vận hành mà không cần thuốc lá.'",
    output: "Bản Thiết Kế Identity Shift™.",
  },
  {
    n: 3,
    label: "NGÀY 3 — CHUẨN BỊ THỂ CHẤT™",
    title: "Chuẩn bị cơ thể và nhịp sống cho quá trình thay đổi",
    points: [
      "Giấc ngủ và mức năng lượng.",
      "Dinh dưỡng và lượng caffeine.",
      "Rượu bia.",
      "Vận động, nghỉ ngơi và phục hồi.",
    ],
    note: "Mục tiêu là nhận ra những thời điểm cơ thể mệt mỏi, thiếu ngủ hoặc quá tải khiến anh dễ quay lại với thuốc.",
    output: "Kế Hoạch Phục Hồi Cá Nhân™.",
  },
  {
    n: 4,
    label: "NGÀY 4 — THIẾT KẾ LẠI TÁC NHÂN™",
    title: "Thay đổi môi trường và chuẩn bị phản ứng mới",
    formula: "Tác nhân → Phản ứng cũ → Nhu cầu thật → Phản ứng thay thế → Kế hoạch dự phòng",
    scenarios: [
      "Bạn bè mời thuốc.",
      "Đồng nghiệp rủ hút.",
      "Đi nhậu hoặc gặp đối tác.",
      "Cảm thấy ngại vì mình khác với nhóm.",
    ],
    output: "Bản Đồ Thay Thế Tác Nhân™.",
  },
  {
    n: 5,
    label: "NGÀY 5 — LÀM CHỦ CƠN THÈM VÀ TRẠNG THÁI™",
    title: "Xây quy trình phản ứng cho những thời điểm khó khăn",
    situations: [
      "Muốn hút sau khi ăn.",
      "Muốn hút bên ly cà phê.",
      "Căng thẳng sau cuộc họp.",
      "Bồn chồn khi làm việc.",
      "Cần một khoảng nghỉ.",
      "Đột nhiên xuất hiện cơn thèm.",
    ],
    output: "Quy Trình Xử Lý Cơn Thèm Và Trạng Thái™.",
  },
  {
    n: 6,
    label: "NGÀY 6 — KẾ HOẠCH KHÔNG KHÓI THUỐC 21 NGÀY™",
    title: "Biến tấm bản đồ thành kế hoạch hành động",
    steps: [
      "Chọn thời điểm bắt đầu phù hợp.",
      "Thiết lập công cụ theo dõi.",
      "Chọn người đồng hành.",
      "Chuẩn bị cho những tình huống khó.",
      "Ghi nhận bằng chứng cho định danh mới.",
      "Xác định khi nào cần tìm hỗ trợ chuyên môn.",
    ],
    output: "Kế Hoạch Hành Động Không Khói Thuốc 21 Ngày™.",
  },
  {
    n: 7,
    label: "NGÀY 7 — PHÒNG NGỪA TÁI HÚT™",
    title: "Biết cách phục hồi nếu xảy ra một lần trượt",
    distinctions: [
      "Một lần trượt.",
      "Một chuỗi tái hút.",
      "Một sự cố hành vi.",
      "Một kết luận tiêu cực về bản thân.",
    ],
    action: "Anh sẽ chuẩn bị dấu hiệu cảnh báo sớm, tình huống nguy cơ cao và cách quay lại hệ thống trong vòng 24 giờ.",
    output: "Bản Đồ Phòng Ngừa Tái Hút™ và Quy Trình Phục Hồi Trong 24 Giờ™.",
  },
];

const deliverables = [
  {
    title: "7 video hướng dẫn",
    story: "Mỗi ngày tập trung vào một vấn đề và một kết quả cụ thể—không kéo dài bằng kiến thức lan man.",
  },
  {
    title: "7 sổ bài tập thực hành",
    story: "Anh không chỉ xem nội dung. Anh trực tiếp hoàn thành tấm bản đồ cai thuốc của riêng mình.",
  },
  {
    title: "Bản Thiết Kế Identity Shift™",
    story: "Giúp anh xác định định danh hiện tại, định danh hướng tới và những bằng chứng cần tạo.",
  },
  {
    title: "Bảng Theo Dõi Không Khói Thuốc 21 Ngày™",
    story: "Giúp anh theo dõi tác nhân, cơn thèm, năng lượng, giấc ngủ, hành vi và tiến độ hằng ngày.",
  },
  {
    title: "Thẻ Ứng Phó Cơn Thèm Khẩn Cấp™",
    story: "Hướng dẫn phản ứng nhanh khi cơn thèm bất ngờ xuất hiện.",
  },
  {
    title: "Kịch Bản Từ Chối Thuốc Trong Giao Tiếp™",
    story: "Mẫu câu từ chối trong các tình huống bạn bè, đồng nghiệp, đối tác hoặc người trong cuộc nhậu mời thuốc.",
  },
  {
    title: "Quy Trình Buổi Sáng Không Khói Thuốc™",
    story: "Dành cho người thường hút sau khi thức dậy, uống cà phê hoặc bắt đầu làm việc.",
  },
  {
    title: "Cẩm Nang Xử Lý Tình Huống Nguy Cơ Cao™",
    story: "Kịch bản ứng phó với căng thẳng, thiếu ngủ, áp lực công việc, tranh cãi, công tác, nhậu và môi trường có nhiều người hút.",
  },
  {
    title: "Bản Đồ Phòng Ngừa Tái Hút™",
    story: "Giúp anh nhận diện nguy cơ và quay lại hệ thống nếu xảy ra một lần trượt.",
  },
];

const sixLayers = [
  { n: "1", name: "Định danh", desc: "Anh đang nhìn nhận mình như thế nào trong mối quan hệ với thuốc lá?" },
  { n: "2", name: "Tác nhân kích hoạt", desc: "Điều gì thường xảy ra ngay trước khi anh muốn hút?" },
  { n: "3", name: "Trạng thái và nhu cầu", desc: "Anh thực sự cần nicotine—hay đang cần nghỉ ngơi, bình tĩnh, tập trung, kết nối hoặc thoát khỏi một trạng thái khó chịu?" },
  { n: "4", name: "Phản ứng hành vi", desc: "Anh đang tự động làm gì mỗi khi tác nhân quen thuộc xuất hiện?" },
  { n: "5", name: "Môi trường", desc: "Những người, địa điểm, đồ vật và nghi thức nào đang củng cố hành vi hút thuốc?" },
  { n: "6", name: "Bằng chứng mới", desc: "Anh cần thực hiện những hành động nào để chứng minh mình có thể sống và vận hành mà không lệ thuộc vào thuốc?" },
];

const changeSteps = [
  "Nhìn rõ vòng lặp",
  "Tách hành vi khỏi định danh",
  "Chuẩn bị thể chất và nhịp sống",
  "Thiết kế lại tác nhân kích hoạt",
  "Xây quy trình xử lý cơn thèm",
  "Lập kế hoạch hành động 21 ngày",
  "Phòng ngừa và phục hồi sau lần trượt",
];

const fitList = [
  "Anh đã hút thuốc trong nhiều năm.",
  "Anh từng cai được một thời gian nhưng sau đó quay lại.",
  "Anh thường hút khi căng thẳng, uống cà phê, làm việc, nhậu hoặc giao tiếp.",
  "Anh không còn thực sự thích hút nhưng vẫn cảm thấy mình cần nó.",
  "Anh thất vọng vì nhiều lần không giữ được lời hứa với chính mình.",
  "Anh muốn một hệ thống thực hành rõ ràng thay vì nghe thêm những lời cảnh báo quen thuộc.",
];

const unfitList = [
  "Anh chưa có ý định thay đổi hoặc chỉ tham gia vì bị người khác ép.",
  "Anh chỉ muốn một mẹo nhanh nhưng không sẵn sàng quan sát và thực hành.",
  "Anh đang tìm kiếm chẩn đoán hoặc điều trị y khoa thay cho chương trình hành vi.",
];

const faqs = [
  [
    "Tôi đã hút quá lâu rồi, chương trình có phù hợp không?",
    "Chương trình được thiết kế cho người đã hút nhiều năm, từng muốn cai hoặc đã cai một thời gian nhưng quay lại. Anh không cần bắt đầu bằng niềm tin tuyệt đối rằng mình sẽ thành công. Anh cần bắt đầu bằng sự sẵn sàng quan sát trung thực vòng lặp hiện tại và hoàn thành từng phần trong bản đồ.",
  ],
  [
    "Tôi sợ mình không đủ ý chí.",
    "Chương trình không được xây quanh việc yêu cầu anh gồng ý chí liên tục. Anh sẽ thiết kế môi trường, phản ứng thay thế, khoảng nghỉ, quy trình xử lý cơn thèm và kế hoạch duy trì. Mục tiêu là giảm số thời điểm anh phải phụ thuộc vào quyết tâm tức thời.",
  ],
  [
    "Tôi hút để giảm căng thẳng. Không hút thì làm sao chịu được?",
    "Chương trình không yêu cầu anh giả vờ rằng căng thẳng không tồn tại. Anh sẽ xác định nhu cầu thật phía sau điếu thuốc và chuẩn bị phản ứng thay thế phù hợp với từng tình huống. Nếu thuốc từng là cách duy nhất giúp anh tạm nghỉ hoặc điều chỉnh trạng thái, chúng ta cần xây một cách vận hành mới—không chỉ lấy đi điếu thuốc.",
  ],
  [
    "Tôi có phải ngừng hút ngay từ ngày đầu tiên không?",
    "Không phải tất cả mọi người đều có cùng mức độ sẵn sàng hoặc lệ thuộc. Anh bắt đầu bằng việc đánh giá tình trạng hiện tại, quan sát vòng lặp, chuẩn bị môi trường và xây kế hoạch hành động phù hợp. Nếu mức độ lệ thuộc cao hoặc có vấn đề sức khỏe, anh nên kết hợp hỗ trợ từ bác sĩ, dược sĩ hoặc chuyên gia y tế.",
  ],
  [
    "Chương trình có thay thế bác sĩ hoặc thuốc hỗ trợ không?",
    "Không. Chương trình tập trung vào định danh, hành vi, tác nhân, môi trường và lối sống. Anh vẫn có thể sử dụng chương trình song song với phương pháp hỗ trợ được bác sĩ, dược sĩ hoặc chuyên gia phù hợp hướng dẫn.",
  ],
  [
    "Điều gì xảy ra nếu tôi hút lại một điếu?",
    "Một lần trượt không tự động biến toàn bộ hành trình thành thất bại. Anh sẽ sử dụng Quy Trình Phục Hồi Trong 24 Giờ™ để: Dừng chuỗi hành vi, Nhận diện tác nhân, Điều chỉnh kế hoạch, Quay lại hệ thống. Không dùng một sự cố để kết luận tiêu cực về bản thân.",
  ],
];

const List = ({ items, check = true }: { items: string[]; check?: boolean }) => (
  <ul className="letter-list">
    {items.map((item) => (
      <li key={item}>
        <span style={{ color: check ? "var(--green)" : "var(--red)", marginRight: "8px", fontWeight: "bold" }}>
          {check ? "✓" : "✕"}
        </span>
        {item}
      </li>
    ))}
  </ul>
);

export default function Home() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const offer = document.getElementById("offer");
      const inOffer = offer
        ? offer.getBoundingClientRect().top < innerHeight && offer.getBoundingClientRect().bottom > 0
        : false;
      setShowSticky(scrollY > innerHeight * 0.8 && !inOffer);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="letter-page">
      <div className="letter-announcement">
        <b>BẢN ĐỒ CAI THUỐC 7 NGÀY™ · 457.000 VNĐ</b>
        <span>DÀNH CHO NGƯỜI ĐÃ NHIỀU LẦN MUỐN CAI NHƯNG VẪN QUAY LẠI</span>
      </div>

      <header className="hero blueprint">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow" style={{ marginBottom: "16px" }}>
                <i />
                <span>CHƯƠNG TRÌNH IDENTITY SHIFT™ · BẢN ĐỒ CAI THUỐC 7 NGÀY™</span>
              </div>
              <h1 style={{ fontSize: "clamp(34px, 3.8vw, 52px)", lineHeight: "1.15", margin: "0 0 18px", color: "white" }}>
                LẤY LẠI HƠI THỞ, NĂNG LƯỢNG VÀ SỰ TỰ TIN ĐÃ BỊ BÀO MÒN SAU NHIỀU NĂM HÚT THUỐC
              </h1>
              <p className="hero-line" style={{ fontSize: "clamp(17px, 1.6vw, 21px)", color: "#c4d0cb", margin: "0 0 18px", lineHeight: "1.5" }}>
                Trong 7 ngày, anh sẽ xây dựng tấm bản đồ cai thuốc từ gốc rễ—để hiểu điều gì thực sự khiến mình tiếp tục hút, từng bước tháo gỡ sự lệ thuộc vào Nicotine và lấy lại quyền làm chủ bản thân.
              </p>
              <p className="lead" style={{ fontSize: "16px", color: "#9caea6", marginBottom: "22px", lineHeight: "1.6" }}>
                Trở thành người đàn ông giữ được lời hứa với chính mình— Nhất quán đến mức gia đình, bạn bè và đồng nghiệp bắt đầu đặt câu hỏi làm sao anh làm được điều đó.
              </p>
              <blockquote className="letter-quote" style={{ textAlign: "left", margin: "0 0 24px", paddingLeft: "18px", borderLeft: "3px solid var(--bright)", fontSize: "16px", color: "#eef5f1", fontStyle: "italic" }}>
                Đây là hành trình lấy lại sức khỏe, lòng tự trọng và hình ảnh của người đàn ông làm chủ cuộc đời mình.
              </blockquote>

              <div className="hero-cta" style={{ flexWrap: "wrap", gap: "20px" }}>
                <a className="button" href="#offer">TÔI MUỐN XÂY BẢN ĐỒ CAI THUỐC CỦA MÌNH →</a>
                <div>
                  <small style={{ color: "#91a19b" }}>MỨC GIÁ MỞ BÁN</small>
                  <strong style={{ color: "var(--bright)", fontSize: "22px" }}>457.000 VNĐ</strong>
                  <span style={{ color: "#88948f" }}>Một gói duy nhất · Trọn đời</span>
                </div>
              </div>

              <div className="chips" style={{ justifyContent: "flex-start", marginTop: "24px" }}>
                <span>✓ Tháo gỡ Nicotine từ gốc</span>
                <span>✓ Bản đồ 7 Ngày có cấu trúc</span>
                <span>✓ Đổi mới định danh Identity Shift™</span>
              </div>

              <p className="letter-disclaimer" style={{ marginTop: "18px", fontSize: "12px", color: "#7a8a83" }}>
                Chương trình hướng dẫn về định danh, hành vi và lối sống. Không thay thế tư vấn, chẩn đoán hoặc điều trị y tế.
              </p>
            </div>

            <div style={{ position: "relative" }}>
              <div className="map-mockup">
                <div className="map-toolbar">
                  <span>BẢN ĐỒ CAI THUỐC CÁ NHÂN™</span>
                  <span style={{ color: "var(--bright)" }}>STATUS: BLUEPRINT 1.0</span>
                </div>
                <div className="map-title">
                  <div>
                    <small>CHƯƠNG TRÌNH 7 NGÀY</small>
                    <b>Identity Shift Map</b>
                  </div>
                  <span>● Đồng hành 21 ngày</span>
                </div>
                <div className="map-flow">
                  <div>
                    <i>[01-02] BÓC TÁCH & TRIGGER</i>
                    <b>VÒNG LẶP HÚT THUỐC</b>
                    <span>Xóa tự trách & 15+ điểm nóng</span>
                  </div>
                  <div>
                    <i>[03-04] NHU CẦU ẨN & THUẬT TOÁN</i>
                    <b>PHẢN ỨNG THAY THẾ</b>
                    <span>Kịch bản If-Then chính xác</span>
                  </div>
                  <div>
                    <i>[05] IDENTITY SHIFT™</i>
                    <b>ĐỊNH DANH MỚI</b>
                    <span>Tạo hệ bằng chứng hành vi</span>
                  </div>
                  <div>
                    <i>[06-07] LÁ CHẮN & PHỤC HỒI</i>
                    <b>QUY TRÌNH 24H</b>
                    <span>Lá chắn rủi ro khẩn cấp</span>
                  </div>
                </div>
                <div className="map-bottom">
                  <span>7 NGÀY TIẾN ĐỘ THỰC HÀNH</span>
                  <div>
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                    <i className="on" />
                  </div>
                </div>
              </div>

              <div className="float-card fc1">
                <small>CHUYỂN DỊCH ĐỊNH DANH</small>
                <b>&ldquo;Tôi không còn cần Nicotine&rdquo;</b>
              </div>
              <div className="float-card fc2">
                <small>BẢO VỆ THÀNH QUẢ</small>
                <b>Lá chắn xử lý cơn thèm</b>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">01 — KHỞI ĐẦU VÒNG LẶP</p>
          <h2>ANH KHÔNG SINH RA ĐÃ LÀ NGƯỜI HÚT THUỐC</h2>
          <p>Điếu thuốc đầu tiên có thể đến vào một ngày rất bình thường.</p>
          <div className="letter-voices">
            <p>Có thể anh hút vì một người bạn đưa cho.</p>
            <p>Vì tò mò.</p>
            <p>Vì muốn hòa nhập với anh em.</p>
            <p>Vì muốn tỏ ra trưởng thành.</p>
            <p>Hoặc đơn giản vì khi ấy anh nghĩ: “Chỉ một điếu thôi. Có gì nghiêm trọng đâu.”</p>
          </div>
          <p>Lúc đó, hút thuốc chỉ là một hành động. Anh chưa cần thuốc để bắt đầu ngày mới, chưa cần thuốc để làm việc, chưa cần thuốc để bình tĩnh, và chưa từng nghĩ sẽ có ngày mình phải tìm cách thoát khỏi nó.</p>
          <p>Nhưng một điếu dần trở thành nhiều điếu: Sau bữa ăn, bên ly cà phê, khi đầu óc căng thẳng, trong lúc chờ đợi, khi ngồi cùng bạn bè, khi cần một lý do để bước ra ngoài nghỉ vài phút.</p>
          <blockquote className="letter-quote">
            Không ai thức dậy vào một buổi sáng và quyết định: “Từ hôm nay, tôi sẽ để thuốc lá điều khiển một phần cuộc sống của mình.” Nó diễn ra âm thầm hơn thế.
          </blockquote>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">02 — CHUYỂN DỊCH ĐỊNH DANH</p>
          <h2>TỪ MỘT VIỆC ANH LÀM, NÓ DẦN TRỞ THÀNH CÁCH ANH VẬN HÀNH</h2>
          <p>Qua mỗi lần lặp lại, não không chỉ học rằng nicotine tạo ra một cảm giác nhất định. Nó còn bắt đầu ghi nhớ:</p>
          <ul className="letter-list">
            <li>Cà phê thì phải có thuốc.</li>
            <li>Căng thẳng thì hút một điếu.</li>
            <li>Gặp anh em thì phải châm thuốc.</li>
            <li>Muốn tập trung thì cần nicotine.</li>
            <li>Muốn nghỉ ngơi thì bước ra ngoài hút.</li>
          </ul>
          <p>Điếu thuốc dần được gắn với công việc, cảm xúc, các mối quan hệ và nhịp sống hằng ngày của anh. Cho đến khi câu: “Tôi có hút thuốc” âm thầm biến thành: <b>“Tôi là người hút thuốc.”</b></p>
          <p>Đây là điểm mọi thứ bắt đầu trở nên khó khăn. Bởi bỏ thuốc không còn được cảm nhận đơn thuần là loại bỏ một hành vi có hại. Ở tầng sâu hơn, nó giống như anh đang phải từ bỏ: Cách mình giải tỏa áp lực, khoảng nghỉ quen thuộc trong ngày, cách kết nối với bạn bè và đồng nghiệp, thứ giúp mình cảm thấy tập trung và một nếp sống đã tồn tại suốt nhiều năm.</p>
          <div className="letter-voices">
            <p>“Nếu không còn thuốc, tôi sẽ vận hành thế nào?”</p>
          </div>
          <p>Đây không đơn thuần là thiếu ý chí. Đó là điều xảy ra khi một hành vi được lặp lại đủ lâu để trở thành một phần trong cách anh nhìn nhận chính mình.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">03 — SỰ THƯƠNG LƯỢNG CỦA TÂM TRÍ</p>
          <h2>BIẾT THUỐC CÓ HẠI VẪN CHƯA ĐỦ ĐỂ DỪNG LẠI</h2>
          <p>Anh đã biết thuốc lá có hại. Anh đã nhìn thấy cảnh báo trên bao thuốc, đã nghe người thân khuyên nhủ, đã cảm nhận hơi thở ngắn hơn khi vận động, đã thấy cơ thể không còn khỏe như trước, và đã nhiều lần tự hứa rằng mình phải dừng lại.</p>
          <p>Nhưng rồi tâm trí bắt đầu thương lượng:</p>
          <div className="letter-voices">
            <p>“Hôm nay căng thẳng quá, để mai bỏ.”</p>
            <p>“Tôi hút ít hơn nhiều người khác.”</p>
            <p>“Tôi chỉ hút khi uống cà phê.”</p>
            <p>“Đi nhậu mà không hút thì mất vui.”</p>
            <p>“Tôi có thể bỏ bất cứ lúc nào.”</p>
            <p>“Một điếu chắc không sao.”</p>
          </div>
          <p>Những lời này không xuất hiện vì anh không hiểu tác hại của thuốc. Chúng xuất hiện vì tâm trí đang bảo vệ một hành vi đã trở nên quen thuộc và phù hợp với cách anh vận hành hiện tại.</p>
          <blockquote className="letter-quote">Lý trí muốn dừng lại. Nhưng định danh cũ vẫn tìm lý do để tiếp tục.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">04 — BẪY Ý CHÍ</p>
          <h2>ĐÓ LÀ LÝ DO NHỮNG LẦN CAI TRƯỚC THƯỜNG BIẾN THÀNH MỘT CUỘC CHỊU ĐỰNG</h2>
          <p>Một ngày nào đó, anh quyết định: “Lần này tôi sẽ bỏ thật.” Anh vứt bao thuốc đi, cố gắng chịu đựng, tự nhắc mình phải mạnh mẽ. Có thể anh vượt qua vài giờ, vài ngày hoặc thậm chí vài tuần.</p>
          <p>Nhưng sâu bên trong, anh vẫn cảm thấy mình là một người hút thuốc đang phải nhịn. Mỗi cơn thèm trở thành một cuộc chiến. Mỗi ly cà phê là một bài kiểm tra. Mỗi cuộc nhậu là một lần phải chống lại chính mình.</p>
          <p>Rồi sau một cuộc tranh luận, một đợt áp lực hoặc một lời mời từ bạn bè, anh tự nói: “Chỉ một điếu thôi.” Một điếu trở thành hai. Và chẳng bao lâu, anh quay lại thói quen cũ.</p>
          <div className="letter-voices">
            <p>“Mình lại thất bại.”</p>
            <p>“Mình không đủ bản lĩnh.”</p>
            <p>“Có lẽ mình không thể bỏ được.”</p>
          </div>
          <p>Mỗi lần như vậy không chỉ làm giảm niềm tin rằng anh có thể cai thuốc. Nó còn bào mòn niềm tin rằng anh có thể giữ được lời hứa với chính mình.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">05 — PHÂN BIỆT HAI TRẠNG THÁI</p>
          <h2>“TÔI ĐANG CỐ NHỊN” VÀ “TÔI KHÔNG CÒN HÚT” LÀ HAI TRẠNG THÁI KHÁC NHAU</h2>
          <p>Hãy hình dung hai người đàn ông cùng đứng trước một lời mời thuốc.</p>
          <div className="letter-voices">
            <p><b>Người thứ nhất nghĩ:</b> “Tôi rất muốn hút, nhưng tôi đang cố nhịn.”</p>
            <p><b>Người thứ hai nghĩ:</b> “Tôi không còn hút nữa.”</p>
          </div>
          <p>Cả hai đều có thể từ chối. Nhưng trải nghiệm bên trong hoàn toàn khác nhau.</p>
          <p>Người thứ nhất cảm thấy mình đang mất đi một thứ vẫn thuộc về mình. Mỗi lần từ chối là một lần phải tiêu hao ý chí.</p>
          <p>Người thứ hai vẫn có thể xuất hiện cơn thèm. Nhưng anh ấy không còn xem cơn thèm là mệnh lệnh phải làm theo. Anh ấy hiểu: <i>“Đây chỉ là một trạng thái đang đi qua. Nó không quyết định tôi là ai và tôi sẽ làm gì.”</i></p>
          <blockquote className="letter-quote">Đó là sự khác biệt giữa: Chống lại con người cũ bằng ý chí vs Hành động phù hợp với con người mới.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">06 — CƠ CHẾ BẰNG CHỨNG HÀNH VI</p>
          <h2>IDENTITY SHIFT™ KHÔNG PHẢI LÀ SUY NGHĨ TÍCH CỰC</h2>
          <p>Anh không thể chỉ đứng trước gương và lặp lại: “Tôi là người không hút thuốc” rồi mong mọi thứ tự động thay đổi. Một định danh mới chỉ trở nên đáng tin khi được xây bằng bằng chứng thực tế.</p>
          <ul className="letter-list">
            <li>Anh uống cà phê mà không hút — Đó là một bằng chứng.</li>
            <li>Anh vượt qua một cơn thèm mà không làm theo nó — Đó là một bằng chứng.</li>
            <li>Anh từ chối lời mời thuốc khi ngồi cùng bạn bè — Đó là một bằng chứng.</li>
            <li>Anh trải qua một ngày căng thẳng mà không dùng nicotine — Đó là một bằng chứng.</li>
            <li>Anh có một lần trượt nhưng dừng lại ngay, thay vì dùng nó làm lý do quay về thói quen cũ — Đó cũng là một bằng chứng.</li>
          </ul>
          <p>Mỗi hành động nhỏ gửi cho não một thông điệp: <i>“Đây là điều một người như tôi có thể làm.”</i></p>
          <p><b>Hành vi mới tạo ra bằng chứng → Bằng chứng xây dựng niềm tin → Niềm tin củng cố định danh mới → Định danh mới khiến hành vi tiếp theo trở nên dễ dàng hơn.</b></p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">07 — ĐÍCH ĐẾN CỦA NGƯỜI ĐÀN ÔNG</p>
          <h2>ANH KHÔNG CHỈ CẦN MỘT THỨ ĐỂ CHẠY KHỎI</h2>
          <p>Anh cần biết mình đang tiến về đâu. Không chỉ: “Tôi không muốn là người hút thuốc nữa” mà là: <b>“Tôi muốn trở thành người đàn ông như thế nào?”</b></p>
          <ul className="letter-list">
            <li>Một người làm chủ cảm xúc mà không cần nicotine.</li>
            <li>Một người cha đủ khỏe để có mặt lâu hơn bên con.</li>
            <li>Một người chồng không còn mang mùi thuốc về nhà.</li>
            <li>Một người có thể làm việc, nghỉ ngơi và giao tiếp mà không bị nicotine quyết định thay.</li>
            <li>Một người khiến gia đình cảm thấy yên tâm.</li>
            <li>Một người nói được, làm được và giữ được lời hứa với chính mình.</li>
          </ul>
          <blockquote className="letter-quote">
            Đây mới là kết quả sâu nhất. Không chỉ là số ngày anh không hút. Mà là con người anh trở thành trong quá trình đó—và cách những người quan trọng bắt đầu nhìn nhận anh.
          </blockquote>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">08 — TỔNG QUAN HỆ THỐNG</p>
          <h2>GIỚI THIỆU BẢN ĐỒ CAI THUỐC 7 NGÀY™</h2>
          <p>Một hệ thống thực hành giúp anh nhìn rõ và xử lý những tầng đang duy trì vòng lặp hút thuốc. Thay vì chỉ hỏi số điếu mỗi ngày, anh sẽ trực tiếp giải mã 6 tầng:</p>
          <div className="letter-deliverables">
            {sixLayers.map((layer) => (
              <article key={layer.n}>
                <span>{layer.n}</span>
                <div>
                  <h3>{layer.name}</h3>
                  <p>{layer.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "40px" }}>
            <h3>LỘ TRÌNH THAY ĐỔI</h3>
            <div className="letter-voices" style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", margin: "20px 0" }}>
              {changeSteps.map((step, idx) => (
                <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <b style={{ color: "var(--bright)" }}>{step}</b>
                  {idx < changeSteps.length - 1 && <span style={{ color: "var(--green)" }}>↓</span>}
                </span>
              ))}
            </div>
            <p className="letter-note" style={{ fontSize: "16px", color: "var(--bright)", fontWeight: "600" }}>
              Mục tiêu: GIÚP ANH TỪNG BƯỚC TRỞ THÀNH NGƯỜI ĐÀN ÔNG KHÔNG CÒN CẦN NICOTINE ĐỂ BÌNH TĨNH, TẬP TRUNG, KẾT NỐI HAY LÀ CHÍNH MÌNH.
            </p>
          </div>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">09 — HÀNH TRÌNH THỰC HÀNH 7 NGÀY</p>
          <h2>HÀNH TRÌNH 7 NGÀY CỦA ANH</h2>
          <div className="letter-days">
            {days.map((day) => (
              <article key={day.n}>
                <p className="letter-day-label">{day.label}</p>
                <h3>{day.title}</h3>
                {day.points && (
                  <ul className="letter-list" style={{ margin: "10px 0" }}>
                    {day.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                )}
                {day.shiftText && <p className="letter-note"><b>Chuyển dịch:</b> {day.shiftText}</p>}
                {day.note && <p className="letter-note">{day.note}</p>}
                {day.formula && <p className="letter-note"><b>Công thức:</b> {day.formula}</p>}
                {day.scenarios && (
                  <div style={{ margin: "8px 0" }}>
                    <small style={{ color: "var(--green)", fontWeight: "700" }}>Chuẩn bị phản ứng khi:</small>
                    <ul className="letter-list">{day.scenarios.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
                {day.situations && (
                  <div style={{ margin: "8px 0" }}>
                    <small style={{ color: "var(--green)", fontWeight: "700" }}>Tình huống ứng phó:</small>
                    <ul className="letter-list">{day.situations.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
                {day.steps && (
                  <ul className="letter-list" style={{ margin: "10px 0" }}>
                    {day.steps.map((st) => <li key={st}>{st}</li>)}
                  </ul>
                )}
                {day.distinctions && (
                  <div style={{ margin: "8px 0" }}>
                    <small style={{ color: "var(--green)", fontWeight: "700" }}>Phân biệt rạch ròi:</small>
                    <ul className="letter-list">{day.distinctions.map((d) => <li key={d}>{d}</li>)}</ul>
                  </div>
                )}
                {day.action && <p>{day.action}</p>}
                <p className="letter-output"><b>Thành phẩm:</b> {day.output}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">10 — HỆ THỐNG BÀN GIAO</p>
          <h2>TOÀN BỘ NHỮNG GÌ ANH NHẬN ĐƯỢC</h2>
          <div className="letter-deliverables">
            {deliverables.map((item, idx) => (
              <article key={item.title}>
                <span>{`0${idx + 1}`}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.story}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">11 — VÌ SAO ANH CÓ THỂ TIN VÀO CÁCH TIẾP CẬN NÀY?</p>
          <h2>BẰNG CHỨNG ĐẦU TIÊN ĐẾN TỪ CHÍNH HÀNH TRÌNH CỦA TÔI</h2>
          <p>Tôi từng hút thuốc trong khoảng 10 năm. Thuốc lá từng xuất hiện khi tôi làm việc, suy nghĩ, căng thẳng, nghỉ ngơi và giao tiếp. Tôi từng nghĩ vấn đề của mình là thiếu ý chí. Nhưng càng cố gồng, tôi càng giữ thuốc lá ở vị trí trung tâm: <i>“Tôi là người hút thuốc đang cố bỏ.”</i></p>
          <p>Bước chuyển bắt đầu khi tôi không còn chỉ hỏi: “Làm thế nào để cưỡng lại điếu thuốc?” mà bắt đầu hỏi: <b>“Vì sao tôi tin mình cần thuốc để xử lý trạng thái này?”, “Tôi đang sống từ định danh nào?”, “Một người không còn dùng thuốc sẽ phản ứng thế nào trong tình huống này?”</b></p>
          <p>Từ đó, tôi điều chỉnh từng phần: Môi trường, nhịp sinh hoạt, cách nghỉ ngơi, cách xử lý căng thẳng, nghi thức làm việc, tình huống xã hội và phản ứng khi tác nhân xuất hiện.</p>

          <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "1px solid #2e443c" }}>
            <h3>HƠN 100 HÀNH TRÌNH IDENTITY SHIFT™</h3>
            <p>Trong vai trò huấn luyện về định danh, tôi đã đồng hành và phân tích hơn 100 trường hợp gặp những vòng lặp trì hoãn, thiếu nhất quán và thất bại nhiều lần. Mô thức thường xuyên lặp lại:</p>
            <blockquote className="letter-quote" style={{ fontSize: "18px" }}>
              Gặp tác nhân → Quay lại phản ứng cũ → Tự trách → Gắn nhãn tiêu cực → Mất niềm tin → Tiếp tục hành vi
            </blockquote>
            <p>Bản Đồ Cai Thuốc 7 Ngày™ hệ thống hóa những nguyên lý Identity Shift™ vào một vấn đề cụ thể: Vòng lặp quyết tâm bỏ thuốc rồi lại quay về với thuốc.</p>
          </div>

          <div style={{ marginTop: "40px", paddingTop: "30px", borderTop: "1px solid #2e443c" }}>
            <h3>VAI TRÒ CỦA TÔI TRONG CHƯƠNG TRÌNH</h3>
            <p>Tôi không định vị mình là bác sĩ. Tôi không chẩn đoán mức độ lệ thuộc y khoa và không thay thế các phương pháp hỗ trợ cai thuốc được bác sĩ, dược sĩ hoặc chuyên gia y tế hướng dẫn.</p>
            <p>Vai trò của tôi là người huấn luyện về định danh—giúp anh nhìn rõ cách định danh, tác nhân, trạng thái, hành vi và môi trường đang cùng duy trì vòng lặp hút thuốc.</p>
          </div>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">12 — ĐỐI TƯỢNG PHÙ HỢP</p>
          <h2>CHƯƠNG TRÌNH NÀY DÀNH CHO AI?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", margin: "30px 0" }}>
            <div>
              <h3 style={{ color: "var(--green)" }}>CHƯƠNG TRÌNH PHÙ HỢP VỚI ANH NẾU:</h3>
              <List items={fitList} check={true} />
            </div>
            <div>
              <h3 style={{ color: "var(--red)" }}>CHƯƠNG TRÌNH KHÔNG PHÙ HỢP NẾU:</h3>
              <List items={unfitList} check={false} />
            </div>
          </div>
        </div>
      </section>

      <section id="offer" className="letter-offer">
        <div className="letter-wrap">
          <p className="letter-number">13 — MỨC ĐẦU TƯ</p>
          <h2>TOÀN BỘ CHƯƠNG TRÌNH CHỈ VỚI 457.000 VNĐ</h2>
          <p>Không có nhiều gói lựa chọn. Không cần cân nhắc giữa các phiên bản. Một chương trình hoàn chỉnh với mức giá mở bán giai đoạn đầu:</p>
          <div className="letter-price">
            <small>MỨC GIÁ MỞ BÁN GIAI ĐOẠN ĐẦU</small>
            <b>457.000 VNĐ</b>
            <span>Một chương trình · Một gói duy nhất · Trọn đời</span>
          </div>
          <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc 7 ngày">THAM GIA BẢN ĐỒ CAI THUỐC 7 NGÀY™ →</a>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">14 — GIẢI ĐÁP THẮC MẮC</p>
          <h2>NHỮNG CÂU HỎI THƯỜNG GẶP</h2>
          <div className="letter-faq">
            {faqs.map((faq, index) => (
              <details key={faq[0]} open={index === 0}>
                <summary>{faq[0]}</summary>
                <p>{faq[1]}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">15 — CAM KẾT HOÀN THIỆN</p>
          <h2>CAM KẾT HOÀN THIỆN BẢN ĐỒ</h2>
          <p>Khi hoàn thành đầy đủ chương trình, anh sẽ có bốn thành phẩm cốt lõi:</p>
          <List items={[
            "Bản Đồ Vòng Lặp Hút Thuốc™",
            "Bản Đồ Thay Thế Tác Nhân™",
            "Kế Hoạch Hành Động Không Khói Thuốc 21 Ngày™",
            "Bản Đồ Phòng Ngừa Tái Hút™",
          ]} check={true} />
          <p className="letter-note">
            Đây là cam kết về hệ thống và công cụ được bàn giao, không phải cam kết kết quả y khoa hoặc bảo đảm mọi người đều cai thuốc trong cùng một khoảng thời gian.
          </p>
        </div>
      </section>

      <section className="letter-closing">
        <div className="letter-wrap">
          <p className="letter-salutation">ANH CÓ THỂ TIẾP TỤC THỬ LẠI THEO CÁCH CŨ</p>
          <h2>HOẶC DÀNH 7 NGÀY ĐỂ NHÌN THẲNG VÀO VÒNG LẶP VÀ XÂY BẢN ĐỒ CHO CHÍNH MÌNH</h2>
          <p>Chờ đến khi công việc bớt căng thẳng. Hứa rằng mình sẽ bỏ vào tuần sau. Giảm vài điếu rồi từ từ quay lại. Tự trách sau mỗi lần hút. Và tiếp tục mang theo cảm giác mình không làm chủ được bản thân.</p>
          <p>Hoặc anh có thể chuyển từ <i>“Tôi biết mình nên bỏ”</i> sang <b>“Tôi hiểu vì sao mình hút và biết mình cần làm gì khi từng tình huống thực tế xuất hiện.”</b></p>
          <blockquote className="letter-quote">
            Không chỉ để bỏ một điếu thuốc. Mà để lấy lại: Hơi thở, Năng lượng, Lòng tự trọng, Niềm tin vào lời mình nói và hình ảnh của người đàn ông làm chủ cuộc đời mình.
          </blockquote>
          <div className="letter-price" style={{ margin: "20px 0" }}>
            <b>457.000 VNĐ</b>
            <span>Một lựa chọn duy nhất. Toàn bộ chương trình. Không có gói nâng cấp.</span>
          </div>
          <a className="letter-button" href="#offer">TÔI MUỐN BẮT ĐẦU HÀNH TRÌNH KHÔNG KHÓI THUỐC →</a>
          <p className="letter-disclaimer" style={{ marginTop: "20px" }}>
            Chương trình cung cấp nội dung giáo dục về định danh, hành vi và lối sống; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế. Nếu anh có triệu chứng nghiêm trọng, mức độ lệ thuộc cao hoặc cần hỗ trợ chuyên môn, hãy trao đổi với bác sĩ, dược sĩ hoặc cơ sở y tế phù hợp.
          </p>
        </div>
      </section>

      <footer className="letter-footer">
        <div className="letter-wrap">
          <b>BẢN ĐỒ CAI THUỐC 7 NGÀY™</b>
          <p>Chương trình giáo dục về định danh, hành vi và lối sống; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế.</p>
          <span>© 2026 Identity Shift™</span>
        </div>
      </footer>

      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`}>
        <div><small>GIÁ MỞ BẢN</small><b>457.000 VNĐ</b></div>
        <a href="#offer">THAM GIA NGAY →</a>
      </div>
    </main>
  );
}
