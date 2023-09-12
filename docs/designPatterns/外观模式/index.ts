class VideoFile {
    constructor(parameters) {
        
    }
}

class OggCompressionCodec {
    constructor() {}
}

class MPEG4CompressionCodec {
    constructor() {}
}

class CodecFactory {
    constructor() {}
    extract(file){

    }
}

class BitrateReader {
    constructor() {}
    static read(filename, sourceCodec){}
    static convert(buffer,destinationCodec){}
}

class AudioMixer {
    constructor() {}
    fix(result){}
}

/**
 * 外观类
 * 可以让自己的代码独立于复杂子系统
 * 外观可能成为与程序中所有类都耦合的上帝对象
 * 
 */
class VideoConverter {
    constructor(parameters) {
        
    }

    convert(filename,format){
        let file = new VideoFile(filename)
        let sourceCodec = (new CodecFactory).extract(file)
        let destinationCodec;
        if(format == "mp4") {
            destinationCodec = new MPEG4CompressionCodec();
        }else{
            destinationCodec = new OggCompressionCodec();
        }
        let buffer = BitrateReader.read(filename, sourceCodec);
        let result = BitrateReader.convert(buffer,destinationCodec)
        result = (new AudioMixer()).fix(result)
        // return new File(result)
    }
}