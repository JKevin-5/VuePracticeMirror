<script setup>
import { ref, computed } from 'vue'
import { NButton, NHeatmap } from 'naive-ui'
import { withBase } from 'vitepress'
import linksData from 'virtual:links-data'

const rawHeatmap = linksData.heatmap || {}
const selectedDate = ref(null)

// 热力图数据：添加一年前锚点，覆盖完整一年
const heatmapData = computed(() => {
  const start = new Date()
  start.setFullYear(start.getFullYear() - 1)
  start.setHours(0, 0, 0, 0)

  const items = Object.entries(rawHeatmap).map(([date, files]) => ({
    timestamp: new Date(date).getTime(),
    value: files.length
  }))

  items.push({ timestamp: start.getTime(), value: 0 })
  return items
})

// 选中日期对应的文章
const selectedArticles = computed(() => {
  if (!selectedDate.value) return []
  return rawHeatmap[selectedDate.value] || []
})

// tooltip slot 中的点击处理
function handleDayClick(day) {
  const dateStr = new Date(day.timestamp).toISOString().slice(0, 10)
  selectedDate.value = selectedDate.value === dateStr ? null : dateStr
}

const features = [
  { icon: '🚀', title: 'Demo 演示', desc: 'VitePress 双向链接等功能演示', link: '/posts/demo' },
  { icon: '🦀', title: 'Rust 入门', desc: 'Rust 系统编程语言基础入门', link: '/posts/rust/rust1' },
  { icon: '⚙️', title: 'Rust 进阶', desc: '生命周期、泛型、trait 等高级特性', link: '/posts/rust/rust2' }
]
</script>

<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <h1 class="hero-title">JKevin's Notes</h1>
      <p class="hero-subtitle">个人学习笔记</p>
      <p class="hero-tagline">Vue · Rust · Java · 前端与后端的点滴积累</p>
      <div class="hero-actions">
        <n-button type="primary" size="large" round tag="a" :href="withBase('/posts/demo')">开始阅读</n-button>
        <n-button size="large" round tag="a" href="https://github.com/JKevin-5" target="_blank">GitHub</n-button>
      </div>
    </section>

    <!-- 热力图 + 文章列表 -->
    <section class="heatmap-section">
      <div class="heatmap-layout">
        <!-- 左：热力图 -->
        <div class="heatmap-left">
          <n-heatmap
            :data="heatmapData"
            color-theme="green"
            tooltip
            fill-calendar-leading
            :first-day-of-week="1"
            size="small"
          >
            <!-- 自定义 tooltip：可点击 -->
            <template #tooltip="day">
              <div class="heatmap-tooltip" @click="handleDayClick(day)">
                {{ new Date(day.timestamp).toISOString().slice(0, 10) }}: {{ day.value }} 篇
                <span v-if="day.value > 0" class="tooltip-hint">点击查看详情</span>
              </div>
            </template>
          </n-heatmap>
        </div>

        <!-- 右：文章列表 -->
        <div class="heatmap-right">
          <div v-if="selectedDate" class="article-panel">
            <p class="article-date">{{ selectedDate }}</p>
            <a
              v-for="article in selectedArticles"
              :key="article.path"
              :href="withBase(article.path)"
              class="article-link"
            >{{ article.title }}</a>
          </div>
          <div v-else class="article-placeholder">
            <p>📅 悬停有颜色的日期</p>
            <p>点击 tooltip 查看更新的文章</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性卡片 -->
    <section class="features">
      <a v-for="item in features" :key="item.title" :href="withBase(item.link)" class="feature-card">
        <div class="feature-icon">{{ item.icon }}</div>
        <h3 class="feature-title">{{ item.title }}</h3>
        <p class="feature-desc">{{ item.desc }}</p>
      </a>
    </section>
  </div>
</template>

<style scoped>
.home {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ===== Hero ===== */
.hero { text-align: center; padding: 80px 0 60px; }
.hero-title {
  font-size: 3rem; font-weight: 800; line-height: 1.2;
  display: inline-block;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  margin: 0 0 8px;
}
.hero-subtitle { font-size: 1.4rem; font-weight: 600; color: var(--vp-c-text-1); margin: 0 0 8px; }
.hero-tagline { font-size: 1rem; color: var(--vp-c-text-2); margin: 0 0 32px; }
.hero-actions { display: flex; gap: 16px; justify-content: center; }

/* ===== 热力图 ===== */
.heatmap-section { padding: 0 0 48px; }

.heatmap-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.heatmap-left {
  flex: 1;
  min-width: 0;
  overflow-x: auto;
}

.heatmap-right {
  width: 220px;
  flex-shrink: 0;
}

/* tooltip 可点击 */
.heatmap-tooltip {
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 1.6;
}

.tooltip-hint {
  display: block;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 2px;
}

/* 文章面板 */
.article-panel {
  padding: 16px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.article-date {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 10px;
}

.article-link {
  display: block;
  padding: 6px 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: color 0.2s;
}

.article-link:last-child { border-bottom: none; }
.article-link:hover { color: var(--vp-c-brand-1); }

.article-placeholder {
  padding: 16px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px dashed var(--vp-c-divider);
  text-align: center;
}

.article-placeholder p {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin: 4px 0;
}

/* ===== 特性卡片 ===== */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-bottom: 60px;
}

.feature-card {
  display: block;
  padding: 28px 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand-1);
}

.feature-icon { font-size: 2.4rem; margin-bottom: 12px; }
.feature-title { font-size: 1.15rem; font-weight: 700; color: var(--vp-c-text-1); margin: 0 0 8px; }
.feature-desc { font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.6; margin: 0; }

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .hero { padding: 48px 0 40px; }
  .hero-title { font-size: 2.2rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .heatmap-layout { flex-direction: column; }
  .heatmap-right { width: 100%; }
  .features { grid-template-columns: 1fr; gap: 12px; }
}

@media (max-width: 480px) {
  .hero { padding: 32px 0 28px; }
  .hero-title { font-size: 1.8rem; }
  .hero-actions { flex-direction: column; align-items: center; }
  .feature-card { padding: 20px 16px; }
}
</style>
