"use client";

import { useEffect, useState } from "react";

const loops = {
  "Cà phê": ["Ly cà phê", "Tín hiệu nghỉ", "Tìm thuốc", "Hoàn tất nghi thức"],
  Stress: ["Áp lực", "Bồn chồn", "Muốn dừng lại", "Dễ chịu tạm thời"],
  "Giao tiếp": ["Bạn bè hút", "Muốn hòa nhập", "Nhận thuốc", "Phản ứng được củng cố"],
};

const days = [
  { n: 1, title: "Smoking Loop Audit™", outcome: "Nhìn rõ hoàn cảnh, trigger và vòng lặp đang duy trì hành vi.", work: "Rà soát lịch sử hút, tần suất, thời điểm, nhu cầu phía sau điếu thuốc và nguyên nhân từng quay lại.", output: "Smoking History Audit™ · Trigger Timeline™ · Smoking Loop Map™" },
  { n: 2, title: "Smoke-Free Identity Shift™", outcome: "Tách hành vi hút thuốc khỏi định nghĩa bản thân.", work: "Nhận diện nhãn dán, Identity hiện tại, Identity mong muốn và những bằng chứng hành vi cần tạo.", output: "Identity Bridge Statement™ · Identity Evidence List™" },
  { n: 3, title: "Physical Readiness Audit™", outcome: "Chuẩn bị thể chất và nhịp sống cho quá trình thay đổi.", work: "Rà soát giấc ngủ, caffeine, rượu bia, vận động, khoảng nghỉ và những thời điểm năng lượng suy giảm.", output: "Withdrawal Preparation Checklist™ · Personal Recovery Plan™" },
  { n: 4, title: "Trigger Replacement Design™", outcome: "Thiết kế lại môi trường và phản ứng.", work: "Phân loại trigger tình huống, cảm xúc, xã hội, thể chất và tạo phản ứng thay thế cho từng bối cảnh.", output: "Environment Audit™ · Personal Trigger Replacement Map™" },
  { n: 5, title: "State Reset Protocol™", outcome: "Làm chủ cơn thèm, stress và sự tập trung.", work: "Thiết kế protocol phản ứng nhanh, Smoke-Free Break, Focus Reset và High-Stress Action Plan.", output: "Craving & State Reset Protocol™" },
  { n: 6, title: "21-Day Smoke-Free Protocol™", outcome: "Biến bản đồ thành kế hoạch hành động.", work: "Chọn ngày bắt đầu, người hỗ trợ, tracker, milestone và phương án cho các tình huống khó.", output: "21-Day Tracker™ · Daily Identity Evidence Log™" },
  { n: 7, title: "Relapse Prevention Map™", outcome: "Phòng ngừa tái hút và phục hồi sau một lần trượt.", work: "Nhận diện cảnh báo sớm, tình huống nguy cơ cao và kế hoạch phản ứng trong 24 giờ.", output: "24-Hour Recovery Protocol™ · Relapse Prevention Map™" },
];

const faqs = [
  ["Tôi đã hút lâu năm có phù hợp không?", "Có. Chương trình được thiết kế cho người đã hút nhiều năm và từng gặp khó khăn khi bỏ. Bạn chỉ cần sẵn sàng quan sát trung thực vòng lặp hiện tại."],
  ["Tôi vẫn đang hút trong khi học có được không?", "Có. Chương trình bắt đầu từ việc quan sát hành vi hiện tại, thay vì yêu cầu bạn phải hoàn hảo trước khi tham gia."],
  ["Có phải ngừng hút ngay ngày đầu không?", "Không. Bạn sẽ audit tình trạng hiện tại, chuẩn bị môi trường và xây kế hoạch phù hợp với mức độ sẵn sàng của mình."],
  ["Tôi từng tái hút nhiều lần thì sao?", "Đây là một bài toán trung tâm của chương trình. Bạn sẽ xây Trigger Map, High-Risk Situation Plan và 24-Hour Recovery Protocol."],
  ["Tôi hút để giảm stress thì chương trình xử lý thế nào?", "Bạn sẽ xác định nhu cầu thật phía sau điếu thuốc và thiết kế phản ứng thay thế phù hợp với từng bối cảnh."],
  ["Chương trình có thay thế bác sĩ không?", "Không. Chương trình tập trung vào Identity, hành vi, trigger, môi trường và lối sống; không thay thế tư vấn hoặc điều trị y tế."],
  ["Tôi cần dành bao nhiêu thời gian mỗi ngày?", "Mỗi ngày gồm một bài học tập trung và một thành phẩm cụ thể. Điều quan trọng là hoàn thành workbook và đưa kết quả vào thực tế."],
  ["Nếu tôi hút lại một điếu thì sao?", "Một lần trượt không có nghĩa toàn bộ hành trình thất bại. Bạn sẽ dùng 24-Hour Recovery Protocol™ để dừng chuỗi, nhận diện trigger và quay lại hệ thống."],
];

