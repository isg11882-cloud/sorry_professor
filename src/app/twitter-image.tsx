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
      subtitle="브라우저에서 바로 더미 파일을 생성할 수 있는 레트로 콘셉트의 패러디 웹앱입니다."
      footer="패러디 웹앱 / 손상 파일 테스트 / 공유용 미리보기"
    />,
    size,
  );
}
