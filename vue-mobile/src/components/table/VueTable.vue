<template>
    <div class="table_container">
        table 组件
        <!-- header -->
        <van-row class="table_header">
            <van-col v-for="header in headers" :key="header.name" :span="header.span" :style="{display: 'flex',alignItems: header.position,justifyContent: header.position}">
                {{header.name}}
            </van-col>
            <van-divider/>
        </van-row>
        <div class="table_body">
            <template v-if="tableDs.length==0">
                <van-empty image="search" description="暂无数据" />
            </template>
            <van-row v-for="data in tableDs" :key="data.id">
                <van-col v-for="header in headers" :key="header.name" :span="header.span" @click="rowClick(data)">
                    {{data[header.name]}}
                </van-col>
                <van-divider />
            </van-row>
        </div>
    </div>
</template>

<script>
    export default {
        name:'vuetable',
        props: {
            rowClick:Function,
            headers:{
                type: Array,
                default: function(){
                    return [
                        {
                            name: 'id',
                            des:'序号',
                            span: 4,
                            position: 'center'
                        },
                        {
                            name: 'name',
                            des:'姓名',
                            span: 4
                        },
                        {
                            name: 'age',
                            des:'年龄',
                            span: 4
                        },
                        {
                            name: 'sex',
                            des:'性别',
                            span: 4
                        },
                        {
                            name: 'phone',
                            des:'手机号',
                            span: 8
                        }
                    ];
                }
            },
            tableDs: {
                type: Array,
                default: function(){
                    return [
                        {
                            id: 1,
                            name: '张三',
                            age: 18,
                            sex: '男',
                            phone: '13888888888'
                        },
                        {
                            id: 2,
                            name: '李四',
                            age: 18,
                            sex: '男',
                            phone: '13888888888'
                        }
                    ];
                }
            }
        },
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.table_container {
    margin: 10px;
    height: 100%;
    background-color: white;
    border-radius: 0.5rem;
}
.table_header {
    width: 100%;
}
.table_body {
    width: 100%;
}
</style>