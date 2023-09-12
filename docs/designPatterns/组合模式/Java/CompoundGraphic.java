package Java;
import java.util.ArrayList;
import java.util.List;

public class CompoundGraphic implements Graghic {

    List<Graghic> list;
    
    CompoundGraphic(){
        this.list = new ArrayList<>();
    }
    
    void add(Graghic g){
        this.list.add(g);
    }

    void remove(Graghic g){
        this.list.remove(g);
    }

    public void move(int x,int y){
        this.list.forEach(item->{
            item.move(x, y);
        });
    }

    public void draw(){
        this.list.forEach(item->{
            item.draw();
        });
    }
}
