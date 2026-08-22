import { NextRequest, NextResponse } from "next/server";
import { createReadStream } from "node:fs";
import { Readable } from "node:stream";
import path from "node:path";
import { stat } from "node:fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMAGE_EXT_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
};

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params;
  if (!segments || segments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const root = path.resolve(process.cwd(), process.env.IMAGES_ROOT || "Images");

  let rel: string;
  try {
    rel = segments
      .map((s) => decodeURIComponent(s).replace(/[\\/]+/g, "/"))
      .join("/")
      .replace(/^\/+/, "");
  } catch {
    return new NextResponse("Bad request", { status: 400 });
  }

  if (!rel || rel.includes("..")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const filePath = path.resolve(root, rel);
  if (filePath !== root && !filePath.startsWith(root + path.sep)) {
    return new NextResponse("Forbidden", { status: 403 });
  }
  if (!IMAGE_EXT_RE.test(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const mime = MIME[path.extname(filePath).toLowerCase()];
  if (!mime) return new NextResponse("Not found", { status: 404 });

  try {
    const info = await stat(filePath);
    if (!info.isFile()) return new NextResponse("Not found", { status: 404 });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;

  return new NextResponse(stream, {
    status: 200,
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}