/**
 * 结算界面逻辑 by lzq
 */
var GameRankUILogic = (function(_super){
    function GameRankUILogic(){
        GameRankUILogic.super(this);

    }
    Laya.class(GameRankUILogic,"UILogic.GameRankUILogic",_super);
    var _proto = GameRankUILogic.prototype;
    
    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 10;

        wxGame.getInstance().postMessage({
                act: "showRank"
            }, true);


        this.close.on(Laya.Event.CLICK,this,this.onCloseRank);
    }
    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
    }

    _proto.updateItem = function(cell, index) {

    }

    /**关闭排行 */
    _proto.onCloseRank = function(){
        
        wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameRankUI");
        
        MusicManager.getInstance().playSound("res/music/1.wav");
    }
    return GameRankUILogic;
})(GameRankUI);