import Link from "next/link";
import { Factory, Hammer, MessageCircle, Ruler, ShieldCheck, Truck } from "lucide-react";
import { SITE } from "@/lib/site";
import { PREMIUM } from "@/lib/premium";
import { FadeUp } from "@/components/Motion";
import { PageBanner } from "@/components/PageBanner";

export const metadata = {
  title: "Our Process",
  description:
    "How a Craftiva order works — from WhatsApp chat to workshop, delivery and installation. Made to order furniture in 10–15 days.",
};

const STEPS = [
  {
    icon: MessageCircle,
    title: "1 · Chat & quote",
    text: "Send us the design you like (from this site, a showroom photo, or your imagination) with your size and budget. We reply with a factory-direct quote — usually within working hours, often in under an hour.",
  },
  {
    icon: Ruler,
    title: "2 · Confirm specs",
    text: "We finalise exact dimensions, wood, finish, fabric and any custom details in writing. You see a clear price and lead time before paying anything.",
  },
  {
    icon: Hammer,
    title: "3 · We build it",
    text: "Your piece is cut, joined, upholstered and finished in our Kirti Nagar workshop. You receive progress photos and can visit at any stage.",
  },
  {
    icon: Factory,
    title: "4 · Quality check",
    text: "Every piece is inspected for joinery, finish and hardware before it leaves the floor — by the same hands that built it.",
  },
  {
    icon: Truck,
    title: "5 · Delivery & installation",
    text: `We deliver and install across ${SITE.serviceArea} and ship pan-India with proper packaging. You sign off only when you're happy.`,
  },
  {
    icon: ShieldCheck,
    title: "6 · Aftercare",
    text: "Every order carries a warranty, and our WhatsApp line stays open for care tips or small adjustments long after delivery.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageBanner
        image={PREMIUM.craft}
        eyebrow="How it works"
        title="From chat to chair in six steps"
        description={`Most orders take ${SITE.leadTime} from confirmed quote to delivery. Here's exactly what happens between your first message and your new furniture.`}
        breadcrumb="Our Process"
      />

      <section className="wrap py-16 lg:py-24">
        <div className="mx-auto mb-10 max-w-4xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PREMIUM.craftHands}
            alt="A Craftiva craftsman planing solid wood by hand"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full rounded-lg border border-line object-cover shadow-card"
          />
        </div>
        <div className="mx-auto grid max-w-4xl gap-5">
          {STEPS.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.05}>
              <div className="flex gap-5 rounded-lg border border-line bg-surface p-6 shadow-card">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brass/40 text-brass">
                  <s.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ivory">{s.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-lg border border-brass/30 bg-brass/10 p-8 text-center sm:p-10">
          <h2 className="display-title text-2xl text-ivory sm:text-3xl">Ready to start step one?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ash">
            Send us a design or a size on WhatsApp — the quote is free, and there&apos;s no obligation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3.5">
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent("Hi Craftiva! I'd like to start a custom furniture order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-brass"
            >
              <MessageCircle size={16} /> Start on WhatsApp
            </a>
            <Link href="/quote" className="btn btn-outline">Fill the quote form</Link>
          </div>
        </div>
      </section>
    </>
  );
}