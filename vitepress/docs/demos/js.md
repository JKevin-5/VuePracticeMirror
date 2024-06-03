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
    }
    // 后续流程还是会继续进行
    ...
}
```
如果有类似的需求逻辑，可以使用return的方式直接结束当前逻辑，但是不影响resolve或者reject相关回调的执行。