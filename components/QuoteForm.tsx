"use client";

import { useMemo, useState } from "react";
import { Check, Copy, MessageCircle, RefreshCw, Sparkles } from "lucide-react";
import { customQuoteMessage } from "@/lib/utils";
import { SITE, WOOD_OPTIONS } from "@/lib/site";

const PRESET_SIZES = [
  "3-Seater Sofa (7 ft / 2.1 m)",
  "L-Shape Sectional (9×6 ft)",
  "King Bed (6×6.5 ft)",
  "Queen Bed (5×6.5 ft)",
  "6-Seater Dining (6×3 ft)",
  "3-Door Wardrobe (6×7 ft)",
  "Study Desk (4×2 ft)",
];

const TYPES = [
  "Sofa / Seating",
  "Bed & Headboard",
  "Wardrobe / Almirah",
  "Dining Table & Chairs",
  "Coffee / Side Table",
  "Desk & Study",
  "Ottoman & Bench",
  "Full Room Package",
  "Custom Architectural Piece",
];

export function QuoteForm({ initialProduct }: { initialProduct?: string }) {
  const [product, setProduct] = useState(initialProduct || "");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [wood, setWood] = useState("");
  const [finish, setFinish] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(
    () =>
      customQuoteMessage({
        type: [type, product].filter(Boolean).join(" — "),
        size,
        wood,
        finish,
        notes,
      }),
    [type, product, size, wood, finish, notes],
  );

  const waHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.open(waHref, "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Catalogue Piece / Reference
          </span>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Capri Sofa, or custom reference photo"
            className="input"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            What are we making? *
          </span>
          <select value={type} onChange={(e) => setType(e.target.value)} required className="input">
            <option value="">Select furniture category…</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <div className="sm:col-span-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
              Approx. size / dimensions
            </span>
            <input
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder="e.g. 2.4 m × 0.9 m sofa, or standard King 6×6.5 ft"
              className="input"
            />
          </label>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-muted">Quick presets:</span>
            {PRESET_SIZES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setSize(preset)}
                className="rounded-full border border-line bg-ivory-dark/50 px-2.5 py-1 text-[10px] font-medium text-ink-soft transition-colors hover:border-walnut hover:text-walnut"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Wood / material
          </span>
          <select value={wood} onChange={(e) => setWood(e.target.value)} className="input">
            <option value="">Select wood material…</option>
            {WOOD_OPTIONS.map((w) => (
              <option key={w.id} value={w.name}>{w.name}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
            Finish / colour / fabric
          </span>
          <input
            type="text"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            placeholder="e.g. Natural Teak, Honey Walnut, Ivory Bouclé, Tan Leather"
            className="input"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
          Anything else? (Delivery location, budget, target timeline, special requirements)
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="e.g. Delivery to Gurugram · budget ₹45k · need it in 2 weeks · I'll share floor plan on WhatsApp…"
          className="input resize-none"
        />
      </label>

      {/* Live Preview Box */}
      <div className="rounded-2xl border border-line bg-ivory-dark/40 p-4">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brass-dark">
            <Sparkles size={13} /> Message preview for workshop:
          </p>
          <button
            type="button"
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-ink"
          >
            {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy text"}
          </button>
        </div>
        <pre className="mt-2 whitespace-pre-wrap font-sans text-xs text-ink-soft">
          {message}
        </pre>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn-brass flex-1 !py-3.5 text-base">
          <MessageCircle size={19} /> Send Request on WhatsApp
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="btn-outline !py-3.5 text-sm"
        >
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          {copied ? "Copied to Clipboard" : "Copy Message"}
        </button>
      </div>

      {sent && (
        <p className="flex items-center justify-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
          <RefreshCw size={13} /> WhatsApp has been launched with your request. Didn't open automatically?{" "}
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="font-bold underline">
            Click here to open
          </a>
        </p>
      )}

      <p className="text-center text-xs text-muted">
        Your message is formatted automatically — review and send in WhatsApp. Direct reply from our Kirti Nagar team ({SITE.hours}).
      </p>
    </form>
  );
}