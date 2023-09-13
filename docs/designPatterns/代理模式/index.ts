/**
 * 远程服务接口
 */
interface TirdPartyTVLib {
    listVideos():string;
    getVideoInfo(id):string;
    downloadVideo(id):void;
}

/**
 * 实现类
 */
class TirdPartyTVClass implements TirdPartyTVLib {
    listVideos(): string {
        return "向腾讯视频发送一个请求";
    }

    getVideoInfo(id: any): string {
        return "获取某个视频的元数据";
    }

    downloadVideo(id: any): void {
        console.log("从腾讯视频下载一个视频文件");
    }
}

class CachedTVClass implements TirdPartyTVLib {
    service:TirdPartyTVLib;
    listCache:string;
    videoCache:string;
    private needReset:boolean=false;

    constructor(service:TirdPartyTVLib) {
        this.service = service;
    }

    listVideos(): string {
        if(this.listCache == null || this.needReset) {
            this.listCache = this.service.listVideos()
        }
        return this.listCache;
    }
    
    getVideoInfo(id: any): string {
        if(this.videoCache == null || this.needReset) {
            this.videoCache = this.service.getVideoInfo(id);
        }
        return this.videoCache;
    }

    downloadVideo(id: any): void {
        // if (!downloadExists(id) || this.needReset)
        //     this.service.downloadVideo(id)
    }
}

class TVManager {
    protected service: TirdPartyTVLib;

    constructor(service:TirdPartyTVLib) {
        this.service = service;
    }

    renderVideoPage(id) {
        let info = this.service.getVideoInfo(id)
    }

    renderListPanel(id) {
        let list = this.service.listVideos()
    }

    reactOnUserInput() {
        // this.renderVideoPage()
    }
}