const Check = ({ children }: { children: React.ReactNode }) => <li><span>✓</span>{children}</li>;

export default function Home() {
  const [activeLoop, setActiveLoop] = useState<keyof typeof loops>("Cà phê");
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
      <div className="announcement"><b>Mở bán giai đoạn đầu — 457.000 VNĐ</b><span>Một lựa chọn · Truy cập toàn bộ 7 ngày</span></div>

      <section className="hero blueprint">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><i /> 7-DAY SMOKE-FREE IDENTITY MAP™</div>
            <h1>Bạn không thiếu ý chí.</h1>
            <p className="hero-line">Bạn đang cố bỏ thuốc trong khi <em>vòng lặp cũ</em> vẫn còn nguyên.</p>
            <p className="lead">Trong 7 ngày, xây bản đồ cá nhân giúp bạn nhận diện trigger, xử lý cơn thèm, thiết kế lại môi trường và bắt đầu hành trình không khói thuốc bằng Identity Shift™.</p>
            <ul className="check-list">
              <Check>Nhìn rõ lý do bạn liên tục bỏ rồi hút lại.</Check>
              <Check>Có protocol xử lý cơn thèm và stress.</Check>
              <Check>Hoàn thiện kế hoạch hành động 21 ngày.</Check>
            </ul>
            <div className="hero-cta">
              <a className="button" href="#offer">XÂY BẢN ĐỒ CAI THUỐC CỦA TÔI <b>→</b></a>
              <div><small>MỞ BÁN ĐẦU TIÊN</small><strong>457.000 VNĐ</strong><span>Một chương trình · Không gói nâng cấp</span></div>
            </div>
          </div>
          <div className="map-mockup" aria-label="Mô phỏng bộ công cụ Bản đồ Cai thuốc">
            <div className="map-toolbar"><span>SMOKE-FREE OS</span><span>DAY 01 / 07</span></div>
            <div className="map-title"><small>PERSONAL BLUEPRINT</small><b>Identity Map</b><span>62% mapped</span></div>
            <div className="map-flow">
              {["TRIGGER", "STATE", "BEHAVIOR", "EVIDENCE"].map((x, i) => <div key={x}><i>{String(i + 1).padStart(2, "0")}</i><b>{x}</b><span>{["Cà phê / Deadline", "Bồn chồn", "Smoke-free break", "1 lần vượt qua"][i]}</span></div>)}
            </div>
            <div className="map-bottom"><span>21-DAY TRACKER</span><div>{Array.from({length: 21}).map((_, i) => <i className={i < 7 ? "on" : ""} key={i} />)}</div></div>
            <div className="float-card fc1"><small>CRAVING CARD</small><b>90s Reset</b></div>
            <div className="float-card fc2"><small>DAY 04</small><b>Trigger Map</b></div>
          </div>
        </div>
        <div className="hero-foot wrap"><span>↓</span> KHÔNG PHẢI MỘT LỜI CẢNH BÁO KHÁC. ĐÂY LÀ MỘT BẢN ĐỒ HÀNH ĐỘNG.</div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="section-head"><span>01 — PROBLEM MIRROR</span><h2>Bạn có đang mắc kẹt trong vòng lặp này?</h2><p>Những tình huống quen thuộc có thể đang vận hành như một hệ thống tự động.</p></div>
          <div className="problem-grid">
            {[
              ["“Hết gói này tôi sẽ bỏ.”","Ngày bắt đầu liên tục bị lùi lại."],
              ["Bỏ vài ngày rồi hút lại","Chỉ cần một cuộc họp căng thẳng hoặc một buổi nhậu."],
              ["Không mua nhưng vẫn xin","Ý định dừng lại bị phá vỡ bởi bối cảnh xã hội."],
              ["Hút để tập trung","Bạn sợ không có thuốc thì không làm việc được."],
              ["Hứa với gia đình nhiều lần","Càng thất bại càng mất niềm tin vào chính mình."],
              ["Không còn thích nhưng vẫn hút","Điếu thuốc đã trở thành một phản ứng tự động."],
            ].map((x,i) => <article className="problem-card" key={x[0]}><span>0{i+1}</span><div className="line-icon">{["↗","↻","—","⌁","△","○"][i]}</div><h3>{x[0]}</h3><p>{x[1]}</p></article>)}
          </div>
          <blockquote>Vấn đề không phải là bạn không muốn bỏ.<br/><b>Vấn đề là bạn chưa nhìn thấy toàn bộ hệ thống đang khiến mình hút lại.</b></blockquote>
        </div>
      </section>

      <section className="section warm">
        <div className="wrap loop-layout">
          <div className="section-head left"><span>02 — THE SMOKING LOOP</span><h2>Một điếu thuốc hiếm khi xuất hiện ngẫu nhiên.</h2><p>Câu hỏi không chỉ là “Làm sao để không hút điếu tiếp theo?” mà là: “Điều gì xảy ra ngay trước khi tôi muốn hút?”</p>
            <div className="tabs">{Object.keys(loops).map(k => <button className={activeLoop === k ? "active" : ""} onClick={() => setActiveLoop(k as keyof typeof loops)} key={k}>{k}</button>)}</div>
          </div>
          <div className="loop-diagram">
            {loops[activeLoop].map((x,i) => <div className="loop-node" key={x}><span>0{i+1}</span><b>{x}</b>{i < 3 && <i>↓</i>}</div>)}
            <div className="loop-result"><span>↻</span><b>VÒNG LẶP ĐƯỢC CỦNG CỐ</b><small>Não tiếp tục ghi nhận thuốc lá là giải pháp.</small></div>
          </div>
        </div>
      </section>

      <section className="section dark blueprint">
        <div className="wrap">
          <div className="section-head"><span>03 — IDENTITY SHIFT™</span><h2>Điếu thuốc không chỉ gắn với hành vi.<br/>Nó còn gắn với cách bạn định nghĩa chính mình.</h2></div>
          <div className="shift-grid">
            <article><small>BEFORE</small><h3>“Tôi là người nghiện đang cố bỏ.”</h3><p>Chống lại · Tự trách · Luôn giữ thuốc ở trung tâm.</p></article>
            <article className="bridge"><small>THE BRIDGE</small><h3>Identity Shift™</h3><p>Quan sát vòng lặp · Tách hành vi khỏi con người · Tạo bằng chứng mới.</p></article>
            <article><small>AFTER</small><h3>“Tôi không dùng thuốc để điều chỉnh trạng thái.”</h3><p>Có lựa chọn · Có protocol · Có môi trường hỗ trợ.</p></article>
          </div>
          <p className="proof-line">Nhận dạng mới không được tạo ra bằng một câu khẳng định. <b>Nó được củng cố bằng bằng chứng hành vi lặp lại.</b></p>
          <div className="chips">{["Một ly cà phê không thuốc","Một cơn thèm được xử lý","Một lần từ chối","Một khoảng nghỉ mới","Trượt nhưng quay lại kế hoạch"].map(x=><span key={x}>✓ {x}</span>)}</div>
        </div>
      </section>

      <section className="section system">
        <div className="wrap system-grid">
          <div className="section-head left"><span>04 — UNIQUE MECHANISM</span><h2>Smoke-Free<br/>Identity System™</h2><p>Sáu tầng cần được nhìn cùng nhau để vòng lặp hút thuốc có thể được thiết kế lại.</p><div className="system-core"><small>TRUNG TÂM</small><b>Smoke-Free<br/>Identity™</b></div></div>
          <div className="layers">
            {[
              ["01","IDENTITY","Bạn đang định nghĩa mình là ai?"],
              ["02","TRIGGER","Điều gì xảy ra ngay trước khi muốn hút?"],
              ["03","STATE","Bạn đang thực sự cần điều gì?"],
              ["04","BEHAVIOR","Bạn phản ứng tự động như thế nào?"],
              ["05","ENVIRONMENT","Điều gì đang củng cố hành vi?"],
              ["06","EVIDENCE","Bằng chứng mới nào cần được tạo?"],
            ].map(x=><article key={x[0]}><span>{x[0]}</span><div><b>{x[1]}</b><p>{x[2]}</p></div></article>)}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="fit-grid">
            <article className="fit yes"><span>✓ PHÙ HỢP VỚI BẠN NẾU</span><h2>Bạn muốn một hệ thống thực hành.</h2><ul>{["Đã hút nhiều năm hoặc từng bỏ rồi hút lại.","Hút khi stress, làm việc, uống cà phê hoặc nhậu.","Không còn thích nhưng vẫn thấy mình phụ thuộc.","Muốn thay đổi vì sức khỏe, gia đình hoặc lòng tự trọng.","Sẵn sàng quan sát, ghi chép và điều chỉnh môi trường."].map(x=><Check key={x}>{x}</Check>)}</ul></article>
            <article className="fit no"><span>— CHƯA PHÙ HỢP NẾU</span><h2>Bạn đang tìm một mẹo nhanh.</h2><ul>{["Chưa có bất kỳ ý định thay đổi nào.","Tham gia hoàn toàn vì bị người khác ép.","Không muốn hoàn thành bài tập thực hành.","Kỳ vọng chương trình thay thế bác sĩ.","Muốn được bảo đảm tuyệt đối sẽ không bao giờ hút lại."].map(x=><li key={x}><span>—</span>{x}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="section warm">
        <div className="wrap">
          <div className="section-head"><span>05 — YOUR TOOLKIT</span><h2>Sau 7 ngày, bạn không chỉ biết thêm về cai thuốc.</h2><p>Bạn hoàn thiện một bộ bản đồ và protocol dành cho chính mình.</p></div>
          <div className="asset-grid">
            {[
              ["01","Smoking Loop Map™","Hiểu hoàn cảnh, trigger và nhu cầu phía sau điếu thuốc."],
              ["02","Identity Statement™","Định hướng nhận dạng mới thực tế và có thể hành động."],
              ["03","Physical Readiness Plan™","Chuẩn bị giấc ngủ, caffeine, vận động và phục hồi."],
              ["04","Trigger Replacement Map™","Phản ứng thay thế cho từng tình huống nguy cơ cao."],
              ["05","Craving & State Reset™","Biết phải làm gì khi cơn thèm và stress xuất hiện."],
              ["06","21-Day Action Plan™","Kế hoạch hành động rõ ràng cho 21 ngày tiếp theo."],
              ["07","Relapse Prevention Map™","Phòng ngừa và quay lại lộ trình sau một lần trượt."],
            ].map((x,i)=><article className="asset" key={x[0]}><div className="asset-paper"><span>DAY {x[0]}</span><b>{x[1].split("™")[0]}</b><i></i><i></i><i></i></div><small>HOÀN THÀNH NGÀY {i+1}</small><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
          </div>
          <div className="center-cta"><a className="button dark-button" href="#offer">XÂY BẢN ĐỒ CAI THUỐC CỦA TÔI →</a></div>
        </div>
      </section>

      <section className="section curriculum">
        <div className="wrap curriculum-grid">
          <div className="section-head left sticky-head"><span>06 — 7-DAY PROTOCOL</span><h2>Mỗi ngày hoàn thiện một phần của bản đồ.</h2><p>Không kéo dài bằng kiến thức lan man. Mỗi module xử lý một vấn đề và tạo ra một thành phẩm cụ thể.</p><div className="days-count"><b>7</b><span>NGÀY<br/>7 THÀNH PHẨM</span></div></div>
          <div className="accordion">
            {days.map(day => <article className={openDay===day.n ? "open" : ""} key={day.n}>
              <button onClick={()=>setOpenDay(openDay===day.n ? 0 : day.n)} aria-expanded={openDay===day.n}><span>NGÀY {day.n}</span><div><b>{day.title}</b><p>{day.outcome}</p></div><i>{openDay===day.n ? "−":"+"}</i></button>
              {openDay===day.n && <div className="accordion-body"><p>{day.work}</p><small>THÀNH PHẨM</small><b>{day.output}</b></div>}
            </article>)}
          </div>
        </div>
      </section>

      <section className="section dark experience">
        <div className="wrap">
          <div className="section-head"><span>07 — PRODUCT EXPERIENCE</span><h2>Mỗi ngày: Một bài học — Một workbook — Một thành phẩm.</h2></div>
          <div className="experience-grid">
            {[["01","Xem bài học","Một vấn đề trọng tâm, trình bày rõ ràng."],["02","Hoàn thành workbook","Áp dụng vào lịch sử và trigger cá nhân."],["03","Cập nhật bản đồ","Mỗi ngày thêm một phần vào hệ thống."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
          </div>
          <div className="tool-strip">{["7 VIDEO","7 WORKBOOK","21-DAY TRACKER","EMERGENCY CARD","REFUSAL SCRIPT","MORNING RESET","HIGH-RISK PLAYBOOK"].map(x=><span key={x}>{x}</span>)}</div>
        </div>
      </section>

      <section className="section founder">
        <div className="wrap founder-grid">
          <div className="portrait-placeholder"><span>ĐẠT</span><div className="portrait-mark">10</div><p>NĂM TRONG VÒNG LẶP<br/>HÚT THUỐC</p></div>
          <div><div className="section-head left"><span>08 — SELF PROOF™</span><h2>Tôi từng nghĩ mình thiếu ý chí.</h2></div>
            <p className="big-copy">Tôi từng hút thuốc trong khoảng 10 năm. Thuốc lá xuất hiện khi làm việc, suy nghĩ, căng thẳng, nghỉ ngơi và giao tiếp.</p>
            <p>Càng cố gồng, tôi càng giữ thuốc lá ở trung tâm nhận dạng: “Tôi là người hút thuốc đang cố bỏ.” Bước chuyển bắt đầu khi tôi hỏi một câu khác: <b>“Tôi đang sống từ nhận dạng nào?”</b></p>
            <p>Từ đó, tôi thiết kế lại môi trường, nhịp sinh hoạt, cách nghỉ, cách xử lý stress và phản ứng khi trigger xuất hiện. Đó là nền tảng để Bản đồ Cai thuốc 7 ngày™ được hình thành.</p>
            <div className="timeline">{["HÚT KÉO DÀI","CỐ BỎ","NHẬN RA IDENTITY LOOP","THIẾT KẾ LẠI","SMOKE-FREE SYSTEM"].map((x,i)=><span key={x}>{x}{i<4&&<i>→</i>}</span>)}</div>
            <small className="note">Câu chuyện cá nhân không bảo đảm mọi người đạt cùng kết quả trong cùng thời gian.</small>
          </div>
        </div>
      </section>

      <section className="section warm evidence">
        <div className="wrap">
          <div className="section-head"><span>09 — TRANSFERABLE PROOF™</span><h2>Hơn 100 hành trình giúp tôi nhìn rõ cách kháng cự vận hành.</h2><p>Đây là các trường hợp thực tế về trì hoãn, tự phá, mất niềm tin và quay lại hành vi cũ được phân tích qua Identity Shift™.</p></div>
          <div className="pattern-grid">{["Biết phải làm gì nhưng không hành động","Bắt đầu mạnh nhưng không duy trì","Gặp áp lực và quay lại phản ứng cũ","Dùng thất bại để định nghĩa bản thân"].map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div>
          <div className="pattern-flow">{["MUỐN THAY ĐỔI","GẶP TRIGGER","PHẢN ỨNG CŨ","TỰ TRÁCH","GẮN NHÃN","MẤT NIỀM TIN","LẶP LẠI"].map((x,i)=><span key={x}>{x}{i<6&&<i>→</i>}</span>)}</div>
          <div className="trust-note"><b>GHI CHÚ MINH BẠCH</b><p>Các trường hợp này chứng minh kinh nghiệm làm việc với kháng cự và hành vi; không được sử dụng để tuyên bố rằng hơn 100 người đã cai thuốc.</p></div>
        </div>
      </section>

      <section className="section authority">
        <div className="wrap authority-panel">
          <article><span>VAI TRÒ CỦA TÔI</span><h2>Identity Coach</h2><p>Giúp bạn nhận diện và thiết kế lại mối liên hệ giữa Identity, trigger, trạng thái, hành vi và môi trường.</p></article>
          <article><span>VAI TRÒ NÀY KHÔNG BAO GỒM</span><h2>Hỗ trợ y khoa</h2><ul><li>Chẩn đoán hoặc điều trị lệ thuộc.</li><li>Thay thế bác sĩ hoặc dược sĩ.</li><li>Cam kết chữa bệnh hoặc không bao giờ tái hút.</li></ul></article>
        </div>
      </section>

      <section id="offer" className="section offer blueprint">
        <div className="offer-card">
          <span className="offer-badge">MỞ BÁN GIAI ĐOẠN ĐẦU</span>
          <small>SMOKE-FREE IDENTITY SYSTEM™</small>
          <h2>BẢN ĐỒ CAI THUỐC<br/>7 NGÀY™</h2>
          <ul className="check-list two-col">
            {["7 video bài học","7 workbook thực hành","Smoke-Free Identity Canvas™","Trigger Replacement Map™","Craving & State Reset Protocol™","Kế hoạch hành động 21 ngày","Relapse Prevention Map™","Bộ công cụ hỗ trợ đi kèm"].map(x=><Check key={x}>{x}</Check>)}
          </ul>
          <div className="price"><span>MỨC GIÁ MỞ BÁN ĐẦU TIÊN</span><b>457.000 <i>VNĐ</i></b></div>
          <a className="button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc 7 ngày">BẮT ĐẦU XÂY BẢN ĐỒ CỦA TÔI →</a>
          <p className="micro">Một lựa chọn duy nhất · Nhận toàn bộ nội dung · Không có gói nâng cấp</p>
        </div>
      </section>

      <section className="section faq">
        <div className="wrap faq-grid">
          <div className="section-head left"><span>10 — FAQ</span><h2>Những câu hỏi thường gặp.</h2><p>Nếu bạn đang cân nhắc liệu chương trình có phù hợp, hãy bắt đầu từ đây.</p></div>
          <div className="accordion faq-list">{faqs.map((f,i)=><article className={openFaq===i ? "open":""} key={f[0]}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}><span>{String(i+1).padStart(2,"0")}</span><div><b>{f[0]}</b></div><i>{openFaq===i?"−":"+"}</i></button>{openFaq===i&&<div className="accordion-body"><p>{f[1]}</p></div>}</article>)}</div>
        </div>
      </section>

      <section className="final blueprint">
        <div className="wrap final-inner">
          <span>YOUR NEXT MOVE</span>
          <h2>Bạn không cần thêm một lời cảnh báo về tác hại của thuốc lá.</h2>
          <p>Điều bạn cần là nhìn rõ vì sao mình hút và biết phải làm gì khi trigger xuất hiện trong đời sống thực tế.</p>
          <div className="from-to"><div><small>TỪ</small><b>“Tôi biết mình nên bỏ.”</b></div><i>→</i><div><small>SANG</small><b>“Tôi hiểu vòng lặp và có kế hoạch để bắt đầu.”</b></div></div>
          <strong>457.000 VNĐ</strong>
          <a className="button" href="#offer">BẮT ĐẦU HÀNH TRÌNH KHÔNG KHÓI THUỐC →</a>
          <small>Một chương trình duy nhất · Toàn bộ 7 ngày và bộ công cụ thực hành</small>
        </div>
      </section>

      <footer><div className="wrap"><b>BẢN ĐỒ CAI THUỐC 7 NGÀY™</b><p>Chương trình hướng dẫn về nhận dạng, hành vi và lối sống; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế. Nếu có dấu hiệu sức khỏe nghiêm trọng, hãy tìm hỗ trợ chuyên môn phù hợp.</p><span>© 2026 Identity Shift™</span></div></footer>

      <div className={`mobile-sticky ${showSticky ? "show":""}`}><div><small>MỞ BÁN</small><b>457.000 VNĐ</b></div><a href="#offer">THAM GIA NGAY →</a></div>
    </main>
  );
}
