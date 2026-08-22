import Link from "next/link";
import { Factory, Hammer, Handshake, MapPin } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/Motion";

export const metadata = {
  title: "About",
  description:
    "Craftiva Furniture — a factory-direct custom furniture workshop in Kirti Nagar, Delhi. We design and build solid-wood furniture to order, at factory prices.",
};

const VALUES = [
  {
    icon: Factory,
    title: "Factory-direct, always",
    text: "We design, cut, join, upholster and finish everything in our own Kirti Nagar workshop. When you buy from Craftiva, the workshop and the store are the same place — so prices skip every middleman.",
  },
  {
    icon: Hammer,
    title: "Built by hand, to your spec",
    text: "Catalogue pieces are starting points, not limits. Size, wood, finish, fabric, cushion firmness — every variable is adjustable before we start cutting.",
  },
  {
    icon: Handshake,
    title: "Quoted honestly, delivered on time",
    text: "You get one clear factory-direct quote, a written lead time, and progress photos while we build. If we're late, you'll hear it from us first.",
  },
  {
    icon: MapPin,
    title: "Rooted in Kirti Nagar",
    text: "The furniture capital of India, with generations of carpentry skill under one roof. Our craftspeople are the same family names that supply Delhi's best showrooms.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-ivory-dark/60 py-16">
        <div className="wrap max-w-3xl">
          <FadeUp>
            <p className="eyebrow">About Craftiva</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              The workshop behind the showroom prices
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              Craftiva Furniture started with a simple frustration: furniture in Delhi stores is beautiful,
              but the price you pay pays for the store, the rent, the sales team and the middlemen — not the
              wood. We're the factory those stores buy from. So we decided to sell direct.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Today, from our workshop at {SITE.address}, we build bespoke sofas, beds, wardrobes, dining sets, desks and storage
              for homes across Delhi-NCR and nationwide — every piece made to order, photographed honestly, and
              delivered with a full structural warranty.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="wrap py-16">
        <FadeUp>
          <p className="eyebrow">What we stand for</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Four promises on every order
          </h2>
        </FadeUp>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <div key={v.title} className="flex gap-5 rounded-2xl border border-line bg-white p-6 shadow-card">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-walnut text-ivory">
                <v.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">
                  <span className="mr-2 text-[10px] font-bold uppercase tracking-wider text-brass-dark">0{i + 1}</span>
                  {v.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pb-16">
        <div className="grid-pattern rounded-3xl border border-line bg-white p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">Come see for yourself</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                The best way to understand Craftiva is to walk through the workshop — see the timber racks,
                the joinery benches, the pieces in progress — and talk to the people who'll build yours.
              </p>
              <div className="mt-6 flex flex-wrap gap-3.5">
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MapPin size={16} /> Directions
                </a>
                <Link href="/process" className="btn-outline">How our orders work</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-ivory p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Visit us</p>
              <p className="mt-3 text-sm leading-relaxed text-ink">{SITE.address}</p>
              <p className="mt-2 text-sm text-ink-soft">{SITE.hours}</p>
              <p className="mt-4 text-sm text-ink-soft">
                WhatsApp ahead on <strong className="text-walnut">{SITE.whatsappDisplay}</strong> and we'll
                have the tea ready.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}