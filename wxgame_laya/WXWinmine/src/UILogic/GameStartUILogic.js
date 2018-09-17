/**
 * 游戏开始逻辑 by lzq
 */
var GameStartUILogic = (function(_super){
    function GameStartUILogic(){
        GameStartUILogic.super(this);

    }
    Laya.class(GameStartUILogic,"UILogic.GameStartUILogic",_super);
    var _proto = GameStartUILogic.prototype;
    
    _proto.isStart = false;

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.zOrder = 10;

         wxGame.getInstance().showClubBtn(true);
        // this.guidBox.visible = false;
        this.startBox.visible = true;
        this.isStart = false;

        this.guidBox.on(Laya.Event.CLICK,this,this._guidBoxClickEvent);
        this.btn_startGame.on(Laya.Event.CLICK,this,this._startGameClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);
        this.btn_share.on(Laya.Event.CLICK,this,this._shareClickEvent);

        

        
    }

    _proto.onDestroy = function(){

    }

    /**点击引导结束 */
    _proto._guidBoxClickEvent = function(){
        
        UIManager.getInstance().closeUI("GameStartUI",true);
        SceneManager.getInstance().currentScene.startGame();

        // UIManager.getInstance().showUI("GameRankUI");
    }

    /**点击开始游戏 */
    _proto._startGameClickEvent = function(){
        if(!this.isStart){
            MusicManager.getInstance().playSound("res/music/1.wav");
            this.isStart = true;
            wxGame.getInstance().showClubBtn(false);
            this.aniStart.play(0, false);
            this.aniStart.on(Laya.Event.COMPLETE,this,this.onAniStartComplete);
        }
    }
   
    _proto.onAniStartComplete = function(){
       this.startBox.visible = false;
    }
    /**点击排行榜 */
    _proto._rankClickEvent = function(){
       if(!this.isStart){
           MusicManager.getInstance().playSound("res/music/1.wav");
            UIManager.getInstance().showUI("GameRankUI");
       }
    }
    /**点击分享游戏 */
    _proto._shareClickEvent = function(){
        if(!this.isStart){
            MusicManager.getInstance().playSound("res/music/1.wav");
           wxGame.getInstance().shareGame();
       }
    }
    

    return GameStartUILogic;
})(GameStartUI);