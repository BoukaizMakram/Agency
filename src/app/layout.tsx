import type { Metadata } from "next";
import { inter, sora } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snowflake Systems | Custom Software for Training Centers",
  description:
    "We build fully custom software for training centers and coaching businesses — student management, scheduling, payments, and more in one platform.",
  keywords: [
    "training center software",
    "coaching business platform",
    "student management system",
    "custom software",
    "scheduling software",
  ],
  icons: {
    icon: "/LOGO/favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} style={{ colorScheme: "light" }}>
      <body className="min-h-screen antialiased text-[#0A0A0A]">
        {children}
      </body>
    </html>
  );
}
