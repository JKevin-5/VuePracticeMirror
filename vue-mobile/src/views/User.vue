<template>
    <outline>
        <van-row type="flex" justify="center" style="padding-top:5rem">
            <van-col>
                <van-image
                    round
                    width="5rem"
                    height="5rem"
                    src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
            </van-col>
        </van-row>
        <van-row>
            <van-cell-group inset>
                <van-cell title="单元格" value="内容"/>
                <van-cell title="单元格" value="内容" label="描述信息" />
                <van-cell title="单元格" value="内容" label="描述信息" />
                <van-cell title="单元格" value="内容" label="描述信息" />
            </van-cell-group>
        </van-row>
  </outline>
</template>

<script>
import outline from './layout/Outline.vue'
export default {
    components:{
        outline
    }
}
</script>

<style scoped>

</style>