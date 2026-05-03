import { SPONSOR_ADS } from "./sponsor-ads";

export function SponsorRecommendationSection() {
  return (
    <section className="retro-window p-5 lg:p-6" aria-label="스폰서 추천">
      {SPONSOR_ADS.map((ad) => (
        <article key={ad.id} className="sponsor-card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="retro-badge bg-emerald-200 text-black">{ad.label}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">광고 · {ad.advertiser}</span>
              </div>

              <div className="sponsor-wordmark" aria-label={`${ad.advertiser} 워드마크`}>
                <span className="sponsor-wordmark-title">{ad.advertiser.toUpperCase()}</span>
                <span className="sponsor-wordmark-subtitle">{ad.accent}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{ad.headline}</h2>
              <p className="max-w-2xl text-sm leading-6 text-slate-700">{ad.body}</p>
            </div>
          </div>

          <a
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="retro-button sponsor-card-cta inline-flex items-center justify-center whitespace-nowrap text-sm"
          >
            {ad.cta}
          </a>
        </article>
      ))}
    </section>
  );
}
