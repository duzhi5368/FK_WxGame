/**
 * 游戏场景
 */
var GameScene = (function(_super){

    
    Laya.class(GameScene,"Core.GameScene",_super);
    _proto = GameScene.prototype;
    
    // var instance;

    // function getInstance(){
    //     if(instance === undefined){
    //         instance = new GameScene();
    //         instance.Init();
    //     }
    //     return instance;
    // }

    function GameScene(){
        // GameScene.super(this);
        this.Init();
    }

    var BUBBLECOLORNUM = 5;                                                     //泡泡的颜色种类
    var BeginRowNum = 10000;                                                      //开始生成泡泡的行号
    var BeginCreateNum = 5;                                                     //开始生成的泡泡行数  
    var ShootCreateNum = 10;                                                    //发射多少个后创建新的一行  
    var MoveOtherBubbleDistance = 5;                                            //碰撞其他球移动的距离
    var GameTime = 120;                                                         //游戏时间
    var bubblePanel;                                                            //泡泡面板
    var singleBubbleScore = 10;                                                 //一个泡泡的得分
    var CreatePropNum = 10;                                                     //发射多少个后创建道具球

    //初始化当前类属性
       
    _proto.gameUI = null;                                                    //ui对象
    _proto.shootBubble;                                                      //ui发射球对象
    _proto.prepareBubble;                                                    //准备发射的球
    
    _proto.mousePoint;                                                       //按下坐标
    _proto.subPoint;                                                         //向量
    _proto.m_curReady;                                                       //当前准备发射的球
    _proto.m_listBubble = new Array();                                       //所有的球
    _proto.m_board = new Array();                                            //所有面板的位置
    _proto.m_mapBubbleList = new Array();                                    //生成地图的球
    _proto.m_playerBubbleList = new Array();                                 //地图里含有的头像球
    _proto.m_propBubleList = new Array();                                    //道具的球

    _proto.gameTopRow = 0;                                                   //游戏的顶部行数  
    _proto.moveOtherBubbleFinish = false;                                    //是否完成移动回调
    _proto.shootNum = 0;                                                     //发射了多少球
    _proto.panelOldY =0;                                                     //面板原来的y坐标
    _proto.panelOldX =0;                                                     //面板原来的X坐标
    _proto.matterScene = null;                                               //物理场景
    _proto.liveGraphics = null;                                              //滑动轨迹
    _proto.mouseDownPos = null;                                              //鼠标按下坐标
    _proto.scoreNum = 0;                                                     //得分
    _proto.currentTime = 0;                                                  //当前游戏时间
    _proto.shootBubbleMoveFinish = false;                                    //发射的泡泡是否移动完毕
    _proto.shootPropNum = 0;                                                 //统计该发射道具球的个数
    _proto.isShowShared = false;                                             //是否已经显示分享过
    
    _proto.Init = function(){

        if(this.gameUI == undefined){
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            this.shootBubble = this.gameUI.shootBubble;
            this.prepareBubble = this.gameUI.prepareBubble;
            bubblePanel = this.gameUI.bubblePanel;
            this.shootBubble.visible = true;
        }
        if(_proto.matterScene == undefined){
            if(GameMatterModle){
                _proto.matterScene = new MatterSceneMonster();
            }
        }
        this.m_board = [];
        this.m_listBubble = [];
        this.m_mapBubbleList = [];
        this.m_playerBubbleList = [];
        this.m_propBubleList = [];

        this.panelOldX = bubblePanel.x;
        this.panelOldY = bubblePanel.y;
        this.moveOtherBubbleFinish = false;
        this.shootBubbleMoveFinish = true;
        this.shootNum = 0;
        this.scoreNum = 0;
        this.gameUI.label_time.text = GameTime;
        this.gameUI.label_score.text = 0;
        this.currentTime = GameTime;
        this.shootPropNum = 0;
        this.isShowShared = false;

        this.prepareBubble.skin = this.randomBubble();
        this.shootBubble.skin = this.randomBubble();
        this.createMapBuble(BeginRowNum,BeginCreateNum);
        //调整泡泡面板到正确位置
        this.movePanelByRow(BeginRowNum - (BeginCreateNum -1),false);
        //增加滑动轨迹
        // if(this.liveGraphics == undefined){
        //     var liveGraphicsCanvas = new Sprite();
        //     Laya.stage.addChild(liveGraphicsCanvas);
        //     this.liveGraphics = liveGraphicsCanvas.graphics;
        // }
        this.gameUI.startGameUI();
        // Laya.timer.scale =1; 
       // MessageController.getInstance().AddNotification(MessageEventName.GameOverEvent,this,this.gameOverReceiver);
    }


     _proto.onDestroy = function(){
        MessageController.getInstance().RemoveNotification(MessageEventName.GameOverEvent,this,this.gameOverReceiver);
    }

    /**开始游戏 */
    _proto.startGame = function(){
        
        //显示最上层的桶
        this.gameUI.imgTong.visible = true;

        this.gameUI.anim_panda.play(0,true,"pandaDaiji");
        //游戏倒计时
        Laya.timer.loop(1000, this, this.animateTimeBased);
        //舞台监听鼠标
        // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        this.gameUI.img_bg.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        // Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
        // Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMouseMove);
    }

    /**
     * update刷新
     */
    _proto.onUpdate = function(){
        //碰撞边缘 x向量方向翻转
        if(this.isCollisionWithBorder()){
            MusicManager.getInstance().playSound("res/music/6.wav");
            this.subPoint.x =- this.subPoint.x;
        }
        
        // var curPoint = new Point(this.m_curReady.x,this.m_curReady.y);
        // var globalPoint = this.m_curReady.localToGlobal(new Point(this.m_curReady.width/2,this.m_curReady.height/2));
        // // console.debug("-------x="+curPoint.x+",y="+curPoint.y+"-----global x="+globalPoint.x+",y="+globalPoint.y);

        // var movePoint = new Point(globalPoint.x + this.subPoint.x * BUBBLE_SPEED, globalPoint.y+ this.subPoint.y *BUBBLE_SPEED);
        // var parentPoint = this.m_curReady.parent.globalToLocal(movePoint);
        // // console.debug("----------parentPoint x="+parentPoint.x+",y="+parentPoint.y);
        // this.m_curReady.pos(parentPoint.x,parentPoint.y);

        this.m_curReady.pos(this.m_curReady.x + this.subPoint.x * BUBBLE_SPEED, this.m_curReady.y+ this.subPoint.y *BUBBLE_SPEED);
        
        if(this.isCollision()){
            Laya.timer.clear(this,this.onUpdate);
            // this.m_curReady.isStop = true;
            //根据发射的球个数往下移动一行
            this.shootNum++;
            if(this.shootNum >= ShootCreateNum){
                this.shootNum = 0;
                this.createMapBuble(this.gameTopRow - 1,1);
                this.movePanelByRow(this.gameTopRow,true);
            }
            
            this.adjustBubblePosition();
            this.changeShootbubble();
        }
    }
    /**移动准备发射的球到手中 */
    _proto.changeShootbubble = function(){
        this.shootBubbleMoveFinish = false;
        this.shootBubble.visible = true;
        // this.shootBubble.skin=this.randomBubble();
        this.shootBubble.skin=this.prepareBubble.skin;
        this.prepareBubble.skin = this.randomBubble();
        //创建道具球
        this.shootPropNum++;
        if(this.shootPropNum >= CreatePropNum){
            this.shootPropNum = 0;
            //this.createPropBubble();
        }
        

        this.gameUI.anim_panda.play(0,true,"pandaDaiji");

        var shootOldPoint = new Point(this.shootBubble.x,this.shootBubble.y);
        var globalPoint = this.prepareBubble.localToGlobal(new Point(this.prepareBubble.width/2,this.prepareBubble.height/2));
        var parentPoint = this.shootBubble.parent.globalToLocal(globalPoint);
        this.shootBubble.pos(parentPoint.x,parentPoint.y);

        Laya.Tween.to(this.shootBubble,{
            x:shootOldPoint.x,
            y:shootOldPoint.y
        },100,null,new Laya.Handler(this,function(){
            this.shootBubbleMoveFinish = true;
        }));

    }
    /**
     * 克隆image
     */
    _proto.cloneImage = function(im){
        this.m_curReady.skin = im.skin;
        var globalPoint = im.localToGlobal(new Point(im.width/2,im.height/2));
        var parentPoint = bubblePanel.globalToLocal(globalPoint);
        this.m_curReady.pos(parentPoint.x,parentPoint.y);
        //this.pos(im.x,im.y);
        this.m_curReady.anchorX  = im.anchorX;
        this.m_curReady.anchorY  = im.anchorY;
        // im.parent.addChild(this);
        bubblePanel.addChild(this.m_curReady);
    }
    /**
     * 鼠标抬起
     */
    _proto.onMouseDown = function(e){

        // var currentScene = SceneManager.getInstance().currentScene;
        //获得鼠标相对stage坐标
        this.mousePoint = Laya.stage.getMousePoint();
        //小于发射坐标
        if(this.mousePoint.y > this.shootBubble.y - 20){
            this.mousePoint.y = this.shootBubble.y -20;
        }
        var LocPoint = this.shootBubble.localToGlobal(new Point(this.shootBubble.width/2,this.shootBubble.height/2));
        // Gamelog("---------onMouseDown shootBubble x="+LocPoint.x+",y="+LocPoint.y);
        this.mouseDownPos = LocPoint;

        //获得两个坐标差值
        this.subPoint = PointSub(this.mousePoint,LocPoint);
        // console.debug("-------------onMouseUp---subPoint="+this.subPoint);
        //获得坐标向量
        this.subPoint.normalize();

        //绘制
        Laya.timer.frameLoop(1, this, this.guideLineAnimate);
    }
    _proto.drawLineByWidth = function(_befPoint,_point,_width1,_width2){
            this.liveGraphics.save();
            this.liveGraphics.alpha(0.5);
            // this.liveGraphics.drawLines(0, 0, _pointArray, "#9DE4EC",_width1);
            this.liveGraphics.drawLine(_befPoint.x, _befPoint.y,_point.x,_point.y, "#9DE4EC",_width1);
            this.liveGraphics.restore();

            this.liveGraphics.save();
            this.liveGraphics.alpha(0.8);
            // this.liveGraphics.drawLines(0, 0, _pointArray, "#6EE6F4",_width2);
            this.liveGraphics.drawLine(_befPoint.x, _befPoint.y, _point.x,_point.y, "#6EE6F4",_width2);
            this.liveGraphics.restore();
    }
     _proto.guideLineAnimate = function(){
               
		this.liveGraphics.clear();
         for(var i=0; i<this.m_listBubble.length; i++){
             var tempBubble = this.m_listBubble[i];
             var b_point  = new Point(tempBubble.width/2,tempBubble.height/2);
             b_point = tempBubble.localToGlobal(b_point);

         }
        // this.drawLineByWidth(new Point(this.shootBubble.x,this.shootBubble.y),this.mousePoint,16,6);
        this.drawLineByWidth(this.mouseDownPos,this.mousePoint,16,6);
    }
    /**
     * 鼠标移动
     */
    _proto.onMouseMove = function(e){
        //获得鼠标相对stage坐标
        this.mousePoint = Laya.stage.getMousePoint();
    }
    /**
     * 鼠标抬起
     */
    _proto.onMouseUp = function(e){
        if(this.m_curReady === undefined || this.m_curReady.isStop && this.shootBubbleMoveFinish ){

            
            this.m_curReady = new Bubble();
            // this.m_curReady.cloneImage(this.shootBubble);
            this.cloneImage(this.shootBubble);
            this.shootBubble.visible = false;
            //获得鼠标相对stage坐标
            this.mousePoint = Laya.stage.getMousePoint();
            var LocPoint = this.m_curReady.localToGlobal(new Point(this.m_curReady.width/2,this.m_curReady.height/2));
            //小于发射坐标
            if(this.mousePoint.y > LocPoint.y - 30){
                this.mousePoint.y = LocPoint.y -30;
            }
            // console.debug("-------------onMouseUp---Point="+this.mousePoint);
            // Gamelog("---------onMouseUp m_curReady x="+LocPoint.x+",y="+LocPoint.y);
            //获得两个坐标差值
            this.subPoint = PointSub(this.mousePoint,LocPoint);
            // console.debug("-------------onMouseUp---subPoint="+this.subPoint);
            //获得坐标向量
            this.subPoint.normalize();
            
            Laya.timer.frameLoop(1,this,this.onUpdate);
            this.m_curReady.isStop = false;
            //熊猫动画
            // this.gameUI.anim_panda.source = "pandaToulan";
            this.gameUI.anim_panda.play(0,false,"pandaToulan");
            // this.gameUI.anim_panda.stop();
            MusicManager.getInstance().playSound("res/music/4.wav");
        }
    }
    /**
     * 调整气泡位置
     */
    _proto.adjustBubblePosition = function()
    {
        var rowcol_index = GetRowColByPos(this.m_curReady.x, this.m_curReady.y);
        if(this.m_board[Number(rowcol_index.x)] === undefined){
            this.m_board[Number(rowcol_index.x)]  = new Array();
        }
        if(this.m_board[Number(rowcol_index.x)][Number(rowcol_index.y)] === undefined){
            var adjustPos = getPosByRowAndCol(rowcol_index.x, rowcol_index.y);
            this.m_curReady.pos(adjustPos.x, adjustPos.y);

            this.m_curReady.setRowColIndex(rowcol_index.x, rowcol_index.y);

            this.m_board[Number(rowcol_index.x)][Number(rowcol_index.y)] = this.m_curReady;
            this.m_listBubble.push(this.m_curReady);
            //先去查找道具球
            if(!this.findPropBubble()){
                // //查找相同的球
                this.findSameBubble(this.m_curReady);
            }
            
        }else{
            var x = Number(this.m_curReady.x) - Number(this.subPoint.x);
            var y = Number( this.m_curReady.y)- Number(this.subPoint.y);
            // console.debug("------------subPoint x="+this.subPoint.x+",y="+this.subPoint.y);
            this.m_curReady.x = x;
            this.m_curReady.y = y;
            // console.debug("------------m_curReady x="+this.m_curReady.x+",y="+this.m_curReady.y);
            this.adjustBubblePosition();
        }
    }
    /**
     * 移动泡泡面板
     */
    _proto.moveBubblePanel = function(){
        //面板移动位置
        var isLong = false;
        var isShort = false;
        var moveSize = 0;
        var lastBubble;
        var lastPointY = 0;
        for(var i=0; i<bubblePanel.numChildren; i++){
            var bubble = bubblePanel.getChildAt(i);
            var globalPoint = bubble.localToGlobal(new Point(bubble.width/2,bubble.height/2));
            // console.debug("--------Bubble x="+bubble.x+",y="+bubble.y +"-----globalPoint x="+globalPoint.x+",y="+globalPoint.y);
            var curPoint = new Point(bubble.x,bubble.y);
            // if(curPoint.y > GameConfig.GameHeight/2 && curPoint.y >listPointY){
            if(curPoint.y >lastPointY){
                lastBubble = bubble;
                lastPointY = bubble.y;
            }
            //如果多出半屏
            if(curPoint.y > GameConfig.GameHeight/2){
                isLong = true;
            }
            //出屏幕了
            if(globalPoint.y < BUBBLE_RADIUS){
                isShort = true;
            }

        }
        //移动位置
        if(isLong || isShort){
            var lastGlobalPoint = lastBubble.localToGlobal(new Point(lastBubble.width/2,lastBubble.height/2));
            // console.debug("--------move Last Bubble x="+lastGlobalPoint.x+",y="+lastGlobalPoint.y);
            var moveY = bubblePanel.y - (lastGlobalPoint.y - GameConfig.GameHeight/2);
            if(moveY > 0){
                moveY = 0;
            }
            Laya.Tween.to(bubblePanel,
            {
                y:moveY
            },200);
        }
    }
    /**
     * 获得随机颜色球
     */ 
    _proto.randomBubble = function(){
        var num = Math.random()*BUBBLECOLORNUM + 1;
        num = parseInt(num, 10);
        var str = "game/img_qiu_"+num+".png";
        
        return str;
    }
     /**
      * 是否碰到边缘
      */
    _proto.isCollisionWithBorder = function(){
        var width = GameConfig.GameWidth;
        var x = this.m_curReady.x;

        if (x <= BUBBLE_RADIUS || x >= width - BUBBLE_RADIUS)
        {
            return true;
        }

	    return false;
    }
    /**
     * 是否碰撞
     */
    _proto.isCollision = function(){
        var bRet = false;
        var height = GameConfig.GameHeight;
        
        if (this.m_curReady.y <= BUBBLE_RADIUS)
        {
            bRet = true;
            return bRet;
        }
        
        for(var i = 0; i<this.m_listBubble.length; i++){
            if(this.m_listBubble[i] != undefined &&  this.isCollisionWithBubble(this.m_listBubble[i],this.m_curReady))
            {
                var randius = Number(BUBBLE_RADIUS);
                var p1 = new Laya.Point(this.m_curReady.x,this.m_curReady.y);
                var p2 = new Laya.Point(this.m_listBubble[i].x,this.m_listBubble[i].y);
                var n1 = Math.abs(p1.x - p2.x);
                var n2 = Math.abs(p1.y - p2.y);
                var rad = Math.atan(n2/n1);
                var du = rad *360 / (2* Math.PI);
                var numy = Math.sin(rad) *  (randius * 2);
                var numx = Math.cos(rad) *  (randius * 2);
                // this.m_curReady.y = this.m_listBubble[i].y + numy;
                // console.debug("---------chazhi n1="+n1);
                // if(p1.x - p2.x < 0){
                //     this.m_curReady.x = this.m_listBubble[i].x - numx;
                // }else{
                //      this.m_curReady.x = this.m_listBubble[i].x + numx;
                // }
                // console.debug("------Jiaodu = "+du +",n2="+n2+",y高度="+numy+",距离="+numx);
                bRet = true;
                break;
                // return bRet;
            }
        }
        return bRet;
    }
    /**
     * 是否和上方的球碰撞
     */
    _proto.isCollisionWithBubble = function(bu1,bu2)
    {
        var randius = Number(BUBBLE_RADIUS - 5);
        // console.debug("--------x1= "+Math.pow(bu1.x - bu2.x, 2)+",x2="+Math.pow(bu1.y - bu2.y, 2)+",x3="+Math.pow(randius + randius, 2));
        var num1 = Number(Math.pow(bu1.x - bu2.x, 2) + Math.pow(bu1.y - bu2.y, 2));
        var num2 = Number(Math.pow(randius + randius, 2));
        var result = num1 < num2;
        // console.debug("---------num1="+num1+",num2="+num2+",result = "+result);
        return result;	//判断两圆是否相交, 公式：（x1-x2)^2 + (y1-y2)^2 < (r1 + r2)^2
    }
    
    /**
     * 准备相同的泡泡
     */
    _proto.findSameBubble = function(pReadyBubble)
    {
        var samelist = new Array();
        samelist.push(this.m_curReady);

        var sameIndex = 0;
        do{

            var itCur = samelist[sameIndex];

            var vecRowCol = new Array();
            // var curRow = Number()
            GetAround(itCur.m_nRowIndex, itCur.m_nColIndex, vecRowCol);
            var colorStr = itCur.skin;

            for(var i=0; i<vecRowCol.length; i++){
                if(this.m_board[Number(vecRowCol[i].x)] === undefined){
                    this.m_board[Number(vecRowCol[i].x)]  = new Array();
                }
                var curBubble = this.m_board[ vecRowCol[i].x ][ vecRowCol[i].y ];
                if(curBubble != undefined && curBubble.skin === colorStr){
                    var isHave = false;
                    for(var j = 0; j<samelist.length; j++){
                        if(curBubble == samelist[j]){
                            isHave = true;
                        }
                    }
                    if(!isHave){
                        // console.debug("----------sameBubble row="+curBubble.m_nRowIndex+",col="+curBubble.m_nColIndex);
                        samelist.push(curBubble);
                    }
                }
                
            }

            sameIndex++;
        }while(sameIndex != samelist.length)
        // console.debug("----------sameBubbleCount ="+samelist.length);
        //大于消除个数 删除泡泡队列
        if(samelist.length >= REMOVE_COUNT){
            this.clearBubble(samelist);
            this.AddScoreShow(BubbleTypes.Normal,samelist.length * singleBubbleScore);
        }else{
            //移动周围泡泡
            this.roundNearBubble();
        }
        //清除球之后，掉落处于悬挂状态的球
        this.checkFallBubble();
    }

    /**
     * 周围泡泡位移
     */
    _proto.moveOtherBubble = function(_otherBubble,_curBubble){
        var otherPoint = new Point(_otherBubble.x,_otherBubble.y);
        var curPoint = new Point(_curBubble.x,_curBubble.y);
        //获得两个坐标差值
        var subPoint = PointSub(otherPoint,curPoint);
        // console.debug("-------------onMouseUp---subPoint="+this.subPoint);
        //获得坐标向量
        subPoint.normalize();
        var tempPoint = new Point(_otherBubble.x,_otherBubble.y);
        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("go",0).to(_otherBubble,
        {
            x:_otherBubble.x + subPoint.x * MoveOtherBubbleDistance,
            y:_otherBubble.y + subPoint.y * MoveOtherBubbleDistance
        },100).addLabel("back",0).to(_otherBubble,
        {
            x:tempPoint.x,
            y:tempPoint.y
        },100);
        this.moveOtherBubbleFinish = false;
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,this.onTimeLineComplete);
        //停到球声音
        MusicManager.getInstance().playSound("res/music/7.wav");
    }
    /**
     * 时间动画播放完成
     */
    _proto.onTimeLineComplete = function(){
        if(!this.moveOtherBubbleFinish){
            //查找相同的球
            // this.findSameBubble(this.m_curReady);
            this.moveOtherBubbleFinish = true;
            //检查泡泡位置
            this.checkBubblesPos();
        }
    }
    /**
     * 获得周围临近需要移动的泡泡
     */
    _proto.roundNearBubble = function(){
        var itCur = this.m_curReady;
        var vecRowCol = new Array();
        // var curRow = Number()
        GetAround(itCur.m_nRowIndex, itCur.m_nColIndex, vecRowCol);
        var roundBubbleCount = 0;
        for(var i=0; i<vecRowCol.length; i++){
            if(this.m_board[Number(vecRowCol[i].x)] === undefined){
                this.m_board[Number(vecRowCol[i].x)]  = new Array();
            }
            var curBubble = this.m_board[ vecRowCol[i].x ][ vecRowCol[i].y ];
            if(curBubble != undefined){
                //碰撞弹跳
                this.moveOtherBubble(curBubble,this.m_curReady);
                roundBubbleCount++;
            }
        }
        if(roundBubbleCount === 0){
            this.m_curReady.isStop = true;

        }
    }
    /**
     * 消除bubbleList里所有的球
     */
    _proto.clearBubble = function(bubbleList){
        for(var i=0; i<bubbleList.length; i++){
            this.m_board[bubbleList[i].m_nRowIndex][bubbleList[i].m_nColIndex] = undefined;
            for(var j=0; j<this.m_listBubble.length; j++){
                if(this.m_listBubble[j] === bubbleList[i]){
                    this.m_listBubble.splice(j,1);
                }
            }
            // console.debug("---later m_listBubble length ="+this.m_listBubble.length);
            // bubbleList[i].destroy();
            this.playBomb(bubbleList[i]);
            MusicManager.getInstance().playSound("res/music/8.wav");
        }
    }
    
    
    /**
     * 检查可以掉落的球
     */
    _proto.checkFallBubble = function(){
        var LinkBubbleList = new Array();	//所有连接在一起的球
        
        var colNum = MAX_COLS;
        if(this.gameTopRow % 2 != 0){
            colNum = MAX_COLS - 1;
        }
        var topColNum =0;
        for (var i = 0; i < colNum; i++)
        {
            if (this.m_board[this.gameTopRow][i] != undefined)
            {
                LinkBubbleList.push(new Point(this.gameTopRow, i));
                topColNum++;
            }
        }
        //顶部如果被消除 增加新的一行
        if(topColNum < colNum){
            // Gamelog("------顶部被消除 topColNum="+topColNum);
            this.createMapBuble(this.gameTopRow - 1,1);
            this.movePanelByRow(this.gameTopRow,true);
            //调整泡泡面板到正确位置
            // var cowHeight = (BUBBLE_RADIUS * 2) * Math.sin ( Math.PI/3 );
            // var panelY = -( cowHeight * (this.gameTopRow )) - BUBBLE_RADIUS;
            // Laya.Tween.to(bubblePanel,
            // {
            //     y:panelY
            // },200);
            // bubblePanel.pos(0,-( cowHeight * (this.gameTopRow )) - BUBBLE_RADIUS);
        }
        var linkIndex = 0;
        if (LinkBubbleList.length > 0)
        {
            do
            {
                var itCur = LinkBubbleList[linkIndex];
                var vecRowCol = new Array();
                GetAround(itCur.x, itCur.y, vecRowCol);
                for(var j = 0; j<vecRowCol.length; j++){
                    if(this.m_board[Number(vecRowCol[j].x)] === undefined){
                        this.m_board[Number(vecRowCol[j].x)]  = new Array();
                    }
                    var curBubble = this.m_board[ vecRowCol[j].x ][ vecRowCol[j].y ];
                    if(curBubble != undefined){
                        var isHave =false;
                        for(var z =0; z<LinkBubbleList.length; z++){
                            if(vecRowCol[j].x == LinkBubbleList[z].x && vecRowCol[j].y == LinkBubbleList[z].y){
                                isHave = true;
                            }
                        }
                        if(!isHave){
                            LinkBubbleList.push(vecRowCol[j]);
                        }
                    }
                }

                linkIndex++;
            }while(linkIndex != LinkBubbleList.length)
        }
        // console.debug("--------link count = "+LinkBubbleList.length);
        var NoLinkBubblelist = new Array();	//找出剩下的所有没有连接的球，就是要下落的球
        var noLinkBubbleDataList =new Array();

        for (var x = this.gameTopRow;  x< this.m_board.length; x++)
        {
            for (var y = 0; y < MAX_COLS - x % 2; y++)
            {
                if (this.m_board[x][y] != undefined)
                {
                    var isLink = false;
                    for(var w =0; w<LinkBubbleList.length; w++){
                        if(x==LinkBubbleList[w].x && y==LinkBubbleList[w].y){
                            isLink = true;
                        }
                    }
                    if (!isLink)
                    {
                        NoLinkBubblelist.push(this.m_board[x][y]);
                        noLinkBubbleDataList.push(this.m_board[x][y].playerData);
                    }
                }
            }
        }
        // console.debug("--------NO link count = "+NoLinkBubblelist.length);
        if(GameMatterModle){
            _proto.matterScene.addBodyBubble(NoLinkBubblelist,noLinkBubbleDataList);
            this.fallBubble(NoLinkBubblelist);
        }else{
            this.clearBubble(NoLinkBubblelist);
            this.AddScoreShow(BubbleTypes.Normal,NoLinkBubblelist.length * singleBubbleScore);
        }
        //检查完可以掉落的球 才可以继续弹球
        this.m_curReady.isStop = true;
        //移动面板
        // this.moveBubblePanel();
    }
    /**
     * 可以掉落的球
     */
    _proto.fallBubble = function(bubbleList){
        for(var i=0; i<bubbleList.length; i++){
            this.m_board[bubbleList[i].m_nRowIndex][bubbleList[i].m_nColIndex] = undefined;
            for(var j=0; j<this.m_listBubble.length; j++){
                if(this.m_listBubble[j] === bubbleList[i]){
                    this.m_listBubble[j].destroy();
                    this.m_listBubble.splice(j,1);
                }
            }
        }
        // if(bubbleList.length >0){
        //     // Browser.window.Matter.Engine.stop();
        //     _proto.matterScene.setEngineTimeScale(0);
        // }
    }
    /**
     * 掉落动画
     */
    _proto.downBubbleAction = function(_bubble){
        var offY = 200;
        var args = [_bubble];
        Laya.Tween.to(_bubble,
        {
            y:(_bubble.y + offY)
        },
        _bubble.y+500,
        Laya.Ease.expoIn,
        // Laya.Handler.create(this,this.destroyBubble,args)
        Laya.Handler.create(this,this.playBomb,args)
        );
    }
    /**
     * 爆炸动画
     */
    _proto.playBomb = function(args){
        var anim = new Laya.Animation();
        // var b_point  = new Point(args.x,args.y);
        var b_point  = new Point(args.width/2,args.height/2);
        b_point = args.localToGlobal(b_point);
        // b_point = args.toParentPoint(b_point);
        // this.bombScoreAnim(b_point);
        BubbleScoreAnim(b_point,singleBubbleScore);

        Laya.stage.addChild(anim);
        anim.pos(b_point.x -  70,b_point.y-70);
        anim.play(0,false,"bomb");
        //删除泡泡
        var _bubble = args;
        if(_bubble != null){
            _bubble.destroy();
        }

        //获取动画大小区域
        var bound = anim.getBounds();
        var _args = [anim];
        // anim.pos( -bound.width/2 , -bound.height/2);
        anim.once(Laya.Event.COMPLETE,this,this.destroyBubble,_args);
    }
    /**
     * 删除泡泡
     */
    _proto.destroyBubble = function(args){
        var _bubble = args;
        if(_bubble != null){
            _bubble.destroy();
        }
    }
    /** 分数文字*/
    _proto.bombScoreAnim = function(_point){
        var scoreLabel = new Laya.Label(singleBubbleScore);
        scoreLabel.font ="SimHei";
        scoreLabel.fontSize = 40;
        scoreLabel.align = "center";
        scoreLabel.anchorX = 0.5;
        scoreLabel.anchorY = 0.5;
        scoreLabel.pos(_point.x,_point.y);
        Laya.stage.addChild(scoreLabel);
        scoreLabel.alpha = 0;
        scoreLabel.scaleX = 0;
        scoreLabel.scaleY = 0;

        var timeLine = new Laya.TimeLine();
        timeLine.addLabel("show",0).to(scoreLabel,
        {
            alpha:1,
            scaleX:1,
            scaleY:1,
        },200).addLabel("go",0).to(scoreLabel,
        {
            y:_point.y - 40,
            alpha:0,
        },400);
        this.moveOtherBubbleFinish = false;
        timeLine.play(0,false);
        timeLine.on(Laya.Event.COMPLETE,this,function(arg){
            arg.destroy();
        },[scoreLabel]);
    }

    /**生成几行随机的球 */
    _proto.createMapBuble = function(_beginLine,_Linenum){
        var mapBeginLine = 0;
        var createBoardNumList = [];
        for(var z=0; z < _Linenum; z++){
            mapBeginLine = _beginLine - z;
            if(mapBeginLine <= 0){
                mapBeginLine = 0;
            }
            var colNum = MAX_COLS;
            if(mapBeginLine % 2 != 0){
                colNum = MAX_COLS - 1;
            }
            createBoardNumList.push({
                Line:mapBeginLine,
                Col:colNum
            });

            for(var i=0; i<colNum; i++){
                if(this.m_board[Number(mapBeginLine)] === undefined){
                    this.m_board[Number(mapBeginLine)]  = new Array();
                }
                if(this.m_board[Number(mapBeginLine)][Number(i)] === undefined){
                    var pos = getPosByRowAndCol(mapBeginLine,i);
                    var loclPos = bubblePanel.globalToLocal(pos,true);
                    // Gamelog("--create pos x="+pos.x+",y="+pos.y);
                    // Gamelog("--create pos x="+loclPos.x+",y="+loclPos.y);
                    var tempBubble = new Bubble();

                    tempBubble.setRowColIndex(mapBeginLine,i);
                    tempBubble.skin = this.randomBubble();
                    tempBubble.anchorX  = 0.5;
                    tempBubble.anchorY  = 0.5;
                    bubblePanel.addChild(tempBubble);
                    bubblePanel.bubbleType = BubbleTypes.Normal;
                    tempBubble.pos(pos.x,pos.y);

                    this.m_board[Number(mapBeginLine)][Number(i)] = tempBubble;
                    this.m_listBubble.push(tempBubble);
                    
                }
            }
        }
       // this.createPlayerBubble(createBoardNumList);
        //----------屏蔽生成金蛋
        // this.createEggBubble(createBoardNumList);
        //生成的最后一行作为顶部
        this.gameTopRow = mapBeginLine;
        //生成一行重置发射个数
        // this.shootNum = 0;

    }
    /**生成玩家头像球 */
    _proto.createPlayerBubble = function(createBoardNumList){
        Gamelog("----playerDataList length="+GameModule.getInstance().playerDataList.length+",m_playerBubbleList ="+this.m_playerBubbleList.length);
        if(this.m_playerBubbleList.length < GameModule.getInstance().playerDataList.length - 1){
            //获得没有头像的
            var newPlayerDataList = [];
            for(var i=0; i<GameModule.getInstance().playerDataList.length;i++){
                var data = GameModule.getInstance().playerDataList[i];
                var isHave = false;
                for(var j=0; j<this.m_playerBubbleList.length; j++){
                    if(data.playerId == this.m_playerBubbleList[j].playerId)
                        isHave = true;
                }
                if(!isHave && data.hp > 0 && data.playerId != UserModule.getInstance().playerId){
                    newPlayerDataList.push(data);
                }
            }

            if(newPlayerDataList.length >0){
                var crateIndex = 0;
                var createPlayerBorder = [];
                do{
                    var randomNum = (createBoardNumList.length > 3) ? 3: createBoardNumList.length;
                    var addNum = ((createBoardNumList.length - 3)>0) ? (createBoardNumList.length - 3) :0;
                    var numIndex = parseInt(Math.random()*randomNum + addNum, 10);;
                    var numY = parseInt(Math.random()* createBoardNumList[numIndex].Col,10);
                    var isSame = false;
                    for(var x=0;x<createPlayerBorder.length;x++){
                        if(numY == createPlayerBorder[x].Col &&
                        createBoardNumList[numIndex].Line == createPlayerBorder[x].Line){
                            isSame = true;
                        }
                    }
                    //如果没有重复
                    if(!isSame){
                        createPlayerBorder.push({
                            Line: createBoardNumList[numIndex].Line,
                            Col: numY
                        });

                        Gamelog("-------create player line="+createBoardNumList[numIndex].Line+",col="+numY);
                        var oldBubble = this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)];
                        for(var y=0; y<this.m_listBubble.length; y++){
                            if(this.m_listBubble[y] === oldBubble){
                                this.m_listBubble.splice(y,1);
                            }
                        }
                        oldBubble.destroy();

                        var pos = getPosByRowAndCol(createBoardNumList[numIndex].Line,numY);
                        var tempBubble = new Bubble();
                        tempBubble.setRowColIndex(createBoardNumList[numIndex].Line,numY);
                        // tempBubble.skin = newPlayerDataList[crateIndex].icon;
                        tempBubble.anchorX  = 0.5;
                        tempBubble.anchorY  = 0.5;
                        tempBubble.width = BUBBLE_RADIUS*2;
                        tempBubble.height = BUBBLE_RADIUS*2;
                        tempBubble.playerData = newPlayerDataList[crateIndex];
                        tempBubble.bubbleType = BubbleTypes.Player;
                        //添加一个新图片
                        var imgBg = new Laya.Image(newPlayerDataList[crateIndex].icon);
                        imgBg.width = tempBubble.width;
                        imgBg.height = tempBubble.height;
                        //遮罩
                        var maskImg = new Laya.Image("game/img_qiu_1.png");
                        // maskImg.anchorX  = 0.5;
                        // maskImg.anchorY  = 0.5;
                        // tempBubble.mask = maskImg;
                        imgBg.mask = maskImg;
                        
                        tempBubble.addChild(imgBg);
                        //泡泡透明层
                        var popImg = new Laya.Image("game/img_qiu_zhezhao.png");
                        tempBubble.addChild(popImg);

                        bubblePanel.addChild(tempBubble);
                        tempBubble.pos(pos.x,pos.y);

                        this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)] = tempBubble;
                        this.m_listBubble.push(tempBubble);
                        //增加已创建的头像泡泡
                        this.m_playerBubbleList.push(newPlayerDataList[crateIndex]);
                        crateIndex++;
                    }
                

                }while(createPlayerBorder.length != newPlayerDataList.length)
            }
        }
    }
    /**生成金蛋球 */
    _proto.createEggBubble = function(createBoardNumList){
        if(this.m_propBubleList.length < GameModule.getInstance().eggNum){

            var numIndex = createBoardNumList.length -1;
            // var numIndex = 0;
            var numY = parseInt(Math.random()* createBoardNumList[numIndex].Col,10);
            var oldBubble = this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)];

            do{
                numY = parseInt(Math.random()* createBoardNumList[numIndex].Col,10);
                oldBubble = this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)];

            }while(oldBubble.bubbleType != BubbleTypes.Normal);

            Gamelog("---------egg line="+createBoardNumList[numIndex].Line+",col="+numY);
            var oldBubble = this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)];
            for(var y=0; y<this.m_listBubble.length; y++){
                if(this.m_listBubble[y] === oldBubble){
                    this.m_listBubble.splice(y,1);
                }
            }
            oldBubble.destroy();

            var pos = getPosByRowAndCol(createBoardNumList[numIndex].Line,numY);
            var tempBubble = new Bubble();
            tempBubble.setRowColIndex(createBoardNumList[numIndex].Line,numY);
            tempBubble.skin = "game/jindan_1.png";
            tempBubble.anchorX  = 0.5;
            tempBubble.anchorY  = 0.5;
            tempBubble.width = BUBBLE_RADIUS*2;
            tempBubble.height = BUBBLE_RADIUS*2;
            tempBubble.bubbleType = BubbleTypes.Egg;
            //金蛋动画
            var eggAnim = new Laya.Animation();
            eggAnim.interval = 100;
            tempBubble.addChild(eggAnim);
            eggAnim.play(0,true,"jindan");

            tempBubble.pos(pos.x,pos.y);
            bubblePanel.addChild(tempBubble);
            
            this.m_board[Number(createBoardNumList[numIndex].Line)][Number(numY)] = tempBubble;
            this.m_listBubble.push(tempBubble);
            this.m_propBubleList.push(tempBubble);
        }
    }

    /**删除人像泡泡 */
    _proto.removePlayerBubble = function(_playerData){
        for(var i=0; i<this.m_playerBubbleList.length; i++){
            var bubbleData = this.m_playerBubbleList[i];
            if(bubbleData.playerId == _playerData.playerId){
                Gamelog("-------删除人像泡泡="+bubbleData.name);
                this.m_playerBubbleList.splice(i,1);
            }
        }
        
    }

    /**移动面板动画 */
    _proto.movePanelByRow = function(_moveRow,_isTween){
        //调整泡泡面板到正确位置
        var cowHeight = (BUBBLE_RADIUS * 2) * Math.sin ( Math.PI/3 );
        var panelY = this.panelOldY -( cowHeight * _moveRow) - BUBBLE_RADIUS;
        if(_isTween){
            Laya.Tween.to(bubblePanel,
            {
                y:panelY
            },200,null,new Laya.Handler(this,function(){
                //检查泡泡位置
                this.checkBubblesPos();
            }));
        }else{
            // bubblePanel.pos(500,panelY);
            bubblePanel.y = panelY;
        }

    }

    /**检查泡泡最底部位置 */
    _proto.checkBubblesPos = function(){
         var viewPos = this.gameUI.localToGlobal(new Point(0,0));
        // var bottomY = GameConfig.GameHeight -GameConfig.GameHeight / 3;
        var bottomPosY = 0;
        var cowHeight = (BUBBLE_RADIUS * 2) * Math.sin ( Math.PI/3 );
        var bottomY = 13*cowHeight + viewPos.y;;
        for(var i=0; i<this.m_listBubble.length; i++){
            var tempBubble = this.m_listBubble[i];
            if(tempBubble != null){
                var b_point  = new Point(tempBubble.width/2,tempBubble.height/2);
                b_point = tempBubble.localToGlobal(b_point);
                if(b_point.y > bottomPosY)
                    bottomPosY = b_point.y;
                if(b_point.y > bottomY){
                    this.gameOver();
                    var hurtHp = 0;
                    // for(var x=0; x<GameModule.getInstance().playerDataList.length; x++){
                    //     var playerData = GameModule.getInstance().playerDataList[x];
                    //     if(playerData.playerId == UserModule.getInstance().playerId){
                    //         hurtHp = playerData.hp;
                    //     }
                    // }
                    // this.gameUI.playerHurtHp(UserModule.getInstance().playerId,hurtHp);
                    //发送自杀
                    //GameModule.getInstance().sendHurtPlayer(3,"");
                    // this.gameUI.gameoverByTime();
                    this.gameUI.gameoverByBottom();
                    break;
                }

            }
        }
        // Gamelog("-----------bottom posy="+bottomPosY+",bottomY ="+bottomY);
        
    }
    /**改变发射球 */
    _proto.changeBubble = function(){
        // Gamelog("-------------changeBubble=");
        var skinTemp = this.shootBubble.skin;
        this.shootBubble.skin=this.prepareBubble.skin;
        this.prepareBubble.skin = skinTemp;
        //MusicManager.getInstance().playSound("res/music/5.wav");
    }

    /**显示增加的分数 */
    _proto.AddScoreShow = function(_basketId,_addScore,_playerData){
        this.scoreNum += _addScore;
        this.gameUI.label_score.text = this.scoreNum;
        //发送同步分数
        // GameModule.getInstance().sendScore(_addScore);
        // if(_basketId == BubbleTypes.Egg){
        //     //发送获得金蛋
        //     GameModule.getInstance().sendGetEgg(1);
        // }
    }
    /**游戏倒计时 显示 */
    _proto.animateTimeBased = function()
    {
        this.currentTime -= 1;
        var timeLabel = this.gameUI.label_time;
        timeLabel.text = this.currentTime; 

        if(this.currentTime<=0){
                Laya.timer.clear(this,this.animateTimeBased);
                this.gameOver();
                if(!this.isShowShared){
                    UIManager.getInstance().showUI("GameSharedUI");
                }else{
                    this.gameUI.gameoverByTime();
                }
        }
    }
    //接收服务器游戏结束
    _proto.gameOverReceiver = function(notify){
        Laya.timer.clear(this,this.animateTimeBased);
        this.gameOver();
        this.gameUI.gameoverByTime();
    }
    /**游戏结束 */
    _proto.gameOver = function(){
        // Gamelog("----!!!!!!!!!游戏结束-------");
        // GameModule.getInstance().sendGameScore(this.scoreNum);
        Laya.timer.clear(this,this.animateTimeBased);
        Laya.timer.clear(this,this.onUpdate);
        if(GameMatterModle){
            _proto.matterScene.removeAllBasketBall();
        }
        // _proto.matterScene.setEngineTimeScale(0);
        if(this.m_curReady != undefined){
            for(var j=0; j<this.m_listBubble.length; j++){
                if(this.m_listBubble[j] === this.m_curReady){
                    this.m_listBubble.splice(j,1);
                }
            }
           this.m_curReady.destroy();
        }
        //舞台监听鼠标
        // Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        this.gameUI.img_bg.off(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        MusicManager.getInstance().playSound("res/music/12.ogg");
    }
    /**重新开始游戏 */
    _proto.restartGame = function(){
        // this.gameUI.gameoverPanel.visible = false;
        // this.Init();
        bubblePanel.destroyChildren();
        this.m_board = [];
        this.m_listBubble = [];
        this.m_mapBubbleList = [];
        this.m_playerBubbleList = [];
        this.m_propBubleList = [];
        this.moveOtherBubbleFinish = false;
        this.shootBubbleMoveFinish = true;
        this.shootNum = 0;
        this.scoreNum = 0;
        this.currentTime = GameTime;
        this.gameUI.label_time.text = GameTime;
        this.gameUI.label_score.text = 0;
        //this.gameUI.bossProgress.value = 0;
        this.shootBubble.visible = true;
        this.isShowShared = false;

        this.prepareBubble.skin = this.randomBubble();
        this.shootBubble.skin = this.randomBubble();
        this.createMapBuble(BeginRowNum,BeginCreateNum);
        // 调整泡泡面板到正确位置
        this.movePanelByRow(BeginRowNum - (BeginCreateNum -1),false);
        if(this.m_curReady != undefined){
            this.m_curReady.isStop = true;
        }
            
        Laya.timer.clear(this,this.animateTimeBased);
        this.gameUI.startGameUI();

        //显示最上层的桶
        // this.gameUI.imgTong.visible = true;
        // this.gameUI.anim_panda.play(0,true,"pandaDaiji");
        // // Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        // this.gameUI.img_bg.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
        // Laya.timer.loop(1000, this, this.animateTimeBased);

    }
    /**分享游戏 */
    _proto.sharedRestartGame = function(){
        this.currentTime = GameTime;
        this.gameUI.label_time.text = GameTime;
        this.shootBubble.visible = true;
        this.prepareBubble.skin = this.randomBubble();
        this.shootBubble.skin = this.randomBubble();
        if(this.m_curReady != undefined){
            this.m_curReady.isStop = true;
        }
        this.isShowShared = true;
        this.startGame();
    }

    //生成道具球
    _proto.createPropBubble = function(){
        
        var num = Math.random()*3 + 1;
        num = parseInt(num, 10);
        switch(num){
            case 1:
                this.prepareBubble.skin = "game/img_qiu_fireworks.png";
                break;
            case 2:
                this.prepareBubble.skin = "game/img_qiu_car.png";
                break;
            case 3:
                this.prepareBubble.skin = "game/img_qiu_rainbow.png";
                break;
        }
    }
    //道具球查看
    _proto.findPropBubble = function(){
        var skinType = this.m_curReady.skin;
        var isProp = true;
        switch (skinType) {
            case "game/img_qiu_fireworks.png":
                this.showFireworksEffect();
                break;
            case "game/img_qiu_car.png":
                this.showCleanRowEffect();
                break;
            case "game/img_qiu_rainbow.png":
                this.showRainbowEffect();
                break;
        
            default:
                isProp = false;
                break;
        }
        return isProp;
    }

    //礼花球效果
    _proto.showFireworksEffect = function(){
        //清除礼花球范围内的球
        var vecRowCol = new Array();
        GetAround(this.m_curReady.m_nRowIndex, this.m_curReady.m_nColIndex, vecRowCol);
        var cleanList = new Array();
        for(var i=0; i<vecRowCol.length; i++){
                if(this.m_board[Number(vecRowCol[i].x)] === undefined){
                    this.m_board[Number(vecRowCol[i].x)]  = new Array();
                }
                var curBubble = this.m_board[ vecRowCol[i].x ][ vecRowCol[i].y ];
                if(curBubble != undefined && curBubble.bubbleType == BubbleTypes.Normal){
                    cleanList.push(curBubble);
                }
        }
        //礼花弹效果 
        cleanList.push(this.m_curReady);

        var lihuaUI = new PPldaji_LhUI();
        lihuaUI.zOrder = 1;
        lihuaUI.anchorX = 0.5;
        lihuaUI.anchorY = 0.5;
        var b_point  = new Point(this.m_curReady.width/2,this.m_curReady.height/2);
        b_point = this.m_curReady.localToGlobal(b_point);
        lihuaUI.pos(b_point.x,b_point.y);
        Laya.stage.addChild(lihuaUI);
        lihuaUI.Lh_guangxiao.play(0,false);
        lihuaUI.Lh_guangxiao.on(Laya.Event.COMPLETE,this,function(_node){
            _node.destroy();
        },[lihuaUI]);
        MusicManager.getInstance().playSound("res/music/21.wav");

        if(cleanList.length >0){
            this.clearBubble(cleanList);
            this.AddScoreShow(BubbleTypes.Normal,cleanList.length * singleBubbleScore);

            //清除球之后，掉落处于悬挂状态的球
            this.checkFallBubble();
        }
    }

    //横排消除效果
    _proto.showCleanRowEffect = function(){
        if(this.m_board[this.m_curReady.m_nRowIndex] === undefined){
            this.m_board[this.m_curReady.m_nRowIndex]  = new Array();
        }
        rowBubbleList = new Array();
        for (var i = 0; i < MAX_COLS; i++) {
            var curBubble = this.m_board[this.m_curReady.m_nRowIndex][i];
            if(curBubble != undefined && curBubble.bubbleType == BubbleTypes.Normal)
                rowBubbleList.push(curBubble);
        }
        //小车效果
        var effectUI = new Prop_CarUI();
        effectUI.zOrder = 1;
        effectUI.anchorX = 0.5;
        effectUI.anchorY = 0.5;
        var b_point  = new Point(this.m_curReady.width/2,this.m_curReady.height/2);
        b_point = this.m_curReady.localToGlobal(b_point);
        effectUI.pos(b_point.x,b_point.y);
        Laya.stage.addChild(effectUI);
        Tween.to(effectUI,{
            x:Laya.stage.width+350,
        },1000,null,new Handler(this,function(_args){
            _args.destroy();
        },[effectUI]));

        //反向小车
        var effectUI2 = new Prop_CarUI();
        effectUI2.zOrder = 1;
        effectUI2.anchorX = 0.5;
        effectUI2.anchorY = 0.5;
        effectUI2.scaleX = -1;
        var b_point  = new Point(this.m_curReady.width/2,this.m_curReady.height/2);
        b_point = this.m_curReady.localToGlobal(b_point);
        effectUI2.pos(b_point.x,b_point.y);
        Laya.stage.addChild(effectUI2);
        Tween.to(effectUI2,{
            x: -350,
        },1000,null,new Handler(this,function(_args){
            _args.destroy();
        },[effectUI2]));
        MusicManager.getInstance().playSound("res/music/19.wav");

        if(rowBubbleList.length >0){
            this.clearBubble(rowBubbleList);
            this.AddScoreShow(BubbleTypes.Normal,rowBubbleList.length * singleBubbleScore);

            //清除球之后，掉落处于悬挂状态的球
            this.checkFallBubble();
        }

    }

    //彩虹消除效果
    _proto.showRainbowEffect =function(){
        var vecRowCol = new Array();
        GetAround(this.m_curReady.m_nRowIndex, this.m_curReady.m_nColIndex, vecRowCol);
        var roundBubbleList = new Array();
        for(var i=0; i<vecRowCol.length; i++){
                if(this.m_board[Number(vecRowCol[i].x)] === undefined){
                    this.m_board[Number(vecRowCol[i].x)]  = new Array();
                }
                var curBubble = this.m_board[ vecRowCol[i].x ][ vecRowCol[i].y ];
                if(curBubble != undefined && curBubble.bubbleType == BubbleTypes.Normal){
                    roundBubbleList.push(curBubble);
                }
        }
        
        var roundSameList = new Array();
        //彩虹球自己
        roundSameList.push(this.m_curReady);

        var effectUI = new PPldaji_ChUI();
        effectUI.zOrder = 1;
        effectUI.anchorX = 0.5;
        effectUI.anchorY = 0.5;
        var b_point  = new Point(this.m_curReady.width/2,this.m_curReady.height/2);
        b_point = this.m_curReady.localToGlobal(b_point);
        effectUI.pos(b_point.x,b_point.y);
        Laya.stage.addChild(effectUI);
        effectUI.Ch_guangxiao.play(0,false);
        effectUI.Ch_guangxiao.on(Laya.Event.COMPLETE,this,function(_node){
            _node.destroy();
        },[effectUI]);
        MusicManager.getInstance().playSound("res/music/20.wav");

        //周围一圈相同的球
        for (var z1 = 0; z1 < roundBubbleList.length; z1++) {
            var tempBubble = roundBubbleList[z1];
            var sameNum = 1;
            for (var z3 = 0; z3 < roundBubbleList.length; z3++) {
                var tempSameBubble = roundBubbleList[z3];
                if(tempBubble != tempSameBubble && tempBubble.skin == tempSameBubble.skin){
                    sameNum ++;
                }
            }
            if(sameNum >= 2){
                var isHava4 = false;
                for (var z4 = 0; z4 < roundSameList.length; z4++) {
                    var temp4 = roundSameList[z4];
                    if(temp4 == tempBubble)
                        isHava4 = true;
                }
                if(!isHava4){
                    roundSameList.push(tempBubble);
                }
            }

            
        }

        //周围一圈相连的球
        for (var j = 0; j < roundBubbleList.length; j++) {
            var element = roundBubbleList[j];
            var sameList = this.findSameBubbleList(element);
            //大于两个相同就可以消除
            if(sameList.length >= 2){
                for (var x = 0; x < sameList.length; x++) {
                    var sameBubble = sameList[x];
                    var isHave = false;
                    for (var y = 0; y < roundSameList.length; y++) {
                        var roundElement = roundSameList[y];
                        if(roundElement == sameBubble){
                            isHave = true;
                        }
                    }
                    if(!isHave){
                        roundSameList.push(sameBubble);
                    }
                }
            }
            
        }

        this.clearBubble(roundSameList);
        this.AddScoreShow(BubbleTypes.Normal,roundSameList.length * singleBubbleScore);

        //清除球之后，掉落处于悬挂状态的球
        this.checkFallBubble();
    }

    //遍历周围相同的球
    _proto.findSameBubbleList = function(_bubble){
        var samelist = new Array();
        samelist.push(_bubble);

        var sameIndex = 0;
        do{

            var itCur = samelist[sameIndex];

            var vecRowCol = new Array();
            GetAround(itCur.m_nRowIndex, itCur.m_nColIndex, vecRowCol);
            var colorStr = itCur.skin;

            for(var i=0; i<vecRowCol.length; i++){
                if(this.m_board[Number(vecRowCol[i].x)] === undefined){
                    this.m_board[Number(vecRowCol[i].x)]  = new Array();
                }
                var curBubble = this.m_board[ vecRowCol[i].x ][ vecRowCol[i].y ];
                if(curBubble != undefined && curBubble.skin === colorStr){
                    var isHave = false;
                    for(var j = 0; j<samelist.length; j++){
                        if(curBubble == samelist[j]){
                            isHave = true;
                        }
                    }
                    if(!isHave){
                        // console.debug("----------sameBubble row="+curBubble.m_nRowIndex+",col="+curBubble.m_nColIndex);
                        samelist.push(curBubble);
                    }
                }
                
            }

            sameIndex++;
        }while(sameIndex != samelist.length)

        return samelist;
    }

    return GameScene;
})();