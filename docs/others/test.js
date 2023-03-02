const save = function(){
    console.log("1")
    return new Promise((resolve,reject)=>{
        setTimeout(function(){
            console.log("111")
            resolve()
        },3000);
        
    })
}
let test = function(){
    return new Promise((resolve,reject)=>{
        save().then(res=>{
            console.log(res)
        })
        console.log("4")
        resolve();
    })
}

test();