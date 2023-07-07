let code = "(function(){return '这是js代码'})()"
function looseJsonParse(obj){
    return Function('"use strict";return (' + obj + ')')();
}
let result = looseJsonParse(code)
console.log(result)