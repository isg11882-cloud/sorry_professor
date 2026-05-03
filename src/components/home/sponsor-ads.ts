export type SponsorAd = {
  id: string;
  label: string;
  advertiser: string;
  href: string;
  headline: string;
  body: string;
  cta: string;
};

export const SPONSOR_ADS: SponsorAd[] = [
  {
    id: "giftoday",
    label: "제휴 추천",
    advertiser: "Giftoday",
    href: "https://www.giftoday.co.kr",
    headline: "기업 판촉물·단체 선물 검토 중이라면 Giftoday를 참고해보세요.",
    body: "기업/단체 선물, 판촉물, 프로모션 굿즈를 실무적으로 비교해볼 때 확인하기 좋은 B2B 상품 탐색처입니다.",
    cta: "상품 보기",
  },
];
