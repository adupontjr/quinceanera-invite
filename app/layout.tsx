import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Sacramento } from "next/font/google";
import "./globals.css";
import LanguageProvider from "./components/LanguageProvider";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Monoline script, closest match to the hand-lettered name on the printed invite.
const script = Sacramento({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Annika's Quinceañera · October 17, 2026",
  description:
    "Please join us in celebrating Annika's fifteenth birthday. Saturday, October 17, 2026 at 6:00 pm in Perris, California.",
  openGraph: {
    title: "Annika's Quinceañera",
    description: "Saturday, October 17, 2026 at 6:00 pm · Perris, California",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${script.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
