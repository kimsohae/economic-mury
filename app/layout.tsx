import MainScreen from "@/components/MainScreen";
import { UserProvider } from "@/state/UserContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../public/font/Pretendard-Medium.subset.woff2",
      weight: "500",
    },
    {
      path: "../public/font/Pretendard-Bold.subset.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const moneygraphy = localFont({
  src: "../public/font/Moneygraphy-Rounded.woff2",
  display: "swap",
  weight: "400",
  variable: "--font-moneygraphy",
});

export const metadata: Metadata = {
  title: "경제 머리 테스트",
  description: "나의 경제 머리 상태는?",
  openGraph: {
    images: [`${process.env.NEXT_PUBLIC_ROOT_URL}/img/title.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-slate-50">
      <body
        className={`${pretendard.variable} ${moneygraphy.className} antialiased bg-slate-50 `}
      >
        <UserProvider>
          <MainScreen>{children}</MainScreen>
        </UserProvider>
      </body>
    </html>
  );
}
