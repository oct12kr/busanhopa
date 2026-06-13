import Image from "next/image";
import {
  businessName,
  area,
  detailAddress,
  phoneDisplay,
  phoneHref,
  kakaoOpenChatHref,
  siteUrl,
  fullAddress,
  mapEmbedSrc,
  mapDirectionsHref
} from "@/lib/constants";
import { PhoneIcon } from "@/components/Icons";

const promises = [
  {
    id: "01",
    icon: "🏷️",
    title: "정직한 가격 안내",
    text: "이용 전 가격과 구성, 시간, 주종 등을 명확하게 안내해드립니다.\n추가 비용 없이 안심하고 이용하실 수 있도록 투명하게 운영합니다."
  },
  {
    id: "02",
    icon: "📅",
    title: "편리한 예약 시스템",
    text: "전화 한 통으로 간편하게 예약 가능합니다.\n원하시는 시간과 인원에 맞춰 최적의 자리를 준비해드립니다."
  },
  {
    id: "03",
    icon: "👑",
    title: "재방문 고객 케어",
    text: "방문 기록과 취향을 바탕으로 더 나은 서비스와 혜택을 제공합니다.\n언제 방문하셔도 기억되는 특별한 경험을 선사합니다."
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
    q: "건대 W 예약은 어떻게 하나요?",
    a: "전화로 방문 날짜와 시간, 인원을 알려주시면 예약 가능 여부와 이용 안내를 빠르게 도와드립니다."
  },
  {
    q: "처음 방문해도 괜찮나요?",
    a: "처음 방문하시는 분들도 부담 없이 이용하실 수 있도록 예약 단계부터 방문 전까지 친절하게 안내해드립니다."
  },
  {
    q: "몇 명까지 이용 가능한가요?",
    a: "1~2인 방문부터 친구 모임, 단체 방문까지 인원에 맞는 공간을 안내해드립니다."
  },
  {
    q: "어떤 복장이 어울리나요?",
    a: "깔끔한 셔츠, 니트, 재킷 등 단정하고 세련된 스타일을 추천합니다."
  },
  {
    q: "당일 예약도 가능한가요?",
    a: "가능하지만 금요일과 주말은 사전 예약을 권장합니다."
  },
  {
    q: "주차는 가능한가요?",
    a: "방문 전 문의 주시면 주변 주차 시설을 안내해드립니다."
  }
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "NightClub",
  name: businessName,
  alternateName: ["건대W", "건대호빠", "광진구호빠", "건대라운지"],
  description:
    "서울특별시 광진구 아차산로33길 16-10 건대W 건대호빠 예약 상담. 가격 안내, 방문 케어, 재방문 고객 관리, 시크릿 가이드 서비스.",
  url: siteUrl,
  image: [
    `${siteUrl}/images/seven%20(1).png`,
    `${siteUrl}/images/seven%20(2).png`,
    `${siteUrl}/images/seven%20(3).png`
  ],
  telephone: phoneDisplay,
  priceRange: "상담 후 안내",
  areaServed: ["서울특별시", "광진구", "아차산로"],
  address: {
    "@type": "PostalAddress",
    streetAddress: detailAddress,
    addressLocality: "광진구 아차산로",
    addressRegion: "서울특별시",
    addressCountry: "KR"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneDisplay,
    contactType: "reservations",
    availableLanguage: ["ko-KR", "Korean"]
  }
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
    <main className="min-h-screen overflow-hidden bg-transparent text-[#fffaf7]">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative isolate min-h-[calc(100vh-68px)] border-b border-white/10"
      >
        <Image
          src="/images/g_hopa (1).png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* 좌→우 어둡게: 텍스트 가독성 확보 (기존보다 밝게 조절) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.8)_0%,rgba(8,8,10,0.6)_40%,rgba(8,8,10,0.2)_70%,rgba(8,8,10,0.0)_100%)]" />
        {/* 하→상 어둡게: 모바일 보강 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-transparent md:hidden" />

        {/* 우상단 W KONDAE HOST BAR 엠블럼 (PC만) */}
        <div className="absolute right-12 top-12 hidden flex-col items-center gap-2 text-center lg:flex p-8 border border-[#f7d680]/30 shadow-[0_0_30px_rgba(247,214,128,0.15)] bg-black/40 backdrop-blur-sm">
          <span className="text-7xl font-black text-[#f7d680]/90 drop-shadow-[0_2px_12px_rgba(247,214,128,0.3)]">W</span>
          <span className="text-sm font-bold uppercase tracking-[0.25em] text-[#f7d680]/80 mt-2">Kondae</span>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f7d680]/60">Host Bar</span>
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-68px)] max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          {/* 좌측: 메인 카피 */}
          <div>
            <div className="flex items-center gap-3">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
                Kondae W Host Bar
              </p>
              <span className="hidden h-px w-24 bg-[#f7d680]/40 sm:block" />
            </div>
            <h1
              id="hero-title"
              className="mt-6 text-5xl font-black leading-[1.2] tracking-tight md:text-6xl"
            >
              건대 <span className="text-[#f7d680] text-7xl md:text-8xl align-middle ml-2">W</span>
              <br />
              <span className="text-4xl md:text-[3.2rem] mt-2 block">당신만을 위한 특별한 밤</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-[#f7d680]/80 md:text-lg">
              프라이빗한 공간, 완벽한 서비스, 그리고 잊지 못할 시간
              <br />
              건대 W에서 최고의 순간을 경험하세요.
            </p>

            {/* 3개 피처 배지 */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: "👤", text: "준건실장 직접 관리" },
                { icon: "👑", text: "체계적인 시스템" },
                { icon: "💎", text: "프라이빗 VIP 룸" }
              ].map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-2 rounded-md border border-[#f7d680]/30 bg-black/40 px-4 py-2.5 text-sm font-bold text-white backdrop-blur-md"
                >
                  <span className="text-[#f7d680]">{badge.icon}</span>
                  {badge.text}
                </span>
              ))}
            </div>

            {/* 전화번호 박스 */}
            <div className="mt-10 inline-flex w-full items-center justify-center gap-5 rounded-lg border border-[#f7d680]/40 bg-black/40 px-6 py-5 backdrop-blur-md sm:w-auto sm:justify-start sm:px-10 sm:py-6">
              <a href={phoneHref} className="flex items-center gap-5 group w-full justify-center sm:justify-start">
                <span className="flex h-14 w-14 items-center justify-center text-[#f7d680] transition group-hover:scale-110 duration-300">
                  <PhoneIcon className="h-10 w-10" />
                </span>
                <div className="text-center sm:text-left">
                  <p className="text-3xl font-black text-[#f7d680] sm:text-4xl">{phoneDisplay}</p>
                  <p className="mt-1 text-sm font-semibold text-[#f7d680]/70">준건실장 전화 예약</p>
                </div>
              </a>
            </div>
          </div>

          {/* 우측: 안내 카드 */}
          <div className="grid gap-0 rounded-2xl border border-white/12 bg-black/40 backdrop-blur-md overflow-hidden relative mt-10 md:mt-0 lg:mr-10">
            {/* 위치 */}
            <div className="border-b border-white/10 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f7d680]/30 text-xl text-[#f7d680]">📍</span>
                <div>
                  <p className="text-sm font-bold text-[#f7d680]">위치</p>
                  <p className="mt-2 text-lg font-black leading-snug">서울특별시 광진구 아차산로33길 16-10</p>
                </div>
              </div>
            </div>
            {/* 담당 */}
            <div className="border-b border-white/10 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f7d680]/30 text-xl text-[#f7d680]">📞</span>
                <div>
                  <p className="text-sm font-bold text-[#f7d680]">담당</p>
                  <p className="mt-2 text-sm font-semibold text-white/60">준건실장</p>
                  <a href={phoneHref} className="mt-1 block text-2xl font-black text-white hover:text-[#f7d680] transition sm:text-[1.7rem]">
                    {phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
            {/* 예약 안내 */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#f7d680]/30 text-xl text-[#f7d680]">📅</span>
                <div>
                  <p className="text-sm font-bold text-[#f7d680]">예약 안내</p>
                  <p className="mt-2 text-lg font-black leading-snug">전화 예약 후 방문 부탁드립니다.</p>
                  <p className="mt-2 text-sm text-white/50">최고의 서비스로 모시겠습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="border-b border-white/10 bg-[#08080a] py-24">
        <div className="mx-auto max-w-7xl px-5">
          {/* 상단 2단 레이아웃 */}
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
            {/* 좌측: 타이틀 영역 */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
                Kondae W System
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl">
                프리미엄 서비스,
                <br />
                품격 있는 <span className="text-[#f7d680]">경험의 차이</span>
              </h2>
              <p className="mt-8 text-base leading-8 text-white/70 md:text-lg">
                건대 W는 고객 한 분 한 분의 시간을 소중히 생각합니다.
                <br />
                첫 방문부터 재방문까지, 변함없는 서비스와
                <br />
                세심한 배려로 특별하고 편안한 시간을 제공합니다.
              </p>
            </div>

            {/* 우측: 3열 이미지 카드 오버레이 */}
            <div className="relative overflow-hidden rounded-xl border border-[#f7d680]/20 min-h-[400px]">
              <Image
                src="/images/g_hopa (2).png"
                alt="건대W 프리미엄 서비스"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
              
              <div className="relative h-full grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#f7d680]/20">
                {[
                  {
                    num: "01",
                    title: "신뢰할 수 있는 시스템",
                    desc: "투명하고 정직한 운영으로\n신뢰를 최우선으로 합니다.",
                    icon: "🛡️"
                  },
                  {
                    num: "02",
                    title: "최상의 공간과 분위기",
                    desc: "세련된 인테리어와 조명,\n감각적인 분위기를 제공합니다.",
                    icon: "✨"
                  },
                  {
                    num: "03",
                    title: "맞춤형 서비스",
                    desc: "고객의 취향과 스타일에 맞춘\n세심한 맞춤 서비스를 제공합니다.",
                    icon: "👤"
                  }
                ].map((item) => (
                  <div key={item.num} className="flex flex-col p-5 sm:p-6 lg:p-8 hover:bg-white/[0.02] transition">
                    <div className="text-center">
                      <span className="block text-2xl font-black italic text-[#f7d680]">{item.num}</span>
                      <h3 className="mt-3 text-base font-bold text-[#f7d680] lg:text-lg break-keep">{item.title}</h3>
                      <p className="mt-4 text-[13px] leading-relaxed text-white/70 whitespace-pre-line break-keep lg:text-sm">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-auto pt-8 flex justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#f7d680]/30 text-xl text-[#f7d680]">
                        {item.icon}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 하단 3열 카드 */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promises.map((promise) => (
              <article
                key={promise.id}
                className="rounded-xl border border-white/10 bg-[#111015] p-8 transition-transform hover:-translate-y-1 hover:border-[#f7d680]/30"
              >
                <div className="flex items-center gap-5 border-b border-white/10 pb-6">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#f7d680]/30 bg-black text-2xl text-[#f7d680]">
                    {promise.icon}
                  </span>
                  <div>
                    <span className="block text-xl font-black italic text-[#f7d680]">
                      {promise.id}
                    </span>
                    <h3 className="mt-1 text-xl font-bold">{promise.title}</h3>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-relaxed text-white/70 whitespace-pre-line">
                  {promise.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="room"
        className="relative isolate border-b border-white/10 py-24 min-h-[600px] flex items-center"
      >
        <Image
          src="/images/g_hopa (3).png"
          alt="건대호빠 건대W VIP 룸"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.85)_0%,rgba(8,8,10,0.6)_50%,rgba(8,8,10,0.1)_100%)]" />
        <div className="relative mx-auto w-full max-w-7xl px-5">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
              VIP Room Mood
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl lg:text-6xl break-keep">
              최고의 시간을 위한 완벽한 공간,
              <br />
              <span className="text-[#f7d680]">건대호빠 건대W</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/80 break-keep">
              생일파티, 비즈니스 모임, 프라이빗한 만남까지 방문 목적에 맞춘
              최적의 VIP룸과 프리미엄 서비스를 제공합니다.
              <br className="hidden sm:block" />
              건대 최고 수준의 시설에서 잊지 못할 특별한 밤을 경험하세요.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-b border-white/10 bg-[#08080a] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
                Gallery
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl break-keep">
                건대 더블유의
                <br />
                특별한 <span className="text-[#f7d680]">분위기를 확인하세요</span>
              </h2>
            </div>
            <p className="text-lg leading-8 text-white/70 break-keep">
              건대W는 찾아주시는 모든 분들이 최고의 순간을 만끽하실 수 있도록
              고급스러운 인테리어와 세심한 소품 하나까지 정성껏 준비했습니다.
              프리미엄 공간에서 품격 있는 시간을 만들어보세요.
            </p>
          </div>
          <div className="mt-12 overflow-hidden rounded-xl border border-[#f7d680]/20">
            <Image
              src="/images/g_hopa (4).png"
              alt="건대호빠 건대W 갤러리 이미지"
              width={2400}
              height={1000}
              className="h-auto w-full opacity-90 transition hover:opacity-100"
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryCaptions.map((caption) => (
              <article
                key={caption}
                className="rounded-lg border border-[#f7d680]/10 bg-[#111015] p-5 text-center text-sm font-semibold text-[#f7d680]/90 transition hover:border-[#f7d680]/30"
              >
                {caption}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="relative isolate border-b border-white/10 py-24 min-h-[800px] flex items-center">
        {/* 전체 배경 이미지 */}
        <Image
          src="/images/guide-bg.png"
          alt="건대W 방문 가이드 배경"
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-black/60 to-[#08080a]" />

        <div className="relative mx-auto w-full max-w-7xl px-5">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
              Secret Guide
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl lg:text-6xl break-keep">
              <span className="text-[#f7d680]">건대W</span>만의 방문 가이드
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80 break-keep">
              언제 방문하면 좋은지, 어떤 스타일이 어울리는지, 어느 정도 예산을
              잡아야 할지 처음 방문하시는 분들을 위한 핵심적인 팁을 안내합니다.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            <article className="rounded-xl border border-[#f7d680]/20 bg-black/40 backdrop-blur-md p-8 transition hover:-translate-y-1 hover:border-[#f7d680]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7d680]/10 text-2xl text-[#f7d680]">
                  🕒
                </span>
                <h3 className="text-2xl font-black text-[#f7d680]">추천 시간대</h3>
              </div>
              <div className="grid gap-4">
                {timeTips.map((tip) => (
                  <div key={tip.label} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{tip.label}</p>
                      <p className="text-sm font-bold text-[#f7d680]">{tip.value}</p>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60 break-keep">{tip.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-xl border border-[#f7d680]/20 bg-black/40 backdrop-blur-md p-8 transition hover:-translate-y-1 hover:border-[#f7d680]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7d680]/10 text-2xl text-[#f7d680]">
                  👔
                </span>
                <h3 className="text-2xl font-black text-[#f7d680]">드레스코드</h3>
              </div>
              <ul className="space-y-4 text-[14px] leading-relaxed text-white/70">
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">깔끔한 셔츠, 니트, 재킷처럼 단정한 스타일을 추천합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">과한 액세서리보다 자연스러운 향과 깨끗한 인상이 좋습니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">단체 방문은 톤을 맞추면 테이블 분위기가 더 좋아집니다.</span>
                </li>
              </ul>
            </article>

            <article
              id="menu-price"
              className="scroll-mt-28 rounded-xl border border-[#f7d680]/20 bg-black/40 backdrop-blur-md p-8 transition hover:-translate-y-1 hover:border-[#f7d680]/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7d680]/10 text-2xl text-[#f7d680]">
                  📋
                </span>
                <h3 className="text-2xl font-black text-[#f7d680]">메뉴판 안내</h3>
              </div>
              <ul className="space-y-4 text-[14px] leading-relaxed text-white/70">
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">2~3명은 가볍게 시작할 수 있는 기본 구성이 좋습니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">4~6명은 테이블 흐름이 끊기지 않는 중간 구성을 추천합니다.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#f7d680] font-bold">✓</span>
                  <span className="break-keep">단체와 VIP 방문은 목적에 맞춰 별도 상담이 빠릅니다.</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="location" className="border-b border-white/10 bg-[#08080a] py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
              Location
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl">
              건대더블유 오시는길
            </h2>
            <address className="mt-6 not-italic text-lg leading-9 text-white/70">
              <strong className="block text-2xl font-black text-[#f7d680] mb-2">
                {businessName}
              </strong>
              주소: {fullAddress}
              <br />
              전화 예약: <a href={phoneHref} className="hover:text-[#f7d680] transition">{phoneDisplay}</a>
            </address>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#f7d680]/20 bg-[#111015] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <iframe
              title="건대더블유 구글 지도"
              src={mapEmbedSrc}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="flex flex-col gap-3 border-t border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold leading-6 text-white/70">
                {fullAddress}
              </p>
              <a
                href={mapDirectionsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-[#f7d680] px-4 py-2 text-sm font-black text-[#f7d680] hover:bg-[#f7d680] hover:text-[#08080a]"
              >
                구글 길찾기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#08080a] py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d680]/80">
              Reservation
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.3] md:text-5xl break-keep">
              건대 W 예약 문의는
              <br />
              <span className="text-[#f7d680]">전화 한 통으로 간편하게</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/70 break-keep">
              방문 날짜, 시간, 인원, 원하는 분위기를 알려주시면 건대 W에서 가장 편안하게 이용하실 수 있도록 안내해드립니다.
              <br className="hidden sm:block" />
              처음 방문하시는 분부터 단골 고객까지 예약부터 방문까지 친절하게 도와드립니다.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-xl bg-[#f7d680] px-8 py-4 text-lg font-black text-[#08080a] transition hover:bg-[#ffdf8a] hover:scale-105 shadow-[0_0_20px_rgba(247,214,128,0.2)]"
              >
                010-9561-7332 예약 문의
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-[#f7d680]/20 bg-[#111015] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-black text-[#f7d680] mb-6">자주 묻는 질문</h3>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-lg border border-[#f7d680]/10 bg-black/40 p-5 transition hover:border-[#f7d680]/30"
                >
                  <summary className="flex cursor-pointer items-center justify-between font-bold text-white group-open:text-[#f7d680] list-none">
                    {faq.q}
                    <span className="text-[#f7d680]/50 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/70 break-keep">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      </main>
  );
}
