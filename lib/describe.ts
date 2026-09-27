/**
 * Customer-facing text normalization for catalogue descriptions.
 *
 * Supplier-imported descriptions carry three kinds of raw leakage:
 *   1. Logistics metadata — "Finish: 1PC/CTN Dimensions: weight: 620, … cbm: 0.62"
 *   2. Foreign retailer sections — "DETAILED SPECIFICATIONS", "PACKAGING",
 *      "ASSEMBLY INSTRUCTIONS", "UNLIMITED FLAT RATE DELIVERY", "EASY RETURNS"
 *      (including another retailer's name, dollar prices and delivery promises
 *      Craftiva never made), all in inches/pounds.
 *   3. Swatch/markup leftovers — "COLOUR / FABRIC OPTIONS (2) - <p>Shown in…"
 *
 * Cleaning keeps only the marketing prose, strips logistics fragments, and
 * extracts one genuinely useful specification: a built size in millimetres
 * (metric supplier dims directly, US-retailer inches converted at 25.4 mm —
 * only when the product has a single unambiguous Overall size).
 *
 * Applied once at data-load time so every consumer (PDP, QuickView, meta
 * tags, JSON-LD, search haystack) reads the same normalized strings.
 */

/**
 * Retailer section headers whose appearance ends the marketing prose.
 * Deliberately an explicit list — a generic "all-caps phrase" heuristic
 * false-positives on product names ("Camille III Bar Stool"), mid-word
 * splits ("A USB port") and marketing slogans ("SIX DRAWERS, ENDLESS
 * STORIES"), all of which are real prose worth keeping.
 */
const SECTION_CUTS: RegExp[] = [
  /DETAILED SPECIFICATIONS?\b/i,
  /UNLIMITED FLAT RATE DELIVERY\b/i,
  /FRONT DOOR DELIVERY\b/i,
  /UPS STANDARD DELIVERY\b/i,
  /NEXT DAY DELIVERY\b/i,
  /PICK UP IN STORE\b/i,
  /EASY RETURNS\b/i,
  /ASSEMBLY INSTRUCTIONS\b/i,
  /COLOU?RS?\s*\/\s*FABRIC OPTIONS\b/i,
  /GREENGUARD\b/i,
  /\bPACKAGING\b/i,
  /\bNumber of boxes\b/i,
];

/** Supplier logistics fragments. */
const LOGISTICS_PATTERNS: RegExp[] = [
  // "Finish: <descriptor> Dimensions: weight: … cbm: 0.62"
  /^finish:\s*[\s\S]*?\bcbm:\s*[\d.]+\s*/i,
  // "Dimensions: weight: … cbm: 0.62"
  /\bdimensions:\s*weight:[\s\S]*?\bcbm:\s*[\d.]+\s*/gi,
  // bare weight runs: "weight: 620, length: 1950, height: 0, …"
  /\bweight:\s*[\d.,]+(?:\s*,\s*[a-z]+:\s*[\d.,]+)+\s*/gi,
  /\bweight:\s*[\d.,]+\s*(?:kg|kgs|g|gm|gms)?\s*(?:,|\.|$)/gi,
  /\bcbm:\s*[\d.]+\s*/gi,
  /\b1\s*pc\s*\/\s*ctn\b/gi,
  /\b1\s*pc\s*per\s*carton\b/gi,
];

/** Sentence openers that can begin prose after a "Finish: …" descriptor. */
const PROSE_START =
  /^finish:\s*[\s\S]*?(?=\s(?:The|A|An|This|These|That|It|Its|With|Elevate|Experience|Transform|Discover|Designed|Enjoy|Bring|Add|Made|Built|Perfect|Indulge|Create|Give|Step|Set|Stay|Make|Look|Feel|Say|Get|Take|Let|Turn|Show|Wherever|Whether|Our|Every|Each|From|By|In|At|As|If|When|There|Here|Steelcase|Crafted)\b)/i;

function collapse(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\\/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/^[\s,.;:-]+/, "")
    .trim();
}

