<script setup >
import { withBase } from 'vitepress'
import {data} from './example.data.ts'


</script>

<template>
    <h1>All Blog Posts</h1>
    <ul>
        <li v-for="post of data">
            <!-- <a :href="post.url">{{ post.frontmatter.title }}</a>
            <span>by {{ post.frontmatter.author }}</span> -->
            <a :href="withBase(post.url)">{{post}}</a>
        </li>
    </ul>
</template>

<style scoped>

</style>