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
        <div class="main_part">
            <div class="total">
                <van-cell-group inset>
                    <van-cell>
                        <van-row>
                            <van-col span="24">
                                <p style="font-size: 15px;font-weight: bold;">{{position.fundName}}</p>
                                <p>{{position.fundCode}}</p>
                            </van-col>
                        </van-row>
                        <van-row style="text-align: center">
                            <p>金额(元)</p>
                            <p style="font-size: 30px">{{position.amount}}</p>
                        </van-row>
                        <van-row style="text-align: center;padding-top: 20px;">
                            <van-col span="7">
                                <p>持有份额(份)</p>
                                <p>{{position.number}}</p>
                            </van-col>
                            <van-col span="1">|</van-col>
                            <van-col span="8">
                                <p>持有收益(元)</p>
                                <p>+21.4</p>
                            </van-col>
                            <van-col span="1">|</van-col>
                            <van-col span="7">
                                <p>持有收益率</p>
                                <p>+17.91%</p>
                            </van-col>
                        </van-row>
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="detail">
                <van-cell-group inset v-if="positionHisList.length >0">
                    <van-cell center v-for="positionHis in positionHisList" :key="positionHis.positionHisDbid">
                        <!-- 使用插槽来自定义单元格内容 -->
                        <template #title>
                            <span class="custom-title">{{positionHis.actionType}} - {{positionHis.number}}</span>
                        </template>
                        <template #label>
                            <span class="custom-title">
                                <p>{{positionHis.actionTime}}</p>
                            </span>
                        </template>
                        <template #right-icon>
                            <van-row gutter="20">
                                <van-col style="text-align: center;">
                                    <p>卖点</p>
                                    <p>{{positionHis.hopeSellPoint}}%</p>
                                </van-col>
                                <van-col style="text-align: center;">
                                    <p>现点</p>
                                    <p>{{positionHis.actGap}}%</p>
                                </van-col>
                            </van-row>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-empty v-else image="search" description="暂无持仓" />
            </div>
        </div>
        <div class="footer" >
            <van-row>
                <van-col span="12">
                    <van-button type="default">管理记录</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="info" to="/positionEdit">添加记录</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {getAllPositionHis} from '@/api/positionHis';
    export default {
        data(){
            return{
                position:{},
                positionHisList:[]
            }
        },
        created(){
            if(Object.keys(this.$route.params).length==0){
                this.$router.back(0);
            }else{
                this.position = this.$route.params;
                console.log(this.position)
                getAllPositionHis({
                    positionDbid:this.position.positionDbid
                }).then(res=>{
                    this.positionHisList = res.data.positionHisList
                    this.position.amount = res.data.amount
                    this.position.number = res.data.number
                    console.log(res)
                });
            }
        },
        methods:{
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