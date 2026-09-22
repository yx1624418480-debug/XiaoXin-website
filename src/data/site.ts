// =============================================================
// 站点内容数据配置
// 想修改文案 / 链接 / 文章 / 视频，只需要改这个文件，无需动组件。
// =============================================================

export const profile = {
  name: '小星同学TX',
  nameEn: 'XiaoXingTX',
  roleEn: 'A Short Video Director',
  practiceTime: '两年',
  avatar: '/avatar.jpeg',
  avatarId: '/avatar-id.jpeg',
  // 首页身份行下方的小字标签（英文 + 中文混搭，参考原站风格）
  heroTags: [
    'Short Video Director',
    'AI Explorer',
    'Food Blogger',
    'Digital Media × Content',
  ],
  heroNote: '一个编导的自我修养：会剪片子，也在学着和 AI 聊天。',
};

export const idCard = {
  name: '小星同学TX',
  birthday: '2003.01.24',
  city: '广州',
  major: '数字媒体技术',
  job: '短视频编导',
  // 绿色卡头那行英文小字（不显示学校名）
  header: 'DIGITAL MEDIA × VIDEO DIRECTOR',
  idNo: 'XX-20030124-TX',
};

// 关于我：自我介绍段落
export const aboutParagraphs: string[] = [
  '我出生于 2003 年 1 月，是个标准的 00 后，目前生活在广州。大学读了数字媒体技术，从此一头扎进视频和内容的世界。Anyway，欢迎来到小星的世界！',
  '我是一个短视频编导，白天和脚本、分镜、剪辑线死磕，脑子里永远装着下一个选题。现实里有点慢热，但一聊到"这条视频能不能火"就会瞬间来劲。',
  '最近的我，多了一个新身份：AI 探索小白。一边在小红书做 AI 科普图文账号（粉丝还停留在个位数，但没关系，先种下去再说）。',
  '我相信"先完成，再完美"，也相信这个时代，普通人靠好奇心和行动力，也能撬动以前不敢想的东西。',
];

export const slogan = '不做生活的旁观者，做自己人生的编导。';

// STATEMENT 横幅下方的小字
export const sloganSub = '不知道未来会怎样，\n但确定的是，我正在去自己想去的路上。';

// 近日生活 RECENT UPDATES
export type RecentItem = {
  key: string;
  label: string;
  title: string;
  color: 'blue' | 'pink' | 'green';
  icon: 'book' | 'video' | 'sparkles';
};

export const recentUpdates: RecentItem[] = [
  {
    key: 'reading',
    label: '最近在读',
    title: '《全球视野下的投资机会》',
    color: 'blue',
    icon: 'book',
  },
  {
    key: 'watching',
    label: '最近狂刷',
    title: '西门聪明蛋XD',
    color: 'pink',
    icon: 'video',
  },
  {
    key: 'interested',
    label: '最近感兴趣',
    title: 'Codex',
    color: 'green',
    icon: 'sparkles',
  },
];

// 地球 Online 开放游戏进度 —— 时间线
export type TimelineNode = {
  date: string;
  title: string;
  desc: string;
  tag: string; // 主线 / 支线
  icon: 'rocket' | 'code' | 'chart' | 'chef' | 'compass' | 'graduation' | 'cart';
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'purple';
  side: 'main' | 'side';
};

export const timeline: TimelineNode[] = [
  {
    date: '2021.09',
    title: '入读大学 · 数字媒体技术',
    desc: '正式解锁"内容创作"技能树。',
    tag: '主线',
    icon: 'graduation',
    color: 'blue',
    side: 'main',
  },
  {
    date: '2024.02',
    title: '第一份实习 · 视频剪辑师',
    desc: '第一次把课堂里的剪辑，用到了真实工作中。',
    tag: '主线',
    icon: 'rocket',
    color: 'green',
    side: 'main',
  },
  {
    date: '2024.09',
    title: '第二份实习 · 电商剪辑师',
    desc: '在电商工作室做剪辑师，主攻电商板块的视频内容。',
    tag: '主线',
    icon: 'cart',
    color: 'yellow',
    side: 'main',
  },
  {
    date: '2024.12',
    title: '尝试做美食博主',
    desc: '自己出镜、自己拍剪，解锁"up 主"成就。',
    tag: '支线',
    icon: 'chef',
    color: 'yellow',
    side: 'side',
  },
  {
    date: '2025.02',
    title: '成为抖音 300 万粉博主的编导',
    desc: '和脚本 / 分镜 / 剪辑线长期对线。',
    tag: '主线',
    icon: 'rocket',
    color: 'purple',
    side: 'main',
  },
  {
    date: '2026.03',
    title: '加入生财有术 · 登上"航海"贼船',
    desc: '开始副业实战，把想法做出来。',
    tag: '支线',
    icon: 'compass',
    color: 'pink',
    side: 'side',
  },
  {
    date: '2026.08',
    title: '启动小红书 AI 科普账号',
    desc: '从 0 到 1，当一个 AI 布道小白。',
    tag: '支线',
    icon: 'chart',
    color: 'green',
    side: 'side',
  },
  {
    date: '2026.xx',
    title: '上线个人网站',
    desc: '用 AI 搭起了自己的线上小窝。',
    tag: '支线',
    icon: 'code',
    color: 'pink',
    side: 'side',
  },
];

// 文章（小红书 AI 科普图文）
export type Article = {
  id: number;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'purple';
  emoji: string;
  cover?: string; // 真实封面图（/public 下路径），无则用色块 + emoji 占位
};

