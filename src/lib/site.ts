const DEFAULT_SITE_URL = "https://example.com";

export const SITE_NAME = "교수님 확인 부탁드립니다";
export const SITE_TITLE = `${SITE_NAME} | 패러디 손상 파일 생성기`;
export const SITE_DESCRIPTION =
  "교수님 확인 부탁드립니다는 과제 제출 상황을 패러디한 정적 웹 유틸리티입니다. 브라우저에서 손상 파일 테스트용 더미 파일을 바로 생성할 수 있습니다.";
export const SITE_KEYWORDS = [
  "교수님 확인 부탁드립니다",
  "손상 파일 생성기",
  "더미 파일 생성",
  "패러디 유틸리티",
  "과제 제출 패러디",
  "브라우저 파일 생성",
  "정적 웹앱",
] as const;
export const SITE_LOCALE = "ko_KR";
export const SITE_LANGUAGE = "ko-KR";

export function getSiteUrl() {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!rawValue) {
    return DEFAULT_SITE_URL;
  }

  return rawValue.endsWith("/") ? rawValue.slice(0, -1) : rawValue;
}

export function getCanonicalUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
