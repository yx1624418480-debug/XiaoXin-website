import type { CSSProperties } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserRound, ArrowRight, CalendarDays } from 'lucide-react';
import { profile, articles, videos, type Article } from '@/data/site';
import { DoodleStar, DoodleBolt, DoodleDot } from '@/components/doodles';
import { VideoCard } from './videos/videos-client';

const articleBg: Record<Article['color'], string> = {
  pink: 'bg-brutal-pink',
  blue: 'bg-brutal-blue',
  green: 'bg-brutal-green',
  yellow: 'bg-brutal-yellow',
  purple: 'bg-brutal-purple',
};

function BrowseAll({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-display text-base font-bold text-ink sm:text-lg"
    >
      {label}
      <ArrowRight
        className="h-[1.05em] w-[1.05em] transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={2.6}
      />
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1260px]">
    <section className="grid items-center gap-10 px-3 pr-3 md:grid-cols-[1.15fr_1fr] md:gap-8 sm:pr-6">
      {/* 左侧文案 */}
      <div className="animate-pop-in">
        <h1 className="text-4xl font-bold leading-[1.25] sm:text-6xl lg:text-7xl">
          我是
          <br />
          <span className="hl-pink inline-block -rotate-1 font-display font-bold tracking-normal">
            {profile.name}
          </span>
          <span className="hl-comma">，</span>
          <br />
          <span className="inline-block whitespace-nowrap text-[1.45rem] sm:text-[2.5rem] lg:text-[3.4rem]">
            <span className="font-display">{profile.roleEn}</span>
            <span className="hl-comma">，</span>
          </span>
          <br />
          练习时长{' '}
          <span className="hl-blue inline-block rotate-1 font-display font-bold tracking-normal">
            {profile.practiceTime}
          </span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-bold text-ink/70 sm:text-base">
          {profile.heroTags.map((t, i) => (
            <span key={t} className="flex items-center gap-2">
              {i > 0 && <DoodleDot className="h-1.5 w-1.5 text-brutal-pink" />}
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">{profile.heroNote}</p>

        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 rounded-full border-brutal bg-ink px-6 py-3 font-bold text-paper shadow-brutal brutal-hover hover:brutal-hover-active"
        >
          <UserRound className="h-5 w-5" strokeWidth={2.4} />
          More about me
        </Link>
      </div>

      {/* 右侧头像卡 */}
      <div className="relative mx-auto w-full max-w-lg animate-pop-in">
        <DoodleStar className="absolute -left-6 -top-6 h-10 w-10 text-brutal-yellow animate-floaty" />
        <DoodleBolt className="absolute -right-5 top-10 h-8 w-8 text-brutal-blue animate-wiggle" />
        <DoodleStar className="absolute -bottom-5 right-8 h-7 w-7 text-brutal-pink animate-floaty" />

        <div className="rotate-1 overflow-hidden rounded-3xl border-brutal bg-brutal-pink/30 shadow-brutal-lg transition-[scale] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03]">
          <Image
            src={profile.avatar}
            alt={`${profile.name} 的卡通头像`}
            width={512}
            height={512}
            priority
            className="aspect-square w-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* 文章精选（全宽浅灰底，宽度与内容区对齐，避免 100vw 含滚动条导致与 Hero 错位） */}
    <section className="mt-24 w-full bg-[#F0F0F0] py-16 sm:mt-28 sm:py-20">
      <div className="mx-auto w-full max-w-[1260px] pl-3 pr-6 sm:pl-3 sm:pr-8">
        <div className="flex items-end justify-between gap-4">
          {/* Articles 直角大贴纸标题：白面板 + 鲜粉底板，无额外黑阴影 */}
          <div className="relative inline-block">
            <div aria-hidden className="absolute -bottom-2 -right-2 top-2 left-2 border-[3px] border-ink bg-[#F472B6]" />
            <h2 className="relative inline-block whitespace-nowrap border-[3px] border-ink bg-white px-4 py-1.5 font-display text-5xl font-black leading-none tracking-tight sm:px-5 sm:py-2 sm:text-[60px]">
              Articles
            </h2>
          </div>
          <BrowseAll href="/articles" label="Browse all articles" />
        </div>

        {/* 三列等宽近方形卡片；标题底到卡片顶 ≈ 卡宽 15% */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:mt-14 lg:grid-cols-3 lg:gap-[40px]">
          {articles.slice(0, 3).map((a) => (
            <div
              key={a.id}
              className="group relative"
              style={{ "--home-card-press": "8px" } as CSSProperties}
            >
              {/* 固定黑色底座 */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[10%] bg-ink [transform:translate(var(--home-card-press),var(--home-card-press))]"
              />
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex aspect-[0.96/1] w-full flex-col overflow-hidden rounded-[10%] border-2 border-ink bg-white [transform:translate(0px,0px)] transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:translate(var(--home-card-press),var(--home-card-press))]"
              >
                {/* 封面 ≈ 60% 高：有真实封面图显示图片，否则色块 emoji */}
                {a.cover ? (
                  <div className="relative h-[60%] w-full shrink-0 overflow-hidden border-b-2 border-ink">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.cover}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-top [transform:scale(1)] [transform-origin:center] transition-transform duration-[300ms] ease-in-out delay-0 group-hover:[transform:scale(1.05)] group-hover:duration-[450ms] group-hover:delay-[80ms] group-focus-within:[transform:scale(1.05)] group-focus-within:duration-[450ms] group-focus-within:delay-[80ms]"
                    />
                  </div>
                ) : (
                  <div
                    className={`relative flex h-[60%] w-full shrink-0 items-center justify-center border-b-2 border-ink ${articleBg[a.color]}`}
                  >
                    <span className="text-6xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {a.emoji}
                    </span>
                  </div>
                )}

                {/* 文字区 ≈ 40% 高，左右内边距约卡宽 8% */}
                <div className="flex flex-1 flex-col justify-center px-[8%] py-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="border-2 border-ink bg-[#F472B6] px-2 py-0.5 text-xs font-bold text-ink">
                      {a.tag}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-ink/50">
                      <CalendarDays className="h-3.5 w-3.5" strokeWidth={2.4} />
                      {a.date}
                    </span>
                  </div>
                  <h3 className="mt-2.5 line-clamp-2 min-h-[2.6em] text-[clamp(15px,2.1vw,23px)] font-bold leading-snug text-ink transition-colors duration-[220ms] group-hover:text-[#2563EB]">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium leading-snug text-[#6B7280]">
                    {a.excerpt}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 视频精选 */}
    <section className="mt-24 sm:mt-28">
      <div className="pl-3 pr-6 sm:pl-3 sm:pr-8">
      <div className="flex items-end justify-between gap-4">
        {/* Videos 直角装饰标题：白色前面板 + 鲜蓝后面板，细黑描边，无厚阴影 */}
        <div className="relative inline-block">
          <div aria-hidden className="absolute -bottom-2 -right-2 top-2 left-2 border-[3px] border-ink bg-[#3B82F6]" />
          <h2 className="relative inline-block whitespace-nowrap border-[3px] border-ink bg-white px-4 py-1.5 font-display text-5xl font-black leading-none tracking-tight sm:px-5 sm:py-2 sm:text-[60px]">
            Videos
          </h2>
        </div>
        <div className="pb-[11px] sm:pb-[15px]">
          <Link
            href="/videos"
            className="inline-flex items-center gap-[0.6em] whitespace-nowrap font-display text-lg font-bold text-black no-underline sm:text-xl"
          >
            Watch all videos
            <ArrowRight className="h-[1.05em] w-[1.05em]" strokeWidth={2} />
          </Link>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[44px]">
        {videos.slice(0, 3).map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
      </div>
    </section>
    </div>
  );
}
