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
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700, color: "#f4f6f1" }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#273f2b" />
            <path
              d="M32 11 54 53H43.5L39.2 43.5H24.8L20.5 53H10ZM32 26.5 35.8 35H28.2Z"
              fill="#87e64b"
              fillRule="evenodd"
              stroke="#87e64b"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          {site.wordmark}
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
