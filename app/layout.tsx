import type { Metadata } from "next";
import { Be_Vietnam_Pro, Manrope } from "next/font/google";
import "./globals.css";

const body = Be_Vietnam_Pro({ variable: "--font-body", subsets: ["latin", "vietnamese"], weight: ["400","500","600","700"] });
const display = Manrope({ variable: "--font-display", subsets: ["latin","vietnamese"], weight: ["500","600","700","800"] });

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "1675148560210565";

export const metadata: Metadata = {
  title: "IDENTITY DESIGN™ — Tái Lập Bản Thân, Reset Hệ Điều Hành",
  description: "Bật mã nguồn căn tính mới: Tại sao bạn không thể bứt phá dù đã thử đủ mọi cách? 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "IDENTITY DESIGN™ — Tái Lập Bản Thân, Reset Hệ Điều Hành",
    description: "Bật mã nguồn căn tính mới: Tại sao bạn không thể bứt phá dù đã thử đủ mọi cách? 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững.",
    type: "website",
    images: [{ url: "/og-identity.png", width: 1730, height: 909, alt: "IDENTITY DESIGN™" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IDENTITY DESIGN™ — Tái Lập Bản Thân, Reset Hệ Điều Hành",
    description: "Bật mã nguồn căn tính mới: Tại sao bạn không thể bứt phá dù đã thử đủ mọi cách? 3 bước đơn giản giúp bạn thay đổi con người bên trong để đạt kết quả bền vững.",
    images: ["/og-identity.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* META / FACEBOOK PIXEL BASE CODE (ID: 1675148560210565) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
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
