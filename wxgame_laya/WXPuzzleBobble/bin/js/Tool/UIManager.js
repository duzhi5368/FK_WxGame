/**
 *UI管理类 单例模式。
 *<p>使用 UIManager.getInstance()
 *<p>新界面需要在此类注册
 *<p>UI逻辑类需要实现 onInit() onDestroy()
 *<p>by lzq
 */
var UIManager = (function(_super){

    Laya.class(UIManager,"UIManger",_super);
    var _proto = UIManager.prototype;

    var instance;

    function getInstance(){
        if(instance === undefined){
            instance = new UIManager();
        }
        return instance;
    }
    function UIManager(){
        //无父类
        // UIManager.super(this);
    }

    //UI界面字典
    _proto.UIArry = new Array();

    /**
     * 显示UI
     */
    _proto.showUI = function(_name,_index){
        console.debug("------UIManager showUI="+_name);
        var uiLogic= _proto.UIArry[_name];

        if(uiLogic != null){
            uiLogic.visible = true;
            if(uiLogic.onShow != null){
                uiLogic.onShow();
            }
        }else{
            uiLogic = getNewUILogicByName(_name);

            _proto.UIArry[_name] = uiLogic;
            //加入到舞台
            Laya.stage.addChild(uiLogic);
        }
        if(uiLogic.onInit != null){
                uiLogic.onInit();
        }else{
            console.warn("----UIManager showUI warn:"+_name+"没有定义onInit()!");
        }
        //指定UI层级
        if(_index != null){
            var UIIndex = _index;
            if(UIIndex > Laya.stage.numChildren - 1){
                UIIndex = Laya.stage.numChildren - 1;
            }
            Laya.stage.setChildIndex(uiLogic,UIIndex);
        }
        // console.debug("------UIManager stage children num="+Laya.stage.numChildren);
        // for(var i in _proto.UIArry){
        //     console.debug("-----------------------UIArrayy i="+i+",UIArry[i]="+_proto.UIArry[i]);
        // }
        return uiLogic;
    }
    /**
     * 获取UI是否显示中
     */
    _proto.getIsShowing = function(_name){
        var isShowing = false;
        var uiLogic = this.getUI(_name);
        if(uiLogic != null){
            isShowing = uiLogic.visible;
        }
        return isShowing;
    }
    /**
     * 获得UILogic对象
     */
    _proto.getUI = function(_name){
        var uiLogic;
        for(var i in _proto.UIArry){
            if(i == _name){
                uiLogic = _proto.UIArry[i];
            }
        }
        if(uiLogic === undefined ){
            console.error("--------UIManager getUI name="+_name+"在列表中不存在");
        }
        return uiLogic;
    }
    /**
     * 关闭UI
     */
    _proto.closeUI = function(_name,_destory){
        console.debug("------UIManager closeUI="+_name);
        if(_destory === undefined){
            //设置默认值
            _destory = false;
        }
         var uiLogic;
        uiLogic = _proto.UIArry[_name];
        if(uiLogic != null){
            uiLogic.visible = false;
        }else{
            console.error("UIManager error: closeUI name="+_name+"is not find!");
        }
        if(uiLogic.onDestroy != null){
                uiLogic.onDestroy();
        }else{
            console.warn("----UIManager showUI warn:"+_name+"没有定义onDestroy()!");
        }
        //从舞台删除UI
        if(_destory === true){
            delete _proto.UIArry[_name];
            Laya.stage.removeChild(uiLogic);
        }
        // console.debug("------UIManager stage children num="+Laya.stage.numChildren);
        // for(var i in _proto.UIArry){
        //     console.debug("-------------------------UIArrayy i="+i+",UIArry[i]="+_proto.UIArry[i]);
        // }
    }

    /**
     * 关闭全部UI
     */
    _proto.closeAllUI = function(_destory){
        for(var i in _proto.UIArry){
            // console.debug("-----UIArrayy i="+i+",UIArry[i]="+_proto.UIArry[i]);
            this.closeUI(i,_destory);
        }
    }
    /**
     * 根据名称创建界面
     */
    function getNewUILogicByName(_name){
        var uiLogic = null;
        switch(_name)
        {
            case "GameUI":
                uiLogic = new GameUILogic();
                break;
            case "GameoverUI":
                uiLogic = new GameoverUILogic();
                break;
            case "GameSharedUI":
                uiLogic = new GameSharedUILogic();
                break;
            case "GameRankUI":
                uiLogic = new GameRankUILogic();
                break;

            default:
                console.error("-------UIManager UIname="+_name+"没有注册或不存在");
            break;
        }
        return uiLogic;
    }


    return{
        getInstance:getInstance
    }
})();