<script setup>
import { computed } from 'vue'
import { NCard, NTimeline, NTimelineItem, NTag, NSpace, NEmpty } from 'naive-ui'
import { useData } from 'vitepress'

const { frontmatter, isDark } = useData()

const logs = computed(() => frontmatter.value.logs || [])
const projectName = computed(() => frontmatter.value.title || '')

const logTypeMap = {
  feature: { label: '新功能', color: 'success' },
  fix: { label: '修复', color: 'warning' },
  refactor: { label: '重构', color: 'info' },
  docs: { label: '文档', color: 'default' },
  chore: { label: '杂项', color: 'error' }
}

const heatmapData = computed(() => {
  const map = {}
  logs.value.forEach(log => {
    map[log.date] = (map[log.date] || 0) + 1
  })
  return map
})

const heatmapCells = computed(() => {
  const cells = []
  const dateRange = frontmatter.value.heatmapRange
  let endDate = new Date()
  let startDate = new Date(endDate)
  startDate.setFullYear(startDate.getFullYear() - 1)

  if (dateRange) {
    const [s, e] = dateRange.split('~').map(d => new Date(d.trim()))
    if (!isNaN(s.getTime())) startDate = s
    if (!isNaN(e.getTime())) endDate = e
  }

  startDate.setDate(startDate.getDate() - startDate.getDay())
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

  const current = new Date(startDate)
  while (current <= endDate) {
    const dateStr = current.toISOString().slice(0, 10)
    const count = heatmapData.value[dateStr] || 0
    cells.push({ date: dateStr, count })
    current.setDate(current.getDate() + 1)
  }
  return cells
})

const maxCount = computed(() => {
  const vals = Object.values(heatmapData.value)
  return vals.length ? Math.max(...vals) : 1
})

function getHeatColor(count) {
  if (count === 0) return 'var(--vp-c-bg-soft, #ebedf0)'
  const level = Math.min(Math.ceil((count / maxCount.value) * 4), 4)
  const colors = isDark.value
    ? ['', '#0e4429', '#006d32', '#26a641', '#39d353']
    : ['', '#9be9a8', '#40c463', '#30a14e', '#216e39']
  return colors[level] || colors[1]
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-')
  return `${y}/${m}/${d}`
}

const totalDays = computed(() => Object.keys(heatmapData.value).length)
const totalCount = computed(() => logs.value.length)
const dayNames = ['日', '一', '二', '三', '四', '五', '六']
</script>

<template>
  <div class="project-tracker">
    <n-card title="开发热力图" :bordered="false" class="heatmap-card">
      <div class="heatmap-stats">
        <span class="stat-item">共 <strong>{{ totalCount }}</strong> 条记录</span>
        <span class="stat-item">活跃 <strong>{{ totalDays }}</strong> 天</span>
      </div>
      <div class="heatmap-wrapper">
        <div class="heatmap-labels">
          <span style="height:12px;line-height:12px;font-size:10px;color:var(--vp-c-text-3)">一</span>
          <span style="height:12px;line-height:12px;font-size:10px;color:var(--vp-c-text-3);margin-top:14px">三</span>
          <span style="height:12px;line-height:12px;font-size:10px;color:var(--vp-c-text-3);margin-top:14px">五</span>
        </div>
        <div class="heatmap-grid">
          <div
            v-for="cell in heatmapCells"
            :key="cell.date"
            class="heatmap-cell"
            :style="{ backgroundColor: getHeatColor(cell.count) }"
            :title="`${cell.date}: ${cell.count} 条记录`"
          />
        </div>
      </div>
      <div class="heatmap-legend">
        <span class="legend-label">少</span>
        <div class="heatmap-cell legend-cell" style="backgroundColor: var(--vp-c-bg-soft, #ebedf0)" />
        <div v-for="i in 4" :key="i" class="heatmap-cell legend-cell" :style="{ backgroundColor: getHeatColor(i) }" />
        <span class="legend-label">多</span>
      </div>
    </n-card>

    <n-card title="开发日志" :bordered="false" class="log-card">
      <n-empty v-if="logs.length === 0" description="暂无开发日志" />
      <n-timeline v-else>
        <n-timeline-item
          v-for="(log, idx) in logs"
          :key="idx"
          :type="logTypeMap[log.type]?.color || 'default'"
        >
          <template #header>
            <div class="log-header">
              <n-tag :type="logTypeMap[log.type]?.color || 'default'" size="small" round>
                {{ logTypeMap[log.type]?.label || log.type }}
              </n-tag>
              <span class="log-date">{{ formatDate(log.date) }}</span>
            </div>
          </template>
          <div class="log-content">{{ log.content }}</div>
        </n-timeline-item>
      </n-timeline>
    </n-card>
  </div>
</template>

<style scoped>
.project-tracker {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}
.heatmap-card,
.log-card {
  background: var(--vp-c-bg-soft);
}
.heatmap-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.heatmap-stats strong {
  color: var(--vp-c-text-1);
}
.heatmap-wrapper {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.heatmap-labels {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.heatmap-grid {
  display: grid;
  grid-template-rows: repeat(7, 12px);
  grid-auto-flow: column;
  gap: 3px;
}
.heatmap-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  transition: all 0.15s ease;
  cursor: default;
}
.heatmap-cell:hover {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 1px;
}
.heatmap-legend {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-top: 8px;
  justify-content: flex-end;
}
.legend-label {
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin: 0 4px;
}
.log-header {
  display: flex;
  align-items: center;
  gap: 8px;
}
.log-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.log-content {
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin-top: 4px;
}
</style>
