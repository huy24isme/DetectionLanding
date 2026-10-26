'use client';

import { useEffect, useRef, useState } from 'react';
import s from './landing.module.css';

function Shield({ small = false }: { small?: boolean }) {
  return <svg width={small ? 21 : 28} height={small ? 24 : 31} viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M12 2 21 6v7c0 5-5 9-9 11-4-2-9-6-9-11V6l9-4Z" stroke="currentColor" strokeWidth="1.7"/><path d="m8 13 3 3 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Arrow() { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function Check() { return <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

const steps = [
  {
    name: 'Tiếp nhận giao dịch',
    stage: 'Tiếp nhận',
    title: '01 · Tiếp nhận ngữ cảnh giao dịch',
    description: 'Hệ thống ghi nhận thông tin giao dịch từ doanh nghiệp cùng các dữ liệu ngữ cảnh liên quan để phục vụ quá trình đánh giá và rà soát.',
    cardIndex: 0,
  },
  {
    name: 'Bằng chứng kích hoạt',
    stage: 'Đã phân công',
    title: '02 · Tổng hợp dấu hiệu & phân công xử lý',
    description: 'Khi phát hiện dấu hiệu bất thường, cảnh báo được chuyển thành hồ sơ điều tra kèm đầy đủ lý do kích hoạt và giao cho nhân sự phụ trách.',
    cardIndex: 1,
  },
  {
    name: 'Báo cáo điều tra',
    stage: 'Chờ phê duyệt',
    title: '03 · Xác minh thực tế & gửi báo cáo đề xuất',
    description: 'Nhân sự điều tra kiểm tra các bằng chứng liên quan, ghi nhận kết quả xác minh và gửi đề xuất xử lý lên cấp phê duyệt.',
    cardIndex: 2,
  },
  {
    name: 'Phê duyệt & Lưu vết',
    stage: 'Hoàn tất',
    title: '04 · Phê duyệt kết luận & lưu nhật ký hệ thống',
    description: 'Cấp quản lý vận hành rà soát báo cáo đề xuất, đưa ra quyết định xử lý cuối cùng và hệ thống tự động lưu lại lịch sử thao tác.',
    cardIndex: 3,
  },
];

const detectionModes = {
  AI: {
    badge: 'AI',
    label: 'AI Detection',
    title: 'AI Detection + Giải thích nguyên nhân',
    description: 'Dành cho doanh nghiệp gói Subscription. Mô hình AI phân loại giao dịch Bất thường (Abnormal) hoặc Bình thường (Normal), kèm độ tin cậy (Confidence) và giải thích các dấu hiệu rủi ro.',
    signals: [
      ['Kết quả đánh giá', 'Abnormal (Bất thường)'],
      ['Độ tin cậy mô hình', '91% (Confidence)'],
      ['Bằng chứng đi kèm', 'Giải thích AI + tín hiệu kích hoạt'],
    ],
  },
  RULE: {
    badge: 'RULE',
    label: 'Dynamic Rule Engine',
    title: 'Bộ quy tắc động theo tổ hợp điều kiện AND / OR',
    description: 'Đối chiếu trực tiếp các trường giao dịch với bộ quy tắc đã phát hành (Published) của doanh nghiệp. Trả về danh sách quy tắc khớp (Matched) và giá trị quan sát thực tế (ruleEvidence).',
    signals: [
      ['Kết quả đánh giá', 'Abnormal / Normal / Undetermined'],
      ['Cấu trúc điều kiện', 'Nhóm logic AND / OR lồng nhau'],
      ['Bằng chứng đi kèm', 'Mã quy tắc + giá trị quan sát'],
    ],
  },
  RULE_FALLBACK: {
    badge: 'RULE_FALLBACK',
    label: 'Khi AI gián đoạn',
    title: 'Tự động chuyển sang Rule Engine dự phòng',
    description: 'Khi dịch vụ AI tạm thời không khả dụng, hệ thống tự động định tuyến giao dịch sang bộ quy tắc đã phát hành của doanh nghiệp và gắn nhãn RULE_FALLBACK để minh bạch nguồn xử lý.',
    signals: [
      ['Nhãn nguồn xử lý', 'RULE_FALLBACK (Hiển thị rõ)'],
      ['Tính liên tục', 'Không làm gián đoạn luồng giao dịch'],
      ['Bằng chứng đi kèm', 'Quy tắc dự phòng đã kích hoạt'],
    ],
  },
};

const howSteps = [
  {
    number: '1',
    title: 'Khởi tạo workspace doanh nghiệp',
    description: 'Thiết lập không gian riêng cho doanh nghiệp, gửi giao dịch qua REST API, Webhook hoặc tải tệp dữ liệu lên môi trường kiểm soát tập trung.',
  },
  {
    number: '2',
    title: 'AI & Rule phân tích giao dịch',
    description: 'Hệ thống đối chiếu giao dịch với mô hình AI Detection và bộ quy tắc động, trả về trạng thái phân loại kèm bằng chứng kích hoạt rõ ràng.',
  },
  {
    number: '3',
    title: 'Điều tra & phê duyệt kết quả',
    description: 'Cảnh báo bất thường được chuyển thành hồ sơ để điều tra viên xác minh thực tế và cấp quản lý vận hành phê duyệt quyết định cuối cùng.',
  },
];

const questions = [
  [
    'FraudGuard phân loại trạng thái giao dịch như thế nào?',
    'Hệ thống phân loại trực tiếp giao dịch thành Bất thường (Abnormal), Bình thường (Normal) hoặc Chưa xác định (Undetermined). Với gói AI Detection, kết quả đi kèm độ tin cậy (Confidence) và giải thích; với bộ quy tắc, kết quả đi kèm danh sách quy tắc khớp (Matched) và giá trị quan sát thực tế (ruleEvidence).',
  ],
  [
    'Ai là người cấu hình quy tắc và ai là người kết luận gian lận?',
    'Theo kiến trúc phân quyền, Nhân viên triển khai (Implementation Staff) tiếp nhận đặc tả của doanh nghiệp để cấu hình, kiểm thử Sandbox và phát hành bộ quy tắc. Trong vận hành hằng ngày, Điều tra viên (Investigator) xác minh bằng chứng và gửi báo cáo để Trưởng nhóm vận hành (Operator) phê duyệt kết luận cuối cùng.',
  ],
  [
    'Nếu dịch vụ AI tạm thời gián đoạn thì giao dịch được xử lý thế nào?',
    'Đối với doanh nghiệp dùng gói Subscription, khi dịch vụ AI không khả dụng, hệ thống tự động chuyển sang đánh giá bằng bộ quy tắc động đã phát hành của doanh nghiệp đó. Kết quả được gắn nhãn RULE_FALLBACK để nhân sự phân biệt rõ với kết quả do AI phát hiện.',
  ],
  [
    'Doanh nghiệp cần chuẩn bị gì khi bắt đầu triển khai FraudGuard?',
    'Doanh nghiệp chỉ cần cung cấp đặc tả các trường dữ liệu giao dịch và nhu cầu kiểm soát rủi ro của đơn vị mình. Đội ngũ triển khai sẽ hỗ trợ thiết lập cấu trúc dữ liệu, cấu hình bộ quy tắc trên môi trường kiểm thử (Sandbox) và bàn giao tài khoản vận hành.',
  ],
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const [step, setStep] = useState(0);
  const [source, setSource] = useState<'AI' | 'RULE' | 'RULE_FALLBACK'>('AI');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>('[data-scroll-section]'));
    const revealItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (typeof IntersectionObserver === 'undefined') {
      sections.forEach(el => el.classList.add(s.inView));
      revealItems.forEach(el => {
        el.classList.add(s.isRevealed);
        el.setAttribute('data-revealed', 'true');
      });
      return;
    }
    setMotionReady(true);
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.inView);
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.92) {
            entry.target.classList.remove(s.inView);
          }
        });
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 }
    );
    const itemObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(s.isRevealed);
            entry.target.setAttribute('data-revealed', 'true');
          } else if (entry.boundingClientRect.top > window.innerHeight * 0.9) {
            entry.target.classList.remove(s.isRevealed);
            entry.target.removeAttribute('data-revealed');
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    sections.forEach(el => sectionObserver.observe(el));
    revealItems.forEach(el => itemObserver.observe(el));
    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  const currentStep = steps[step];
  const currentDetection = detectionModes[source];

  return <div ref={rootRef} className={`${s.pageRoot} ${motionReady ? s.motionReady : ''}`}>
    <a className={s.skip} href="#main">Đến nội dung chính</a>
    <header className={`${s.header} ${scrolled ? s.headerScrolled : ''}`}>
      <div className={s.headerInner}>
        <a className={s.brand} href="#" aria-label="FraudGuard, đầu trang"><Shield/><span>Fraud<span className={s.brandLight}>Guard</span></span></a>
        <button
          ref={menuButton}
          className={s.menuButton}
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
          onKeyDown={e => { if (e.key === 'Escape') setMenuOpen(false); }}
        >
          {menuOpen ? 'Đóng' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav
          id="navigation"
          className={`${s.nav} ${menuOpen ? s.navOpen : ''}`}
          aria-label="Điều hướng chính"
          onKeyDown={e => { if (e.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } }}
        >
          {[
            ['Tính năng', '#tinh-nang'],
            ['Hồ sơ điều tra', '#ho-so'],
            ['Cơ chế phát hiện', '#co-che'],
            ['Cách hoạt động', '#vai-tro'],
            ['Gói sử dụng', '#goi-su-dung'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className={s.navCta} href="#lien-he" onClick={() => setMenuOpen(false)}>Liên hệ với chúng tôi <Arrow/></a>
        </nav>
      </div>
    </header>

    <main id="main">
      <div className={s.heroWrap}>
        <section className={`${s.container} ${s.hero}`} id="san-pham" aria-labelledby="hero-heading">
          <div className={s.heroCopy}>
            <p className={s.kickerPill}><span className={s.liveDot} aria-hidden="true"/><Shield small/> FraudGuard · Nền tảng kiểm soát rủi ro giao dịch</p>
            <h1 id="hero-heading">Quy trình rõ ràng.<br/><span>Kiểm soát rủi ro liền mạch.</span></h1>
            <p className={s.heroDescription}>
              Kết nối giám sát giao dịch đa kênh, phát hiện dấu hiệu bất thường và điều tra hồ sơ tập trung trong một luồng xuyên suốt. Mỗi bước đều có bằng chứng đối chiếu, người phụ trách và lịch sử kiểm toán rõ ràng.
            </p>
            <div className={s.actions}>
              <a className={s.primary} href="#lien-he">Liên hệ với chúng tôi <Arrow/></a>
              <a className={s.secondary} href="#ho-so">Xem luồng hồ sơ điều tra</a>
            </div>
            <div className={s.heroHighlights} aria-label="Nguyên tắc cốt lõi">
              <div className={s.heroHighlightItem}><Check/> <span>Phân loại giao dịch rõ nguồn</span></div>
              <div className={s.heroHighlightItem}><Check/> <span>Bằng chứng gắn chặt từng hồ sơ</span></div>
              <div className={s.heroHighlightItem}><Check/> <span>Phối hợp điều tra &amp; phê duyệt minh bạch</span></div>
            </div>
          </div>
        </section>
      </div>

      <section className={`${s.sectionPastelWarm} ${s.scrollSection}`} data-scroll-section id="tinh-nang" aria-labelledby="features-heading">
        <div className={s.container}>
        <div className={`${s.centerHeader} ${s.revealFadeBlur}`} data-reveal>
          <p className={s.sectionNumber}>01 / KIẾN TRÚC VẬN HÀNH RỦI RO</p>
          <h2 id="features-heading">Chuẩn hóa đánh giá,<br/><span>vận hành xuyên suốt</span></h2>
          <p className={s.centerSub}>
            Từ cổng thanh toán, ví điện tử đến đơn hàng COD, mỗi doanh nghiệp có tập dữ liệu và quy tắc riêng nhưng thống nhất cùng một chuẩn kiểm soát, điều tra và đối soát.
          </p>
        </div>

        <div className={s.featureGrid}>
          <article className={`${s.featureCard} ${s.revealSlideLeft}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>01</span>
              <h3>Phân loại trạng thái giao dịch rõ ràng</h3>
              <p>Đánh giá và phân loại từng giao dịch theo các mức trạng thái trực diện, kèm theo lý do và dấu hiệu cụ thể để nhân sự dễ dàng đối chiếu.</p>
            </div>
          </article>

          <article className={`${s.featureCard} ${s.revealFadeUp} ${s.delay1}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>02</span>
              <h3>Kết hợp AI và bộ quy tắc linh hoạt</h3>
              <p>Vận hành song song mô hình phát hiện bất thường bằng AI và bộ quy tắc điều kiện động, đồng thời duy trì luồng đánh giá liên tục khi có sự cố dịch vụ.</p>
            </div>
          </article>

          <article className={`${s.featureCard} ${s.revealSlideRight} ${s.delay2}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>03</span>
              <h3>Không gian làm việc đa tenant độc lập</h3>
              <p>Mỗi doanh nghiệp được cấp một workspace riêng biệt, đảm bảo cô lập dữ liệu hoàn toàn, tự chủ quản trị thành viên nội bộ và thiết lập phạm vi giám sát độc lập.</p>
            </div>
          </article>

          <article className={`${s.featureCard} ${s.revealSlideLeft}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>04</span>
              <h3>Kiểm thử quy tắc an toàn trước khi áp dụng</h3>
              <p>Hỗ trợ thiết lập, rà soát và chạy thử nghiệm quy tắc mới trên môi trường kiểm thử độc lập trước khi đưa vào vận hành chính thức.</p>
            </div>
          </article>

          <article className={`${s.featureCard} ${s.revealFadeUp} ${s.delay1}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>05</span>
              <h3>Quy trình điều tra và phê duyệt hai cấp</h3>
              <p>Tách bạch rõ vai trò giữa người xác minh bằng chứng thực tế và người rà soát, phê duyệt kết luận cuối cùng trên từng hồ sơ.</p>
            </div>
          </article>

          <article className={`${s.featureCard} ${s.revealSlideRight} ${s.delay2}`} data-reveal>
            <div className={s.featureTop}>
              <span className={s.featureNum}>06</span>
              <h3>Lưu vết lịch sử thao tác minh bạch</h3>
              <p>Ghi nhận đầy đủ toàn bộ quá trình xử lý hồ sơ, thay đổi cấu hình và quyết định nghiệp vụ nhằm phục vụ kiểm tra, đối soát nội bộ.</p>
            </div>
          </article>
        </div>
        </div>
      </section>

      <section className={`${s.sectionAlt} ${s.scrollSection}`} data-scroll-section id="ho-so" aria-labelledby="story-heading">
        <div className={s.container}>
          <div className={`${s.centerHeader} ${s.revealFadeBlur}`} data-reveal>
            <p className={s.sectionNumber}>02 / QUẢN LÝ HỒ SƠ TẬP TRUNG</p>
            <h2 id="story-heading">Một hồ sơ điều tra,<br/><span>toàn bộ bối cảnh trên một màn hình</span></h2>
            <p className={s.centerSub}>
              Từ lúc phát sinh cảnh báo đến khi đóng hồ sơ, nhân sự vận hành và điều tra viên làm việc trên cùng một hồ sơ thống nhất, không thất lạc bằng chứng.
            </p>
          </div>

          <div className={`${s.pillBar} ${s.revealFadeBlur}`} data-reveal role="group" aria-label="Các bước trong tình huống">
            {steps.map((item, i) => (
              <button
                key={item.name}
                type="button"
                aria-pressed={step === i}
                onClick={() => setStep(i)}
                className={`${s.pillBtn} ${step === i ? s.pillBtnActive : ''}`}
              >
                <span>0{i + 1}</span> {item.name}
              </button>
            ))}
          </div>

          <div className={s.hubGrid} aria-live="polite">
            <div className={`${s.hubCol} ${s.hubColLeft} ${s.revealSlideLeft}`} data-reveal>
              <article onClick={() => setStep(0)} className={`${s.caseSheet} ${currentStep.cardIndex === 0 ? s.caseSheetActive : ''}`}>
                <div className={s.sheetHeader}>
                  <span className={s.sheetNum}>01</span>
                  <span>Dữ liệu giao dịch đầu vào</span>
                </div>
                <h3>Ngữ cảnh theo từng doanh nghiệp</h3>
                <p>Tập hợp thông tin giao dịch, kênh phát sinh và các yếu tố liên quan để tạo góc nhìn tổng thể ngay từ đầu.</p>
              </article>

              <article onClick={() => setStep(1)} className={`${s.caseSheet} ${currentStep.cardIndex === 1 ? s.caseSheetActive : ''}`}>
                <div className={s.sheetHeader}>
                  <span className={s.sheetNum}>02</span>
                  <span>Bằng chứng kích hoạt</span>
                </div>
                <h3>Lý do giao dịch cần kiểm tra</h3>
                <p>Hiển thị rõ các điều kiện hoặc dấu hiệu rủi ro đã kích hoạt cảnh báo trước khi phân công cho nhân sự điều tra.</p>
              </article>
            </div>

            <div className={`${s.hubCenter} ${s.revealZoomIn} ${s.delay1}`} data-reveal>
              <div className={s.hubTop}>
                <span className={s.hubCode}>Hồ sơ điều tra tập trung · Luồng xử lý 4 bước</span>
                <span className={s.sourceLabel}>{currentStep.stage}</span>
              </div>
              <h3>Liên kết xuyên suốt từ cảnh báo ban đầu đến quyết định xử lý cuối cùng</h3>

              <div className={s.hubMetaGrid}>
                <div className={s.hubMetaItem}>
                  <span>CẤP XÁC MINH</span>
                  <strong>Nhân sự điều tra (Investigator)</strong>
                </div>
                <div className={s.hubMetaItem}>
                  <span>CẤP PHÊ DUYỆT</span>
                  <strong>Quản lý vận hành (Operator)</strong>
                </div>
              </div>

              <div className={s.stepperTrack} aria-label="Tiến trình hồ sơ">
                {['Tiếp nhận', 'Phân công', 'Báo cáo', 'Kết luận'].map((label, idx) => (
                  <div
                    key={label}
                    onClick={() => setStep(idx)}
                    className={`${s.stepperNode} ${idx < step ? s.stepperNodeDone : idx === step ? s.stepperNodeActive : ''}`}
                  >
                    <span>Bước {idx + 1}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>

              <div className={s.hubFocusBox} key={step}>
                <strong>{currentStep.title}</strong>
                <p>{currentStep.description}</p>
              </div>

              <div className={s.stepPagination}>
                <span>0{step + 1} <span>/ 04 · Quy trình xử lý hồ sơ</span></span>
                <button
                  type="button"
                  className={s.circleBtn}
                  onClick={() => setStep((step + 1) % steps.length)}
                  aria-label={step === 3 ? 'Xem lại từ giao dịch' : 'Xem bước tiếp theo'}
                >
                  <Arrow/>
                </button>
              </div>
            </div>

            <div className={`${s.hubCol} ${s.hubColRight} ${s.revealSlideRight} ${s.delay2}`} data-reveal>
              <article onClick={() => setStep(2)} className={`${s.caseSheet} ${currentStep.cardIndex === 2 ? s.caseSheetActive : ''}`}>
                <div className={s.sheetHeader}>
                  <span className={s.sheetNum}>03</span>
                  <span>Báo cáo điều tra</span>
                </div>
                <h3>Đề xuất kết luận có căn cứ</h3>
                <p>Nhân sự điều tra ghi nhận kết quả xác minh thực tế, đính kèm nhận định và gửi đề xuất xử lý lên cấp quản lý.</p>
              </article>

              <article onClick={() => setStep(3)} className={`${s.caseSheet} ${currentStep.cardIndex === 3 ? s.caseSheetActive : ''}`}>
                <div className={s.sheetHeader}>
                  <span className={s.sheetNum}>04</span>
                  <span>Phê duyệt &amp; Lưu vết hệ thống</span>
                </div>
                <h3>Chốt quyết định và lưu lịch sử</h3>
                <p>Cấp quản lý phê duyệt phương án xử lý cuối cùng; mọi thao tác cập nhật đều được ghi nhận tự động vào nhật ký hệ thống.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className={`${s.sectionPastelWarm} ${s.scrollSection}`} data-scroll-section id="co-che" aria-labelledby="detection-heading">
        <div className={s.container}>
        <div className={`${s.centerHeader} ${s.revealFadeBlur}`} data-reveal>
          <p className={s.sectionNumber}>03 / CƠ CHẾ ĐÁNH GIÁ &amp; DỰ PHÒNG</p>
          <h2 id="detection-heading">Kết quả phân loại rõ ràng.<br/><span>Có nguồn. Có bằng chứng.</span></h2>
          <p className={s.centerSub}>
            Biết chính xác giao dịch được đánh giá bởi mô hình AI Detection, bộ quy tắc động hay cơ chế dự phòng (Rule Fallback) trước khi đưa ra quyết định nghiệp vụ.
          </p>
        </div>

        <div className={`${s.pillBar} ${s.revealFadeBlur}`} data-reveal role="group" aria-label="Chọn nguồn đánh giá">
          {(['AI', 'RULE', 'RULE_FALLBACK'] as const).map(value => (
            <button
              key={value}
              type="button"
              onClick={() => setSource(value)}
              aria-pressed={source === value}
              className={`${s.pillBtn} ${source === value ? s.pillBtnActive : ''}`}
            >
              <span>{value}</span> {detectionModes[value].label}
            </button>
          ))}
        </div>

        <div className={s.detectionWindow} aria-live="polite">
          <div className={s.detectionThreeCol}>
            <div className={`${s.caseSheet} ${s.detectColLeft} ${s.revealSlideLeft}`} data-reveal>
              <div className={s.sheetHeader}>
                <span className={s.sheetNum}>Đầu vào</span>
                <span>Ingestion &amp; Schema</span>
              </div>
              <h3>Tiếp nhận giao dịch đa kênh</h3>
              <p>Hỗ trợ gửi giao dịch qua REST API hoặc nhập tệp CSV/Excel có bước kiểm tra định dạng trường dữ liệu trước khi đánh giá.</p>
              <dl>
                <div><dt>Phương thức</dt><dd>REST API / CSV / Excel</dd></div>
                <div><dt>Phạm vi</dt><dd>Theo từng Workspace của SME</dd></div>
                <div><dt>Kiểm tra trước</dt><dd>Đối chiếu trường bắt buộc</dd></div>
              </dl>
            </div>

            <div className={`${s.engineBox} ${source === 'RULE' ? s.engineBoxRule : source === 'RULE_FALLBACK' ? s.engineBoxFallback : ''} ${s.revealZoomIn} ${s.delay1}`} data-reveal>
              <div className={s.engineContent} key={source}>
                <div>
                  <div className={s.engineHead}>
                    <div className={s.engineIcon} aria-hidden="true">{source === 'AI' ? 'AI' : '{ }'}</div>
                    <span className={s.sourceLabel}>{currentDetection.badge}</span>
                  </div>
                  <h3>{currentDetection.title}</h3>
                  <p>{currentDetection.description}</p>
                </div>
                <div className={s.engineSignals}>
                  {currentDetection.signals.map(([k, v]) => (
                    <div className={s.engineSignalRow} key={k}>
                      <span>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${s.caseSheet} ${s.detectColRight} ${s.revealSlideRight} ${s.delay2}`} data-reveal>
              <div className={s.sheetHeader}>
                <span className={s.sheetNum}>Đầu ra</span>
                <span>Alert &amp; Case Queue</span>
              </div>
              <h3>Hỗ trợ con người ra quyết định</h3>
              <p>Giao dịch Bất thường (Abnormal) sinh cảnh báo kèm bằng chứng để Operator và Investigator xử lý, không tự động hủy giao dịch của khách hàng.</p>
              <dl>
                <div><dt>Khi Abnormal</dt><dd>Sinh Alert &amp; đưa vào Queue</dd></div>
                <div><dt>Bằng chứng</dt><dd>Lưu kèm hồ sơ điều tra</dd></div>
                <div><dt>Kết luận cuối</dt><dd>Thuộc về nhân sự phụ trách</dd></div>
              </dl>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className={`${s.sectionAlt} ${s.scrollSection}`} data-scroll-section id="vai-tro" aria-labelledby="roles-heading">
        <div className={s.container}>
          <div className={`${s.centerHeader} ${s.revealFadeBlur}`} data-reveal>
            <p className={s.sectionNumber}>04 / QUY TRÌNH VẬN HÀNH</p>
            <h2 id="roles-heading">Cách FraudGuard hoạt động</h2>
            <p className={s.centerSub}>
              Ba bước từ khi tiếp nhận dữ liệu giao dịch đến kết quả điều tra có bằng chứng kiểm chứng được.
            </p>
          </div>

          <div className={s.howGrid}>
            {howSteps.map((item, i) => (
              <div
                key={item.number}
                className={`${s.howStep} ${s.revealFadeUp} ${i === 1 ? s.delay1 : i === 2 ? s.delay2 : ''}`}
                data-reveal
              >
                <div className={s.howStepTop}>
                  <span className={s.howStepBadge}>{item.number}</span>
                  <span className={s.howStepLine} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.container} ${s.section} ${s.plans} ${s.scrollSection}`} data-scroll-section id="goi-su-dung" aria-labelledby="plans-heading">
        <div className={`${s.planIntro} ${s.revealSlideLeft}`} data-reveal>
          <p className={s.sectionNumber}>05 / PHƯƠNG ÁN SỬ DỤNG</p>
          <h2 id="plans-heading">Chọn cơ chế đánh giá<br/><span>phù hợp với doanh nghiệp.</span></h2>
          <p>Hai phương án theo kiến trúc hệ thống FraudGuard. Doanh nghiệp có thể bắt đầu với bộ quy tắc động hoặc sử dụng AI Detection kèm cơ chế dự phòng Rule Fallback.</p>
          <a className={s.textLink} href="#lien-he">Liên hệ với chúng tôi <Arrow/></a>
        </div>

        <div className={`${s.planTableWrap} ${s.revealSlideRight} ${s.delay1}`} data-reveal>
          <table className={s.planTable}>
            <caption className={s.srOnly}>So sánh hai phương án Free và Subscription theo đặc tả FraudGuard</caption>
            <thead>
              <tr>
                <th scope="col">Khả năng</th>
                <th scope="col"><span>Free</span>Dynamic Rule Engine</th>
                <th scope="col"><span>Subscription</span>AI Detection + Fallback</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Cơ chế đánh giá chính', 'Bộ quy tắc động', 'Mô hình AI kết hợp bộ quy tắc'],
                ['Kết quả phân loại', 'Abnormal / Normal / Undetermined', 'Abnormal / Normal + Độ tin cậy AI'],
                ['Bằng chứng đi kèm', 'Quy tắc khớp & giá trị quan sát (ruleEvidence)', 'Giải thích từ AI & tín hiệu kích hoạt'],
                ['Khi dịch vụ AI gián đoạn', 'Không áp dụng', 'Tự động chuyển sang RULE_FALLBACK'],
                ['Quản lý hồ sơ (Operator & Investigator)', 'Đầy đủ luồng Case Queue & My Cases', 'Đầy đủ luồng Case Queue & My Cases'],
              ].map(row => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`${s.sectionAlt} ${s.scrollSection}`} data-scroll-section id="giai-dap" aria-labelledby="faq-heading">
        <div className={`${s.container} ${s.faqWrap}`}>
          <div className={`${s.centerHeader} ${s.revealFadeBlur}`} data-reveal>
            <p className={s.sectionNumber}>06 / CÂU HỎI THƯỜNG GẶP</p>
            <h2 id="faq-heading">Những điều bạn cần biết<br/><span>về FraudGuard</span></h2>
            <p className={s.centerSub}>Giải đáp về cơ chế phân loại bất thường, quy trình phối hợp và phương thức triển khai cho doanh nghiệp.</p>
          </div>

          <div className={`${s.faqCard} ${s.revealZoomIn}`} data-reveal>
            {questions.map(([question, answer], i) => (
              <details key={question}>
                <summary>
                  <span className={s.faqNumber}>0{i + 1}</span>
                  <span>{question}</span>
                  <span className={s.faqPlus} aria-hidden="true"/>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${s.container} ${s.finalCta} ${s.scrollSection} ${s.revealZoomIn}`} id="lien-he" data-scroll-section data-reveal aria-labelledby="final-heading">
        <div>
          <p className={s.sectionNumber}>LIÊN HỆ VỚI CHÚNG TÔI</p>
          <h2 id="final-heading">Bắt đầu chuẩn hóa quy trình<br/><span>kiểm soát rủi ro giao dịch ngay hôm nay</span></h2>
          <p className={s.contactMeta}>Email: <strong>contact@fraudguard.vn</strong> · Hotline tư vấn: <strong>1900 6868</strong> (08:30 - 18:00)</p>
        </div>
        <div>
          <a className={s.primary} href="mailto:contact@fraudguard.vn">Liên hệ với chúng tôi <Arrow/></a>
          <p>Nhận tư vấn kiến trúc tích hợp và lộ trình triển khai cho doanh nghiệp.</p>
        </div>
      </section>
    </main>

    <footer className={`${s.container} ${s.footer} ${s.scrollSection}`} data-scroll-section>
      <div className={`${s.footerLeft} ${s.revealSlideLeft}`} data-reveal>
        <a className={s.brand} href="#" aria-label="FraudGuard, về đầu trang"><Shield small/><span>Fraud<span className={s.brandLight}>Guard</span></span></a>
        <p>Nền tảng giám sát giao dịch bất thường và quản lý hồ sơ điều tra dành cho doanh nghiệp SME.</p>
      </div>
      <div className={`${s.footerRight} ${s.revealSlideRight} ${s.delay1}`} data-reveal>
        <span>Phân quyền rõ trách nhiệm. Xử lý dựa trên bằng chứng.</span>
        <a href="#giai-dap">Câu hỏi thường gặp</a>
        <a href="#">Về đầu trang ↑</a>
      </div>
    </footer>
  </div>;
}
