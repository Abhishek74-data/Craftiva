import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  note,
  action,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
  action?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "items-start justify-between sm:flex-row sm:items-end"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
        )}
        <h2
          className={`display-title mt-3 text-[clamp(1.75rem,3.6vw,3rem)] ${
            light ? "text-white" : "text-ivory"
          }`}
        >
          {title}
        </h2>
        {note && (
          <p
            className={`mt-4 max-w-xl text-[15px] leading-relaxed ${
              light ? "text-white/70" : "text-ash"
            }`}
          >
            {note}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
