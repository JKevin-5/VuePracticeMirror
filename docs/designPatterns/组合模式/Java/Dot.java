package Java;
class Dot implements Graghic {

    int x,y;

    Dot(int x,int y){
        this.x = x;
        this.y = y;
    }

    @Override
    public void move(int x, int y) {
        this.x +=x;
        this.y +=y;
    }
    
    @Override
    public void draw() {
        System.out.println("draw a point ("+this.x+","+this.y+")");    
    }
    
}
