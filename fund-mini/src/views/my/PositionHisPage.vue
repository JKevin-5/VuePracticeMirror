<template>
    <div class="main">
        <div class="header">
            <van-sticky>
                <van-nav-bar
                    title=""
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                />
            </van-sticky>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                
            }
        },
        created(){

        },
        methods:{
            init:function(){
                
            },
            onClickLeft:function(){
                this.$router.back(0);
            }
        }
    }
</script>

<style lang="less" scoped>
.main{
  background-color: #f7f8fa;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main_part{
    top: 10vh;
    height: 85vh;
    overflow: auto;
    // 阻止父滚动
    display: block;
    overscroll-behavior: contain;
    -ms-scroll-chaining: contain;
}
.header {
    height: 5vh;
}
.main_part .van-col{
    text-align: center;
}
.total {
    padding-top: 20px;
}
.detail {
    padding-top: 10px;
}
.footer {
    height: 7vh;
    width: 100vw;
    background-color: white;
    bottom: 0;
    left: 0;
    position: fixed;
}
.footer .van-col {
    padding: 10px;
}
.footer .van-button {
    border-radius: 5px;
    width: 100%;
}
</style>