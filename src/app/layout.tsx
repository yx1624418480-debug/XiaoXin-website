import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
    title: {
        default: "小星同学TX | 短视频编导 & AI 探索小白",
        template: "%s | 小星同学TX"
    },

    description: "小星同学TX 的个人网站 —— 短视频编导，AI 探索小白。记录 AI 科普图文、美食视频与一路升级打怪的支线任务。",
    keywords: ["小星同学TX", "短视频编导", "AI 科普", "个人网站", "作品集"],

    authors: [{
        name: "小星同学TX"
    }],

    openGraph: {
        title: "小星同学TX | 短视频编导 & AI 探索小白",
        description: "一个短视频编导的个人小站：AI 科普图文、美食视频，和一路升级的支线任务。",
        locale: "zh_CN",
        type: "website"
    },

    robots: {
        index: true,
        follow: true
    }
};

export default function RootLayout(
    {
        children
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    return (
        <html lang="zh-CN" data-scroll-behavior="smooth">
            <body className="min-h-screen font-sans text-ink antialiased">
                <Navbar />
                <main
                    className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-28 sm:px-8 lg:px-12 md:pt-32"
                    style={{
                        backgroundColor: "#F0F0F0"
                    }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}