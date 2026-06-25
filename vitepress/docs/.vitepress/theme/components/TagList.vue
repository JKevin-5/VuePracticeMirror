<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { NTag } from 'naive-ui'
import { withBase, useRoute } from 'vitepress'
import linksData from 'virtual:links-data'

const allTags = linksData.tags || {}
const tagNames = Object.keys(allTags).sort()
const route = useRoute()
const activeTag = ref(null)

// 从 URL 读取 ?tag=xxx
function readQueryTag() {
  const params = new URLSearchParams(window.location.search)
  const tag = params.get('tag')
  if (tag) {
    // 大小写不敏感匹配
    const match = tagNames.find(t => t.toLowerCase() === tag.toLowerCase())
    if (match) activeTag.value = match
  }
}

// 更新 URL 的 ?tag=xxx
function updateUrl(tag) {
  const url = new URL(window.location.href)
  if (tag) {
    url.searchParams.set('tag', tag)
  } else {
    url.searchParams.delete('tag')
  }
  history.replaceState(null, '', url)
}

function toggle(tag) {
  const next = activeTag.value === tag ? null : tag
  activeTag.value = next
  updateUrl(next)
}

// 构建文章 → 最新修改日期的映射
const heatmap = linksData.heatmap || {}
const articleDateMap = {}
for (const [date, files] of Object.entries(heatmap)) {
  for (const file of files) {
    if (!articleDateMap[file.path] || date > articleDateMap[file.path]) {
      articleDateMap[file.path] = date
    }
  }
}

// 按时间排序（最新在前）
function sortByDate(articles) {
  return [...articles].sort((a, b) => {
    return (articleDateMap[b.path] || '').localeCompare(articleDateMap[a.path] || '')
  })
}

// 所有文章（去重 + 按时间排序）
const allArticles = computed(() => {
  const seen = new Set()
  const result = []
  for (const articles of Object.values(allTags)) {
    for (const article of articles) {
      if (!seen.has(article.path)) {
        seen.add(article.path)
        result.push(article)
      }
    }
  }
  return sortByDate(result)
})

const activeArticles = computed(() => {
  if (!activeTag.value) return allArticles.value
  return sortByDate(allTags[activeTag.value] || [])
})

// 监听路由变化（VitePress SPA 导航时）
watch(() => route.path, () => {
  readQueryTag()
})

onMounted(() => {
  readQueryTag()
})
</script>

<template>
  <div class="tag-list">
    <!-- 标签云 -->
    <div class="tag-cloud">
      <n-tag
        v-for="tag in tagNames"
        :key="tag"
        :type="activeTag === tag ? 'success' : 'default'"
        round
        size="medium"
        checkable
        :checked="activeTag === tag"
        @update:checked="toggle(tag)"
      >
        {{ tag }}
        <span class="tag-count">({{ allTags[tag].length }})</span>
      </n-tag>
    </div>

    <!-- 文章列表 -->
    <div class="tag-articles">
      <h3 class="tag-heading">{{ activeTag || '全部文章' }}</h3>
      <a
        v-for="article in activeArticles"
        :key="article.path"
        :href="withBase(article.path)"
        class="tag-article-link"
      >
        <span class="article-title">{{ article.title }}</span>
        <span class="article-date">{{ articleDateMap[article.path] || '' }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.tag-list {
  padding: 24px 0;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.tag-count {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-left: 2px;
}

.tag-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin: 0 0 12px;
}

.tag-articles {
  padding: 0;
}

.tag-article-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: color 0.2s;
}

.article-date {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  flex-shrink: 0;
  margin-left: 16px;
}

.tag-article-link:last-child {
  border-bottom: none;
}

.tag-article-link:hover {
  color: var(--vp-c-brand-1);
}

.tag-hint p {
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  margin: 0;
}
</style>
