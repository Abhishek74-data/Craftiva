"use client";

import { useState } from "react";
import { Check, Loader2, PhoneCall, Send } from "lucide-react";
import { SITE } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessKey = SITE.web3formsKey;
    if (!accessKey) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Callback request${name ? ` — ${name}` : ""}`,
          from_name: "Craftiva Website — Contact",
          Name: name,
          Phone: phone,
          Message: message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-brass/30 bg-brass/10 p-8 text-center">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-walnut text-ivory">
          <Check size={22} />
        </div>
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Request received</h2>
        <p className="mt-2 max-w-sm text-sm text-ink-soft">
          Thanks — our Kirti Nagar team will call you back during working hours ({SITE.hours}).
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-6 sm:p-8">
      <p className="eyebrow">Prefer we call you?</p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Request a callback</h2>
      <p className="mt-2 text-sm text-muted">
        Leave your number and a short note — we&apos;ll get back to you. No WhatsApp needed.
      </p>

      <form onSubmit={submit} className="mt-5 flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Your name *</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Rohit Sharma" className="input" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Phone number *</span>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required pattern="[0-9+\s-]{7,15}" placeholder="e.g. +91 98xxxxxxxx" className="input" />
          </label>
        </div>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">What can we help with?</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="e.g. Looking for a custom 3-seater sofa for a compact living room…" className="input resize-none" />
        </label>

        <button type="submit" disabled={status === "sending"} className="btn-brass !py-3.5 text-sm disabled:opacity-70">
          {status === "sending" ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
          {status === "sending" ? "Sending…" : "Request a callback"}
        </button>

        {status === "error" && (
          <p className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
            <PhoneCall size={14} /> Couldn&apos;t send just now — please WhatsApp us at{" "}
            <a href={`https://wa.me/${SITE.whatsappNumber}`} className="font-bold underline" target="_blank" rel="noopener noreferrer">
              {SITE.whatsappDisplay}
            </a>
            .
          </p>
        )}
      </form>
    </div>
  );
}
