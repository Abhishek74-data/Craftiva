import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { FadeUp } from "@/components/Motion";

export const metadata = {
  title: "Contact & Visit Us",
  description:
    "Visit the Craftiva Furniture workshop in Kirti Nagar, Delhi, or reach us on WhatsApp +91 97114 87229. Open Mon–Sat.",
};

export default function ContactPage() {
  const cards = [
    {
      icon: MessageCircle,
      title: "WhatsApp (fastest)",
      lines: [SITE.whatsappDisplay, "Quotes, photos, order updates"],
      href: `https://wa.me/${SITE.whatsappNumber}`,
      cta: "Start a chat",
    },
    {
      icon: Phone,
      title: "Phone",
      lines: [SITE.phone, SITE.hours],
      href: `tel:${SITE.whatsappNumber}`,
      cta: "Call us",
    },
    {
      icon: Mail,
      title: "Email",
      lines: [SITE.email, "For detailed specs & bulk orders"],
      href: `mailto:${SITE.email}`,
      cta: "Write to us",
    },
    {
      icon: MapPin,
      title: "Workshop & showroom",
      lines: [SITE.address, SITE.hours],
      href: SITE.mapsUrl,
      cta: "Get directions",
    },
  ];

  return (
    <>
      <section className="border-b border-line bg-ivory-dark/60 py-16">
        <div className="wrap max-w-3xl">
          <FadeUp>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
              Talk to the people who build it
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              No call centres, no forms lost in the void — reach the workshop directly. WhatsApp is the
              fastest way to get a quote or start a custom order.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-5 rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-walnut text-ivory">
                <c.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{c.title}</p>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted">{l}</p>
                ))}
                <p className="mt-2.5 text-xs font-bold uppercase tracking-wider text-walnut group-hover:underline">
                  {c.cta} →
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
            <p className="eyebrow">Visiting hours</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Walk in, no appointment needed</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-ink-soft">
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-brass" />
                Monday – Saturday · 10:00 AM – 7:30 PM
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-brass" />
                Sunday · by appointment (WhatsApp us)
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-brass" />
                {SITE.address}
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-brass/30 bg-brass/10 p-4">
              <p className="text-xs leading-relaxed text-ink-soft">
                <strong className="text-ink">Tip:</strong> bring room measurements or a photo of the space.
                We'll help you plan sizes, woods and finishes on the spot.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line">
            <iframe
              title="Craftiva Furniture location"
              src="https://www.google.com/maps?q=Craftiva+Furniture+Kirti+Nagar+New+Delhi&output=embed"
              className="h-full min-h-[320px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}