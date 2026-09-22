import Image from 'next/image';
import { idCard, profile } from '@/data/site';
import { DoodleStar } from '@/components/doodles';

function Field({
  label,
  value,
  bg,
}: {
  label: string;
  value: string;
  bg: string;
}) {
  return (
    <div className={`rounded-2xl border-brutal-thin ${bg} px-4 py-3 shadow-brutal-sm`}>
      <p className="text-xs font-bold uppercase tracking-widest text-ink/60">{label}</p>
      <p className="mt-1 text-lg font-bold leading-snug">{value}</p>
    </div>
  );
}

export function IdCard() {
  return (
    <div className="relative mx-auto w-full max-w-md rotate-1 rounded-3xl border-brutal bg-paper shadow-brutal-lg transition-[scale] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] md:mr-0 md:mt-28">
      {/* 笑脸贴纸 */}
      <div className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-full border-brutal bg-brutal-pink shadow-brutal-sm animate-floaty">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-ink" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14c1 1.5 2.5 2.5 4 2.5s3-1 4-2.5" />
          <path d="M8.5 9.5h.01M15.5 9.5h.01" />
        </svg>
      </div>

      {/* 绿色卡头 */}
      <div className="rounded-t-[22px] border-b-[3px] border-b-ink bg-brutal-green px-6 py-4">
        <p className="font-display text-3xl tracking-tight">ID CARD</p>
        <p className="mt-1 text-xs font-bold tracking-[0.18em] text-ink/70">
          {idCard.header}
        </p>
      </div>

      <div className="grid grid-cols-[150px_1fr] gap-4 p-5">
        {/* 左列：竖版头像 + 生日/城市标签 */}
        <div className="space-y-3">
          <div className="self-start overflow-hidden rounded-2xl border-brutal bg-[#f6efdc] shadow-brutal-sm">
            <Image
              src={profile.avatarId}
              alt={`${idCard.name} 的头像`}
              width={300}
              height={400}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-lg border-brutal-thin bg-brutal-blue px-2.5 py-1 text-xs font-bold text-white shadow-brutal-sm">
              {idCard.birthday}
            </span>
            <span className="rounded-lg border-brutal-thin bg-brutal-pink px-2.5 py-1 text-xs font-bold shadow-brutal-sm">
              {idCard.city}
            </span>
          </div>
        </div>

        {/* 右列：字段 */}
        <div className="space-y-3">
          <Field label="Name" value={idCard.name} bg="bg-brutal-yellow" />
          <Field label="Major" value={idCard.major} bg="bg-brutal-blue/60" />
          <Field label="Job" value={idCard.job} bg="bg-brutal-purple/70" />
        </div>
      </div>

      <div className="px-5 pb-6 pt-4">
        <p className="text-xs font-bold tracking-widest text-ink/50">ID NO.</p>
        <p className="font-display text-lg tracking-wide">{idCard.idNo}</p>

        {/* 条形码 */}
        <div className="mt-3 flex items-end gap-[3px] rounded-xl border-brutal-thin bg-white px-3 py-3">
          {[3, 6, 2, 5, 8, 3, 4, 7, 2, 6, 3, 8, 4, 2, 5, 7, 3, 6, 2, 4, 8, 3, 5].map(
            (h, i) => (
              <span
                key={i}
                className="inline-block w-[3px] bg-ink"
                style={{ height: `${h * 4}px` }}
              />
            ),
          )}
        </div>
      </div>

      <DoodleStar className="absolute -bottom-4 -left-4 h-8 w-8 text-brutal-yellow animate-wiggle" />
    </div>
  );
}
