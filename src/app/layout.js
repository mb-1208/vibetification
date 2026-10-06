import { Google_Sans_Flex, Google_Sans_Code, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";

// Google Sans Flex: the typeface family labs.google is set in. The opsz/wdth axes
// let display headlines tighten optically while body copy stays open and readable.
const sans = Google_Sans_Flex({
  variable: "--font-gsans",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

// Monospace sibling from the same family, so CLI output feels native to the brand.
const mono = Google_Sans_Code({
  variable: "--font-gcode",
  subsets: ["latin"],
  display: "swap",
});

// Editorial italic, used sparingly for one accent phrase per headline.
const serif = Instrument_Serif({
  variable: "--font-iserif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "Vibetification · Stop babysitting your coding agents",
  description:
    "Biarkan AI menyelesaikan refactor dan test di laptopmu selagi kamu beranjak dari meja. Vibetification mengirim notifikasi ringkasan status ke HP atau smartwatch, memberi kendali penuh untuk approve atau revisi kode dalam satu kali tap.",
  keywords: [
    "vibetification",
    "coding agents",
    "claude code",
    "cursor agent",
    "autonomous agents",
    "smartwatch push",
    "developer tools",
  ],
  authors: [{ name: "Vibetification Team" }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f6f5f1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
