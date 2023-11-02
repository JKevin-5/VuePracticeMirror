<template>
    <OutlineVue>
        <van-row gutter="10" style="padding:5rem 1rem 0 1rem;">
            <van-col v-for="index in 12" :key="index"  span="8" style="margin-top:1rem;">
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
</style>