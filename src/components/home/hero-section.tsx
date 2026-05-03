import {
  BANNER_BULLETS,
  FEATURE_CARDS,
  HERO_BADGE,
  HERO_BANNER,
  HERO_SUBCOPY,
  HERO_TITLE,
  SAFETY_NOTICE_TITLE,
} from "./content";

export function HeroSection() {
  return (
    <section className="retro-window overflow-hidden">
      <div className="retro-titlebar">
        <span>{`${HERO_TITLE}.exe`}</span>
        <div className="flex gap-1 text-xs">
          <span className="retro-title-button">_</span>
          <span className="retro-title-button">□</span>
          <span className="retro-title-button">×</span>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-5">
          <div className="retro-badge">{HERO_BADGE}</div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">{HERO_TITLE}</h1>
          <p className="max-w-2xl text-base leading-7 sm:text-lg">{HERO_SUBCOPY}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURE_CARDS.map((item) => (
              <div key={item.title} className="retro-list-item">
                <div className="mb-1 font-black">{item.title}</div>
                <div className="text-sm leading-6 text-slate-700">{item.body}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="bsod-panel">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em]">{SAFETY_NOTICE_TITLE}</p>
          <p className="text-lg font-semibold leading-8">{HERO_BANNER}</p>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-blue-100">
            {BANNER_BULLETS.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
