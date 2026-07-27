"use client";

import { useEffect, useState } from "react";

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
            <div className="eyebrow"><i /> CÓ THỂ BẠN ĐÃ TỪNG THỬ RẤT NHIỀU LẦN</div>
            <h1>Bạn không thiếu ý chí.</h1>
            <p className="hero-line">Có thể bạn chỉ đang cố bỏ thuốc trong khi <em>vòng lặp cũ</em> vẫn còn nguyên.</p>
            <p className="lead">Bạn đã từng dừng được vài giờ, vài ngày, thậm chí vài tháng. Rồi một ly cà phê, một cuộc họp căng thẳng hay một buổi nhậu quen thuộc xuất hiện — và bạn lại cầm điếu thuốc lên.</p>
            <ul className="check-list">
              <Check>Không phải vì bạn chưa từng nghiêm túc muốn bỏ.</Check>
              <Check>Không phải vì bạn không biết thuốc lá có hại.</Check>
              <Check>Có thể bạn chỉ chưa nhìn thấy cả hệ thống phía sau.</Check>
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
        <div className="hero-foot wrap"><span>↓</span> CÂU CHUYỆN KHÔNG BẮT ĐẦU TỪ ĐIẾU THUỐC. NÓ BẮT ĐẦU TỪ NHỮNG GÌ XẢY RA NGAY TRƯỚC ĐÓ.</div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="section-head"><span>01 — MỘT CÂU CHUYỆN RẤT QUEN</span><h2>Mọi chuyện thường bắt đầu bằng một lời hứa.</h2><p>“Hết gói này tôi sẽ bỏ.” Bạn nói thật lòng. Nhưng rồi cuộc sống tiếp tục diễn ra.</p></div>
          <div className="narrative">
            <p>Bạn có thể đã hứa điều đó với chính mình. Có thể bạn còn hứa với vợ, với con, hoặc với một người thực sự lo cho bạn.</p>
            <p>Và bạn không nói cho có.</p>
            <p>Bạn từng giảm số điếu mỗi ngày. Từng không mua thuốc. Từng né những người hay rủ hút. Có lần bạn dừng được vài ngày. Cũng có thể từng dừng được vài tháng.</p>
            <div className="story-scene">
              <small>RỒI MỘT NGÀY BÌNH THƯỜNG XẢY RA</small>
              <p>Sáng là một ly cà phê. Trưa là cuộc họp kéo dài. Chiều có một deadline gấp. Tối đến, ai đó đưa cho bạn một điếu thuốc và nói: “Một điếu thôi mà.”</p>
            </div>
            <p>Trước khi bạn kịp cân nhắc lại tất cả những lý do mình muốn bỏ, bàn tay đã làm điều nó quen làm.</p>
            <p>Điếu thuốc được châm lên.</p>
            <p>Và sau vài phút dễ chịu ngắn ngủi, một cảm giác khác xuất hiện: <b>“Mình lại thất bại rồi.”</b></p>
            <div className="thoughts">
              <span>“Có lẽ tôi không đủ ý chí.”</span>
              <span>“Tôi hút lâu quá rồi, chắc không bỏ được.”</span>
              <span>“Thôi, để tuần sau bắt đầu lại.”</span>
            </div>
            <p>Mình biết — đến đây có thể bạn đang nghĩ: <b>“Đúng, câu chuyện của tôi gần như vậy.”</b></p>
            <p>Nhưng có một điều rất quan trọng bạn cần biết.</p>
          </div>
          <blockquote>Vấn đề có thể không phải là bạn không muốn bỏ.<br/><b>Có thể bạn chỉ chưa nhìn thấy toàn bộ hệ thống đang khiến mình hút lại.</b></blockquote>
        </div>
      </section>

      <section className="section warm">
        <div className="wrap">
          <div className="narrative story-section">
            <span className="story-label">02 — HÃY QUAY CHẬM CÂU CHUYỆN LẠI</span>
            <h2>Một điếu thuốc hiếm khi xuất hiện ngẫu nhiên.</h2>
            <p>Bạn thử nhớ lại lần gần nhất mình hút nhé.</p>
            <p>Có chuyện gì xảy ra ngay trước đó?</p>
            <div className="mini-story">
              <p>Có thể bạn vừa rời khỏi một cuộc họp.</p>
              <p>Có thể ly cà phê đã được đặt lên bàn.</p>
              <p>Hoặc bạn chỉ cần một lý do để bước ra ngoài vài phút.</p>
            </div>
            <p>Thường thì câu chuyện không đi thẳng từ <b>“không hút”</b> đến <b>“hút thuốc”</b>.</p>
            <p>Ở giữa hai điểm đó là một chuỗi phản ứng rất nhanh. Nhanh đến mức bạn gần như không nhận ra mình vừa đi qua nó.</p>

            <div className="story-chain">
              <article><span>01</span><small>BỐI CẢNH</small><p>Ly cà phê được pha xong. Cuộc họp vừa kết thúc. Một người bạn bước ra ban công.</p></article>
              <article><span>02</span><small>TRIGGER</small><p>Một hình ảnh, cảm giác hoặc nghi thức quen thuộc báo cho cơ thể rằng: “Đến lúc hút rồi.”</p></article>
              <article><span>03</span><small>TRẠNG THÁI</small><p>Bạn thấy bồn chồn, căng thẳng, thiếu tập trung — hoặc đơn giản chỉ muốn được nghỉ một chút.</p></article>
              <article><span>04</span><small>SUY NGHĨ TỰ ĐỘNG</small><p>“Một điếu thôi.” “Hút xong rồi làm tiếp.” “Không có thuốc thì khó tập trung lắm.”</p></article>
              <article><span>05</span><small>PHẢN ỨNG QUEN THUỘC</small><p>Bạn cầm điếu thuốc lên và cảm giác khó chịu tạm thời dịu xuống.</p></article>
            </div>

            <p>Não ghi nhận điều vừa xảy ra theo một cách rất đơn giản:</p>
            <div className="story-equation">Khó chịu <i>→</i> Hút thuốc <i>→</i> Dễ chịu hơn một chút</div>
            <p>Và thế là lần sau, khi đúng bối cảnh xuất hiện, não lại đề xuất cùng một giải pháp.</p>

            <div className="story-example">
              <small>VÍ DỤ VỚI LY CÀ PHÊ</small>
              <p>Bạn không chỉ hút <em>sau khi uống cà phê</em>. Qua nhiều lần lặp lại, hai việc có thể đã được nối thành một nghi thức:</p>
              <strong>Cà phê = nghỉ ngơi = thuốc lá.</strong>
            </div>

            <p>Tương tự, khi stress xuất hiện, điếu thuốc có thể trở thành một nút chuyển trạng thái:</p>
            <div className="story-equation subtle">Áp lực <i>→</i> Hút thuốc <i>→</i> Được dừng lại một chút</div>

            <p>Đây là lý do chỉ cố loại bỏ điếu thuốc thường rất khó.</p>
            <p>Điếu thuốc có thể biến mất khỏi tay bạn trong một thời gian, nhưng cách cơ thể và tâm trí xử lý cà phê, stress, khoảng nghỉ và giao tiếp vẫn còn nguyên.</p>

            <p>Vì vậy, thay vì chỉ hỏi:</p>
            <div className="story-question muted">“Làm sao để tôi không hút điếu tiếp theo?”</div>
            <p>Hãy thử bắt đầu bằng một câu hỏi khác:</p>
            <div className="story-question">“Tôi đang thật sự cần điều gì trong khoảnh khắc này?”</div>

            <p>Khi trả lời được câu hỏi đó, bạn không còn chỉ chống lại điếu thuốc.</p>
            <p>Bạn bắt đầu nhìn thấy nhu cầu, trigger và phản ứng đang nằm phía sau nó.</p>

            <div className="turn-line">Và đó là lúc câu chuyện không còn chỉ nói về một hành vi.</div>
          </div>
        </div>
      </section>

      <section className="section dark blueprint">
        <div className="wrap">
          <div className="section-head"><span>03 — KHI MỘT HÀNH VI TRỞ THÀNH MỘT CÁI NHÃN</span><h2>Rồi một ngày, bạn không chỉ nói về việc hút thuốc.<br/>Bạn bắt đầu nói về chính mình.</h2><p>“Tôi là người nghiện.” “Tôi không đủ ý chí.” “Tôi đã thử nhiều lần nhưng không được.” Những câu ấy dần trở thành kịch bản cho lần tiếp theo.</p></div>
          <div className="dark-narrative">
            <p>Mình không mong bạn chỉ đổi một câu nói rồi mọi thứ lập tức thay đổi. Identity Shift™ không phải một lời khẳng định tích cực để lặp lại trước gương.</p>
            <p>Nó bắt đầu bằng việc tách một hành vi đã lặp lại trong quá khứ khỏi định nghĩa toàn bộ con người bạn.</p>
          </div>
          <div className="shift-grid">
            <article><small>CÂU CHUYỆN CŨ</small><h3>“Tôi là người nghiện đang cố bỏ.”</h3><p>Mỗi cơn thèm là một cuộc chiến. Mỗi lần trượt là bằng chứng rằng bạn không thể.</p></article>
            <article className="bridge"><small>ĐIỂM CHUYỂN</small><h3>Identity Shift™</h3><p>Bạn quan sát vòng lặp, tách hành vi khỏi con người và bắt đầu viết lại phản ứng.</p></article>
            <article><small>CÂU CHUYỆN MỚI</small><h3>“Tôi đang học cách điều chỉnh trạng thái mà không cần thuốc.”</h3><p>Mỗi lựa chọn mới là một bằng chứng nhỏ rằng bạn có thể vận hành khác đi.</p></article>
          </div>
          <p className="proof-line">Bạn không cần giả vờ quá khứ chưa từng xảy ra. <b>Bạn chỉ cần ngừng dùng quá khứ để quyết định toàn bộ con người mình.</b></p>
          <div className="chips">{["Một ly cà phê không thuốc","Một cơn thèm được xử lý","Một lần từ chối","Một khoảng nghỉ mới","Trượt nhưng quay lại kế hoạch"].map(x=><span key={x}>✓ {x}</span>)}</div>
          <div className="dark-narrative closing">
            <p>Một lần vượt qua cơn thèm. Một cuộc họp căng thẳng nhưng không tìm thuốc. Một lần được mời và bạn có thể nói “không”.</p>
            <p>Từng việc rất nhỏ ấy trở thành bằng chứng rằng một Smoke-Free Identity™ đang được hình thành.</p>
          </div>
        </div>
      </section>

      <section className="section system">
        <div className="wrap">
          <div className="system-opening">
            <div className="section-head left">
              <span>04 — NHƯNG VẪN CÒN MỘT VẤN ĐỀ</span>
              <h2>Biết vòng lặp tồn tại là chưa đủ.</h2>
            </div>
            <div className="system-opening-copy">
              <p>Bạn cần biết <b>vòng lặp của riêng mình</b> bắt đầu ở đâu, được nuôi bởi điều gì và phải thay phản ứng nào trong từng hoàn cảnh thật.</p>
              <p>Đó là lý do <b>Bản đồ Cai thuốc 7 ngày™</b> được xây dựng — để biến những gì đang xảy ra trong đầu, trong cơ thể và xung quanh bạn thành một hệ thống có thể nhìn thấy.</p>
            </div>
          </div>

          <div className="system-intro-panel">
            <div className="system-core"><small>SMOKE-FREE</small><b>Identity<br/>System™</b></div>
            <div>
              <span>6 TẦNG CỦA VÒNG LẶP</span>
              <h3>Không tầng nào hoạt động một mình.</h3>
              <p>Một trigger có thể tạo ra trạng thái khó chịu. Trạng thái ấy gọi lên hành vi cũ. Môi trường làm hành vi trở nên dễ thực hiện. Và mỗi lần lặp lại, bạn càng tin rằng đó là “con người mình”.</p>
              <p>Vì vậy, muốn thay đổi bền hơn, cả sáu tầng cần được nhìn cùng nhau.</p>
            </div>
          </div>

          <div className="layers detailed-layers">
            {[
              ["01","IDENTITY","Nhận dạng","Bạn đang kể câu chuyện gì về mình?","“Tôi là người nghiện.” “Tôi phải hút khi stress.” “Tôi không đủ ý chí.” Những câu này không chỉ mô tả quá khứ — chúng có thể âm thầm hướng dẫn quyết định tiếp theo.","Bạn sẽ tách hành vi hút thuốc khỏi định nghĩa toàn bộ con người mình và xây một Identity Bridge Statement™ thực tế."],
              ["02","TRIGGER","Tín hiệu kích hoạt","Điều gì xảy ra ngay trước khi bạn muốn hút?","Đó có thể là ly cà phê, sau bữa ăn, cuộc họp, deadline, rượu bia, một người bạn, cảm giác buồn chán hoặc sự bồn chồn trong cơ thể.","Bạn sẽ lập Trigger Inventory™ và nhận diện các tình huống nguy cơ cao thay vì chờ đến khi cơn thèm đã xuất hiện."],
              ["03","STATE","Trạng thái thật","Phía sau điếu thuốc, bạn đang cần điều gì?","Có thể bạn cần nghỉ, bình tĩnh lại, lấy lại tập trung, được kết nối với người khác hoặc thoát khỏi một cảm giác khó chịu trong vài phút.","Bạn sẽ gọi đúng tên nhu cầu thật và xây State Reset Protocol™ phù hợp với từng trạng thái."],
              ["04","BEHAVIOR","Phản ứng tự động","Khi trigger xuất hiện, bạn thường làm gì tiếp theo?","Bước ra ban công. Tìm bao thuốc. Xin một điếu. Châm lửa trước khi kịp nghĩ. Đây là chuỗi hành động đã được lặp đến mức gần như tự động.","Bạn sẽ thiết kế phản ứng thay thế đủ cụ thể để có thể làm ngay trong đúng bối cảnh."],
              ["05","ENVIRONMENT","Môi trường","Điều gì đang khiến phản ứng cũ luôn dễ hơn?","Bao thuốc trong túi, gạt tàn trên bàn, nhóm bạn cùng hút, góc ban công quen thuộc, giờ nghỉ cố định hay những buổi nhậu đều có thể củng cố vòng lặp.","Bạn sẽ điều chỉnh người, nơi chốn, đồ vật và nghi thức để lựa chọn mới không phải dựa hoàn toàn vào ý chí."],
              ["06","EVIDENCE","Bằng chứng mới","Điều gì giúp nhận dạng mới trở nên đáng tin?","Không phải một lời khẳng định. Đó là một ly cà phê không thuốc, một lần từ chối, một cơn thèm được xử lý hoặc một lần trượt nhưng quay lại kế hoạch.","Bạn sẽ ghi lại Daily Identity Evidence™ để mỗi hành vi mới trở thành bằng chứng cho Smoke-Free Identity™."],
            ].map(x=><article key={x[0]}>
              <div className="layer-head"><span>{x[0]}</span><small>{x[1]}</small><b>{x[2]}</b></div>
              <h3>{x[3]}</h3>
              <p>{x[4]}</p>
              <div className="layer-action"><small>TRONG CHƯƠNG TRÌNH</small><p>{x[5]}</p></div>
            </article>)}
          </div>

          <div className="system-case">
            <div className="case-intro">
              <span>MỘT TÌNH HUỐNG — SÁU TẦNG</span>
              <h3>Hãy lấy một cuộc họp căng thẳng làm ví dụ.</h3>
              <p>Nếu chỉ nhìn vào điếu thuốc, bạn sẽ thấy một hành vi cần dừng. Nhưng khi đặt tình huống lên bản đồ, bạn nhìn thấy toàn bộ câu chuyện:</p>
            </div>
            <div className="case-flow">
              {[
                ["TRIGGER","Cuộc họp vừa kết thúc."],
                ["STATE","Bạn căng, bồn chồn và cần một khoảng dừng."],
                ["BEHAVIOR","Bạn bước ra chỗ quen thuộc và tìm thuốc."],
                ["ENVIRONMENT","Đồng nghiệp đang hút; bao thuốc ở ngay trong túi."],
                ["IDENTITY","“Tôi luôn cần thuốc để hạ stress.”"],
                ["EVIDENCE MỚI","Bạn thực hiện một Smoke-Free Break và quay lại làm việc."],
              ].map((x,i)=><article key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><small>{x[0]}</small><p>{x[1]}</p></article>)}
            </div>
            <div className="case-reframe">
              <small>ĐIỂM CHUYỂN KHÔNG PHẢI LÀ “CỐ ĐỪNG HÚT”</small>
              <p>Mà là chuẩn bị trước một cách khác để nghỉ, hạ căng thẳng và quay lại công việc — ngay trong bối cảnh thật đã từng kích hoạt bạn.</p>
            </div>
          </div>

          <div className="system-path">
            <div>
              <span>BẢN ĐỒ 7 NGÀY SẼ ĐƯA BẠN ĐI QUA</span>
              <h3>Từ nhìn thấy vòng lặp đến có kế hoạch phản ứng.</h3>
            </div>
            <ol>
              {["Nhận diện vòng lặp hiện tại","Tách hành vi khỏi Identity","Chuẩn bị thể chất và nhịp sống","Thiết kế lại trigger và môi trường","Xây protocol xử lý cơn thèm","Lập kế hoạch hành động 21 ngày","Phòng ngừa và phục hồi sau đứt gãy"].map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <div className="narrative fit-intro">
            <p>Đến đây, có thể bạn tự hỏi: <b>“Nhưng chương trình này có thực sự dành cho tôi không?”</b></p>
            <p>Câu trả lời không phụ thuộc vào việc bạn đã hút bao nhiêu năm hay đã thất bại bao nhiêu lần. Nó phụ thuộc vào việc bạn có sẵn sàng nhìn thẳng vào vòng lặp và thực hành một cách mới hay không.</p>
          </div>
          <div className="fit-grid">
            <article className="fit yes"><span>✓ CÓ THỂ ĐÂY LÀ LÚC PHÙ HỢP NẾU</span><h2>Bạn đã mệt vì phải bắt đầu lại.</h2><ul>{["Bạn từng bỏ một thời gian rồi hút lại khi áp lực quay về.","Thuốc lá gắn với cà phê, công việc, khoảng nghỉ hoặc những cuộc gặp.","Bạn không còn thật sự thích hút nhưng vẫn tìm đến nó theo phản xạ.","Bạn muốn thay đổi vì sức khỏe, gia đình hoặc cảm giác làm chủ bản thân.","Bạn sẵn sàng quan sát câu chuyện của mình mà không phán xét."].map(x=><Check key={x}>{x}</Check>)}</ul></article>
            <article className="fit no"><span>— CÓ THỂ CHƯA PHẢI LÚC NẾU</span><h2>Bạn chỉ muốn một mẹo thật nhanh.</h2><ul>{["Bạn hoàn toàn chưa có ý định thay đổi.","Bạn tham gia chỉ vì người khác ép buộc.","Bạn không muốn quan sát trigger hay hoàn thành bài thực hành.","Bạn kỳ vọng chương trình thay thế bác sĩ hoặc điều trị y tế.","Bạn cần một lời bảo đảm tuyệt đối rằng sẽ không bao giờ hút lại."].map(x=><li key={x}><span>—</span>{x}</li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="section warm">
        <div className="wrap">
          <div className="section-head"><span>05 — VẬY SAU 7 NGÀY, BẠN THỰC SỰ CÓ GÌ?</span><h2>Không phải thêm một danh sách tác hại để ghi nhớ.</h2><p>Bạn có một hệ thống được viết từ chính lịch sử, trigger và đời sống của mình.</p></div>
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
          <div className="section-head left sticky-head"><span>06 — TỪ “VÌ SAO?” ĐẾN “TIẾP THEO LÀ GÌ?”</span><h2>Mỗi ngày, một mảnh của bản đồ được hoàn thiện.</h2><p>Ngày đầu tiên bạn nhìn lại. Những ngày tiếp theo bạn hiểu, chuẩn bị, thiết kế lại và bắt đầu hành động — không cần nuốt một khối lý thuyết dài.</p><div className="days-count"><b>7</b><span>NGÀY<br/>7 THÀNH PHẨM</span></div></div>
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
          <div className="section-head"><span>07 — MỘT NHỊP HỌC ĐI CÙNG ĐỜI SỐNG</span><h2>Mỗi ngày: nghe một điều — viết về mình — mang một thay đổi ra thực tế.</h2></div>
          <div className="experience-grid">
            {[["01","Nghe câu chuyện được giải mã","Một bài học ngắn giúp bạn nhìn vấn đề quen thuộc bằng góc nhìn mới."],["02","Viết câu chuyện của chính mình","Workbook đưa bạn về với lịch sử, trigger và những khoảnh khắc thật."],["03","Tạo một lựa chọn mới","Mỗi ngày thêm một phản ứng cụ thể vào Smoke-Free Identity Map™."]].map(x=><article key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></article>)}
          </div>
          <div className="tool-strip">{["7 VIDEO","7 WORKBOOK","21-DAY TRACKER","EMERGENCY CARD","REFUSAL SCRIPT","MORNING RESET","HIGH-RISK PLAYBOOK"].map(x=><span key={x}>{x}</span>)}</div>
        </div>
      </section>

      <section className="section founder">
        <div className="wrap founder-grid">
          <div className="portrait-placeholder"><span>ĐẠT</span><div className="portrait-mark">10</div><p>NĂM TRONG VÒNG LẶP<br/>HÚT THUỐC</p></div>
          <div><div className="section-head left"><span>08 — VÌ SAO TÔI TẠO RA CHƯƠNG TRÌNH NÀY?</span><h2>Tôi từng nghĩ mình thiếu ý chí.</h2></div>
            <p className="big-copy">Trong khoảng 10 năm, thuốc lá đi cùng tôi qua công việc, những lúc cần suy nghĩ, các cuộc gặp và cả những khoảnh khắc tôi không biết phải xử lý cảm xúc ra sao.</p>
            <p>Tôi từng tưởng chỉ cần quyết tâm hơn. Nhưng mỗi lần cố gồng, câu nói “Tôi là người hút thuốc đang cố bỏ” lại giữ thuốc lá ở ngay trung tâm cuộc sống của tôi.</p>
            <div className="founder-quote">“Nếu không chỉ hỏi làm sao cưỡng lại điếu thuốc, mà hỏi mình đang vận hành từ nhận dạng nào thì sao?”</div>
            <p>Đó là lúc tôi bắt đầu nhìn lại môi trường, nhịp sinh hoạt, cách nghỉ, cách xử lý stress và từng trigger nhỏ. Không có một khoảnh khắc phép màu. Có một chuỗi lựa chọn mới được lặp lại — và từng lựa chọn trở thành bằng chứng cho một con người khác.</p>
            <p><b>Bản đồ Cai thuốc 7 ngày™ được hình thành từ chính hành trình đó.</b></p>
            <div className="timeline">{["HÚT KÉO DÀI","CỐ BỎ","NHẬN RA IDENTITY LOOP","THIẾT KẾ LẠI","SMOKE-FREE SYSTEM"].map((x,i)=><span key={x}>{x}{i<4&&<i>→</i>}</span>)}</div>
            <small className="note">Câu chuyện cá nhân không bảo đảm mọi người đạt cùng kết quả trong cùng thời gian.</small>
          </div>
        </div>
      </section>

      <section className="section warm evidence">
        <div className="wrap">
          <div className="section-head"><span>09 — VÀ RỒI TÔI NHẬN RA ĐÂY KHÔNG CHỈ LÀ CÂU CHUYỆN CỦA MÌNH</span><h2>Sau hơn 100 hành trình, kháng cự thường kể cùng một câu chuyện.</h2><p>Con người muốn thay đổi, gặp một trigger, quay lại phản ứng cũ rồi dùng chính lần thất bại ấy để gắn nhãn bản thân.</p></div>
          <div className="pattern-grid">{["Biết phải làm gì nhưng không hành động","Bắt đầu mạnh nhưng không duy trì","Gặp áp lực và quay lại phản ứng cũ","Dùng thất bại để định nghĩa bản thân"].map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div>
          <div className="pattern-flow">{["MUỐN THAY ĐỔI","GẶP TRIGGER","PHẢN ỨNG CŨ","TỰ TRÁCH","GẮN NHÃN","MẤT NIỀM TIN","LẶP LẠI"].map((x,i)=><span key={x}>{x}{i<6&&<i>→</i>}</span>)}</div>
          <div className="trust-note"><b>GHI CHÚ MINH BẠCH</b><p>Đây không phải hơn 100 case cai thuốc. Đây là kinh nghiệm thực tế với những vòng lặp trì hoãn, tự phá, mất niềm tin và quay lại hành vi cũ — nền tảng được hệ thống hóa cho vấn đề cụ thể này.</p></div>
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
          <p className="offer-story">7 ngày để chuyển từ “Tôi biết mình nên bỏ” sang “Tôi hiểu vì sao mình hút và biết mình cần làm gì khi trigger xuất hiện.”</p>
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
          <div className="section-head left"><span>10 — TRƯỚC KHI BẠN QUYẾT ĐỊNH</span><h2>Có thể trong đầu bạn vẫn còn vài câu hỏi.</h2><p>Điều đó hoàn toàn bình thường. Hãy bắt đầu từ câu hỏi gần với mình nhất.</p></div>
          <div className="accordion faq-list">{faqs.map((f,i)=><article className={openFaq===i ? "open":""} key={f[0]}><button onClick={()=>setOpenFaq(openFaq===i?null:i)} aria-expanded={openFaq===i}><span>{String(i+1).padStart(2,"0")}</span><div><b>{f[0]}</b></div><i>{openFaq===i?"−":"+"}</i></button>{openFaq===i&&<div className="accordion-body"><p>{f[1]}</p></div>}</article>)}</div>
        </div>
      </section>

      <section className="final blueprint">
        <div className="wrap final-inner">
          <span>BẠN CÓ THỂ VIẾT TIẾP CÂU CHUYỆN NÀY THEO HAI CÁCH</span>
          <h2>Bạn có thể tiếp tục chờ một tuần ít stress hơn.</h2>
          <p>Tiếp tục tự hứa “lần sau mình sẽ quyết tâm hơn”. Hoặc dành 7 ngày để nhìn lại câu chuyện của mình, đặt nó lên một bản đồ và chuẩn bị cho những khoảnh khắc trigger thật sự xuất hiện.</p>
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
