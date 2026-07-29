"use client";

import { useEffect, useState } from "react";

const days = [
  {
    n: 1,
    title: "Nhìn rõ Vòng lặp Hút thuốc",
    story: "Bạn rà soát lịch sử hút thuốc, tần suất, thời điểm hút điếu đầu tiên, các trigger thường gặp và nguyên nhân khiến những lần bỏ trước đứt gãy.",
    output: "Bản đồ Vòng lặp Hút thuốc",
  },
  {
    n: 2,
    title: "Chọn Ngày bắt đầu",
    story: "Bạn làm rõ lý do muốn bỏ thuốc, mức độ sẵn sàng, điều cần chuẩn bị và người có thể hỗ trợ mình.",
    output: "Ngày bắt đầu và Cam kết Hành động",
  },
  {
    n: 3,
    title: "Chuẩn bị cho Nicotine và Cơ thể",
    story: "Bạn chuẩn bị cho cơn thèm, cảm giác khó chịu, thay đổi khả năng tập trung, giấc ngủ, caffeine, rượu bia và những thời điểm nên trao đổi với chuyên gia y tế.",
    output: "Kế hoạch Chuẩn bị Cơ thể",
  },
  {
    n: 4,
    title: "Thiết kế lại Trigger",
    story: "Bạn phân loại trigger thành bốn nhóm: tình huống, cảm xúc, xã hội và thể chất. Với từng trigger, bạn đi từ phản ứng cũ đến nhu cầu thật, phản ứng thay thế và phương án dự phòng.",
    output: "Bản đồ Thay thế Trigger",
  },
  {
    n: 5,
    title: "Chuẩn bị cho Cơn thèm",
    story: "Bạn thiết kế cách phản ứng khi muốn hút sau ăn, khi uống cà phê, căng thẳng sau cuộc họp, bồn chồn hoặc mất tập trung, muốn có một khoảng nghỉ, được mời thuốc, tham gia cuộc nhậu hoặc xuất hiện suy nghĩ “chỉ một điếu thôi”.",
    output: "Protocol Xử lý Cơn thèm",
  },
  {
    n: 6,
    title: "Lập Kế hoạch 21 ngày",
    story: "Bạn đưa ngày bắt đầu, việc cần làm trước ngày bỏ, tracker hằng ngày, người hỗ trợ, phương án điều chỉnh môi trường, kịch bản nguy cơ cao, các cột mốc cần ghi nhận và thời điểm cần tìm hỗ trợ chuyên môn vào một lộ trình thống nhất.",
    output: "Kế hoạch Cai thuốc 21 ngày",
  },
  {
    n: 7,
    title: "Chuẩn bị cho Những lúc Không hoàn hảo",
    story: "Bạn nhận diện dấu hiệu cảnh báo sớm, những tình huống dễ làm kế hoạch đứt gãy, suy nghĩ thường xuất hiện trước khi hút lại, việc cần làm trong 24 giờ sau một lần trượt và cách điều chỉnh để quay lại kế hoạch.",
    output: "Bản đồ Phòng ngừa Tái hút",
  },
];

const deliverables = [
  {
    n: "01",
    title: "Bản đồ Vòng lặp Hút thuốc",
    story: "Những điếu thuốc từng có vẻ ngẫu nhiên giờ tạo thành một đường đi có thể nhìn thấy: khi nào bạn thường hút, trigger nào xuất hiện nhiều nhất, điều gì làm những lần bỏ trước đứt gãy và đâu là phần liên quan đến nicotine, thói quen hoặc môi trường.",
  },
  {
    n: "02",
    title: "Bản đồ Thay thế Trigger",
    story: "Cà phê, sau bữa ăn, một ngày làm việc căng thẳng, lúc lái xe, cuộc nhậu, lời mời thuốc hay một đêm thiếu ngủ không còn là những tình huống bạn chỉ hy vọng mình sẽ vượt qua. Mỗi tình huống đã có một phản ứng mới.",
  },
  {
    n: "03",
    title: "Protocol Xử lý Cơn thèm",
    story: "Khi cơn thèm xuất hiện, bạn biết mình cần làm gì trong những phút đầu, cách đổi trạng thái và môi trường, cũng như thời điểm cần liên hệ người hỗ trợ hoặc tìm thêm hỗ trợ chuyên môn.",
  },
  {
    n: "04",
    title: "Kế hoạch Cai thuốc 21 ngày",
    story: "Ngày bắt đầu, việc cần chuẩn bị, tracker hằng ngày, người đồng hành, những tình huống nguy cơ cao và phương án phục hồi nếu lỡ hút lại cùng nằm trong một lộ trình có thể triển khai.",
  },
];

