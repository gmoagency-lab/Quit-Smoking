import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1675148560210565";

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
  return (
    <html lang="vi">
      <head>
        {/* META/FACEBOOK PIXEL BASE CODE (ID: 1675148560210565) */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt="Facebook Pixel"
          />
        </noscript>
      </head>
      <body className={`${body.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
