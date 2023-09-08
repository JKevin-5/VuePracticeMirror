/**
 * js 执行js代码，并返回执行结果
 */
// let code = "(function(value){return '这是js代码'+value})"
// function looseJsonParse(obj,value){
//     return Function('"use strict";return (' + obj + '('+value+'))')();
// }
// let result = looseJsonParse(code,111)
// console.log(result)

let code = 
`
    function(value){
        return '这是我的value值：'+value;
    }
`
function looseJsonParse(obj,value){
    return Function('"use strict";return (('+obj+')('+value+'))')();
}
let result = looseJsonParse(code,111)
console.log(result)


// const object = {}

// object.name = 'tom'

// console.log(object);