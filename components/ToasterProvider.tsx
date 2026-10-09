"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      gutter={10}
      toastOptions={{
        duration: 3500,
        style: {
          fontFamily: "inherit",
          fontSize: "0.95rem",
          borderRadius: "0.75rem",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px -12px rgb(15 23 42 / 0.25)",
        },
        success: { iconTheme: { primary: "#0a8a3c", secondary: "#fff" } },
        error: { iconTheme: { primary: "#e11d48", secondary: "#fff" } },
      }}
    />
  );
}
