import { MAX_FILE_BYTES } from "@/lib/file-integrity";

export const HERO_BADGE = "QA Utility · Binary Stress Test · Browser Safe";
export const HERO_TITLE = "범용 바이너리 스트레스 테스트 유틸리티";
export const HERO_SUBCOPY =
  "서버의 대용량 파일 처리 및 비정형 데이터 대응 능력을 검증하기 위한 도구입니다. 브라우저 안에서 테스트 파일을 생성하고 즉시 다운로드해 업로드 제한, 예외 처리, 파이프라인 복원력을 빠르게 점검할 수 있습니다.";
export const HERO_BANNER =
  "생성기는 실무 테스트 흐름에 맞춰 파일명, 확장자, 바이트 크기, 데이터 패턴을 빠르게 조합하도록 설계했습니다. 생성 파일은 모두 테스트 전용 라벨이 붙고 서버에 저장되지 않습니다.";

export const BANNER_BULLETS = [
  "브라우저 내 생성 / 서버 전송 없음",
  "[TEST]- 접두사 자동 적용",
  "안전 확장자 목록만 제공",
  "10KB ~ 50MB 실바이트 기준 생성",
] as const;

export const FEATURE_CARDS = [
  {
    title: "테스트 파일 생성기 우선 배치",
    body: "첫 화면에서 바로 파일명, 확장자, 용량, 패턴을 정하고 다운로드할 수 있습니다.",
  },
  {
    title: "Zero-fill / Random 데이터",
    body: "용량 스트레스 테스트와 비정형 바이트 입력 테스트를 각각 분리해서 검증할 수 있습니다.",
  },
  {
    title: "실바이트 기준 용량 제어",
    body: "입력한 KB 값이 그대로 1024 기준 바이트 크기에 반영되도록 처리합니다.",
  },
  {
    title: "보조 파일 점검 유지",
    body: "기존 파일 기본 점검기는 뒤쪽 보조 섹션으로 남겨 운영 전 샘플 검수에 활용할 수 있습니다.",
  },
] as const;

export const SAFETY_NOTICE_TITLE = "안전/리스크 운영 배너";
export const RISK_BANNER = {
  title: "테스트 전용 생성기 · 운영 파일 대체 금지",
  body: "이 도구는 QA, 업로드 필터 검증, 대용량 처리 리허설용입니다. 실제 제출물·업무 산출물·민감 데이터 생성 용도로 사용하지 마세요.",
} as const;

export const FILE_CHECK = {
  title: "보조 기능: 기존 파일 기본 점검",
  subcopy: "이미 확보한 샘플 파일이 있다면 업로드 전에 확장자, 용량, 기본 시그니처를 빠르게 확인할 수 있습니다.",
  microcopy: "메인 생성기 테스트 뒤에 실제 반입 예정 파일을 한 번 더 검수하는 보조 흐름입니다.",
  pickerLabel: "점검할 파일 선택",
  emptyState: "아직 선택된 파일이 없습니다. 기본 점검이 필요한 파일을 올려주세요.",
  cta: "파일 기본 점검 실행",
  pending: "점검 중...",
  selectedName: "파일명",
  selectedSize: "용량",
  resultPass: "점검 결과: 기본 확인 완료",
  resultWarning: "점검 결과: 추가 확인 필요",
} as const;

export function buildFileCheckHelper(acceptedTypes: string) {
  return `지원 형식: ${acceptedTypes} / 최대 용량: ${(MAX_FILE_BYTES / 1024 / 1024).toFixed(0)}MB`;
}

export const GENERATOR = {
  title: "테스트 파일 생성기",
  subcopy: "서버의 대용량 파일 처리 및 비정형 데이터 대응 능력을 검증하기 위한 도구입니다.",
  microcopy: "생성 즉시 다운로드되며, 업로드 리허설·필터 검증·저장소 스트레스 테스트에 바로 사용할 수 있습니다.",
  topicLabel: "파일명(base name)",
  topicPlaceholder: "예: load-test-01",
  formatLabel: "확장자",
  dataModeLabel: "데이터 생성 방식",
  sizeLabel: "용량(KB)",
  sizeHint: "최소 10KB / 최대 50MB(51,200KB) / 입력값은 1024 기준 바이트 크기에 그대로 반영됩니다.",
  cta: "파일 생성 후 바로 다운로드",
  filenameLabel: "생성 파일명",
  labelGuide: "안전 표기",
  lastDownloadLabel: "최근 다운로드",
  labelValue: "[TEST]- 접두사 / 테스트 전용 / 브라우저 로컬 생성",
  modeZero: "Zero-fill (0x00)",
  modeRandom: "Random bytes",
  sliderLabel: "슬라이더 조정",
  byteSizeLabel: "실제 생성 크기",
} as const;

export const FIXED_PRINCIPLES = [
  "생성 파일은 모두 테스트 전용 접두사와 안전 확장자 목록을 강제합니다.",
  "Random 모드는 브라우저의 crypto.getRandomValues를 청크 단위로 사용해 안전하게 생성합니다.",
  "생성 직후 즉시 다운로드하며 서버 저장, 서버 전송, 공유 저장소 적재를 하지 않습니다.",
] as const;

export const FAQ_ITEMS = [
  {
    question: "생성 파일은 서버에 업로드되거나 저장되나요?",
    answer: "아니요. 생성과 다운로드는 현재 브라우저에서만 처리되며 서비스 서버로 파일 내용을 전송하지 않습니다.",
  },
  {
    question: "용량 값은 실제 바이트 크기와 정확히 맞나요?",
    answer: "예. 입력한 KB 값에 1024를 곱해 실제 Blob 바이트 크기를 만들고, 10KB~50MB 범위로만 허용합니다.",
  },
  {
    question: "Random 데이터는 어떻게 생성하나요?",
    answer: "브라우저 내장 crypto.getRandomValues를 사용하며, 큰 파일도 처리할 수 있도록 일정 크기 청크로 나눠 채웁니다.",
  },
  {
    question: "왜 확장자를 자유 입력이 아니라 선택식으로 제한하나요?",
    answer: "테스트 범위를 관리하고 오용 가능성을 줄이기 위해 .bin, .dat, .zero, .txt, .json만 안전 목록으로 제공합니다.",
  },
] as const;
