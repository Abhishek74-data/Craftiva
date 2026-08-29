import { ImageResponse } from "next/og";

// Branded social-share preview shown when any Craftiva link is pasted into
// WhatsApp, Facebook, Instagram, X, etc. Generated at build time — no external asset.
export const alt =
  "Craftiva Furniture — Factory-Direct Custom Furniture in Kirti Nagar, Delhi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #201B17 0%, #322A22 100%)",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C79A5B",
            fontWeight: 700,
          }}
        >
          Craftiva Furniture
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              color: "#F7F2EA",
              lineHeight: 1.05,
              maxWidth: 940,
            }}
          >
            Furniture, made the way you want it.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              color: "#D2C7B6",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Factory-direct custom sofas, beds, wardrobes &amp; dining — built to your
            size in our Kirti Nagar workshop.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              background: "#C79A5B",
              color: "#201B17",
              fontSize: 26,
              fontWeight: 700,
              padding: "12px 30px",
              borderRadius: 999,
            }}
          >
            Kirti Nagar, Delhi
          </div>
          <div style={{ display: "flex", color: "#9C9184", fontSize: 26, marginLeft: 22 }}>
            562+ designs · 10–15 day lead time
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
