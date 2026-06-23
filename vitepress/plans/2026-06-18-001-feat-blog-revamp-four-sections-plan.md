---
title: "feat: VitePress 博客四板块重构"
type: feat
status: active
date: 2026-06-18
origin: docs/brainstorms/2026-06-18-vitepress-blog-revamp-requirements.md
---

## Summary

将现有 VitePress 博客从松散的笔记集合重构为四大板块（学习笔记、技术文章、项目展示、图片画廊），以 VitePress Data Loading API 为内容引擎，实现「写 markdown 即自动生成页面」的工作流。

## Problem Frame

当前博客导航碎片化（Posts/Demos/Notes 内容重叠、sidebar 覆盖不全）、项目展示单薄（仅热力图+日志）、无内容发现机制（无标签/归档/筛选）、首页信息量低（hero + emoji cards）。详见 origin 文档 Problem Frame 部分。

## Requirements

**板块结构**

- R1. 四个顶级板块：学习笔记（/notes）、技术文章（/blog）、项目展示（/projects）、图片画廊（/gallery）。
- R2. 导航栏替换为四板块入口。
- R3. 每个板块有完整 sidebar 配置。

**首页信息流**

- R4. 首页改为信息流风格，分区域展示最新文章、项目动态、精选图片。
- R5. 数据通过 `createContentLoader` 构建时生成。
- R6. 首页展示标签云，点击跳转标签筛选页。

**技术文章板块**

- R7. 原 /posts/ 和 /demos/ 内容迁移到 /blog/。
- R8. frontmatter 规范：date、title、tags（数组）、categories（字符串）、description。
- R9. 自动生成文章列表页，按日期倒序。
- R10. 按标签筛选（动态路由 /tags/[tag]）。
- R11. 按分类筛选。
- R12. 按日期归档（年/月分组）。

**项目展示板块**

- R13. 每个项目一个 markdown 文件，frontmatter 驱动。
- R14. 项目列表页展示卡片（名称、描述、技术栈、缩略图）。
- R15. 项目详情页：简介、技术栈标签、截图画廊、iframe 预览、开发日志时间线。
- R16. iframe 懒加载。
- R17. 复用 ProjectTracker 逻辑，数据来源统一为 frontmatter。

**图片画廊板块**

- R18. 外链图片，不存仓库。
- R19. 每个画廊一个 markdown 文件，frontmatter 包含图片列表。
- R20. 瀑布流/网格布局，响应式。
- R21. 点击弹出 lightbox，支持左右切换。
- R22. 首页展示最新画廊前 6 张缩略图。

**内容自动化**

- R23. 所有列表页通过 `createContentLoader` 自动生成。
- R24. 标签索引页自动聚合。
- R25. 归档页自动按年月分组。

## Key Technical Decisions

**KTD-1: 使用 VitePress `createContentLoader` 作为唯一内容引擎。** VitePress 原生 Data Loading API 在构建时扫描 markdown frontmatter，生成结构化数据。SSR 兼容，无需额外依赖。现有项目已使用 VitePress 1.4.2，API 稳定。（见 origin Key Decisions 第一条）

**KTD-2: 标签筛选使用动态路由而非客户端过滤。** 创建 `/tags/[tag].md` + `/tags/[tag].paths.ts`，每个标签生成独立页面。优势：URL 可分享、可被搜索引擎索引、与 VitePress 路由体系一致。`paths.ts` 内使用 `createContentLoader` 扫描所有文章，按标签分组生成路径。

**KTD-3: 画廊布局使用纯 CSS columns 实现瀑布流。** 不引入第三方瀑布流库。CSS `column-count` + `break-inside: avoid` 可实现基本瀑布流效果，满足个人博客需求。如后续需要更精确的控制，可替换为 vue-masonry-css。

**KTD-4: 项目详情页使用 frontmatter 驱动的自定义 layout。** 沿用现有 `layout: project` 模式（MyLayout.vue 中条件渲染），扩展为完整的项目展示页（截图画廊、iframe、开发日志）。每个项目一个 markdown 文件，frontmatter 包含所有结构化数据。

**KTD-5: 首页使用自定义 Vue 组件替换默认 hero 布局。** VitePress 的 `home-hero-before`/`home-features-before` 等 slot 不足以承载信息流。方案：创建 `HomeFeed.vue` 组件，在 MyLayout.vue 中当 `frontmatter.layout === 'home'` 时渲染，替换默认 home layout。

