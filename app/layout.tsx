import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc Lá 7 Ngày™ | Kế hoạch cai thuốc cá nhân",
  description: "Bạn không thiếu ý chí. Bạn đang thiếu một kế hoạch cho đúng những lúc mình dễ hút lại nhất. 7 ngày để xác định ngày bỏ thuốc, xây protocol vượt qua cơn thèm và chuẩn bị kế hoạch 21 ngày.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Bạn không thiếu ý chí. Bạn đang thiếu một kế hoạch cho đúng những lúc mình dễ hút lại nhất.",
    type: "website",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Bản Đồ Cai Thuốc Lá 7 Ngày™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bản Đồ Cai Thuốc Lá 7 Ngày™",
    description: "Bạn không thiếu ý chí. Bạn đang thiếu một kế hoạch cho đúng những lúc mình dễ hút lại nhất.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
