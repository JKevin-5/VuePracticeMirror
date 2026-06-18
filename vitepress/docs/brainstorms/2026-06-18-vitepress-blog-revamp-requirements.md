---
date: 2026-06-18
topic: vitepress-blog-revamp
---

## Summary

将现有 VitePress 博客从松散的笔记集合升级为四大板块的个人技术博客：学习笔记、技术文章、项目展示、图片画廊。核心目标是「写 markdown/YAML 即自动生成页面」——作者只需维护内容文件，列表页、筛选、归档、展示页全部由 VitePress Data Loading API + 自定义 Vue 组件自动构建。

## Problem Frame

当前博客存在几个结构性问题：

- **导航碎片化**：Posts、Demos、Notes 三个区域内容有重叠（`/demos/js.md` 和 `/notes/js/index.md` 内容几乎相同），sidebar 覆盖不全（`/notes/js/`、`/notes/go/`、`/projects/` 均无 sidebar 定义）。
- **项目展示单薄**：`/projects/index.md` 只有一个热力图和开发日志，无法承载截图预览、在线演示等项目展示需求。
- **无内容发现机制**：没有标签、归档、分类筛选，读者只能通过导航逐层点击。
- **首页信息量低**：当前 hero + 三个 emoji feature card 无法展示博客的动态内容。

## Key Decisions

**采用 VitePress Data Loading API 作为内容引擎。** VitePress 内置的 `createContentLoader` 和 `loadEnv` 可以在构建时扫描所有 markdown 文件的 frontmatter，生成文章列表、标签索引、归档数据。无需引入外部 CMS 或额外构建工具。这是 VitePress 原生能力，SSR 兼容性好，且与现有 NaiveUI 体系无冲突。

**项目展示页由 markdown frontmatter 驱动。** 每个项目一个 markdown 文件，frontmatter 包含项目元数据（名称、描述、截图列表、iframe 地址、开发日志等字段），正文用于项目说明文档。VitePress 构建时读取这些数据，通过自定义 layout 自动生成完整展示页。作者新增项目只需添加一个文件。

**图片画廊使用外链图片。** 图片不存放在项目仓库中，通过 URL 引用。画廊页面由 VitePress Data Loader 扫描 gallery 目录下的 markdown 文件（每个文件 frontmatter 包含图片 URL 列表），自动生成瀑布流/网格布局。

**合并 Posts 和 Demos 为统一的 Blog 板块。** 原 `/posts/` 和 `/demos/` 内容合并到 `/blog/`，统一 frontmatter 规范（date、tags、categories、description）。消除内容重复，统一入口。

## Requirements

**板块结构**

- R1. 博客包含四个顶级板块：学习笔记（/notes）、技术文章（/blog）、项目展示（/projects）、图片画廊（/gallery）。
- R2. 导航栏展示四个板块入口，当前的 "Posts"、"Demos"、"More" 下拉菜单替换为新的四板块导航。
- R3. 每个板块有完整的 sidebar 配置，覆盖所有子页面。

**首页信息流**

- R4. 首页从 hero 风格改为信息流风格，展示最新文章摘要、项目动态、精选图片。
- R5. 信息流数据通过 VitePress Data Loading API 在构建时生成，不依赖运行时请求。
- R6. 首页展示标签云或热门标签，点击可跳转到对应标签的筛选页。

**技术文章板块**

- R7. 原 `/posts/` 和 `/demos/` 的内容迁移到 `/blog/` 目录。
- R8. 每篇文章的 frontmatter 包含 `date`、`title`、`tags`（数组）、`categories`（字符串）、`description` 字段。
- R9. 自动生成文章列表页，按日期倒序排列，展示标题、日期、标签、摘要。
- R10. 支持按标签筛选：点击标签显示该标签下的所有文章。
- R11. 支持按分类筛选：分类维度如 "前端"、"后端"、"工具" 等。
- R12. 支持按日期归档：按年/月分组展示文章列表。

**项目展示板块**

- R13. 每个项目由一个 markdown 文件定义，frontmatter 包含项目元数据（名称、描述、技术栈、截图列表、iframe 地址、部署地址、开发日志等）。
- R14. 项目列表页展示所有项目的卡片，包含项目名称、描述缩略、技术栈标签、缩略图。
- R15. 项目详情页自动生成以下区域：项目简介、技术栈标签、截图画廊（可点击放大）、iframe 在线预览区、开发日志时间线（复用现有 ProjectTracker 组件逻辑）。
- R16. iframe 预览区支持懒加载，不在首屏时才加载 iframe 内容。
- R17. 现有 ProjectTracker 的热力图和开发日志功能保留，数据来源从硬编码 frontmatter 改为统一的项目 YAML/frontmatter 结构。

