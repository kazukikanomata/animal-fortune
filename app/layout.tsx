import type { Metadata } from "next";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Toaster } from "./components/toast";

const ZenKakuGothicNewFont = Zen_Kaku_Gothic_New({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "みにしみ動物占い",
  description: "Minisimi-Animal-Fortune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ZenKakuGothicNewFont.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
