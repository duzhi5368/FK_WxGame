class GameOver2 extends ui.GameOver2UI{
    constructor(){
        super();
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);
        
        this.btn_home.on(Event.MOUSE_UP,this,()=>{
            new GameStart();
        })  
        this.btn_play.on(Event.MOUSE_UP,this,()=>{
            this.removeSelf();
            this._toPlay();
        })
        this.btn_store.on(Event.MOUSE_UP,this,()=>{
            let parentPage = "GameOver2"
            this.removeSelf();
            new GameStore(parentPage);
        })      
        
    }

    _toPlay(){
        this.map = new GameBg();
        this.play = new GamePlay();

        Laya.timer.frameLoop(1, this, this._loop);
    }

    _loop() {
        this.map.updataMap()
        this.play.updateScore()
    }
    
}