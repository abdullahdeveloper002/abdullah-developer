import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
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
          padding: 80,
          background: "#0c1510",
          color: "#f4f6f1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 56, fontWeight: 700, color: "#f4f6f1", letterSpacing: -1 }}>
          {site.wordmark}
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#87e64b", marginLeft: 8, marginTop: 20 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Web experiences that feel effortless.
          </div>
          <div style={{ fontSize: 36, color: "#a9b8ac" }}>{`${site.name} · ${site.role}`}</div>
        </div>
      </div>
    ),
    size,
  );
}
