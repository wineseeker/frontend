import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {CustomFlowbiteTheme, Flowbite} from "flowbite-react";
import { ThemeProvider } from 'next-themes';

const pretendard = localFont({
    src: '../../fonts/PretendardVariable.woff2',
    display: 'swap',
    fallback: ['sans-serif'],
    variable: '--font-pretendard',
})

//기본적으로 나타나는 메타데이터로 페이지별로 알맞은 메타데이터를 할당해야 합니다.
export const metadata: Metadata = {
    title: {
        template: "%s - 와인 시커",
        default: "와인 시커"
    },
    description: "입문자도 쉽게 자신이 원하는 와인을 추천하는 사이트 입니다",
};

const customTheme: CustomFlowbiteTheme = {
    button: {
        color: {
            rose: "text-white bg-rose-600 enabled:hover:bg-rose-700 dark:bg-rose-700 dark:enabled:hover:bg-rose-800 focus:ring-4 focus:ring-rose-500 dark:focus:ring-rose-600",
        },
    },
    checkbox: {
        root: {
            color: {
                rose: "text-rose-600 focus:ring-rose-600 dark:text-rose-700 dark:focus:ring-rose-600"
            },
        }
    },
    textInput: {
        field: {
            input: {
                colors: {
                    rose: "border-gray-300 bg-gray-50 text-gray-900 focus:border-rose-500 focus:ring-rose-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-rose-600 dark:focus:border-rose-600 dark:focus:ring-rose-600"
                }
            }
        }
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    //공통된 루트 레이아웃 여기에 작성
    <html lang="ko" className={`${pretendard.variable}`} suppressHydrationWarning>
        <head>
            <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#b91d47"/>
            <meta name="msapplication-TileColor" content="#b91d47"/>
        </head>
        <body className={"dark:bg-gray-900 dark:text-gray-400"}>
            <ThemeProvider attribute="class" storageKey={"flowbite-theme-mode"}>
                <Flowbite theme={{ theme: customTheme }}>
                    {children}
                </Flowbite>
            </ThemeProvider>
        </body>
    </html>
  );
}
