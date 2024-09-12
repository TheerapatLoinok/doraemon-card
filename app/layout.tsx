import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import Provider from "./components/mantine-provider/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Doraemon card game",
  description:
    "Doraemon card game is a popular game to play in social gatherings or parties. It is a fun and uncomplicated game to play. It is suitable for groups of friends who want to create a lively and fun atmosphere.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "https://theerapatloinok.github.io/doraemon-card/favicon/favicon-32x32.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
