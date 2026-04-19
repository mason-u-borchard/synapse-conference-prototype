import { ImageResponse } from "next/og";
import { meta } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "#faf6ef",
          color: "#1e0e22",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              background: "#0f0716",
              color: "#f0e1b9",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 2, textTransform: "uppercase", fontFamily: "sans-serif" }}>
            The Synapse &middot; Atlanta &middot; {meta.edition}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.04, fontStyle: "italic", letterSpacing: -1 }}>
            Where women connect mind, machine, and what comes next.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#4a3a52", fontFamily: "sans-serif", maxWidth: 900 }}>
            {meta.dates.display} &middot; {meta.city}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
