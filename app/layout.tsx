import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

export const metadata: Metadata = {
  title: "Bản Đồ Cai Thuốc 7 Ngày™ | Identity Shift™",
  description: "Dành cho người đã nhiều lần muốn cai nhưng vẫn quay lại. Lấy lại hơi thở, năng lượng và sự tự tin đã bị bào mòn sau nhiều năm hút thuốc.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Bản Đồ Cai Thuốc 7 Ngày™",
    description: "Dành cho người đã nhiều lần muốn cai nhưng vẫn quay lại. Lấy lại hơi thở, năng lượng và sự tự tin đã bị bào mòn sau nhiều năm hút thuốc.",
    type: "website",
    images: [{ url: "/og-identity.png", width: 1730, height: 909, alt: "Bản Đồ Cai Thuốc 7 Ngày™ — Identity Shift™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bản Đồ Cai Thuốc 7 Ngày™",
    description: "Dành cho người đã nhiều lần muốn cai nhưng vẫn quay lại. Lấy lại hơi thở, năng lượng và sự tự tin đã bị bào mòn sau nhiều năm hút thuốc.",
    images: ["/og-identity.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body className={`${body.variable} ${display.variable}`}>{children}</body></html>;
}
