import Image from "next/image";

const businessName = "대전세븐나이트 웨이터 딸기";
const area = "대전광역시 중구 유천동";
const detailAddress = "332-28";
const phoneDisplay = "010-1234-5678";
const phoneHref = "tel:01012345678";
const kakaoId = "strawberry7";
const kakaoHref = "https://open.kakao.com/o/strawberry7";
const siteUrl = "https://daejeon-seven-nights-strawberry.vercel.app";

const navItems = [
  { href: "#hero", label: "딸기" },
  { href: "#promise", label: "약속" },
  { href: "#room", label: "분위기" },
  { href: "#gallery", label: "갤러리" },
  { href: "#guide", label: "가이드" },
  { href: "#location", label: "오는길" },
  { href: "#contact", label: "예약" }
];

const promises = [
  {
    title: "정직한 가격 안내",
    text: "방문 전 기본 비용, 주류 구성, 인원별 추천 세트를 먼저 정리해드립니다. 처음 방문하는 고객도 부담 없이 비교할 수 있도록 숨김 없는 상담을 기준으로 합니다."
  },
  {
    title: "흐름 있는 부킹 케어",
    text: "무작정 권하는 방식이 아니라 방문 목적, 시간대, 일행 분위기에 맞춰 자연스럽게 즐길 수 있는 방향을 안내합니다."
  },
  {
    title: "재방문 고객 관리",
    text: "취향과 예산, 선호 좌석, 방문 패턴을 기억해 다음 예약이 더 편해지도록 웨이터 딸기가 이어서 케어합니다."
  }
];

const galleryCaptions = [
  "VIP룸 인테리어와 프라이빗 테이블 분위기",
  "샴페인 세팅과 생일, 기념일 예약 연출",
  "주말 피크타임에 어울리는 조명과 음악 흐름",
  "단체 방문을 위한 넓은 좌석과 여유 있는 구성"
];

const timeTips = [
  {
    label: "평일 저녁",
    value: "여유로운 상담",
    text: "처음 방문하거나 조용히 분위기를 보고 싶은 분께 좋습니다."
  },
  {
    label: "금요일 22시 전",
    value: "추천 시간",
    text: "대기 부담이 낮고 테이블 선택 폭이 넓은 편입니다."
  },
  {
    label: "주말 피크타임",
    value: "사전 예약 필수",
    text: "방문 인원과 예산을 먼저 알려주시면 구성이 빨라집니다."
  }
];

