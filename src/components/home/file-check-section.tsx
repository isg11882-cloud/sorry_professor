import type { IntegrityResult } from "@/lib/file-integrity";

import { buildFileCheckHelper, FILE_CHECK } from "./content";
import { ResultStatusCard } from "./result-status-card";

type FileCheckSectionProps = {
  acceptedTypes: string;
  selectedFile: File | null;
  integrityResult: IntegrityResult | null;
  isChecking: boolean;
  onFileSelect: (file: File | null) => void;
  onCheckFile: () => void;
};

export function FileCheckSection({
  acceptedTypes,
  selectedFile,
  integrityResult,
  isChecking,
  onFileSelect,
  onCheckFile,
}: FileCheckSectionProps) {
  return (
    <details className="retro-window p-5" open={false}>
      <summary className="cursor-pointer list-none text-2xl font-bold [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-3">
          <span>{FILE_CHECK.title}</span>
          <span className="text-sm font-medium text-slate-600">기본 숨김 · 펼쳐서 사용</span>
        </span>
      </summary>

      <div className="mt-4">
        <p className="mb-2 text-sm leading-6 text-slate-700">{FILE_CHECK.subcopy}</p>
        <p className="mb-2 font-bold text-slate-900">{FILE_CHECK.microcopy}</p>
        <p className="mb-4 text-sm leading-6 text-slate-700">{buildFileCheckHelper(acceptedTypes)}</p>
        <label className="file-drop-zone mb-4 block">
          <span className="mb-2 block text-sm font-bold">{FILE_CHECK.pickerLabel}</span>
          <input
            type="file"
            accept={acceptedTypes}
            onChange={(event) => onFileSelect(event.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
        </label>

        <div className="mb-4 rounded border-2 border-dashed border-black bg-white p-3 text-sm leading-6">
          {selectedFile ? (
            <>
              <div><strong>{FILE_CHECK.selectedName}:</strong> {selectedFile.name}</div>
              <div><strong>{FILE_CHECK.selectedSize}:</strong> {selectedFile.size.toLocaleString()} bytes</div>
            </>
          ) : (
            <div>{FILE_CHECK.emptyState}</div>
          )}
        </div>

        <button className="retro-button" onClick={onCheckFile} disabled={!selectedFile || isChecking}>
          {isChecking ? FILE_CHECK.pending : FILE_CHECK.cta}
        </button>

        {integrityResult ? <ResultStatusCard result={integrityResult} /> : null}
      </div>
    </details>
  );
}
