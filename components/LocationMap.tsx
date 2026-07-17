import {
  fullAddress,
  mapEmbedSrc,
  mapDirectionsHref,
  venueName,
  latitude,
  longitude
} from "@/lib/constants";

export default function LocationMap() {
  return (
    <div className="relative h-full min-h-[320px]" data-latitude={latitude} data-longitude={longitude}>
      <iframe
        title={`${venueName} 구글 지도`}
        src={mapEmbedSrc}
        className="h-full min-h-[320px] w-full rounded-[20px] border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />

      <div className="absolute bottom-5 left-5 right-5 max-w-[360px] rounded-xl bg-[#f7f3ea]/94 p-4 text-[#2a2a24] shadow-[0_18px_46px_rgba(42,42,36,0.18)] backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8c8354] text-white">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-6 w-6" fill="none">
              <path d="M10 29h28l-3.3-10.2A4 4 0 0 0 30.9 16H17.1a4 4 0 0 0-3.8 2.8L10 29ZM8 29v8h32v-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="16" cy="33" r="2.2" fill="currentColor" />
              <circle cx="32" cy="33" r="2.2" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="break-keep text-[13px] font-semibold leading-[1.45]">{fullAddress}</p>
            <p className="mt-1 text-[12px] text-[#6b6b60]">{venueName}</p>
          </div>
        </div>
        <a
          href={mapDirectionsHref}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#7d7a54] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#8c8354]"
        >
          구글 길찾기 열기
        </a>
      </div>
    </div>
  );
}
