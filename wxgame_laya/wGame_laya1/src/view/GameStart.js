class GameStart extends ui.GameStartUI{
    constructor(){
        super();
        this.score = 212313;  // Max 999499
        this.play = null
        this.map = null;
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);
        this.move.play()

        this.score = this.score > 10000 ? Math.round(this.score / 10000) >= 10 ? (this.score / 10000).toFixed(1) + "w" :  (this.score / 10000).toFixed(2) + "w" : this.score.toString()
        this.text_score.text = this.score

        this.btn_play.on(Event.MOUSE_UP,this,()=>{
            this._toPlay();
            this.removeSelf();
        })
        this.btn_shop.on(Event.MOUSE_UP,this,()=>{
            let parentPage = "GameStart";
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