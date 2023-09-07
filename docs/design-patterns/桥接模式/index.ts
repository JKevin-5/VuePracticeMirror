// 运行ts 使用ts-node
interface Device {
    isEnabled(): boolean
    enable(): void
    disable(): void
    setVolume(value:number): void
    getVolume(): number
    setChannel(value:number): void
    getChannel(): number
}

class Tv implements Device {

    private status:boolean = false;
    private volume:number = 0;
    private channel:number = 0;

    isEnabled(): boolean {
        return this.status;
    }
    enable():  void{
        this.status = true; 
    }
    disable(): void {
        this.status = false; 
    }
    setVolume(value: number): void {
        this.volume = value;
    }
    getVolume(): number {
        return this.volume;
    }
    setChannel(value: number): void {
        this.channel = value;
    }
    getChannel(): number {
        return this.channel;
    }
    
}

class RemoteControl {

    protected device: Device;
    
    constructor(device: Device) {
        this.device = device
    }

    togglePower() {
        if(this.device.isEnabled()) {
            this.device.disable()
        } else {
            this.device.enable()
        }
        console.log(this);
    }

    volumDown() {
        this.device.setVolume(this.device.getVolume() - 10)
    }
    
    volumUp() {
        this.device.setVolume(this.device.getVolume() + 10)
    }

    channelDown() {
        this.device.setChannel(this.device.getChannel() - 1)
    }

    channelUp() {
        this.device.setChannel(this.device.getChannel() + 1)
    }
}

class AdvancedRemoteControl extends RemoteControl {

    constructor(device: Device){
        super(device);
    }

    mute() {
        this.device.setVolume(0)
        console.log(this.device);
    }
}



let tv = new Tv();
let remote = new RemoteControl(tv)
remote.togglePower()
let advance_remote = new AdvancedRemoteControl(tv)
advance_remote.channelUp()
advance_remote.mute()
