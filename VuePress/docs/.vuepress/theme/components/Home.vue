<template>
    <div>
        <main class="home">
            <HomeHero />
            <chart :profile="profile"/>
            <HomeFooter />
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
            profile:{'2023-01-01':1, '2023-01-02': 11}
        }
    },
    created(){
        // 获取所有页面信息
        const arr = usePages()
        arr.forEach(element => {
            // this.profile.push(element)
            let timestamp = this.timestampToTime(element.git.updatedTime);
            if(this.profile[timestamp]){
                this.profile[timestamp]++;
            }else{
                this.profile[timestamp]=1;
            }
        });
    },
    methods:{
        // 时间戳：1637244864707
        /* 时间戳转换为时间 */
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
        }
    }
}
</script>
