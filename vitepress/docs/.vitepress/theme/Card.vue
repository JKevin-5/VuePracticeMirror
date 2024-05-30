<script setup>
import { withBase } from 'vitepress'
import {data} from './example.data.ts'
import {ref} from 'vue'

var srcUrl = ref('');

function clickUrl(url){
    srcUrl.value = url;
}

</script>

<template>
    <h1>All Blog Posts</h1>
    <ul>
        <li v-for="post of data">
            <!-- <a :href="post.url">{{ post.frontmatter.title }}</a>
            <span>by {{ post.frontmatter.author }}</span> -->
            <button @click="clickUrl(withBase(post.url))">{{post}}</button>
        </li>
    </ul>
    <iframe :src="srcUrl" frameborder="0" class="blog-card">

    </iframe>
</template>

<style scoped>
.blog-card{
    width: 100%;
    height: 300px;
    border: 1px solid #000;
    border-radius: 10px;
    margin-top: 10px;
}
</style>