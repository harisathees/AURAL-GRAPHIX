import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time — `output: "export"` has no runtime to generate it.
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f5f4f3 0%, #eeece9 55%, #e0d7f6 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#6f46d4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#060612",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0 18px",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#060612",
              maxWidth: 940,
            }}
          >
            <span>We design brands</span>
            <span>that move</span>
            <span style={{ color: "#2d1b6b" }}>people</span>
          </div>
          <div style={{ fontSize: 28, color: "#4d4c4c", maxWidth: 820, lineHeight: 1.35 }}>
            Strategy, design and technology for ambitious brands.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(6,6,18,0.12)",
            paddingTop: 28,
            fontSize: 22,
            color: "#4d4c4c",
          }}
        >
          <span>{site.address.display}</span>
          <span style={{ color: "#6f46d4", fontWeight: 600 }}>auralgraphix.com</span>
        </div>
      </div>
    ),
    size,
  );
}
