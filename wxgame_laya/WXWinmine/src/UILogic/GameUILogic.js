/**
 * 游戏界面逻辑 by lzq
 */
var GameUILogic = (function(_super){
    function GameUILogic(){
        GameUILogic.super(this);

    }
    Laya.class(GameUILogic,"UILogic.GameUILogic",_super);
    var _proto = GameUILogic.prototype;
    
    var GAME_TIME = 10;                                        //一局游戏的时间

    _proto.dataArr = [];                                      //list数据
    this.msgTotalHeight = 0;                                  //当前聊天记录位置
    this.eShopBotBoxPosY = 0;                                 //底部电商坐标

    _proto.onInit = function(){
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        UIManager.getInstance().showUI("GameStartUI");
        
        
        //存放UI效果
        this.blockBox.width = Laya.stage.width;
        this.blockBox.height = Laya.stage.height;
        this.bottomPosY = 0;

        MusicManager.getInstance().playMusic("res/music/1.mp3");
        // MusicManager.getInstance().playSound("res/music/15.wav");
        _proto.dataArr = [];


        this.btn_setting.on(Laya.Event.CLICK,this,this._settingClickEvent);
        this.btn_setClose.on(Laya.Event.CLICK,this,this._settingCloseClickEvent);
        this.btn_setSound.on(Laya.Event.CLICK,this,this._soundClickEvent);
        this.btn_rule.on(Laya.Event.CLICK,this,this._ruleClickEvent);
        this.btn_rulesBox.on(Laya.Event.CLICK,this,this._ruleCloseClickEvent);
        //等界面适配完成后调用
        // Laya.timer.frameOnce(5, this, function () {

        // });
    }

    _proto.onDestroy = function(){

    }
    //初始化界面
    _proto.onEnterGameInit = function(){

    }
    
     /**开启设置界面 */
     _proto._settingClickEvent = function(){
         SceneManager.getInstance().currentScene.pauseGame();
         this.setBox.visible = true;
         MusicManager.getInstance().playSound("res/music/1.wav");
     }

     /**关闭设置 */
     _proto._settingCloseClickEvent = function(){
        SceneManager.getInstance().currentScene.resuemGame();
         this.setBox.visible = false;
         MusicManager.getInstance().playSound("res/music/1.wav");
     }
     /**点击音效 */
     _proto._soundClickEvent = function(){
        Gamelog("------点击音效");
        MusicManager.getInstance().playSound("res/music/1.wav");
        var soundSwitch = MusicManager.getInstance().managerSwitch;
        if(soundSwitch == 1){
            this.btn_setSound.skin = "GameUI/btn_guan.png";
            MusicManager.getInstance().managerSwitch = 0;
            // LocalStorage.setItem("soundSwitch",0);
            SoundManager.stopAll();
        }else{
            MusicManager.getInstance().managerSwitch = 1;
            // LocalStorage.setItem("soundSwitch",1);
            this.btn_setSound.skin = "GameUI/btn_kai.png";
            MusicManager.getInstance().playMusic("res/music/1.mp3");
        }
     }

     /**点击规则 */
     _proto._ruleClickEvent = function(){
         this.rulesBox.visible = true;
         this.setMainBox.visible = false;
     }

     /**点击规则关闭 */
     _proto._ruleCloseClickEvent = function(){
         MusicManager.getInstance().playSound("res/music/1.wav");
         this.rulesBox.visible = false;
         this.setMainBox.visible = true;

     }
    
   
    return GameUILogic;
})(GameUI);