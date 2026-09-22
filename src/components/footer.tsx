import Link from 'next/link';
import { navItems } from '@/data/site';
import { SocialButtons } from '@/components/social-buttons';

const footerLabels: Record<string, string> = {
  首页: 'Home',
  关于我: 'About',
  文章: 'Articles',
  视频: 'Videos',
};

export function Footer() {
  const year = 2026;
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto w-[92%] max-w-[1100px] sm:w-[82%] lg:w-[67.5%]">
        {/* 三列：起点 0% / 52% / 78%，用列宽 52fr / 26fr / 22fr 实现 */}
        <div className="grid gap-12 pt-[15%] sm:pt-[11%] lg:grid-cols-[52fr_26fr_22fr] lg:gap-0 lg:pt-[7.5%]">
          {/* 左侧介绍 */}
          <div>
            <h2 className="font-display text-[24px] font-bold leading-[1.2] text-white sm:text-[26px] lg:text-[28px]">
              Let&apos;s build something
              <br />
              extraordinary together.
            </h2>
            <p className="mt-9 text-[15px] leading-relaxed text-[#9CA3AF]">
              先完成，再完美——一起做点有意思的东西吧！
            </p>
          </div>

          {/* Explore 导航（无 Products：站内暂无对应真实页面） */}
          <div>
            <div className="inline-block w-fit">
              <h3 className="text-[17px] font-bold text-white">Explore</h3>
              <span className="mt-1 block h-[2px] w-full bg-[#EC4899]" aria-hidden="true" />
            </div>
            <ul className="mt-6 space-y-[14px]">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#9CA3AF] transition-colors hover:text-white"
                  >
                    {footerLabels[item.label] ?? item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect 社交 */}
          <div>
            <div className="inline-block w-fit">
              <h3 className="text-[17px] font-bold text-white">Connect</h3>
              <span className="mt-1 block h-[2px] w-full bg-[#3B82F6]" aria-hidden="true" />
            </div>
            <div className="mt-8">
              <SocialButtons variant="footer" />
            </div>
          </div>
        </div>

        {/* 分隔线（仅内部容器宽）与版权区 */}
        <div className="pt-16">
          <hr className="border-0 border-t border-[#1F2937]" />
          <div className="pb-16 pt-[42px] text-center">
            <p className="text-[13px] text-[#6B7280]">
              © {year} 小星同学TX. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
