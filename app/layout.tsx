import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { event } from "./config/event";

// Placeholder typefaces — will change with the final design direction.
const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${event.headline} — ${event.honoreeFirstName}'s Quinceañera`,
  description: `${event.tagline} ${event.honoreeFullName}. ${event.dateLabel}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
