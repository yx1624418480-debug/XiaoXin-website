import {
  Rocket,
  Code2,
  TrendingUp,
  ChefHat,
  Compass,
  GraduationCap,
  ChevronUp,
  ShoppingCart,
} from 'lucide-react';
import type { TimelineNode } from '@/data/site';
import { timeline } from '@/data/site';
import { DoodleBolt } from '@/components/doodles';

const iconMap = {
  rocket: Rocket,
  code: Code2,
  chart: TrendingUp,
  chef: ChefHat,
  compass: Compass,
  graduation: GraduationCap,
  cart: ShoppingCart,
};

// 任务卡彩色叠层（饱和色）+ 图标在该底色上的描边色
const accentMap: Record<string, { bg: string; ink: string }> = {
  pink: { bg: 'bg-[#ec4899]', ink: 'text-white' },
  blue: { bg: 'bg-[#3b82f6]', ink: 'text-white' },
  green: { bg: 'bg-[#22c55e]', ink: 'text-white' },
  yellow: { bg: 'bg-[#facc15]', ink: 'text-ink' },
  purple: { bg: 'bg-[#a855f7]', ink: 'text-white' },
};

function NodeCard({ node }: { node: TimelineNode }) {
  const Icon = iconMap[node.icon];
  const accent = accentMap[node.color];
  return (
    <div className="group">
      <div className="relative rounded-[22px]">
        {/* 彩色底框：向右下错位叠在白卡下方；hover 时往下轻移 */}
        <span
          aria-hidden
          className={`absolute -bottom-[6px] -right-[6px] h-full w-full rounded-[22px] border-brutal ${accent.bg} transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[3px] group-hover:translate-y-[4px]`}
        />
        {/* 白色圆角卡面（向左上轻移，露出更多底下彩色） */}
        <div className="relative -translate-x-[3px] -translate-y-[3px] rounded-[22px] border-brutal bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-brutal shadow-[3px_3px_0_0_#111] ${accent.bg} ${accent.ink}`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="rounded-md bg-ink px-2.5 py-1 text-xs font-bold text-white sm:text-sm">
              【{node.tag}】
            </span>
            <span className="text-lg font-bold tracking-wide sm:text-xl">{node.date}</span>
          </div>
          <p className="mt-3 text-base font-bold leading-snug text-[#1f2937] sm:text-lg">
            {node.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink/55">{node.desc}</p>
        </div>
      </div>
    </div>
  );
}

function ColumnLabel({
  text,
  layerClass,
  align,
}: {
  text: string;
  layerClass: string;
  align: 'start' | 'end';
}) {
  return (
    <div
      className={`flex ${
        align === 'start'
          ? 'justify-start pl-16 sm:pl-24'
          : 'justify-end pr-16 sm:pr-24'
      }`}
    >
      <div className="group relative">
        {/* 彩色偏移叠层（右下错位，露出右侧 + 底部彩条；hover 时往下轻移） */}
        <span
          aria-hidden
          className={`absolute -bottom-[7px] -right-[7px] h-full w-full rounded-[3px] border-brutal ${layerClass} transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[3px] group-hover:translate-y-[4px]`}
        />
        {/* 白色长方形卡面（近直角、更大） */}
        <span className="relative inline-block rounded-[3px] border-brutal bg-white px-7 py-3 text-xl font-bold tracking-wide sm:px-10 sm:py-3.5 sm:text-2xl">
          {text}
        </span>
      </div>
    </div>
  );
}

type ParsedNode = {
  node: TimelineNode;
  year: number;
  month: number; // 0 = 仅年份；99 = 未知月份（如 2026.xx，排到该年最后）
  hasMonth: boolean;
};

// 解析 "2021.09" / "2024" / "2026.xx" 为可排序的年、月
function parseDate(date: string): { year: number; month: number; hasMonth: boolean } {
  const [yearRaw, rest] = date.split('.');
  const year = Number(yearRaw);
  if (rest === undefined) return { year, month: 0, hasMonth: false };
  const monthNum = Number(rest);
  if (Number.isInteger(monthNum)) return { year, month: monthNum, hasMonth: true };
  return { year, month: 99, hasMonth: false }; // xx 等未知月份，排在该年最后
}

type TimelineRow = { main?: TimelineNode; side?: TimelineNode };

// 把主线 / 支线按真实时间归并成行：同年对齐到同一行，只有一侧有事件时另一侧留空
function buildRows(): TimelineRow[] {
  const toParsed = (node: TimelineNode): ParsedNode => ({ node, ...parseDate(node.date) });
  // 近 → 远：年份大的在前，同年月份大（更新）的在前
  const byTime = (a: ParsedNode, b: ParsedNode): number =>
    b.year - a.year || b.month - a.month;

  const mains = timeline.filter((n) => n.side === 'main').map(toParsed).sort(byTime);
  const sides = timeline.filter((n) => n.side === 'side').map(toParsed).sort(byTime);

  const rows: TimelineRow[] = [];
  let i = 0;
  let j = 0;
  while (i < mains.length || j < sides.length) {
    const a = mains[i];
    const b = sides[j];
    if (a && (!b || a.year > b.year)) {
      rows.push({ main: a.node });
      i++;
    } else if (b && (!a || b.year > a.year)) {
      rows.push({ side: b.node });
      j++;
    } else if (a && b) {
      // 同年：任一侧只有年份、或月份相同 → 对齐到同一行；否则更新的一侧单独成行
      const align = !a.hasMonth || !b.hasMonth || a.month === b.month;
      if (align) {
        rows.push({ main: a.node, side: b.node });
        i++;
        j++;
      } else if (a.month > b.month) {
        rows.push({ main: a.node });
        i++;
      } else {
        rows.push({ side: b.node });
        j++;
      }
    }
  }
  return rows;
}

export function Timeline() {
  const rows = buildRows();

  return (
    <div>
      <h3 className="text-center text-4xl font-bold sm:text-5xl">
        地球Online{' '}
        <span className="hl-pink inline-block -rotate-1 rounded-sm font-display font-bold tracking-normal">
          开放游戏进度
        </span>
      </h3>

      <div className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border-brutal bg-grid-notebook p-4 shadow-brutal sm:p-6">
        {/* 列标题 */}
        <div className="relative mb-7 grid grid-cols-2 gap-6 sm:gap-10">
          <ColumnLabel text="主线任务" layerClass="bg-[#f472b6]" align="start" />
          <ColumnLabel text="支线任务" layerClass="bg-[#4ade80]" align="end" />

          {/* 中间虚线上端的箭头方块 */}
          <div className="absolute -bottom-7 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-xl border-brutal bg-white shadow-[4px_4px_0_0_#111] sm:flex">
            <ChevronUp className="h-6 w-6" strokeWidth={3} />
          </div>
        </div>

        <div className="relative">
          {/* 中间虚线 */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 border-l-4 border-dashed border-ink/70 sm:block" />

          <div className="space-y-6">
            {rows.map((row, i) => (
              <div
                key={i}
                className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-6"
              >
                {/* 中间节点圆点 */}
                <div className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex">
                  <span className="h-4 w-4 rounded-full border-brutal-thin bg-brutal-yellow" />
                </div>

                <div className="flex justify-start sm:pr-5">
                  {row.main ? (
                    <div className="w-full"><NodeCard node={row.main} /></div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
                <div className="flex justify-end sm:pl-5">
                  {row.side ? (
                    <div className="w-full"><NodeCard node={row.side} /></div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DoodleBolt className="absolute -right-3 -top-3 h-7 w-7 text-brutal-yellow animate-wiggle" />
      </div>
    </div>
  );
}
