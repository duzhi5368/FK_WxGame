/**
 * 怪物管理器
 */
var MonsterControl = (function(_super){

    Laya.class(MonsterControl,"MonsterControl",_super);
    var _proto = MonsterControl.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new MonsterControl();
        }
        return instance;
    }
    function MonsterControl(){

    }

    _proto.monsterArray = null;

    return{
            getInstance:getInstance
        }
})();