var xtreeMixins = {
    methods:{
        getExpendRows(level,data,result){
            data.forEach(row=>{
                result.push(row)
                let next = level - 1;
                if(next>0&&!!row.children&&row.children.length>0){
                    this.getExpendRows(next,row.children,result)
                }
            })
        },
        // 默认为展开树节点至第几层，flag为false时为关闭第几层以下的节点，如果要关闭所有节点则使用clearTreeExpand函数
        setTreeExpansionByLevel(level,data,flag=true){
            let result = []
            if(flag){
                this.getExpendRows(level,data,result)
            }else{
                this.getClearExpandRows(level,data,result)
            }
            this.setTreeExpansion(result,flag)
        },
        getClearExpandRows(level,data,result){
            data.forEach(row=>{
                let next = level - 1;
                if(next==0){
                    result.push(row)
                    if(!!row.children&&row.children.length>0){
                        this.getClearExpandRows(1,row.children,result)
                    }
                }else{
                    if(!!row.children&&row.children.length>0)
                        this.getClearExpandRows(next,row.children,result)
                }
            })
        }
    }
  };
  Vue.component('VueXtable').mixin(xtreeMixins);