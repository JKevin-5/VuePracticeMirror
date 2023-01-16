<template>
    <div class="container">
        <van-row>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
            <van-col span="8">span: 8</van-col>
        </van-row>
        <!--底部-->
        <div class="footer">
            <MobileFooter></MobileFooter>
        </div>  
    </div>
</template>
<script>
import MobileFooter from '@/components/MobileFooter.vue';
export default {
    components:{
        MobileFooter
    },
    created(){
        console.log('sss');
    },
    methods:{}
}
</script>