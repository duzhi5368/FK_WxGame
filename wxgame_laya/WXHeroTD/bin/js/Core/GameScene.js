/**
 * 游戏场景
 */
var GameScene = (function (_super) {


    Laya.class(GameScene, "Core.GameScene", _super);
    _proto = GameScene.prototype;

    function GameScene() {
        // GameScene.super(this);
        this.Init();
    }

    /**游戏层级 */
    var GameIndex = {
        /**怪物的层级 */
        monsterBoxIndex:10,
        /**英雄的层级 */
        heroBoxIndex:20,
        /**防御塔的层级 */
        towerBoxIndex:30,

    }

    var MonsterPoolNum = 50;                                                 //怪物对象池大小

    _proto.gameUI = null;                                                    //ui对象
    _proto.curHero = null;                                                   //当前英雄
    _proto.curTower = null;                                                  //当前防御塔
    _proto.floorBoard = null;                                                //地面盒子
    _proto.pointBoard = null;                                                //指引线盒子
    _proto.propBoard = null;                                                 //道具盒子
    _proto.heroBox = null;                                                   //存放英雄对象的盒子
    _proto.monsterBox = null;                                                //存放怪物对象的盒子
    _proto.towerBox = null;                                                  //存放防御塔对象的盒子
    _proto.monsterList = null;                                               //怪物对象列表
    _proto.propList = null;                                                  //道具物对象列表
    _proto.monsterPool = null;                                               //怪物对象池
    _proto.towerGlobaPos = null;                                             //防御塔坐标

    _proto.pointLinePanel1 = null;                                                //指引点面板
    _proto.pointLinePanel2 = null;                                                //指引点面板

    _proto.gameScore = 0;                                                    //游戏分数
    _proto.createMonstrCD = 0;                                               //产生怪物cd
    _proto.lastUpdateTime = 0;                                               //上一次更新时间
    _proto.isShowVideoAd = false;                                            //是否已经显示广告

    _proto.Init = function () {
        //初始化当前类属性
        this.gameScore = 0;
        
        this.monsterList = new Array();
        this.monsterPool = [];
        this.propList = new Array();


        this.floorBoard = new Sprite();
        this.floorBoard.width = Laya.stage.width;
        this.floorBoard.height = Laya.stage.height;
        this.floorBoard.zOrder = 1;

        this.pointBoard = new Sprite();
        this.pointBoard.width = Laya.stage.width;
        this.pointBoard.height = Laya.stage.height;
        this.pointBoard.zOrder = 5;

        this.propBoard = new Sprite();
        this.propBoard.width = Laya.stage.width;
        this.propBoard.height = Laya.stage.height;
        this.propBoard.zOrder = 6;

        this.monsterBox = new Laya.Box();
        this.monsterBox.width = Laya.stage.width;
        this.monsterBox.height = Laya.stage.height;
        this.monsterBox.zOrder = 10;

        this.heroBox = new Laya.Box();
        this.heroBox.width = Laya.stage.width;
        this.heroBox.height = Laya.stage.height;
        this.heroBox.zOrder = 30;
        
        this.towerBox = new Laya.Box();
        this.towerBox.width = Laya.stage.width;
        this.towerBox.height = Laya.stage.height;
        this.towerBox.zOrder = 20;

        Laya.stage.addChild(this.floorBoard);
        Laya.stage.addChild(this.pointBoard);
        Laya.stage.addChild(this.propBoard);
        Laya.stage.addChild(this.monsterBox);
        Laya.stage.addChild(this.towerBox);
        Laya.stage.addChild(this.heroBox);

        //初始化 防御塔
        this.curTower = new Tower();
        this.curTower.pos(Laya.stage.width /2,Laya.stage.height / 2 +45);
        this.towerBox.addChild(this.curTower);

        
        // this.initMonsterPool();
        //初始化生成器
        MonsterGenerator.getInstance().initGenerator(this.monsterBox,this.curTower);

        //自动适配完后初始化
        // Laya.timer.frameOnce(8, this, this.delayInitShow);
        
        this.initHero();
        // this.initMonster();

        if (this.gameUI == undefined) {
            this.gameUI = UIManager.getInstance().showUI("GameUI");
        }

        this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        
        
        
        MessageController.getInstance().AddNotification("Monster_Dead",this,this._monsterDeadEvent);
        MessageController.getInstance().AddNotification("Tower_Dead",this,this._towerDeadEvent);
       
    }

    _proto.onDestroy = function () {

    }
    //自动适配完后初始化
     _proto.delayInitShow = function () {
        
     }
    

    /**初始化英雄 */
    _proto.initHero = function(){
        this.curHero = new Hero();
        this.heroBox.addChild(this.curHero);
        this.curHero.pos(this.curTower.x, this.curTower.y + 200);
        this.curHero.stopAnim();
    }

   
    /**初始化怪物 */
    _proto.initMonster = function(){
       
    }

    

    /**开始游戏 */
    _proto.startGame = function () {
         Laya.timer.frameLoop(1, this, this.onUpdate);
         this.curHero.playAnim();
         this.gameUI.moveBox.on(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
         this.gameUI.moveBox.on(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);

         wxGame.getInstance().showAD(2);
    }

    /**重置游戏 */
    _proto.restartGame = function(_score){
        var t_score =0;
        if(_score != null){
            t_score = _score;
        }
        this.gameScore = t_score;
        this.gameUI.setScore(t_score,false);

        this.curTower.resetHp();

        this.curHero.heroSpeed = Hero_Speed;
        this.curHero.pos(this.curTower.x, this.curTower.y + 200);
        this.curHero.stopAnim();
        this.curHero.reserTarget();

        for (var i = 0; i < this.monsterList.length; i++) {
            var t_monster = this.monsterList[i];
            MonsterFactory.getInstance().recoveryMonsterToPool(t_monster);
        }
        this.monsterList = [];
        this.propList = [];
        this.pointBoard.destroyChildren();
        this.floorBoard.destroyChildren();
        this.propBoard.destroyChildren();

        
    }
    /**游戏结束 */
    _proto.gameover = function(){
        wxGame.getInstance().showAD(0);
        // UIManager.getInstance().showUI("GameOverUI");
        var endUIStr = "GameOverUI";
        if (!SceneManager.getInstance().currentScene.isShowVideoAd) {
            if (Browser.onMiniGame){
                if(wxGame.getInstance().videoAd != null){
                    endUIStr = "GameEndShareUI";
                }
            }else{
                endUIStr = "GameEndShareUI";
            }
        }
        var gameoverUI = UIManager.getInstance().showUI(endUIStr);
    }
    /**
     * update刷新
     */
    _proto.onUpdate = function () {
        if(this.monsterList.length > 0){
            for (var i = 0; i < this.monsterList.length; i++) {
                var tempMon = this.monsterList[i];
                tempMon.onUpdate();
            }
        }
        if(this.curHero != null){
            this.curHero.onUpdate();
        }
        if(this.curTower != null){
            this.curTower.onUpdate();
        }
        if(this.propList.length > 0){
            for (var i = 0; i < this.propList.length; i++) {
                var t_prop = this.propList[i];
                t_prop.onUpdate();
            }
        }

       this.updateGeneratorMonster();
       this.updateHeroZorder();
       this.updatePointLine();

    }

    /**刷新英雄防御塔层级 */
     _proto.updateHeroZorder = function(){
        var t_heroPos = this.curHero.parent.localToGlobal(new Point(this.curHero.x,this.curHero.y),true);
        var t_towerPos = this.curTower.parent.localToGlobal(new Point(this.curTower.x,this.curTower.y),true);
        if(t_heroPos.y > t_towerPos.y){
            this.heroBox.zOrder = 30;
            this.towerBox.zOrder = 20;
        }else{
            this.heroBox.zOrder = 20;
            this.towerBox.zOrder = 30;
        }
    }
    /**根据时间生成怪物 */
     _proto.updateGeneratorMonster = function(){
        this.getCdTime();
        var t_time =  new Date().getTime();
        var t_interval = t_time  - this.lastUpdateTime;
        if(t_interval > this.createMonstrCD){
                // Gamelog("-------间隔="+t_interval+",createMonstrCD="+this.createMonstrCD);
                this.lastUpdateTime = t_time;
                this.createMonster();
        }
    }

    /**生成怪物 */
    _proto.createMonster = function(){
        var t_list = MonsterGenerator.getInstance().createMonster(1);
        this.monsterList = this.monsterList.concat(t_list);
    }
    /**获取产生怪物间隔时间 */
    _proto.getCdTime = function(){
        for (var i = MonsterRefreshData.length -1; i >=0 ; i--) {
            var t_data = MonsterRefreshData[i];
            if(this.gameScore > t_data.score){
                this.createMonstrCD = t_data.time ;
                break;
            }
        }
    
    }
    /**按下监听事件 */
    _proto._mouseDowmEvent = function(_event){
        // Gamelog("------_mouseDowmEvent="+_event.stageX+",stageY="+_event.stageY);
        // this.heroBox.globalToLocal(_event.stageX,_event.stageY);
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        this.curHero.setTargetPos(tarPos);
       
    
        
    }
    /**按下移动监听事件 */
    _proto._mouseMoveEvent = function(_event){
        // this.curHero.setTargetPos(_event.stageX,_event.stageY);
        var tarPos = this.heroBox.globalToLocal(new Point(_event.stageX,_event.stageY));
        this.curHero.setTargetPos(tarPos);
    }


    _proto._monsterDeadEvent = function(notif){
        // Gamelog("-----_monsterDeadEvent");
        var t_score = notif.Content.monsterScore;
        this.gameScore += t_score;
        this.gameUI.setScore(this.gameScore,true);

        this.gameUI.stageShake();

        for (var i = 0; i < this.monsterList.length; i++) {
            var t_monster = this.monsterList[i];
            if(t_monster == notif.Content){
                // Gamelog("------删除怪物");
                this.monsterList.splice(i, 1);
                // MonsterFactory.getInstance().recoveryMonsterToPool(t_monster);
            }

        }
    }

    /**防御塔死亡 */
    _proto._towerDeadEvent = function(notif){
        Laya.timer.clear(this,this.onUpdate);
        this.gameUI.moveBox.off(Laya.Event.MOUSE_DOWN,this,this._mouseDowmEvent);
        this.gameUI.moveBox.off(Laya.Event.MOUSE_MOVE,this,this._mouseMoveEvent);
        this.pointBoard.destroyChildren();
    }

    
    /**创建指引线 */
    _proto.createPointLine = function (_start,_end,_start2,_end2) {
        this.pointBoard.destroyChildren();
        this.drawLine(_start,_end);
        if(_start2 != null){
            this.drawLine(_start2,_end2);
        }
        
    }
    _proto.drawLine = function(_start,_end){
        var targetVector = PointSub(_end,_start);
        targetVector.normalize();

        var t_pintDis = 40;
        var t_dis = PointDistance(_end,_start);
        var pointNum = Math.floor(t_dis / t_pintDis );

        for (var i = 0; i < pointNum; i++) {
            var pointSprite = new Sprite();
            pointSprite.loadImage("game/point.png");
            pointSprite.x = _start.x + t_pintDis *i * targetVector.x;
            pointSprite.y = _start.y + t_pintDis * i * targetVector.y;
            pointSprite.pivot(pointSprite.width / 2, pointSprite.height / 2);
            this.pointBoard.addChild(pointSprite);
        }
    }

    /**根据英雄位置更新指引线 */
    _proto.updatePointLine = function(){

        var t_heroGlobaPos = this.curHero.parent.localToGlobal(new Point(this.curHero.x,this.curHero.y),true);

        for (var i = 0; i < this.pointBoard.numChildren; i++) {
            var t_point = this.pointBoard.getChildAt(i); 
            var t_pos = this.pointBoard.globalToLocal(new Point(t_point.x,t_point.y),true);

            if(pointIsInCircle(t_heroGlobaPos,20,t_pos)){
                t_point.destroy();
            }
        }
    }
    
    /**创建道具 */
    _proto.createProp = function(_x,_y,_type){

        var t_prop = new Prop();
        t_prop.pos(_x,_y);
        t_prop.setPropType(_type);

        this.propBoard.addChild(t_prop);
        this.propList.push(t_prop);

        //位移
        var t_propRadius = 100;
        var randomNum = parseInt(Math.random()*t_propRadius, 10) + 100;
        var randomPm = parseInt(Math.random()*2, 10);
        var target_X = _x;
        var target_Y = _y;
        if(randomPm == 1){
            target_X += randomNum;
            target_Y += randomNum;
        }else{
            target_X -= randomNum;
            target_Y -= randomNum;
        }
        //取值范围
        var t_minNum = 25;
        if(target_X < t_minNum){
            target_X = t_minNum;
        }
        if(target_Y < t_minNum){
            target_Y = t_minNum;
        }

        if(target_X > Laya.stage.width - t_minNum){
            target_X = Laya.stage.width - t_minNum;
        }
        if(target_Y > Laya.stage.height - t_minNum){
            target_Y = Laya.stage.height - t_minNum;
        }
        //跳过防御塔范围
        var t_towerRadius = this.curTower.TowerRadios;
        if(target_X > this.curTower.x - t_towerRadius && target_X < this.curTower.x + t_towerRadius){
            if(target_X < this.curTower.x){
                target_X = this.curTower.x - t_towerRadius;
            }else{
                target_X = this.curTower.x + t_towerRadius;
            }
        }
        if(target_Y > this.curTower.y - t_towerRadius && target_Y < this.curTower.y + t_towerRadius){
            if(target_Y < this.curTower.y){
                target_Y = this.curTower.y - t_towerRadius;
            }else{
                target_Y = this.curTower.y + t_towerRadius;
            }
        }


        Laya.Tween.to(t_prop,{
            x:target_X,
            y:target_Y,
        },300);

    }

    _proto.removeProp = function(_proto){
        for (var i = 0; i < this.propList.length; i++) {
            var t_prop = this.propList[i];
            if(t_prop == _proto){
                // Gamelog("------删除怪物");
                this.propList.splice(i, 1);
            }

        }
    }

    return GameScene;
})();