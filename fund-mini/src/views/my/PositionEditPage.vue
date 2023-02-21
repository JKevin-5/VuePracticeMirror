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
            <div class="total">
                <van-cell-group inset>
                    <van-field v-model="position.fundCode" type="number" label="基金代码" placeholder="请输入基金代码" />
                    <van-field v-model="position.positionHold" type="number" label="持有份额" placeholder="请输入持有份额" />
                </van-cell-group>
            </div>
        </div>
        <div class="footer" >
            <van-row>
                <van-col :span="24">
                    <van-button type="info" @click="onSave">保存</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {addPosition} from '@/api/position';
    export default {
        data(){
            return {
                position:{
                    fundCode:'',
                    positionHold:''
                }
            }
        },
        created(){

        },
        methods:{
            onClickLeft:function(){
                this.$router.back(0);
            },
            onSave:function(){
                addPosition(this.position).then(res=>{
                    this.$toast.success(res.msg)
                })
            }
        }
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
.total {
    padding-top: 20px;
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