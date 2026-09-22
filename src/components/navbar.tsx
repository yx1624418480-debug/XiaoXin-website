"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { navItems } from "@/data/site";

export function Navbar() {
    const pathname = usePathname();
    const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
            <nav
                aria-label="主导航"
                className="flex w-full max-w-[910px] items-center rounded-full border-brutal bg-paper px-5 py-3 shadow-brutal sm:px-7"
                style={{
                    backgroundColor: "#FFFFFF"
                }}>
                {/* 四个 Tab 成组居中、间距略收窄；胶囊略短、略高 */}
                <ul className="flex flex-1 items-center justify-center gap-4 sm:gap-11">
                    {navItems.map(item => {
                        const active = isActive(item.href);

                        return (
                            <li key={item.href} className="flex justify-center">
                                <Link
                                    href={item.href}
                                    className={`inline-block px-2.5 py-1 text-sm font-bold transition-all sm:px-3 sm:text-base ${active ? "rounded-[2px] border-brutal-thin bg-white text-ink shadow-brutal-sm" : "rounded-full px-3 py-1.5 text-ink/70 hover:bg-ink/5 hover:text-ink"}`}>
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <Link
                    href="mailto:1624418480@qq.com"
                    aria-label="发邮件给小星"
                    className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition-transform hover:-translate-y-0.5 sm:ml-4">
                    <Mail className="h-6 w-6" strokeWidth={2.4} />
                </Link>
            </nav>
        </header>
    );
}