<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { NCard, NTag } from 'naive-ui'
import linksData from 'virtual:links-data'

const { page } = useData()

// 当前页面的正向链接（当前页面引用了谁）
const forwardLinks = computed(() => {
  const currentPath = '/' + page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '/')
  const raw = linksData.links[currentPath] || []
  return raw
    .map(p => ({
      path: p,
      title: findTitle(p) || p
    }))
})

// 当前页面的逆向链接（谁引用了当前页面）
const backwardLinks = computed(() => {
  const currentPath = '/' + page.value.relativePath.replace(/\.md$/, '').replace(/\/index$/, '/')
  const raw = linksData.backlinks[currentPath] || []
  return raw
    .map(p => ({
      path: p,
      title: findTitle(p) || p
    }))
})

const showComponent = computed(() =>
  forwardLinks.value.length > 0 || backwardLinks.value.length > 0
)

// 从 linksData 中获取页面标题
function findTitle(path) {
  // 尝试多种路径格式匹配
  const candidates = [path, path + '/', path.replace(/\/$/, '')]
  for (const key of candidates) {
    if (linksData.titles?.[key]) return linksData.titles[key]
  }
  // 回退：取路径最后一段作为标题
  const segs = path.split('/').filter(Boolean)
  return segs[segs.length - 1] || path
}
</script>

<template>
  <div v-if="showComponent" class="page-links">
    <!-- 逆向链接：谁引用了当前页面 -->
    <div v-if="backwardLinks.length" class="link-section">
      <h4 class="link-heading">
        <span class="link-icon">⬅</span>
        被引用（{{ backwardLinks.length }}）
      </h4>
      <div class="link-list">
        <a
          v-for="link in backwardLinks"
          :key="link.path"
          :href="withBase(link.path)"
          class="link-item"
        >
          <n-tag size="small" type="info" :bordered="false">引用</n-tag>
          <span class="link-title">{{ link.title }}</span>
        </a>
      </div>
    </div>

    <!-- 正向链接：当前页面引用了谁 -->
    <div v-if="forwardLinks.length" class="link-section">
      <h4 class="link-heading">
        <span class="link-icon">➡</span>
        引用了（{{ forwardLinks.length }}）
      </h4>
      <div class="link-list">
        <a
          v-for="link in forwardLinks"
          :key="link.path"
          :href="withBase(link.path)"
          class="link-item"
        >
          <n-tag size="small" :bordered="false">链接</n-tag>
          <span class="link-title">{{ link.title }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-links {
  padding: 24px 0 0;
  border-top: 1px solid var(--vp-c-divider);
}

.link-section {
  margin-bottom: 20px;
}

.link-section:last-child {
  margin-bottom: 0;
}

.link-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 0 0 10px;
}

.link-icon {
  font-size: 0.8rem;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.link-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  width: fit-content;
}

.link-item:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.link-title {
  font-weight: 500;
}
</style>
