var WebGL = laya.webgl.WebGL;
function LayaSample(){    
    var myPage;
    var FB;
    var playerId;  
    
    //实例界面
    this.myPage = new FBGameUI();
    this.myPage.btnShare.on(Laya.Event.CLICK,this,onBtnShare.bind(this));
    this.myPage.btnLogout.on(Laya.Event.CLICK,this,onBtnLogout.bind(this));
    this.myPage.btnSave.on(Laya.Event.CLICK,this,onBtnSave.bind(this));
    this.myPage.btnLoading.on(Laya.Event.CLICK,this,onBtnLoading.bind(this));
    this.myPage.btnFriend.on(Laya.Event.CLICK,this,onBtnFriend.bind(this))
    this.myPage.btnChoose.on(Laya.Event.CLICK,this,onBtnChoose.bind(this))
    //FB初始化完成
    this.FB = Laya.Browser.window.FBSDK;
    //此值未隐藏ID，这里为了方便直接写到此处，用户请通过服务器传递，
    this.FB.initializeAsync(initializeAsync.bind(this));
    Laya.stage.addChild(this.myPage);

    function initializeAsync()
    {
        this.myPage.locale.text = "Locale:" + this.FB.getLocale(); //用户的地域信息，例如:zh_CN en_US
        this.myPage.id.text = "ID:" + this.FB.player.getID();
        this.myPage.myName.text = "Name:" + this.FB.player.getName();
        this.myPage.photo.skin = this.FB.player.getPhoto(); //人物头像
        this.myPage.platform.text = "Platform:" + this.FB.getPlatform(); //运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
        this.myPage.type.text = "Type:" + this.FB.context.getType(); //  游戏的来源类型："POST" | "THREAD" | "GROUP" | "SOLO"
        this.myPage.vision.text = "Vision" + this.FB.getSDKVersion(); //SDK 的版本号
        //获取当前SDK支持的api
        console.log("API:" + this.FB.getSupportedAPIs());
        this.FB.player.getSignedPlayerInfoAsync(function (data) {
            console.log(data.$SignedPlayerInfo1.playerID + ",,,,signature:" + data.$SignedPlayerInfo1.signature);
        });
        //设置facebook下游戏加载进度
        this.FB.setLoadingProgress(30);
        this.FB.startGameAsync(function (data) {
            console.log("加载界面已经移除可以开始游戏" + data);
            //获取游戏Id,需要在startGameAsync之后才能获取到，之前有可能没有
            this.myPage.gameId.text = "gameId:" + this.FB.context.getID();
        });
    }
    /**
     * 选择游戏场景 
     * 
     */		
    function onBtnChoose()
    {			
        alert("调用了'选择游戏场景'接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        this.FB.context.chooseAsync(this.playerId,function(){
        
        });
    }
    /**
     * 获取同玩好友 
     * 
     */		
    function onBtnFriend()
    {			
        alert("调用了'同玩好友'接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        //获取同玩的好友，关系链
        this.FB.player.getConnectedPlayersAsync(function(data){
            for(var i = 0;i<data.length;i++){
                var a = data[i];
                console.log("getConnectedPlayersAsync:"+"ID:"+a.getID()+"Name:"+a.getName()+"photo:"+a.getPhoto());//[ConnectedPlayer]
            }
            //获取下某个好友的ID
            this.playerId = data[0].getID();
        })
    }
    /**
     * 获取远程数据 
     * 
     */		
    function onBtnLoading()
    {			
        alert("调用了'获取远程数据'接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        this.FB.player.getDataAsync(["name","data"],function (data) {
            alert("getDataAsync"+JSON.stringify(data));
        });
    }
    /**
     * 保存上传数据 
     * 
     */		
    function onBtnSave()
    {			
        alert("调用了'保存数据'接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        //上传自定义数据到平台
        this.FB.player.setDataAsync({name:"setDataAsync",data:"2333333"},function () {
            //从平台获取自定义数据
            alert("setDataAsync");
            //立即更新数据到平台，谨慎使用，
            this.FB.player.flushDataAsync(function () {
                alert("flushDataAsync");
            });
        });
    }
    /**
     * 退出游戏 
     * 
     */		
    function onBtnLogout()
    {
        alert("调用了'退出游戏'接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        //退出游戏
        this.FB.quit();
    }
    /**
     * 分享 
     * 
     */		
    function onBtnShare()
    {
        alert("调用了'分享 '接口,此项目为模拟项目,具体效果请在facebook环境下调试");
        var payload = new Laya.Browser.window.SharePayload();
        payload.intent = "SHARE";
        //需要base64编码
        payload.image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAIAAABI9cZ8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpEMzNFMjA2NTY3NkFFNjExOTZDM0QwQ0JENTJDMTI3QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5OTE4RjVGMzZBQzgxMUU2OEJBRkNGMkY3NjgzM0M0MCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5OTE4RjVGMjZBQzgxMUU2OEJBRkNGMkY3NjgzM0M0MCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjEzQjNFRUUzQzA2QUU2MTFBQ0VERTQ0RTQzRTU3RTNFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQzM0UyMDY1Njc2QUU2MTE5NkMzRDBDQkQ1MkMxMjdDIi8+IDwvcmRmOkRlc2NyaXB0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";
        payload.text = "分享";
        payload.data = {name:"1",id:"2"};
        this.FB.shareAsync(payload,function(){
            alert("分享");
        });
    }
}
Laya.init(720, 1280, WebGL);
Laya.stage.scaleMode = "fixedwidth";
//加载界面资源
Laya.loader.load([{url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS}],Laya.Handler.create(this, completed));		
function completed(){
    var sample = new LayaSample();
}
