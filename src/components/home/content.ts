import { MAX_FILE_BYTES } from "@/lib/file-integrity";

export const HERO_BADGE = "대학생용 공감형 패러디 유틸리티";
export const HERO_TITLE = "교수님 확인 부탁드립니다";
export const HERO_SUBCOPY =
  "과제 마감 직전의 절박함을 위해 태어난, 지성인의 생존 전략 도구입니다. 서버 업로드 시스템의 틈새를 공략해 소중한 골든타임을 확보하세요.";
export const HERO_BANNER =
  "본 도구는 과제 제출용 '손상된 파일'을 생성해주는 패러디 유틸리티입니다. 봇의 자의적인 도덕적 판단 없이 오직 기술적 기능에만 충실합니다.";

export const BANNER_BULLETS = [
  "브라우저 내 즉시 생성 / 개인정보 보호",
  "다양한 오피스 확장자 완벽 지원",
  "속 빈 강정 vs 진흙탕 데이터 선택 가능",
  "10KB ~ 50MB 용량 자유 설정",
] as const;

export const SURVIVAL_SCENARIO = {
  title: "🎬 기적의 생존 시나리오: \"교수님, 제 파일이... 안 열린다고요?\"",
  steps: [
    {
      emoji: "⏰",
      label: "마감 1분 전! (심박수 180)",
      body: "과제는 아직 서론인데, 시계는 무정하게 11시 59분을 향해 달려갑니다. 이때 포기하면 F, 하지만 우리에겐 '교수님 열려요'가 있습니다.",
    },
    {
      emoji: "📁",
      label: "긴급 대피용 파일 생성",
      body: "파일명을 [교양]사회학_중간대체_보고서_최종.hwp로 정하고, 용량은 묵직하게 5MB로 설정! **[진흙탕 데이터 모드]**를 선택해 다운로드합니다.",
    },
    {
      emoji: "📤",
      label: "일단 제출! (세이프!)",
      body: "업로드 시스템은 파일 확장자와 용량만 체크하죠. \"제출 완료\" 메시지를 확인하며 안도의 한숨을 내쉽니다. 일단 오늘 밤은 발 뻗고 잡니다. 😴",
    },
    {
      emoji: "📞",
      label: "다음 날, 조교님의 당황한 연락",
      body: "\"학생, 과제 파일이 손상돼서 안 열리네? 다시 확인해서 보내줄래?\"",
    },
    {
      emoji: "🎭",
      label: "메소드 연기 돌입",
      body: "\"어머, 정말요? USB가 문제였나 봐요! ㅠㅠ 제가 지금 바로 다시 확인해서 보내드릴게요!\" (사실 이때부터 미친 듯이 진짜 과제를 완성합니다.)",
    },
    {
      emoji: "☕️",
      label: "3시간의 골든타임 확보",
      body: "확보된 시간 동안 고퀄리티로 과제를 마무리해 전송합니다. 성적도 지키고 멘탈도 지켰습니다. 이것이 바로 지성인의 생존 전략! ✨",
    },
  ],
};

export const GENERATOR = {
  title: "긴급 파일 생성기",
  subcopy: "교수님도, 조교님도 깜빡 속아 넘어갈 완벽한 손상 파일을 생성합니다.",
  microcopy: "다운로드 후 즉시 제출하세요. 당신의 성적을 지켜드립니다.",
  topicLabel: "파일명",
  topicPlaceholder: "반투명하게 파일명을 입력하세요.",
  formatLabel: "확장자",
  dataModeLabel: "데이터 파손 모드",
  sizeLabel: "용량(KB)",
  sizeHint: "최소 10KB / 최대 50MB(51,200KB). 용량이 묵직해야 정성이 느껴집니다.",
  cta: "생존용 파일 생성 및 다운로드",
  filenameLabel: "생성될 파일명",
  labelGuide: "상태",
  lastDownloadLabel: "방금 확보한 파일",
  labelValue: "완벽하게 손상됨 / 복구 불가능 / 제출 준비 완료",
  modeZero: "[속 빈 강정 모드]",
  modeZeroDesc: "용량은 꽉 찼지만 속은 텅 빈, 아주 깨끗하게 안 열리는 파일",
  modeRandom: "[진흙탕 데이터 모드]",
  modeRandomDesc: "데이터가 무작위로 꼬여서 복구 시도조차 불가능한 완전 파손 파일",
  sliderLabel: "용량 조절 슬라이더",
  byteSizeLabel: "실제 파일 크기",
} as const;
