'use client';

import { useEffect, useRef, useState } from 'react';
import { slogan, sloganSub } from '@/data/site';
import { DoodleStar, DoodleBolt } from '@/components/doodles';

export function StatementBanner() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // 滚动进入视口后开始打字，循环播放
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    // 打完后停留约 1.8 秒再清空重播；打字中每字 110ms
    const delay = count >= slogan.length ? 1800 : 110;
    const timer = setTimeout(() => {
      setCount((c) => (c >= slogan.length ? 0 : c + 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [started, count]);

  const done = count >= slogan.length;

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-3xl text-center"
    >
      <DoodleStar className="absolute -left-3 -top-5 h-8 w-8 text-brutal-yellow animate-floaty" />
      <DoodleBolt className="absolute -right-3 -bottom-5 h-8 w-8 text-brutal-pink animate-wiggle" />
      <div className="relative inline-block">
        <span className="absolute -left-2 -top-3 rounded bg-ink px-2 py-0.5 text-[10px] font-bold tracking-widest text-paper">
          STATEMENT
        </span>
        <div
          style={{
            fontSize: 'clamp(1.15rem, 0.6rem + 2.3vw, 1.9rem)',
            paddingLeft: '0.6em',
            paddingRight: '0.6em',
            // 初始保持约 7 字宽（蓝框范围）；字数超过后逐字跳档，因外层 inline-block 居中，每次以中线为轴向左右对称扩张
            width: `min(${(Math.max(count, 7) * 1.04 + 1.55).toFixed(2)}em, 94vw)`,
          }}
          className="border-brutal bg-brutal-yellow py-7 shadow-brutal"
        >
          <p className="flex h-[2rem] items-center justify-center whitespace-nowrap text-[1em] font-bold sm:h-[2.4rem]">
            <span aria-label={slogan}>{slogan.slice(0, count)}</span>
            <span
              aria-hidden
              className={`ml-1 inline-block w-[3px] self-stretch rounded-sm bg-ink/70 ${
                done ? 'animate-caret-blink' : 'animate-caret-blink-fast'
              }`}
            />
          </p>
        </div>
      </div>
      <p className="mt-6 whitespace-pre-line text-center text-lg font-bold leading-relaxed text-ink sm:text-2xl">
        {sloganSub}
      </p>
    </section>
  );
}
