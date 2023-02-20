<template>
    <div class="main">
        <div class="header">
            <van-sticky>
                <van-nav-bar
                    title="编辑持仓"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                />
            </van-sticky>
        </div>
        <div class="main_part">

        </div>
        <div class="footer" >
            <van-row>
                <van-col>
                    <van-button type="info">保存</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        created(){
            console.log("1");
        },

    }
</script>

<style lang="less" scoped type='text/css'>
.main{
  background-color: #f7f8fa;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.header {
    height: 5vh;
}
.main_part .van-col{
    text-align: center;
}
.footer {
    height: 8vh;
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