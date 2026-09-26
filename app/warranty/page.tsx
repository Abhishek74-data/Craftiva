import { PolicyPage } from "@/components/PolicyPage";

export const metadata = {
  title: "Warranty",
  description:
    "Craftiva Furniture warranty: 5-year structural frame warranty plus 1 year on upholstery, foam and hardware.",
};

export default function WarrantyPage() {
  return (
    <PolicyPage
      title="Warranty"
      updated="29 August 2026"
      intro="We build furniture to last, and we stand behind it. Here is exactly what our warranty covers and how to make a claim."
      sections={[
        {
          h: "What's covered",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li><strong>5-year structural warranty</strong> on the solid-wood frame and joinery against manufacturing defects under normal household use.</li>
              <li><strong>1-year warranty</strong> on upholstery, foam, fabric and hardware (such as hinges, channels and gas-lifts).</li>
            </ul>
          ),
        },
        {
          h: "What's not covered",
          body: "Normal wear and tear, damage from misuse, accidents, incorrect cleaning, exposure to excessive moisture or heat, or unauthorised repairs and modifications. Natural variation in solid wood grain, colour and fabric is a feature of handcrafted furniture, not a defect.",
        },
        {
          h: "How to claim",
          body: "Message us on WhatsApp or email with your order details and clear photos of the issue. Our Kirti Nagar team will assess it and arrange a repair, replacement of the affected part, or adjustment as appropriate.",
        },
        {
          h: "Care matters",
          body: "Simple care keeps your piece in warranty and looking its best — we're always a WhatsApp message away for care tips and minor adjustments long after delivery.",
        },
      ]}
    />
  );
}
