import {
  buildTestFilename,
  FILE_NAME_PREFIX,
  SAFE_EXTENSIONS,
  type GeneratorMode,
  type SafeExtension,
} from "@/lib/dummy-file";

import { SAMPLE_DOWNLOAD } from "./content";

type SampleDownloadSectionProps = {
  baseName: string;
  extension: SafeExtension;
  mode: GeneratorMode;
  sizeKb: number;
  lastDownload: string;
  onBaseNameChange: (value: string) => void;
  onExtensionChange: (value: SafeExtension) => void;
  onModeChange: (value: GeneratorMode) => void;
  onSizeKbChange: (value: number) => void;
  onGenerate: () => void;
};

export function SampleDownloadSection({
  baseName,
  extension,
  mode,
  sizeKb,
  lastDownload,
  onBaseNameChange,
  onExtensionChange,
  onModeChange,
  onSizeKbChange,
  onGenerate,
}: SampleDownloadSectionProps) {
  return (
    <article className="retro-window p-5 lg:p-6">
      <h2 className="mb-2 text-3xl font-black">{SAMPLE_DOWNLOAD.title}</h2>
      <p className="mb-2 text-sm leading-6 text-slate-700">{SAMPLE_DOWNLOAD.subcopy}</p>
      <p className="mb-5 font-bold text-slate-900">{SAMPLE_DOWNLOAD.microcopy}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.topicLabel}
          <input
            value={baseName}
            onChange={(event) => onBaseNameChange(event.target.value)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
            placeholder={SAMPLE_DOWNLOAD.topicPlaceholder}
          />
        </label>

        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.formatLabel}
          <select
            value={extension}
            onChange={(event) => onExtensionChange(event.target.value as SafeExtension)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          >
            {SAFE_EXTENSIONS.map((item) => (
              <option key={item} value={item}>
                .{item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.dataModeLabel}
          <select
            value={mode}
            onChange={(event) => onModeChange(event.target.value as GeneratorMode)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          >
            <option value="zero">{SAMPLE_DOWNLOAD.modeZero}</option>
            <option value="random">{SAMPLE_DOWNLOAD.modeRandom}</option>
          </select>
        </label>

        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.sizeLabel}
          <input
            type="number"
            min={10}
            max={51200}
            step={10}
            value={sizeKb}
            onChange={(event) => onSizeKbChange(Number(event.target.value) || 10)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          />
          <span className="mt-2 block text-xs font-normal text-slate-600">{SAMPLE_DOWNLOAD.sizeHint}</span>
        </label>
      </div>

      <div className="mt-4">
        <input
          type="range"
          min={10}
          max={51200}
          step={10}
          value={sizeKb}
          onChange={(event) => onSizeKbChange(Number(event.target.value))}
          className="w-full"
        />
      </div>

      <button className="retro-button retro-button-secondary mt-5 w-full sm:w-auto" onClick={onGenerate}>
        {SAMPLE_DOWNLOAD.cta}
      </button>

      <div className="mt-4 rounded border-2 border-dashed border-black bg-white p-3 text-sm leading-6">
        <div><strong>{SAMPLE_DOWNLOAD.filenameLabel}:</strong> {buildTestFilename(baseName, extension)}</div>
        <div><strong>{SAMPLE_DOWNLOAD.labelGuide}:</strong> {SAMPLE_DOWNLOAD.labelValue}</div>
        <div><strong>파일명 접두사:</strong> {FILE_NAME_PREFIX}</div>
        <div><strong>설정 용량:</strong> {sizeKb.toLocaleString()} KB</div>
        <div><strong>데이터 패턴:</strong> {mode === "zero" ? SAMPLE_DOWNLOAD.modeZero : SAMPLE_DOWNLOAD.modeRandom}</div>
        {lastDownload ? <div><strong>{SAMPLE_DOWNLOAD.lastDownloadLabel}:</strong> {lastDownload}</div> : null}
      </div>
    </article>
  );
}
