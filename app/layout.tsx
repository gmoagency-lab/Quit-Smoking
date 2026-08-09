import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc Lá 7 Ngày™ — Từ lời hứa mơ hồ thành kế hoạch có thể thực hiện",
  description: "Lần này đừng hứa với bản thân rằng ông sẽ bỏ thuốc. Hãy có một kế hoạch cho lúc ông muốn hút: cà phê, stress, bàn nhậu và khi lỡ trượt.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Xây Bản Đồ Tác Chiến Cá Nhân trong 7 ngày để làm chủ cơn thèm thuốc lá khi uống cà phê, stress, bàn nhậu và xử lý khi lỡ trượt.",
    type: "website",
    images: [{ url: "/og-identity.png", width: 1730, height: 909, alt: "Bản Đồ Cai Thuốc Lá 7 Ngày™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Xây Bản Đồ Tác Chiến Cá Nhân trong 7 ngày để làm chủ cơn thèm thuốc lá khi uống cà phê, stress, bàn nhậu và xử lý khi lỡ trượt.",
    images: ["/og-identity.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
