package docs.designPatterns.装饰模式.Java;

public class FileDataSource implements DataSource {
    
    String data;

    FileDataSource(String data) {
        this.data = data;
    }

    public void writeData(String data){
        this.data = data;
    }

    public void readData() {
        System.out.println("从文件读取数据"+this.data);
    }
}
