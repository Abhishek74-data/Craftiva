import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/Motion";

export const metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about Craftiva Furniture — pricing, lead times, materials, delivery, custom sizes and more.",
};

const FAQS = [
  {
    q: "How does pricing work?",
    a: "Every piece is quoted individually on WhatsApp based on size, wood, finish and quantity. Because we're the factory, our prices skip showroom markups — most customers save 40–60% versus retail. Catalogue bands (where shown) are indicative; the quote is the real number.",
  },
  {
    q: "Can I really get any piece in custom size?",
    a: "Yes — that's the core of what we do. Sofas, beds, wardrobes, tables: if it's in our catalogue, we can rebuild it to your dimensions. Just share the size you need when you ask for a quote.",
  },
  {
    q: "How long does an order take?",
    a: "Standard made-to-order pieces take 10–15 days from confirmed quote. Larger or complex pieces (full bedroom sets, modular sectional projects) may take 3–4 weeks. We confirm the timeline in writing before you pay.",
  },
  {
    q: "Which materials do you use?",
    a: "Solid sheesham, teak, walnut and mango wood, plus premium engineered wood and plywood for structured pieces like wardrobes. Upholstery options range from velvet, bouclé and cotton-linen blends to genuine leather. We'll recommend the right wood for your use and budget.",
  },
  {
    q: "Do you deliver outside Delhi-NCR?",
    a: "Yes. We deliver and install across Delhi-NCR, and ship anywhere in India with protective packaging. Shipping costs are quoted upfront — no surprises.",
  },
  {
    q: "Is there a warranty?",
    a: "Every piece carries a structural warranty — typically 1 year on joinery and framework (and on the frame of upholstered pieces). We're a WhatsApp away for care advice and adjustments.",
  },
  {
    q: "Can I visit the workshop?",
    a: "Absolutely — and we recommend it. Visit our Kirti Nagar showroom-workshop Monday to Saturday, 10 AM – 7:30 PM, to see materials and live pieces. Bring measurements of your space for the best advice.",
  },
  {
    q: "How do I pay?",
    a: "After confirming your quote, we take a small advance to begin production and the balance on delivery. For large projects, we agree staged payments. All payments via bank transfer or UPI.",
  },
  {
    q: "What if I don't like it when it arrives?",
    a: "We build to your confirmed spec and share progress photos, so surprises are rare. If something isn't right at delivery, tell us immediately — we'll fix, replace or adjust it under warranty rather than leave you unhappy.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory-dark/60 py-16">
        <div className="wrap max-w-3xl">
          <FadeUp>
            <p className="eyebrow">FAQs</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Questions, answered straight
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              Everything customers usually ask before ordering. Something else on your mind? WhatsApp us —
              a human from the workshop replies.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-3.5">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={Math.min(i * 0.03, 0.3)}>
              <details className="group rounded-2xl border border-line bg-white shadow-card">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-ink sm:text-base">
                  {f.q}
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-walnut transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t border-line px-6 py-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-line bg-ivory-dark/60 p-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-ink">Still curious?</h2>
          <p className="mt-2 text-sm text-muted">Ask us anything — quotes are free and friendly.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I have a question about your furniture.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brass"
            >
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline">Visit the workshop</Link>
          </div>
        </div>
      </section>
    </>
  );
}