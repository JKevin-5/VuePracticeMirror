package Java;
public class Index {
    /**
     * 组合模式
     * 
     * Graphic接口定义物件的统一行为
     * 普通物件与组合物件都是实现于这一接口
     * 普通物件可有很多不通的派别
     * 组合物件能包括多种不同的普通物件
     * 可以通过组合物件一并触发
     * @param args
     */
    public static void main(String[] args) {
        System.out.println("组合模式");
        CompoundGraphic all = new CompoundGraphic();
        all.add(new Dot(1,2));
        all.add(new Circle(5,3,10));

        all.draw();
    }
}