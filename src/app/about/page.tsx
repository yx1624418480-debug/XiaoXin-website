import type { Metadata } from 'next';
import { aboutParagraphs } from '@/data/site';
import { IdCard } from '@/components/id-card';
import { RecentUpdates } from '@/components/recent-updates';
import { Timeline } from '@/components/timeline';
import { StatementBanner } from '@/components/statement-banner';

export const metadata: Metadata = {
  title: '关于我',
  description: '欢迎来到小星的世界 —— 一个短视频编导的自我介绍与成长时间线。',
};

export default function AboutPage() {
  return (
    <div className="space-y-20">
      {/* 顶部：标题 + 自我介绍 + ID CARD（收窄居中，两栏靠拢） */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1.05fr_1fr]">
        <div className="animate-pop-in">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            <span className="font-display">Welcome to</span>
            <br />
            <span className="hl-blue inline-block rotate-1 rounded-sm font-display font-bold tracking-normal">
              小星的世界！
            </span>
          </h1>

          <div className="mt-8 space-y-6 text-lg font-semibold leading-[1.9] text-[#3a4556] sm:text-xl">
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <IdCard />
      </section>

      {/* Slogan 横幅（打字机效果） */}
      <StatementBanner />

      {/* 近日生活 */}
      <section>
        <RecentUpdates />
      </section>

      {/* 时间线 */}
      <section>
        <Timeline />
      </section>
    </div>
  );
}
