 /**
 * 游戏场景
 */
var GameScene = (function(_super){

    function GameScene(){
        // GameScene.super(this);
        this.Init();
    }
    Laya.class(GameScene,"GameScene",_super);
    _proto = GameScene.prototype;
    //常量
    var RANDOMEMINEMIN = 4;                                                //随机产生雷的最小值
    var RANDOMMINEMAX = 11;                                                 //随机尝试雷的最大值+最小值

    //初始化当前类属性
       
    _proto.gameUI = null;                                                    //ui对象
    _proto.m_listSquare = new Array();                                       //所有的方块
    _proto.m_board = new Array();                                            //所有面板的位置
    _proto.panel_diban = null;                                               //方块所在面板
    _proto.m_listMine = new Array();                                         //地雷所在位置
    _proto.mineNum = 0;                                                      //地雷个数
    _proto.startTime = 0;                                                    //游戏开始时间
    _proto.gameTime = 0;                                                     //游戏时间
    _proto.leftGameTime = 0;                                                 //上一次保存的游戏时间
    _proto.isGameover = false;                                               //游戏是否结束
    

    //初始化场景
    _proto.Init = function(){
        if(this.gameUI == undefined){
            this.gameUI = UIManager.getInstance().showUI("GameUI");
            this.panel_diban = this.gameUI.panel_diban;
        }
        this.m_listSquare = [];
        this.m_board = [];
        this.m_listMine = [];
        this.isGameover = false;

        this.mineNum = parseInt(Math.random()*RANDOMEMINEMIN + RANDOMMINEMAX,10);
        // this.mineNum = 16;
        Gamelog("------minenum ="+this.mineNum);
        // this.mineNum = 8;

        // this.startGame();
        
        MessageController.getInstance().AddNotification("square_dead",this,this._squareDeadEvent);
    }

    /**开始游戏 */
    _proto.startGame = function(){

        this.mineNum = parseInt(Math.random()*RANDOMEMINEMIN + RANDOMMINEMAX,10);
        
        this.initMapPanel();
        // Laya.timer.once(200,this,this.createSquareMap);
        this.createSquareMap();

        this.startTime = new Date().getTime();
        Laya.timer.loop(1000,this,this.updateGameTime);
    }
    /**重置游戏 */
    _proto.resetGame = function(){

        // var sp = new Laya.Sprite();
        this.isGameover = false;
        for (var i = 0; i < this.m_listSquare.length; i++) {
            var t_square = this.m_listSquare[i];
            t_square.onDestroy();
            t_square.destroy();
        }
        this.panel_diban.destroyChildren();
        this.m_listSquare = [];
        this.m_board = [];
        this.m_listMine = [];

        this.gameTime = 0;
        this.leftGameTime = 0;
        this.gameUI.label_time.text = "00:00";
    }

    /**游戏结束 */
    _proto.gameOver = function(){
        this.isGameover = true;

        for (var i = 0; i < this.m_listSquare.length; i++) {
            var t_square = this.m_listSquare[i];
            t_square.off(Laya.Event.MOUSE_DOWN,this,this.onSquareMouseDown);
            t_square.off(Laya.Event.MOUSE_UP,this,this.onSquareMouseUp);
        }
        Laya.timer.clear(this,this.updateGameTime);
    }

    /**接受到踩雷事件 */
    _proto._squareDeadEvent = function(){
        UIManager.getInstance().showUI("GameoverUI").initGameover(false);
    }
    /**踩到地雷 */
    _proto.mineGameover = function(){
        Gamelog("-----踩雷结束");
        this.gameOver();
        // Laya.timer.once(1000,this,function(){
        //     UIManager.getInstance().showUI("GameoverUI");

        // });
    }

    /**扫雷完成 游戏胜利 */
    _proto.gameWin = function(){
        this.gameOver();
        Laya.timer.once(1000,this,function(){
            UIManager.getInstance().showUI("GameoverUI").initGameover(true);
        });
    }

    /**更新游戏时间 */
    _proto.updateGameTime = function(){
        this.gameTime = this.leftGameTime + Math.floor((new Date().getTime() - this.startTime) / 1000);
        this.gameUI.label_time.text = GetTimeFormat(this.gameTime);

    }

    /**暂停游戏 */
    _proto.pauseGame = function(){
        Laya.timer.clear(this,this.updateGameTime);
        this.leftGameTime = this.gameTime;
    }

    /**重回游戏 */
    _proto.resuemGame =function(){
        Laya.timer.loop(1000,this,this.updateGameTime);
        this.startTime = new Date().getTime();
    }
    /**初始化地图面板 */
    _proto.initMapPanel = function(){
        for (var x = 0; x < MAX_ROWS; x++) {
            if(this.m_board[x] == undefined){
                this.m_board[x] = new Array();
            }
            for (var y = 0; y < MAX_COLS; y++) {
                if(this.m_board[x][y] == undefined){
                    //初始化为未点击
                    this.m_board[x][y] = SquareTypes.NoClick;
                }
            }
        }

        var createMineNum = 0;
        do
        {
            var minePos = new Array();
            minePos.x = parseInt(Math.random()*MAX_ROWS ,10);
            minePos.y = parseInt(Math.random()*MAX_COLS ,10);

            var isSame = false;
            for (var i = 0; i < this.m_listMine.length; i++) {
                var mineTemp = this.m_listMine[i];
                if(mineTemp.x == minePos.x && mineTemp.y == minePos.y){
                    isSame = true;
                }
            }
            if(!isSame){
                createMineNum++;
                //设置为地雷
                this.m_board[minePos.x][minePos.y] = SquareTypes.Mine;
                this.m_listMine.push(minePos);
            }

        }while (createMineNum < this.mineNum)

        this.gameUI.label_mineNum.text = "0/"+this.m_listMine.length;
        Gamelog("---minenum="+this.m_listMine.length);

    }

    /**生成方块 */
    _proto.createSquareMap = function(){
        for (var x = 0; x < this.m_board.length; x++) {
            var squareRow = this.m_board[x];
            for (var y = 0; y <  this.m_board[x].length; y++) {
                var squareData =  this.m_board[x][y];
                // Gamelog("------squaredata x="+squareData.toString());
                var square = new Square();
                square.m_nRowIndex = x;
                square.m_nColIndex = y;
                square.type = squareData;
                square.y = x*84 +1;
                square.x = y*84 +2;
                
                // square.initUI();
                // square.UpdateByType();

                // square.on(Laya.Event.CLICK,this,this.onSquareClick);
                square.on(Laya.Event.MOUSE_DOWN,this,this.onSquareMouseDown);
                square.on(Laya.Event.MOUSE_UP,this,this.onSquareMouseUp);                
                this.panel_diban.addChild(square);

                this.m_listSquare.push(square);
            }
            
        }
    }

    /**更新地雷状态 */
    _proto.updateMineList = function(){
        var clickMine = 0;
        for (var i = 0; i < this.m_listMine.length; i++) {
            var mineTemp = this.m_listMine[i];
            var mineSquare = this.getSquareFromList(mineTemp.x,mineTemp.y);
            if(mineSquare.isClicked){
                clickMine++;
            }
        }

        var flagMine =0;
        var flagNum = 0;
        for (var y = 0; y < this.m_listSquare.length; y++) {
            var squareTemp = this.m_listSquare[y];
            if(squareTemp.isFlag && !squareTemp.isClicked && squareTemp.type == SquareTypes.Mine){
                flagMine++;
            }
            if(squareTemp.isFlag && !squareTemp.isClicked){
                flagNum++;
            }
        }
        this.gameUI.label_mineNum.text = clickMine + flagNum + "/"+this.m_listMine.length;

        if((clickMine + flagMine) == this.m_listMine.length){
            //找到所有的地雷
            Gamelog("----------扫雷完成----");
            this.gameWin();
        }

    }
    /**方块鼠标按下 */
    _proto.onSquareMouseDown = function(e){
        e.target.mouseDownTime = Laya.timer.currTimer;
        Laya.timer.once(500,this,this.onSquareUpdateFlag,[e.target]);
    }

    _proto.onSquareUpdateFlag = function(square){
         Gamelog("--------------长按  插旗");
         square.UpdateFlag();
    }

    /**方块鼠标抬起 */
    _proto.onSquareMouseUp = function(e){
        Laya.timer.clear(this,this.onSquareUpdateFlag);
        var square = e.target;

        if(Laya.timer.currTimer - square.mouseDownTime > 500){
            // Gamelog("--------------长按  插旗");
            // square.UpdateFlag();
        }else{
            Gamelog("_-----点击 row="+e.target.m_nRowIndex+",col="+e.target.m_nColIndex);
            if(!square.isFlag){
                if(square.type != SquareTypes.Mine){
                    this.seachAroundBlankSquare(square.m_nRowIndex,square.m_nColIndex);
                }else{
                    square.UpdateByType();
                    square.isClicked = true;
                    // Gamelog("----------踩到雷 游戏结束----");
                    this.mineGameover();

                }
            }
        }
        this.updateMineList();
    }

    /**寻找周围空白方块*/
    _proto.seachAroundBlankSquare = function(_x,_y){
        var aroundNearPointList = new Array();
        var mineNum = 0;
        GetAround(_x,_y,aroundNearPointList);
        for (var i = 0; i < aroundNearPointList.length; i++) {
            var point = aroundNearPointList[i];
            if(this.m_board[point.x][point.y] == SquareTypes.Mine){
                mineNum++;
            }
        }
        var squareTarget = this.getSquareFromList(_x,_y);
        // if(squareTarget.type != SquareTypes.Mine){
        //     squareTarget.type = SquareTypes.Clicked;
        // }
        squareTarget.aroundMineNum = mineNum;
        squareTarget.UpdateByType();
        squareTarget.isClicked = true;

        // Gamelog("------aroundlist ="+aroundNearPointList.length+",minenum="+mineNum+",x="+_x+",y="+_y);
        if(mineNum == 0){
            for (var x = 0; x < aroundNearPointList.length; x++) {
                var roundPoint = aroundNearPointList[x];
                var nearSquare = this.getSquareFromList(roundPoint.x,roundPoint.y);
                // if(nearSquare.type == SquareTypes.NoClick)
                if(!nearSquare.isClicked && !nearSquare.isFlag)
                    this.seachAroundBlankSquare(roundPoint.x,roundPoint.y);
            }
        }

    }
    /**在所以方块中寻找指定坐标方块 */
    _proto.getSquareFromList = function(_x,_y){
        var squareTarget;
        for (var y = 0; y < this.m_listSquare.length; y++) {
            var squareTemp = this.m_listSquare[y];
            if(squareTemp.m_nRowIndex == _x && squareTemp.m_nColIndex ==_y){
                squareTarget = squareTemp;
            }
        }
        return squareTarget;
    }
    return GameScene;
})();