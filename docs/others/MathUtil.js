var MathUtil = {
    /**
     * 判断是否是数字，jq里的判断方式
     * @param {any} value 
     * @returns 
     */ 
    isNumeric:function(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    /**
     * 两数相加
     * @param {number} num1 
     * @param {number} num2 
     * @returns 
     */
    add:function(num1, num2) {
        // 模拟函数重载，参数唯一且为数组的情况
        if(arguments.length == 1 && arguments[0] instanceof Array){
            return this.addAll(arguments[0]);
        }
        num1 = this.isNumeric(num1) ? num1 : 0;
        num2 = this.isNumeric(num2) ? num2 : 0;
        var r1, r2, m; 
        var num1Split = num1.toString().split('.'); 
        var num2Split = num2.toString().split('.'); 
        r1 = num1Split.length > 1 ? num1Split[1].length : 0; 
        r2 = num2Split.length > 1 ? num2Split[1].length : 0; 
        m = Math.pow(10, Math.max(r1, r2)); 
        return Math.round(num1 * m + num2 * m) / m; 
    },
    /**
     * 两数减法
     * @param {number} num1 
     * @param {number} num2 
     */
    sub:function(num1,num2){
        return this.add(num1,-num2);
    },
    /**
     * 累加(加减法)
     * @param {Array} arr 
     * @returns 
     */
    addAll:function(arr) {
        if(! arr instanceof Array){
            return NaN;
        }
        var sum = 0; 
        for (var i = 0; i < arr.length; i++) {
            sum = this.add(sum, arr[i]); 
        } 
        return sum; 
    },
    /**
     * 两数乘法
     * @param {*} num1
     * @param {*} num2
     * @returns 
     */
    mul: function (num1, num2){
        // 模拟函数重载，参数唯一且为数组的情况
        if(arguments.length == 1 && arguments[0] instanceof Array){
            return this.mulAll(arguments[0]);
        }
        var _base = 0;
        try {
            _base += num1.toString().split(".")[1].length;
        } catch (e) {
        }
        try {
            _base += num2.toString().split(".")[1].length;
        } catch (e) {
        }
        const r1 = Number(num1.toString().replace(".",""));
        const r2 = Number(num2.toString().replace(".",""));
        const res = (r1 * r2) /Math.pow(10, _base);
        return res
    },
    /**
     * 累乘
     * @param {*} arr 
     * @returns 
     */
    mulAll: function (arr) {
        if(! arr instanceof Array){
            return NaN;
        }
        var res = 1; 
        for (var i = 0; i < arr.length; i++) {
            res = this.mul(res, arr[i]); 
        }
        return res; 
    },
    /**
     * 两数除法
     * @param {*} num1 
     * @param {*} num2 
     * @returns 
     */
    div: function (num1, num2){
        let t1 = 0, t2 = 0
        try {
            t1 = num1.toString().split(".")[1].length
        } catch (e) {
        }   //--小数点后的长度
        try {
            t2 = num2.toString().split(".")[1].length
        } catch (e) {
        }  //--小数点后的长度
        const r1 = Number(num1.toString().replace(".",""))  //--去除小数点变整数
        const r2 = Number(num2.toString().replace(".",""))  //--去除小数点变整数
        const _num1 = r1 / r2
        const _num2 = Math.pow(10, t2 - t1)
        const res = this.mul(_num1, _num2)
        return res   //---整数相除 在乘上10的平方  小数点的长度
    },
}