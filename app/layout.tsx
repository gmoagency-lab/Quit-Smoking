import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc 7 Ngày™ | Identity Shift™",
  description: "Bạn không thiếu ý chí. Hãy nhìn lại câu chuyện, nhận diện trigger và xây bản đồ hành động không khói thuốc bằng Identity Shift™.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bản Đồ Cai Thuốc 7 Ngày™",
    description: "Bạn không thiếu ý chí. Bạn cần một bản đồ.",
    type: "website",
    images: [{ url: "/og.png", width: 1734, height: 907, alt: "Bản Đồ Cai Thuốc 7 Ngày™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bản Đồ Cai Thuốc 7 Ngày™",
    description: "Bạn không thiếu ý chí. Bạn cần một bản đồ.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
