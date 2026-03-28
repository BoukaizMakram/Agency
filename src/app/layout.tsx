import type { Metadata } from "next";
import { inter, sora } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snowflake | Digital Agency",
  description:
    "We craft digital experiences that blend strategy, design, and technology to help brands thrive in the modern world.",
  keywords: [
    "digital agency",
    "web design",
    "branding",
    "UI/UX",
    "development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} style={{ colorScheme: "light" }}>
      <body className="min-h-screen antialiased bg-white text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
