import React from "react";
import { businessName, area, detailAddress, phoneDisplay } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-8 text-sm leading-7 text-white/60">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-white">
          {businessName} | 대전세븐나이트 예약 상담
        </p>
        <p>
          사업자 정보: 입력 예정 · 주소: {area} {detailAddress} · 전화: {phoneDisplay}
        </p>
        <p>
          대전세븐나이트, 중구 유천동, 건대W, 정직한 가격 안내,
          부킹 케어, 재방문 관리, 방문 가이드 정보를 제공합니다.
        </p>
      </div>
    </footer>
  );
}
