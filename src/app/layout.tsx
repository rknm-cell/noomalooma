import "~/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Schoolbell } from "next/font/google";

export const metadata: Metadata = {
  title: "NoomaLooma",
  description: "Play Log - Capture your daily play moments",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-schoolbell",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${schoolbell.variable}`}>
      <body className="font-jakarta font-bold bg-main">{children}</body>
    </html>
  );
}