const faqs = [
  ["Tôi có phải ngừng hút ngay từ ngày đầu tiên không?", "Không. Những ngày đầu giúp bạn đánh giá vòng lặp, mức độ sẵn sàng, môi trường và các tình huống nguy cơ cao. Bạn sẽ xác định ngày bắt đầu phù hợp trong kế hoạch của mình."],
  ["Chương trình có bảo đảm tôi bỏ thuốc trong 7 ngày không?", "Không. Mục tiêu là giúp bạn hoàn thiện kế hoạch cá nhân, xác định ngày bắt đầu và chuẩn bị protocol cho 21 ngày tiếp theo. Tốc độ và kết quả của mỗi người có thể khác nhau."],
  ["Tôi hút đã quá lâu, chương trình có phù hợp không?", "Chương trình được thiết kế chủ yếu cho người đã hút nhiều năm và từng gặp khó khăn trong quá trình bỏ thuốc. Bạn không cần bắt đầu với niềm tin tuyệt đối; bạn cần sẵn sàng quan sát trung thực vòng lặp và thực hiện kế hoạch."],
  ["Tôi hút để giảm stress. Không hút thì làm sao chịu được?", "Chương trình không yêu cầu bạn giả vờ rằng stress không tồn tại. Bạn sẽ nhận diện nhu cầu nằm phía sau điếu thuốc và chuẩn bị phản ứng thay thế cho những tình huống stress cụ thể. Nếu đang gặp vấn đề sức khỏe thể chất hoặc tâm lý cần điều trị, bạn nên tìm hỗ trợ chuyên môn phù hợp."],
  ["Tôi có thể tham gia khi đang sử dụng thuốc hỗ trợ hoặc liệu pháp thay thế nicotine không?", "Có thể. Chương trình tập trung vào trigger, hành vi, môi trường, kế hoạch triển khai và phòng ngừa tái hút. Việc lựa chọn và sử dụng thuốc hoặc sản phẩm hỗ trợ cần tuân theo hướng dẫn của bác sĩ, dược sĩ, chuyên gia phù hợp và thông tin sử dụng của sản phẩm. Chương trình không yêu cầu bạn lựa chọn giữa Identity Shift và hỗ trợ y tế."],
  ["Nếu tôi lỡ hút lại một điếu thì sao?", "Một lần trượt không tự động có nghĩa toàn bộ hành trình đã thất bại. Bạn sẽ dùng phương án phục hồi để dừng chuỗi hút tiếp, nhận diện trigger, điều chỉnh môi trường, liên hệ người hỗ trợ và quay lại kế hoạch trong 24 giờ."],
  ["Tôi rất bận, liệu có theo được không?", "Mỗi ngày tập trung vào một bài học và một thành phẩm. Thời gian học dự kiến khoảng 20–30 phút; bạn vẫn cần dành thời gian thực hiện workbook và áp dụng kế hoạch vào đời sống."],
  ["Chương trình có thay thế bác sĩ không?", "Không. Chương trình không chẩn đoán, kê đơn hoặc điều trị bệnh. Người có bệnh nền, đang mang thai, đang sử dụng thuốc, có triệu chứng sức khỏe đáng lo ngại hoặc mức độ lệ thuộc cao nên trao đổi với bác sĩ, dược sĩ hoặc chuyên gia y tế phù hợp."],
];

const List = ({ items }: { items: string[] }) => (
  <ul className="letter-list">{items.map(item => <li key={item}>{item}</li>)}</ul>
);

