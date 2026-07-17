import Image from "next/image";
import {
  businessName,
  venueName,
  area,
  detailAddress,
  phoneDisplay,
  phoneHref,
  latitude,
  longitude,
  managerName,
  siteUrl,
  fullAddress,
  mapDirectionsHref
} from "@/lib/constants";
import Hero from "@/components/Hero";
import LocationMap from "@/components/LocationMap";

const imageAssets = {
  hero: "/images/000.png",
  info: "/images/222.png",
  busanIntro: "/images/333.png",
  service: "/images/222.png",
  vip: "/images/333.png",
  gallery: "/images/888.png",
  guide: "/images/888.png",
  reservation: "/images/555.png",
  location: "/images/666.png"
};

const archLayers = [
  { left: "-4%", bottom: "-18%", width: "18rem", height: "30rem", opacity: 0.22 },
  { left: "11%", bottom: "-10%", width: "21rem", height: "35rem", opacity: 0.28 },
  { left: "28%", bottom: "-16%", width: "19rem", height: "32rem", opacity: 0.2 },
  { left: "46%", bottom: "-8%", width: "23rem", height: "38rem", opacity: 0.26 },
  { left: "66%", bottom: "-14%", width: "20rem", height: "34rem", opacity: 0.22 },
  { left: "82%", bottom: "-12%", width: "24rem", height: "40rem", opacity: 0.24 }
];

const infoFeatures = [
  {
    icon: "calendar",
    title: "예약 필수",
    text: "원활한 안내와 최상의 서비스를 위해\n예약 후 방문 부탁드립니다."
  },
  {
    icon: "user",
    title: "1:1 맞춤 응대",
    text: "부산호빠 매니저가 처음부터 끝까지\n세심하게 케어합니다."
  },
  {
    icon: "shield",
    title: "프라이빗 공간",
    text: "고객님의 프라이버시를 최우선으로\n안전하고 편안한 공간을 제공합니다."
  },
  {
    icon: "clock",
    title: "편리한 일정",
    text: "방문 일정에 맞춘 안내로\n더욱 편안하게 이용하세요."
  }
];

const busanIntroFeatures = [
  {
    number: "01",
    title: "품격이 다른 공간",
    text: "화려함보다 품격을, 유행보다 진심을 담았습니다.\n고급스러운 인테리어와 프라이빗한 룸에서\n온전히 나만을 위한 시간을 누리실 수 있습니다."
  },
  {
    number: "02",
    title: "검증된 호스트, 진심 어린 응대",
    text: "부산호빠 운영팀이 직접 선별하고 관리하는 호스트들이\n처음부터 끝까지 세심하게 자리를 함께합니다.\n매뉴얼이 아닌 진심으로 고객님을 맞이합니다."
  },
  {
    number: "03",
    title: "부산 밤문화를 이끄는 자부심",
    text: "부산 중심지에서 오랜 시간 쌓아온 신뢰와 노하우로\n오늘도 최상의 서비스를 약속드립니다.\n한 번의 방문이 아닌, 오래도록 찾고 싶은 곳이 되겠습니다."
  }
];

const facilityItems = [
  {
    icon: "lounge",
    title: "프라이빗 룸",
    text: "독립된 프라이빗 룸에서\n오롯이 편안한 시간을\n보내실 수 있습니다."
  },
  {
    icon: "wine",
    title: "최고급 주류",
    text: "엄선된 위스키, 와인, 샴페인 등\n다양한 주류를\n준비하고 있습니다."
  },
  {
    icon: "speaker",
    title: "최신 음향 시스템",
    text: "최신 음향 시스템으로\n최상의 사운드와 분위기를\n경험하실 수 있습니다."
  },
  {
    icon: "sparkles",
    title: "청결한 환경",
    text: "항상 청결하고 쾌적한 환경을\n유지하여 안심하고 이용하실 수\n있도록 관리합니다."
  },
  {
    icon: "shield-lock",
    title: "안전 & 보안",
    text: "철저한 보안 시스템과\n프라이버시 보호로\n안전하게 모십니다."
  },
  {
    icon: "car",
    title: "편리한 접근성",
    text: "부산 중심지에 위치하여\n대중교통 및 자가용 이용이\n편리합니다."
  }
];

const reservationFeatures = [
  {
    icon: "calendar",
    title: "사전 예약 필수",
    text: "편안한 이용을 위해\n사전 예약은 필수입니다."
  },
  {
    icon: "user",
    title: "예약 확인",
    text: "예약 시 이용 날짜와 시간을\n정확히 안내해 주세요."
  },
  {
    icon: "clock",
    title: "시간 엄수",
    text: "예약 시간에 맞춰 방문해 주시면\n원활한 안내가 가능합니다."
  },
  {
    icon: "heart",
    title: "최상의 서비스",
    text: "부산호빠에서의 특별한 시간을\n최선을 다해 모시겠습니다."
  }
];

// TODO: 실제 도보 시간과 가장 가까운 출구/정류장 확인 필요.
const locationTransits = [
  {
    icon: "train",
    title: "지하철",
    text: "부산 2호선 해운대역 인근\nTODO: 실제 도보 시간 확인 필요"
  },
  {
    icon: "bus",
    title: "버스",
    text: "해운대역·해운대해수욕장 인근 정류장\nTODO: 실제 정류장 확인 필요"
  },
  {
    icon: "car",
    title: "자가용",
    text: "네비게이션 '부산호빠'\n또는 영무파라드 호텔 검색"
  },
  {
    icon: "parking",
    title: "주차 안내",
    text: "영무파라드 호텔 주차장\n이용 전 문의 권장"
  }
];

