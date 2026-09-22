'use client';

import { useState } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { socials } from '@/data/site';
import { XiaohongshuIcon, WeChatIcon } from '@/lib/brutal';

export function SocialButtons({ variant = 'footer' }: { variant?: 'footer' | 'contact' }) {
  const [toast, setToast] = useState(false);

  const handleWechat = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // 剪贴板不可用时降级：仍提示微信号
    }
    setToast(true);
    window.setTimeout(() => setToast(false), 1500);
  };

  const box =
    variant === 'footer'
      ? 'group relative flex h-10 w-10 items-center justify-center rounded-[6px] bg-white text-ink outline-none transition-[background-color,color] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
      : 'flex items-center gap-3 rounded-xl border-brutal bg-white px-5 py-4 text-ink shadow-brutal brutal-hover hover:brutal-hover-active';

  const iconClass = variant === 'footer' ? 'h-[22px] w-[22px]' : 'h-6 w-6';

  // footer 三个按钮各自的悬停/聚焦配色
  const hoverColor: Record<string, string> = {
    email:
      'hover:bg-[#FFD600] hover:text-white focus-visible:bg-[#FFD600] focus-visible:text-white',
    wechat:
      'hover:bg-[#07C160] hover:text-white focus-visible:bg-[#07C160] focus-visible:text-white',
    xiaohongshu:
      'hover:bg-[#FF2442] hover:text-white focus-visible:bg-[#FF2442] focus-visible:text-white',
  };

  return (
    <>
      <div className={variant === 'footer' ? 'flex gap-[22px]' : 'flex flex-wrap gap-4'}>
        {socials.map((s) => {
          const colorCls = variant === 'footer' ? hoverColor[s.key] : '';
          if (s.key === 'wechat') {
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => s.copyValue && handleWechat(s.copyValue)}
                aria-label={`复制微信号 ${s.copyValue ?? ''}`}
                className={`${box} ${colorCls}`}
              >
                {variant === 'footer' ? (
                  <WeChatIcon className={iconClass} />
                ) : (
                  <MessageCircle className={iconClass} strokeWidth={2.4} />
                )}
                {variant === 'contact' && (
                  <span className="font-bold">微信：{s.copyValue}（点击复制）</span>
                )}
                {/* 悬停/聚焦提示微信号；点击后短暂显示“已复制” */}
                <span
                  role="status"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-bold text-ink opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 data-[copied=true]:opacity-100"
                  data-copied={toast}
                >
                  {toast ? '已复制' : s.copyValue}
                </span>
              </button>
            );
          }
          if (s.key === 'email') {
            return (
              <a
                key={s.key}
                href={s.href}
                aria-label="发邮件给小星"
                className={`${box} ${colorCls}`}
              >
                <Mail
                  className={`${iconClass} transition-[color] duration-200 ease-out`}
                  strokeWidth={2.4}
                />
                {variant === 'contact' && (
                  <span className="font-bold">邮箱合作</span>
                )}
              </a>
            );
          }
          return (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="访问小星的小红书主页"
              className={`${box} ${colorCls}`}
            >
              {variant === 'footer' ? (
                <span className="font-display text-[12.5px] font-bold leading-none tracking-[0.02em] text-ink transition-[color] duration-200 ease-out group-hover:text-white group-focus-visible:text-white">
                  RED
                </span>
              ) : (
                <XiaohongshuIcon className={iconClass} />
              )}
              {variant === 'contact' && <span className="font-bold">小红书</span>}
            </a>
          );
        })}
      </div>

      {toast && (
        <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 rounded-xl border-brutal bg-brutal-yellow px-5 py-3 font-bold text-ink shadow-brutal animate-pop-in">
          微信号已复制：XiaoXinTX666
        </div>
      )}
    </>
  );
}
