'use client';

import { useState, useMemo } from 'react';
import type { CSSProperties } from 'react';
import {
  ExternalLink,
  Bot,
  UtensilsCrossed,
  Eye,
  Heart,
} from 'lucide-react';
import { videos, formatCount, type Video, type VideoCategory } from '@/data/site';
import { SearchBar } from '@/components/search-bar';
import { DouyinIcon } from '@/lib/brutal';

const coverBg: Record<Video['color'], string> = {
  pink: 'bg-brutal-pink',
  blue: 'bg-brutal-blue',
  green: 'bg-brutal-green',
  yellow: 'bg-brutal-yellow',
  purple: 'bg-brutal-purple',
};

type Filter = VideoCategory;

// 分类按钮图标
const categoryIcon: Record<Filter, typeof Bot> = {
  美食: UtensilsCrossed,
  AI: Bot,
};

export function VideosClient() {
  const [query, setQuery] = useState('');
  // 仅保留两个板块：美食 / AI（“AI”暂无视频，保留入口，后续添加）
  const categories: Filter[] = ['美食', 'AI'];
  const [filter, setFilter] = useState<Filter>('美食');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos.filter((v) => {
      const matchCategory = v.category === filter;
      const matchQuery = !q || v.title.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [query, filter]);

  return (
    /* 全宽出血层：抵消 main 的水平内边距与宽度限制（导航栏在 main 外，宽度独立） */
    <div className="w-screen -translate-x-1/2 ml-[50%] pt-2 md:pt-5 lg:pt-6">
      {/* 唯一居中主体容器：标题/副标题/分类/搜索/网格共用，桌面约占视口 73%、两侧各 13.5% */}
      <div className="mx-auto w-[73%] max-w-[1400px] px-2 sm:px-4 lg:px-0">
        {/* 标题 + 副标题（左） / 搜索框（右，与副标题同高） */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="whitespace-nowrap text-[56px] font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-[90px]">
              <span className="text-ink">Video</span>{' '}
              {/* Library：蓝底白字、细黑描边、直角，整体顺时针倾斜 ~2deg，无额外黑阴影 */}
              <span className="ml-1 inline-block rotate-2 border-[3px] border-ink bg-[#3B82F6] px-3 text-white">
                Library
              </span>
            </h1>
            <p className="mt-6 text-lg font-bold text-[#56606F] sm:text-xl lg:mt-7">
              美食博主时期的做饭日常，记录把生活煮成一顿好饭的日子。
            </p>
          </div>

          {/* 搜索框宽约主体 25%，沿用按压动效、更轻底座 */}
          <div className="w-full shrink-0 lg:w-[clamp(280px,25%,360px)]">
            <SearchBar value={query} onChange={setQuery} placeholder="搜索视频..." press={4} />
          </div>
        </div>

        {/* 分类筛选行：等宽等高固定尺寸，悬停即下压（固定黑底座 + 上层面板移动），选中态只管颜色 */}
        <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-12 lg:gap-[18px]">
          {categories.map((c) => {
            const Icon = categoryIcon[c];
            const active = filter === c;
            return (
              <div
                key={c}
                className="group relative"
                style={{ '--cat-press': '4px' } as CSSProperties}
              >
                {/* 固定黑色底座：不移动、不拦截事件；厚度 = --cat-press */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[12px] bg-ink [transform:translate(var(--cat-press),var(--cat-press))]"
                />
                <button
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  className={`relative flex h-[54px] w-[140px] items-center justify-center gap-2 rounded-[12px] border-2 border-ink text-sm font-bold transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] sm:h-[60px] sm:w-[150px] sm:text-base ${
                    active
                      ? `${c === 'AI' ? 'bg-[#3B82F6]' : 'bg-[#F9689D]'} text-white [transform:translate(var(--cat-press),var(--cat-press))] focus-visible:[transform:translate(var(--cat-press),var(--cat-press))]`
                      : 'bg-white text-ink [transform:translate(0px,0px)] group-hover:[transform:translate(var(--cat-press),var(--cat-press))] focus-visible:[transform:translate(var(--cat-press),var(--cat-press))]'
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.6} />
                  {c}
                </button>
              </div>
            );
          })}
        </div>

        {/* 视频卡片墙：三列等宽，列距约卡宽 10%（按钮底部到网格顶部净空增大约 1.5 倍） */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-[68px] lg:grid-cols-3 lg:gap-[44px]">
          {filtered.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-14 rounded-3xl border-brutal bg-white p-10 text-center shadow-brutal">
            <p className="text-4xl">🎬</p>
            <p className="mt-3 font-bold">没有找到相关视频，换个关键词或分类试试～</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function VideoCard({ video: v }: { video: Video }) {
  return (
    <div className="group relative" style={{ '--video-press': '8px' } as CSSProperties}>
      {/* 固定黑色底座：偏移约卡宽 2%，纯黑无模糊，不拦截点击 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[10%] bg-ink [transform:translate(var(--video-press),var(--video-press))]"
      />
      <a
        href={v.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex aspect-[0.9/1] w-full flex-col overflow-hidden rounded-[10%] border-2 border-ink bg-white outline-none [transform:translate(0px,0px)] transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:translate(var(--video-press),var(--video-press))] focus-visible:[transform:translate(var(--video-press),var(--video-press))]"
      >
        {/* 封面 16:9，约占卡高一半；无真实封面时用色块 + emoji 占位 */}
        <div className={`relative flex aspect-video w-full shrink-0 items-center justify-center overflow-hidden border-b-2 border-ink ${coverBg[v.color]}`}>
          {/* 平台标签：黑底白字，位于遮罩上方 */}
          <span className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-md bg-ink px-2 py-0.5 text-[11px] font-bold text-white">
            <DouyinIcon className="h-3.5 w-3.5" />
            抖音
          </span>

          {v.cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={v.cover}
              alt={v.title}
              loading="lazy"
              className="h-full w-full object-cover [transform:scale(1)] [transform-origin:center] transition-transform duration-[300ms] ease-in-out delay-0 group-hover:[transform:scale(1.05)] group-hover:duration-[450ms] group-hover:delay-[80ms] group-focus-within:[transform:scale(1.05)] group-focus-within:duration-[450ms] group-focus-within:delay-[80ms]"
            />
          ) : (
            <span className="text-5xl">
              {v.emoji}
            </span>
          )}

          {/* 悬停半透明黑遮罩：只覆盖封面，不拦截点击 */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-35 group-focus-within:opacity-35"
          />
          {/* 中央圆形播放按钮：白底黑边黑三角，直径约封面宽 16%，悬停淡入 */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex aspect-square w-[16%] shrink-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-white p-0 opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 group-focus-within:opacity-100 [border-radius:50%] [box-sizing:border-box]">
            {/* 朝右等边三角：边长 80，外接框宽高比 0.866；可见高约圆圈 44%、宽约 38%；按重心居中并轻微右移做视觉修正 */}
            <svg
              viewBox="0 0 100 100"
              className="h-[51%] w-auto translate-x-[13%]"
              aria-hidden="true"
            >
              <path
                d="M15 10 L84.3 50 L15 90 Z"
                fill="#111111"
                stroke="#111111"
                strokeWidth="7"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* 时长标签：仅有真实时长时显示，位于遮罩上方 */}
          {v.duration && (
            <span className="absolute bottom-3 right-3 z-20 rounded-md bg-ink px-2 py-0.5 text-[11px] font-bold text-white">
              {v.duration}
            </span>
          )}
        </div>

        {/* 正文区，内边距约卡宽 8%，背景始终白色 */}
        <div className="flex flex-1 flex-col p-[8%]">
          <h2 className="line-clamp-2 min-h-[2.6em] text-[clamp(16px,1.35vw,24px)] font-bold leading-[1.3] text-ink transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[#2563EB] group-focus-within:text-[#2563EB]">
            {v.title}
          </h2>

          <div className="mt-auto pt-4">
            {/* 浅灰细虚线 */}
            <div className="border-t border-dashed border-[#E5E7EB]" />
            <div className="flex items-center justify-between pt-4">
              {/* 播放量 / 点赞数：蓝眼 / 粉心 + 深灰粗体；不随悬停变色；缺失显示“—” */}
              <span className="flex items-center gap-3 text-xs font-bold text-[#56606F] sm:text-sm">
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-[#3B82F6]" strokeWidth={2.4} />
                  {v.viewCount === undefined ? '—' : formatCount(v.viewCount)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-4 w-4 text-[#EC4899]" strokeWidth={2.4} />
                  {v.likeCount === undefined ? '—' : formatCount(v.likeCount)}
                </span>
              </span>

              {/* 外链按钮：黄底黑图标 → 悬停黑底白图标 */}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-[#FACC15] text-ink transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-ink group-hover:text-white group-focus-within:bg-ink group-focus-within:text-white">
                <ExternalLink className="h-4 w-4" strokeWidth={2.6} />
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
