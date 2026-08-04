import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc Lá 7 Ngày™ | Identity Shift™",
  description: "Hành trình 7 ngày giúp bạn nhìn rõ vòng lặp hút thuốc, xây Bản đồ Cai thuốc Cá nhân và bắt đầu sống như một người không còn cần đến điếu thuốc.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Đừng tiếp tục cố gắng nhịn hút. Hãy nhìn rõ vòng lặp và bắt đầu sống như một người không còn cần đến điếu thuốc.",
    type: "website",
    images: [{ url: "/og-identity.png", width: 1730, height: 909, alt: "Bản Đồ Cai Thuốc Lá 7 Ngày™ — Đừng tiếp tục cố gắng nhịn hút" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Đừng tiếp tục cố gắng nhịn hút. Hãy nhìn rõ vòng lặp và bắt đầu sống như một người không còn cần đến điếu thuốc.",
    images: ["/og-identity.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
