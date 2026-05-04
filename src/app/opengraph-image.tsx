import { ImageResponse } from "next/og";

import { OgImage } from "@/components/og-image";

export const dynamic = "force-static";
export const alt = "교수님 확인 부탁드립니다 링크 프리뷰";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <OgImage
      title="교수님 확인 부탁드립니다"
      subtitle="과제 제출 상황을 유쾌하게 패러디한 브라우저 기반 손상 파일 테스트 유틸리티입니다."
      footer="브라우저 즉시 생성 / 다양한 확장자 지원 / 정적 배포 대응"
    />,
    size,
  );
}