**KTD-6: 删除 /examples/ 和 /guide/ 脚手架默认内容。** 这两个目录是 VitePress 初始化时生成的示例，与四大板块无关。删除后清理 config.mts 中对应的 sidebar 配置。

**KTD-7: lightbox 使用自定义实现或轻量库。** 画廊 lightbox 需求简单（展示大图 + 左右切换），可用 ~100 行 Vue 组件实现，避免引入重型 lightbox 库。

## Implementation Units

### U1. 数据加载器层

**Goal:** 创建所有数据加载器，为后续 UI 组件提供结构化数据。

**Requirements:** R5, R8, R23, R24, R25

**Dependencies:** 无

**Files:**
- `docs/.vitepress/theme/data/blog.data.ts` — 文章列表 loader
- `docs/.vitepress/theme/data/projects.data.ts` — 项目列表 loader
- `docs/.vitepress/theme/data/gallery.data.ts` — 画廊列表 loader
- `docs/.vitepress/theme/data/tags.data.ts` — 标签聚合 loader（返回 tag → posts 映射）
- `docs/.vitepress/theme/data/archive.data.ts` — 归档 loader（返回 year → posts 映射）
- `docs/.vitepress/theme/data/feed.data.ts` — 首页信息流 loader（聚合最新文章、项目、图片）

**Approach:**

每个 loader 使用 `createContentLoader` 扫描对应目录的 markdown 文件，通过 `transform` 函数提取 frontmatter 并排序/分组。

- `blog.data.ts`：扫描 `blog/**/*.md`，提取 title/date/tags/categories/description，按日期倒序。
- `projects.data.ts`：扫描 `projects/*.md`（排除 index.md），提取 name/description/techStack/thumbnail/logs。
- `gallery.data.ts`：扫描 `gallery/*.md`，提取 images 数组和 description。
- `tags.data.ts`：扫描 `blog/**/*.md`，构建 `Record<string, Post[]>` 映射。
- `archive.data.ts`：扫描 `blog/**/*.md`，构建 `Record<year, Post[]>` 映射。
- `feed.data.ts`：聚合 blog（最新 5 条）、projects（最新 3 条）、gallery（最新画廊前 6 张图片）。

统一 frontmatter 规范：
```yaml
# blog 文章
date: 2026-06-18
title: "文章标题"
tags: [JavaScript, Vue]
categories: 前端
description: "文章摘要"

# 项目
name: "项目名称"
description: "项目描述"
techStack: [Vue3, TypeScript]
thumbnail: "https://..."
iframeUrl: "https://..."
deployUrl: "https://..."
logs:
  - date: "2026-06-18"
    type: feature
    content: "描述"

# 画廊
title: "画廊标题"
date: 2026-06-18
images:
  - url: "https://..."
    alt: "描述"
  - url: "https://..."
    alt: "描述"
```

**Test scenarios:**
- blog loader 返回的文章按日期倒序排列，无 title 的文件被过滤。
- tags loader 返回的映射中每个标签至少关联一篇文章。
- archive loader 按年份正确分组。
- feed loader 返回的各板块数据不超过指定数量。
- 空目录时 loader 返回空数组，不报错。

**Verification:** 在 VitePress dev 模式下 import 各 loader 的 data，console.log 验证数据结构正确。

---

### U2. 博客板块 UI

**Goal:** 创建博客列表页、标签筛选页、归档页、分类筛选页。

**Requirements:** R7, R9, R10, R11, R12

**Dependencies:** U1（blog.data.ts, tags.data.ts, archive.data.ts）

**Files:**
- `docs/blog/index.md` — 博客首页（使用自定义 layout）
- `docs/.vitepress/theme/components/BlogList.vue` — 文章列表组件
- `docs/.vitepress/theme/components/TagCloud.vue` — 标签云组件
- `docs/.vitepress/theme/components/ArchiveList.vue` — 归档列表组件
- `docs/tags/[tag].md` — 标签筛选页模板
- `docs/tags/[tag].paths.ts` — 标签动态路由生成

**Approach:**

