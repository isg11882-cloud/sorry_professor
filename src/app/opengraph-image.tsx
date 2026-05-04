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
      subtitle="과제 마감 1분 전, 손상된 파일이라는 전설의 변명에 레트로 감성을 얹은 패러디 유틸리티."
      footer="완벽하게 손상됨 / 복구 불가능 / 제출 준비 완료"
    />,
    size,
  );
}
