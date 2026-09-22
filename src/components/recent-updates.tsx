import { BookOpen, PlayCircle, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import type { RecentItem } from '@/data/site';
import { recentUpdates } from '@/data/site';
import {
  DoodleCurveArrow,
  DoodleArrowSolid,
  DoodleBolt,
  DoodleDiamond,
  DoodleDot,
  DoodleStar,
} from '@/components/doodles';

const iconMap = {
  book: BookOpen,
  video: PlayCircle,
  sparkles: Sparkles,
};

type Accent = {
  base: string; // 彩色立体底层
  icon: string; // 实心图标块（饱和色，白图标）
  hex: string; // 主题色（用于下划线等内联样式）
};

const accentMap: Record<RecentItem['color'], Accent> = {
  blue: {
    base: 'bg-[#3b82f6]',
    icon: 'bg-[#3b82f6]',
    hex: '#3b82f6',
  },
  pink: {
    base: 'bg-[#ec4899]',
    icon: 'bg-[#ec4899]',
    hex: '#ec4899',
  },
  green: {
    base: 'bg-[#22c55e]',
    icon: 'bg-[#22c55e]',
    hex: '#22c55e',
  },
};

// 每张卡周围的手绘涂鸦
const decorMap: Record<string, ReactNode> = {
  reading: (
    <>
      <DoodleStar className="absolute -left-3 -top-7 h-9 w-9 text-ink" />
      <DoodleStar className="absolute left-[22%] -top-4 h-8 w-8 text-ink" />
      <DoodleDot className="absolute left-[14%] -top-2 h-3.5 w-3.5 text-ink" />
      <DoodleArrowSolid className="absolute right-3 -top-3 h-7 w-12 rotate-[-10deg] text-ink" />
      <DoodleDiamond className="absolute -bottom-5 -left-2 h-4 w-4 text-ink" />
    </>
  ),
  watching: (
    <>
      <DoodleBolt className="absolute right-10 -top-7 h-9 w-9 text-[#ec4899]" />
      <DoodleStar className="absolute -right-3 top-1/2 h-8 w-8 text-ink" />
      <DoodleBolt className="absolute -left-4 -bottom-6 h-9 w-9 text-[#3b82f6]" />
      <DoodleArrowSolid className="absolute right-14 top-[42%] h-7 w-12 rotate-[70deg] text-ink" />
    </>
  ),
  interested: (
    <>
      <DoodleBolt className="absolute right-14 -top-7 h-9 w-9 text-[#ec4899]" />
      <DoodleBolt className="absolute right-2 -top-5 h-8 w-8 text-[#ec4899]" />
      <DoodleDiamond className="absolute right-6 -top-4 h-4 w-4 text-ink" />
      <DoodleStar className="absolute right-6 -bottom-6 h-9 w-9 text-ink" />
      <DoodleStar className="absolute -right-4 -bottom-7 h-8 w-8 text-ink" />
    </>
  ),
};

function RecentCard({
  item,
  tilt = '',
  lift = '',
}: {
  item: RecentItem;
  tilt?: string;
  lift?: string;
}) {
  const Icon = iconMap[item.icon];
  const accent = accentMap[item.color];
  return (
    <div className={`relative ${tilt} ${lift}`}>
      <div className="group relative">
        {/* 周围手绘涂鸦 */}
        {decorMap[item.key]}
        {/* 彩色立体底层：默认底部多露出；hover 时往下轻移 */}
        <div
          aria-hidden
          className={`absolute inset-0 rounded-3xl border-brutal ${accent.base} translate-x-[6px] translate-y-[16px] transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[7px] group-hover:translate-y-[19px]`}
        />
        {/* 白卡 + 黑色投影：作为一个整体，hover 同步上抬 */}
        <div className="relative transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1.5">
          {/* 黑色阴影层（白卡的硬投影） */}
          <div
            aria-hidden
            className="absolute inset-0 translate-x-[3px] translate-y-[6px] rounded-3xl border-brutal bg-ink"
          />
          {/* 白色卡面 */}
          <div className="relative rounded-3xl border-brutal bg-white p-5">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg border-brutal ${accent.icon} text-white shadow-[3px_3px_0_0_#111]`}
              >
                <Icon className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <span className="text-base font-bold">{item.label}</span>
            </div>
            <div className="mt-6 flex justify-center">
              <p
                className="inline-block pb-1 text-lg font-bold leading-snug"
                style={{ borderBottom: `3px solid ${accent.hex}` }}
              >
                {item.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecentUpdates() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* 粉色倾斜横幅标题（独立静态包裹层负责倾斜，宽度贴合文字） */}
      <div className="relative mb-12 inline-block -rotate-2">
        <DoodleStar className="absolute -top-5 left-[42%] z-10 h-9 w-9 -translate-x-1/2 text-ink" />
        {/* 右下粉色偏移叠层：只露出薄薄的右侧与底边 */}
        <div
          aria-hidden
          className="absolute inset-0 border-brutal-thin bg-[#f472b6] translate-x-[5px] translate-y-[5px]"
        />
        {/* 主横幅：直角、细描边，字号与内边距同步缩小 */}
        <div className="relative whitespace-nowrap border-brutal-thin bg-[#f472b6] px-6 py-[13px] sm:px-8 sm:py-[17px]">
          <h3 className="text-[19px] font-bold tracking-tight sm:text-[28px]">
            近日生活 <span className="font-display">| RECENT UPDATES</span>
          </h3>
        </div>
      </div>

      <div className="relative grid gap-y-12 pb-8 sm:grid-cols-3 sm:gap-x-24">
        <RecentCard item={recentUpdates[0]} tilt="-rotate-2" lift="mt-2" />
        <DoodleCurveArrow className="pointer-events-none absolute left-[31%] top-[26%] z-10 hidden h-9 w-16 -translate-y-1/2 text-ink/70 sm:block" />
        <RecentCard item={recentUpdates[1]} tilt="rotate-1" lift="-mt-1" />
        <DoodleCurveArrow className="pointer-events-none absolute left-[66%] top-[48%] z-10 hidden h-9 w-16 -translate-y-1/2 -scale-y-100 text-ink/70 sm:block" />
        <RecentCard item={recentUpdates[2]} tilt="-rotate-1" lift="mt-1" />
      </div>
    </div>
  );
}
