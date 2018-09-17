var Browser = Laya.Browser;
var Matter = window.Matter; 
var LayaRender = window.LayaRender;

/**
 * 物理场景
 */
var MatterSceneMonster = (function(_super){
    

    function MatterSceneMonster(){
        // MatterSceneMonster.super(this);
        this.onInit();
    }
    Laya.class(MatterSceneMonster,"MatterSceneMonster",_super);
    var _proto = MatterSceneMonster.prototype;

    var engine;                                                        //初始化物理引擎
    var bubbleBodyList;                                                //泡泡刚体列表
    var GROUNDID = 91000;                                              //地面id
    var BasketBorderID = 81000;                                        //桶边缘id
    var BUBBLEID = 20000;                                              //泡泡刚体id
    var BUBBLEPLAYERID = 30000;                                        //头像泡泡刚体id 
    var BUBBLEPROPID = 40000;                                          //道具刚体id
    var bubbleDestroyList;                                             //需要销毁的泡泡
    var bubbleBasketIDList;                                            //碰撞到筐子的id
    var BasketScoreOne = 10;                                           //篮子第一种的分值
    var BasketScoreTwo = 25;                                          //篮子第二种的分值
    var BasketScoreThree = 50;                                        //篮子第三种的分值
    var matterRender = null;                                           //render
    var bubbleImageList;                                               //泡泡图片列表

    _proto.onInit = function(){
        bubbleBodyList = [];
        bubbleBasketIDList = [];
        bubbleImageList = [];

        this.bubbleIndex = BUBBLEID;
        this.bubblePlayerIndex = BUBBLEPLAYERID;
        this.bubblePropIndex = BUBBLEPROPID;

        this.initMatter();
        this.initWorld();
        Laya.timer.frameLoop(1,this,this.onUpdate);

    }
    _proto.onDestroy = function(){

    }

    /**
     * 初始化物理引擎
     */
    _proto.initMatter=function()
	{
		// 初始化物理引擎
		engine = Matter.Engine.create(
		{
			enableSleeping: true,
		});
		this.runnder = Matter.Engine.run(engine);
		matterRender = LayaRender.create(
		{
			engine: engine,
			width: GameConfig.GameWidth,
			height: GameConfig.GameHeight,
			options:
			{
				// background: 'BasketBall/gameBackground.jpg',
				wireframes: false,
			}
		});
		LayaRender.run(matterRender);
	}
    /**
     * 初始化物理世界
     */
    _proto.initWorld=function()
	{
        var stageCenter = Laya.stage.width/2;
        var stageCenterY = Laya.stage.height/2;
        //左边墙
        // var groundLeft = Matter.Bodies.rectangle(0, Laya.stage.height/2, 10, Laya.stage.height,
        var groundLeft = Matter.Bodies.rectangle(stageCenter - GameConfig.GameWidth / 2 -5, Laya.stage.height/2, 10, Laya.stage.height,
        {
                isStatic: true,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"FC0404"
                },
        });
        //右边墙
        // var groundRight = Matter.Bodies.rectangle(Laya.stage.width-10, Laya.stage.height/2, 10, Laya.stage.height,
        var groundRight = Matter.Bodies.rectangle(stageCenter + GameConfig.GameWidth / 2 +5, Laya.stage.height/2, 10, Laya.stage.height,
        {
                isStatic: true,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"FC0404"
                },
        });
        //地面
        // var groundDown = Matter.Bodies.rectangle(Laya.stage.width/2, Laya.stage.height, Laya.stage.width*1.5, Laya.stage.height*0.01,
        var groundDown = Matter.Bodies.rectangle(stageCenter, stageCenterY + GameConfig.GameHeight/2, GameConfig.GameWidth, Laya.stage.height*0.01,
        {
                id: GROUNDID,
                isStatic: true,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"FC0404"
                },
        });

        var groundArr = new Array();
        groundArr.push(groundDown);
        groundArr.push(groundLeft);
        groundArr.push(groundRight);
        Matter.World.add(engine.world, [ groundDown,groundLeft,groundRight]);

        
        //增加篮筐
        // this.addBasket();
        //增加山坡
        this.addHillside();
        //碰撞监听
        Matter.Events.on(engine,"collisionStart",this.onCollisionStart);
        
	}
    //设置时间
    _proto.setEngineTimeScale = function(_scale){
        engine.timing.timeScale = _scale;
        LayaRender.stop(matterRender);
    }

    /**
     * 增加篮筐
     */
    _proto.addHillside = function(){
        var basketID = GROUNDID;
        var borderID = BasketBorderID;
        var leftBorder = Laya.stage.width/2 - GameConfig.GameWidth / 2;
        var rightBorder = Laya.stage.width - leftBorder;
        var borderWidth = 250;
        var borderHeight = 50;
        var stageCenterY = Laya.stage.height/2;
        var downPosY = stageCenterY + GameConfig.GameHeight/2;

        // var leftBottom = Matter.Bodies.rectangle(leftBorder + borderWidth/2, Laya.stage.height - borderHeight/2 , borderWidth, borderHeight,
        // {
        //         // id: GROUNDID,
        //         isStatic: true,
        //         render:
        //         {
        //                 visible: GameMatterBody,
        //                 fillStyle:"FC0404"
        //         },
        // });
        var leftUp = Matter.Bodies.rectangle(leftBorder + borderWidth/2, downPosY  - borderHeight*2 +40 , borderWidth+20, 50,
        {
                id: 80100,
                isStatic: true,
                angle:Math.PI * 0.1,
                friction:0.5,
                // frictionStatic:2.9,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"FC0404"
                },
        });

        var center = Matter.Bodies.rectangle(Laya.stage.width/2, downPosY - 10 , 180, 20,
        {
                id: GROUNDID+1000,
                isStatic: true,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"#87fd08"
                },
        });

        // var rightBottom = Matter.Bodies.rectangle(rightBorder - borderWidth/2, Laya.stage.height - borderHeight/2 , borderWidth, borderHeight,
        // {
        //         // id: GROUNDID+1000,
        //         isStatic: true,
        //         render:
        //         {
        //                 visible: GameMatterBody,
        //                 fillStyle:"FC0404"
        //         },
        // });
        var rightUp = Matter.Bodies.rectangle(rightBorder - borderWidth/2, downPosY  - borderHeight*2+40 , borderWidth+20, 50,
        {
                id: 80200,
                isStatic: true,
                angle:-Math.PI * 0.1,
                friction:0.5,
                // frictionStatic:2.9,
                render:
                {
                        visible: GameMatterBody,
                        fillStyle:"FC0304"
                },
        });
        //  Matter.World.add(engine.world, [ leftBottom,leftUp,center,rightBottom,rightUp]);
         Matter.World.add(engine.world, [ leftUp,center,rightUp]);
    }
    //根据类型获取刚体ID
    _proto.getBodyIDByType = function(_bubbleType){
        var bodyID = 0;
        switch (_bubbleType) {
            case BubbleTypes.Normal:
                bodyID = this.bubbleIndex++
                break;
            case BubbleTypes.Player:
                bodyID = this.bubblePlayerIndex++;
                break;
            case BubbleTypes.Egg:
                bodyID = this.bubblePropIndex++;
                break;
        }
        // Gamelog("----bodyid="+bodyID);
        return bodyID;
    }
    /**
     * 增加掉落的球
     */
    _proto.addBodyBubble = function(bubbleList,bubbleDataList){
        if(bubbleList.length > 5){
            if (Browser.onMiniGame) {
                //震动
                wx.vibrateLong({});
            }
        }
        for(var i=0; i<bubbleList.length; i++){
            var num = Math.random()*5 + 1;
            var direct = Math.random()*1;
            // var forceX = num / 10;
            var forceX = num / 2;
            if(direct > 0.5)
                forceX = -forceX;
            // Gamelog("------------forceX="+forceX+",direct ="+direct);
            var gameUI =  UIManager.getInstance().getUI("GameUI");
            var bubble = bubbleList[i];
            // if(bubble == null)
            //     continue;
            
            rockOptions = {
                id: this.getBodyIDByType(bubble.bubbleType),
                density: 0.009,
                friction: 0.5,
                // frictionStatic:1.9,
                // frictionAir:0.05,
                restitution:0.9,
                // isStatic: true,
                force:{
                     x:forceX,
                        // x:1.01,
                        // y:-1.7
                },
                render:
                {
                    // visible: false,
                    fillStyle: "#27FC04",
                    sprite:
                    {
                        texture: (bubble.playerData != null) ? "" : bubble.skin,
                        xOffset: BUBBLE_RADIUS,
                        yOffset: BUBBLE_RADIUS,
                        // parent:gameUI
                        // zOrder: 10,
                    }
                                        
                },
            };

            
            var b_point  = new Point(bubble.width/2,bubble.height/2);
            b_point = bubble.localToGlobal(b_point);
            // var Basketball = Matter.Bodies.polygon(b_point.x, b_point.y,12,BUBBLE_RADIUS,rockOptions);
            var Basketball = Matter.Bodies.circle(b_point.x, b_point.y,BUBBLE_RADIUS,rockOptions);
            Matter.World.add(engine.world, Basketball);
            // Basketball.angle = 0.1;

            bubbleBodyList.push(Basketball);
            //根据类型创建图片随刚体运动
            switch (bubble.bubbleType) {
                case BubbleTypes.Player:
                    this.createPlayerBubble(bubble,b_point,Basketball);
                    break;
                case BubbleTypes.Egg:
                    this.createEggBubble(bubble,b_point,Basketball);
                    break;
            
            }

        }
    }

    /**创建头像图片*/
    _proto.createPlayerBubble = function(bubble,b_point,body){
        //用户头像刚体
        if(bubble.playerData != null){

            var tempBubble = new Bubble();
            // tempBubble.skin = bubble.playerData.icon;
            tempBubble.anchorX  = 0.5;
            tempBubble.anchorY  = 0.5;
            tempBubble.width = BUBBLE_RADIUS*2;
            tempBubble.height = BUBBLE_RADIUS*2;
            tempBubble.x = b_point.x;
            tempBubble.y = b_point.y;
            tempBubble.playerData = bubble.playerData;
            tempBubble.bodyData = body;
            //添加一个新图片
            var imgBg = new Laya.Image(bubble.playerData.icon);
            imgBg.width = tempBubble.width;
            imgBg.height = tempBubble.height;
            //遮罩
            var maskImg = new Laya.Image("game/img_qiu_1.png");
            // maskImg.anchorX  = 0.5;
            // maskImg.anchorY  = 0.5;
            // tempBubble.mask = maskImg;
            imgBg.mask = maskImg;
            tempBubble.addChild(imgBg);
            tempBubble.zOrder = 0.1;
            //泡泡透明层
            var popImg = new Laya.Image("game/img_qiu_zhezhao.png");
            tempBubble.addChild(popImg);

            Laya.stage.addChild(tempBubble);
            // Gamelog("------------Add tempBubble");
            // playerImageList.push(tempBubble);
            bubbleImageList.push(tempBubble);
            
        }
    }

    /**创建金蛋 */
    _proto.createEggBubble = function(bubble,b_point,body){
        var tempBubble = new Bubble();
        // tempBubble.skin = bubble.playerData.icon;
        tempBubble.anchorX  = 0.5;
        tempBubble.anchorY  = 0.5;
        tempBubble.width = BUBBLE_RADIUS*2;
        tempBubble.height = BUBBLE_RADIUS*2;
        tempBubble.x = b_point.x;
        tempBubble.y = b_point.y;
        tempBubble.bodyData = body;
        //金蛋动画
        var eggAnim = new Laya.Animation();
        eggAnim.interval = 100;
        tempBubble.addChild(eggAnim);
        eggAnim.play(0,true,"jindan");

        tempBubble.zOrder = 0.1;
        Laya.stage.addChild(tempBubble);

        bubbleImageList.push(tempBubble);
    }

    /**删除所有篮球刚体 */
    _proto.removeAllBasketBall = function(){
        for(var i=0; i<bubbleBodyList.length; i++){
            Matter.World.remove(engine.world, bubbleBodyList[i]);
        }
        bubbleBasketIDList = [];
        this.bubbleIndex = BUBBLEID;
        this.bubblePlayerIndex = BUBBLEPLAYERID;
        this.bubblePropIndex = BUBBLEPROPID;
        for(var x=0; x<bubbleImageList.length; x++){
            bubbleImageList[x].destroy();
        }
        bubbleImageList = [];
    }
    
    /**
     * 碰撞检测
     */
    _proto.onCollisionStart = function(event){
        var pairs = event.pairs;
        var isGoalBall = false;
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i];
            if(pair.bodyA.id > 10000 || pair.bodyB.id > 10000){
                // console.debug("--------------collision id="+pair.id);
            }
            if(pair.bodyA.id >= 20000 && pair.bodyB.id >= 90000)
            {
                // bubbleBasketIDList.push(pair.bodyB.id);
                bubbleBasketIDList.push(pair);
                // //计算分数
                // countBasketScore(pair.bodyB.id);
                // console.debug("-----collision id="+pair.bodyA.id+",id2="+pair.bodyB.id);
                // console.debug("-----engine.bodies.length="+engine.world.bodies.length);
                for(var j=0 ; j< engine.world.bodies.length; j++){
                    var body = engine.world.bodies[j];
                    if(pair.bodyA.id === body.id)
                    {
                        body.isSensor = true;
                        body.isStatic = true;
                        Matter.World.remove(engine.world, body);
                        // console.debug("-----------remove id="+body.id);
                    }
                }
            }
            if(pair.bodyA.id >= 90000 && pair.bodyB.id >= 20000)
            {
                // console.debug("-----collision id="+pair.bodyA.id+",id2="+pair.bodyB.id);
                Matter.World.removeBody(engine.world, pair.bodyB,true);
            }
            //碰撞到桶边缘
            if(pair.bodyA.id >= 20000 && pair.bodyB.id >= 80000 && pair.bodyB.id  < 90000){
                // console.debug("-----collision basketBorder id="+pair.bodyA.id+",id2="+pair.bodyB.id);
                MusicManager.getInstance().playSound("res/music/6.wav");
            }
        }
    }
    /**
     * 计算篮筐分数
     */
    //  function countBasketScore(_bodyId){
     function countBasketScore(_pari){
        var addScore = 0;
        var basketId = 0;
        var bodyB_id = _pari.bodyB.id;
        var bodyA_id = _pari.bodyA.id;
        var playerData = null;
        if(bodyB_id == 92000)
        {
                // console.debug("-----jinkuang--");
                MusicManager.getInstance().playSound("res/music/9.wav");
                //特殊球
                if(bodyA_id >=BUBBLEPLAYERID && bodyA_id < GROUNDID){
                    for(var x=0; x<bubbleImageList.length; x++){
                        var bubbleImg = bubbleImageList[x];
                        if(bubbleImg.bodyData.id == bodyA_id){
                            if(bodyA_id >=BUBBLEPROPID){
                                //金蛋
                                Gamelog("-----进的是金蛋--="+bodyA_id);
                                basketId = BubbleTypes.Egg;
                                addScore = BasketScoreTwo;
                                
                            }else{
                                Gamelog("-----进的是头像--="+bodyA_id);
                                basketId = BubbleTypes.Player;
                                addScore = BasketScoreThree;
                                SceneManager.getInstance().currentScene.removePlayerBubble(bubbleImg.playerData);
                                playerData = bubbleImg.playerData;
                            }
                            bubbleImg.destroy();
                            bubbleImageList.splice(x,1);
                        }
                    }
                
                }else{
                    basketId = BubbleTypes.Normal;
                    addScore = BasketScoreTwo;
                    // Gamelog("-----进的普通球--");
                }
            
        }
        if(basketId !=0){
            SceneManager.getInstance().currentScene.gameUI.showScore(basketId,addScore,playerData);
        }
        SceneManager.getInstance().currentScene.AddScoreShow(basketId,addScore,playerData);
     }
     /**
      * 刷新
      */
      _proto.onUpdate = function(){
          if(bubbleBasketIDList.length >0){
              for(var i=0; i< bubbleBasketIDList.length; i++){
                //计算分数
                countBasketScore(bubbleBasketIDList[i]);
                bubbleBasketIDList.splice(i,1);
              }
          }
          //更新跟随刚体运动的图片
          for(var x=0; x<bubbleImageList.length; x++){
              var bubbleImg = bubbleImageList[x];
              if(bubbleImg.bodyData != null){
                  bubbleImg.rotation = bubbleImg.bodyData.angle / Math.PI * 180;
                  bubbleImg.x = bubbleImg.bodyData.position.x;
                  bubbleImg.y = bubbleImg.bodyData.position.y;
              }
          }
      }
    


    return MatterSceneMonster;
})();