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

class TreeFactory {
    static treeTypes:TreeType[];
    static getTreeType(name,color,texture) {
        
    }
}