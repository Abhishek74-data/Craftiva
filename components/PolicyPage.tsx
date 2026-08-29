import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

export function PolicyPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro?: string;
  sections: { h: string; body: ReactNode }[];
}) {
  return (
    <section className="wrap max-w-3xl py-16">
      <p className="eyebrow">Craftiva Furniture</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
      {intro && <p className="mt-6 text-base leading-relaxed text-ink-soft">{intro}</p>}
      <div className="mt-8 flex flex-col gap-7">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-xl font-semibold text-ink">{s.h}</h2>
            <div className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-line bg-ivory-dark/50 p-6 text-sm text-ink-soft">
        Questions about this policy? WhatsApp us at{" "}
        <a className="font-semibold text-walnut hover:underline" href={`https://wa.me/${SITE.whatsappNumber}`}>
          {SITE.whatsappDisplay}
        </a>{" "}
        or email{" "}
        <a className="font-semibold text-walnut hover:underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        .
      </div>
    </section>
  );
}
