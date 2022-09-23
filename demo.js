var array = [1,2,3,4];

var inter=function(array){
    array.forEach(item=>{
       if(item===3){
        return true;
       } 
    });
}

console.log(inter(array));
console.log("end");