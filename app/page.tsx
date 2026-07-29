"use client";

import { useEffect, useState } from "react";

const days = [
  {
    n: 1,
    title: "Giải mã Vòng lặp Hút thuốc",
    outcome: "Nhìn rõ điều gì đang duy trì hành vi hút thuốc của riêng bạn.",
    work: ["Lịch sử, số lượng và tần suất hút", "Điếu đầu tiên và dấu hiệu lệ thuộc", "Trigger thường gặp", "Những lần từng cai và lý do hút lại"],
    output: "Bản đồ Vòng lặp Hút thuốc Cá nhân",
  },
  {
    n: 2,
    title: "Xác định Ngày bắt đầu",
    outcome: "Chuyển mong muốn bỏ thuốc thành một mốc bắt đầu có chuẩn bị.",
    work: ["Lý do muốn bỏ ở thời điểm này", "Điều bạn muốn lấy lại và bảo vệ", "Mức độ sẵn sàng hiện tại", "Ngày bắt đầu và người đồng hành"],
    output: "Quit Date & Commitment Plan",
  },
  {
    n: 3,
    title: "Chuẩn bị cho Nicotine và Cơ thể",
    outcome: "Giảm những tình huống cơ thể bị đẩy vào trạng thái dễ hút lại.",
    work: ["Cơn thèm và cảm giác khó chịu", "Khả năng tập trung, giấc ngủ và năng lượng", "Caffeine, rượu bia, vận động", "Dấu hiệu cần trao đổi với chuyên gia y tế"],
    output: "Kế hoạch Chuẩn bị Cơ thể",
  },
  {
    n: 4,
    title: "Thiết kế lại Trigger và Môi trường",
    outcome: "Chuẩn bị phản ứng mới cho từng trigger nguy cơ cao.",
    work: ["Trigger tình huống, cảm xúc, xã hội và thể chất", "Phản ứng cũ và nhu cầu thật", "Phản ứng thay thế", "Điều chỉnh môi trường và phương án dự phòng"],
    output: "Bản đồ Thay thế Trigger",
  },
  {
    n: 5,
    title: "Xây Protocol Xử lý Cơn thèm",
    outcome: "Biết cần làm gì trong vài phút đầu tiên của một cơn thèm.",
    work: ["Sau ăn và uống cà phê", "Lái xe và làm việc căng thẳng", "Được mời thuốc hoặc đi nhậu", "Thiếu ngủ và một ngày nhiều áp lực"],
    output: "Protocol Xử lý Cơn thèm",
  },
  {
    n: 6,
    title: "Hoàn thiện Kế hoạch 21 ngày",
    outcome: "Biến toàn bộ phần chuẩn bị thành một kế hoạch có thể triển khai.",
    work: ["Việc cần làm trước ngày bắt đầu", "Mục tiêu từng tuần và tracker hằng ngày", "Người hỗ trợ và mốc tiến độ", "Phương án cho các tình huống khó"],
    output: "Kế hoạch Cai thuốc 21 ngày",
  },
  {
    n: 7,
    title: "Phòng ngừa và Phục hồi sau Tái hút",
    outcome: "Chuẩn bị cho những ngày không hoàn hảo mà không buông xuôi.",
    work: ["Dấu hiệu cảnh báo sớm", "Tình huống dễ làm kế hoạch đứt gãy", "Suy nghĩ thường xuất hiện trước khi hút lại", "Kế hoạch quay lại trong 24 giờ"],
    output: "Bản đồ Phòng ngừa Tái hút",
  },
];

