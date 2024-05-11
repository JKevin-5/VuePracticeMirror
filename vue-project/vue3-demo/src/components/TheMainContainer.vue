<template>
    <div class="background">
        <vant-row class="header">
            系统设置行
        </vant-row>
        <vant-row class="players">
            <vant-col span="8" class="player1" v-for="i in 3" :key="i">
                <vant-row gutter="10">
                    <vant-col v-for="item in 4" :key="item">
                        <div class="card">{{ item }}</div>
                    </vant-col>
                </vant-row>
            </vant-col>
        </vant-row>
        <vant-row class="main">
            <vant-col span="8"></vant-col>
            <vant-col span="8" class="items">
                <div>牌堆</div>
            </vant-col>
            <vant-col span="8"></vant-col>
        </vant-row>
        <vant-row class="player">
            <vant-row gutter="10">
                <vant-col v-for="item in 4" :key="item">
                    <div class="card1">{{ item }}</div>
                </vant-col>
            </vant-row>
        </vant-row>
    </div>
    <slot></slot>
</template>

<script setup lang="ts">
import { Col as VantCol, Row as VantRow } from 'vant';

</script>

<style scoped>
.background {
    display: flex;
    flex-direction: column;
    background-color: rgb(243, 172, 65);
    height: 100%;
}

.header {
    height: 30px;
    background-color: yellowgreen;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
}

.main {
    flex: 1;
    display: flex;
    width: 100%;
    place-items: center;
}

.player1 {
    display: flex;
    border: 1px solid black;
    background-color: rgb(245, 67, 67);
    justify-content: center;
    align-items: center;
    height: 100px;
}

.players {
    justify-content: center;
    align-items: center;
}

.player {
    display: flex;
    border: 1px solid black;
    background-color: rgb(143, 143, 143);
    justify-content: center;
    align-items: center;
    height: 200px;
}

.items {
    border: 1px solid black;
    background-color: rgb(124, 87, 226);
    justify-content: center;
    align-items: center;
    height: 100px;
    display: flex;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 15px;
    border: 0.5px solid rgb(146, 144, 144);
    background-color: rgb(53, 223, 53);
}

.card1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 70px;
    border: 0.5px solid rgb(146, 144, 144);
    background-color: rgb(53, 223, 53);
}
</style>