**图片画廊板块**

- R18. 画廊图片通过外链 URL 引用，不存放在项目仓库中。
- R19. 每个画廊页面（或画廊分组）由一个 markdown 文件定义，frontmatter 包含图片列表（URL + 可选描述）。
- R20. 画廊展示采用瀑布流或网格布局，支持响应式。
- R21. 点击图片弹出 lightbox 查看大图，支持左右切换。
- R22. 画廊首页展示最新/精选图片的缩略图预览。

**内容自动化**

- R23. 所有列表页（文章列表、项目列表、画廊列表）通过 VitePress `createContentLoader` 在构建时自动生成。
- R24. 标签索引页自动聚合所有文章和项目的标签，展示标签云及各标签下的内容数量。
- R25. 归档页自动按年月分组展示所有文章。

## Key Flows

- F1. **作者发布新文章**
  - **Trigger:** 作者在 `/blog/` 下新建一个 markdown 文件。
  - **Steps:** 编写 frontmatter（date、title、tags、categories、description）→ 编写正文内容 → 提交。构建时 Data Loader 自动扫描新文件，文章出现在列表页、标签页、归档页中。
  - **Outcome:** 无需修改任何配置文件或导航代码，新文章自动可见。

- F2. **作者添加新项目**
  - **Trigger:** 作者在 `/projects/` 下新建一个 markdown 文件。
  - **Steps:** 编写 frontmatter（项目名、描述、技术栈、截图 URL 列表、iframe 地址、开发日志）→ 编写项目说明正文 → 提交。构建时自动出现在项目列表页，详情页包含截图、iframe、日志。
  - **Outcome:** 一个文件定义整个项目展示页。

- F3. **作者添加画廊图片**
  - **Trigger:** 作者在 `/gallery/` 下新建或编辑 markdown 文件。
  - **Steps:** 在 frontmatter 的图片列表中添加外链 URL 和可选描述 → 提交。构建时自动出现在画廊页面。
  - **Outcome:** 无需处理图片上传或优化，外链直接引用。

- F4. **读者浏览博客**
  - **Trigger:** 读者访问首页。
  - **Steps:** 看到信息流（最新文章、项目动态、精选图片）→ 点击标签筛选 → 进入文章详情 → 通过导航访问项目展示 → 查看 iframe 在线预览 → 浏览画廊。
  - **Outcome:** 四个板块互通，内容可发现性强。

## Scope Boundaries

**Deferred for later**

- 文章全文搜索增强：当前 VitePress 本地搜索已满足基本需求，暂不引入 Algolia。
- 评论系统：暂不集成 Giscus 或其他评论方案。
- 文章封面图自动生成：暂不做 OG image 自动生成。
- 多语言支持：当前博客仅中文，暂不考虑 i18n。

**Outside this scope**

- CMS 后台管理界面：所有内容通过 markdown 文件 + Git 管理，不做可视化编辑器。
- 用户认证/权限：博客为纯静态站点，不做登录功能。
- 图片托管服务集成：画廊使用外链，不集成 OSS/S3 等图片上传服务。

## Dependencies / Assumptions

- VitePress Data Loading API（`createContentLoader`）在当前版本（^1.4.2）可用且稳定。
- 现有 NaiveUI SSR 集成（css-render）在新增组件后仍然兼容。
- 画廊外链图片的域名稳定可用，不会频繁失效。
- iframe 预览的目标项目已独立部署且允许被 iframe 嵌入（无 X-Frame-Options 限制）。

## Outstanding Questions

- RQ1. 画廊的瀑布流布局是否需要自定义实现，还是引入轻量级第三方库（如 vue-masonry-css）？**Deferred to Planning.**
- RQ2. 标签筛选页是独立页面还是首页内的 Tab 切换？**Deferred to Planning.**
- RQ3. 现有 `/examples/` 和 `/guide/` 目录是否保留？它们是 VitePress 脚手架默认内容，与新四大板块无关。**Deferred to Planning.**
- RQ4. 首页信息流的具体布局规则：三类内容（文章、项目、图片）的排列方式、每类展示条数、项目动态和精选图片的定义。**Deferred to Planning.**
- RQ5. 画廊「精选」机制：通过 frontmatter `featured` 标记、按时间取最新 N 张、还是首页只展示最新画廊的缩略图。**Deferred to Planning.**
- RQ6. 标签筛选的交互方式：独立路由页面还是列表页内 Tab 切换。**Deferred to Planning.**
