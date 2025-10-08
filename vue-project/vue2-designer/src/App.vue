<script setup>
import { ref } from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'

const vLine = ref([]);
const hLine = ref([]);
// 辅助线回调事件
const getRefLineParams = (params) => {
  vLine.value = params.vLine
  hLine.value = params.hLine
}
</script>

<template>
  <div class="pixel-dashed-border">
    <vue-draggable-resizable :grid=[20,20] :parent="true" :is-conflict-check="true" style="background-color: lightgreen;" :snap="true" :snapTolerance="10" @refLineParams="getRefLineParams">
      <p>Grid 20x20 starting from the top-left corner</p>
    </vue-draggable-resizable>
    <vue-draggable-resizable :grid=[20,20] :parent="true" :is-conflict-check="true" style="background-color: lightblue;" :snap="true" :snapTolerance="10" @refLineParams="getRefLineParams">
      <p>Grid 20x20 starting from the top-left corner</p>
    </vue-draggable-resizable>
        <span class="ref-line v-line"
          v-for="item in vLine"
          v-show="item.display"
          :style="{ left: item.position, top: item.origin, height: item.lineLength}"
    />
    <span class="ref-line h-line"
          v-for="item in hLine"
          v-show="item.display"
          :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />
  </div>
</template>

<style scoped>
.pixel-dashed-border {
    position: relative;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 20px 20px;
    width: 100vw;
    height: 100vh;
}
</style>
