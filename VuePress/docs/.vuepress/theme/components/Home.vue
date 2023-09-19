<template>
    <div>
        <main class="home">
            <HomeHero />
            <chart :profile="profile"/>
            <!-- <div class="dashboard">
                <div class="left">
                    <h3>Last</h3>
                    <ul>
                        <li v-for="(item,index) in last10" :key="index">
                            {{timestampToTime(item.git.updatedTime)}} <router-link :to="item.path">{{item.title}}</router-link>
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <h3>Tags</h3>
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
            </div> -->
            <HomeFooter style="margin-top:200px;"/>
        </main>
    </div>
</template>

<script>
import HomeHero from '@theme/HomeHero.vue'
import HomeFooter from '@theme/HomeFooter.vue'
import Navbar from '@theme/Navbar.vue'
import Chart from '../components/chart.vue'
import { usePages } from '@temp/pages'
export default {
    components: {
        // 官方原生的header,可以直接拿来用
        Navbar,
        Chart,
        HomeFooter,
        HomeHero,
    },
    data(){
        return{
            profile:{'2023-01-01':1, '2023-01-02': 11},
            last10:[],
            // 总的tag分类
            tags:[],
            // 存储tag对象画面
            pages:{},
            // 画面显示list
            list:[],
            // 空白tag
            blank:'无Tag',
        }
    },
    created(){
        // 获取所有页面信息
        const arr = usePages()
        const tagSet = new Set()
        this.pages[this.blank]=new Array();
        tagSet.add(this.blank)
        arr.forEach(element => {
            // this.profile.push(element)
            let timestamp = this.timestampToTime(element.git.updatedTime);
            if(this.profile[timestamp]){
                this.profile[timestamp]++;
            }else{
                this.profile[timestamp]=1;
            }
            if(!!element.frontmatter.tag){
                if(!this.pages[element.frontmatter.tag]){
                    this.pages[element.frontmatter.tag]=new Array();
                }
                this.pages[element.frontmatter.tag].push(element);
                tagSet.add(element.frontmatter.tag);
            }else{
                this.pages[this.blank].push(element);
            }
        });

        this.tags = Array.from(tagSet)

        arr.sort((a,b)=>b.git.updatedTime-a.git.updatedTime);
        this.last10 = arr.slice(0,10)
    },
    methods:{
        /* 
         * 时间戳：1637244864707
         * 时间戳转换为时间 
         */
        timestampToTime(timestamp) {
            timestamp = timestamp ? timestamp : null;
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            // return Y + M + D + h + m + s;
            return Y + M + D;
        },
        showList(name){
            this.list = this.pages[name]
        }
    }
}
</script>
<style scoped>
.dashboard {
    margin: auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap:20px;
}

.left {
    float: left;
}

.right {
    float: right;
}

</style>