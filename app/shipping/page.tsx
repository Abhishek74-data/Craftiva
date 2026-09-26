import { PolicyPage } from "@/components/PolicyPage";

export const metadata = {
  title: "Shipping & Delivery",
  description:
    "How Craftiva Furniture delivers and installs across Delhi-NCR and ships made-to-order furniture pan-India.",
};

export default function ShippingPage() {
  return (
    <PolicyPage
      title="Shipping & Delivery"
      updated="29 August 2026"
      intro="Every Craftiva piece is made to order and delivered with care. Here is how delivery, installation and timelines work."
      sections={[
        {
          h: "Where we deliver",
          body: "We deliver and install across Delhi-NCR, and ship anywhere in India with protective packaging for safe transit.",
        },
        {
          h: "Delivery charges",
          body: "Delivery and installation within Delhi-NCR and pan-India shipping charges (where applicable) are quoted upfront with your order — no surprises at the end.",
        },
        {
          h: "Timelines",
          body: "Production of standard made-to-order pieces takes about 10–15 days from a confirmed quote; larger or complex projects may take 3–4 weeks. Delivery is scheduled once your piece clears our final quality check.",
        },
        {
          h: "Installation",
          body: "For Delhi-NCR orders we deliver to your doorstep and install the piece in your home. You sign off only when you are satisfied.",
        },
        {
          h: "On delivery",
          body: "Please inspect your piece at the time of delivery and tell us immediately if anything is not right — see our Returns & Cancellation and Warranty pages.",
        },
      ]}
    />
  );
}
