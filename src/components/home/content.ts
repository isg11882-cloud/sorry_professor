import { MAX_FILE_BYTES } from "@/lib/file-integrity";

export const HERO_BADGE = "패러디 · 데모 · 안전 점검";
export const HERO_TITLE = "교수님 확인 부탁드립니다";
export const HERO_SUBCOPY =
  "마감 직전의 심정을 패러디한 공감형 밈 서비스이자, 파일 기본 점검을 제공하는 안전한 데모 페이지입니다. 실제 제출용 문서 생성이나 기만 목적 기능은 제공하지 않으며, 업로드 파일은 서버에 저장하지 않습니다.";
export const HERO_BANNER =
  "이 페이지는 공감형 패러디와 파일 기본 점검만 제공하는 데모입니다. 실제 제출, 기만, 부정행위를 돕는 기능은 제공하지 않습니다.";

export const BANNER_BULLETS = [
  "실제 제출용 문서 생성 불가",
  "손상 파일 생성 기능 제외",
  "생성물 전체에 [TEST][PARODY] / 데모용 표기",
  "업로드 파일 서버 저장 없음",
] as const;

export const FEATURE_CARDS = [
  {
    title: "내 파일 바로 점검하기",
    body: "완벽한 제출은 못 해도, 안 열리는 제출은 막아본다.",
  },
  {
    title: "시연용 샘플 파일 받기",
    body: "교수님, 제 잘못이 아니라 파일이... 라는 밈은 여기까지만 허용됩니다.",
  },
  {
    title: "브라우저 안에서만 처리",
    body: "파일은 서버에 안 남기고, 지금 기기에서 바로 점검합니다.",
  },
  {
    title: "리스크 배너 상시 노출",
    body: "웃음은 남기고 오해는 줄이도록 제출 금지 문구를 계속 보여줍니다.",
  },
] as const;

export const SAFETY_NOTICE_TITLE = "안전한 데모 운영 기준";
export const RISK_BANNER = {
  title: "제출용 아님 · 테스트/패러디 전용",
  body: "이 서비스와 생성 파일은 실제 과제 제출용이 아닙니다. 교육·시연·패러디 목적에서만 사용하세요.",
} as const;

export const FILE_CHECK = {
  title: "내 파일 바로 점검하기",
  subcopy: "제출 전, 최소한 열리는 파일인지부터 확인해보세요.",
  microcopy: "마감 10분 전일수록 기본 점검부터 차분하게.",
  pickerLabel: "점검할 파일 선택",
  emptyState:
    "아직 선택된 파일이 없습니다. 제출 전에 열리는지 먼저 확인할 파일을 골라주세요.",
  cta: "내 파일 바로 점검하기",
  pending: "점검 중...",
  selectedName: "파일명",
  selectedSize: "용량",
  resultPass: "점검 결과: 기본 확인 완료",
  resultWarning: "점검 결과: 추가 확인 필요",
} as const;

export function buildFileCheckHelper(acceptedTypes: string) {
  return `지원 형식: ${acceptedTypes} / 최대 용량: ${(MAX_FILE_BYTES / 1024 / 1024).toFixed(0)}MB`;
}

export const SAMPLE_DOWNLOAD = {
  title: "시연용 샘플 파일 받기",
  subcopy: "설명이나 시연이 필요할 때만 쓰는 안전한 예시 파일입니다.",
  microcopy: "파일 구조 학습용 더미 데이터만 제공합니다.",
  topicLabel: "샘플 주제",
  topicPlaceholder: "예: 중간발표 초안",
  formatLabel: "파일 형식",
  cta: "시연용 샘플 파일 받기",
  filenameLabel: "예상 파일명",
  labelGuide: "생성 표기",
  lastDownloadLabel: "최근 다운로드",
  labelValue: "[TEST][PARODY] 접두사 / 데모용 / 제출 금지",
} as const;

export const FIXED_PRINCIPLES = [
  "손상 파일 생성 기능은 제외합니다.",
  "생성물 전체에 [TEST][PARODY] / 데모용 라벨을 강제합니다.",
  "브랜드 메시지는 공감형 패러디와 안전 점검 데모로 일관 유지합니다.",
] as const;

export const MEME_COPIES = [
  "완벽한 제출은 못 해도, 안 열리는 제출은 막아본다.",
  "교수님, 제 잘못이 아니라 파일이... 라는 말은 밈으로만 남깁니다.",
  "제출은 했고, 이해는 나중에 하겠습니다.",
  "완성본이 아니라 용기를 제출합니다.",
  "교수님 확인 부탁드립니다. 저도 아직 못 봤습니다.",
  "진짜 제출은 제때, 밈은 가볍게.",
] as const;