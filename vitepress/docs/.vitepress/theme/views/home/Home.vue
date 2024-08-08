<script setup>
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
        let index = filterTags.value.indexOf(tag);
        if (index > -1) {
            console.log(index)
            filterTags.value.splice(index,1);
        }
    }
    console.log(filterTags.value);
}

data.forEach((item) => {
    item?.frontmatter?.tags?.forEach((tag) => {
        if (!tags.value.includes(tag)) {
            tags.value.push(tag)
        }
    })
    tags.value = tags.value.sort()
})

function selected(tag){
    if(filterTags.value.includes(tag)){
        return 'bg-orange-100'
    }
}

function setTag(tag){
    filterTags.value = [tag]
}
</script>

<template>
    <div class="flex flex-col">
        <div class="fixed z-1 bg-white dark:bg-slate-900 w-full">
            <button :class="'m-1 text-sm font-bold p-1 border-2 border-solid hover:border-orange-400 rounded-md '+selected(tag)" v-for="tag of tags" @click="() => {setFilterTags(tag)}">{{ tag }}</button>
        </div>
        <ul class="flex-1 pt-5 m-0">
            <li v-for="post of showData" class="flex flex-col ">
                <Article :post="post" @setTag="setTag"></Article>
            </li>
        </ul>
    </div>
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