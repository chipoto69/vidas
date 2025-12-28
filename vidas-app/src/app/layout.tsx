import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-cabinet",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-commit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIDAS | Reality, Rerendered",
  description: "Transform video into stunning ASCII art in real-time. WebGL-powered, Solana-enabled.",
  keywords: ["ASCII art", "video", "WebGL", "real-time", "Solana", "creative tool"],
  authors: [{ name: "VIDAS" }],
  openGraph: {
    title: "VIDAS | Reality, Rerendered",
    description: "Transform video into stunning ASCII art in real-time.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
