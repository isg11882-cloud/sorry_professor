export const FILE_NAME_PREFIX = "[TEST]";
export const SAFE_EXTENSIONS = [
  "bin",
  "dat",
  "zero",
  "txt",
  "json",
  "csv",
  "tsv",
  "log",
  "md",
  "xml",
  "yaml",
  "yml",
  "ini",
  "cfg",
] as const;
export const GENERATOR_MODES = ["zero", "random"] as const;

export type SafeExtension = (typeof SAFE_EXTENSIONS)[number];
export type GeneratorMode = (typeof GENERATOR_MODES)[number];

const SAFETY_LABEL = "Generated for resilience/stress testing only. Not for real submission or production data.";
const MIN_FILE_BYTES = 10 * 1024;
const MAX_FILE_BYTES = 50 * 1024 * 1024;

export function createTestFileBlob(sizeBytes: number, mode: GeneratorMode): Blob {
  const normalizedSize = Math.max(MIN_FILE_BYTES, Math.min(sizeBytes, MAX_FILE_BYTES));

  if (mode === "zero") {
    return new Blob([new Uint8Array(normalizedSize)], { type: "application/octet-stream" });
  }

  const bytes = new Uint8Array(normalizedSize);
  const chunkSize = 65_536;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, bytes.length);
    crypto.getRandomValues(bytes.subarray(offset, end));
  }

  return new Blob([bytes], { type: "application/octet-stream" });
}

export function buildTestFilename(baseName: string, extension: SafeExtension) {
  const safeBaseName = (baseName.trim() || "stress-sample")
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .slice(0, 60);

  return `${FILE_NAME_PREFIX}-${safeBaseName}.${extension}`;
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
