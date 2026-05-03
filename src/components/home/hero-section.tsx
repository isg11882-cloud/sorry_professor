import {
  BANNER_BULLETS,
  HERO_BADGE,
  HERO_BANNER,
  HERO_SUBCOPY,
  HERO_TITLE,
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
          <div className="retro-badge bg-yellow-400 text-black border-2 border-black">{HERO_BADGE}</div>
          <h1 className="text-3xl font-black leading-tight sm:text-5xl">{HERO_TITLE}</h1>
          <p className="max-w-2xl text-base leading-7 sm:text-lg font-medium">{HERO_SUBCOPY}</p>
        </div>

        <aside className="bsod-panel bg-blue-700 p-6 text-white border-4 border-double border-white">
          <p className="text-lg font-semibold leading-8 italic">&quot;교수님, 제 파일이... 안 열린다고요?&quot;</p>
          <p className="mt-4 text-sm leading-6 text-blue-100">{HERO_BANNER}</p>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-yellow-200">
            {BANNER_BULLETS.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
