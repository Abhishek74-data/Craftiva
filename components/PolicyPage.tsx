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
      <h1 className="display-title mt-3 text-4xl text-ivory sm:text-5xl">{title}</h1>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">Last updated: {updated}</p>
      {intro && <p className="mt-6 text-base leading-relaxed text-ash">{intro}</p>}
      <div className="mt-8 flex flex-col gap-7">
        {sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-xl font-medium text-ivory">{s.h}</h2>
            <div className="mt-2 text-sm leading-relaxed text-ash">{s.body}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-line bg-[#f7f4ee] p-6 text-sm text-ash">
        Questions about this policy? WhatsApp us at{" "}
        <a className="font-semibold text-brass hover:underline" href={`https://wa.me/${SITE.whatsappNumber}`}>
          {SITE.whatsappDisplay}
        </a>{" "}
        or email{" "}
        <a className="font-semibold text-brass hover:underline" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
        .
      </div>
    </section>
  );
}
