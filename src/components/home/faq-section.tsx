import { FAQ_ITEMS } from "./content";

export function FaqSection() {
  return (
    <article className="retro-window p-5">
      <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
      <div className="space-y-3">
        {FAQ_ITEMS.map((item) => (
          <div key={item.question} className="retro-list-item">
            <div className="mb-2 font-black">Q. {item.question}</div>
            <div className="text-sm leading-6 text-slate-700">A. {item.answer}</div>
          </div>
        ))}
      </div>
    </article>
  );
}