const deliverables = [
  {
    n: "01",
    title: "Bản đồ Vòng lặp Hút thuốc Cá nhân",
    intro: "Thay vì chỉ nói “tôi nghiện thuốc”, bạn mô tả cụ thể vòng lặp mình cần thay đổi.",
    bullets: ["Thời điểm và trigger xuất hiện nhiều nhất", "Cơn thèm liên quan đến nicotine hay tình huống", "Nhu cầu phía sau điếu thuốc", "Điểm đứt gãy của những lần cai trước"],
  },
  {
    n: "02",
    title: "Ngày bắt đầu & Cam kết Hành động",
    intro: "Bạn không tiếp tục chờ một ngày “ít stress hơn” mà không biết ngày đó là khi nào.",
    bullets: ["Lý do thật sự muốn bỏ", "Điều quan trọng muốn bảo vệ", "Ngày bắt đầu phù hợp", "Người hỗ trợ và việc cần hoàn thành trước ngày cai"],
  },
  {
    n: "03",
    title: "Kế hoạch Chuẩn bị Cơ thể",
    intro: "Mục tiêu là giảm số tình huống cơ thể bị đẩy vào trạng thái dễ hút lại.",
    bullets: ["Giấc ngủ, năng lượng và ăn uống", "Caffeine, rượu bia và vận động", "Những thời điểm dễ mất kiểm soát", "Mức độ cần tìm thêm hỗ trợ chuyên môn"],
  },
  {
    n: "04",
    title: "Bản đồ Thay thế Trigger",
    intro: "Không phải lời khuyên chung “hãy làm việc khác”, mà là phản ứng cho đúng tình huống của bạn.",
    bullets: ["Phản ứng cũ và nhu cầu thật", "Phản ứng thay thế", "Cách điều chỉnh môi trường", "Câu từ chối thuốc và phương án dự phòng"],
  },
  {
    n: "05",
    title: "Protocol Xử lý Cơn thèm",
    intro: "Một chuỗi hành động rõ ràng cho những khoảnh khắc có nguy cơ cao nhất.",
    bullets: ["Việc làm trong vài phút đầu", "Cách đổi trạng thái và môi trường", "Kịch bản cho cà phê, sau ăn, nhậu và stress", "Người cần liên hệ nếu cơn thèm tiếp tục tăng"],
  },
  {
    n: "06",
    title: "Kế hoạch Cai thuốc 21 ngày",
    intro: "Biến những gì đã chuẩn bị thành một lộ trình có ngày bắt đầu, tracker và mốc tiến độ.",
    bullets: ["Việc chuẩn bị trước ngày cai", "Loại bỏ thuốc và vật dụng liên quan", "Người hỗ trợ và tracker hằng ngày", "Phương án cho công việc, cà phê, nhậu và stress"],
  },
  {
    n: "07",
    title: "Bản đồ Phòng ngừa Tái hút",
    intro: "Một lần trượt không cần trở thành lý do để quay lại toàn bộ vòng lặp cũ.",
    bullets: ["Dừng chuỗi hành vi", "Nhận diện trigger vừa xuất hiện", "Điều chỉnh kế hoạch và môi trường", "Quay lại hành trình trong 24 giờ"],
  },
];

const faqs = [
  ["Tôi có phải ngừng hút ngay từ ngày đầu tiên không?", "Không. Những ngày đầu giúp bạn đánh giá vòng lặp, mức độ sẵn sàng, môi trường và các tình huống nguy cơ cao. Bạn sẽ xác định ngày bắt đầu phù hợp trong kế hoạch của mình."],
  ["Tôi vẫn đang hút trong lúc học có được không?", "Có. Chương trình bắt đầu bằng việc quan sát trung thực hành vi hiện tại. Bạn không cần giả vờ rằng mình đã bỏ thuốc trước khi tham gia."],
  ["Chương trình có bảo đảm tôi bỏ thuốc trong 7 ngày không?", "Không. Mục tiêu là giúp bạn hoàn thiện kế hoạch cai cá nhân, xác định ngày bắt đầu và chuẩn bị protocol cho 21 ngày tiếp theo. Tốc độ và kết quả của mỗi người có thể khác nhau."],
  ["Tôi hút đã quá lâu, chương trình có phù hợp không?", "Chương trình được thiết kế chủ yếu cho người đã hút từ 5 năm trở lên và từng gặp khó khăn khi bỏ thuốc. Bạn cần sẵn sàng quan sát vòng lặp và thực hiện kế hoạch, không cần bắt đầu với niềm tin tuyệt đối."],
  ["Tôi hút để giảm stress. Không hút thì làm sao chịu được?", "Bạn sẽ nhận diện nhu cầu nằm phía sau điếu thuốc và chuẩn bị phản ứng thay thế cho những tình huống stress cụ thể. Nếu có vấn đề sức khỏe thể chất hoặc tâm lý cần điều trị, hãy tìm hỗ trợ chuyên môn phù hợp."],
  ["Chương trình có thay thế thuốc hỗ trợ cai hoặc bác sĩ không?", "Không. Chương trình tập trung vào kế hoạch, trigger, hành vi, môi trường và phòng ngừa tái hút. Bạn có thể đồng thời trao đổi với bác sĩ, dược sĩ hoặc chuyên gia y tế về phương án hỗ trợ phù hợp."],
  ["Nếu tôi đang sử dụng miếng dán hoặc kẹo nicotine thì sao?", "Bạn vẫn có thể tham gia để xử lý trigger và các vòng lặp hành vi. Việc sử dụng sản phẩm hỗ trợ nicotine nên theo hướng dẫn của chuyên gia phù hợp và thông tin sử dụng của sản phẩm."],
  ["Nếu tôi hút lại một điếu thì sao?", "Một lần trượt không tự động có nghĩa toàn bộ hành trình thất bại. Bạn sẽ sử dụng kế hoạch phục hồi 24 giờ để dừng chuỗi, nhận diện trigger, điều chỉnh môi trường, liên hệ người hỗ trợ và quay lại kế hoạch."],
  ["Tôi rất bận, liệu có theo được không?", "Mỗi ngày tập trung vào một bài học và một thành phẩm. Bạn không cần dành nhiều giờ học lý thuyết, nhưng cần dành thời gian hoàn thành workbook và đưa kế hoạch vào đời sống thực tế."],
  ["Chương trình có phù hợp với nữ giới không?", "Có thể phù hợp. Tuy nhiên cohort đầu tiên ưu tiên nam giới trưởng thành hút thuốc lâu năm để nội dung, ví dụ và hoạt động hỗ trợ đủ tập trung."],
  ["Chương trình có giúp chữa ho hoặc phục hồi phổi không?", "Không. Chương trình không chẩn đoán, chữa bệnh hoặc cam kết phục hồi cơ quan trong một khoảng thời gian cụ thể. Các triệu chứng sức khỏe cần được bác sĩ hoặc chuyên gia y tế đánh giá."],
];

