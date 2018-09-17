/**
 * 游戏结束逻辑 by lzq
 */
var GameoverUILogic = (function(_super){
    function GameoverUILogic(){
        GameoverUILogic.super(this);

    }
    Laya.class(GameoverUILogic,"UILogic.GameoverUILogic",_super);
    var _proto = GameoverUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.zOrder = 10;

        this.btn_shared.on(Laya.Event.CLICK,this,this._sharedClickEvent);
        this.btn_playAgain.on(Laya.Event.CLICK,this,this._playAgainClickEvent);

        this.aniShare.play(0, true);
        
    }

    _proto.onDestroy = function(){

    }

    /**根据结果显示 */
    _proto.initGameover = function(_isWin){
        var scoreNum = SceneManager.getInstance().currentScene.gameTime;
        this.label_time.text = GetTimeFormat(scoreNum);

        if(_isWin  && scoreNum > 0){
            this.img_result.skin = "GameUI/jiesuan_biaoti_shengli.png";
            //存储在本地并上传
            var highscoreNum = SetLocalMaxScore(scoreNum);
            wxGame.getInstance().uploadUserScore(highscoreNum);
        }else{
            this.img_result.skin = "GameUI/jiesuan_biaoti_shibai.png";
            wxGame.getInstance().showFriends();
        }


    }
     /**分享游戏 */
    _proto._sharedClickEvent = function () {
        MusicManager.getInstance().playSound("res/music/1.wav");
        wxGame.getInstance().shareGame();
        if(!this.isSharing){
            this.isSharing = true;
            // wxGame.getInstance().shareScore(SceneManager.getInstance().currentScene.gameScore,this._shareEnd)
        }
    }
    /**重新开始 */
    _proto._playAgainClickEvent = function () {
        MusicManager.getInstance().playSound("res/music/1.wav");
        SceneManager.getInstance().currentScene.resetGame();
        wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameoverUI");
        UIManager.getInstance().showUI("GameStartUI");
        // SceneManager.getInstance().currentScene.startGame();
        
    }

    return GameoverUILogic;
})(GameoverUI);