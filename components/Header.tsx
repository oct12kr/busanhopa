"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { businessName } from "@/lib/constants";

type HeaderVariant = "transparent" | "dark";

type HeaderProps = {
  variant?: HeaderVariant;
};

const leftNavItems = [
  { href: "/#hero", label: "수빈실장" },
  { href: "/#system", label: "이용안내" },
  { href: "/#room", label: "부산VIP" },
  { href: "/#gallery", label: "시설안내" }
];

const rightNavItems = [
  { href: "/#guide", label: "처음이라면" },
  { href: "/#contact", label: "예약안내" },
  { href: "/#location", label: "오시는길" },
  { href: "/blog", label: "블로그" }
];

const navItems = [...leftNavItems, ...rightNavItems];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="7"
        x2="20"
        y2="7"
        className="origin-center transition-all duration-300"
        style={
          open
            ? { transform: "translateY(5px) rotate(45deg)" }
            : { transform: "translateY(0) rotate(0)" }
        }
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        className="transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <line
        x1="4"
        y1="17"
        x2="20"
        y2="17"
        className="origin-center transition-all duration-300"
        style={
          open
            ? { transform: "translateY(-5px) rotate(-45deg)" }
            : { transform: "translateY(0) rotate(0)" }
        }
      />
    </svg>
  );
}

function LogoBlock() {
  return (
    <Link
      href="/"
      className="group flex flex-col items-center text-center text-white"
      aria-label={`${businessName} 홈`}
    >
      <span className="font-serif-kr text-[22px] font-semibold leading-none tracking-[0.08em] transition-opacity group-hover:opacity-75">
        SUBIN
      </span>
      <span className="mt-1 text-[10px] font-light uppercase leading-none tracking-[0.32em] text-white/62">
        BUSAN HOST BAR
      </span>
    </Link>
  );
}

function NavLink({
  href,
  label,
  active,
  dark
}: {
  href: string;
  label: string;
  active: boolean;
  dark: boolean;
}) {
  if (active) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-full border border-[#c9a876] px-4 py-2 text-[14px] font-semibold text-[#c9a876] transition hover:bg-[#c9a876] hover:text-[#141210]"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`relative whitespace-nowrap text-[15px] font-normal transition-opacity duration-200 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:opacity-75 hover:after:w-full ${
        dark
          ? "text-white/88 after:bg-[#c9a876]"
          : "text-white after:bg-white/80"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header({ variant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isBlog = pathname === "/blog" || pathname?.startsWith("/blog/");
  const dark = variant === "dark" || (!variant && isBlog);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const headerClass = dark
    ? "border-[#c9a876]/18 bg-[#0d0d0d]/96 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl"
    : isScrolled || isOpen
      ? "border-white/10 bg-[#151812]/58 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl"
      : "border-transparent bg-transparent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] border-b transition-all duration-300 ${headerClass}`}
    >
      <nav
        aria-label={`${businessName} 주요 메뉴`}
        className="mx-auto grid max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center gap-5 px-5 py-5 md:px-10 lg:px-16 xl:px-20"
      >
        <div className="hidden items-center justify-start gap-7 xl:gap-10 lg:flex">
          {leftNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
              dark={dark}
            />
          ))}
        </div>

        <div className="col-start-2">
          <LogoBlock />
        </div>

        <div className="hidden items-center justify-end gap-7 xl:gap-10 lg:flex">
          {rightNavItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.href === "/blog" && isBlog}
              dark={dark}
            />
          ))}
        </div>

        <div className="col-start-3 flex justify-end lg:hidden">
          <button
            type="button"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/[0.04] text-white backdrop-blur-md transition hover:bg-white/10"
          >
            <HamburgerIcon open={isOpen} />
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          isOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-[#0d0d0d]/95 px-5 pb-6 pt-3 backdrop-blur-xl">
          <ul className="grid gap-1">
            {navItems.map((item, index) => {
              const active = item.href === "/blog" && isBlog;

              return (
                <li
                  key={item.href}
                  className="transition-all duration-300"
                  style={{
                    transitionDelay: isOpen ? `${index * 35}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(-8px)"
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-normal transition ${
                      active
                        ? "rounded-full border border-[#c9a876] text-[#c9a876]"
                        : "text-white/86 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