export const articles: Article[] = [
  {
    id: 1,
    tag: 'AI 科普',
    date: '2026-08-12',
    title: '别再只背提示词了，普通人要先学会给 AI 搭"AI 写作流"',
    excerpt: '提示词不是魔法，搭好流程才是普通人用好 AI 的第一步。',
    url: 'https://xhslink.cn/o/25iweC6Q2RI',
    color: 'pink',
    emoji: '✍️',
    cover: '/article-1.jpg?v=2',
  },
  {
    id: 2,
    tag: 'AI 实战',
    date: '2026-08-18',
    title: '我用 4 个 Skill 搭了 AI 自媒体创作系统',
    excerpt: '把重复的内容生产交给 AI，一套系统跑通自媒体创作。',
    url: 'https://xhslink.cn/o/2Ir0KRjIOiA',
    color: 'green',
    emoji: '🧩',
    cover: '/article-2.jpg?v=1',
  },
  {
    id: 3,
    tag: 'AI 科普',
    date: '2026-08-24',
    title: 'AI 总在新对话里"失忆"？',
    excerpt: '为什么 AI 记不住你说过的话？聊聊上下文与记忆机制。',
    url: 'https://xhslink.cn/o/1ViVqAkCRjn',
    color: 'blue',
    emoji: '🧠',
    cover: '/article-3.jpg?v=1',
  },
  {
    id: 4,
    tag: 'AI 方法',
    date: '2026-08-30',
    title: '学 AI 别只收藏教程：先找一个每天重复的小任务跑一遍',
    excerpt: '最好的学习方式，是用 AI 解决一个真实的小问题。',
    url: 'https://xhslink.cn/o/6zjzkv2gdrX',
    color: 'yellow',
    emoji: '🚀',
    cover: '/article-4.jpg?v=1',
  },
  {
    id: 5,
    tag: 'AI 科普',
    date: '2026-09-05',
    title: 'Prompt 到底是什么？不是神奇咒语，是你交给 AI 的任务',
    excerpt: '把 Prompt 当成"给同事派活"，你就懂怎么写了。',
    url: 'https://xhslink.cn/o/6TtecrmfAk5',
    color: 'purple',
    emoji: '💬',
    cover: '/article-5.jpg?v=1',
  },
  {
    id: 6,
    tag: 'AI 知识点',
    date: '2026-09-12',
    title: '每天一个 AI 知识点：API 是什么？',
    excerpt: 'API 的全称是 Application Programming Interface，用人话讲给你听。',
    url: 'https://xhslink.cn/o/8NcERXNXmmh',
    color: 'green',
    emoji: '🔌',
    cover: '/article-6.jpg?v=1',
  },
];

// 视频（抖音美食博主时期）
export type VideoCategory = '美食' | 'AI';

export type Video = {
  id: number;
  title: string;
  url: string;
  color: 'blue' | 'pink' | 'green' | 'yellow' | 'purple';
  emoji: string;
  // 按视频真实内容归类，用于分类筛选
  category: VideoCategory;
  cover?: string;
  duration?: string;
  // 真实播放量 / 点赞数：在每条视频上手动填写数字；不填（undefined）显示“—”，真实为 0 显示“0”
  viewCount?: number;
  likeCount?: number;
};

// 数量格式化：>=10000 用“万”（保留一位小数，去掉多余的 .0）；其余原样
export function formatCount(n: number): string {
  if (n >= 10000) {
    const wan = n / 10000;
    return `${Number(wan.toFixed(1))}万`;
  }
  return String(n);
}

export const videos: Video[] = [
  {
    id: 1,
    title: '谁懂！热红酒这样煮也太好喝了叭',
    url: 'https://v.douyin.com/ojIQgQ2INt0/',
    color: 'pink',
    emoji: '🍷',
    category: '美食',
    cover: '/video-1.jpg?v=5',
    viewCount: 128000,
    likeCount: 1009,
  },
  {
    id: 2,
    title: '用电饭煲做一锅杨枝甘露！真的爆好喝',
    url: 'https://v.douyin.com/Nb707vCrp6c/',
    color: 'yellow',
    emoji: '🥭',
    category: '美食',
    cover: '/video-2.jpg?v=1',
    viewCount: 15000,
    likeCount: 118,
  },
  {
    id: 3,
    title: '一口沦陷！比烤肉店还好吃的海苔午餐肉炒饭',
    url: 'https://v.douyin.com/dvueWvvwTPo/',
    color: 'green',
    emoji: '🍚',
    category: '美食',
    cover: '/video-3.jpg?v=1',
    viewCount: 3568,
    likeCount: 85,
  },
  {
    id: 4,
    title: '据说我爸当年就是用这道鸡翅鸡爪煲追到我妈的！',
    url: 'https://v.douyin.com/ewSkCoWnMUg/',
    color: 'purple',
    emoji: '🍗',
    category: '美食',
    cover: '/video-4.jpg?v=2',
    viewCount: 10000,
    likeCount: 98,
  },
  {
    id: 5,
    title: 'Vlog｜03 男大做饭日常',
    url: 'https://v.douyin.com/f-jh76BTRdk/',
    color: 'blue',
    emoji: '🍳',
    category: '美食',
    cover: '/video-5.jpg?v=3',
    viewCount: 3130,
    likeCount: 49,
  },
];

// 社交媒体 / 联系方式
export type Social = {
  key: 'email' | 'wechat' | 'xiaohongshu';
  label: string;
  href?: string;
  copyValue?: string;
};

export const socials: Social[] = [
  { key: 'email', label: '邮箱', href: 'mailto:1624418480@qq.com' },
  { key: 'wechat', label: '微信', copyValue: 'XiaoXinTX666' },
  {
    key: 'xiaohongshu',
    label: '小红书',
    href: 'https://xhslink.cn/m/2R4eVrIZz3D',
  },
];

export const navItems = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我' },
  { href: '/articles', label: '文章' },
  { href: '/videos', label: '视频' },
];