/** Strip raw leakage from a description. Idempotent. */
export function cleanProductText(text: string): string {
  if (!text) return "";
  let out = text;

  // Cut at the first retailer section header (spec dump, packaging, policy…).
  let cutAt = -1;
  for (const pattern of SECTION_CUTS) {
    const m = out.match(pattern);
    if (m && typeof m.index === "number" && (cutAt === -1 || m.index < cutAt)) {
      cutAt = m.index;
    }
  }
  if (cutAt > 40) out = out.slice(0, cutAt);

  // Leading "Finish: …" descriptor — either swallows dims (handled below) or
  // sits before prose (cut up to the sentence opener) or is the entire text.
  if (/^finish:/i.test(out.trim())) {
    const before = out;
    out = out.replace(PROSE_START, "").replace(/^finish:\s*[\s\S]*$/, "");
    if (out === before) out = out.replace(/^finish:\s*/i, "");
  }

  for (const pattern of LOGISTICS_PATTERNS) out = out.replace(pattern, " ");

  // Supplier fabric-spec dumps leak pricing categories ("Price Tier: B") —
  // the site is quote-based and must never surface pricing of any kind.
  out = out.replace(/\s*\bPrice Tier:\s*[A-Za-z]+\b/gi, " ");

  out = collapse(out);
  if (out) out = out[0].toUpperCase() + out.slice(1);
  return out;
}

/**
 * Extract a clean built-size label ("2240 × 1950 mm") from the raw text.
 * Returns null unless the product has one unambiguous size — zero, missing,
 * multi-variant or nonsensical values never surface.
 */
export function extractSizeLabel(rawText: string): string | null {
  if (!rawText) return null;

  // US-retailer inch specs: 'Queen Overall: 66.6"w x 84.5"d x 40"h'.
  const inchRuns = [...rawText.matchAll(/\bOverall:\s*([\d.]+)"w\s*x\s*([\d.]+)"d(?:\s*x\s*([\d.]+)"h)?/g)];
  if (inchRuns.length > 1) return null; // multiple sizes — surfaced in the UI instead
  if (inchRuns.length === 1) {
    const toMm = (inch: string) => Math.round((parseFloat(inch) * 25.4) / 10) * 10;
    const dims = [toMm(inchRuns[0][1]), toMm(inchRuns[0][2])];
    if (inchRuns[0][3]) dims.push(toMm(inchRuns[0][3]));
    if (dims.some((v) => !Number.isFinite(v) || v < 200 || v > 4000)) return null;
    return `${dims.join(" × ")} mm`;
  }

  // Supplier metric runs: "width: 2240, length: 1950, height: 0, …".
  // Units are inconsistent across suppliers — some record millimetres
  // (2240), some centimetres (183), some even mix both in one row. Only
  // label when every displayed dimension sits in the unmistakable millimetre
  // band (a cm reading of 300+ means a 3 m+ product, which is implausible
  // for two or more dimensions); anything ambiguous stays unlabelled.
  const pick = (key: string): number | null => {
    const m = rawText.match(new RegExp(`\\b${key}:\\s*(\\d+(?:\\.\\d+)?)`, "i"));
    if (!m) return null;
    const v = parseFloat(m[1]);
    return Number.isFinite(v) && v > 0 ? v : null;
  };
  const width = pick("width");
  const length = pick("length") ?? pick("depth");
  const height = pick("height");
  const dims = [width, length, height].filter((v): v is number => v !== null);
  if (dims.length < 2 || dims.some((v) => v < 300 || v > 4000)) return null;
  return `${dims.join(" × ")} mm`;
}

/**
 * Render a normalized size label with axis names for the customer-facing
 * spec grid: "2240 × 1950 mm" → "2240 W × 1950 L mm" (and an H segment when
 * a third dimension exists). Zero/absent dimensions never reach the label —
 * `extractSizeLabel` already filters them — so nothing like "height: 0" can
 * surface here. Unrecognised (but already normalized) formats pass through.
 */
export function formatSizeLabel(label?: string | null): string | null {
  if (!label) return null;
  const m = label.match(/^\s*([\d.]+)(?:\s*×\s*([\d.]+))?(?:\s*×\s*([\d.]+))?\s*mm\s*$/);
  if (!m) return label;
  const axis = (value: string | undefined, name: string): string | null =>
    value ? `${value} ${name}` : null;
  const dims = [axis(m[1], "W"), axis(m[2], "L"), axis(m[3], "H")].filter(
    (v): v is string => v !== null,
  );
  return `${dims.join(" × ")} mm`;
}
