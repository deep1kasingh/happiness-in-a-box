import { ImageResponse } from "next/og";

export const alt = "Happiness in a Box — Daily paths for mind, body and breath";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#fef7ee",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "#ed751a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            color: "white",
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          H
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#1c1917",
            letterSpacing: "-0.025em",
          }}
        >
          Happiness in a Box
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#78716c",
            marginTop: 16,
          }}
        >
          Daily paths for mind, body and breath. Track your streak and grow.
        </div>
      </div>
    ),
    { ...size },
  );
}
