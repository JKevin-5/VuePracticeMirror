<script setup>
import { computed } from 'vue'
import { NTag } from 'naive-ui'
import { useData, withBase } from 'vitepress'

const { frontmatter } = useData()
const tags = computed(() => frontmatter.value.tags || [])
</script>

<template>
  <div v-if="tags.length" class="article-tags">
    <a
      v-for="tag in tags"
      :key="tag"
      :href="withBase(`/tags/?tag=${encodeURIComponent(tag)}`)"
      class="article-tag"
    >
      <n-tag size="small" round bordered>
        {{ tag }}
      </n-tag>
    </a>
  </div>
</template>

<style scoped>
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.article-tag {
  text-decoration: none;
  cursor: pointer;
}

.article-tag:hover :deep(.n-tag) {
  background-color: #18a058;
  color: #fff;
  border-color: #18a058;
  cursor: pointer;
}
</style>
