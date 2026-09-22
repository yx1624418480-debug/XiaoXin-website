import type { ReactNode } from 'react';

// 板块配色：背景色 + 硬投影/描边统一用墨黑
export const colorBg: Record<string, string> = {
  pink: 'bg-brutal-pink',
  blue: 'bg-brutal-blue',
  green: 'bg-brutal-green',
  yellow: 'bg-brutal-yellow',
  purple: 'bg-brutal-purple',
};

export const colorText: Record<string, string> = {
  pink: 'text-brutal-pink',
  blue: 'text-brutal-blue',
  green: 'text-brutal-green',
  yellow: 'text-brutal-yellow',
  purple: 'text-brutal-purple',
};

// 小红书品牌图标（简洁描边版）
export function XiaohongshuIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 4h5.2c2.6 0 4.4.5 5.5 1.5.9.9 1.3 2.1 1.3 3.7v5.6c0 1.6-.4 2.8-1.3 3.7-1.1 1-2.9 1.5-5.5 1.5H6c-1.3 0-2-.7-2-2V6c0-1.3.7-2 2-2Zm.9 3.1v6.4h1.8v-2.3h1.6v2.3h1.8V7.1h-1.8v2.4H8.7V7.1H6.9Zm7.4 0v6.4h1.4l.3-1.1c.5.9 1.2 1.3 2.1 1.3 1.4 0 2.3-1.2 2.3-3.3 0-2.2-.9-3.3-2.3-3.3-.9 0-1.6.4-2.1 1.2V7.1h-1.7Zm1.8 2.2c0-.9.4-1.5 1-1.5.7 0 1 .6 1 1.6s-.3 1.6-1 1.6c-.6 0-1-.6-1-1.7Z" />
    </svg>
  );
}

// 微信品牌图标（双气泡：默认白填充黑描边黑眼睛；hover 时去描边、眼睛变绿，跟随父级 group）
export function WeChatIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {/* 后方大气泡（左上） */}
      <path
        d="M17.4 9.9C17.4 6.2 14.2 3.4 9.9 3.4C5.6 3.4 2.4 6.2 2.4 9.9c0 1.95 0.9 3.7 2.4 4.9l-0.95 2.75c-0.12 0.34 0.25 0.64 0.57 0.46l3.05-1.85c0.72 0.22 1.5 0.35 2.3 0.35c4.3 0 7.6-2.95 7.6-6.6Z"
        className="fill-white stroke-ink transition-[fill,stroke] duration-200 ease-out group-hover:stroke-transparent group-focus-visible:stroke-transparent"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* 前方小气泡（右下） */}
      <path
        d="M21.6 15.8c0-3.05-2.85-5.5-6.35-5.5c-3.5 0-6.35 2.45-6.35 5.5c0 3.05 2.85 5.5 6.35 5.5c0.75 0 1.5-0.1 2.15-0.3l2.6 1.5c0.3 0.17 0.64-0.1 0.53-0.42l-0.75-2.25c1.3-1 2.17-2.45 2.17-4.03Z"
        className="fill-white stroke-ink transition-[fill,stroke] duration-200 ease-out group-hover:stroke-transparent group-focus-visible:stroke-transparent"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* 大气泡眼睛 */}
      <circle cx="7.3" cy="8.7" r="1.32" className="fill-ink transition-[fill] duration-200 ease-out group-hover:fill-[#07C160] group-focus-visible:fill-[#07C160]" />
      <circle cx="12.4" cy="8.7" r="1.32" className="fill-ink transition-[fill] duration-200 ease-out group-hover:fill-[#07C160] group-focus-visible:fill-[#07C160]" />
      {/* 小气泡眼睛 */}
      <circle cx="13.0" cy="14.9" r="1.12" className="fill-ink transition-[fill] duration-200 ease-out group-hover:fill-[#07C160] group-focus-visible:fill-[#07C160]" />
      <circle cx="17.5" cy="14.9" r="1.12" className="fill-ink transition-[fill] duration-200 ease-out group-hover:fill-[#07C160] group-focus-visible:fill-[#07C160]" />
    </svg>
  );
}

// 抖音品牌图标（简洁描边版）
export function DouyinIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.7c-1.3.1-2.5-.3-3.5-1v5.9c0 3-2.2 5.4-5.1 5.4-2.8 0-5-2.3-5-5.2 0-3 2.4-5.3 5.4-5.1v2.8c-.4-.1-.8-.2-1.2-.1-1.2.2-2 1.1-1.9 2.4.1 1.2 1 2.1 2.2 2.1 1.3 0 2.3-1.1 2.3-2.6V3h3.3Z" />
    </svg>
  );
}
