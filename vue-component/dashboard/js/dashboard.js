// 看板组件
Vue.component('ams-excel-viewer', {
    template: `
            <div id="ams-excel-viewer">
              
            </div>
    `,
    data:function(){},
    methods:{
        show:function(path) {
            this.showFlag = true;
            this.viewpath = path;
            this.getList();
        },
    }
})