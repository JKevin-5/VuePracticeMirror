// table组件
Vue.component('dashboard-table', {
    template: `
            <div style="width: 100%;height: 100%;">
                <div style="height: 10%;color: white;display:flex;font-family:'sans-serif';font-weight:bold;font-size:1rem;">
                    <div style="width: 100%;align-self:center;text-align:center;">{{title}}</div>
                </div>
                <vue-xtable ref="grid" :data="xtableData" style="width: 100%;" height="90%" class="table">
                    <vue-xtable-column v-for="(col,index) in cols" :key="index" :field="col.prop" :title="col.label" :align="col.align" :width="col.width"></vue-xtable-column>
                </vue-xtable>
            </div>
    `,
    props: {
        // 标题: 
        title: String,
        // 表格样式
        cols: Array,
        // 表格内容
        url: String,
        // 定时设置
        options: Object
    },
    data(){
        return{
            xtableData:[]
        }
    },
    created(){
        // 立即执行一次
        this.init();
        // 定时获取数据
        this.interval = window.setInterval(()=>{
            this.init();
        },this.options.interval);
    },
    mounted(){
        this.autoScroll();
    },
    beforeDestroy(){
        // 销毁时，清除定时器
        window.clearInterval(this.interval)
        window.clearInterval(this.scrollTopAddInterval)
    },
    methods:{
        getData(){
            return new Promise((resolve,reject)=>{
                Vue.http.get(this.url).then(function(res){
                    resolve(res.body);
                }).catch(function(err){
                    console.log(err);
                    reject();
                })
            })
        },
        init(){
            this.getData().then(res=>{
                this.xtableData = res;
            })
        },
        autoScroll(){
            // 定时滚动
            // 表格往下滚动的高度
            var scrollY = 0;
            var speed = 1;
            // grid进行滚动
            this.scrollTopAddInterval = setInterval(() => {
                if (scrollY - this.$refs.grid.$refs.tableBody.$el.scrollTop < 100) {
                    this.$refs.grid.scrollTo(0,scrollY);
                    scrollY = scrollY + speed;
                } else {
                    scrollY = 0;
                }
            },60);
        }
    }
})

// echarts 组件
