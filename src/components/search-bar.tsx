'use client';

import type { CSSProperties } from 'react';
import { Search } from 'lucide-react';

export function SearchBar({
  value,
  onChange,
  placeholder,
  press = 8,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  // 底座偏移 / 面板按压距离（同一个变量）；默认 8px，需要更轻的页面可传更小值
  press?: number;
}) {
  const vars = { '--search-press': `${press}px` } as CSSProperties;
  const offset = `var(--search-press)`;

  return (
    // 外层容器：固定占位、提供稳定命中区域，自身不做任何位移
    <div className="relative w-full" style={vars}>
      {/* 黑色底座：固定在右下方，尺寸/圆角与白色面板一致，不参与动画、不拦截点击 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-ink [transform:translate(var(--search-press),var(--search-press))]"
      />

      {/* 白色面板：唯一做动画的层。只用真正的 transform 属性位移，聚焦时压向底座并完全覆盖 */}
      <div
        className="relative flex w-full items-center rounded-2xl border-2 border-ink bg-white [transform:translate(0px,0px)] focus-within:[transform:translate(var(--search-press),var(--search-press))]"
        style={{
          transition: 'transform 220ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-ink"
          strokeWidth={2.6}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          // 内部 input 不叠加任何边框/阴影/轮廓，聚焦反馈完全由外层面板下沉承担
          className="w-full rounded-2xl border-0 bg-transparent py-5 pl-14 pr-5 text-lg font-medium text-ink shadow-none outline-none placeholder:font-bold placeholder:text-ink/40"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}
