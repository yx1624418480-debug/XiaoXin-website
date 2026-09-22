'use client';

import { useState, useMemo, useEffect, type CSSProperties } from 'react';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { articles, type Article } from '@/data/site';
import { SearchBar } from '@/components/search-bar';

const tagBg: Record<Article['color'], string> = {
  pink: 'bg-brutal-pink',
  blue: 'bg-brutal-blue',
  green: 'bg-brutal-green',
  yellow: 'bg-brutal-yellow',
  purple: 'bg-brutal-purple',
};

const INITIAL_COUNT = 5;

export function ArticlesClient() {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q),
    );
  }, [query]);

  // 搜索时重置为折叠状态
  useEffect(() => {
    setExpanded(false);
  }, [query]);

  const visibleArticles = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hasMore = filtered.length > visibleArticles.length;

  return (
    <div>
      {/* 标题 + 副标题 + 搜索框（1000px 队列，左边缘对齐） */}
      <div className="mx-auto max-w-[1000px] pt-10 sm:pt-8">
        <h1 className="flex flex-wrap items-baseline gap-x-3 text-6xl font-black leading-none text-ink sm:gap-x-5 sm:text-[84px]">
          <span className="font-display">The</span>
          <span className="font-display inline-block -rotate-1 rounded-[3px] border-2 border-ink bg-[#43DD7C] px-3 py-1 leading-none sm:px-4">
            Journal
          </span>
        </h1>
        <p className="mt-6 text-base font-semibold text-[#56606F] sm:text-lg">
          一个编导的 AI 学习笔记，把复杂的 AI 讲成大白话。
        </p>

        <div className="mb-10 mt-12 w-full">
          <SearchBar value={query} onChange={setQuery} placeholder="搜索文章标题或关键词..." />
        </div>
      </div>

      {/* 文章卡片列表（与头部同宽） */}
      <div className="mx-auto max-w-[1000px] space-y-6">
        {visibleArticles.map((a) => (
          <div
            key={a.id}
            className="group relative"
            style={{ "--card-press": "5px" } as CSSProperties}
          >
            {/* 固定黑色底座：不参与动画、不拦截事件；厚度 = --card-press */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl bg-ink [transform:translate(var(--card-press),var(--card-press))]"
            />

            {/* 可动上层面板：悬停时整体压向底座，位移 = --card-press */}
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white [transform:translate(0px,0px)] transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:translate(var(--card-press),var(--card-press))] sm:flex-row"
            >
              {/* 封面：有真实封面图则显示图片，否则用色块 + emoji 占位 */}
              {a.cover ? (
                <div className="relative min-h-[180px] shrink-0 overflow-hidden sm:h-[210px] sm:w-60 sm:border-r-2 sm:border-ink">
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
                  className={`relative flex min-h-[180px] items-center justify-center sm:h-[210px] sm:w-60 sm:shrink-0 sm:border-r-2 sm:border-ink ${tagBg[a.color]}`}
                >
                  <span className="text-6xl drop-shadow-sm">{a.emoji}</span>
                </div>
              )}

              {/* 右侧内容面板：白底，悬停转浅奶黄 */}
              <div className="flex flex-1 flex-col bg-white transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-[#FEFCE8] sm:flex-row">
                {/* 文字 */}
                <div className="flex flex-1 flex-col justify-center gap-3 p-6 pb-2 sm:pb-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-ink/60">
                    <span className="rounded border-brutal-thin bg-brutal-pink px-2 py-0.5 text-ink">
                      {a.tag}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" strokeWidth={2.4} />
                      {a.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold leading-snug text-ink transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-[#2563EB] sm:text-2xl">
                    {a.title}
                  </h2>
                  <p className="text-[15px] text-ink/60">{a.excerpt}</p>
                </div>

                {/* 跳转按钮：白底黑箭头 -> 黑底白箭头 */}
                <div className="flex items-center justify-end p-6 pt-0 sm:items-center sm:pt-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-brutal-thin bg-white text-ink transition-[color,background-color] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-ink group-hover:text-white">
                    <ArrowRight className="h-6 w-6" strokeWidth={2.6} />
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-3xl border-brutal bg-white p-10 text-center shadow-brutal">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-bold">没有找到相关文章，换个关键词试试～</p>
          </div>
        )}

        {hasMore ? (
          <div className="flex justify-center pt-4">
            <div
              className="group relative inline-block"
              style={{ "--btn-press": "3px" } as CSSProperties}
            >
              {/* 固定黑色底座：不参与动画、不拦截事件；厚度 = --btn-press */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-ink [transform:translate(var(--btn-press),var(--btn-press))]"
              />
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="relative rounded-full border-brutal bg-ink px-12 py-4 text-lg font-bold text-paper [transform:translate(0px,0px)] transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:translate(var(--btn-press),var(--btn-press))]"
              >
                Load More Insights
              </button>
            </div>
          </div>
        ) : (
          expanded &&
          filtered.length > 0 && (
            <div className="flex items-center justify-center pt-10">
              <p className="font-display text-lg font-bold italic tracking-wide text-ink/25 sm:text-xl">
                — End of the scroll —
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