const faqs = [
  {
    q: "대전세븐나이트 예약은 어떻게 하나요?",
    a: "전화 또는 카카오톡으로 날짜, 시간, 인원수를 알려주세요. 웨이터 딸기가 예약 가능 여부와 추천 구성을 안내합니다."
  },
  {
    q: "처음 방문해도 괜찮나요?",
    a: "물론입니다. 입장 흐름, 기본 비용, 주류 세트, 복장까지 방문 전에 차분하게 안내해드립니다."
  },
  {
    q: "인원별 주류 세트 추천이 가능한가요?",
    a: "가능합니다. 2~3명, 4~6명, 단체 방문처럼 인원과 예산에 맞춰 무리 없는 구성을 제안합니다."
  },
  {
    q: "드레스코드는 어떻게 준비하면 좋나요?",
    a: "깔끔하고 세련된 스타일을 추천합니다. 과한 연출보다 자신감과 매너가 가장 좋은 인상을 만듭니다."
  }
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  name: businessName,
  alternateName: ["대전세븐나이트", "중구세븐나이트", "유천동세븐나이트", "웨이터 딸기"],
  description:
    "대전광역시 중구 유천동 332-28 대전세븐나이트 예약 상담. 웨이터 딸기의 가격 안내, 부킹 케어, 재방문 고객 관리, 시크릿 가이드 서비스.",
  url: siteUrl,
  image: [
    `${siteUrl}/images/seven%20(1).png`,
    `${siteUrl}/images/seven%20(2).png`,
    `${siteUrl}/images/seven%20(3).png`,
    `${siteUrl}/images/seven%20(5).png`
  ],
  telephone: phoneDisplay,
  priceRange: "상담 후 안내",
  areaServed: ["대전광역시", "중구", "유천동"],
  address: {
    "@type": "PostalAddress",
    streetAddress: detailAddress,
    addressLocality: "중구 유천동",
    addressRegion: "대전광역시",
    addressCountry: "KR"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneDisplay,
    contactType: "reservations",
    availableLanguage: ["ko-KR", "Korean"]
  },
  sameAs: [kakaoHref]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a
    }
  }))
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#08080a] text-[#fffaf7]">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080a]/88 backdrop-blur-xl">
        <nav
          aria-label="대전세븐나이트 주요 메뉴"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"
        >
          <a href="#hero" className="text-base font-black text-[#f7d680]">
            웨이터 딸기
          </a>
          <div className="hidden items-center gap-5 text-sm font-semibold text-white/72 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-[#ff5f7a]">
                {item.label}
              </a>
            ))}
          </div>
          <a
            href={phoneHref}
            className="rounded-md bg-[#ff5f7a] px-4 py-2 text-sm font-black text-white shadow-glow hover:bg-[#e44b65]"
          >
            전화 예약
          </a>
        </nav>
      </header>

      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate min-h-[calc(100vh-68px)] border-b border-white/10"
      >
        <Image
          src="/images/seven (1).png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08080a_0%,rgba(8,8,10,0.86)_44%,rgba(8,8,10,0.36)_100%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7d680]">
              Daejeon Seven Night Reservation
            </p>
            <h1
              id="hero-title"
              className="mt-5 max-w-4xl text-5xl font-black leading-tight tracking-normal md:text-7xl"
            >
              대전세븐나이트
              <span className="block text-[#ff5f7a]">웨이터 딸기</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              대전광역시 중구 유천동 332-28에서 특별한 밤을 준비한다면 방문 전 상담부터
              예약, 테이블 구성, 분위기 케어까지 딸기가 빠르게 안내합니다.
              이미지 안 문구에 기대지 않고 필요한 정보는 모두 HTML 텍스트로
              분명하게 담았습니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-md bg-[#ff5f7a] px-7 py-4 text-lg font-black text-white shadow-glow hover:bg-[#e44b65]"
              >
                지금 예약 상담
              </a>
              <a
                href={kakaoHref}
                className="inline-flex items-center justify-center rounded-md border border-[#f7d680] px-7 py-4 text-lg font-black text-[#f7d680] hover:bg-[#f7d680] hover:text-[#08080a]"
              >
                카카오톡 문의
              </a>
            </div>
          </div>
          <div className="grid gap-4 rounded-lg border border-white/12 bg-black/58 p-5 backdrop-blur">
            {[
              ["위치", "대전광역시 중구 유천동 332-28"],
              ["상담", "전화 · 카카오톡 빠른 안내"],
              ["예약", "인원과 예산에 맞춘 테이블 구성"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-white/10 p-5">
                <p className="text-sm font-bold text-[#f7d680]">{label}</p>
                <p className="mt-2 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="promise" className="border-b border-white/10 bg-[#101016] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5f7a]">
                Strawberry Promise
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                정직한 가격, 자연스러운 흐름, 기억되는 케어
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/74">
                대전세븐나이트 웨이터 딸기는 첫 문의부터 방문 후 재예약까지
                고객이 궁금해하는 지점을 먼저 정리합니다. 가격, 시간대, 주류
                구성, 입장 흐름을 실제 텍스트로 안내해 검색과 상담 모두에
                도움이 되도록 구성했습니다.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border border-white/12">
              <Image
                src="/images/seven (2).png"
                alt="대전세븐나이트 웨이터 딸기 서비스 안내 이미지"
                width={2400}
                height={1000}
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {promises.map((promise, index) => (
              <article
                key={promise.title}
                className="rounded-lg border border-white/10 bg-black/34 p-6"
              >
                <span className="text-3xl font-black text-[#ff5f7a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-black">{promise.title}</h3>
                <p className="mt-3 leading-7 text-white/72">{promise.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="room"
        className="relative isolate border-b border-white/10 py-24"
      >
        <Image
          src="/images/seven (3).png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-64"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#08080a_0%,rgba(8,8,10,0.78)_52%,rgba(8,8,10,0.2)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7d680]">
              VIP Room Mood
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              조명, 음악, 테이블 흐름까지 맞춘 대전세븐나이트 분위기
            </h2>
            <p className="mt-6 text-lg leading-9 text-white/82">
              생일, 회식, 친구 모임, 혼자 방문까지 목적에 따라 좋은 자리는
              달라집니다. 딸기는 방문 시간과 인원, 예산을 기준으로 현장에서
              가장 어울리는 흐름을 안내합니다.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-b border-white/10 bg-black py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5f7a]">
                Gallery
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
                사진은 분위기를 보여주고, 텍스트는 예약 결정을 돕습니다
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/72">
              검색엔진이 읽을 수 있도록 이미지 설명, 예약 키워드, 지역 키워드,
              상담 정보를 HTML 문장으로 구성했습니다. 대전세븐나이트,
              중구 유천동, 웨이터 딸기 관련 핵심 문구를 자연스럽게
              배치했습니다.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-white/12">
            <Image
              src="/images/seven (3).png"
              alt="대전세븐나이트 VIP룸과 샴페인 테이블 갤러리"
              width={2400}
              height={1000}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {galleryCaptions.map((caption) => (
              <article
                key={caption}
                className="rounded-md border border-white/10 bg-[#101016] p-4 text-center font-semibold text-white/82"
              >
                {caption}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="border-b border-white/10 bg-[#121016] py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7d680]">
              Secret Guide
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
              딸기만의 방문 가이드
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/72">
              언제 가면 좋은지, 어떤 스타일이 어울리는지, 어느 정도 예산을
              잡으면 좋은지 방문 전 가장 많이 묻는 내용을 정리했습니다.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-white/12">
            <Image
              src="/images/seven (5).png"
              alt="웨이터 딸기 시크릿 가이드 이미지"
              width={2400}
              height={1000}
              className="h-auto w-full"
            />
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="rounded-lg border border-white/10 bg-black/36 p-6">
              <h3 className="text-2xl font-black text-[#ff5f7a]">추천 시간대</h3>
              <div className="mt-5 grid gap-3">
                {timeTips.map((tip) => (
                  <div key={tip.label} className="rounded-md border border-white/10 p-4">
                    <p className="font-black">{tip.label}</p>
                    <p className="mt-1 font-bold text-[#f7d680]">{tip.value}</p>
                    <p className="mt-2 text-sm leading-6 text-white/70">{tip.text}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-lg border border-white/10 bg-black/36 p-6">
              <h3 className="text-2xl font-black text-[#ff5f7a]">드레스코드</h3>
              <ul className="mt-5 space-y-3 leading-7 text-white/74">
                <li>깔끔한 셔츠, 니트, 재킷처럼 단정한 스타일을 추천합니다.</li>
                <li>과한 액세서리보다 자연스러운 향과 깨끗한 인상이 좋습니다.</li>
                <li>단체 방문은 톤을 맞추면 테이블 분위기가 더 좋아집니다.</li>
              </ul>
            </article>
            <article className="rounded-lg border border-white/10 bg-black/36 p-6">
              <h3 className="text-2xl font-black text-[#ff5f7a]">주류 구성</h3>
              <ul className="mt-5 space-y-3 leading-7 text-white/74">
                <li>2~3명은 가볍게 시작할 수 있는 기본 구성이 좋습니다.</li>
                <li>4~6명은 테이블 흐름이 끊기지 않는 중간 구성을 추천합니다.</li>
                <li>단체와 VIP 방문은 목적에 맞춰 별도 상담이 빠릅니다.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="location" className="border-b border-white/10 bg-black py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff5f7a]">
              Location
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight">
              대전세븐나이트 오는길
            </h2>
            <address className="mt-5 not-italic text-lg leading-9 text-white/74">
              <strong className="block text-2xl text-[#f7d680]">
                {businessName}
              </strong>
              주소: {area} {detailAddress}
              <br />
              전화 예약: <a href={phoneHref}>{phoneDisplay}</a>
              <br />
              카카오톡 ID: {kakaoId}
            </address>
            <p className="mt-5 leading-8 text-white/68">
              대전광역시 중구 유천동 332-28 주소를 기준으로 방문 전 상담과
              예약 안내를 연결합니다. 지도와 주차 안내는 확인 후 추가로
              반영하겠습니다.
            </p>
          </div>
          <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-white/20 bg-[#111015] p-6 text-center leading-8 text-white/68">
            Google Maps 영역
            <br />
            지도와 주차 안내를 확인 후 연결하세요.
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#101016] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7d680]">
              Reservation
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">
              대전세븐나이트 예약은 딸기에게 바로 문의하세요
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/74">
              방문 날짜, 시간, 인원, 예산을 알려주시면 대전세븐나이트 현장
              흐름에 맞는 구성을 빠르게 안내합니다. 만 19세 이상 고객만
              이용 가능하며, 건전하고 매너 있는 방문을 기준으로 상담합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-md bg-[#ff5f7a] px-6 py-4 font-black text-white hover:bg-[#e44b65]"
              >
                {phoneDisplay} 전화 예약
              </a>
              <a
                href={kakaoHref}
                className="inline-flex items-center justify-center rounded-md border border-[#f7d680] px-6 py-4 font-black text-[#f7d680] hover:bg-[#f7d680] hover:text-[#08080a]"
              >
                카카오톡 strawberry7
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/42 p-6">
            <h3 className="text-2xl font-black">자주 묻는 질문</h3>
            <div className="mt-5 grid gap-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="rounded-md border border-white/10 bg-white/[0.04] p-4"
                >
                  <summary className="cursor-pointer font-black text-[#f7d680]">
                    {faq.q}
                  </summary>
                  <p className="mt-3 leading-7 text-white/72">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-8 text-sm leading-7 text-white/60">
        <div className="mx-auto max-w-7xl">
          <p className="font-black text-white">
            {businessName} | 대전세븐나이트 예약 상담
          </p>
          <p>
            사업자 정보: 입력 예정 · 주소: {area} {detailAddress} · 전화:
            {" "}
            {phoneDisplay} · 카카오톡 ID: {kakaoId}
          </p>
          <p>
            대전세븐나이트, 중구 유천동, 웨이터 딸기, 정직한 가격 안내,
            부킹 케어, 재방문 관리, 방문 가이드 정보를 제공합니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
