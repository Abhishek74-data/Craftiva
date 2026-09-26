import { getProductBySlug } from "@/lib/data";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata = {
  title: "Custom Order & Quote",
  description:
    "Order a made-to-order furniture piece from Craftiva Furniture — send your size, wood and finish and get a factory-direct quote on WhatsApp.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  let preselect = "";
  if (product) {
    const match = getProductBySlug(product);
    preselect = match ? match.name : product;
  }

  return (
    <section className="wrap py-14">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow">Made to order</p>
          <h1 className="display-title mt-3 text-4xl text-ivory sm:text-5xl">
            Tell us what you need
          </h1>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-brass to-transparent" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-ash sm:text-base">
            A piece from the catalogue, a photo you found online, or an idea sketched on paper — send the
            details and we&apos;ll reply with an exact factory-direct quote on WhatsApp.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-9">
          <QuoteForm initialProduct={preselect} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Fast reply", text: "Quotes within working hours — usually under an hour." },
            { title: "Factory-direct price", text: "No showroom markup. You pay the workshop rate." },
            { title: "No payment until you're happy", text: "We confirm the quote and timeline before any advance." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-line bg-[#f8f5ef] p-5 text-center">
              <p className="text-sm font-semibold text-ivory">{b.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}