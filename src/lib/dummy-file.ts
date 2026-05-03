export type DummyKind = "txt" | "json";

export const FILE_NAME_PREFIX = "[TEST][PARODY]";
const SAFETY_LABEL = "[교육용 더미 파일 / TEST / PARODY / 제출 금지]";

export function createEducationalDummyFile(kind: DummyKind, topic: string): Blob {
  const safeTopic = topic.trim() || "sample-topic";

  if (kind === "txt") {
    const content = [
      SAFETY_LABEL,
      "",
      `주제: ${safeTopic}`,
      "이 파일은 교육/시연 목적의 예시 데이터입니다.",
      "실제 과제, 보고서, 제출물로 사용하면 안 됩니다.",
      `생성시각: ${new Date().toISOString()}`,
    ].join("\n");

    return new Blob([content], { type: "text/plain;charset=utf-8" });
  }

  const payload = {
    label: SAFETY_LABEL,
    topic: safeTopic,
    purpose: "education-demo-only",
    warning: "실제 제출/업무용 사용 금지",
    createdAt: new Date().toISOString(),
    sampleData: [
      { id: 1, title: `${safeTopic}-sample-1`, status: "draft" },
      { id: 2, title: `${safeTopic}-sample-2`, status: "review" },
    ],
  };

  return new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
}

export function buildDummyFilename(kind: DummyKind, topic: string) {
  const slug = (topic.trim() || "sample-topic")
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

  return `${FILE_NAME_PREFIX}-${slug || "sample-topic"}.${kind}`;
}
