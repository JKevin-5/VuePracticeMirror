export class stock {
    constructor(result){
        let index = 0
        let others = ['HSI']
        if(others.includes(result[0])){
            index++;
        }
        this.stock_name = result[index]
        this.value = Number(result[index+1])
        this.single_value = Number(result[index+2])
        this.up = Number(result[index+3])
    }
}