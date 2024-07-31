<script setup>
import { defineProps,ref } from 'vue'

import { data as posts } from './posts.data.js'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
    <div>
        title: {{ frontmatter.title }}
        <br>
        tags: {{ frontmatter.tags }}
        <br>
    </div>
</template>

<style scoped>
</style>