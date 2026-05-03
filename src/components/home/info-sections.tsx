import { FIXED_PRINCIPLES } from "./content";
import { FaqSection } from "./faq-section";

export function InfoSections() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <article className="retro-window p-5">
        <h2 className="mb-4 text-2xl font-bold">운영 기준</h2>
        <ol className="space-y-3 pl-5 text-base leading-7">
          {FIXED_PRINCIPLES.map((principle, index) => (
            <li key={principle}>
              {index + 1}. {principle}
            </li>
          ))}
        </ol>
      </article>

      <FaqSection />
    </section>
  );
}
