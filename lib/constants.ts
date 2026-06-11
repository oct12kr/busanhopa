export const businessName = "대전세븐나이트 건대W";
export const area = "대전광역시 중구 유천동";
export const detailAddress = "332-28";
export const phoneDisplay = "010-9561-7332";
export const phoneHref = "tel:01095617332";
export const kakaoOpenChatHref = "https://open.kakao.com/o/strawberry7";
export const siteUrl = "https://daejeon-seven-night.com";
export const fullAddress = `${area} ${detailAddress}`;
const mapQuery = encodeURIComponent(fullAddress);
export const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const mapDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

