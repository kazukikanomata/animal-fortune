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
        <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 shadow-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-1">みにしみ動物占い🔮</h1>
            <p className="text-blue-100">~あなたの性格を12の質問で診断~</p>
          </div>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