const reassuranceItems = [
  {
    title: "고객 만족도 최우선",
    text: "한 분 한 분 소중한 인연을\n최우선으로 생각합니다."
  },
  {
    title: "신뢰와 책임감",
    text: "언제나 신뢰를 바탕으로\n책임감 있게 응대합니다."
  },
  {
    title: "특별한 경험",
    text: "평범한 하루를 잊지 못할\n특별한 경험으로 만들어드립니다."
  }
];

const firstVisitCards = [
  {
    icon: "message",
    title: "편한 사전 상담",
    subtitle: "부담 없는 첫 문의",
    text: "전화나 카카오톡으로 편하게 문의 주시면, 처음이라 서툰 부분까지 차근차근 안내해드립니다. 궁금한 건 뭐든 물어보셔도 괜찮습니다."
  },
  {
    icon: "pin",
    title: "쉬운 위치 안내",
    subtitle: "헤매지 않도록 확실하게",
    text: "해운대 영무파라드 호텔 지하 2층, 찾기 쉬운 위치에 자리하고 있습니다. 방문 전 정확한 안내와 함께 도착까지 편하게 도와드립니다."
  },
  {
    icon: "shield",
    title: "투명한 비용 안내",
    subtitle: "예상치 못한 비용 없이",
    text: "예약 시 이용 시간과 인원에 따른 비용을 미리 명확하게 안내해드리며, 방문 후 놀라실 일이 없도록 투명하게 운영합니다."
  }
];

const faqs = [
  {
    q: "부산호빠 룸 예약 및 상담은 어떻게 진행되나요?",
    a: `담당 ${managerName}에게 직통 번호로 연락 주시면, 방문 시간과 인원에 맞춰 가능한 룸과 이용 흐름을 안내해드립니다.`
  },
  {
    q: "처음 방문해도 시스템 안내를 받을 수 있나요?",
    a: "첫 방문 고객님께는 이용 방식, 주류 구성, 방문 팁을 차근차근 안내해드리며 편안하게 즐기실 수 있도록 도와드립니다."
  },
  {
    q: "1인 방문이나 단체 회식도 가능한가요?",
    a: "1인 방문부터 생일파티, 회식, 프라이빗 모임까지 목적과 인원에 맞춰 좌석과 분위기를 조율해드립니다."
  },
  {
    q: "당일 예약도 가능한가요?",
    a: "당일 상담도 가능합니다. 다만 예약 상황에 따라 안내 가능한 룸이 달라질 수 있어 방문 전 연락을 권장드립니다."
  },
  {
    q: "부산 어느 지역에서 방문하기 좋은가요?",
    a: "해운대를 중심으로 광안리, 센텀시티, 남포동, 동래 등 부산 주요 지역에서 이동하기 편한 동선을 기준으로 안내해드립니다."
  }
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "NightClub"],
  "@id": `${siteUrl}/#localbusiness`,
  name: businessName,
  alternateName: ["부산호빠", "부산 호빠", "해운대호빠", "부산 프리미엄 라운지"],
  description: `${fullAddress} ${businessName} 예약 상담. ${managerName} 상담, 가격 안내, 방문 케어, 부산 프리미엄 라운지 가이드.`,
  url: siteUrl,
  image: [
    `${siteUrl}${imageAssets.hero}`,
    `${siteUrl}${imageAssets.service}`,
    `${siteUrl}${imageAssets.vip}`
  ],
  telephone: phoneDisplay,
  priceRange: "상담 후 안내",
  areaServed: ["부산광역시", "해운대구", "해운대", "중동", "광안리", "센텀시티"],
  address: {
    "@type": "PostalAddress",
    streetAddress: detailAddress,
    addressLocality: area,
    addressRegion: "부산광역시",
    addressCountry: "KR"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude,
    longitude
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneDisplay,
    contactType: "reservations",
    availableLanguage: ["ko-KR", "Korean"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: businessName,
  url: siteUrl,
  logo: `${siteUrl}/busanhostbar-icon.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: phoneDisplay,
    contactType: "customer service",
    areaServed: "KR-26",
    availableLanguage: ["ko-KR", "Korean"]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: businessName,
  url: siteUrl,
  inLanguage: "ko-KR",
  publisher: {
    "@id": `${siteUrl}/#organization`
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/blog?keyword={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: `${businessName} | ${phoneDisplay} ${managerName}`,
  description: `${businessName} 예약 상담, 부산 해운대 프라이빗 라운지와 VIP룸 이용 안내.`,
  isPartOf: {
    "@id": `${siteUrl}/#website`
  },
  about: {
    "@id": `${siteUrl}/#localbusiness`
  },
  inLanguage: "ko-KR"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: businessName,
      item: siteUrl
    }
  ]
};

