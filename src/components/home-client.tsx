"use client";

import { useMemo, useState } from "react";

import { FileCheckSection } from "@/components/home/file-check-section";
import { HeroSection } from "@/components/home/hero-section";
import { InfoSections } from "@/components/home/info-sections";
import { RiskBanner } from "@/components/home/risk-banner";
import { SampleDownloadSection } from "@/components/home/sample-download-section";
import { downloadBlob } from "@/lib/download";
import {
  buildDummyFilename,
  createEducationalDummyFile,
  type DummyKind,
} from "@/lib/dummy-file";
import {
  ALLOWED_EXTENSIONS,
  checkFileIntegrity,
  type IntegrityResult,
} from "@/lib/file-integrity";

type HomeState = {
  selectedFile: File | null;
  integrityResult: IntegrityResult | null;
  isChecking: boolean;
  topic: string;
  dummyKind: DummyKind;
  lastDownload: string;
};

const INITIAL_STATE: HomeState = {
  selectedFile: null,
  integrityResult: null,
  isChecking: false,
  topic: "과제-샘플",
  dummyKind: "txt",
  lastDownload: "",
};

export function HomeClient() {
  const [state, setState] = useState<HomeState>(INITIAL_STATE);

  const acceptedTypes = useMemo(() => ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(", "), []);

  const handleFileSelect = (file: File | null) => {
    setState((current) => ({ ...current, selectedFile: file, integrityResult: null }));
  };

  const onCheckFile = async () => {
    if (!state.selectedFile) return;

    setState((current) => ({ ...current, isChecking: true }));
    try {
      const result = await checkFileIntegrity(state.selectedFile);
      setState((current) => ({ ...current, integrityResult: result }));
    } finally {
      setState((current) => ({ ...current, isChecking: false }));
    }
  };

  const onGenerateDummy = () => {
    const blob = createEducationalDummyFile(state.dummyKind, state.topic);
    const filename = buildDummyFilename(state.dummyKind, state.topic);
    downloadBlob(blob, filename);
    setState((current) => ({ ...current, lastDownload: filename }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <RiskBanner />
        <HeroSection />

        <section className="grid gap-6 lg:grid-cols-2">
          <FileCheckSection
            acceptedTypes={acceptedTypes}
            selectedFile={state.selectedFile}
            integrityResult={state.integrityResult}
            isChecking={state.isChecking}
            onFileSelect={handleFileSelect}
            onCheckFile={onCheckFile}
          />

          <SampleDownloadSection
            topic={state.topic}
            dummyKind={state.dummyKind}
            lastDownload={state.lastDownload}
            onTopicChange={(topic) => setState((current) => ({ ...current, topic }))}
            onDummyKindChange={(dummyKind) => setState((current) => ({ ...current, dummyKind }))}
            onGenerateDummy={onGenerateDummy}
          />
        </section>

        <InfoSections />
      </div>
    </main>
  );
}
