<template>
    <OutlineVue>
        <van-row justify="space-between" type="flex" style="margin:0 0.5rem">
            <van-col>
                <span class="fund-font">FUND</span>
            </van-col>
            <van-col>
                <van-icon class="fund-icon" name="search" @click="search"/>
                <van-icon class="fund-icon" name="add-o"/>
            </van-col>
        </van-row>
        <van-row class="content" type="flex">
            <!-- TODO 下拉css有bug，稍后修复 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="width: 100%;padding: 1rem;">
                <van-empty v-if="list.length === 0" image="search" description="描述文字" />
                <van-list
                    v-model="listLoading"
                    :finished="finished"
                    @load="onLoad"
                >
                    <van-cell v-for="item in list" :key="item" :title="item" />
                </van-list>
            </van-pull-refresh>
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
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            refreshing: false,
            count: 0,
            listLoading: false,
            finished: true
        }
    },
    created(){
    },
    methods: {
        onRefresh() {
            this.refreshing = true
            setTimeout(() => {
                this.count++
                this.refreshing = false
                this.$toast.success('刷新成功')
            }, 2000)
        },
        search(){
            this.$toast.success('搜索成功')
        },
        onLoad(){
            this.$toast('加载成功')
        },
    }
}
</script>

<style scoped>
.fund-font{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.fund-icon {
    padding: 1rem;
}
.content {
    flex:1;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
</style>