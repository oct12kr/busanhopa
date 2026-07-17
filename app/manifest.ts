import type { MetadataRoute } from "next";
import { businessName, siteUrl } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: businessName,
    short_name: businessName,
    description:
      "부산호빠 예약 상담, 부산 해운대 프라이빗 라운지와 VIP룸 이용 안내.",
    start_url: siteUrl,
    scope: siteUrl,
    display: "standalone",
    background_color: "#151812",
    theme_color: "#151812",
    lang: "ko-KR",
    icons: [
      {
        src: "/busanhostbar-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
