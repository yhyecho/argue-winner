import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "吵架包赢 - AI 帮你怼回去",
  description: "输入对方说的话，AI 帮你生成机智的吵架回复，让你在争论中占上风",
  keywords: ["吵架", "回复", "AI助手", "怼人神器"],
  authors: [{ name: "Argue Winner" }],
  openGraph: {
    title: "吵架包赢 - AI 帮你怼回去",
    description: "输入对方说的话，AI 帮你生成机智的吵架回复",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#07C160",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
