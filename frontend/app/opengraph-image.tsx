import { ImageResponse } from "next/og";

export const alt = "Creative Monk — Own your growth.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#181A1C",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 28, height: 28, background: "#FB4A0A" }} />
          <div style={{ color: "#F4F5F6", fontSize: 30, fontWeight: 700 }}>
            Creative Monk
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              color: "#F4F5F6",
              fontSize: 132,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Own your growth
            <div
              style={{
                width: 56,
                height: 56,
                background: "#FB4A0A",
                marginLeft: 18,
                marginBottom: 12,
              }}
            />
          </div>
          <div style={{ color: "#A0A4AA", fontSize: 34, marginTop: 28 }}>
            Brand · Web · Performance · Motion — a creative & growth studio.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
