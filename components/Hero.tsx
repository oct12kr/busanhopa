import Image from "next/image";
import { phoneDisplay, phoneHref } from "@/lib/constants";

function EmblemIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 96 80"
      className="h-[68px] w-[82px] text-[#d6bd88]"
      fill="none"
    >
      <path
        d="M20 54C23.8 31.2 36.2 18 48 18s24.2 13.2 28 36"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <path
        d="M28 58C32 39.5 40.5 28 48 28s16 11.5 20 30"
        stroke="rgba(255,255,255,0.78)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M48 56V23"
        stroke="rgba(255,255,255,0.64)"
        strokeWidth="0.85"
        strokeLinecap="round"
      />
      <path
        d="M49 42C60.5 32.2 71.6 32.9 80 39.4C69.6 44.2 58.8 47 49 42Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(214,189,136,0.16)"
      />
      <path
        d="M47 42C35.5 32.2 24.4 32.9 16 39.4C26.4 44.2 37.2 47 47 42Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(214,189,136,0.16)"
      />
      <path
        d="M34 64h28"
        stroke="rgba(255,255,255,0.78)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden border-b border-white/10 bg-[#070806] px-5 py-28 text-center"
    >
      <Image
        src="/images/000.png"
        alt="부산호빠 히어로 배경"
        title="부산호빠"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),rgba(5,6,4,0.2)_28%,rgba(5,6,4,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.68)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        <EmblemIcon />

        <h1
          id="hero-title"
          className="font-serif-kr mt-5 bg-[linear-gradient(135deg,#fff7e8_0%,#e8c888_38%,#c9a876_68%,#8f6f3f_100%)] bg-clip-text text-[48px] font-black leading-none tracking-[-0.025em] text-transparent drop-shadow-[0_18px_46px_rgba(0,0,0,0.46)] [-webkit-text-fill-color:transparent] sm:text-[64px] lg:text-[112px]"
        >
          부산호빠
        </h1>

        <p className="font-serif-kr mt-4 bg-[linear-gradient(135deg,#E8C888_0%,#C9A876_50%,#9C7B4A_100%)] bg-clip-text text-[22px] font-black tracking-[-0.02em] text-transparent drop-shadow-[0_2px_12px_rgba(201,168,118,0.42)] [-webkit-text-fill-color:transparent] md:text-[26px]">
          부산호빠 수빈실장
        </p>

        <div className="mt-5 text-[15px] leading-[1.7] text-white/88 md:text-base">
          <p>처음부터 끝까지, 부산호빠가 직접 도와드립니다.</p>
          <p>편안하고 즐거운 시간을 위한 최고의 선택.</p>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={phoneHref}
            className="inline-flex min-w-[168px] items-center justify-center bg-[#6b6b4f] px-10 py-4 text-[15px] font-semibold text-white transition hover:brightness-110"
          >
            예약 문의
          </a>
          <a
            href={phoneHref}
            className="inline-flex min-w-[168px] items-center justify-center border border-white px-10 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            {phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
