/**
 * 游戏结束界面
 */
var GameStartUILogic = (function (_super) {

    function GameStartUILogic() {
        GameStartUILogic.super(this);
    }
    Laya.class(GameStartUILogic, "GameStartUILogic", _super);
    _proto = GameStartUILogic.prototype;

    _proto.onInit = function () {
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        this.zOrder = 100;

        this.guildBox.visible = false;
        this.startBox.visible = true;

        this.btn_start.on(Laya.Event.CLICK,this,this._startClickEvent);
        this.guildBox.on(Laya.Event.CLICK,this,this._guildClickEvent);
        this.btn_rank.on(Laya.Event.CLICK,this,this._rankClickEvent);


        //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
		var interactionArea = new Sprite();
		//设置叠加模式
		interactionArea.blendMode = "destination-out";
		// guideContainer.addChild(interactionArea);
        this.guildBox.addChild(interactionArea);
        interactionArea.graphics.drawCircle(400, 1050, 170, "#000000");

        // this.delayInitShow();

        // Laya.timer.frameOnce(8, this, this.delayInitShow);
         wxGame.getInstance().showAD(1);
         wxGame.getInstance().showClubBtn(true);
    }
    
     //自动适配完后初始化
     _proto.delayInitShow = function () {

        // 引导所在容器
		var guideContainer = new Sprite();
		// 设置容器为画布缓存
		guideContainer.cacheAs = "bitmap";
		this.addChild(guideContainer);

        //绘制遮罩区，含透明度，可见游戏背景
		var maskArea = new Sprite();
		maskArea.alpha = 0.5;
		maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
		guideContainer.addChild(maskArea);
        
        //  var s_mask = this.guildBox.getChildByName("s_mask");
        //绘制一个圆形区域，利用叠加模式，从遮罩区域抠出可交互区
		var interactionArea = new Sprite();
		//设置叠加模式
		interactionArea.blendMode = "destination-out";
		// guideContainer.addChild(interactionArea);
        this.guildBox.addChild(interactionArea);
        interactionArea.graphics.drawCircle(200, 400, 240, "#000000");
     }
    _proto.onDestroy = function () {
        // MusicManager.getInstance().stopMusic();
    }


    /**开始游戏 */
    _proto._startClickEvent = function () {
        this.guildBox.visible = true;
        this.startBox.visible = false;
         wxGame.getInstance().showAD(0);
         wxGame.getInstance().showClubBtn(false);
    }
    /**点击引导 */
    _proto._guildClickEvent = function () {
        // this.zOrder = 25;
        this.guildBox.visible = false;
        UIManager.getInstance().closeUI("GameStartUI",true);
        SceneManager.getInstance().currentScene.startGame();
    }
    /**点击排行榜 */
    _proto._rankClickEvent = function(){
        UIManager.getInstance().showUI("GameRankUI");
    }
    
    return GameStartUILogic;
})(GameStartUI);