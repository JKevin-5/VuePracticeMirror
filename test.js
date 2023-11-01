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
// let arr = [1,2,2,4]
// // find方法给返回第一个匹配的元素，或者是返回undefined
// let index = arr.find(item=>item==5)

// console.log(index)


let data = [
    {
        no:'1',
        children:[
            {
                no:'1.1',
                children:[
                    {
                        no:'1.1.1',
                        children:[]
                    }
                ]
            }
        ]
    },
    {
        no:'2',
        children:[
            {
                no:'2.1',
                children:[
                    {
                        no:'2.1.1',
                        children:[
                            {
                                no:'2.1.1.1',
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        no:'3',
        children:[
            {
                no:'3.1',
            }
        ]
    }
]
let result = []
function getExpendRows(level,data,result){
    data.forEach(row=>{
        result.push(row)
        let next = level - 1;
        if(next>0&&!!row.children&&row.children.length>0){
            getExpendRows(next,row.children,result)
        }
    })
}

function getClearExpandRows(level,data,result){
    data.forEach(row=>{
        let next = level - 1;
        if(next==0){
            result.push(row)
            if(!!row.children&&row.children.length>0){
                getClearExpandRows(1,row.children,result)
            }
        }else{
            if(!!row.children&&row.children.length>0)
                getClearExpandRows(next,row.children,result)
        }
    })
}
// getExpendRows(3,data,result)
getClearExpandRows(5,data,result)

result.forEach(row=>{
    console.log(row.no)
})