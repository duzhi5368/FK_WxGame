class GameBg extends ui.GameBgUI{
    constructor(){
        super();
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);
        console.log('---->Bg',this)
        

    }


    updataMap(){
        this.y -= 1;
        if(this.image_bg1.y + this.y <= -Laya.stage.designHeight){
            this.image_bg1.y += Laya.stage.designHeight * 2
        }
        if(this.image_bg2.y + this.y <= -Laya.stage.designHeight){
            this.image_bg2.y += Laya.stage.designHeight * 2
        }
    }
    
}