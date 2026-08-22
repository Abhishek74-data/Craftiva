import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-7xl font-semibold text-walnut">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">This piece isn't on our floor</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          The page you're looking for doesn't exist — but if it was a furniture design you saw elsewhere,
          we can probably still make it for you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/collections" className="btn-outline">Browse the catalogue</Link>
          <a
            href={`https://wa.me/${SITE.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brass"
          >
            <MessageCircle size={15} /> Ask us to make it
          </a>
        </div>
      </div>
    </section>
  );
}