const Check = ({ children }: { children: React.ReactNode }) => <li><span>✓</span>{children}</li>;

export default function Home() {
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const offer = document.getElementById("offer");
      const inOffer = offer ? offer.getBoundingClientRect().top < innerHeight && offer.getBoundingClientRect().bottom > 0 : false;
      setShowSticky(scrollY > innerHeight * 0.8 && !inOffer);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <div className="announcement"><b>Cohort pilot — 497.000 VNĐ</b><span>Giới hạn 25 người · Có hỗ trợ nhóm trong 21 ngày</span></div>

      <section className="hero blueprint v2-hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><i /> BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</div>
            <h1>Bạn không thiếu ý chí.</h1>
            <p className="hero-line">Bạn đang thiếu một kế hoạch cho đúng những lúc mình <em>dễ hút lại nhất.</em></p>
            <p className="lead">Chương trình thực hành 7 ngày dành cho người đã hút thuốc nhiều năm, từng muốn bỏ hoặc đã bỏ rồi hút lại — giúp bạn xác định ngày bắt đầu và chuẩn bị kế hoạch cá nhân để xử lý cơn thèm, trigger và nguy cơ tái hút.</p>
            <ul className="check-list">
              <Check>Xác định ngày bắt đầu phù hợp.</Check>
              <Check>Thiết kế protocol cho cơn thèm và trigger thật.</Check>
              <Check>Hoàn thiện kế hoạch cai thuốc 21 ngày.</Check>
            </ul>
            <div className="hero-cta">
              <a className="button" href="#offer">TÔI MUỐN CHUẨN BỊ KẾ HOẠCH CAI THUỐC <b>→</b></a>
              <div><small>COHORT PILOT</small><strong>497.000 VNĐ</strong><span>Giới hạn 25 người</span></div>
            </div>
          </div>

          <div className="map-mockup" aria-label="Mô phỏng Bản đồ Cai thuốc Cá nhân">
            <div className="map-toolbar"><span>PERSONAL QUIT PLAN</span><span>DAY 01 / 07</span></div>
            <div className="map-title"><small>21-DAY BLUEPRINT</small><b>Quit Plan</b><span>Đang hoàn thiện</span></div>
            <div className="map-flow">
              {["TRIGGER", "CƠN THÈM", "PHẢN ỨNG", "HỖ TRỢ"].map((x, i) => <div key={x}><i>{String(i + 1).padStart(2, "0")}</i><b>{x}</b><span>{["Cà phê / Sau ăn", "Bồn chồn", "Protocol 5 phút", "Người đồng hành"][i]}</span></div>)}
            </div>
            <div className="map-bottom"><span>21-DAY TRACKER</span><div>{Array.from({length: 21}).map((_, i) => <i className={i < 7 ? "on" : ""} key={i} />)}</div></div>
            <div className="float-card fc1"><small>CRAVING CARD</small><b>Phản ứng nhanh</b></div>
            <div className="float-card fc2"><small>QUIT DATE</small><b>Ngày bắt đầu</b></div>
          </div>
        </div>
        <div className="hero-foot wrap"><span>GHI CHÚ</span> Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế.</div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="section-head"><span>01 — CÓ THỂ BẠN ĐÃ THỰC SỰ MUỐN BỎ NHIỀU LẦN</span><h2>Một lời hứa thật lòng vẫn có thể đứt gãy khi đời sống thật quay lại.</h2></div>
          <div className="narrative">
            <p>Bạn đã từng tự nói: <b>“Hết gói này tôi sẽ bỏ.”</b> Hoặc: <b>“Qua đợt công việc này tôi sẽ dừng.”</b></p>
            <p>Có lần bạn bỏ được vài giờ. Có lần được vài ngày. Thậm chí có lần không hút trong vài tuần hoặc vài tháng.</p>
            <div className="v2-promises">
              {["“Tôi chỉ hút khi stress.”","“Lần này tôi sẽ quyết tâm hơn.”","“Tuần sau công việc đỡ bận tôi sẽ bắt đầu.”"].map(x => <span key={x}>{x}</span>)}
            </div>
            <p>Nhưng rồi một tình huống quen thuộc xuất hiện.</p>
            <div className="trigger-wall">
              {["Cà phê buổi sáng","Sau bữa ăn","Cuộc họp căng thẳng","Deadline dồn dập","Lái xe đường dài","Một cuộc nhậu","Một đêm thiếu ngủ","Được mời thuốc","Cảm giác bồn chồn"].map((x,i) => <span key={x}><i>{String(i+1).padStart(2,"0")}</i>{x}</span>)}
            </div>
            <p>Và bạn lại cầm điếu thuốc lên.</p>
            <p>Không phải vì bạn chưa biết thuốc lá có hại. Không phải vì bạn chưa từng nghiêm túc muốn bỏ. Và cũng không đơn giản vì bạn thiếu ý chí.</p>
          </div>
          <blockquote>Vấn đề là bạn đang cố chống lại điếu thuốc tiếp theo, nhưng <b>chưa có một kế hoạch đủ rõ cho những tình huống khiến mình dễ hút lại nhất.</b></blockquote>
        </div>
      </section>

      <section className="section warm v2-habit">
        <div className="wrap v2-split">
          <div className="section-head left"><span>02 — THUỐC LÁ KHÔNG CHỈ LÀ MỘT THÓI QUEN</span><h2>Sau nhiều năm, nó có thể đã trở thành một phần trong cách bạn vận hành mỗi ngày.</h2><p>Khi bỏ thuốc, bạn không chỉ loại bỏ một điếu thuốc. Bạn còn phải chuẩn bị cách phản ứng mới cho những tình huống trước đây thuốc lá là giải pháp mặc định.</p></div>
          <div className="habit-roles">
            {["Bắt đầu ngày mới","Nghỉ giữa giờ","Tập trung làm việc","Giảm căng thẳng","Chuyển trạng thái sau cuộc họp","Giao tiếp với đồng nghiệp","Đối diện buồn chán","Kết thúc một bữa ăn","Tham gia các cuộc nhậu","Tách khỏi áp lực vài phút"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p></div>)}
          </div>
        </div>
        <div className="wrap v2-callout">Nếu những tình huống đó chưa được xử lý, bạn có thể bỏ được một thời gian nhưng vẫn mang theo toàn bộ vòng lặp cũ.</div>
      </section>

      <section className="section dark blueprint v2-loops">
        <div className="wrap">
          <div className="section-head"><span>03 — HAI VÒNG LẶP ĐANG GIỮ BẠN LẠI</span><h2>Ý chí có thể giúp bạn từ chối một điếu.<br/>Một kế hoạch cần chuẩn bị cho cả nicotine và trigger.</h2></div>
          <div className="dual-loops">
            <article>
              <div className="loop-card-head"><span>01</span><h3>Vòng lặp Nicotine</h3></div>
              {["Mức nicotine giảm","Cơ thể xuất hiện cơn thèm hoặc khó chịu","Bạn hút thuốc","Khó chịu tạm thời giảm xuống","Não tiếp tục ghi nhận hút thuốc là giải pháp"].map((x,i)=><div className="loop-step-v2" key={x}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p>{i<4&&<i>↓</i>}</div>)}
            </article>
            <article>
              <div className="loop-card-head"><span>02</span><h3>Vòng lặp Trigger</h3></div>
              {["Cà phê, sau ăn, stress, nhậu hoặc deadline","Não chờ đợi một điếu thuốc","Bạn hút để nghỉ, tập trung hoặc đổi trạng thái","Cảm giác dễ chịu tạm thời xuất hiện","Liên kết giữa tình huống và thuốc lá được củng cố"].map((x,i)=><div className="loop-step-v2" key={x}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p>{i<4&&<i>↓</i>}</div>)}
            </article>
          </div>
          <div className="plan-needs">
            <small>MỘT KẾ HOẠCH CAI PHÙ HỢP PHẢI CHUẨN BỊ CHO</small>
            <div>{["Cơn thèm nicotine","Trigger tự động","Môi trường sống","Tình huống xã hội","Nghỉ ngơi & stress","Nguy cơ tái hút","Cách quay lại nếu lỡ trượt"].map(x=><span key={x}>✓ {x}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="section light v2-program">
        <div className="wrap v2-program-grid">
          <div className="section-head left sticky-head"><span>04 — BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ LÀ GÌ?</span><h2>Một chương trình thực hành để chuẩn bị kế hoạch cai phù hợp với đời sống thật của bạn.</h2><p>Bạn không chỉ xem video và ghi nhớ thêm kiến thức. Mỗi ngày, bạn hoàn thành một phần trong Bản đồ Cai thuốc Cá nhân.</p></div>
          <div className="program-roadmap">
            {[
              "Hiểu vòng lặp đang duy trì hành vi hút thuốc.",
              "Xác định lý do cai và ngày bắt đầu.",
              "Chuẩn bị cho cơn thèm và những thay đổi có thể xuất hiện.",
              "Thiết kế lại môi trường và trigger nguy cơ cao.",
              "Xây protocol xử lý cơn thèm trong tình huống thực tế.",
              "Hoàn thiện kế hoạch cai thuốc 21 ngày.",
              "Chuẩn bị cách phòng ngừa và phục hồi sau tái hút.",
            ].map((x,i)=><article key={x}><span>{String(i+1).padStart(2,"0")}</span><p>{x}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section warm v2-outcomes">
        <div className="wrap">
          <div className="section-head"><span>05 — SAU 7 NGÀY, BẠN SẼ SỞ HỮU GÌ?</span><h2>Không phải thêm một danh sách tác hại.<br/>Là một kế hoạch được viết từ chính đời sống của bạn.</h2></div>
          <div className="deliverables-v2">
            {deliverables.map(item => <article key={item.n}><aside><span>{item.n}</span><small>THÀNH PHẨM</small></aside><div><h3>{item.title}</h3><p>{item.intro}</p><ul>{item.bullets.map(x=><li key={x}><span>✓</span>{x}</li>)}</ul></div></article>)}
          </div>
        </div>
      </section>

      <section className="section curriculum v2-curriculum">
        <div className="wrap curriculum-grid">
          <div className="section-head left sticky-head"><span>06 — HÀNH TRÌNH 7 NGÀY</span><h2>Mỗi ngày, một quyết định. Mỗi ngày, một thành phẩm.</h2><p>Không kéo dài bằng kiến thức lan man. Bạn rà soát, lựa chọn, thiết kế và hoàn thiện kế hoạch từng bước.</p><div className="days-count"><b>7</b><span>NGÀY<br/>7 THÀNH PHẨM</span></div></div>
          <div className="accordion">
            {days.map(day => <article className={openDay===day.n ? "open" : ""} key={day.n}>
              <button onClick={()=>setOpenDay(openDay===day.n ? 0 : day.n)} aria-expanded={openDay===day.n}><span>NGÀY {day.n}</span><div><b>{day.title}</b><p>{day.outcome}</p></div><i>{openDay===day.n ? "−":"+"}</i></button>
              {openDay===day.n && <div className="accordion-body"><ul>{day.work.map(x=><li key={x}>{x}</li>)}</ul><small>THÀNH PHẨM</small><b>{day.output}</b></div>}
            </article>)}
          </div>
        </div>
      </section>

      <section className="section dark blueprint v2-identity">
        <div className="wrap">
          <div className="section-head"><span>07 — IDENTITY SHIFT™ ĐƯỢC SỬ DỤNG NHƯ THẾ NÀO?</span><h2>Tách một hành vi đã lặp lại khỏi định nghĩa toàn bộ con người bạn.</h2><p>Identity Shift™ không phủ nhận lệ thuộc nicotine và không giả vờ rằng cơn thèm không tồn tại. Nó là lớp hỗ trợ thay đổi hành vi.</p></div>
          <div className="identity-old-lines">{["“Tôi là người nghiện thuốc.”","“Tôi không thể làm việc nếu không hút.”","“Tôi phải hút khi stress.”","“Tôi đã thử nhiều lần nhưng không làm được.”","“Tôi không đủ ý chí.”"].map(x=><span key={x}>{x}</span>)}</div>
          <div className="identity-shift-v2">
            <div><small>TỪ</small><p>“Tôi là người nghiện đang cố chống lại cơn thèm.”</p></div>
            <i>→</i>
            <div><small>SANG</small><p>“Tôi đang học cách xử lý cơn thèm, nghỉ ngơi, tập trung và đối diện stress mà không cần hút thuốc.”</p></div>
          </div>
          <div className="identity-evidence">
            <div><span>BẰNG CHỨNG NHỎ TẠO NHẬN DẠNG MỚI</span><h3>Không chỉ bằng lời nói — mà bằng điều bạn thực sự làm.</h3></div>
            <div>{["Một lần vượt qua cơn thèm","Một ly cà phê không hút thuốc","Một khoảng nghỉ không cần điếu thuốc","Một lần từ chối khi được mời","Một tình huống stress dùng phản ứng mới","Một lần trượt nhưng quay lại ngay"].map(x=><p key={x}>✓ {x}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="section light v2-included">
        <div className="wrap">
          <div className="section-head"><span>08 — BẠN NHẬN ĐƯỢC GÌ KHI THAM GIA?</span><h2>Một chương trình có hướng dẫn, công cụ và nhịp đồng hành để đưa kế hoạch vào thực tế.</h2></div>
          <div className="included-grid">
            <article><span>01</span><h3>7 video hướng dẫn</h3><p>Mỗi ngày tập trung vào một quyết định và một thành phẩm cụ thể.</p></article>
            <article><span>02</span><h3>7 workbook thực hành</h3><p>Bạn trực tiếp xây Bản đồ Cai thuốc Cá nhân thay vì chỉ xem bài học.</p></article>
            <article className="included-tools"><span>03</span><h3>Bộ công cụ triển khai</h3><div>{["Bản đồ Vòng lặp Hút thuốc","Bản đồ Thay thế Trigger","Protocol Xử lý Cơn thèm","Kế hoạch & Tracker 21 ngày","Thẻ Phản ứng nhanh","Mẫu câu từ chối thuốc","Kịch bản cà phê, nhậu, stress, deadline","Bản đồ Phòng ngừa Tái hút"].map(x=><p key={x}>✓ {x}</p>)}</div></article>
            <article><span>04</span><h3>Một buổi khởi động</h3><p>Hiểu cách sử dụng chương trình và bắt đầu đánh giá vòng lặp hiện tại.</p></article>
            <article><span>05</span><h3>Hai buổi group check-in</h3><p>Rà soát tiến độ, tháo gỡ điểm mắc, điều chỉnh kế hoạch và chuẩn bị tình huống nguy cơ cao.</p></article>
            <article><span>06</span><h3>Cộng đồng đồng hành 21 ngày</h3><p>Nơi cập nhật tiến độ, đặt câu hỏi và quay lại hệ thống nếu gặp đứt gãy.</p></article>
          </div>
        </div>
      </section>

      <section className="section warm v2-fit">
        <div className="wrap">
          <div className="section-head"><span>09 — CHƯƠNG TRÌNH CÓ PHÙ HỢP VỚI BẠN?</span><h2>Một lựa chọn tốt bắt đầu bằng việc nhìn đúng mức độ sẵn sàng.</h2></div>
          <div className="fit-grid">
            <article className="fit yes"><span>✓ PHÙ HỢP NẾU</span><h2>Bạn muốn bắt đầu cai trong thời gian gần.</h2><ul>{["Đã hút thuốc từ 5 năm trở lên.","Từng muốn bỏ nhưng liên tục trì hoãn.","Từng bỏ được một thời gian rồi hút lại.","Thường hút khi stress, cà phê, làm việc hoặc nhậu.","Bắt đầu lo ngại sức khỏe hoặc gia đình nhiều lần mong bạn bỏ.","Sẵn sàng quan sát, ghi chép và điều chỉnh môi trường."].map(x=><Check key={x}>{x}</Check>)}</ul></article>
            <article className="fit no"><span>— CHƯA PHÙ HỢP NẾU</span><h2>Bạn chỉ muốn một mẹo nhanh nhưng không muốn thực hành.</h2><ul>{["Hoàn toàn chưa có ý định thay đổi hoặc tham gia vì bị ép.","Không sẵn sàng quan sát trigger và điều chỉnh môi trường.","Kỳ vọng chương trình thay thế bác sĩ hoặc điều trị.","Muốn được bảo đảm tuyệt đối sẽ không bao giờ hút lại.","Có triệu chứng sức khỏe đáng lo nhưng chưa tìm chuyên môn.","Đang cần hỗ trợ cấp cứu hoặc can thiệp lâm sàng."].map(x=><li key={x}><span>—</span>{x}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="section v2-cohort">
        <div className="wrap cohort-grid">
          <div className="section-head left"><span>10 — VÌ SAO TRIỂN KHAI THEO COHORT?</span><h2>Không chỉ cung cấp một khóa học tự xem.</h2><p>Đây là cohort pilot đầu tiên, giới hạn số người để mỗi thành viên có nhịp hướng dẫn, kiểm tra tiến độ và hỗ trợ hoàn thiện kế hoạch.</p></div>
          <div className="cohort-details">
            <article><small>CHƯƠNG TRÌNH CHUẨN BỊ</small><ul>{["Số lượng người tham gia giới hạn.","Một buổi hướng dẫn trực tiếp.","Hai buổi kiểm tra tiến độ.","Cộng đồng đồng hành.","Hỗ trợ hoàn thiện kế hoạch."].map(x=><li key={x}>✓ {x}</li>)}</ul></article>
            <article><small>NGƯỜI THAM GIA ĐƯỢC MỜI</small><ul>{["Cập nhật tiến độ trung thực.","Chia sẻ điểm còn khó hiểu.","Phản hồi về công cụ và bài học.","Chỉ cho phép dùng phản hồi khi có đồng ý riêng."].map(x=><li key={x}>→ {x}</li>)}</ul></article>
          </div>
          <p className="cohort-note">Không có kết quả nào được giả định trước.</p>
        </div>
      </section>

      <section className="section dark blueprint v2-guarantee">
        <div className="wrap guarantee-grid">
          <div>
            <span>11 — CAM KẾT HOÀN THIỆN KẾ HOẠCH</span>
            <h2>Nếu đã làm đủ mà kế hoạch vẫn chưa hoàn thiện, bạn có thêm 14 ngày hỗ trợ.</h2>
            <p>Điều kiện áp dụng: hoàn thành đủ 7 bài học, thực hiện workbook, tham gia các buổi bắt buộc và cập nhật tiến độ trung thực.</p>
          </div>
          <div className="guarantee-card">
            <small>SAU 7 NGÀY, BỐN PHẦN CỐT LÕI CẦN HOÀN THIỆN</small>
            {["Bản đồ Vòng lặp Hút thuốc","Bản đồ Thay thế Trigger","Kế hoạch Cai thuốc 21 ngày","Bản đồ Phòng ngừa Tái hút"].map((x,i)=><p key={x}><span>0{i+1}</span>{x}</p>)}
            <div><b>+14 NGÀY</b><span>hỗ trợ hoàn thiện<br/>không mất thêm phí</span></div>
          </div>
        </div>
        <div className="wrap guarantee-note">Cam kết nằm ở phạm vi triển khai và hỗ trợ — không phải cam kết kết quả y khoa, không bảo đảm mọi người ngừng hút trong cùng thời gian và không cam kết không bao giờ tái hút.</div>
      </section>

      <section className="section authority authority-detailed v2-scope">
        <div className="wrap">
          <div className="authority-opening">
            <span>12 — PHẠM VI HỖ TRỢ</span>
            <h2>Thay đổi hành vi và hỗ trợ y tế có thể đi cùng nhau.</h2>
            <p>Chương trình giúp bạn lập kế hoạch, xử lý trigger, điều chỉnh môi trường và phòng ngừa tái hút. Chương trình không chẩn đoán, kê đơn hoặc thay thế chuyên gia y tế.</p>
          </div>
          <div className="scope-simple-grid">
            <article><span>CHƯƠNG TRÌNH HỖ TRỢ</span><ul>{["Đánh giá vòng lặp hành vi hiện tại.","Xác định ngày bắt đầu và kế hoạch 21 ngày.","Thiết kế phản ứng cho trigger và cơn thèm.","Theo dõi tiến độ và phục hồi sau một lần trượt."].map(x=><li key={x}>✓ {x}</li>)}</ul></article>
            <article><span>NÊN TÌM CHUYÊN MÔN KHI</span><ul>{["Muốn sử dụng thuốc hoặc sản phẩm thay thế nicotine.","Đang mang thai, có bệnh nền hoặc dùng thuốc điều trị.","Có triệu chứng thể chất hay tinh thần đáng lo ngại.","Cần một kế hoạch có theo dõi y khoa sát hơn."].map(x=><li key={x}>→ {x}</li>)}</ul></article>
          </div>
          <div className="authority-bridge"><div><small>KHÔNG CẦN CHỌN MỘT TRONG HAI</small><p>Identity Shift™ là lớp hỗ trợ thay đổi hành vi. Nó không thay thế việc xử lý lệ thuộc nicotine hoặc những hỗ trợ chuyên môn phù hợp.</p></div><div className="bridge-parts"><span>KẾ HOẠCH · TRIGGER · HÀNH VI</span><i>+</i><span>SỨC KHỎE · THUỐC · THEO DÕI</span></div></div>
        </div>
      </section>

      <section id="offer" className="section offer blueprint v2-offer">
        <div className="offer-card">
          <span className="offer-badge">COHORT PILOT · GIỚI HẠN 25 NGƯỜI</span>
          <small>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</small>
          <h2>7 ngày để xác định ngày bắt đầu và chuẩn bị kế hoạch cai thuốc cá nhân.</h2>
          <p className="offer-story">Phù hợp với mức độ lệ thuộc, trigger và đời sống thực tế của bạn — cùng nhịp đồng hành trong 21 ngày tiếp theo.</p>
          <ul className="check-list two-col">
            {["7 video hướng dẫn","7 workbook thực hành","Bộ công cụ triển khai","Kế hoạch & Tracker 21 ngày","Một buổi khởi động","Hai group check-in","Cộng đồng đồng hành 21 ngày","Hỗ trợ hoàn thiện kế hoạch"].map(x=><Check key={x}>{x}</Check>)}
          </ul>
          <div className="price"><span>MỨC ĐẦU TƯ COHORT PILOT</span><b>497.000 <i>VNĐ</i></b></div>
          <a className="button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày">TÔI MUỐN CHUẨN BỊ KẾ HOẠCH CAI THUỐC →</a>
          <p className="micro">Giới hạn 25 người · Có hỗ trợ thêm 14 ngày nếu đủ điều kiện</p>
        </div>
      </section>

      <section className="section faq v2-faq">
        <div className="wrap faq-grid">
          <div className="section-head left"><span>13 — CÂU HỎI THƯỜNG GẶP</span><h2>Những điều cần rõ trước khi bạn bắt đầu.</h2><p>Mục tiêu của chương trình là chuẩn bị một kế hoạch có thể triển khai — không hứa hẹn một kết quả giống nhau cho tất cả mọi người.</p></div>
          <div className="accordion faq-list">{faqs.map((f,i)=><article className={openFaq===i ? "open":""} key={f[0]}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}><span>{String(i+1).padStart(2,"0")}</span><div><b>{f[0]}</b></div><i>{openFaq===i?"−":"+"}</i></button>{openFaq===i&&<div className="accordion-body"><p>{f[1]}</p></div>}</article>)}</div>
        </div>
      </section>

      <section className="final blueprint v2-final">
        <div className="wrap final-inner">
          <span>BẠN CÓ THỂ TIẾP TỤC CHỜ MỘT THỜI ĐIỂM KHÁC</span>
          <h2>Hoặc dành 7 ngày để chuẩn bị một cách nghiêm túc hơn.</h2>
          <p>Không phải bằng một lời hứa mới. Mà bằng một ngày bắt đầu rõ ràng, một bản đồ trigger, một protocol xử lý cơn thèm, một kế hoạch 21 ngày và phương án quay lại nếu gặp đứt gãy.</p>
          <div className="final-questions">
            <p>“Khi cơn thèm xuất hiện, tôi sẽ làm gì?”</p>
            <p>“Khi stress quay lại, tôi sẽ phản ứng thế nào?”</p>
            <p>“Nếu lỡ trượt, tôi sẽ quay lại bằng cách nào?”</p>
          </div>
          <strong>497.000 VNĐ</strong>
          <a className="button" href="#offer">TÔI MUỐN BẮT ĐẦU KẾ HOẠCH CAI THUỐC →</a>
          <small>Cohort pilot · Giới hạn 25 người · Đồng hành 21 ngày</small>
        </div>
      </section>

      <footer><div className="wrap"><b>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</b><p>Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế, không kê đơn và không cam kết chữa bệnh hoặc một kết quả giống nhau cho tất cả mọi người.</p><span>© 2026 Identity Shift™</span></div></footer>

      <div className={`mobile-sticky ${showSticky ? "show":""}`}><div><small>COHORT PILOT</small><b>497.000 VNĐ</b></div><a href="#offer">THAM GIA NGAY →</a></div>
    </main>
  );
}