export default function Home() {
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
    <main className="letter-page">
      <div className="letter-announcement">
        <b>Cohort sáng lập · 497.000 VNĐ</b>
        <span>Giới hạn 25 thành viên · Đồng hành 21 ngày</span>
      </div>

      <header className="letter-hero">
        <div className="letter-wrap">
          <p className="letter-brand">BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</p>
          <p className="letter-salutation">Gửi bạn,</p>
          <h1>Bạn không thiếu ý chí.</h1>
          <p className="letter-hero-line">Bạn đang thiếu một kế hoạch cho đúng những lúc mình dễ hút lại nhất.</p>
          <p className="letter-lead">7 ngày để xác định ngày bỏ thuốc, xây protocol vượt qua cơn thèm và chuẩn bị kế hoạch 21 ngày phù hợp với mức độ lệ thuộc, trigger, công việc và đời sống của bạn.</p>
          <div className="letter-hero-action">
            <a className="letter-button" href="#offer">TÔI MUỐN XÂY KẾ HOẠCH BỎ THUỐC →</a>
            <p><small>COHORT SÁNG LẬP</small><b>497.000 VNĐ</b><span>Giới hạn 25 thành viên</span></p>
          </div>
          <p className="letter-disclaimer">Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế.</p>
        </div>
      </header>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">01 — CÓ THỂ BẠN ĐÃ THỰC SỰ MUỐN BỎ THUỐC NHIỀU LẦN</p>
          <h2>Tôi tin những lời hứa trước đây của bạn đều là thật.</h2>
          <p>Có thể bạn đã từng nhìn gói thuốc còn lại vài điếu và tự nhủ: “Hết gói này tôi sẽ bỏ.” Có thể bạn từng chờ qua một đợt công việc, một cuộc nhậu, hay một thời điểm mà cuộc sống bớt căng thẳng hơn.</p>
          <div className="letter-voices">
            <p>“Hết gói này tôi sẽ bỏ.”</p>
            <p>“Qua đợt công việc này tôi sẽ dừng.”</p>
            <p>“Tôi chỉ hút khi stress.”</p>
            <p>“Tôi có thể bỏ bất cứ lúc nào.”</p>
            <p>“Lần này tôi sẽ quyết tâm hơn.”</p>
          </div>
          <p>Có lần bạn bỏ được vài giờ. Có lần được vài ngày. Thậm chí vài tuần hoặc vài tháng.</p>
          <p>Rồi một buổi sáng rất bình thường bắt đầu. Ly cà phê được đặt xuống. Tay bạn tìm điếu thuốc trước khi kịp nhớ đến lời hứa tối qua.</p>
          <p>Hoặc đó là sau bữa ăn, một cuộc họp căng thẳng, deadline dồn dập, một chặng lái xe dài, một cuộc nhậu, một đêm thiếu ngủ, một lời mời thuốc rất khó từ chối, hoặc chỉ là cảm giác bồn chồn mà bạn không biết phải xử lý thế nào.</p>
          <blockquote className="letter-quote">Không phải vì bạn chưa biết thuốc lá có hại. Không phải vì bạn chưa từng nghiêm túc muốn bỏ. Và cũng không đơn giản vì bạn thiếu ý chí.</blockquote>
          <p>Vấn đề là bạn đang cố chống lại điếu thuốc tiếp theo, nhưng chưa có một kế hoạch đủ rõ cho đúng những lúc mình dễ hút lại nhất.</p>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">02 — ĐIẾU THUỐC ĐÃ NHẬN QUÁ NHIỀU VAI</p>
          <h2>Sau nhiều năm, thuốc lá không còn chỉ là một thói quen.</h2>
          <p>Nó đứng cạnh bạn lúc bắt đầu ngày mới. Nó tạo ra một cái cớ để nghỉ giữa giờ. Nó bước vào sau một cuộc họp, ngồi lại trong những lúc bạn cần tập trung, và xuất hiện khi bạn muốn tách mình khỏi áp lực vài phút.</p>
          <p>Đến cuối ngày, điếu thuốc có thể đã đi qua gần như mọi trạng thái: căng thẳng, buồn chán, giao tiếp với đồng nghiệp hoặc đối tác, kết thúc một bữa ăn, tham gia một cuộc nhậu, làm việc và cả những khoảnh khắc mất phương hướng.</p>
          <p>Vì vậy, bỏ thuốc không chỉ là bỏ một vật. Bạn còn cần chuẩn bị một cách mới để bắt đầu ngày, nghỉ ngơi, tập trung, giao tiếp và đi qua stress.</p>
          <div className="letter-subchapter">
            <h3>Có hai vòng lặp thường cùng hoạt động.</h3>
            <p><b>Vòng lặp nicotine:</b> khi nicotine giảm, cơ thể xuất hiện cơn thèm hoặc khó chịu. Một điếu thuốc làm cảm giác đó tạm lắng, và não tiếp tục ghi nhận hút thuốc là giải pháp.</p>
            <p><b>Vòng lặp trigger:</b> cà phê, sau ăn, stress, deadline hay cuộc nhậu khiến não chờ đợi nghi thức quen. Bạn hút để nghỉ, tập trung hoặc đổi trạng thái, và mối liên kết cũ lại mạnh thêm.</p>
          </div>
          <blockquote className="letter-quote">Ý chí có thể giúp bạn từ chối một điếu. Nhưng kế hoạch phải đi cùng bạn qua cơn thèm, trigger, môi trường, stress, tình huống xã hội và cả một lần lỡ trượt.</blockquote>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">03 — CÁI GIÁ CỦA VIỆC TIẾP TỤC CHỜ</p>
          <h2>Một bao thuốc có thể không phải khoản tiền lớn. Cho đến khi câu chuyện được tính bằng nhiều năm.</h2>
          <p>Nếu bạn hút khoảng một bao mỗi ngày, với giá giả định 35.000 VNĐ/bao, tiền mua thuốc ước tính sẽ là:</p>
          <div className="letter-cost">
            <p><span>Sau 1 năm</span><b>12.775.000 VNĐ</b></p>
            <p><span>Sau 10 năm</span><b>127.750.000 VNĐ</b></p>
            <p><span>Sau 20 năm</span><b>255.500.000 VNĐ</b></p>
            <p><span>Sau 30 năm</span><b>383.250.000 VNĐ</b></p>
          </div>
          <p className="letter-note">Cách tự tính: Số bao mỗi ngày × Giá một bao × 365 × Số năm. Nếu một bao có giá 40.000 VNĐ và bạn hút một bao mỗi ngày, 10 năm là 146.000.000 VNĐ, 20 năm là 292.000.000 VNĐ và 30 năm là 438.000.000 VNĐ. Nếu hút hai bao mỗi ngày, con số tăng gấp đôi.</p>
          <p>Đây mới chỉ là tiền mua thuốc theo mức giá hiện tại. Con số chưa bao gồm:</p>
          <List items={["Giá thuốc có thể tăng theo thời gian.","Những khoản tiền có thể phát sinh nếu sức khỏe bị ảnh hưởng.","Thời gian dành cho việc mua và hút thuốc.","Những khoảng làm việc bị ngắt quãng.","Ảnh hưởng của khói thuốc đến không gian sống và người xung quanh.","Giá trị số tiền đó có thể tạo ra nếu được tiết kiệm hoặc đầu tư."]} />
          <p className="letter-note">Các phép tính chưa bao gồm lạm phát hoặc việc giá thuốc thay đổi.</p>
          <p>Nhưng tiền chưa chắc là cái giá lớn nhất.</p>
          <p>Nếu 10 năm tới vẫn giống những năm vừa qua, bạn có thể vẫn phải tìm chỗ hút giữa giờ, vẫn bồn chồn khi không có thuốc, vẫn cần một điếu sau cà phê hoặc khi stress, vẫn phải giải thích với vợ, con hoặc người thân, vẫn mang theo nỗi lo sức khỏe nhưng tiếp tục trì hoãn, và vẫn tự hỏi vì sao mình chưa làm chủ được hành vi này.</p>
          <blockquote className="letter-quote">Bạn không cần giải quyết cả 30 năm hôm nay. Bạn chỉ cần dành 7 ngày để hiểu vòng lặp của mình và chuẩn bị nghiêm túc cho 21 ngày tiếp theo.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">04 — VÌ SAO TÔI VIẾT LÁ THƯ NÀY?</p>
          <h2>Vì tôi từng hút thuốc trong khoảng 10 năm.</h2>
          <p>Thuốc lá từng xuất hiện khi tôi làm việc, suy nghĩ, căng thẳng, cần nghỉ, giao tiếp và khi cảm thấy mất phương hướng.</p>
          <p>Tôi cũng từng cho rằng mình chỉ cần quyết tâm hơn. Nhưng càng cố chống lại, tôi càng tiếp tục đặt thuốc lá ở trung tâm đời sống:</p>
          <blockquote className="letter-quote">“Tôi là người hút thuốc đang cố bỏ.”</blockquote>
          <p>Bước chuyển bắt đầu khi tôi ngừng chỉ hỏi “Làm sao để cưỡng lại điếu thuốc tiếp theo?” và bắt đầu nhìn vấn đề như một hệ thống gồm sự lệ thuộc, trigger, trạng thái, môi trường, hành vi và cách tôi đang định nghĩa bản thân.</p>
          <p>Từ đó, tôi từng bước điều chỉnh cách nghỉ ngơi, làm việc, xử lý stress và phản ứng trước những tình huống từng gắn với thuốc lá.</p>
          <div className="letter-subchapter">
            <h3>Hơn 100 hành trình Identity Shift™ đã giúp tôi nhìn rõ thêm một mô thức.</h3>
            <p>Trong vai trò Identity Coach, tôi đã trực tiếp đồng hành và phân tích hơn 100 trường hợp gặp khó khăn khi muốn thay đổi nhưng liên tục quay lại hành vi cũ.</p>
            <List items={[
              "Biết mình cần hành động nhưng liên tục trì hoãn.",
              "Muốn thay đổi nhưng luôn quay lại hành vi cũ.",
              "Không duy trì được sự nhất quán.",
              "Tự gắn nhãn mình là người thiếu kỷ luật.",
              "Mất niềm tin sau nhiều lần thất bại.",
              "Dùng một hành vi cũ để né tránh cảm xúc hoặc áp lực.",
            ]} />
            <p>Những trường hợp này không phải đều liên quan đến bỏ thuốc. Tôi không dùng con số đó để nói rằng mình đã giúp hơn 100 người bỏ thuốc.</p>
            <p>Điều tôi thấy lặp lại là: muốn thay đổi → gặp trigger → quay lại phản ứng cũ → tự trách → gắn nhãn tiêu cực → mất niềm tin → tiếp tục lặp lại hành vi.</p>
          </div>
          <p>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™ là cách tôi đưa những nguyên lý về Identity, trigger, môi trường và thay đổi hành vi vào một vấn đề cụ thể: vòng lặp bỏ thuốc rồi hút lại.</p>
          <p className="letter-note">Cohort sáng lập được triển khai với số lượng giới hạn để tiếp tục kiểm chứng và hoàn thiện chương trình bằng dữ liệu cùng phản hồi thực tế từ người tham gia.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">05 — BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</p>
          <h2>Không phải thêm một khóa học để xem. Là 7 ngày ngồi lại và viết kế hoạch của chính bạn.</h2>
          <p>Đây là chương trình hướng dẫn thực hành dành cho người đã hút thuốc nhiều năm, từng muốn bỏ hoặc đã bỏ rồi hút lại. Mỗi ngày, bạn giải quyết một phần của câu chuyện và hoàn thành một phần trong Bản đồ Cai thuốc Cá nhân của chính mình.</p>
          <div className="letter-days">
            {days.map(day => (
              <article key={day.n}>
                <p className="letter-day-label">NGÀY {day.n}</p>
                <h3>{day.title}</h3>
                <p>{day.story}</p>
                <p className="letter-output"><b>Cuối ngày:</b> {day.output}.</p>
              </article>
            ))}
          </div>
          <p>Sau ngày thứ bảy, tất cả thành phẩm được tổng hợp thành Bản đồ Cai thuốc Cá nhân để bạn bắt đầu triển khai trong 21 ngày tiếp theo.</p>
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">06 — ĐẾN CUỐI NGÀY THỨ BẢY</p>
          <h2>Bạn không chỉ “quyết tâm hơn”. Trước mặt bạn là bốn phần của một kế hoạch.</h2>
          <div className="letter-deliverables">
            {deliverables.map(item => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div><h3>{item.title}</h3><p>{item.story}</p></div>
              </article>
            ))}
          </div>
          <blockquote className="letter-quote">Một ngày bắt đầu rõ ràng, một kế hoạch cho cơn thèm và một phương án cho những lúc cuộc sống không diễn ra như dự kiến.</blockquote>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">07 — IDENTITY SHIFT™ ĐÓNG VAI TRÒ GÌ?</p>
          <h2>Sau nhiều lần bỏ rồi hút lại, bạn có thể bắt đầu tin rằng lịch sử đó chính là con người mình.</h2>
          <div className="letter-voices">
            <p>“Tôi là người nghiện thuốc.”</p>
            <p>“Tôi không đủ ý chí.”</p>
            <p>“Tôi không thể làm việc nếu không hút.”</p>
            <p>“Tôi đã thử nhiều lần nhưng không làm được.”</p>
          </div>
          <p>Identity Shift™ giúp bạn không dùng lịch sử hút thuốc để định nghĩa toàn bộ khả năng thay đổi của mình.</p>
          <p>Bạn chuyển từ “Tôi là người nghiện đang cố chống lại cơn thèm” sang “Tôi đang học cách xử lý cơn thèm, stress và các tình huống quen thuộc mà không cần hút thuốc.”</p>
          <p>Nhận dạng mới không được tạo bằng một câu nói đẹp. Nó được củng cố bằng hành vi thực tế:</p>
          <List items={[
            "Một cơn thèm đã vượt qua.",
            "Một ly cà phê không hút thuốc.",
            "Một khoảng nghỉ không cần điếu thuốc.",
            "Một lần từ chối khi được mời.",
            "Một tình huống stress nhưng bạn sử dụng phản ứng mới.",
            "Một lần trượt nhưng quay lại kế hoạch ngay.",
          ]} />
          <p className="letter-note">Identity Shift™ hỗ trợ thay đổi hành vi; không thay thế việc xử lý lệ thuộc nicotine hoặc hỗ trợ chuyên môn phù hợp.</p>
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">08 — NHỮNG GÌ TÔI CHUẨN BỊ ĐỂ ĐI CÙNG BẠN</p>
          <h2>Một chương trình đủ gọn để bắt đầu, đủ cụ thể để đưa vào đời sống.</h2>
          <h3>Nội dung hướng dẫn</h3>
          <List items={["7 video bài học ngắn.","7 workbook thực hành.","Hướng dẫn tổng hợp Bản đồ Cai thuốc Cá nhân."]} />
          <h3>Bộ công cụ triển khai</h3>
          <List items={["Bản đồ Vòng lặp Hút thuốc.","Bản đồ Thay thế Trigger.","Protocol Xử lý Cơn thèm.","Kế hoạch Cai thuốc 21 ngày.","Tracker theo dõi hằng ngày.","Mẫu câu từ chối thuốc.","Kịch bản xử lý tình huống nguy cơ cao.","Bản đồ Phòng ngừa Tái hút."]} />
          <h3>Hệ thống hỗ trợ</h3>
          <List items={["Một buổi khởi động.","Hai buổi group check-in.","Cộng đồng đồng hành trong 21 ngày.","Hỗ trợ hoàn thiện kế hoạch.","Map Completion Clinic nếu đủ điều kiện áp dụng cam kết."]} />
        </div>
      </section>

      <section className="letter-section letter-tint">
        <div className="letter-wrap">
          <p className="letter-number">09 — LÁ THƯ NÀY CÓ DÀNH CHO BẠN KHÔNG?</p>
          <h2>Có, nếu bạn thật sự muốn bắt đầu nhìn lại vòng lặp của mình.</h2>
          <List items={[
            "Bạn đã hút thuốc trong nhiều năm.",
            "Bạn từng muốn bỏ nhưng liên tục trì hoãn.",
            "Bạn từng bỏ được một thời gian rồi hút lại.",
            "Bạn không còn thực sự thích hút nhưng vẫn chưa dừng được.",
            "Bạn thường hút khi stress, uống cà phê, làm việc hoặc nhậu.",
            "Bạn bắt đầu lo ngại về sức khỏe và gia đình.",
            "Bạn muốn bắt đầu bỏ thuốc trong thời gian gần.",
            "Bạn sẵn sàng quan sát, ghi chép và điều chỉnh môi trường.",
          ]} />
          <h3>Nhưng có thể chưa phù hợp nếu:</h3>
          <List items={[
            "Bạn hoàn toàn chưa có ý định thay đổi.",
            "Bạn tham gia chỉ vì bị người khác ép.",
            "Bạn muốn một mẹo nhanh nhưng không muốn thực hành.",
            "Bạn kỳ vọng chương trình thay thế bác sĩ hoặc điều trị.",
            "Bạn muốn được bảo đảm tuyệt đối rằng sẽ không bao giờ hút lại.",
            "Bạn đang có triệu chứng sức khỏe đáng lo ngại nhưng chưa tìm hỗ trợ chuyên môn.",
            "Bạn đang cần hỗ trợ cấp cứu hoặc can thiệp lâm sàng.",
          ]} />
        </div>
      </section>

      <section className="letter-section">
        <div className="letter-wrap">
          <p className="letter-number">10 — NHỊP TRIỂN KHAI</p>
          <h2>Bảy ngày xây bản đồ. Hai mươi mốt ngày đưa bản đồ vào đời sống.</h2>
          <p>Mỗi ngày học khoảng 20–30 phút, chưa bao gồm thời gian hoàn thành workbook và thử phản ứng mới trong tình huống thực tế.</p>
          <dl className="letter-details">
            <div><dt>Ngày bắt đầu</dt><dd>[Ngày/tháng/năm]</dd></div>
            <div><dt>Hình thức</dt><dd>Video · Workbook · Hướng dẫn trực tuyến</dd></div>
            <div><dt>Buổi khởi động</dt><dd>[Ngày và giờ]</dd></div>
            <div><dt>Group check-in 01</dt><dd>[Ngày và giờ]</dd></div>
            <div><dt>Group check-in 02</dt><dd>[Ngày và giờ]</dd></div>
            <div><dt>Nền tảng học</dt><dd>[Tên nền tảng]</dd></div>
            <div><dt>Cộng đồng</dt><dd>[Tên nền tảng]</dd></div>
            <div><dt>Replay</dt><dd>[Có/không và thời gian xem lại]</dd></div>
            <div><dt>Quyền truy cập</dt><dd>[30/60/90 ngày]</dd></div>
            <div><dt>Phản hồi hỗ trợ</dt><dd>[Khung thời gian cụ thể]</dd></div>
          </dl>
          <p className="letter-note">Chương trình không cung cấp hotline cấp cứu hoặc hỗ trợ y tế 24/7.</p>
        </div>
      </section>

      <section className="letter-section letter-dark">
        <div className="letter-wrap">
          <p className="letter-number">11 — CAM KẾT HOÀN THIỆN BẢN ĐỒ</p>
          <h2>Nếu bạn đã làm đủ mà bản đồ vẫn chưa hoàn thiện, chương trình tiếp tục đi cùng bạn.</h2>
          <p>Cam kết này áp dụng nếu bạn:</p>
          <List items={["Hoàn thành đủ 7 bài học.","Thực hiện đầy đủ workbook.","Tham gia các buổi bắt buộc.","Cập nhật tiến độ trung thực."]} />
          <p>Nhưng vẫn chưa hoàn thiện bốn thành phẩm cốt lõi: Bản đồ Vòng lặp Hút thuốc, Bản đồ Thay thế Trigger, Protocol Xử lý Cơn thèm, Kế hoạch Cai thuốc 21 ngày và phương án phòng ngừa tái hút, bạn được:</p>
          <List items={["Tham gia một buổi Map Completion Clinic.","Nhận thêm 14 ngày hỗ trợ để hoàn thiện kế hoạch.","Không phải trả thêm chi phí."]} />
          <p className="letter-note">Cam kết nằm ở phạm vi hướng dẫn và hỗ trợ triển khai. Đây không phải cam kết kết quả y khoa, không bảo đảm mọi người bỏ thuốc trong cùng một khoảng thời gian và không cam kết bạn sẽ không bao giờ tái hút.</p>
        </div>
      </section>

      <section id="offer" className="letter-offer">
        <div className="letter-wrap">
          <p className="letter-number">12 — COHORT SÁNG LẬP</p>
          <p className="letter-salutation">Nếu bạn đã đọc đến đây,</p>
          <h2>Tôi mời bạn dành 7 ngày để chuẩn bị một cách nghiêm túc hơn.</h2>
          <p>Đây là cohort sáng lập đầu tiên của BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™. Bạn nhận mức giá ưu tiên, hình thức đồng hành trực tiếp, hai buổi group check-in, cộng đồng hỗ trợ 21 ngày và cơ hội đóng góp phản hồi để chương trình tiếp tục được hoàn thiện.</p>
          <p>Không phải bằng một lời hứa mới. Mà bằng một ngày bắt đầu rõ ràng, một bản đồ những tình huống dễ hút lại, một protocol xử lý cơn thèm, một kế hoạch 21 ngày và phương án quay lại nếu gặp đứt gãy.</p>
          <h3>7 ngày xây bản đồ</h3>
          <List items={["7 video hướng dẫn.","7 workbook thực hành.","Bản đồ Vòng lặp Hút thuốc.","Bản đồ Thay thế Trigger.","Protocol Xử lý Cơn thèm.","Kế hoạch Cai thuốc 21 ngày.","Bản đồ Phòng ngừa Tái hút."]} />
          <h3>21 ngày đồng hành</h3>
          <List items={["Một buổi khởi động.","Hai buổi group check-in.","Cộng đồng hỗ trợ.","Tracker theo dõi.","Hỗ trợ hoàn thiện kế hoạch."]} />
          <h3>Cam kết triển khai</h3>
          <List items={["Map Completion Clinic.","Thêm 14 ngày hỗ trợ nếu đáp ứng điều kiện."]} />
          <div className="letter-price">
            <small>MỨC ĐẦU TƯ COHORT SÁNG LẬP</small>
            <b>497.000 VNĐ</b>
            <span>Giới hạn 25 thành viên</span>
          </div>
          <a className="letter-button" href="mailto:?subject=Đăng ký Bản đồ Cai thuốc lá 7 ngày">TÔI MUỐN XÂY KẾ HOẠCH BỎ THUỐC →</a>
          <p className="letter-signoff">Thân mến,<br/><b>Identity Coach · Identity Shift™</b></p>
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
          <p className="letter-salutation">Bạn có thể tiếp tục chờ một thời điểm khác.</p>
          <p>Bạn có thể tiếp tục chờ công việc bớt căng thẳng, hứa sẽ bỏ vào tuần sau, giảm vài điếu rồi quay lại, chỉ dựa vào quyết tâm khi cơn thèm xuất hiện, tự trách sau mỗi lần hút và hy vọng lần sau sẽ khác dù chưa thay đổi kế hoạch.</p>
          <p>Hoặc bạn có thể dành 7 ngày để chuẩn bị nghiêm túc hơn: một ngày bắt đầu rõ ràng, một bản đồ những tình huống dễ hút lại, một protocol xử lý cơn thèm, một kế hoạch hành động 21 ngày và một phương án quay lại nếu gặp đứt gãy.</p>
          <h2>Hoặc bắt đầu bằng câu trả lời cho ba câu hỏi.</h2>
          <blockquote className="letter-quote">Khi cơn thèm xuất hiện, tôi sẽ làm gì?<br/>Khi stress quay lại, tôi sẽ phản ứng thế nào?<br/>Nếu lỡ trượt, tôi sẽ quay lại bằng cách nào?</blockquote>
          <a className="letter-button" href="#offer">TÔI MUỐN BẮT ĐẦU →</a>
        </div>
      </section>

      <footer className="letter-footer">
        <div className="letter-wrap">
          <b>BẢN ĐỒ CAI THUỐC LÁ 7 NGÀY™</b>
          <p>Chương trình giáo dục và hỗ trợ thay đổi hành vi; không thay thế tư vấn, chẩn đoán hoặc điều trị y tế, không kê đơn và không cam kết chữa bệnh hoặc một kết quả giống nhau cho tất cả mọi người.</p>
          <span>© 2026 Identity Shift™</span>
        </div>
      </footer>

      <div className={`letter-mobile-sticky ${showSticky ? "show" : ""}`}>
        <div><small>COHORT SÁNG LẬP</small><b>497.000 VNĐ</b></div>
        <a href="#offer">THAM GIA →</a>
      </div>
    </main>
  );
}
