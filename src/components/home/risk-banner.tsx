import { RISK_BANNER } from "./content";

export function RiskBanner() {
  return (
    <section className="retro-window border-red-700 bg-[#fff1f2] p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-black text-red-700">{RISK_BANNER.title}</div>
          <p className="text-sm leading-6 text-slate-800">{RISK_BANNER.body}</p>
        </div>
        <div className="retro-badge bg-[#ffd6d9]">실제 제출 금지</div>
      </div>
    </section>
  );
}
