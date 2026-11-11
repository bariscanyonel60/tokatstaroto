import { ImageResponse } from "next/og";

export const alt = "Star Oto Market - Tokat";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Paylaşım görseli: koyu zemin, turuncu vurgu. (Yalnızca ASCII metin: varsayılan yazı tipiyle güvenli.) */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "radial-gradient(circle at 80% 80%, #3a2417 0%, #0A0A0C 60%)",
          color: "#F2F2F0",
        }}
      >
        <div style={{ width: 96, height: 6, background: "#FF681E", marginBottom: 32, display: "flex" }} />
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1, display: "flex" }}>STAR OTO MARKET</div>
        <div style={{ fontSize: 36, marginTop: 24, color: "#A5A7AD", letterSpacing: 6, display: "flex" }}>AKSESUAR &amp; DIZAYN - TOKAT</div>
      </div>
    ),
    size
  );
}
