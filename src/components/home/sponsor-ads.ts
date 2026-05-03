import type { StaticImageData } from "next/image";

import giftodayCampusCard from "../../../public/giftoday-campus-card.png";

export type SponsorAd = {
  id: string;
  label: string;
  advertiser: string;
  href: string;
  headline: string;
  body: string;
  emphasis: string;
  cta: string;
  brandHint: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
};

export const SPONSOR_ADS: SponsorAd[] = [
  {
    id: "giftoday",
    label: "함께 보면 좋은 추천",
    advertiser: "Giftoday",
    href: "https://www.giftoday.co.kr",
    headline: "과제 지옥 탈출 축하! 🎉 이제 놀아야지?",
    body: "동아리 굿즈, 학생회 단체티, 행사 기념품 고민은 이제 그만.",
    emphasis: "선배님들이 입 모아 추천하는 대학굿즈의 성지",
    cta: "굿즈 둘러보기",
    brandHint: "giftoday.co.kr · B2B 굿즈/판촉물",
    imageSrc: giftodayCampusCard,
    imageAlt: "Giftoday 대학 굿즈 추천 카드 이미지",
  },
];
