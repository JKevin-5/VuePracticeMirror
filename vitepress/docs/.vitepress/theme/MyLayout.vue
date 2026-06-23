<script setup>
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useData } from 'vitepress'
import ProjectTracker from './components/ProjectTracker.vue'
import PageLinks from './components/PageLinks.vue'

const { Layout } = DefaultTheme
const { isDark, frontmatter } = useData()

const isProjectLayout = computed(() => frontmatter.value.layout === 'project')
const isHome = computed(() => frontmatter.value.layout === 'home')
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : ''">
    <Layout>
      <!-- doc-after: 在内容区内部，自动与 markdown 对齐 -->
      <template #doc-after>
        <PageLinks />
      </template>
      <!-- doc-bottom: 全宽区域，用于项目追踪 -->
      <template #doc-bottom>
        <div v-if="isProjectLayout" class="project-tracker-wrapper">
          <ProjectTracker />
        </div>
      </template>
    </Layout>
  </n-config-provider>
</template>

<style scoped>
.doc-bottom-wrapper {
  padding-bottom: 24px;
}
.project-tracker-wrapper {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 48px;
}
</style>
