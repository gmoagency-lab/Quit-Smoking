"use client";

import { useEffect, useState } from "react";

const days = [
  {
    n: 1,
    title: "Nhìn thấy vòng lặp thật sự",
    story: "Bạn phân biệt điều gì đến từ nicotine, điều gì đến từ trigger, cảm xúc, thói quen và cách mình đang định nghĩa bản thân. Ngày đầu tiên không bắt đầu bằng tự trách. Nó bắt đầu bằng việc nhìn đúng vấn đề.",
    output: "Bức tranh toàn cảnh về vòng lặp hút thuốc của bạn",
  },
  {
    n: 2,
    title: "Vẽ bản đồ tác nhân kích hoạt",
    story: "Bạn nhận diện những thời điểm, địa điểm, con người, cảm xúc và hoạt động thường dẫn đến điếu thuốc—để thấy tình huống nguy cơ cao trước khi nó xảy ra.",
    output: "Bản đồ Trigger Cá nhân",
  },
  {
    n: 3,
    title: "Giải mã vai trò của điếu thuốc",
    story: "Bạn tìm ra điều mình thật sự tìm kiếm phía sau mỗi lần hút: sự tập trung, một khoảng nghỉ, cảm giác kết nối, sự bình tĩnh hay một cách né tránh áp lực.",
    output: "Bản đồ Nhu cầu Ẩn",
  },
  {
    n: 4,
    title: "Thiết kế phản ứng thay thế",
    story: "Bạn không nhận một lời khuyên chung chung. Với từng tín hiệu quan trọng, bạn viết một phản ứng cụ thể: khi X xuất hiện, tôi sẽ làm Y trong khoảng thời gian Z.",
    output: "Bộ Phản ứng Thay thế",
  },
  {
    n: 5,
    title: "Identity Shift™",
    story: "Bạn nhận diện câu chuyện cũ đang giữ mình trong danh tính của một người hút thuốc và bắt đầu tạo bằng chứng cho một con người biết bảo vệ cơ thể, không còn cần điếu thuốc để điều khiển trạng thái.",
    output: "Tuyên bố Danh tính Mới",
  },
  {
    n: 6,
    title: "Chuẩn bị cho cơn thèm và tình huống khó",
    story: "Bạn chuẩn bị trước cho stress, cà phê, bia rượu, bạn bè hút thuốc, áp lực công việc, mất ngủ, suy nghĩ “chỉ một điếu thôi” và cả một lần lỡ hút lại.",
    output: "Protocol Xử lý Cơn thèm và Rủi ro",
  },
  {
    n: 7,
    title: "Hoàn thiện Bản đồ Cai thuốc Cá nhân",
    story: "Bạn tổng hợp trigger, vòng lặp cũ, nhu cầu ẩn, phản ứng thay thế, danh tính mới, kịch bản nguy cơ cao và kế hoạch thực thi 21 ngày vào một tấm bản đồ duy nhất.",
    output: "Bản đồ Cai thuốc Cá nhân",
  },
];

const deliverables = [
  {
    n: "01",
    title: "Hành trình 7 ngày có chỉ dẫn",
    story: "Mỗi ngày chỉ tập trung vào một lớp của vòng lặp, để bạn không bị quá tải và luôn biết quyết định tiếp theo cần thực hiện là gì.",
  },
  {
    n: "02",
    title: "Workbook quan sát trung thực",
    story: "Không chấm điểm, không phán xét và không có một câu trả lời đúng cho tất cả. Workbook biến kiến thức thành dữ liệu thật từ đời sống của chính bạn.",
  },
  {
    n: "03",
    title: "Bản đồ Cai thuốc Cá nhân",
    story: "Một tài liệu tổng hợp trigger, vòng lặp, nhu cầu, phản ứng thay thế, danh tính mới, kế hoạch xử lý rủi ro và lộ trình 21 ngày.",
  },
  {
    n: "04",
    title: "Đồng hành trực tiếp trong cohort",
    story: "Bạn không bị bỏ lại một mình sau ngày thứ bảy. Tôi tiếp tục đi cùng bạn trong giai đoạn đưa bản đồ vào đời sống thật.",
  },
];

