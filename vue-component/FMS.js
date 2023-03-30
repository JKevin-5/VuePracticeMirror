Vue.component('fms-aside', {
    template:   '<vue-aside id="fms-aside" ref="aside" append-to-body v-model="asideVisible" :position="asidepos" @close="handleClose" :size="asideSize" close-on-click-modal>\
                    <div slot="header">\
                    </div>\
                    <div id="fms-aside-layout" v-loading="loading" vue-loading-text="Loading...">\
                        <div id="fms-aside-header">\
                            <vue-row>\
                                <vue-row type="flex" align="middle" class="fmsHeader">\
                                    <vue-col class="smallTitle" :span="2" align="center">\
                                        <i class="vue-icon-arrow-left font20" @click="handleClose"></i>\
                                    </vue-col>\
                                    <vue-col class="smallTitle" :span="20" align="center">\
                                        {{FMSAsideTitle}}\
                                    </vue-col>\
                                </vue-row>\
                            </vue-row>\
                        </div>\
                        <div id="fms-aside-content">\
                            <vue-xtable :data="gridData" fit style="width: 100%;">\
                                <vue-xtable-column type="index" width="50"></vue-xtable-column>\
                                <vue-xtable-column field="updateTime" title="日期" align="center" width="150"></vue-xtable-column>\
                                <vue-xtable-column field="updatePerson" title="作者" align="center" width="150"></vue-xtable-column>\
                                <vue-xtable-column field="fileName" title="文件名称" ></vue-xtable-column>\
                                <vue-xtable-column fixed="right" label="操作" width="160" align="center">\
                                    <template slot-scope="scope">\
                                        <vue-button v-show="imageCheck(scope.row.fileName)||scope.row.remark==`pdf`" @click="previewHandle(scope.row)" type="text" size="small">预览</vue-button>\
                                        <vue-button @click="downloadHandle(scope.row)" type="text" size="small">下载</vue-button>\
                                        <vue-button @click="deleteHandle(scope.row)" type="text" size="small">删除</vue-button>\
                                    </template>\
                                </vue-xtable-column>\
                            </vue-xtable>\
                            <vue-dialog id="dialogBpmDeny" size="full" v-model="pdfVisible" show-close>\
                                <iframe v-if="pdfVisible" id="show-iframe" frameborder=0 scrolling=auto width="100%" :height="pageHeight" :src="pdfUrl"></iframe>\
                            </vue-dialog>\
                            <vue-dialog v-model="imageVisible" size="full" show-close>\
                                <div style="text-align: center;display:block;">\
                                    <img width="100%" :src="imageUrl" :height="pageHeight">\
                                </div>\
                            </vue-dialog>\
                        </div>\
                        <div id="fms-aside-footer" class="fmsFooter">\
                            <vue-row :gutter="20">\
                                <vue-col :span="20">\
                                    <vue-progress :percentage="percentage" v-if="progressVisible"></vue-progress>\
                                    <span v-else="progressVisible">&nbsp</span>\
                                </vue-col>\
                                <vue-col :span="4">\
                                    <vue-upload id="fms-aside-upload" :action="uploadAdress" :data="uploadData" :on-progress="onProgress" :show-file-list="false" :on-success="onSuccess">\
                                        <vue-button  type="primary">附件上传</vue-button>\
                                    </vue-upload>\
                                </vue-col>\
                            </vue-row>\
                        </div>\
                    </div>\
                </vue-aside>',
    inject: ['page_','contextPath'],
    props: {
        asidepos: {
            type:String,
            default: 'right'
        },
        relationid: String,
        attachmenttypeid: String,
        baseadress: String
    },
    data:function(){
        var self = this;
        return {
            FMSAsideTitle:'QMS附件中心',
            asideVisible:false,
            asideSize:'small',
            asideTableHeight: 400,
            gridData: [],
            pdfVisible:false,
            pdfUrl:'',
            imageVisible:false,
            imageUrl:'',
            percentage:0,
            uploadAdress:'',
            uploadData:{},
            pageHeight:500,
            progressVisible: false,
            loading:false
        }
    },
    mounted: function(){
        this.calHeight();
        this.uploadAdress = this.contextPath+'/attachment/uploadFiles.json';
        this.uploadData = {
            relationId: this.relationid,
            attachmentTypeId: this.attachmenttypeid
        };
    },
    methods: {
        calHeight:function(){
            var winHeight = 0;
            if (window.innerHeight) {
                winHeight = window.innerHeight;
            } else if ((document.body) && (document.body.clientHeight)) {
                winHeight = document.body.clientHeight;
            }
            if (document.documentElement && document.documentElement.clientHeight) {
                winHeight = document.documentElement.clientHeight;
            }
            this.asideTableHeight = winHeight * 9/12;
            this.pageHeight = winHeight * 10/12;
        },
        handleClose: function(done) {
            this.$emit("afterClose",{});
            this.asideVisible = false;
            done;
        },
        open: function() {
            this.asideVisible = true;
            this.getFilesInfo();
        },
        getFilesInfo:function(){
            var self = this;
            var url = self.contextPath+'/attachment/getFileInfos.json';
            var params = {
                relationId: self.relationid,
                attachmentTypeId: self.attachmenttypeid
            };
            self.loading = true;
            self.page_.$http.post(url,params).then(function(res){
                self.$nextTick(() => {
                    self.gridData = res.body;
                    self.loading = false;
                },function(err){
                    console.log(err);
                    self.loading = false;
                });
            });
        },
        previewHandle:function(row){
            var self = this;
            if(row.remark=='pdf'){
                var request = new XMLHttpRequest();
                self.loading = true;
                request.open("POST", row.previewPath+"&ran=" + Math.random(), true);
                request.setRequestHeader('Content-Type', 'application/json');
                request.responseType = 'blob';
                request.onload = function() {
                    if (request.status === 200) {
                        var filename = row.fileName;
                        if (filename == "undefined") filename = new Date().getTime();
                        var blob = new Blob([request.response], {    // 关键代码
                            type: 'application/pdf'
                        });
                        self.pdfUrl = window.URL.createObjectURL(blob) ;
                        self.loading = false;
                        self.pdfVisible = true;
                    }else {
                        self.loading = false;
                        alert("system is error");
                    }
                }
                var parameters = {};
                request.send(JSON.stringify(parameters));
            }else if(self.imageCheck(row.fileName)){
                self.imageVisible = true;
                self.imageUrl = row.previewPath;
            }else{
                this.$notify({title: "暂不支持该类型预览"});
            }
        },
        deleteHandle:function(row){
            var self = this;
            self.$confirm({
                title: "警告",
                message: "是否删除该文件?",
                type: "warning"
            }).then(function(action) {
                self.doDelete(row.attachmentInfoId);
            });
        },
        doDelete:function(attachmentInfoId){
            var self = this;
            var url = self.baseadress+'/attachment/deleteFile.json';
            var params = {
                attachmentInfoId: attachmentInfoId,
                relationId: self.relationid,
                attachmentTypeId: self.attachmenttypeid
            };
            self.loading = true;
            self.page_.$http.post(url,params).then(res=>{
                self.loading = false;
                self.gridData = res.body;
                self.$emit("updateStatus",{});
            }).catch(err=>{
                self.loading = false;
                console.error(err);
            });
        },
        downloadHandle:function(row){
            var self = this;
            if(row.remark=='pdf'||self.imageCheck(row.fileName)){
                self.doPdfDownload(row);
            }else{
                let DownloadLink = document.createElement('a'); 
                // 创建一个隐藏的a标签
                DownloadLink.style = 'display: none';
                var fileName = row.fileName.replace (/\s*/g,"");
                DownloadLink.setAttribute('download',fileName);
                DownloadLink.href = row.previewPath;
                document.body.appendChild(DownloadLink);
                // 触发a标签的click事件
                DownloadLink.click();
                document.body.removeChild(DownloadLink);
            }
        },
        onProgress:function(response,file){
            var self = this;
            self.progressVisible = true;
            self.percentage = response.percent;
            if(response.percent == 100) {
                setTimeout(function(){
                    self.progressVisible = false;
                },1000);
            }
        },
        onSuccess:function(response,file){
            var self = this;
            self.getFilesInfo();
            self.$emit("updateStatus",{});
        },
        imageCheck:function(fileName){
            return /\.(jpg|jpeg|png)$/i.test(fileName);
        },
        doPdfDownload:function(row){
            var self = this;
            var url = row.previewPath+"&ran=" + Math.random();
            var request = new XMLHttpRequest();
            request.open("POST", url, true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.responseType = 'blob';
            request.onload = function() {
                if (request.status === 200) {
                    var filename = row.fileName;
                    if (filename == "undefined") filename = new Date().getTime()+'.'+row.remark;
                    var blob = new Blob([request.response], {    // 关键代码
                        type: 'application/octet-stream'
                      });
                    if ('msSaveOrOpenBlob' in navigator){
                        // Microsoft Edge and Microsoft Internet Explorer 10-11
                        window.navigator.msSaveOrOpenBlob(blob, filename);
                    } else {
                        var link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = filename;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                } else {
                    alert("system is error");
                }
            };
            var parameters = {};
            request.send(JSON.stringify(parameters));
        }
    }
});

Vue.component('fms-button', {
    template: '<div>\
                    <vue-badge :value="filesCounter">\
                        <vue-button type="primary" @click="openasideHandle" :loading="loading">附件</vue-button>\
                    </vue-badge>\
                    <fms-aside ref="FMSAside" @afterClose="getFilesCounter" @updateStatus="getFilesCounter" :relationid="relationid" :attachmenttypeid="attachmenttypeid" :baseadress="baseadress"></fms-aside>\
                </div>\
    ',
    inject: ['page_','contextPath'],
    props: {
        loading: {
            type: Boolean,
            default: false,
            twoWay: true
        },
        relationid:String,
        attachmenttypeid:String,
        baseadress:String
    },
    data:function(){
        return {
            filesCounter: 0
        }
    },
    created: function(){
        // 获取附件个数
        this.getFilesCounter();
    },
    watch:{},
    computed: {},
    methods: {
        openasideHandle:function(){
            this.$refs.FMSAside.open();
        },
        getFilesCounter:function(){
            var self = this;
            var url = self.contextPath+'/attachment/getFileCounter.json';
            var params = {
                "relationId":self.relationid,
                "attachmentTypeId":self.attachmenttypeid
            };
            self.page_.$http.post(url,params).then(function(res){
                self.$nextTick(() => {
                    self.filesCounter = res.body.filesCounter;
                });
            });
        }
    }
})