const imageSchemas = [
  {
    name: "부산호빠 라운지 대표 이미지",
    contentUrl: `${siteUrl}${imageAssets.hero}`,
    caption: "부산호빠 히어로 라운지"
  },
  {
    name: "부산호빠 서비스 공간",
    contentUrl: `${siteUrl}${imageAssets.service}`,
    caption: "부산 프라이빗 라운지 상담 공간"
  },
  {
    name: "부산호빠 VIP룸",
    contentUrl: `${siteUrl}${imageAssets.vip}`,
    caption: "부산호빠 VIP룸과 우드 아치 공간감"
  },
  {
    name: "부산호빠 갤러리",
    contentUrl: `${siteUrl}${imageAssets.gallery}`,
    caption: "부산호빠 라운지 좌석과 조명"
  }
].map((image) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  ...image
}));

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

function WoodArchField({ soft = false }: { soft?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_118px,rgba(217,196,154,0.08)_119px,transparent_121px)]" />
      {archLayers.map((arch, index) => (
        <span
          key={`${arch.left}-${index}`}
          className="wood-arch-frame"
          style={{
            left: arch.left,
            bottom: arch.bottom,
            width: arch.width,
            height: arch.height,
            opacity: soft ? arch.opacity * 0.55 : arch.opacity
          }}
        />
      ))}
    </div>
  );
}