const bonuses = [
  "Bộ công cụ xử lý cơn thèm nhanh trong những phút đầu tiên.",
  "Bộ kịch bản từ chối thuốc khi được mời hoặc ở trong môi trường nhiều người hút.",
  "Tracker 21 ngày ghi nhận hành vi và bằng chứng cho danh tính mới—không chỉ đếm ngày không hút.",
  "Kế hoạch phục hồi sau một lần hút lại để bạn quay về hành trình ngay từ quyết định tiếp theo.",
];

const faqs = [
  [
    "Tôi hút thuốc nhiều năm rồi, chương trình có phù hợp không?",
    "Thời gian hút thuốc là một yếu tố quan trọng, nhưng chương trình không giả định mọi người có cùng một vòng lặp. Bạn xây bản đồ từ lịch sử, môi trường, trigger và hoàn cảnh của chính mình. Nếu mức độ lệ thuộc cao, có bệnh lý nền hoặc lo ngại về triệu chứng cai, bạn nên kết hợp chương trình với hỗ trợ từ bác sĩ hoặc chuyên gia y tế.",
  ],
  [
    "Chương trình có đảm bảo tôi bỏ thuốc hoàn toàn sau 7 ngày không?",
    "Không. Bảy ngày là thời gian để nhìn rõ cơ chế, xây dựng bản đồ và bắt đầu thay đổi có định hướng. Kết quả còn phụ thuộc vào mức độ thực hành, hoàn cảnh, tình trạng lệ thuộc và việc bạn tiếp tục áp dụng bản đồ trong 21 ngày tiếp theo.",
  ],
  [
    "Tôi có phải dừng hút ngay từ ngày đầu không?",
    "Không nhất thiết. Mục tiêu đầu tiên là giúp bạn nhìn thấy chính xác vòng lặp và chuẩn bị phương án phù hợp, thay vì đưa ra một mệnh lệnh giống nhau cho tất cả mọi người. Lộ trình dừng hút cần phù hợp với tình trạng và kế hoạch cá nhân của bạn.",
  ],
  [
    "Nếu tôi hút lại một điếu thì sao?",
    "Một điếu thuốc là một sự kiện cần được phân tích, không phải bản án về con người bạn. Bạn sẽ có quy trình để nhận diện trigger, điều chỉnh bản đồ và quay lại ngay từ quyết định tiếp theo.",
  ],
  [
    "Đây có phải chương trình điều trị y khoa không?",
    "Không. Đây là chương trình giáo dục, tự quan sát hành vi và hỗ trợ thay đổi thói quen dựa trên Identity Shift™. Chương trình không thay thế việc chẩn đoán, điều trị, kê đơn hoặc tư vấn từ chuyên gia y tế.",
  ],
  [
    "Tại sao chưa có nhiều testimonial cai thuốc?",
    "Vì đây là cohort đầu tiên áp dụng toàn bộ cơ chế này riêng cho mục tiêu cai thuốc lá. Tôi lựa chọn minh bạch thay vì dùng kết quả từ những chương trình khác như testimonial cai thuốc. Cohort này là nơi các case study đầu tiên được xây dựng một cách thực tế và có trách nhiệm.",
  ],
];

