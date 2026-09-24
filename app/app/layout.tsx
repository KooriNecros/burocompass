import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuroCompass",
  description: "Assistente digitale per stranieri in Italia · Digital guide to Italian bureaucracy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
