import { PolicyPage } from "@/components/PolicyPage";

export const metadata = {
  title: "Returns & Cancellation",
  description:
    "Returns, cancellation and refund terms for made-to-order furniture from Craftiva Furniture.",
};

export default function ReturnsPage() {
  return (
    <PolicyPage
      title="Returns & Cancellation"
      updated="29 August 2026"
      intro="Because every Craftiva piece is custom-built to your confirmed specification, our returns policy is different from off-the-shelf furniture. We work hard to get it right the first time and to make it right if anything is wrong."
      sections={[
        {
          h: "Cancellations",
          body: "You can cancel free of charge before production begins. Once we have started building your custom piece, the advance covers materials and work already committed and may be non-refundable — we will always tell you clearly where your order stands before you pay.",
        },
        {
          h: "Made-to-order returns",
          body: "As custom pieces are made to your exact size, wood and finish, they cannot be returned simply due to a change of mind. This is why we confirm every detail in writing and share progress photos before delivery.",
        },
        {
          h: "If something is wrong",
          body: "If your piece arrives with a manufacturing defect, transit damage, or does not match your confirmed specification, tell us immediately at delivery. We will repair, replace or adjust it at no cost to you.",
        },
        {
          h: "Refunds",
          body: "Where a refund is due, we process it to your original payment method (bank transfer/UPI) within a reasonable period after the issue is confirmed.",
        },
        {
          h: "How to raise an issue",
          body: "Message us on WhatsApp or email with your order details and photos, and our Kirti Nagar team will respond quickly.",
        },
      ]}
    />
  );
}
