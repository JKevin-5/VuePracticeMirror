// 圆形螺孔
class RoundHole {
    constructor(radius){
        this.radius = radius;
    }
    getRadius(){
        return this.radius;
    }
    fits(peg){
        if(peg instanceof RoundPeg){
            return this.getRadius() >= peg.getRadius();
        }else{
            return "螺母类型不适配"
        }
    }
}

// 圆形螺钉
class RoundPeg {
    constructor(radius){
        this.radius = radius;
    }
    getRadius(){
        return this.radius;
    }
}

/**
 * 方形螺钉
 */
class SquarePeg {
    constructor(width){
        this.width = width;
    }
    getWidth(){
        return this.width;
    }
}


/**
 * 适配器类
 */
class SquarePegAdapter extends RoundPeg {
    constructor(peg){
        super();
        this.peg = peg;
    }
    getRadius(){
        return this.peg.getWidth() * Math.sqrt(2) / 2
    }
}

let hole = new RoundHole(5)
let rpeg = new RoundPeg(5)

console.log("圆螺钉是否适配圆螺母？",hole.fits(rpeg))

let small_sqpeg = new SquarePeg(5)
let large_sqpeg = new SquarePeg(10)

console.log("方螺钉是否适配圆螺母？",hole.fits(small_sqpeg));

small_sqpeg_adapter = new SquarePegAdapter(small_sqpeg)
large_sqpeg_adapter = new SquarePegAdapter(large_sqpeg)
console.log("方形适配器——small是否适配圆螺母?",hole.fits(small_sqpeg_adapter))
console.log("方形适配器——large是否适配圆螺母?",hole.fits(large_sqpeg_adapter))