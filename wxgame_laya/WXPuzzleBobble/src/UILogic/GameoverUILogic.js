/**
 * 结算界面逻辑 by lzq
 */
var GameoverUILogic = (function(_super){
    function GameoverUILogic(){
        GameoverUILogic.super(this);

    }
    Laya.class(GameoverUILogic,"UILogic.GameoverUILogic",_super);
    var _proto = GameoverUILogic.prototype;
    var rankSprite2 = null;
    _proto.bannerAd = null;                                   //横幅广告

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        //设置层级 相对于stage
        this.zOrder = 50;

        this.img_light.rotation = 0;
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(this.img_light,
        {
            rotation:360
        },4000);
        timeLine.play(0,true);


        var scoreNum = SceneManager.getInstance().currentScene.scoreNum;
        this.label_overScore.text = scoreNum;


         //兼容老版本
        var key = "LocalHighScore_" + GetWeekNum();
        var score = LocalStorage.getItem(key);
        if (score == null || score == "") {
            var t_highScore = LocalStorage.getItem("HighScore");
            if(t_highScore != null || t_highScore != ""){
                if(GetWeekNum() == 10){
                    scoreNum = t_highScore;
                }
            }
        }
         //存储在本地并上传
        var highscoreNum = SetLocalMaxScore(scoreNum);
        
        this.label_heightScore.text = highscoreNum;
        wxGame.getInstance().uploadUserScore(highscoreNum);

        this.img_light.visible = false;
        if(scoreNum >= highscoreNum){
            this.img_light.visible = true;
        }
        

        // this.img_light.visible = false;
        // var highScore = LocalStorage.getItem("HighScore");
        // if(highScore){
        //     if(scoreNum > parseInt(highScore)){
        //         highScore = scoreNum;
        //         this.img_light.visible = true;
        //     }
        // }else{
        //     highScore = scoreNum;
        //     this.img_light.visible = true;
        // }
        // LocalStorage.setItem("HighScore",highScore);
        // this.label_heightScore.text = highScore;

        // this.sendScore(highScore);
        

        this.ani1.play(0, true);

        // this.onGetRankList();

        this.btn_again.on(Laya.Event.CLICK,this,this.onGameAgain);
        this.btn_last.on(Laya.Event.CLICK,this,this.onRankPageLast);
        this.btn_next.on(Laya.Event.CLICK,this,this.onRankPageNext);
        this.btn_share.on(Laya.Event.CLICK,this,this.onShareGame);
       // this.btn_closeOver.on(Laya.Event.CLICK,this,this.onCloseGame);

        //this.updateListData();

        //MessageController.getInstance().AddNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);

        this.showBannerAd();
    }


    _proto.onDestroy = function(){
        //MessageController.getInstance().RemoveNotification(MessageEventName.RankListEvent,this,this.RankListReceiver);
        if(this.bannerAd != null){
            this.bannerAd.destroy();
        }
    }

    //显示广告
    _proto.showBannerAd = function(){
        if (Browser.onMiniGame) {
            var isPass = false;
            wx.getSystemInfo({
                success: function (res) {
                    Gamelog("getSystemInfo SDKVersion="+ res.SDKVersion);
                    var isPassNum = compareVersion(res.SDKVersion,"2.0.4");
                    if(isPassNum >= 0){
                        isPass = true;
                    }
                }
            }); 
            if(!isPass){
                return;
            }
            if(this.bannerAd != null){
                this.bannerAd.destroy();
            }
            this.bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-1fcd79ff1d1dcbec',
                    style: {
                        left: 0,
                        top: 0,
                        width: 300
                    }
                })
            this.bannerAd.show();

            var sysInfo = wx.getSystemInfoSync();
            var Ad = this.bannerAd;         
            var sysInfo = wx.getSystemInfoSync();
            this.bannerAd.onResize(function (res) {
                Ad.style.top = sysInfo.screenHeight - 86;
                Ad.style.left = (sysInfo.screenWidth - Ad.style.realWidth) / 2;
            });

        }

    }
     
     /**重新开始 */
    _proto.onGameAgain = function(){
        wxGame.getInstance().showOpenDataContext(false);
        UIManager.getInstance().closeUI("GameoverUI",true);
        MusicManager.getInstance().playSound("res/music/1.wav");
        SceneManager.getInstance().currentScene.restartGame();
        // UIManager.getInstance().showUI('RoomUI');
        // UIManager.getInstance().closeUI("GameUI",true);
        
    }
    /**关闭游戏 */
    _proto.onCloseGame = function(){
        //跳转到玩吧
        // window.location.href=UserModule.getInstance().redirect;
    }
    /**发送数据 */
    _proto.sendScore = function(highScore){
        wxGame.getInstance().uploadUserScore(highScore);
        // if(Browser.onMiniGame){
        //     var openDataContext = wx.getOpenDataContext()
        //     openDataContext.postMessage({
        //         msgType:3,
        //         score:highScore,
        //     })
        // }
    }
    /**获取排行榜 */
    _proto.onGetRankList = function(){
        if(Browser.onMiniGame){

            var openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                msgType:1,
                page:0,
            })
            if(rankSprite2 != null){
                rankSprite2.destroy();
            }
            rankSprite2 = new Laya.Sprite();
            this.addChild(rankSprite2);

            var sharedCanvas = openDataContext.canvas;
            Laya.timer.once(200, this, function () {
                var rankTexture = new Laya.Texture(sharedCanvas);
                rankTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新  
                rankSprite2.graphics.drawTexture(rankTexture, 0, 0,Laya.stage.width,Laya.stage.height);
            });   
        }
    }
    _proto.onRankPageLast = function(){
        // console.log("--------onRankPageLast");
        
        if(Browser.onMiniGame){
            var openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                msgType:1,
                page:-1,
            })
        }
    }
    _proto.onRankPageNext = function(){
        // console.log("--------onRankPageNext");
        if(Browser.onMiniGame){
            var openDataContext = wx.getOpenDataContext()
            openDataContext.postMessage({
                msgType:1,
                page:1,
            })
        }
    }
    _proto.onShareGame = function(){
        wxGame.getInstance().shareGame();
        // if(Browser.onMiniGame){
        //     wx.shareAppMessage({
        //             title: '[有人@我]小姐姐，小姐姐，我有个游戏你玩吗？',
        //             imageUrl:"game/shard.png"
        //         })
        // }
    }
    return GameoverUILogic;
})(GameoverUI);