`BlogList.vue` 从 `blog.data.ts` 读取数据，渲染文章卡片列表（标题、日期、标签、摘要）。支持通过 props 或 URL 参数筛选标签/分类。

`TagCloud.vue` 从 `tags.data.ts` 读取标签映射，渲染标签云（标签名 + 文章数量）。点击跳转到 `/tags/[tag].html`。

`ArchiveList.vue` 从 `archive.data.ts` 读取归档数据，按年分组展示文章列表。

`/tags/[tag].paths.ts` 使用 `createContentLoader` 扫描所有文章，收集所有标签，为每个标签生成一个路径。标签页内容使用 `BlogList.vue` 按标签筛选展示。

**Test scenarios:**
- 博客首页正确展示所有文章，按日期倒序。
- 点击标签跳转到 `/tags/javascript.html`，页面只显示含该标签的文章。
- 归档页按年份分组，每年内文章按日期倒序。
- 标签云展示所有标签及文章数量，数量排序正确。
- 无文章时显示空状态提示。

**Verification:** `pnpm docs:dev` 访问 /blog/、/tags/javascript、/archive 验证页面渲染正确。

---

### U3. 项目展示板块 UI

**Goal:** 创建项目列表页和项目详情页，复用并扩展 ProjectTracker 逻辑。

**Requirements:** R13, R14, R15, R16, R17

**Dependencies:** U1（projects.data.ts）

**Files:**
- `docs/projects/index.md` — 项目列表页
- `docs/.vitepress/theme/components/ProjectCard.vue` — 项目卡片组件
- `docs/.vitepress/theme/components/ProjectDetail.vue` — 项目详情组件（截图画廊、iframe、日志）
- `docs/.vitepress/theme/components/IframePreview.vue` — iframe 懒加载组件
- `docs/.vitepress/theme/components/ImageGallery.vue` — 截图画廊组件（点击放大）
- `docs/.vitepress/theme/components/ProjectTracker.vue` — 修改：数据来源从页面 frontmatter 改为 props

**Approach:**

`ProjectCard.vue` 展示项目缩略图、名称、描述、技术栈标签。点击进入详情页。

`ProjectDetail.vue` 是项目详情页的核心组件，包含：
- 项目简介（markdown 正文）
- 技术栈标签
- 截图画廊（`ImageGallery.vue`，点击放大查看，支持左右切换）
- iframe 预览区（`IframePreview.vue`，使用 IntersectionObserver 实现懒加载）
- 开发日志时间线（复用 ProjectTracker 的 NTimeline 逻辑）

`IframePreview.vue` 使用 `IntersectionObserver` 监测组件是否进入视口，首次可见时才设置 iframe 的 `src` 属性。

`ProjectTracker.vue` 修改为接收 props 而非直接读取 frontmatter，使其可在项目详情页中复用。

项目详情页使用动态路由：`docs/projects/[slug].md` + `docs/projects/[slug].paths.ts`，从 `projects.data.ts` 读取项目列表生成路径。

**Test scenarios:**
- 项目列表页展示所有项目卡片，包含缩略图和描述。
- 点击卡片进入项目详情页，URL 为 /projects/[slug].html。
- 详情页正确展示截图画廊、iframe 预览、开发日志三个区域。
- iframe 在滚动到可视区域后才加载，首屏不触发请求。
- 截图画廊点击放大，支持左右切换和 ESC 关闭。
- ProjectTracker 在详情页中通过 props 正确渲染。

**Verification:** `pnpm docs:dev` 访问 /projects/ 查看列表，点击进入详情页验证各区域渲染。

---

### U4. 图片画廊板块 UI

**Goal:** 创建画廊页面，实现瀑布流布局和 lightbox 查看。

**Requirements:** R18, R19, R20, R21, R22

**Dependencies:** U1（gallery.data.ts）

**Files:**
- `docs/gallery/index.md` — 画廊首页
- `docs/.vitepress/theme/components/GalleryGrid.vue` — 瀑布流/网格画廊组件
- `docs/.vitepress/theme/components/Lightbox.vue` — lightbox 组件

**Approach:**

`GalleryGrid.vue` 使用 CSS `column-count` 实现瀑布流布局：
- 桌面端 3-4 列，平板 2 列，移动端 1 列
- `break-inside: avoid` 防止图片被截断
- 图片使用 `loading="lazy"` 原生懒加载

