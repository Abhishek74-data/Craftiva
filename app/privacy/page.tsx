import { PolicyPage } from "@/components/PolicyPage";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Craftiva Furniture collects, uses and protects the personal information you share when requesting a quote or contacting our Kirti Nagar workshop.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      updated="29 August 2026"
      intro="This policy explains what personal information Craftiva Furniture collects when you use this website or contact us, why we collect it, and the choices you have. We keep it simple and collect only what we need to prepare your quote and fulfil your order."
      sections={[
        {
          h: "Information we collect",
          body: (
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Contact details you provide — your name, phone/WhatsApp number and any message when you request a quote or write to us.</li>
              <li>Order details you share — the piece, size, wood, finish, delivery location and budget you describe.</li>
              <li>Basic, anonymous usage data (such as pages visited) to understand how the site is used and improve it.</li>
            </ul>
          ),
        },
        {
          h: "How we use it",
          body: "We use your information solely to reply to your enquiry, prepare and discuss your factory-direct quote, arrange production and delivery, and provide after-sales support. We do not sell your information to anyone.",
        },
        {
          h: "How we contact you",
          body: "When you submit the quote form we receive your details by email and may reach out on WhatsApp, phone or email to discuss your order. You can ask us to stop contacting you at any time.",
        },
        {
          h: "Sharing",
          body: "We only share the minimum necessary information with trusted partners who help us deliver your order (for example, a courier for pan-India shipping). We never share your details for third-party marketing.",
        },
        {
          h: "Data retention & security",
          body: "We keep enquiry and order records only as long as needed to serve you and meet legal requirements, and we take reasonable steps to protect them from misuse or unauthorised access.",
        },
        {
          h: "Your rights",
          body: "You may ask us what personal information we hold about you, request a correction, or ask us to delete it — just contact us using the details below and we will help.",
        },
      ]}
    />
  );
}
