export class stock {
    constructor(result){
        this.stock_name = result[0];
        this.value = Number(result[1]);
        this.single_value = Number(result[2]);
        this.up = Number(result[3]);
    }
}