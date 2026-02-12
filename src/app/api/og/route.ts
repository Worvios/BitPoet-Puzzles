import React from "react";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "BitPoet Puzzles";
  const score = searchParams.get("score") || "0";
  const badge = searchParams.get("badge") || "Daily Challenge";

  const root = React.createElement(
    "div",
    {
      style: {
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef2ff 0%, #ecfeff 45%, #f0fdf4 100%)",
        fontFamily: "Inter, sans-serif",
        padding: "60px",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "white",
          borderRadius: "32px",
          padding: "48px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.2)",
        },
      },
      React.createElement(
        "div",
        { style: { fontSize: 28, fontWeight: 600, color: "#4f46e5" } },
        badge
      ),
      React.createElement(
        "div",
        { style: { fontSize: 56, fontWeight: 700, color: "#0f172a" } },
        title
      ),
      React.createElement(
        "div",
        { style: { fontSize: 32, color: "#0f172a" } },
        `Score: ${score}`
      ),
      React.createElement(
        "div",
        { style: { fontSize: 20, color: "#64748b" } },
        "bitpoet.app · Share your win"
      )
    )
  );

  return new ImageResponse(root, { width: 1200, height: 630 });
}
