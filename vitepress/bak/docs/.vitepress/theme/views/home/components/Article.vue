<script setup>
import { withBase } from 'vitepress'

const props = defineProps({
    post: {
        type: Object,
        default: () => ({})
    }
})



</script>

<template>
    <div class="border-b-2 p-4">
        <div class="text-2xl leading-8 font-bold tracking-tight">
            <a :href="withBase(post.url)" style="text-decoration: inherit;color: black;font-weight: 700; padding: 0; margin: 0;">
                {{ post.title }}
            </a>
        </div>
        {{ post.date.string }}
        <span class="cursor-pointer hover:text-orange-400" v-for="(tag,index) in post.frontmatter.tags" :key="index" @click="$emit('setTag',tag)">
            #{{ tag }}
        </span>
        <div v-if="post.excerpt" class="bg-orange-50 p-1" v-html="post.excerpt"></div>
    </div>
</template>

<style scoped>

.link {
  color: var(--c-brand);
}

.link:hover {
  color: var(--c-brand-light);
}

:root {
  --c-brand: #3eaf7c;
  --c-brand-light: #4abf8a;
}
</style>