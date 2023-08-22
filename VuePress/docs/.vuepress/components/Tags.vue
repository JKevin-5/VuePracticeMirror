<template>
    <div>
        <h1>Tags</h1>
        <ul>
            <li v-for="(item,index) in tags" :key="index" @click="showList(item)">
                {{item}}
            </li>
        </ul>
        <ul>
            <li v-for="(item,index) in list" :key="index" >
                <router-link :to="item.path">{{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { usePages } from '@temp/pages'
export default {
    components: {
    },
    data(){
        return{
            // 总的tag分类
            tags:[],
            // 存储tag对象画面
            pages:{},
            // 画面显示list
            list:[],
            // 空白tag
            blank:'无Tag',
            // 配置
            optoins:{}
        }
    },
    created(){
        // 获取所有页面信息
        const arr = usePages()
        const tagSet = new Set()
        this.pages[this.blank]=new Array();
        tagSet.add(this.blank)
        arr.forEach(element => {
            if(!!element.frontmatter.tag){
                if(!this.pages[element.frontmatter.tag]){
                    this.pages[element.frontmatter.tag]=new Array();
                }
                this.pages[element.frontmatter.tag].push(element);
                tagSet.add(element.frontmatter.tag);
            }else{
                this.pages[this.blank].push(element);
            }
        })
        this.tags = Array.from(tagSet)
    },
    methods:{
        showList(name){
            this.list = this.pages[name]
        }
    }
}
</script>