import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "./components/search/";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WiseBlend.AI",
  description: "WiseBlend.AI",
  icons: [{ rel: "icon", url: "icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SearchProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </SearchProvider>
  );
}
