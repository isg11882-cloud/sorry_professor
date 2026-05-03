import {
  buildTestFilename,
  FILE_NAME_PREFIX,
  SAFE_EXTENSIONS,
  type GeneratorMode,
  type SafeExtension,
} from "@/lib/dummy-file";
import { MAX_SIZE_KB, MIN_SIZE_KB, normalizeSizeKb } from "@/lib/file-size";

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
  const normalizedSizeKb = normalizeSizeKb(sizeKb);
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

        <div className="flex flex-col gap-2">
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
          <p className="text-xs text-slate-500">
            {mode === "zero" ? GENERATOR.modeZeroDesc : GENERATOR.modeRandomDesc}
          </p>
        </div>

        <label className="text-sm font-bold">
          {GENERATOR.sizeLabel}
          <input
            type="number"
            min={MIN_SIZE_KB}
            max={MAX_SIZE_KB}
            step={1}
            value={normalizedSizeKb}
            onChange={(event) => onSizeKbChange(normalizeSizeKb(event.target.valueAsNumber))}
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
          step={1}
          value={normalizedSizeKb}
          onChange={(event) => onSizeKbChange(normalizeSizeKb(event.target.valueAsNumber))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
      </div>

      <button className="retro-button retro-button-secondary mt-5 w-full sm:w-auto font-black text-lg py-3" onClick={onGenerate}>
        {GENERATOR.cta}
      </button>

      <div className="mt-6 rounded-lg border-2 border-black bg-slate-50 p-4 text-sm leading-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-2 flex items-center gap-2 border-b-2 border-slate-200 pb-2 font-black uppercase tracking-wider text-slate-400">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          제출용 파일 정보
        </div>
        <div className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
          <div><span className="font-bold text-slate-500">{GENERATOR.filenameLabel}:</span> <span className="font-mono text-blue-600 underline">{buildTestFilename(baseName, extension)}</span></div>
          <div><span className="font-bold text-slate-500">설정 용량:</span> {normalizedSizeKb.toLocaleString()} KB</div>
          <div><span className="font-bold text-slate-500">데이터 패턴:</span> {mode === "zero" ? "속 빈 강정" : "진흙탕"}</div>
          <div><span className="font-bold text-slate-500">{GENERATOR.labelGuide}:</span> <span className="text-red-500 font-black">{GENERATOR.labelValue}</span></div>
        </div>
        {lastDownload ? (
          <div className="mt-3 border-t-2 border-dashed border-slate-200 pt-2 text-xs">
            <strong>{GENERATOR.lastDownloadLabel}:</strong> {lastDownload}
          </div>
        ) : null}
      </div>
    </article>
  );
}
