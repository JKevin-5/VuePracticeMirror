<template>
    <OutlineVue>
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
    created() {
    },
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

.content::-webkit-scrollbar {
    display: none;
}
</style>