<script setup>
import { computed } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { darkTheme, NConfigProvider } from 'naive-ui'
import { useData } from 'vitepress'
import ProjectTracker from './components/ProjectTracker.vue'

const { Layout } = DefaultTheme
const { isDark, frontmatter } = useData()

const isProjectLayout = computed(() => frontmatter.value.layout === 'project')
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : ''">
    <Layout>
      <template #doc-bottom>
        <div v-if="isProjectLayout" class="project-tracker-wrapper">
          <ProjectTracker />
        </div>
      </template>
    </Layout>
  </n-config-provider>
</template>

<style scoped>
.project-tracker-wrapper {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 24px 48px;
}
</style>