function InfoLineIcon({
  name,
  className = "h-9 w-9"
}: {
  name: string;
  className?: string;
}) {
  if (name === "calendar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <rect x="10" y="12" width="28" height="27" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M10 20h28M17 8v8M31 8v8M20 29l3 3 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="24" cy="17" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M11 39c2.8-8 7.4-12 13-12s10.2 4 13 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M24 7 38 13v10.5C38 32.5 32.2 38.1 24 42 15.8 38.1 10 32.5 10 23.5V13l14-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m18 24 4 4 8-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="m24 8 4.8 10.3 11.2 1.5-8.2 7.8 2 11-9.8-5.3-9.8 5.3 2-11L8 19.8l11.2-1.5L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "lounge") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M10 25c0-3 2.4-5.5 5.5-5.5S21 22 21 25v5h6v-5c0-3 2.4-5.5 5.5-5.5S38 22 38 25v11H10V25Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 36v5M34 36v5M21 30h6M37 15h6l-3-8-3 8ZM40 15v26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "wine") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M12 41h14M19 11v30M15 11h8l2 18c.4 4-2.6 7-6 7s-6.4-3-6-7l2-18Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M31 14h8v9c0 4-1.8 7-4 7s-4-3-4-7v-9ZM35 30v11M31 41h8M31 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "speaker") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <rect x="9" y="14" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="21" cy="26" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="21" cy="26" r="2" fill="currentColor" />
        <path d="M38 11v15M38 11l6 3M38 18l6 3M38 26l-3 4M41 29l-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "sparkles") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M24 8 27 18l9 3-9 3-3 10-3-10-9-3 9-3 3-10ZM12 31l1.8 5.2L19 38l-5.2 1.8L12 45l-1.8-5.2L5 38l5.2-1.8L12 31ZM37 28l1.5 4.5L43 34l-4.5 1.5L37 40l-1.5-4.5L31 34l4.5-1.5L37 28Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "shield-lock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M24 7 38 13v10.5C38 32.5 32.2 38.1 24 42 15.8 38.1 10 32.5 10 23.5V13l14-6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="18" y="23" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M21 23v-3a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "car") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M10 29h28l-3.3-10.2A4 4 0 0 0 30.9 16H17.1a4 4 0 0 0-3.8 2.8L10 29ZM8 29v8h32v-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M14 37v3M34 37v3M14 29l-5-4M34 29l5-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="33" r="2.2" fill="currentColor" />
        <circle cx="32" cy="33" r="2.2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "pin") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M24 42s14-13.2 14-24A14 14 0 0 0 10 18c0 10.8 14 24 14 24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="24" cy="18" r="5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (name === "train") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <rect x="12" y="7" width="24" height="27" rx="5" stroke="currentColor" strokeWidth="2" />
        <path d="M17 15h14M16 23h16M18 41l4-7M30 34l4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19" cy="29" r="2" fill="currentColor" />
        <circle cx="29" cy="29" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "bus") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <rect x="10" y="10" width="28" height="25" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M15 17h18M10 24h28M15 35v5M33 35v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="30" r="2" fill="currentColor" />
        <circle cx="31" cy="30" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "parking") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" />
        <path d="M18 35V13h8.5c4.2 0 7.5 3 7.5 7s-3.3 7-7.5 7H18" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "info") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" />
        <path d="M24 21v12M24 15h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2" />
        <path d="M24 14v11l7 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "heart") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M24 39S10 31.2 10 19.4C10 14.2 13.5 11 18 11c2.8 0 4.8 1.4 6 3.3C25.2 12.4 27.2 11 30 11c4.5 0 8 3.2 8 8.4C38 31.2 24 39 24 39Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M15 31v-9a9 9 0 0 1 18 0v9l4 5H11l4-5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M21 39a3.4 3.4 0 0 0 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M16 10 22 21l-4 4c2.5 4.8 5.2 7.5 10 10l4-4 11 6-2 6c-18.2-1-34-16.8-35-35l6-2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "message") {
    return (
      <svg aria-hidden="true" viewBox="0 0 48 48" className={className} fill="none">
        <path d="M9 15c0-3.3 2.7-6 6-6h18c3.3 0 6 2.7 6 6v11c0 3.3-2.7 6-6 6H22l-9 7v-7c-2.3-.7-4-3-4-6V15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 20h14M17 26h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.7" />
      <path d="m10.5 16.5 3.8 3.8 7.8-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeafLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 260"
      className={className}
      fill="none"
    >
      <path d="M36 238C88 176 121 106 132 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M132 28C157 42 166 69 156 98C133 83 126 58 132 28Z" stroke="currentColor" strokeWidth="2" />
      <path d="M112 88C82 91 60 108 48 138C80 138 104 119 112 88Z" stroke="currentColor" strokeWidth="2" />
      <path d="M142 94C174 99 196 121 204 154C169 149 147 129 142 94Z" stroke="currentColor" strokeWidth="2" />
      <path d="M86 150C56 154 34 173 20 204C53 204 78 184 86 150Z" stroke="currentColor" strokeWidth="2" />
      <path d="M126 152C160 158 184 181 194 216C158 211 133 190 126 152Z" stroke="currentColor" strokeWidth="2" />
      <path d="M130 45c9 17 17 33 24 49M70 125c16 1 29-2 42-10M160 129c14 10 27 17 41 21M47 190c14-1 27-5 39-13M151 188c14 9 28 16 42 21" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

function LeafSprigIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 28" className={className} fill="none">
      <path d="M8 22c15-2 28-8 42-19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M29 12C25 6 18 5 13 8c4.2 5.3 10.2 6.7 16 4ZM39 8c1.7-6 7.7-8 13-6-1 6.2-6.4 9.6-13 6ZM24 17c-5.8-2.4-11.3-.5-15 4.2 5.7 2.8 11.7 1.4 15-4.2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-transparent text-[#f7efe2]">
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      {imageSchemas.map((schema) => (
        <JsonLd key={schema.contentUrl} data={schema} />
      ))}

      <Hero />

      <section
        id="system"
        className="relative isolate border-b border-[#d7cbb7] bg-[#f3ede3] py-16 text-[#2a2a24] md:py-20 lg:h-[800px] lg:py-6"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(255,255,255,0.62),transparent_34%),radial-gradient(circle_at_76%_20%,rgba(125,122,84,0.08),transparent_28%),linear-gradient(180deg,#f6f0e6_0%,#efe8da_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.26] bg-[repeating-linear-gradient(0deg,transparent_0,transparent_21px,rgba(125,122,84,0.06)_22px,transparent_23px)]"
        />
        <LeafLineArt className="pointer-events-none absolute right-[-28px] top-8 hidden h-[280px] w-[260px] text-[#8c8354]/18 md:block xl:right-10" />

        <div className="relative mx-auto max-w-[1720px] px-5 sm:px-8 lg:h-full lg:px-10">
          <div className="grid gap-10 lg:h-full lg:grid-cols-[minmax(360px,0.4fr)_minmax(0,0.6fr)] lg:items-stretch xl:gap-12">
            <div className="relative mx-auto w-full max-w-[580px] lg:mx-0 lg:h-full lg:max-w-none">
              <div className="relative min-h-[520px] overflow-hidden rounded-t-[180px] bg-[#d9cbb7] shadow-[0_34px_90px_rgba(75,58,34,0.16)] md:min-h-[620px] lg:h-full lg:min-h-0 lg:rounded-t-[120px]">
                <Image
                  src={imageAssets.info}
                  alt="아치형 복도와 프라이빗 라운지 이미지"
                  title="부산호빠 이용안내 이미지"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-left"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(55,42,24,0.02)_0%,rgba(55,42,24,0.08)_62%,rgba(42,42,36,0.18)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 bg-[#7d7a54]/96 p-6 text-white sm:p-7 lg:p-5">
                  <div className="border border-white/32 px-6 py-6 sm:px-8 sm:py-7 lg:px-5 lg:py-5">
                    <p className="font-serif-kr break-keep text-[22px] font-medium leading-[1.65] tracking-[0.02em] text-white sm:text-[24px] lg:text-[15px] lg:leading-[1.55]">
                      편안함, 프라이빗함, 그리고
                      <br />
                      최상의 서비스를 약속드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative pt-2 lg:flex lg:h-full lg:flex-col lg:justify-between lg:pt-0">
              <div className="mx-auto max-w-[1060px] text-center">
                <div className="mx-auto h-px max-w-[520px] bg-[#8c8354]/36" />

                <h2 className="font-serif-kr mt-5 text-[44px] font-semibold leading-none tracking-[0.08em] text-[#2a2a24] sm:text-[54px] md:text-[64px] lg:mt-4 lg:text-[48px]">
                  이용안내
                </h2>
                <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.34em] text-[#8c8354] md:text-[14px] lg:mt-4 lg:text-[12px]">
                  · INFORMATION ·
                </p>
                <p className="mx-auto mt-6 max-w-[780px] break-keep text-[15px] leading-[1.75] text-[#5f5c52] md:text-base lg:mt-4 lg:text-[14px] lg:leading-[1.55]">
                  부산호빠는 처음 방문하시는 분들도 편안하고 즐거운 시간을 보내실 수 있도록
                  <br className="hidden sm:block" />
                  처음부터 끝까지 세심하게 도와드립니다.
                </p>
              </div>

              <div className="mt-6 h-px w-full bg-[#8c8354]/20 lg:mt-4" />

              <div className="mt-5 grid grid-cols-2 overflow-hidden lg:mt-4 lg:h-[190px] lg:grid-cols-4">
                {infoFeatures.map((feature, index) => (
                  <article
                    key={feature.title}
                    className={`min-h-[220px] border-[#8c8354]/18 px-4 py-6 text-center md:px-6 lg:h-[190px] lg:min-h-0 lg:border-l lg:px-4 lg:py-4 ${
                      index % 2 === 1 ? "border-l" : ""
                    } ${index === 0 ? "lg:border-l-0" : ""}`}
                  >
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8c8354] text-white shadow-[0_16px_36px_rgba(92,86,52,0.18)] lg:h-12 lg:w-12">
                      <InfoLineIcon name={feature.icon} className="h-9 w-9 lg:h-7 lg:w-7" />
                    </span>
                    <h3 className="font-serif-kr mt-6 break-keep text-[18px] font-semibold text-[#2a2a24] md:text-[19px] lg:mt-4 lg:text-[16px]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 whitespace-pre-line break-keep text-[13px] leading-[1.65] text-[#6b6b60] md:text-[14px] lg:mt-2 lg:text-[12px] lg:leading-[1.45]">
                      {feature.text}
                    </p>
                  </article>
                ))}
              </div>

              <div className="relative mt-6 rounded-[22px] bg-[linear-gradient(135deg,#85815a_0%,#706d48_50%,#64613e_100%)] px-6 py-7 text-center text-white shadow-[0_34px_80px_rgba(85,79,48,0.18)] sm:px-10 md:py-8 lg:-ml-20 lg:mt-4 lg:min-h-[260px] lg:rounded-[18px] lg:px-6 lg:py-5 xl:-ml-28">
                <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/10 lg:rounded-[18px]" />
                <h3 className="font-serif-kr break-keep text-[22px] font-semibold leading-tight md:text-[26px] lg:text-[20px]">
                  처음 방문하셔도 걱정하지 마세요.
                </h3>
                <p className="mx-auto mt-4 max-w-[720px] break-keep text-[14px] leading-[1.7] text-white/88 md:text-[15px] lg:mt-2 lg:text-[13px] lg:leading-[1.55]">
                  부산호빠 매니저가 친절하고 상세하게 안내해드리며, 최고의 시간을 선사해드립니다.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-3 md:divide-x md:divide-white/18 lg:mt-4 lg:gap-3">
                  {reassuranceItems.map((item) => (
                    <article key={item.title} className="px-2 md:px-7 lg:px-4">
                      <span className="mx-auto flex h-7 w-7 items-center justify-center text-white/92 lg:h-6 lg:w-6">
                        <InfoLineIcon name="check" className="h-7 w-7 lg:h-6 lg:w-6" />
                      </span>
                      <h4 className="mt-3 break-keep text-[16px] font-bold text-white lg:mt-2 lg:text-[14px]">
                        {item.title}
                      </h4>
                      <p className="mt-2 whitespace-pre-line break-keep text-[13px] leading-[1.65] text-white/78 lg:mt-1.5 lg:text-[12px] lg:leading-[1.45]">
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="room"
        className="relative isolate overflow-hidden border-b border-[#e1cfad] bg-[#f5ead6] py-24 text-[#3a2e1e] md:py-32 lg:py-36"
      >
        <Image
          src={imageAssets.busanIntro}
          alt="골드 샴페인 톤의 부산호빠 프리미엄 라운지"
          title="부산호빠 소개 배경"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,240,220,0.72)_0%,rgba(250,240,220,0.44)_42%,rgba(255,255,255,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_48%,rgba(255,255,255,0.28)_0%,transparent_30%),radial-gradient(circle_at_76%_28%,rgba(184,153,106,0.14)_0%,transparent_36%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-16 lg:px-10">
          <div className="max-w-[540px]">
            <h2 className="font-serif-kr bg-[linear-gradient(135deg,#8c6d3f_0%,#5a4a2e_68%)] bg-clip-text text-[56px] font-bold leading-[1.08] tracking-[0.05em] text-transparent sm:text-[72px] lg:text-[86px]">
              부산호빠
            </h2>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.34em] text-[#b8996a] sm:text-[13px]">
              BUSAN HOST BAR
            </p>
            <div className="mt-7 flex max-w-[220px] items-center gap-4 text-[#a8895c]">
              <span className="h-px flex-1 bg-current/58" />
              <span className="text-[10px] leading-none">◆</span>
              <LeafSprigIcon className="h-5 w-11" />
            </div>
          </div>

          <div className="relative lg:pl-12">
            <span className="absolute left-0 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent_0%,rgba(168,137,92,0.78)_18%,rgba(168,137,92,0.24)_78%,transparent_100%)] lg:block" />
            <p className="font-serif-kr max-w-[900px] break-keep text-[19px] font-medium leading-[1.8] text-[#3a2e1e] sm:text-[21px]">
              부산의 밤을 가장 우아하게 채우는 공간, 부산호빠입니다.
              <br className="hidden md:block" />
              부산호빠와 함께라면 처음 방문하시는 분도 마음 편히, 특별한 하루를 만들어가실 수 있습니다.
            </p>

            <div className="mt-10 divide-y divide-[#a8895c]/30">
              {busanIntroFeatures.map((feature) => (
                <article key={feature.number} className="grid gap-4 py-8 first:pt-0 last:pb-0 sm:grid-cols-[84px_minmax(0,1fr)]">
                  <span className="font-serif-kr text-[28px] font-semibold leading-none tracking-[0.08em] text-[#a8895c]/90 sm:text-[36px]">
                    {feature.number}
                  </span>
                  <div>
                    <h3 className="font-serif-kr break-keep text-[20px] font-bold leading-snug text-[#3a2e1e]">
                      {feature.title}
                    </h3>
                    <p className="mt-4 whitespace-pre-line break-keep text-[15px] leading-[1.8] text-[#4a4238] sm:text-[16px]">
                      {feature.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="gallery"
        className="relative isolate overflow-hidden border-b border-[#ded2bf] bg-[#f7f3ea] py-20 text-[#2a2a24] md:py-24 lg:h-[650px] lg:py-7"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.86),transparent_38%),radial-gradient(circle_at_8%_78%,rgba(140,131,84,0.07),transparent_30%),radial-gradient(circle_at_92%_70%,rgba(140,131,84,0.06),transparent_34%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.18] bg-[repeating-linear-gradient(0deg,transparent_0,transparent_23px,rgba(140,131,84,0.055)_24px,transparent_25px)]"
        />

        <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="mx-auto h-px max-w-[680px] bg-[#8c8354]/36" />

            <h2 className="font-serif-kr mt-7 text-[44px] font-semibold leading-none tracking-[0.08em] text-[#2a2a24] sm:text-[56px] md:text-[68px] lg:mt-5 lg:text-[54px]">
              시설안내
            </h2>
            <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.36em] text-[#8c8354] md:text-[14px] lg:mt-4">
              · FACILITY GUIDE ·
            </p>
            <div className="mx-auto mt-5 flex max-w-[190px] items-center justify-center gap-4 text-[#8c8354]/62 lg:mt-3">
              <span className="h-px flex-1 bg-current" />
              <LeafSprigIcon className="h-6 w-12" />
              <span className="h-px flex-1 bg-current" />
            </div>
            <p className="mx-auto mt-7 max-w-[720px] break-keep text-[15px] leading-[1.85] text-[#5f5c52] md:text-base lg:mt-4 lg:text-[14px] lg:leading-[1.6]">
              부산호빠는 프라이빗하고 고급스러운 공간에서
              <br className="hidden sm:block" />
              고객님 한 분 한 분께 최상의 서비스를 제공하기 위해
              <br className="hidden sm:block" />
              세심한 부분까지 신경 쓰고 있습니다.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-[720px] rounded-[22px] bg-[#efe8da]/86 px-6 py-8 text-center shadow-[0_24px_66px_rgba(91,76,48,0.08)] ring-1 ring-[#8c8354]/8 sm:px-12 md:px-16 lg:mt-5 lg:max-w-[680px] lg:px-10 lg:py-5">
            <p className="font-serif-kr break-keep text-[22px] font-semibold leading-[1.55] text-[#2a2a24] md:text-[25px] lg:text-[21px] lg:leading-[1.35]">
              편안함, 프라이빗함, 그리고 품격 있는 공간
            </p>
            <p className="font-serif-kr mt-2 break-keep text-[18px] font-normal leading-[1.6] text-[#4e4a3f] md:text-[20px] lg:text-[17px]">
              부산호빠에서 직접 경험해보세요.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:mt-6 xl:grid-cols-6 xl:gap-4">
            {facilityItems.map((item) => (
              <article
                key={item.title}
                className="group flex min-h-[290px] flex-col items-center rounded-[16px] border border-[#d8cbb7] bg-white/42 px-4 py-7 text-center shadow-[0_18px_48px_rgba(75,58,34,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#8c8354]/72 hover:bg-white/62 hover:shadow-[0_26px_58px_rgba(75,58,34,0.13)] sm:px-5 md:min-h-[310px] lg:min-h-[215px] lg:px-3 lg:py-5"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#8c8354] text-white shadow-[0_18px_42px_rgba(92,86,52,0.2)] transition duration-300 group-hover:bg-[#7d7a54] lg:h-14 lg:w-14">
                  <InfoLineIcon name={item.icon} className="h-11 w-11 lg:h-8 lg:w-8" />
                </span>
                <h3 className="font-serif-kr mt-6 break-keep text-[18px] font-semibold leading-tight text-[#2a2a24] lg:mt-4 lg:text-[16px]">
                  {item.title}
                </h3>
                <span className="mt-5 h-px w-7 bg-[#8c8354]/56 lg:mt-3" />
                <p className="mt-5 whitespace-pre-line break-keep text-[13px] leading-[1.75] text-[#6b6b60] lg:mt-3 lg:text-[11px] lg:leading-[1.5]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[880px] border-t border-[#8c8354]/26 pt-5 lg:mt-6 lg:pt-4">
            <div className="flex flex-col items-center justify-center gap-3 text-center text-[#6b6b60] sm:flex-row sm:gap-6 lg:gap-4">
              <div className="flex items-center gap-3 text-[#8c8354]">
                <LeafSprigIcon className="h-6 w-12 lg:h-5 lg:w-10" />
                <span className="font-serif-kr text-[13px] font-medium uppercase tracking-[0.28em] lg:text-[11px]">
                  부산호빠 BUSAN HOST BAR
                </span>
              </div>
              <span className="hidden h-4 w-px bg-[#8c8354]/38 sm:block" />
              <span className="block h-px w-12 bg-[#8c8354]/30 sm:hidden" />
              <p className="break-keep text-[14px] leading-relaxed lg:text-[13px]">
                최상의 공간에서 특별한 시간을 선사합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="guide" className="relative isolate flex min-h-[820px] items-center border-b border-[#d9c49a]/12 py-24">
        <Image
          src={imageAssets.guide}
          alt="부산호빠 방문 가이드 배경"
          title="부산호빠 방문 가이드"
          fill
          sizes="100vw"
          className="object-cover opacity-[0.34] sepia-[0.18] saturate-[0.72]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#151812] via-[#151812]/78 to-[#151812]" />
        <WoodArchField />

        <div className="relative mx-auto w-full max-w-7xl px-5">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#aeb995]">
              Busan Guide
            </p>
            <h2 className="mt-4 break-keep text-4xl font-black leading-[1.3] md:text-5xl lg:text-6xl">
              <span className="text-[#d9c49a]">{businessName}</span> 처음이라면
            </h2>
            <p className="mx-auto mt-6 max-w-2xl break-keep text-lg leading-8 text-[#f7efe2]/80">
              처음 방문하시는 분들이 가장 궁금해하시는 것들,
              <br className="hidden sm:block" />
              예약부터 도착, 첫 안내까지의 흐름을 미리 정리해드립니다.
              <br className="hidden sm:block" />
              망설이지 않으셔도 되도록 최대한 편하게 알려드릴게요.
            </p>
            <p className="font-serif-kr mx-auto mt-5 max-w-xl break-keep text-[20px] font-semibold italic leading-relaxed text-[#d9c49a]">
              낯선 첫걸음이, 편안한 시간이 되도록.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {firstVisitCards.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-[#d9c49a]/20 bg-[#202519]/72 p-8 shadow-[0_28px_80px_rgba(0,0,0,0.26)] backdrop-blur-md transition hover:-translate-y-1 hover:border-[#aeb995]/50"
              >
                <div className="mb-6 flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d9c49a]/10 text-[#d9c49a]">
                    <InfoLineIcon name={card.icon} className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-[#d9c49a]">{card.title}</h3>
                    <p className="mt-1 text-sm font-bold text-[#aeb995]">{card.subtitle}</p>
                  </div>
                </div>
                <p className="break-keep text-[14px] leading-[1.8] text-[#f7efe2]/70">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative isolate overflow-hidden border-b border-white/10 bg-[#11120d] px-5 py-24 text-white md:py-32 lg:py-36"
      >
        <Image
          src={imageAssets.reservation}
          alt="부산호빠 예약안내 배경"
          title="부산호빠 예약안내"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.12)_34%,rgba(0,0,0,0.46)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.38)_0%,rgba(0,0,0,0.18)_46%,rgba(0,0,0,0.48)_100%)]" />

        <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <p className="font-display text-[20px] font-medium uppercase leading-none tracking-[0.28em] text-[#f5f0e4]">
              부산호빠
            </p>
            <p className="mt-2 text-[10px] font-light uppercase leading-none tracking-[0.42em] text-white/70">
              BUSAN HOST BAR
            </p>
            <div className="mt-7 flex w-44 items-center justify-center gap-4 text-[#c9a876]">
              <span className="h-px flex-1 bg-current/60" />
              <span className="text-[10px] leading-none">◆</span>
              <span className="h-px flex-1 bg-current/60" />
            </div>
          </div>

          <h2 className="font-serif-kr mt-9 break-keep text-[46px] font-semibold leading-none tracking-[0.07em] text-[#f5f0e4] drop-shadow-[0_16px_34px_rgba(0,0,0,0.35)] sm:text-[58px] md:text-[66px]">
            예약안내
          </h2>
          <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.34em] text-[#c9a876] md:text-[14px]">
            · RESERVATION GUIDE ·
          </p>
          <div className="mx-auto mt-5 flex max-w-[190px] items-center justify-center gap-4 text-[#c9a876]/80">
            <span className="h-px flex-1 bg-current" />
            <LeafSprigIcon className="h-6 w-12" />
            <span className="h-px flex-1 bg-current" />
          </div>
          <p className="mx-auto mt-7 max-w-[660px] break-keep text-[15px] leading-[1.8] text-white/90 md:text-base">
            부산호빠는 100% 예약제로 운영됩니다.
            <br className="hidden sm:block" />
            원활하고 편안한 이용을 위해 사전 예약을 부탁드립니다.
          </p>

          <a
            href={phoneHref}
            className="group mt-10 inline-flex flex-col items-center justify-center rounded-full bg-[#7d7a54] px-8 py-5 text-white shadow-[0_28px_72px_rgba(0,0,0,0.25)] transition duration-300 hover:scale-[1.02] hover:brightness-110 sm:px-12 md:px-14"
          >
            <span className="flex items-center justify-center gap-4">
              <InfoLineIcon name="phone" className="h-7 w-7 md:h-8 md:w-8" />
              <span className="font-display text-[24px] font-semibold leading-none tracking-[0.04em] md:text-[36px]">
                {phoneDisplay}
              </span>
            </span>
            <span className="mt-3 text-[12px] font-medium tracking-[0.08em] text-white/80 md:text-[13px]">
              전화 예약 및 문의 | 오후 7시 ~ 새벽 5시
            </span>
          </a>

          <div className="mt-10 w-full overflow-hidden rounded-[18px] border border-white/20 bg-white/[0.10] px-3 py-5 shadow-[0_28px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl md:px-5">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {reservationFeatures.map((feature, index) => (
                <article
                  key={feature.title}
                  className={`group rounded-xl border-white/18 px-3 py-5 text-center transition hover:bg-white/[0.08] md:px-6 ${
                    index % 2 === 1 ? "border-l" : ""
                  } ${index > 0 ? "lg:border-l" : "lg:border-l-0"}`}
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#8c8354] text-white shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition group-hover:bg-[#9a9060]">
                    <InfoLineIcon name={feature.icon} className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 break-keep text-[16px] font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 whitespace-pre-line break-keep text-[13px] leading-[1.6] text-white/75">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 text-[#f5f0e4]/88 sm:flex-row">
            <span className="h-px w-16 bg-[#c9a876]/58" />
            <p className="font-serif-kr break-keep text-[17px] italic leading-relaxed md:text-[19px]">
              소중한 시간을 더욱 특별하게, 부산호빠가 함께하겠습니다.
            </p>
            <span className="h-px w-16 bg-[#c9a876]/58" />
          </div>
        </div>
      </section>

      <section
        id="location"
        className="relative isolate overflow-hidden border-b border-[#d7cbb7] bg-[#f3ede3] text-[#2a2a24] lg:h-[500px]"
      >
        <Image
          src={imageAssets.location}
          alt="부산 부산호빠 오시는 길 배경"
          title="부산호빠 오시는 길 배경"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/15" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,234,0.9)_0%,rgba(247,243,234,0.76)_45%,rgba(247,243,234,0.34)_72%,rgba(42,42,36,0.22)_100%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1720px] gap-7 px-5 py-14 sm:px-8 md:py-16 lg:h-full lg:grid-cols-[0.45fr_0.55fr] lg:items-center lg:px-10 lg:py-6">
          <div className="max-w-[690px]">
            <div className="flex items-center gap-3 text-[#8c8354]">
              <span className="text-[11px] leading-none">◆</span>
              <p className="text-[12px] font-semibold uppercase tracking-[0.34em] md:text-[14px]">
                · LOCATION ·
              </p>
            </div>

            <h2 className="font-serif-kr mt-3 text-[42px] font-semibold leading-none tracking-[0.05em] text-[#2a2a24] sm:text-[52px] md:text-[60px]">
              오시는 길
            </h2>
            <div className="mt-4 flex w-44 items-center gap-3 text-[#8c8354]">
              <span className="h-px flex-1 bg-current/45" />
              <LeafSprigIcon className="h-5 w-12" />
              <span className="h-px flex-1 bg-current/45" />
            </div>
            <p className="mt-4 max-w-[560px] break-keep text-[15px] leading-[1.65] text-[#5f5c52] md:text-base">
              부산호빠는 해운대 영무파라드 호텔에 위치하여 대중교통 및 자가용 이용이 편리합니다.
            </p>

            <address className="mt-5 flex flex-col gap-4 rounded-xl bg-[#efe8da]/92 p-4 not-italic shadow-[0_16px_42px_rgba(93,78,54,0.12)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#8c8354] text-white">
                  <InfoLineIcon name="pin" className="h-7 w-7" />
                </span>
                <div>
                  <p className="break-keep text-[15px] font-semibold leading-[1.5] text-[#2a2a24] md:text-[16px]">
                    {fullAddress}
                  </p>
                  <p className="mt-1 text-[13px] text-[#6b6b60]">{venueName}</p>
                </div>
              </div>
              <a
                href={mapDirectionsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#8c8354]/45 px-4 py-2 text-[12px] font-semibold text-[#6b6845] transition hover:bg-[#8c8354] hover:text-white"
              >
                길찾기
              </a>
            </address>

            <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-[14px] border border-[#8c8354]/18 bg-[#f7f3ea]/84 shadow-[0_16px_40px_rgba(93,78,54,0.08)] backdrop-blur lg:grid-cols-4">
              {locationTransits.map((item, index) => (
                <article
                  key={item.title}
                  className={`border-[#8c8354]/18 px-3 py-4 text-center ${
                    index % 2 === 1 ? "border-l" : ""
                  } ${index > 1 ? "border-t lg:border-t-0" : ""} ${index > 0 ? "lg:border-l" : ""}`}
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#8c8354] text-white">
                    <InfoLineIcon name={item.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="font-serif-kr mt-3 break-keep text-[15px] font-semibold text-[#2a2a24]">
                    {item.title}
                  </h3>
                  <p className="mt-2 whitespace-pre-line break-keep text-[12px] leading-[1.45] text-[#6b6b60]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#f3ede3]/90 p-4 text-[#5f5c52] shadow-[0_12px_34px_rgba(93,78,54,0.08)] backdrop-blur">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#8c8354]/40 text-[#8c8354]">
                <InfoLineIcon name="info" className="h-5 w-5" />
              </span>
              <p className="break-keep text-[13px] leading-[1.65]">
                찾아오시는 길이 어려우시다면 언제든지 연락 주세요. 친절하게 안내해 드리겠습니다.
              </p>
            </div>
          </div>

          <div className="relative h-[320px] overflow-hidden rounded-[20px] border border-white/50 bg-[#efe8da] shadow-[0_30px_90px_rgba(42,42,36,0.22)] lg:h-[430px]">
            <LocationMap />
          </div>
        </div>
      </section>
    </main>
  );
}
