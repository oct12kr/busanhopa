import React from "react";
import Link from "next/link";
import { phoneDisplay, phoneHref, kakaoOpenChatHref } from "@/lib/constants";
import { PhoneIcon, ChatIcon, MenuIcon } from "./Icons";

const floatingActionBaseClass =
  "group flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_12px_28px_rgba(0,0,0,0.38)] backdrop-blur transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#d9c49a] focus:ring-offset-2 focus:ring-offset-[#151812] md:h-16 md:w-16";

export default function FloatingActionButtons() {
  return (
    <aside
      aria-label="빠른 상담 버튼"
      className="fixed bottom-6 right-4 z-[80] flex flex-col gap-3 md:bottom-10 md:right-8"
    >
      <a
        href={phoneHref}
        aria-label={`전화 상담 ${phoneDisplay}`}
        title={`전화 상담 ${phoneDisplay}`}
        className={`${floatingActionBaseClass} border-[#d9c49a]/60 bg-[#8f9a78] text-[#11140e] hover:border-[#f7efe2]/80 hover:bg-[#aeb995]`}
      >
        <PhoneIcon />
        <span className="sr-only">전화 상담</span>
      </a>
      <a
        href={kakaoOpenChatHref}
        aria-label="카카오톡 오픈채팅 상담"
        title="카카오톡 오픈채팅 상담"
        target="_blank"
        rel="noreferrer"
        className={`${floatingActionBaseClass} border-[#d9c49a]/70 bg-[#fee500] text-[#2a2115] hover:border-[#f7efe2]/80 hover:bg-[#ead8b3]`}
      >
        <ChatIcon />
        <span className="sr-only">카카오톡 오픈채팅 상담</span>
      </a>
      <Link
        href="/#menu-price"
        aria-label="메뉴판 가격 안내"
        title="메뉴판 가격 안내"
        className={`${floatingActionBaseClass} border-[#d9c49a]/55 bg-[#202519]/92 text-[#d9c49a] hover:border-[#aeb995] hover:bg-[#2a301f] hover:text-[#f7efe2]`}
      >
        <MenuIcon />
        <span className="sr-only">메뉴판 가격 안내</span>
      </Link>
    </aside>
  );
}
