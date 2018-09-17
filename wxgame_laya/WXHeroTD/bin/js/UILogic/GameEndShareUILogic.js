/**
 * 结算界面逻辑 by lzq
 */
var GameEndShareUILogic = (function (_super) {
    function GameEndShareUILogic() {
        GameEndShareUILogic.super(this);

    }
    Laya.class(GameEndShareUILogic, "UILogic.GameEndShareUILogic", _super);
    var _proto = GameEndShareUILogic.prototype;

    this.timerNum = 10;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;
        this.timerNum = 10;

        var scoreNum = SceneManager.getInstance().currentScene.gameScore;
        this.score.text = scoreNum;
        this.endTimer.text = this.timerNum;

        // this.friendAvatar
        wxGame.getInstance().showFriendAvatar(402,this.friendAvatar.y,80,80,false);

        // this.shareBtn.on(Laya.Event.CLICK, this, this.onShare);
        this.shareBtn.on(Laya.Event.CLICK, this, this.onShowVidoAd);
        this.cancleBtn.on(Laya.Event.CLICK, this, this.onCloseShare);

        Laya.timer.loop(1000, this, this.onEndTimer);
        this.aniShare.play(0, true);

        // if (Browser.onMiniGame)&& wxGame.getInstance().videoAd == null) {
        //     if(wx.createRewardedVideoAd != null)
        //         this.onCloseShare();
        // }
    }
    _proto.onDestroy = function () {
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
        Laya.timer.clear(this, this.onEndTimer);
    }

    /**
     * 结束倒计时
     */
    _proto.onEndTimer = function () {
        this.timerNum -= 1;
        this.endTimer.text = this.timerNum + "s";

        if (this.timerNum <= 0) {
            this.onCloseShare();
            return;
        }
    }

    /**分享 */
    _proto.onShare = function () {
        if (!Browser.onMiniGame) {
            shareResult(1);
            return;
        }

        wxGame.getInstance().shareGame();
    }

    shareResult = function (res) {
        if (res == 1) {
                Gamelog("分享成功");
                // var ui = UIManager.getInstance().getUI("GameEndShareUI");
                // Laya.timer.clear(ui, ui.onEndTimer);

                UIManager.getInstance().closeUI("GameEndShareUI",true);
                var scoreNum = SceneManager.getInstance().currentScene.gameScore;
                Gamelog("scoreNum = "+scoreNum);
                SceneManager.getInstance().currentScene.isShowVideoAd = true;
                Gamelog("------shareResult isShowVideoAd="+SceneManager.getInstance().currentScene.isShowVideoAd);
                SceneManager.getInstance().currentScene.restartGame(scoreNum);
                //开始游戏
                SceneManager.getInstance().currentScene.startGame();
                wxGame.getInstance().showOpenDataContext(false);

                // SceneManager.getInstance().currentScene.isShared = true;
            } else {
                Gamelog("分享失败");
                // SceneManager.getInstance().currentScene.isShowVideoAd = true;
                wxGame.getInstance().showOpenDataContext(false);
                UIManager.getInstance().closeUI("GameEndShareUI",true);
                UIManager.getInstance().showUI("GameOverUI");
            }
    }

    /**跳过 */
    _proto.onCloseShare = function () {
        
        wxGame.getInstance().showOpenDataContext(false);
        // Laya.timer.clear(this, this.onEndTimer);
        UIManager.getInstance().closeUI("GameEndShareUI",true);
        UIManager.getInstance().showUI("GameOverUI");
        
    }

    /**显示视频广告 */
    _proto.onShowVidoAd = function () {
        if (!Browser.onMiniGame) {
            shareResult(1);
            return;
        }

        var ui = UIManager.getInstance().getUI("GameEndShareUI");
        Laya.timer.clear(ui, ui.onEndTimer);

        var t_videoAd = wxGame.getInstance().videoAd;
        t_videoAd.show();
        t_videoAd.onClose( function(res){
            t_videoAd.offClose();
            // 用户点击了【关闭广告】按钮
            // 小于 2.1.0 的基础库版本，res 是一个 undefined
            if (res && res.isEnded || res === undefined) {
                // 正常播放结束，可以下发游戏奖励
                shareResult(1);
            }
            else {
                // 播放中途退出，不下发游戏奖励
                shareResult(0);
            }
        })

    }

    return GameEndShareUILogic;
})(GameEndShareUI);