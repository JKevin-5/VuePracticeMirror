// var test = {
//     text:'this is text',
//     A:function(){
//         console.log("hello A");
//     }
// }

// var fun = function(){
//     let a='a'
//     console.log('this is fun')
//     return {
//         A:a
//     };
// }

(function(window) {
    let data = 'data'; // data为内部数据
    function fun1(){
        console.log(data);
    }
    function fun2(){
        fun1();
    }
    window.myMoudule = {
        myFun1:fun1
    }
})(window)