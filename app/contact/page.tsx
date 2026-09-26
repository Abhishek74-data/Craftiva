import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { PREMIUM } from "@/lib/premium";
import { FadeUp } from "@/components/Motion";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";

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
      <PageBanner
        image={PREMIUM.showroom}
        eyebrow="Contact"
        title="Talk to the people who build it"
        description="No call centres, no forms lost in the void — reach the workshop directly. WhatsApp is the fastest way to get a quote or start a custom order."
        breadcrumb="Contact"
      />

      <section className="wrap py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-5 rounded-lg border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-lift"
            >
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
                <c.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ivory">{c.title}</p>
                {c.lines.map((l) => (
                  <p key={l} className="mt-1 text-sm text-muted">{l}</p>
                ))}
                <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brass group-hover:underline">
                  {c.cta} →
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-line bg-surface p-6 sm:p-8 shadow-card">
            <p className="eyebrow">Visiting hours</p>
            <h2 className="display-title mt-3 text-2xl text-ivory sm:text-3xl">Walk in, no appointment needed</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-ash">
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
            <div className="mt-6 rounded-lg border border-brass/30 bg-brass/10 p-4">
              <p className="text-xs leading-relaxed text-ash">
                <strong className="text-ivory">Tip:</strong> bring room measurements or a photo of the space.
                We&apos;ll help you plan sizes, woods and finishes on the spot.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-line">
            <iframe
              title="Craftiva Furniture location"
              src="https://www.google.com/maps?q=Craftiva+Furniture+Kirti+Nagar+New+Delhi&output=embed"
              className="h-full min-h-[320px] w-full [filter:grayscale(1)_invert(0.92)_contrast(0.92)_brightness(0.95)]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}