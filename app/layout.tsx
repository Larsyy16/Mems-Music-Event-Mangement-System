import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "Mems: Your Ultimate Music Event Management Platform",
  description: "Join and discover music events with Mems. Our platform makes event management seamless, bringing music lovers together for unforgettable experiences.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
  metadataBase: new URL ('https://mems-music-event-mangement-system.vercel.app/')
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
