/**
 * js 执行js代码，并返回执行结果
 */
// let code = "(function(value){return '这是js代码'+value})"
// function looseJsonParse(obj,value){
//     return Function('"use strict";return (' + obj + '('+value+'))')();
// }
// let result = looseJsonParse(code,111)
// console.log(result)

// let code = 
// `
//     function(value){
//         return '这是我的value值：'+value;
//     }
// `
// function looseJsonParse(obj,value){
//     return Function('"use strict";return (('+obj+')('+value+'))')();
// }
// let result = looseJsonParse(code,111)
// console.log(result)


// const object = {}

// object.name = 'tom'

// console.log(object);


// 数组的find
let arr = [1,2,2,4]
// find方法给返回第一个匹配的元素，或者是返回undefined
let index = arr.find(item=>item==5)

console.log(index)