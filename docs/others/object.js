let object = {
    name: 'zhangsan',
    sex: 1
}

let object1 = object
let sex = object.sex

console.log(object1)
console.log("sex "+sex)
object.sex = 2
console.log(object1)
console.log("sex "+sex)

object1.sex = 3
console.log(object)
