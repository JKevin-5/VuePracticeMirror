(function(context, definition) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
      define(['Vue'], definition);
    } else {
      context.VueButtonGroup = definition(context.Vue);
      delete context.VueButtonGroup;
    }
  })(this, function(Vue) {
    'use strict';
    var VueButtonGroup = {
      template: '<div class="vue-button-group"><slot></slot></div>',
      name: 'VueButtonGroup'
    };
    Vue.component(VueButtonGroup.name, VueButtonGroup);
  });
(function(context, definition) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['Vue', 'VueUtil'], definition);
  } else {
    context.FmsAside = definition(context.Vue, context.VueUtil);
    delete context.FmsAside;
  }
})(this, function(Vue, VueUtil) {
    'use strict';
    var FmsAside = {
        name: 'FmsAside',
        template:   '<vue-aside id="fms-aside" ref="aside" v-loading="loading" vue-loading-text="Loading..." v-model="asideVisible" :position="asidepos" @close="handleClose" :size="asideSize" show-close close-on-click-modal>\
                        <span slot="header">\
                            {{FMSAsideName}}\
                        </span>\
                        <div id="fms-aside-content">\
                            <vue-xtable :data="gridData" style="width: 100%;" :height="asideTableHeight" fit>\
                                <vue-xtable-column type="index" width="50"></vue-xtable-column>\
                                <vue-xtable-column field="updateTime" title="日期" align="center" width="150"></vue-xtable-column>\
                                <vue-xtable-column field="updatePerson" title="作者" align="center" width="150"></vue-xtable-column>\
                                <vue-xtable-column field="fileName" title="文件名称" ></vue-xtable-column>\
                                <vue-xtable-column fixed="right" label="操作" width="150" align="center">\
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
                        <span slot="footer">\
                            <div id="fms-aside-footer">\
                                <div id="fms-progress" style="width: 50%;float: left;">\
                                    <vue-progress :percentage="percentage" v-if="progressVisible"></vue-progress>\
                                    <span v-else="progressVisible">&nbsp</span>\
                                </div>\
                                <div id="fms-upload" style="width: 50%;float: left;">\
                                    <vue-upload :action="uploadAdress" :data="uploadData" :on-progress="onProgress" :show-file-list="false" :on-success="onSuccess">\
                                        <vue-button size="small" type="primary">附件上传</vue-button>\
                                    </vue-upload>\
                                </div>\
                            </div>\
                        </span>\
                    </vue-aside>',
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
                FMSAsideName:'QMS附件中心',
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
            this.uploadAdress = this.baseadress+'/attachment/uploadFiles.json';
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
                done;
            },
            open: function() {
                this.asideVisible = true;
                this.getFilesInfo();
            },
            getFilesInfo:function(){
                var self = this;
                var url = self.baseadress+'/attachment/getFileInfos.json';
                var params = {
                    relationId: self.relationid,
                    attachmentTypeId: self.attachmenttypeid
                };
                self.loading = true;
                Vue.http.post(url,params).then(function(res){
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
                Vue.http.post(url,params).then(res=>{
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
    };
    Vue.component(FmsAside.name, FmsAside);
});
(function(context, definition) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['Vue', 'VueUtil'], definition);
  } else {
    context.FmsButton = definition(context.Vue, context.VueUtil);
    delete context.FmsButton;
  }
})(this, function(Vue, VueUtil) {
    'use strict';
    var FmsButton = Vue.component('FmsButton', {
        template: '<div>\
                        <vue-badge :value="filesCounter">\
                            <vue-button type="primary" @click="openasideHandle" :loading="loading">附件</vue-button>\
                        </vue-badge>\
                        <FmsAside ref="FMSAside" @afterClose="getFilesCounter" @updateStatus="getFilesCounter" :relationid="relationid" :attachmenttypeid="attachmenttypeid" :baseadress="baseadress"></FmsAside>\
                    </div>\
        ',
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
                var url = self.baseadress+'/attachment/getFileCounter.json';
                var params = {
                    "relationId":self.relationid,
                    "attachmentTypeId":self.attachmenttypeid
                };
                Vue.http.post(url,params).then(function(res){
                    self.$nextTick(() => {
                        self.filesCounter = res.body.filesCounter;
                    });
                });
            }
        },
    });
});