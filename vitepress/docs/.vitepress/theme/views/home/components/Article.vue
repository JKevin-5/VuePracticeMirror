<script setup>
import { ref } from 'vue'

const props = defineProps({
    post: {
        type: Object,
        default: () => ({})
    }
})

</script>

<template>
    <div class="border p-4 m-4">
        <h3 @click="">{{ post.frontmatter.title }}</h3>
        <br>
        <span v-for="(tag,index) in post.frontmatter.tags" :key="index">
            #{{ tag }}
        </span>
        <br>
        date: {{ post.frontmatter.date }}
        <br>
        <div v-html="post.excerpt"></div>
        <br>
        url: {{ post.url }}
    </div>
</template>

<style scoped>
</style>