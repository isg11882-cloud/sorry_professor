import { FIXED_PRINCIPLES, MEME_COPIES } from "./content";

export function InfoSections() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="retro-window p-5">
        <h2 className="mb-4 text-2xl font-bold">출시 전 고정 원칙</h2>
        <ol className="space-y-3 pl-5 text-base leading-7">
          {FIXED_PRINCIPLES.map((principle, index) => (
            <li key={principle}>
              {index + 1}. {principle}
            </li>
          ))}
        </ol>
      </article>

      <article className="retro-window p-5">
        <h2 className="mb-4 text-2xl font-bold">오늘의 카피</h2>
        <div className="space-y-3">
          {MEME_COPIES.map((copy) => (
            <div key={copy} className="quote-card">
              {copy}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