const List = ({ items }: { items: string[] }) => (
  <ul className="letter-list">
    {items.map((item) => <li key={item}>{item}</li>)}
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
        <b>Founding Member · 497.000 VNĐ</b>
        <span>Giới hạn 25 người · Đồng hành trực tiếp 21 ngày</span>
      </div>

      <header className="letter-hero">
        <div className="letter-wrap">
          <p className="letter-brand">BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</p>
          <p className="letter-salutation">Gửi bạn,</p>
          <h1>Đừng tiếp tục cố gắng “nhịn hút”.</h1>
          <p className="letter-hero-line">Hãy dành 7 ngày để nhìn thấy cơ chế đang giữ bạn trong vòng lặp—và bắt đầu sống như một người không còn cần đến điếu thuốc.</p>
          <p className="letter-lead">Đây không phải hành trình đòi hỏi ý chí thép, bắt bạn chỉ cố chịu đựng cơn thèm hay thay thuốc lá bằng một hình thức lệ thuộc khác. Bạn sẽ xây một tấm bản đồ dành riêng cho trigger, cảm xúc, công việc và đời sống của mình.</p>
          <blockquote className="letter-quote">Từ một người đang cố bỏ thuốc<br />trở thành một người không còn xem thuốc lá là một phần con người mình.</blockquote>
          <div className="letter-hero-action">
            <a className="letter-button" href="#offer">BẮT ĐẦU HÀNH TRÌNH 7 NGÀY →</a>
            <p><small>FOUNDING MEMBER</small><b>497.000 VNĐ</b><span>Giới hạn 25 người</span></p>
          </div>
          <p className="letter-disclaimer">Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế.</p>
        </div>
      </header>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">01 — ĐIẾU THUỐC TIẾP THEO CÓ THỂ KHÔNG PHẢI ĐIỀU BẠN THẬT SỰ MUỐN</p>
          <h2>Có thể bạn chỉ đang phản ứng với một tín hiệu đã lặp lại quá nhiều lần.</h2>
          <div className="letter-voices">
            <p>Căng thẳng — hút một điếu.</p>
            <p>Cần tập trung — hút một điếu.</p>
            <p>Cà phê, sau ăn, gặp bạn bè — hút một điếu.</p>
            <p>Buồn, chán, cô đơn hoặc bế tắc — lại hút một điếu.</p>
          </div>
          <p>Sau đủ nhiều lần, điếu thuốc không còn là một lựa chọn có ý thức. Nó trở thành phản ứng tự động. Cơ thể và tâm trí đã ra quyết định trước khi bạn kịp nhận ra điều gì đang xảy ra.</p>
          <p>Vì vậy, vấn đề không chỉ nằm ở nicotine. Bạn còn đang đối diện với trigger từ môi trường, vòng lặp cảm xúc, niềm tin rằng thuốc lá giúp mình tập trung hoặc bình tĩnh, và hình ảnh “tôi là người hút thuốc” đã được củng cố suốt nhiều năm.</p>
          <blockquote className="letter-quote">Biết thuốc lá có hại vẫn chưa đủ để dừng lại, nếu toàn bộ hệ thống phía sau điếu thuốc vẫn còn nguyên.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">02 — BẠN ĐÃ THỬ BAO NHIÊU CÁCH RỒI?</p>
          <h2>Mỗi lần thất bại không chỉ làm tổn thương sức khỏe. Nó còn làm hao mòn niềm tin bạn dành cho chính mình.</h2>
          <p>Có thể bạn đã đổi sang thuốc nhẹ hơn, giảm số điếu, chuyển sang thuốc lá điện tử, dùng kẹo, vứt gói thuốc đi rồi mua lại, hoặc tuyên bố đây sẽ là “gói cuối cùng”.</p>
          <List items={[
            "Tự nhủ ngày mai, tuần sau hoặc đầu tháng sẽ bắt đầu.",
            "Cố nhịn bằng ý chí cho đến khi không chịu nổi nữa.",
            "Duy trì được hai hoặc ba ngày rồi quay về nhịp cũ.",
            "Buổi sáng tuyên bố bỏ thuốc nhưng đến chiều lại cầm điếu thuốc lên.",
          ]} />
          <div className="letter-voices">
            <p>“Có lẽ mình không đủ kỷ luật.”</p>
            <p>“Có lẽ mình nghiện quá nặng.”</p>
            <p>“Có lẽ mình không thể bỏ được.”</p>
          </div>
          <p>Nhưng có thể bạn không thiếu quyết tâm. Bạn chỉ chưa từng có một tấm bản đồ đủ rõ để nhìn thấy toàn bộ vòng lặp của mình.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">03 — NẾU KHÔNG THAY ĐỔI, ĐIỀU GÌ SẼ TIẾP TỤC BỊ LẤY ĐI?</p>
          <h2>Một khoản chi nhỏ mỗi ngày có thể trở thành cái giá rất lớn khi được tính bằng nhiều năm.</h2>
          <p>Với một gói thuốc khoảng 30.000–40.000 đồng mỗi ngày, số tiền mua thuốc có thể lên tới:</p>
          <div className="letter-cost">
            <p><span>Trong 10 năm</span><b>110–146 triệu đồng</b></p>
            <p><span>Trong 20 năm</span><b>219–292 triệu đồng</b></p>
            <p><span>Trong 30 năm</span><b>329–438 triệu đồng</b></p>
          </div>
          <p>Đó mới chỉ là tiền mua thuốc. Chưa tính chi phí sức khỏe, ngày làm việc bị ảnh hưởng, năng lượng và sự tập trung bị gián đoạn, thời gian tìm nơi hút, mùi thuốc trên cơ thể, những khoảnh khắc bên gia đình bị cắt ngang và ảnh hưởng của khói thuốc đến người ở gần bạn.</p>
          <p>Nhưng chi phí lớn nhất có thể không nằm trong tài khoản ngân hàng.</p>
          <blockquote className="letter-quote">Nếu tiếp tục như hiện tại thêm 10, 20 hoặc 30 năm, cơ thể nào sẽ phải gánh những tham vọng của bạn?</blockquote>
          <p>Sẽ không có một thời điểm hoàn hảo để bỏ thuốc. Càng trì hoãn, vòng lặp càng được củng cố và cái giá phải trả càng lớn hơn.</p>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">04 — TÔI HIỂU VÒNG LẶP ĐÓ VÌ TÔI TỪNG SỐNG TRONG NÓ</p>
          <h2>Tôi từng nghĩ thuốc lá đang giúp mình làm việc. Nhưng thật ra, tôi đang vay năng lượng từ chính cơ thể mình.</h2>
          <p>Cuối năm 2025, tôi cùng lúc vận hành năm công việc kinh doanh; một trong số đó diễn ra vào ban đêm. Thuốc lá trở thành công cụ để tôi giữ mình tỉnh táo, tập trung và tiếp tục hoàn thành hàng loạt vai trò.</p>
          <p>Tháng 6 năm đó, tôi mất một người thân yêu vì ung thư phổi. Trong thời gian ở bệnh viện ung bướu, tôi tận mắt nhìn thấy hậu quả ở nhiều người hút thuốc lâu năm. Tôi hiểu rủi ro, nhưng vì điều đó “chưa xảy ra với mình”, tôi vẫn tiếp tục hút.</p>
          <p>Cho đến cuối tháng 12. Khối lượng công việc mùa cuối năm khiến tôi hoàn toàn đổ sập. Với chiều cao 1m77, cân nặng của tôi khi ấy chỉ còn khoảng 54kg.</p>
          <p>Lần đầu tiên, việc ốm buộc tôi tách khỏi môi trường, con người và những tín hiệu thường dẫn đến điếu thuốc. Khoảng cách đó cho tôi cơ hội quan sát vòng lặp của mình.</p>
          <blockquote className="letter-quote">Điếu thuốc không chỉ tồn tại vì nicotine.<br />Nó tồn tại vì tôi vẫn đang sống như một người cần đến thuốc lá.</blockquote>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">05 — TRƯỚC ĐÓ, TÔI CŨNG ĐÃ THẤT BẠI RẤT NHIỀU LẦN</p>
          <h2>Sự thay đổi bắt đầu khi tôi không còn cố trở thành “người đang cai thuốc”.</h2>
          <p>Tôi từng thử thuốc nhẹ hơn, loại không nicotine, thuốc lá điện tử, cắt giảm số điếu đột ngột và dùng kẹo mỗi khi lên cơn thèm. Hai hoặc ba ngày đã được xem là lâu. Sau quá nhiều lần, tôi không còn tin vào chính lời hứa của mình.</p>
          <p>Điều tôi thiếu không phải một lời cảnh báo khác. Tôi thiếu một cơ chế để nhìn thấy khi nào mình hút, điều gì kích hoạt hành vi, cảm giác nào mình đang tìm kiếm, thuốc lá đang làm “công việc” gì và danh tính nào được củng cố sau mỗi điếu thuốc.</p>
          <div className="letter-subchapter">
            <h3>Tôi bắt đầu xây dựng lại cách mình nhìn nhận bản thân.</h3>
            <div className="letter-voices">
              <p>Không phải: “Tôi là người nghiện thuốc và đang cố nhịn.”</p>
              <p>Mà là: “Tôi không còn là người cần thuốc lá để làm việc, tập trung hoặc vượt qua cảm xúc.”</p>
            </div>
            <p>Trong thời gian đầu, vẫn có lúc tôi hút trở lại. Nhưng thay vì dùng một điếu thuốc để phủ định toàn bộ hành trình, tôi xem nó là dữ liệu: trigger nào vừa xuất hiện, trạng thái nào vừa thay đổi, môi trường nào cần điều chỉnh và phản ứng thay thế nào còn thiếu?</p>
          </div>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">06 — GẦN 8 THÁNG SAU</p>
          <h2>Điều thay đổi không chỉ là việc tôi không còn bị điếu thuốc điều khiển.</h2>
          <p>Từ khoảng 54kg, tôi đạt khoảng 62kg. Tôi có thể chơi cầu lông ở cường độ cao, tập gym và bắt đầu tham gia MMA—những điều trước đây gần như không thể.</p>
          <p>Tinh thần ổn định hơn. Tôi không còn phải tìm nơi hút thuốc khi đến chỗ công cộng, không còn lo mùi thuốc trên quần áo và hơi thở, cũng không còn để lịch trình bị điều khiển bởi câu hỏi: “Ở đâu có thể hút một điếu?”</p>
          <p>Sức khỏe tốt hơn giúp tôi đưa ra những quyết định tốt hơn trong công việc, các mối quan hệ, môi trường sống và sự phát triển bên trong.</p>
          <blockquote className="letter-quote">Không có tham vọng nào có thể được thực hiện lâu dài bằng một cơ thể yếu ớt.</blockquote>
          <p className="letter-note">Đây là trải nghiệm cá nhân của tôi, không phải lời hứa rằng tất cả mọi người sẽ có kết quả giống nhau.</p>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">07 — KHÔNG CHỈ TỪ TRẢI NGHIỆM CÁ NHÂN</p>
          <h2>Identity Shift™ cho tôi một cách nhìn rộng hơn về những hành vi chúng ta biết cần thay đổi nhưng vẫn lặp lại.</h2>
          <p>Hiện tại, tôi là Identity Coach tại VNC. Thông qua coaching 1–1, coaching nhóm, mentoring, workshop và quá trình phân tích cùng đội ngũ, tôi đã tham gia coaching hơn 300 trường hợp liên quan đến Identity và các vòng lặp trì hoãn.</p>
          <p>Tôi nhận ra trì hoãn và hút thuốc có một điểm chung: bạn biết điều mình nên làm, thật sự muốn thay đổi, nhưng khi tín hiệu quen thuộc xuất hiện, bạn vẫn quay lại hành vi cũ.</p>
          <p>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ được xây dựng từ hiểu biết về nicotine và trigger, trải nghiệm thật của một người từng thất bại nhiều lần, cơ chế Identity Shift™ và một quy trình có cấu trúc để bạn tự nhìn thấy bản đồ của mình.</p>
          <p className="letter-note">Hơn 300 trường hợp trên không phải testimonial cai thuốc. Cohort này là bước đầu tiên để xây dựng những case study cai thuốc một cách trung thực và có trách nhiệm.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">08 — BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ LÀ GÌ?</p>
          <h2>Không phải lời hứa rằng sau đúng 7 ngày bạn sẽ không bao giờ thèm thuốc nữa.</h2>
          <p>Đây là hành trình giúp bạn xây nền móng: hiểu cơ chế đang giữ mình trong vòng lặp, nhận diện trigger, tách cơn thèm khỏi mệnh lệnh phải hút, xác định vai trò của điếu thuốc, thiết kế phản ứng thay thế và thay đổi cách nhìn nhận bản thân.</p>
          <p>Bạn không chỉ nghe kiến thức. Mỗi ngày, bạn xây thêm một phần của hệ thống dành riêng cho hoàn cảnh của mình.</p>
          <div className="letter-days">
            {days.map((day) => (
              <article key={day.n}>
                <p className="letter-day-label">NGÀY {day.n}</p>
                <h3>{day.title}</h3>
                <p>{day.story}</p>
                <p className="letter-output"><b>Kết quả:</b> {day.output}.</p>
              </article>
            ))}
          </div>
          <blockquote className="letter-quote">Sau 7 ngày, bạn không bị bỏ lại một mình với một đống kiến thức. Bạn bước vào giai đoạn thực thi.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">09 — 21 NGÀY ĐỒNG HÀNH TIẾP THEO</p>
          <h2>Bảy ngày đầu giúp bạn nhìn thấy con đường. Hai mươi mốt ngày tiếp theo giúp bạn bắt đầu bước đi trên đó.</h2>
          <p>Trong 21 ngày, bạn đưa bản đồ vào đời sống thật, quan sát những trigger trước đây chưa nhận ra, điều chỉnh phản ứng thay thế, xử lý những lần dao động và tiếp tục tạo bằng chứng cho danh tính mới.</p>
          <div className="letter-deliverables">
            {deliverables.map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.story}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">10 — 4 BỘ CÔNG CỤ BỔ SUNG</p>
          <h2>Để tấm bản đồ không chỉ nằm trên giấy khi đời sống thật bắt đầu.</h2>
          <List items={bonuses} />
          <p>Mục tiêu không phải tạo ra một hành trình hoàn hảo. Mục tiêu là không để một khoảnh khắc khó khăn biến thành sự quay lại hoàn toàn.</p>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">11 — CHƯƠNG TRÌNH NÀY CÓ PHÙ HỢP VỚI BẠN?</p>
          <h2>Phù hợp nếu bạn muốn hiểu điều gì đang điều khiển hành vi, thay vì tiếp tục chiến đấu với từng điếu thuốc.</h2>
          <List items={[
            "Bạn thật sự muốn bỏ thuốc nhưng đã thất bại nhiều lần.",
            "Bạn thường hút theo phản xạ trong những hoàn cảnh quen thuộc.",
            "Bạn dùng thuốc để tập trung, giảm căng thẳng hoặc duy trì năng lượng.",
            "Bạn không muốn tiếp tục lệ thuộc vào thuốc lá điện tử hay một sản phẩm thay thế khác.",
            "Bạn sẵn sàng quan sát trung thực và hoàn thành workbook.",
            "Bạn muốn có người đồng hành trong giai đoạn đầu.",
          ]} />
          <h3>Chưa phù hợp nếu:</h3>
          <List items={[
            "Bạn chưa có bất kỳ mong muốn thay đổi nào.",
            "Bạn đang tìm một “phép màu” không cần thực hành.",
            "Bạn muốn có người kiểm soát hoặc chịu trách nhiệm thay mình.",
            "Bạn cần điều trị y khoa chuyên sâu nhưng không muốn tìm đến chuyên gia phù hợp.",
          ]} />
          <p className="letter-note">Nếu bạn có bệnh lý, triệu chứng cai nghiêm trọng hoặc đang sử dụng thuốc điều trị, hãy trao đổi với bác sĩ hoặc chuyên gia y tế trước khi thay đổi kế hoạch nicotine.</p>
        </div>
      </section>

      <section id="offer" className="letter-offer">
        <div className="letter-wrap">
          <p className="letter-number">12 — COHORT FOUNDING MEMBER</p>
          <p className="letter-salutation">Nếu bạn đã đọc đến đây,</p>
          <h2>Bạn không chỉ đầu tư vào bảy ngày nội dung. Bạn đầu tư vào khả năng lấy lại quyền lựa chọn.</h2>
          <p>Đây là cohort đầu tiên tôi triển khai đầy đủ Identity Shift™ vào hành trình cai thuốc. Tôi sẽ trực tiếp đồng hành, quan sát cách cơ chế hoạt động trong những hoàn cảnh thật và thu thập phản hồi để tiếp tục hoàn thiện chương trình.</p>
          <p>Bạn đang đầu tư vào khả năng hiểu điều gì điều khiển hành vi, có phương án trước tình huống dễ hút lại, xây dựng lại niềm tin với chính mình và bắt đầu sống như một người không còn cần thuốc lá.</p>
          <h3>Bạn nhận được:</h3>
          <List items={[
            "Toàn bộ hành trình Bản Đồ Cai Thuốc Lá 7 Ngày™.",
            "Workbook thực hành và Bản đồ Cai thuốc Cá nhân hoàn chỉnh.",
            "21 ngày tiếp tục thực thi cùng sự đồng hành trực tiếp trong phạm vi cohort.",
            "Bốn bộ công cụ bổ sung cho cơn thèm, lời mời thuốc, theo dõi và phục hồi.",
          ]} />
          <div className="letter-price">
            <small>MỨC ĐẦU TƯ FOUNDING MEMBER</small>
            <b>497.000 VNĐ</b>
            <span>Một chương trình · Một mức giá · Giới hạn 25 người đầu tiên</span>
          </div>
          <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày">BẮT ĐẦU XÂY DỰNG BẢN ĐỒ CỦA TÔI →</a>
          <p className="letter-signoff">Thân mến,<br /><b>Identity Coach · Identity Shift™</b></p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">NHỮNG ĐIỀU BẠN CÓ THỂ ĐANG BĂN KHOĂN</p>
          <h2>Câu hỏi thường gặp</h2>
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

      <section className="letter-closing">
        <div className="letter-wrap">
          <p className="letter-salutation">Điếu thuốc tiếp theo có thể vẫn xuất hiện trong tâm trí bạn.</p>
          <h2>Nhưng lần này, bạn không cần phản ứng theo cách cũ.</h2>
          <p>Bạn có thể nhìn thấy tín hiệu. Nhận diện vòng lặp. Sử dụng bản đồ. Và đưa ra một quyết định phù hợp hơn với con người mà bạn đang trở thành.</p>
          <blockquote className="letter-quote">Một tấm bản đồ không thể bước thay bạn.<br />Nhưng khi đã có bản đồ, bạn không còn phải tiếp tục đi trong bóng tối.</blockquote>
          <a className="letter-button" href="#offer">BẮT ĐẦU HÀNH TRÌNH NGAY HÔM NAY →</a>
        </div>
      </section>

      <footer className="letter-footer">
        <div className="letter-wrap">
          <b>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</b>
          <p>Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế, không kê đơn và không bảo đảm kết quả giống nhau cho tất cả mọi người.</p>
          <span>© 2026 Identity Shift™</span>
        </div>
      </footer>

      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`}>
        <div><small>FOUNDING MEMBER</small><b>497.000 VNĐ</b></div>
        <a href="#offer">BẮT ĐẦU →</a>
      </div>
    </main>
  );
}
