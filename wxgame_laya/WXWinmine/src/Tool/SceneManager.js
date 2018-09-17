
/**
 * 场景管理器
 */
var SceneManager = (function(_super){

    Laya.class(SceneManager,"SceneManager",_super);
    var _proto = SceneManager.prototype;

    var instance;
    
    function getInstance(){
        if(instance === undefined){
            instance = new SceneManager();
        }
        return instance;
    }
    function SceneManager(){
        //无父类
        // SceneManager.super(this);

        //当前游戏场景
        _proto.currentScene = "";
    }

    return{
            getInstance:getInstance
        }
})();