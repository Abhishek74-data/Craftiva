import { PolicyPage } from "@/components/PolicyPage";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you order made-to-order furniture from Craftiva Furniture, Kirti Nagar, Delhi.",
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      updated="29 August 2026"
      intro="These terms apply to quotes, orders and purchases made with Craftiva Furniture. By placing an order you agree to them. Because every piece is made to order, please read the sections on quotes, payments and custom orders carefully."
      sections={[
        {
          h: "Quotes",
          body: "Prices are provided as individual quotes based on your chosen size, wood, finish and quantity. A quote is confirmed in writing (usually on WhatsApp) before any payment and is valid for the period stated in that message.",
        },
        {
          h: "Orders & custom work",
          body: "Pieces are built to the specification you confirm before production begins. Because they are custom-made for you, changes after production starts may not be possible or may affect the price and timeline.",
        },
        {
          h: "Payments",
          body: "After you approve a quote, we take a small advance to begin production, with the balance due on delivery. For large projects we may agree staged payments. Payments are accepted via bank transfer or UPI.",
        },
        {
          h: "Lead times",
          body: "Standard made-to-order pieces take about 10–15 days from a confirmed quote; larger or complex projects may take 3–4 weeks. Timelines are confirmed in writing and we will tell you promptly if anything changes.",
        },
        {
          h: "Delivery & installation",
          body: "We deliver and install across Delhi-NCR and ship pan-India with protective packaging. Delivery charges, where applicable, are quoted upfront. Please inspect your piece on delivery.",
        },
        {
          h: "Warranty",
          body: "Our warranty terms are described on the Warranty page and form part of these terms.",
        },
        {
          h: "Contact",
          body: "For anything relating to these terms, reach us using the contact details below.",
        },
      ]}
    />
  );
}