`Lightbox.vue` 实现图片查看器：
- 点击图片弹出全屏遮罩 + 大图展示
- 左右箭头切换图片
- ESC 键关闭
- 点击遮罩关闭
- 使用 Teleport 渲染到 body

画廊首页从 `gallery.data.ts` 读取数据，渲染所有画廊。每个画廊展示其图片列表。

**Test scenarios:**
- 画廊页面以瀑布流布局展示图片。
- 不同屏幕宽度下列数自适应（桌面 3-4 列，平板 2 列，手机 1 列）。
- 点击图片弹出 lightbox，显示大图。
- lightbox 左右箭头可切换图片，循环切换。
- ESC 键和点击遮罩可关闭 lightbox。
- 图片使用懒加载，首屏外图片不立即加载。

**Verification:** `pnpm docs:dev` 访问 /gallery/ 验证瀑布流布局和 lightbox 功能。

---

### U5. 首页信息流

**Goal:** 将首页从 hero 风格改为信息流风格。

**Requirements:** R4, R5, R6

**Dependencies:** U1（feed.data.ts, tags.data.ts）, U2（BlogList.vue, TagCloud.vue）

**Files:**
- `docs/index.md` — 修改首页 frontmatter
- `docs/.vitepress/theme/components/HomeFeed.vue` — 首页信息流组件

**Approach:**

`HomeFeed.vue` 从 `feed.data.ts` 读取聚合数据，分三个区域展示：
1. **最新文章**（5 条）：标题、日期、标签、摘要。点击进入文章。底部 "查看全部" 链接到 /blog/。
2. **项目动态**（3 条最新项目）：项目卡片（缩略图、名称、描述）。底部 "查看全部" 链接到 /projects/。
3. **精选图片**（最新画廊前 6 张）：缩略图网格，点击可 lightbox 查看。底部 "查看全部" 链接到 /gallery/。

标签云区域：从 `tags.data.ts` 读取标签数据，渲染标签云。点击跳转到 /tags/[tag]。

在 MyLayout.vue 中增加条件判断：当 `frontmatter.layout === 'home'` 时渲染 `HomeFeed.vue` 而非默认的 VitePress Home layout。

**Test scenarios:**
- 首页展示三个内容区域，每区域数据不超过指定数量。
- 标签云展示所有标签，点击跳转正确。
- "查看全部" 链接指向正确的板块页面。
- 首页在 SSR 模式下正确渲染（无 hydration mismatch）。

**Verification:** `pnpm docs:dev` 访问首页验证信息流布局和数据展示。

---

### U6. 配置更新与内容迁移

**Goal:** 更新导航栏、侧边栏配置，迁移现有内容到新目录结构。

**Requirements:** R1, R2, R3, R7

**Dependencies:** U2, U3, U4（组件需先就位）

**Files:**
- `docs/.vitepress/config.mts` — 更新 nav、sidebar
- `docs/blog/gsap.md` — 从 posts/gsap.md 迁移
- `docs/blog/java.md` — 从 demos/java.md 迁移
- `docs/blog/js.md` — 从 demos/js.md 迁移
- `docs/blog/test.md` — 从 posts/test.md 迁移
- `docs/projects/vue2-designer.md` — 新建示例项目文件（从现有 projects/index.md 拆分）
- `docs/gallery/index.md` — 新建画廊首页
- `docs/gallery/example.md` — 新建示例画廊文件
- `docs/notes/js/index.md` — 补充 sidebar 配置
- `docs/notes/go/index.md` — 补充 sidebar 配置
- `docs/notes/vitepress/index.md` — 补充 sidebar 配置
- `docs/notes/design-patterns/index.md` — 补充 sidebar 配置

**Approach:**

**Nav 更新：** 替换当前 Posts/Demos/More 为：
```
技术文章 → /blog/
学习笔记 → /notes/（下拉：Java、JavaScript、Vue、Go、VitePress、设计模式）
项目展示 → /projects/
图片画廊 → /gallery/
```

**Sidebar 更新：** 为 /blog/、/projects/、/gallery/、/tags/ 添加 sidebar 配置。补全 /notes/js/、/notes/go/、/notes/vitepress/、/notes/design-patterns/ 的 sidebar。

