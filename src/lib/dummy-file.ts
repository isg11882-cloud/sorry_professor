export const FILE_NAME_PREFIX = "";
export const SAFE_EXTENSIONS = [
  // 표준 문서 및 오피스
  "hwp",
  "hwpx",
  "docx",
  "pptx",
  "xlsx",
  "pdf",
  "rtf",
  "odt",
  "epub",
  // 데이터 및 구조화 파일
  "json",
  "xml",
  "csv",
  "sql",
  "db",
  "yaml",
  "md",
  "txt",
  // 시스템 및 바이너리
  "bin",
  "dat",
  "data",
  "blob",
  "raw",
  "hex",
  "log",
  "tmp",
  "temp",
  "bak",
  "lock",
  "env",
  // 웹 마크업
  "html",
  "htm",
] as const;
export const GENERATOR_MODES = ["zero", "random"] as const;

export type SafeExtension = (typeof SAFE_EXTENSIONS)[number];
export type GeneratorMode = (typeof GENERATOR_MODES)[number];

const SAFETY_LABEL = "Parody utility for students. Generated for survival scenarios.";
const MIN_FILE_BYTES = 10 * 1024;
const MAX_FILE_BYTES = 50 * 1024 * 1024;

export function createTestFileBlob(sizeBytes: number, mode: GeneratorMode): Blob {
  const normalizedSize = Math.max(MIN_FILE_BYTES, Math.min(sizeBytes, MAX_FILE_BYTES));

  if (mode === "random") {
    const data = new Uint8Array(normalizedSize);
    crypto.getRandomValues(data);
    return new Blob([data], { type: "application/octet-stream" });
  }

  // Zero-fill mode
  return new Blob([new Uint8Array(normalizedSize)], { type: "application/octet-stream" });
}

export function buildTestFilename(baseName: string, extension: SafeExtension) {
  const safeBaseName = (baseName.trim() || "survival-file")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 60);

  return `${FILE_NAME_PREFIX}${safeBaseName}.${extension}`;
}

export function buildGeneratorSummary(params: {
  baseName: string;
  extension: SafeExtension;
  sizeBytes: number;
  mode: GeneratorMode;
}) {
  return {
    filename: buildTestFilename(params.baseName, params.extension),
    sizeBytes: Math.max(MIN_FILE_BYTES, Math.min(params.sizeBytes, MAX_FILE_BYTES)),
    mode: params.mode,
    label: SAFETY_LABEL,
  };
}
