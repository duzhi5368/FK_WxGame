const Loader = Laya.Loader;
const Handler = Laya.Handler;
const WebGL = Laya.WebGL;
const Event = Laya.Event;
const Animation = Laya.Animation;

class Main {
    constructor() {
        this._init();
    }

    _init() {
        Laya.MiniAdpter.init();
        Laya.init(480, 800, WebGL);
        Laya.stage.scaleMode = "exactfit";
        // Laya.stage.scaleMode = "showall";

        Laya.loader.load("res/atlas/images.atlas",Handler.create(this,this.gameStart))
    }

    gameStart(){
        Laya.game = new GameIndexUI();
        Laya.stage.addChild(Laya.game);
        
        setTimeout(() => {
            Laya.game.removeSelf();
            new GameStart()
        }, 1000);
        

    }
}
new Main();