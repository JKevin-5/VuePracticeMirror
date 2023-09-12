package Java;
class Circle extends Dot {
    int radius;

    Circle(int x,int y,int radius){
        super(x, y);
        this.radius = radius;
    }

    public void draw(){
        System.out.println("draw a circle ("+this.x+","+this.y+","+this.radius+")");    
    }
}
