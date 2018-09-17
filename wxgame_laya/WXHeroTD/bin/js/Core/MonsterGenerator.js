/**
 * 怪物生成器
 */
var MonsterGenerator = (function(_super){

    Laya.class(MonsterGenerator,"MonsterGenerator",_super);
    var _proto = MonsterGenerator.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new MonsterGenerator();
        }
        return instance;
    }
    var MonsterPoolNum = 50;                                                 //怪物对象池大小


    function MonsterGenerator(){

        // this.targetTower = SceneManager.getInstance().currentScene.curTower;
        // this.towerGlobalPos = SceneManager.getInstance().currentScene.towerBox.localToGlobal(new Point(this.targetTower.x, this.targetTower.y));
        // SceneManager.getInstance().currentScene.monsterBox.globalToLocal(this.towerGlobalPos);
    }

    _proto.targetPos;                                        //中心塔在monsterBox坐标
    _proto.targetTower;                                      //目标塔
    _proto.monsterBox;                                       //怪物容器

    _proto.initGenerator = function(_monsterBox,_tower)
    {
        this.monsterBox = _monsterBox;
        this.targetTower = _tower;

        this.towerPos = this.targetTower.parent.localToGlobal(new Point(this.targetTower.x, this.targetTower.y));
        this.monsterBox.globalToLocal(this.towerPos);

        MonsterFactory.getInstance().initFactory(this.monsterBox);
    }

    /**初始化对象池 */
     _proto.createMonster = function(p_num){

         var t_monsterList = [];
         for (var i = 0; i < p_num; i++) {
            var tempMonster = MonsterFactory.getInstance().getMonsterFromPool();
            tempMonster.visible = true;
            
            this.randomMonsterPos(tempMonster);
            t_monsterList.push(tempMonster);
         }
         return t_monsterList;
     }

     _proto.randomMonsterPos = function(_mos){


         var posTypeId = Math.random()*4 + 1;
         posTypeId = parseInt(posTypeId, 10);
        //  posTypeId = 3;

        var monsterRanomNum = parseInt(Math.random()*10, 10);
        var typeId = parseInt(Math.random()*3, 10);
        if(monsterRanomNum > 7){
            typeId = 2;
        }else if(monsterRanomNum > 4){
            typeId = 1;
        }else{
            typeId = 0;
        }

         _mos.initMonster(posTypeId,typeId);

         var birthPos;
         var t_anlge;
         //左上
         if(posTypeId == 1){
            birthPos = new Point(-50 - Math.random()*200, Math.random()*200); // 180 -270度
            t_anlge = Math.random()*70 + 190;
         }

         //右上
         if(posTypeId == 2){
            birthPos = new Point(Laya.stage.width + 50 + Math.random()*200, -Math.random()*200); // 270 - 360度
            t_anlge = Math.random()*70 + 280;
         }

         //左下
         if(posTypeId == 3){
            birthPos = new Point(-50 - Math.random()*200, Laya.stage.height + 50 +Math.random()*200); //90 - 180度
            t_anlge = Math.random()*70 + 100;
         }

         //右下
         if(posTypeId == 4){
            birthPos = new Point(Laya.stage.width + 50 + Math.random()*200, Laya.stage.height + 50 +Math.random()*200); //0 - 90度
            t_anlge = Math.random()*70 + 10;
         }

        //  Gamelog("----生成怪物 pos="+birthPos +",角度="+t_anlge);
         //初始坐标
         _mos.pos(birthPos.x,birthPos.y);
         //设置目标点跟角度
         var t_targetPos = GetPointOnCircle(this.towerPos,this.targetTower.TowerRadios,t_anlge);
         _mos.setTargetPos(t_targetPos,t_anlge);

         // var birthPos = new Point(-50,200); // 180 -270度
        // var birthPos = new Point(Laya.stage.width + 50,-50); // 270 - 360度
        // var birthPos = new Point(Laya.stage.width + 50,1300); //0 - 90度
        // var birthPos = new Point(-50,1300); //90 - 180度
        // var t_anlge = 100;
        // tempMonster.pos(birthPos.x,birthPos.y);
     }
    

    return{
            getInstance:getInstance
        }
})();