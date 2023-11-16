<template>
    <OutlineVue>
        <van-row>
            <form action="/">
                <van-search placeholder="请输入搜索内容" show-action v-model="searchContent" @search="search"/>
            </form>
        </van-row>
        <van-row gutter="10" class="content" type="flex" justify="space-around">
            <van-col v-for="index in 15" :key="index"  span="8" style="margin-top:1rem;">
                <div class="chunk">
                    
                </div>
            </van-col>
        </van-row>
    </OutlineVue>
</template>

<script>
import OutlineVue from './layout/Outline.vue'
export default {
    components:{
        OutlineVue
    },
    data() {
        return {
            searchContent: ''
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        search(value) {
            console.log(value)
        }
    }
}
</script>

<style scoped>
.chunk {
    height: 8rem;
    border: 1px solid;
    border-radius: 20px;
}

.content {
    flex:1;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
</style>