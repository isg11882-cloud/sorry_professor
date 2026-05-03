import { buildDummyFilename, FILE_NAME_PREFIX, type DummyKind } from "@/lib/dummy-file";

import { SAMPLE_DOWNLOAD } from "./content";

type SampleDownloadSectionProps = {
  topic: string;
  dummyKind: DummyKind;
  lastDownload: string;
  onTopicChange: (value: string) => void;
  onDummyKindChange: (value: DummyKind) => void;
  onGenerateDummy: () => void;
};

export function SampleDownloadSection({
  topic,
  dummyKind,
  lastDownload,
  onTopicChange,
  onDummyKindChange,
  onGenerateDummy,
}: SampleDownloadSectionProps) {
  return (
    <article className="retro-window p-5">
      <h2 className="mb-2 text-2xl font-bold">{SAMPLE_DOWNLOAD.title}</h2>
      <p className="mb-2 text-sm leading-6 text-slate-700">{SAMPLE_DOWNLOAD.subcopy}</p>
      <p className="mb-4 font-bold text-slate-900">{SAMPLE_DOWNLOAD.microcopy}</p>

      <div className="mb-4 grid gap-4">
        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.topicLabel}
          <input
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
            placeholder={SAMPLE_DOWNLOAD.topicPlaceholder}
          />
        </label>

        <label className="text-sm font-bold">
          {SAMPLE_DOWNLOAD.formatLabel}
          <select
            value={dummyKind}
            onChange={(event) => onDummyKindChange(event.target.value as DummyKind)}
            className="mt-2 w-full border-2 border-black bg-white px-3 py-2"
          >
            <option value="txt">TXT</option>
            <option value="json">JSON</option>
          </select>
        </label>
      </div>

      <button className="retro-button retro-button-secondary" onClick={onGenerateDummy}>
        {SAMPLE_DOWNLOAD.cta}
      </button>

      <div className="mt-4 rounded border-2 border-dashed border-black bg-white p-3 text-sm leading-6">
        <div><strong>{SAMPLE_DOWNLOAD.filenameLabel}:</strong> {buildDummyFilename(dummyKind, topic)}</div>
        <div><strong>{SAMPLE_DOWNLOAD.labelGuide}:</strong> {SAMPLE_DOWNLOAD.labelValue}</div>
        <div><strong>파일명 접두사:</strong> {FILE_NAME_PREFIX}</div>
        {lastDownload ? <div><strong>{SAMPLE_DOWNLOAD.lastDownloadLabel}:</strong> {lastDownload}</div> : null}
      </div>
    </article>
  );
}
