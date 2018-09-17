/**
 * 怪物工厂
 */
var MonsterFactory = (function(_super){

    Laya.class(MonsterFactory,"MonsterFactory",_super);
    var _proto = MonsterFactory.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new MonsterFactory();
        }
        return instance;
    }
    var MonsterPoolNum = 50;                                                 //怪物对象池大小

    _proto.monsterPool = null;                                               //怪物对象池
    _proto.monsterBox;                                                      //怪物父元素

    function MonsterFactory(){
        this.monsterPool = [];
    }

    _proto.initFactory = function(_box) {
        this.monsterBox = _box
        this.initMonsterPool();
    }

    /**初始化对象池 */
     _proto.initMonsterPool = function(){
        for (var i = 0; i < MonsterPoolNum; i++) {
            var tempMonster = new Monster();
            tempMonster.pos(-1000,0);
            tempMonster.visible = false;
            this.monsterBox.addChild(tempMonster);
            this.monsterPool.push(tempMonster);     
        }
     }

    /**从缓冲池中拿怪物 */
    _proto.getMonsterFromPool = function(){
        var tempMonster = null;
        if(this.monsterPool.length == 0){
            var tempMonster = new Monster();
            tempMonster.pos(-1000,0);
            tempMonster.visible = false;
            this.monsterBox.addChild(tempMonster);
            this.monsterPool.push(tempMonster);   
        }
        tempMonster = this.monsterPool[0];
        this.monsterPool.splice(0, 1);
        return tempMonster;
    }
    /**怪物还到对象池 */
    _proto.recoveryMonsterToPool = function(_monster){
        _monster.onDestroy();
        _monster.visible = false;
        _monster.pos(-1000,0);
        this.monsterPool.push(_monster);
    }

    return{
            getInstance:getInstance
        }
})();