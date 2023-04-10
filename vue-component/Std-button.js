/**
 * 前提条件
 * 1. 引入画面的grid的id必须设置为grid
 * 2. 引入画面需要传入dropdownlist内容
 *    dropdownlist是一个数组：
 *      内置的对象元素结构是：
 *      `{
 *          name:'', // 按钮名称
 *          
 *      }`
 */
Vue.component('std-button-group', {
    template: `<div>
                    <vue-dropdown trigger="click">
                        <vue-button type="primary">
                            {{name}}
                            <i class="vue-icon-arrow-down vue-icon--right"></i>
                        </vue-button>
                        <vue-dropdown-menu slot="dropdown">
                            <vue-dropdown-item v-for="(item,index) in dropdownlist" :key="index" :id="item.id" @click.native="openTab(item)">
                                {{item.name}}
                            </vue-dropdown-item>
                        </vue-dropdown-menu>
                    </vue-dropdown>
                </div>
    `,
    inject: ['page_','contextPath'],
    props: {
        dropdownlist: {
            type:Array,
            default: () => []
        },
        name:{
            type:String,
            default: '跳转'
        }
    },
    data:function(){
        return {
        }
    },
    created: function(){
    },
    watch:{},
    computed: {},
    created(){
        var object = {}
        for( index in this.dropdownlist){
            debugger
            var item = this.dropdownlist[index]
            // 已经存在的id就+1
            if(!!object[item.id]){
                item.id = item.id + index;
            }
            object[item.id] = item;
        }
    },
    methods: {
        openTab:function(item){
            var rowData = this.$parent.$refs.grid?this.$parent.$refs.grid.getCurrentRow():'';
            var info = {
                'event': 'REQUEST_OPEN_NEW_TAB',
                'urlObj': {
                    menuCode: item.code,
                    params: {
                        form: JSON.stringify(rowData),
                        formPage: this.$parent.$options.name
                    }
                }
            };
            window.parent.postMessage(info, '*');
        }
    }
})