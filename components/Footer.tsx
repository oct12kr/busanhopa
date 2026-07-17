import React from "react";
import { businessName, area, detailAddress, phoneDisplay, managerName } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#d9c49a]/12 bg-[#10130d] px-5 py-8 text-sm leading-7 text-[#f7efe2]/62">
      <div className="mx-auto max-w-7xl">
        <p className="font-black text-[#f7efe2]">
          {businessName} | 예약 및 이용 안내
        </p>
        <p>
          사업자 정보: 입력 예정 · 주소: {area} {detailAddress} · 전화: {phoneDisplay} · 담당: {managerName}
        </p>
        <p>
          부산호빠 예약 안내, 부산호빠 이용 방법, 해운대 방문 가이드, 부산 프리미엄 라운지, 해운대 예약 문의, 부산 VIP룸 상담 정보를 제공합니다.
        </p>
      </div>
    </footer>
  );
}
