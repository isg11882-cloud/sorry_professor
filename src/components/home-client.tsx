"use client";

import { useState } from "react";

import { FileGeneratorSection } from "@/components/home/file-generator-section";
import { HeroSection } from "@/components/home/hero-section";
import { SurvivalScenarioSection } from "@/components/home/survival-scenario-section";
import { SurvivalModal } from "@/components/home/survival-modal";
import { downloadBlob } from "@/lib/download";
import {
  buildTestFilename,
  createTestFileBlob,
  type GeneratorMode,
  type SafeExtension,
} from "@/lib/dummy-file";
import { normalizeSizeKb } from "@/lib/file-size";

type HomeState = {
  baseName: string;
  extension: SafeExtension;
  mode: GeneratorMode;
  sizeKb: number;
  lastDownload: string;
};

const INITIAL_STATE: HomeState = {
  baseName: "",
  extension: "hwp",
  mode: "zero",
  sizeKb: 5120, // 5MB default for "heavy" feel
  lastDownload: "",
};

export function HomeClient() {
  const [state, setState] = useState<HomeState>(INITIAL_STATE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onGenerate = () => {
    const normalizedSizeKb = normalizeSizeKb(state.sizeKb);
    const sizeBytes = normalizedSizeKb * 1024;
    const blob = createTestFileBlob(sizeBytes, state.mode);
    const filename = buildTestFilename(state.baseName, state.extension);
    downloadBlob(blob, filename);
    setState((current) => ({ ...current, sizeKb: normalizedSizeKb, lastDownload: filename }));
    
    // 다운로드 완료 후 모달 팝업
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500); // 파일 다운로드가 시작되고 약간의 딜레이 후 노출
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-6 text-[var(--ink)] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <HeroSection />
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
        <SurvivalScenarioSection />
      </div>

      <SurvivalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </main>
  );
}
