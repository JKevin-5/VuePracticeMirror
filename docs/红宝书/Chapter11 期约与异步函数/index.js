const test1 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("业务1成功回调");
            resolve("业务1返回的内容");
        },1000);
    })
}

const test2 = function(res){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(res+"+业务2成功回调");
            resolve("业务2返回的内容");
        },1000);
    })
}

const test3 = function(res){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log(res+"+业务3成功回调");
            resolve("业务3返回的内容");
        },1000);
    })
}

// test1().then(res=>{
//     test2(res);
// }).then(res=>{
//     console.log(res)
//     return test3(res)
// }).then(res=>{
//     console.log("延迟")
// }).catch(err=>{
//     console.log(err)
// })

// console.log(typeof test1)

var pageLoading = false;

const test4 = function(res){
    pageLoading = true;
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            pageLoading = false;
            // console.log(res+"+业务3成功回调");
            // reject("业务3返回的内容");
            resolve()
        },1000);
    }).then((res)=>{
        console.log("success")
    },(err)=>{
        console.log("error")
    }).finally(()=>{
        pageLoading = false
    })
}

const func = function(){
    console.log("初期加载状态："+pageLoading)
    test4().then(res=>{
        console.log('结束时加载状态：'+pageLoading)
    });
    console.log('func函数结束时加载状态：'+pageLoading)
}

func();