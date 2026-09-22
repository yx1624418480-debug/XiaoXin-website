// 手绘涂鸦装饰元素（星星、闪电、箭头、圆点），纯 SVG，装饰用
import type { ReactNode } from 'react';

export function DoodleStar({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c.4 4.6 2.2 6.4 6.8 6.8-4.6.4-6.4 2.2-6.8 6.8-.4-4.6-2.2-6.4-6.8-6.8C9.8 8.4 11.6 6.6 12 2Z" />
    </svg>
  );
}

export function DoodleBolt({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function DoodleArrow({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 48 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12h40" strokeDasharray="5 6" />
      <path d="M34 4l8 8-8 8" />
    </svg>
  );
}

export function DoodleDot({ className = '' }: { className?: string }): ReactNode {
  return <span className={`inline-block rounded-full bg-current ${className}`} aria-hidden="true" />;
}

export function DoodleDiamond({ className = '' }: { className?: string }): ReactNode {
  return (
    <span
      className={`inline-block rotate-45 rounded-[2px] bg-current ${className}`}
      aria-hidden="true"
    />
  );
}

export function DoodleArrowSolid({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 48 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12h34" />
      <path d="M28 3l14 9-14 9" />
    </svg>
  );
}

// 弯曲的虚线箭头（卡片之间连接用，弧度向下）
export function DoodleCurveArrow({ className = '' }: { className?: string }): ReactNode {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 9 Q32 38 52 12" strokeDasharray="4 6" />
      <path d="M46 5l9 7-10 4" />
    </svg>
  );
}
