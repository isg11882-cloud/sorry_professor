"use client";

import { useMemo, useState } from "react";

import { FileCheckSection } from "@/components/home/file-check-section";
import { FileGeneratorSection } from "@/components/home/file-generator-section";
import { HeroSection } from "@/components/home/hero-section";
import { InfoSections } from "@/components/home/info-sections";
import { RiskBanner } from "@/components/home/risk-banner";
import { downloadBlob } from "@/lib/download";
import {
  buildTestFilename,
  createTestFileBlob,
  type GeneratorMode,
  type SafeExtension,
} from "@/lib/dummy-file";
import {
  ALLOWED_EXTENSIONS,
  checkFileIntegrity,
  type IntegrityResult,
} from "@/lib/file-integrity";
import { normalizeSizeKb } from "@/lib/file-size";

type HomeState = {
  selectedFile: File | null;
  integrityResult: IntegrityResult | null;
  isChecking: boolean;
  baseName: string;
  extension: SafeExtension;
  mode: GeneratorMode;
  sizeKb: number;
  lastDownload: string;
};

const INITIAL_STATE: HomeState = {
  selectedFile: null,
  integrityResult: null,
  isChecking: false,
  baseName: "load-test-01",
  extension: "bin",
  mode: "zero",
  sizeKb: 1024,
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

  const onGenerate = () => {
    const normalizedSizeKb = normalizeSizeKb(state.sizeKb);
    const sizeBytes = normalizedSizeKb * 1024;
    const blob = createTestFileBlob(sizeBytes, state.mode);
    const filename = buildTestFilename(state.baseName, state.extension);
    downloadBlob(blob, filename);
    setState((current) => ({ ...current, sizeKb: normalizedSizeKb, lastDownload: filename }));
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <RiskBanner />
        <FileGeneratorSection
          baseName={state.baseName}
          extension={state.extension}
          mode={state.mode}
          sizeKb={state.sizeKb}
          lastDownload={state.lastDownload}
          onBaseNameChange={(baseName) => setState((current) => ({ ...current, baseName }))}
          onExtensionChange={(extension) => setState((current) => ({ ...current, extension }))}
          onModeChange={(mode) => setState((current) => ({ ...current, mode }))}
          onSizeKbChange={(sizeKb) => setState((current) => ({ ...current, sizeKb: normalizeSizeKb(sizeKb) }))}
          onGenerate={onGenerate}
        />
        <HeroSection />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FileCheckSection
            acceptedTypes={acceptedTypes}
            selectedFile={state.selectedFile}
            integrityResult={state.integrityResult}
            isChecking={state.isChecking}
            onFileSelect={handleFileSelect}
            onCheckFile={onCheckFile}
          />
          <InfoSections />
        </section>
      </div>
    </main>
  );
}
