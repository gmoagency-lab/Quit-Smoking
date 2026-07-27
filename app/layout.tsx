import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc 7 Ngày™ | Identity Shift™",
  description: "Xây bản đồ cá nhân giúp nhận diện trigger, xử lý cơn thèm và bắt đầu hành trình không khói thuốc bằng Identity Shift™.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
