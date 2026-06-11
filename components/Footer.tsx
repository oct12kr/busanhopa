import React from "react";
import { businessName, area, detailAddress, phoneDisplay } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-8 text-sm leading-7 text-white/60">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-white">
          {businessName} | 예약 및 이용 안내
        </p>
        <p>
          사업자 정보: 입력 예정 · 주소: {area} {detailAddress} · 전화: {phoneDisplay}
        </p>
        <p>
          건대 W 예약 안내, 건대 W 이용 방법, 건대 W 방문 가이드, 건대 W 고객 상담, 건대 프리미엄 라운지, 건대 예약 문의, 광진구 아차산로 방문 안내 정보를 제공합니다.
        </p>
      </div>
    </footer>
  );
}
