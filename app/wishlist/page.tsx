import { WishlistView } from "@/components/WishlistView";

export const metadata = {
  title: "Your Wishlist",
  description: "Pieces you've saved from the Craftiva catalogue — made to order in Kirti Nagar, Delhi.",
};

export default function WishlistPage() {
  return (
    <section className="wrap py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Saved pieces</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">Your wishlist</h1>
          <p className="mt-3 text-sm text-muted">
            Pieces you love will wait here while you decide — each one made to order.
          </p>
        </div>
      </div>
      <WishlistView />
    </section>
  );
}