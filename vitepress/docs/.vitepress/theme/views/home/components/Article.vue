<script setup>
import { defineProps,ref } from 'vue'

const props = defineProps({
    post: {
        type: Object,
        default: () => ({})
    }
})
console.log(props.post)
</script>

<template>
    <div>
        title: {{ post.frontmatter.title }}
        <br>
        tags: {{ post.frontmatter.tags }}
        <br>
        date: {{ post.frontmatter.date }}
        <br>
        description: {{ post.frontmatter.description }}
        <br>
        excerpt: {{ post.excerpt }}
        <br>
        url: {{ post.url }}
    </div>
</template>

<style scoped>
</style>