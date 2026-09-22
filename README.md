# 小星同学TX · 个人品牌站

短视频编导「小星同学TX」的个人品牌网站，同时承担两个用途：

1. **自媒体主页**：为小红书 / 抖音账号引流，沉淀个人品牌；
2. **求职名片**：让 HR / 面试官快速了解我是谁、做过什么。

视觉风格为「新粗野主义 × 孟菲斯涂鸦手账风」（Neo-Brutalism × Memphis Doodle），详细设计规范见 [`DESIGN.md`](./DESIGN.md)。

---

## 在线预览

线上访问地址（由部署平台提供的域名）以实际部署为准。本地运行方式见下文。

---

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | [Next.js 16](https://nextjs.org/)（App Router） |
| UI 库 | React 19 |
| 语言 | TypeScript 5（`strict` 模式） |
| 样式 | Tailwind CSS v4 |
| 组件 | shadcn/ui（基于 Radix UI，组件源码位于 `src/components/ui/`） |
| 图标 | lucide-react |
| 包管理器 | **pnpm**（强制，不支持 npm / yarn） |
| 运行时 | Node.js 20+（建议使用 Node.js 24） |

这是一个以**服务端渲染为主的 Next.js 站点**，本身不包含独立的业务后端，也没有数据库：所有文案、文章、视频、时间线、社交账号都集中在一个本地数据文件里（见下节），因此**开箱即用，无需任何 API 密钥**。

---

## 页面结构

项目共 4 个路由：

| 路由 | 文件 | 说明 |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | 首页 Hero：身份介绍 + 卡通头像 + 精选内容 |
| `/about` | `src/app/about/page.tsx` | 关于我：自我介绍、ID CARD、Statement 打字机、时间线、近日生活 |
| `/articles` | `src/app/articles/` | 文章：小红书 AI 科普图文卡片，支持前端实时搜索 |
| `/videos` | `src/app/videos/` | 视频：抖音美食视频卡片，支持前端实时搜索 |

### 想改内容？看这里（重要）

所有文案、链接、文章、视频、时间线、社交账号都集中在同一个文件：

```
src/data/site.ts
```

- 文章：`articles` 数组（含小红书单篇链接）
- 视频：`videos` 数组（含抖音链接）
- 社交：`socials`（邮箱 `mailto`、微信复制号、小红书主页链接）
- 时间线：`timeline` 数组（主线 / 支线任务）
- 近日生活：`recentUpdates` 数组
- 头像：`public/avatar.jpeg`

绝大多数情况下，**只改这个文件即可更新网站内容，无需改动任何组件**。

### 关键组件

- `src/components/navbar.tsx`：胶囊形导航栏（当前页高亮）
- `src/components/footer.tsx`、`src/components/social-buttons.tsx`：黑色页脚与社交按钮（微信点击复制）
- `src/components/id-card.tsx` / `timeline.tsx` / `recent-updates.tsx`：关于我页区块
- `src/components/statement-banner.tsx`：Statement 打字机横幅
- `src/components/search-bar.tsx`：粗野风搜索框
- `src/lib/brutal.tsx`：配色映射与小红书 / 抖音等平台图标

---

## 在本地电脑运行

### 1. 安装前置环境

- 安装 **Node.js 20 或更高版本**（推荐 24）：<https://nodejs.org/>
- 安装 **pnpm**（如未安装）：

  ```bash
  # 方式一：使用 corepack（Node 自带，推荐）
  corepack enable
  corepack prepare pnpm@latest --activate

  # 方式二：使用 npm 全局安装
  npm install -g pnpm
  ```

### 2. 获取代码并安装依赖

```bash
# 解压下载的 ZIP，或从 GitHub 克隆
unzip xiaoxing-website.zip
cd xiaoxing-website   # 进入项目根目录

# 安装依赖（必须使用 pnpm）
pnpm install
```

### 3. 启动开发服务器（支持热更新）

```bash
pnpm dev
```

启动后在浏览器打开：<http://localhost:5000>

> 说明：开发脚本默认监听 `5000` 端口。如需更换端口，可通过环境变量指定，例如：
>
> ```bash
> DEPLOY_RUN_PORT=3000 pnpm dev
> ```
>
> 此时访问 <http://localhost:3000>。

### 4. 代码检查（可选）

```bash
pnpm lint        # ESLint
pnpm ts-check    # TypeScript 类型检查
pnpm validate    # 一次性运行 TS / ESLint / Stylelint 检查
```

---

## 构建生产版本

```bash
# 构建：生成 .next 产物，并用 tsup 打包自定义服务入口到 dist/
pnpm build

# 启动生产服务器
pnpm start
```

生产服务同样默认监听 `5000` 端口，可用 `DEPLOY_RUN_PORT` 覆盖：

```bash
DEPLOY_RUN_PORT=8080 pnpm start
```

> 如果你只需要标准的 Next.js 产物（不使用自带的自定义 Node 服务入口），也可以直接：
>
> ```bash
> pnpm next build
> pnpm next start -p 5000
> ```

---

## 部署上线

### 方式一：部署到 Vercel（最简单，推荐）

本项目是标准 Next.js 应用，可零配置部署到 [Vercel](https://vercel.com/)：

1. 把代码推送到 GitHub（见下节）；
2. 登录 Vercel，点击 **Add New → Project**，导入该仓库；
3. Framework Preset 选择 **Next.js**，构建与启动命令保持默认即可；
4. 点击 **Deploy**，等待一两分钟即可获得线上网址。

无需配置任何环境变量。

### 方式二：部署到任意支持 Node.js 的服务器

在服务器上执行：

```bash
pnpm install
pnpm build
DEPLOY_RUN_PORT=8080 pnpm start
```

建议配合 `pm2` 做进程守护：

```bash
pnpm add -g pm2
pm2 start "pnpm start" --name xiaoxing-site
```

再用 Nginx 等做反向代理和 HTTPS 即可。

### 方式三：静态导出（可选）

本站使用了客户端交互与少量服务端能力，**默认不建议**纯静态导出；如需静态托管，请先确认所有页面均不依赖服务端特性，再在 `next.config.ts` 中配置 `output: 'export'` 后执行 `pnpm next build`。

---

## 上传到 GitHub

1. 在 GitHub 上新建一个空仓库（例如 `xiaoxing-website`）；
2. 在项目根目录执行：

   ```bash
   git init
   git add .
   git commit -m "init: 小星同学TX 个人品牌站"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/xiaoxing-website.git
   git push -u origin main
   ```

`.gitignore` 已配置好，会自动忽略 `node_modules`、`.next`、`.env` 等内容。

---

## 环境变量说明

本站默认**不需要任何 API 密钥或第三方账号**即可运行。自定义 Node 服务入口（`src/server.ts`）仅识别以下可选变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `PORT` | 服务监听端口（`src/server.ts` 读取） | `5000` |
| `DEPLOY_RUN_PORT` | 启动脚本读取，并据此设置 `PORT` | `5000` |
| `HOSTNAME` | 服务绑定的主机名 | `localhost` |
| `COZE_PROJECT_ENV` | 运行环境标识，设为 `PROD` 时以生产模式启动 | 未设置即开发模式 |

仓库中提供了一份 `.env.example` 作为填写示例，复制后按需修改：

```bash
cp .env.example .env
```

> 注意：`.env` 已在 `.gitignore` 中，不会被提交。请勿把任何真实密钥写入仓库。

---

## 目录结构

```
.
├── public/                 # 静态资源（头像、文章/视频封面图、SVG）
├── scripts/                # 构建与启动脚本（dev / build / start 等）
├── src/
│   ├── app/                # 页面路由与全局布局
│   │   ├── page.tsx        # 首页 /
│   │   ├── about/          # 关于我 /about
│   │   ├── articles/       # 文章 /articles
│   │   └── videos/         # 视频 /videos
│   ├── components/         # 业务组件
│   │   └── ui/             # shadcn/ui 组件库
│   ├── lib/                # 工具库（utils、平台图标等）
│   ├── data/site.ts        # ★ 所有文案 / 链接 / 内容数据
│   └── server.ts           # 自定义 Node 服务入口
├── DESIGN.md               # 视觉设计规范
├── AGENTS.md               # 项目工程说明
├── next.config.ts          # Next.js 配置
├── tailwind / postcss 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 依赖与脚本
```

> `assets/` 目录（若保留）用于存放原始素材与参考图，**不参与网站构建、也不被代码引用**；如不需要可直接删除，不影响运行。

---

## 常见问题

**Q：运行报错提示「只允许 pnpm」？**
A：项目通过 `only-allow` 强制使用 pnpm，请不要用 `npm install` / `yarn`，改用 `pnpm install`。

**Q：5000 端口被占用？**
A：换一个端口启动：`DEPLOY_RUN_PORT=3000 pnpm dev`。

**Q：改了文章 / 视频 / 社交链接不生效？**
A：确认修改的是 `src/data/site.ts`，保存后开发服务器会自动热更新；生产环境需重新 `pnpm build`。

---

## 版权说明

代码可作为个人模板自由使用与修改。`public/` 中的头像与封面图片、以及小红书 / 抖音上的内容版权归本人所有，未经授权请勿商用或转载。
