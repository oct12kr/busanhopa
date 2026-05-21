import React from "react";
import Link from "next/link";
import { phoneHref } from "@/lib/constants";

export const navItems = [
  { href: "/#hero", label: "딸기" },
  { href: "/#promise", label: "약속" },
  { href: "/#room", label: "분위기" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/#guide", label: "가이드" },
  { href: "/#location", label: "오는길" },
  { href: "/#contact", label: "예약" },
  { href: "/blog", label: "블로그" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080a]/88 backdrop-blur-xl">
      <nav
        aria-label="대전세븐나이트 주요 메뉴"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"
      >
        <Link href="/" className="text-base font-black text-[#f7d680]">
          웨이터 딸기
        </Link>
        <div className="hidden items-center gap-5 text-sm font-semibold text-white/72 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ff5f7a] transition">
              {item.label}
            </Link>
          ))}
        </div>
        <a
          href={phoneHref}
          className="rounded-md bg-[#ff5f7a] px-4 py-2 text-sm font-black text-white shadow-glow hover:bg-[#e44b65] transition"
        >
          전화 예약
        </a>
      </nav>
    </header>
  );
}
