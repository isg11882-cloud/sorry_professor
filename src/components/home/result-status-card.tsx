import type { IntegrityResult } from "@/lib/file-integrity";

import { FILE_CHECK } from "./content";

type ResultStatusCardProps = {
  result: IntegrityResult;
};

export function ResultStatusCard({ result }: ResultStatusCardProps) {
  return (
    <div className={`mt-4 ${result.status === "pass" ? "result-pass" : "result-warning"}`}>
      <h3 className="mb-2 text-lg font-bold">
        {result.status === "pass" ? FILE_CHECK.resultPass : FILE_CHECK.resultWarning}
      </h3>
      <ul className="space-y-2 text-sm leading-6">
        {result.messages.map((message) => (
          <li key={message}>• {message}</li>
        ))}
      </ul>
    </div>
  );
}
