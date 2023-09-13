/**
 * 游戏中的树模型，共享相同的属性type，除了坐标不同之外没有区别，调用的draw方法也是利用的共同属性自带的方法
 */

/**
 * 享元类
 */
class TreeType {
    
    public name:string;
    public color:string;
    public texture:string;

    constructor(name:string,color:string,texture:string){
        this.name = name;
        this.color = color;
        this.texture = texture;
    }

    /**
     * draw
     */
    public draw(canvas,x,y) {
        console.log("在画布"+canvas+"上绘制坐标x:"+x+",y:"+y)
    }
}

/**
 * 享元工厂决定是否复用已有享元或者创建一个新的对象
 */
class TreeFactory {
    static treeTypes:TreeType[];
    
    static getTreeType(name,color,texture) {
        
        // 判断是否存在享元
        this.treeTypes.forEach(type =>{
            if(type.name == name&&type.color == color&& type.texture == texture){
                return type;
            }
        })

        // 如果不存在则新增
        let type = new TreeType(name,color,texture);
        this.treeTypes.push(type)
        return type;

    }
}

class Tree {
    public x:number;
    public y:number;
    public type:TreeType;

    constructor(x,y,type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    draw(canvas){
        this.type.draw(canvas,this.x,this.y)
    }
}

class Forest {
    public trees:Tree[];

    plantTree(x,y,name,color,texture) {
        let type = TreeFactory.getTreeType(name,color,texture)
        let tree = new Tree(x,y,type)
        this.trees.push(tree)
    }

    draw(canvas) {
        this.trees.forEach(tree=>{
            tree.draw(canvas)
        })
    }

}