"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { phoneHref } from "@/lib/constants";

export const navItems = [
  { href: "/#hero", label: "건대w" },
  { href: "/#promise", label: "약속" },
  { href: "/#room", label: "분위기" },
  { href: "/#gallery", label: "갤러리" },
  { href: "/#guide", label: "가이드" },
  { href: "/#location", label: "오는길" },
  { href: "/#contact", label: "예약" },
  { href: "/blog", label: "블로그" }
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      {/* 상단 선: open 시 X 왼쪽 대각선으로 회전 */}
      <line
        x1="4" y1="6" x2="20" y2="6"
        className="origin-center transition-all duration-300"
        style={
          open
            ? { transform: "translateY(6px) rotate(45deg)" }
            : { transform: "translateY(0) rotate(0)" }
        }
      />
      {/* 중간 선: open 시 투명 */}
      <line
        x1="4" y1="12" x2="20" y2="12"
        className="transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      {/* 하단 선: open 시 X 오른쪽 대각선으로 회전 */}
      <line
        x1="4" y1="18" x2="20" y2="18"
        className="origin-center transition-all duration-300"
        style={
          open
            ? { transform: "translateY(-6px) rotate(-45deg)" }
            : { transform: "translateY(0) rotate(0)" }
        }
      />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 메뉴 열림 시 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08080a]/88 backdrop-blur-xl">
      <nav
        aria-label="대전세븐나이트 주요 메뉴"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"
      >
        {/* 로고 */}
        <Link href="/" className="text-base font-black text-[#f7d680]">
          건대W
        </Link>

        {/* PC 가로 메뉴 (md 이상) */}
        <div className="hidden items-center gap-5 text-sm font-semibold text-white/72 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ff5f7a] transition">
              {item.label}
            </Link>
          ))}
        </div>

        {/* 우측: 전화예약 버튼 + 모바일 햄버거 */}
        <div className="flex items-center gap-3">
          <a
            href={phoneHref}
            className="rounded-md bg-[#ff5f7a] px-4 py-2 text-sm font-black text-white shadow-glow hover:bg-[#e44b65] transition"
          >
            전화 예약
          </a>

          {/* 햄버거 버튼 (md 미만에서만 표시) */}
          <button
            type="button"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center justify-center rounded-md border border-white/15 bg-white/[0.06] p-2 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          >
            <HamburgerIcon open={isOpen} />
          </button>
        </div>
      </nav>

      {/* ───── 모바일 드롭다운 메뉴 (md 미만) ───── */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0a0a0e]/95 backdrop-blur-xl px-5 pb-6 pt-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <li
                key={item.href}
                className="transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${idx * 40}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(-8px)"
                }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center rounded-lg px-4 py-3 text-base font-bold text-white/80 transition-colors hover:bg-white/[0.06] hover:text-[#ff5f7a] active:bg-white/10"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 모바일 메뉴 하단 전화 예약 */}
          <a
            href={phoneHref}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff5f7a] px-6 py-3.5 text-base font-black text-white shadow-[0_0_24px_rgba(255,95,122,0.35)] transition hover:bg-[#e44b65]"
          >
            📞 전화 예약하기
          </a>
        </div>
      </div>
    </header>
  );
}
