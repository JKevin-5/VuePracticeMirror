Vue.component('ams-viewer', {
    template: `<div id="ams-viewer">
                    <vue-dialog :title="viewtitle" :draggable=false v-model="showFlag" show-close>
                        <div class="wrapper" v-loading="loading">
                            <vue-tooltip v-for="(item,index) in gridData" :key="index" class="item" placement="right"  effect="light" :disabled="!imagesTypes.includes(item.fileType)">
                                <div slot="content">
                                    <vue-image :src="item.previewUrl" style="max-width:30vw;max-height:50vh;"/>
                                </div>
                                <div style="position:relative;">
                                    <vue-image
                                        :src="item.previewUrl"
                                        fit="contain"
                                        :preview-src-list="iamgeList"
                                        :z-index="$vu.nextZIndex()"
                                        class="images"
                                        >
                                        <div slot="error">
                                            <div class="image-slot" @click="preview(item)" style="cursor: pointer;">
                                                <i v-if="!officeTypes.includes(item.fileType)" class="vue-icon-document"></i>
                                                <div v-else :class="choosePreType(item.fileType)"/>                                        
                                                <span class="text" style="max-width:100px;white-space: nowrap;">{{item.fileName}}</span>
                                            </div>
                                        </div>
                                    </vue-image>
                                    <div class="info">
                                        <b class="text" style="width:150px;word-break:break-all">{{item.fileName}}</b>
                                        {{item.uploadDate}}
                                    </div>
                                    <div class="actions">
                                        <a type="text" :href="item.previewUrl"><i class="vue-icon-download"></i></a>
                                    </div>
                                </div>
                            </vue-tooltip>
                        </div>
                    </vue-dialog>
                    <vue-dialog size="large" v-model="officeFlg" :draggable=false show-close>
                        <iframe v-if="officeFlg" frameborder=0 scrolling=auto width="100%" :src="previewPath" style="height:calc(70vh - 20px)"></iframe>
                    </vue-dialog>
                </div>
    `,
    // prod环境
    // inject: ['page_'],
    inject: ['page_','contextPath'],
    props: {
        dropdownlist: {
            type:Array,
            default: () => []
        },
        viewtitle: {
            type:String,
            default: "附件查看器"
        }
    },
    data:function(){
        return {
            showFlag: false,
            loading: false,
            gridData: [],
            iamgeList:[],
            viewpath:'',
            imagesTypes:['jpeg','jpg','png'],
            excelTypes:['xlsx','xls'],
            pdfTypes:['pdf'],
            wordTypes:['doc','docx'],
            officeFlg: false,
            previewPath:''
        }
    },
    created: function(){
    },
    mounted:function(){
    },
    watch:{
        showFlag: function (value) {
            if(!value){
                this.gridData = [];
                this.iamgeList = [];
            }
        }
    },
    computed: {
        officeTypes:function(){
            let arr = [];
            arr = arr.concat(this.excelTypes);
            arr = arr.concat(this.pdfTypes);
            arr = arr.concat(this.wordTypes);
            return arr;
        }
    },
    methods: {
        getList:function() {
            var self = this;
            // prod环境
            // var url = contextPath+"/ams/plus/info?path="+self.viewpath;
            var url = self.contextPath+"/ams/plus/info?path="+self.viewpath;
            self.loading = true;
            self.page_.$http.get(url).then(function(res){
                self.$nextTick(() => {
                    let c = [];
                    c = c.concat(res.body.data)
                    c = c.concat(res.body.data)
                    c = c.concat(res.body.data)
                    c = c.concat(res.body.data)

                    self.gridData = c;
                    self.gridData.forEach(item=>{
                        if(item.fileType==='jpeg'){
                            self.iamgeList.push(item.previewUrl);
                        }
                    })
                    self.loading = false;
                },function(err){
                    console.log(err);
                    self.loading = false;
                });
            });
        },
        show:function(path) {
            this.showFlag = true;
            this.viewpath = path;
            this.getList();
        },
        deleteFiles:function(){

        },
        choosePreType:function(type){
            if(this.excelTypes.includes(type)){
                return 'excel';
            }else if(this.wordTypes.includes(type)){
                return 'word';
            }else if(this.pdfTypes.includes(type)){
                return 'pdf';
            }
        },
        preview:function(item){
            switch (item.fileType) {
                case 'pdf':
                    this.previewPath = 'http://localhost:9000/ams/resources/plugins/pdf/web/viewer.html?file='+item.previewUrl;
                    this.officeFlg = true;
                    break;
                default:
                    alert("不支持当前文件格式预览")
                    break;
            }
        }
    }
})