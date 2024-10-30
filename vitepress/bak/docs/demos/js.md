## Promise
> Promise resole or reject 并不会代表结束当前promise中的逻辑，仅代表会结束当前Promise的状态，进入对应的回调中；
```js
const p = new Promise((resolve, reject) => {
  resolve('success');
  reject('error');
})

const p = function(resolve,reject){
    if(xxx){
        resolve();
        // 建议直接return
        return;
    }
    // 不使用return时，后续流程还会继续进行
    ...
}
```
如果有类似的需求逻辑，可以使用return的方式直接结束当前逻辑，但是不影响resolve或者reject相关回调的执行。

## 数组合并
1. arr.concat(arr2)
2. Array.prototype.push.apply(arr,arr2)
3. [...arr,...arr2]
4. arr.push(...arr2)

## 数组去重
1. arr.filter((item,index) => arr.indexOf(item) === index)
2. [...new Set(arr)]

## 数组扁平化
1. arr.flat(Infinity)
2. arr.reduce((pre,cur) => pre.concat(cur),[])