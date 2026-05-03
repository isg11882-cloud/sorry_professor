import {
  buildTestFilename,
  FILE_NAME_PREFIX,
  SAFE_EXTENSIONS,
  type GeneratorMode,
  type SafeExtension,
} from "@/lib/dummy-file";

import { GENERATOR } from "./content";

type FileGeneratorSectionProps = {
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

const MIN_SIZE_KB = 10;
const MAX_SIZE_KB = 51200;

export function FileGeneratorSection({
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
}: FileGeneratorSectionProps) {
  const normalizedSizeKb = Math.max(MIN_SIZE_KB, Math.min(sizeKb || MIN_SIZE_KB, MAX_SIZE_KB));
  const sizeBytes = normalizedSizeKb * 1024;

  return (
    <article className="retro-window p-5 lg:p-6">
      <h2 className="mb-2 text-3xl font-black">{GENERATOR.title}</h2>
      <p className="mb-2 text-sm leading-6 text-slate-700">{GENERATOR.subcopy}</p>
      <p className="mb-5 font-bold text-slate-900">{GENERATOR.microcopy}</p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm font-bold">
          {GENERATOR.topicLabel}
          <input
            value={baseName}
            onChange={(event) => onBaseNameChange(event.target.value)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
            placeholder={GENERATOR.topicPlaceholder}
          />
        </label>

        <label className="text-sm font-bold">
          {GENERATOR.formatLabel}
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
          {GENERATOR.dataModeLabel}
          <select
            value={mode}
            onChange={(event) => onModeChange(event.target.value as GeneratorMode)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          >
            <option value="zero">{GENERATOR.modeZero}</option>
            <option value="random">{GENERATOR.modeRandom}</option>
          </select>
        </label>

        <label className="text-sm font-bold">
          {GENERATOR.sizeLabel}
          <input
            type="number"
            min={MIN_SIZE_KB}
            max={MAX_SIZE_KB}
            step={10}
            value={normalizedSizeKb}
            onChange={(event) => onSizeKbChange(Number(event.target.value) || MIN_SIZE_KB)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          />
          <span className="mt-2 block text-xs font-normal text-slate-600">{GENERATOR.sizeHint}</span>
        </label>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-bold">{GENERATOR.sliderLabel}</label>
        <input
          type="range"
          min={MIN_SIZE_KB}
          max={MAX_SIZE_KB}
          step={10}
          value={normalizedSizeKb}
          onChange={(event) => onSizeKbChange(Number(event.target.value))}
          className="w-full"
        />
      </div>

      <button className="retro-button retro-button-secondary mt-5 w-full sm:w-auto" onClick={onGenerate}>
        {GENERATOR.cta}
      </button>

      <div className="mt-4 rounded border-2 border-dashed border-black bg-white p-3 text-sm leading-6">
        <div><strong>{GENERATOR.filenameLabel}:</strong> {buildTestFilename(baseName, extension)}</div>
        <div><strong>{GENERATOR.labelGuide}:</strong> {GENERATOR.labelValue}</div>
        <div><strong>파일명 접두사:</strong> {FILE_NAME_PREFIX}</div>
        <div><strong>설정 용량:</strong> {normalizedSizeKb.toLocaleString()} KB</div>
        <div><strong>{GENERATOR.byteSizeLabel}:</strong> {sizeBytes.toLocaleString()} bytes</div>
        <div><strong>데이터 패턴:</strong> {mode === "zero" ? GENERATOR.modeZero : GENERATOR.modeRandom}</div>
        {lastDownload ? <div><strong>{GENERATOR.lastDownloadLabel}:</strong> {lastDownload}</div> : null}
      </div>
    </article>
  );
}
