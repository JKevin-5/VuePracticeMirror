<script setup>
import { withBase } from 'vitepress'
import {data} from '../../example.data.ts'
import {ref,computed} from 'vue'
import Article from './components/Article.vue'

let tags = ref([])

let filterTags = ref([])

let showData = computed(() => {
    if(filterTags.value.length == 0){
        return data;
    }else{
        return data.filter((item) => {
            return item.frontmatter.tags?.some((tag) => {
                return filterTags.value.includes(tag)
            })
        })
    }
})

function setFilterTags(tag){
    if(!filterTags.value.includes(tag)){
        filterTags.value.push(tag)
    }else{
        filterTags.value.pop(tag)
    }
}

data.forEach((item) => {
    item?.frontmatter?.tags?.forEach((tag) => {
        if (!tags.value.includes(tag)) {
            tags.value.push(tag)
        }
    })
})

</script>

<template>
    <h1>All Blog Posts</h1>
    <div>
        Tags：<br>
        <button class="bg-blue-300 m-1" v-for="tag of tags" @click="() => {setFilterTags(tag)}">{{ tag }}</button>
    </div>
    <ul>
        <li v-for="post of showData" class="flex flex-col ">
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