**内容迁移：**
- 将 /posts/gsap.md 移动到 /blog/gsap.md，更新 frontmatter 添加 tags/categories/description。
- 将 /demos/java.md 和 /demos/js.md 移动到 /blog/。
- 删除 /posts/ 和 /demos/ 目录。
- 删除 /examples/ 和 /guide/ 目录。
- 从现有 /projects/index.md 的 logs 数据中提取，创建独立的项目 markdown 文件。

**Test scenarios:**
- 导航栏展示四个板块入口，下拉菜单正确。
- 每个板块的 sidebar 完整覆盖所有子页面。
- 迁移后的文章 URL 变化后可通过新路径访问。
- 删除 /examples/ 和 /guide/ 后无死链。
- `pnpm docs:build` 构建成功无错误。

**Verification:** `pnpm docs:build && pnpm docs:preview` 验证全站构建和导航正确。

---

### U7. 主题入口清理

**Goal:** 清理 theme/index.js 中的死代码，统一布局逻辑。

**Requirements:** 支撑所有板块的布局需求

**Dependencies:** U5（HomeFeed 依赖 MyLayout 的布局条件判断）

**Files:**
- `docs/.vitepress/theme/index.js` — 清理重复 Layout 赋值
- `docs/.vitepress/theme/MyLayout.vue` — 扩展布局条件判断

**Approach:**

清理 `theme/index.js` 中的重复 `Layout:` 赋值（line 51 NaiveUIProvider 和 line 57 MyLayout），移除死代码（NaiveUIProvider、CssRenderStyle、VitepressPath 组件未被使用）。保留 SSR setup 逻辑。

扩展 `MyLayout.vue` 的条件判断，支持多种 layout 类型：
- `layout: home` → 渲染 HomeFeed
- `layout: project` → 渲染 ProjectDetail（doc-bottom slot 中的 ProjectTracker 保留）
- 其他 → 默认 VitePress Layout

**Test scenarios:**
- 清理后 SSR 正常工作，NaiveUI 样式正确注入。
- 不同 layout 类型的页面渲染正确的组件。
- 首页、项目页、普通文档页互不影响。

**Verification:** `pnpm docs:dev` 验证各类型页面渲染正确，`pnpm docs:build` 验证 SSR 构建成功。

## Scope Boundaries

**Deferred for later**

- 全文搜索增强（当前 VitePress 本地搜索已满足）
- 评论系统（Giscus 等）
- OG image 自动生成
- 多语言支持
- 图片 CDN 优化（画廊使用外链）

**Outside this scope**

- CMS 后台管理界面
- 用户认证/权限
- 图片托管服务集成

## Open Questions

- OQ1. 画廊分组策略：一个画廊 markdown 文件对应一个主题/场景，还是所有图片放在一个大画廊中？**建议按主题分文件。** Deferred to implementation — 首个画廊文件的结构即可确定模式。
- OQ2. 项目详情页的截图画廊是否需要支持外链图片的加载失败 fallback？**Deferred to implementation — 可在 ImageGallery.vue 中添加 onerror 处理。**

## Risks & Dependencies

- **NaiveUI SSR 兼容性**：新增 NaiveUI 组件需确保在 SSR 模式下正确渲染。现有 css-render 集成已处理此问题，但新组件需测试。
- **VitePress Data Loading API 限制**：`createContentLoader` 在构建时运行，开发模式下的 HMR 行为可能与生产构建有差异。需在 dev 和 build 两种模式下测试。
- **iframe X-Frame-Options**：项目预览的 iframe 目标站点可能不允许嵌入。需在项目 frontmatter 中记录此约束。
- **外链图片可用性**：画廊图片依赖外链，链接失效会导致图片无法显示。建议在 lightbox 中添加 fallback 处理。

## Sources / Research

- VitePress Data Loading API: https://vitepress.dev/guide/data-loading
- VitePress 动态路由: https://vitepress.dev/guide/routing
- VitePress 自定义主题: https://vitepress.dev/guide/custom-theme
- 现有数据加载器示例: `vitepress/bak/docs/.vitepress/theme/example.data.ts`
- 现有布局模式: `docs/.vitepress/theme/MyLayout.vue`（layout 条件判断 + slot 注入）
- ProjectTracker 组件: `docs/.vitepress/theme/components/ProjectTracker.vue`
