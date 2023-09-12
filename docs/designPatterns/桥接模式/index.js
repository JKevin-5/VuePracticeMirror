function JTv(){
    this.status = false;
}

JTv.prototype.isEnabled = function(){
    return this.status;
}

JTv.prototype.enable = function(){
    this.status = true;
}

JTv.prototype.disable = function(){
    this.status = false;
}

function JRemoteControl(device){
    this.device = device;
}

JRemoteControl.prototype.togglePower = function(){
    if(this.device.isEnabled()) {
        this.device.disable()
    } else {
        this.device.enable()
    }
    console.log(this.device);
}

let controller = new JRemoteControl(new JTv());
controller.togglePower();