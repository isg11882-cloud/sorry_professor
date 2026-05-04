import { ImageResponse } from "next/og";

import { OgImage } from "@/components/og-image";

export const dynamic = "force-static";
export const alt = "교수님 확인 부탁드립니다 트위터 프리뷰";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <OgImage
      title="교수님 확인 부탁드립니다"
      subtitle="교수님도 조교님도 깜빡 속을 듯한 레트로 패러디 톤의 생존 전략 랜딩 페이지."
      footer="긴급 파일 생성기 + 생존 시나리오 + 🎁기프투데이 스폰서 블록"
    />,
    size,
  );
}
