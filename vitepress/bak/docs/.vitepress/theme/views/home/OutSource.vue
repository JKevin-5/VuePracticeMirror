<script setup>
import { useData } from 'vitepress'

const { page, frontmatter } = useData()
</script>
<template>
    <div>
        <iframe :src="frontmatter.src" frameborder="0" style="width: 100%;height: 60vh;"></iframe>
    </div>
</template>