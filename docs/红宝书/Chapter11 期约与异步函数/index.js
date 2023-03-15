const test1 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("1");
            resolve("1");
        },2000);
    })
}
const test2 = function(){
    test1().then(res=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                console.log("2");
                resolve("2");
            },1000);
        })
    })
}
test2();


const test3 = function(){
    return new Promise((resolve,reject)=>{
        Vue.http.post(
            url,
            formData)
        .then(res=>{
            resolve(res);
        });
    })
}