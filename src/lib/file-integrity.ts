export type IntegrityResult = {
  extensionValid: boolean;
  sizeValid: boolean;
  signatureValid: boolean | null;
  messages: string[];
  fileName: string;
  fileSize: number;
  extension: string;
  status: "pass" | "warning";
};

export const ALLOWED_EXTENSIONS = ["txt", "json", "pdf", "png", "jpg", "jpeg", "zip"];
export const MAX_FILE_BYTES = 10 * 1024 * 1024;

const SIGNATURES: Record<string, number[]> = {
  pdf: [0x25, 0x50, 0x44, 0x46],
  png: [0x89, 0x50, 0x4e, 0x47],
  jpg: [0xff, 0xd8, 0xff],
  jpeg: [0xff, 0xd8, 0xff],
  zip: [0x50, 0x4b, 0x03, 0x04],
};

export async function checkFileIntegrity(file: File): Promise<IntegrityResult> {
  const messages: string[] = [];
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const extensionValid = ALLOWED_EXTENSIONS.includes(extension);

  if (!extensionValid) {
    messages.push(`지원하지 않는 확장자입니다: .${extension || "unknown"}`);
  }

  const sizeValid = file.size <= MAX_FILE_BYTES;
  if (!sizeValid) {
    messages.push(`파일 크기가 10MB 제한을 초과했습니다. (${file.size.toLocaleString()} bytes)`);
  }

  let signatureValid: boolean | null = null;
  const expectedSignature = SIGNATURES[extension];

  if (expectedSignature) {
    const buffer = await file.slice(0, expectedSignature.length).arrayBuffer();
    const bytes = Array.from(new Uint8Array(buffer));
    signatureValid = expectedSignature.every((value, index) => bytes[index] === value);

    if (!signatureValid) {
      messages.push(`기본 시그니처가 .${extension} 형식과 일치하지 않습니다.`);
    }
  } else if (extensionValid) {
    messages.push(`.${extension} 형식은 데모 기준으로 확장자와 용량만 우선 확인했습니다.`);
  }

  if (messages.length === 0) {
    messages.push("제출 전 확인용 기본 점검을 통과했습니다.");
  }

  return {
    extensionValid,
    sizeValid,
    signatureValid,
    messages,
    fileName: file.name,
    fileSize: file.size,
    extension,
    status: extensionValid && sizeValid && signatureValid !== false ? "pass" : "warning",
  };
}
