# 项目上下文

## 项目概览（本站专用）

- **站点**：短视频编导「小星同学TX」的个人品牌站，双用途：自媒体引流 + 求职名片。
- **风格**：新粗野主义 × 孟菲斯涂鸦手账风（对标 xmmxovo.online）。视觉规范见 `DESIGN.md`，改动样式前必读。
- **页面**（App Router，4 个路由）：
  - `src/app/page.tsx`：首页 Hero（身份 + 卡通头像）
  - `src/app/about/page.tsx`：关于我（自我介绍 / ID CARD / slogan / 近日生活 / 时间线）
  - `src/app/articles/`：文章（小红书 AI 科普图文卡片，客户端搜索）
  - `src/app/videos/`：视频（抖音美食视频卡片，客户端搜索）

### 改内容去哪？（重要）
所有文案/链接/文章/视频/时间线/社交账号集中在 **`src/data/site.ts`**，改配置即可，无需动组件。
- 文章：`articles` 数组（含小红书单篇链接）
- 视频：`videos` 数组（含抖音链接）
- 社交：`socials`（邮箱 mailto、微信复制号、小红书主页链接）
- 头像：`public/avatar.jpeg`

### 关键组件
- `src/components/navbar.tsx`：胶囊导航（当前页高亮）
- `src/components/footer.tsx` + `social-buttons.tsx`：黑色页脚、社交图标（微信点击复制）
- `src/components/id-card.tsx` / `timeline.tsx` / `recent-updates.tsx`：关于我页区块
- `src/components/search-bar.tsx`：粗野风搜索框
- `src/lib/brutal.tsx`：配色映射 + 小红书/抖音图标

### 约定
- 粗野风样式用 globals.css 中的工具类：`border-brutal`、`shadow-brutal`、`brutal-hover`、`hl-*` 高亮色块。
- 带交互/浏览器 API 的页面用 client 组件（`articles-client.tsx` / `videos-client.tsx`），page.tsx 仅导出 metadata + 渲染 client。
- Non-goals：不做产品 Tab、不做电子好友滚动栏、不出现公司名/成片、不虚构数据。

---

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**
