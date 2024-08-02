<script setup>
import { withBase } from 'vitepress'
import {data} from '../../example.data.ts'
import {ref} from 'vue'
import Article from './components/Article.vue'

let tags = ref([])

data.forEach((item) => {
    item?.frontmatter?.tags?.forEach((tag) => {
        if (!tags.value.includes(tag)) {
            tags.value.push(tag)
        }
    })
})

console.log(tags.value)

</script>

<template>
    <h1>All Blog Posts</h1>
    <div>
        Tags：
        <button class="border rounded hover:bg-blue-500 hover:text-white active:bg-blue-700" v-for="tag of tags" @click="() => {}">{{ tag }}</button>
    </div>
    <ul>
        <li v-for="post of data" class="flex flex-col ">
            <!-- <a :href="post.url">{{ post.frontmatter.title }}</a>
            <span>by {{ post.frontmatter.author }}</span> -->
            <!-- <a :href='withBase(post.url)'>{{post.url}}</a> -->
            <Article :post="post"></Article>
        </li>
    </ul>
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