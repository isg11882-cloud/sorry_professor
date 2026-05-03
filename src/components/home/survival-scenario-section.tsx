import { SURVIVAL_SCENARIO } from "./content";

export function SurvivalScenarioSection() {
  return (
    <article className="retro-window p-6 lg:p-8">
      <h2 className="mb-6 text-3xl font-black text-blue-900 underline decoration-yellow-400 decoration-4 underline-offset-8">
        {SURVIVAL_SCENARIO.title}
      </h2>
      <div className="space-y-6">
        {SURVIVAL_SCENARIO.steps.map((step, index) => (
          <div key={index} className="flex gap-4 border-l-4 border-slate-200 pl-4 transition-all hover:border-blue-500">
            <span className="text-3xl shrink-0">{step.emoji}</span>
            <div className="space-y-1">
              <div className="text-lg font-black text-slate-800">{step.label}</div>
              <p className="text-base leading-7 text-slate-600">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-lg bg-yellow-50 p-4 text-center font-bold text-yellow-800 border-2 border-yellow-200">
        이것이 바로 지성인의 생존 전략! ✨
      </div>
    </article>
  );
}
