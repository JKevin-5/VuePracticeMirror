<template>
    <div class="main">
        <div class="header">
            <van-sticky>
                <van-nav-bar
                    title="我的持仓"
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
                            <van-col span="8" offset="8">
                                <p>总资产(元)</p>
                                <p>****</p>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="11">
                                <p>昨日收益</p>
                                <p>****</p>
                            </van-col>
                            <van-col span="2">|</van-col>
                            <van-col span="11">
                                <p>累计收益</p>
                                <p>****</p>
                            </van-col>
                        </van-row>
                    </van-cell>
                </van-cell-group>
            </div>
            <div class="detail">
                <van-cell-group inset v-if="positionList.length >0">
                    <van-cell center v-for="position in positionList" :key="position.positionDbid" @click="onShow(position)">
                        <!-- 使用插槽来自定义单元格内容 -->
                        <template #title>
                            <span class="custom-title">{{position.fundName}}</span>
                        </template>
                        <template #label>
                            <span class="custom-title">
                                <!-- <p>资产(元)</p>
                                <p>****</p> -->
                                <p>{{position.fundCode}}</p>
                            </span>
                        </template>
                        <template #right-icon>
                            <van-row gutter="20">
                                <!-- <van-col>
                                    <p>昨日收益</p>
                                    <p>****</p>
                                </van-col> -->
                                <van-col>
                                    <p>持有份额</p>
                                    <p>{{position.positionHold}}</p>
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
                    <van-button type="default">管理持仓</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="info" to="/positionEdit">添加资产</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import {getAllPosition} from '@/api/position';
    export default {
        data(){
            return{
                // 持仓列表
                positionList:[],
                // 
            }
        },
        created(){
            // 请求个人持仓的基金列表
            this.getMyPositions()
        },
        methods:{
            onClickLeft:function(){
                this.$router.back(0);
            },
            getMyPositions:function(){
                getAllPosition({
                    size:100
                }).then( res =>{
                    this.positionList = res.data
                })
            },
            onShow:function(res){
                this.$router.push({ name: 'positionHis', params: res});
            }
        }
    }
</script>

<style lang='less' scoped type='text/css'>
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