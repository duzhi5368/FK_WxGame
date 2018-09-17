class GameOver1 extends ui.GameOver1UI{
    constructor(){
        super();
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);
        this.btn_skip.on(Event.MOUSE_UP,this,()=>{
            new GameOver2();
        })
    }
    
}