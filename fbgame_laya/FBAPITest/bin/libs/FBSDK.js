var FBSDK = {};
/**
 * 初始化
 * 应当在其他 API 使用前调用
 * */
FBSDK.initializeAsync = function(callback) {
    FBInstant.initializeAsync().then(function() {
        callback&&callback();
    });
}
/**
 * 获取用户信息
 */
FBSDK.player = {};
/**
 * 当前游戏的来源信息
 */
FBSDK.context = {};
/**
 * 获取用户的地域信息，例如:zh_CN en_US
 */
FBSDK.getLocale = function(){
    return FBInstant.getLocale();
}
/**
 * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
 */
FBSDK.getPlatform = function(){
    return FBInstant.getPlatform();
}
/**
 * SDK 的版本号，例如: '4.0'
 */
FBSDK.getSDKVersion = function () {
    return FBInstant.getSDKVersion();
}
/**
 * 通知平台资源加载的百分比
 * @param value 0-100
 */
FBSDK.setLoadingProgress=function(value){
    FBInstant.setLoadingProgress(value);
}
/**
 * 获取平台支持的 api 列表  返回一个数组
 */
FBSDK.getSupportedAPIs=function () {
    return FBInstant.getSupportedAPIs();
}
/**
 * 返回与该游戏启动的入口点相关联的任何数据对象
 */
FBSDK.getEntryPointData=function () {
   return FBInstant.getEntryPointData();
}
/**
 * 为当前上下文设置与个别游戏会话相关的数据。
 */
FBSDK.setSessionData = function(sessionData){
    FBInstant.setSessionData(sessionData);
}
/**
 * 游戏已完成加载资源，用户点击了开始游戏的按钮
 * callback回来用户处理游戏逻辑
 */
FBSDK.startGameAsync = function (callback) {
    FBInstant.startGameAsync().then(function() {
        callback&&callback();
    });
}
/**
 * 分享游戏
 * payload is SharePayload
 */
FBSDK.shareAsync=function(payload,callback){
    FBInstant.shareAsync(payload).then(function() {
        callback&&callback();
    });
}
/**
 * 通知 Facebook 在游戏中发生的更新
 * payload is CustomUpdatePayload
 */
FBSDK.updateAsync=function(payload,callback){
    FBInstant.updateAsync(payload).then(function() {
        callback&&callback();
    });
}
/**
 * 退出游戏
 */
FBSDK.quit = function(){
    FBInstant.quit();
}
/**
 * 自定义事件，使用 Facebook 的分析后台功能来分析应用。
 * @param eventName string 要分析的事件名称  必须为2到40个字符, 并且只能包含 "_"、"-"、"和" 字母数字字符
 * @param valueToSum number 可选，FB分析后台可以计算它。
 * @param parameters Object 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
 */
FBSDK.logEvent = function(eventName, valueToSum, parameters){
    return FBInstant.logEvent(eventName, valueToSum, parameters);
}
/**
 * 设置一个回调函数，当触发暂停事件时触发
 */
FBSDK.onPause = function(callback){
    callback&&callback();
}
/**
 * 玩家的唯一标识ID
 */
FBSDK.player.getID = function(){
	return FBInstant.player.getID();
}
/**
 * 获取玩家的唯一ID和一个签名，签名用来验证该 ID 是否来自 Facebook ，是否被篡改。
 * 返回SignedPlayerInfo
 */
FBSDK.player.getSignedPlayerInfoAsync = function(){
	 FBInstant.player.getSignedPlayerInfoAsync('my_metadata')
	.then(function (result) {
		callback&&callback(result);
	});
}
/**
 * 获取用户在Facebook上的的名字，使用用户的语言种类显示
 */
FBSDK.player.getName = function(){
	 return FBInstant.player.getName();
}
/**
 * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200
 */
FBSDK.player.getPhoto = function() {
	 return FBInstant.player.getPhoto();
}
/**
 * 取回在facebook储存的当前用户的数据
 * @param keys 数据的 key 的数组
 */
FBSDK.player.getDataAsync = function(keys,callback){
	 FBInstant.player.getDataAsync(keys)
	.then(function(data){
		callback&&callback(data);
	});
}
/**
 * 把当前用户的数据储存到facebook。
 * @param data 包含key-value的数据对象.
 */
FBSDK.player.setDataAsync = function(data,callback){
	 FBInstant.player.setDataAsync(data)
	.then(function() {
		callback&&callback();
	});
}
/**
 * 立刻保存数据
 */
FBSDK.player.flushDataAsync = function(callback){
	FBInstant.player.flushDataAsync()
	.then(function() {
		callback&&callback();
	});
}
/**
 * 获取玩家同玩好友的信息
 * 返回的值是数组[ConnectedPlayer]
 */
FBSDK.player.getConnectedPlayersAsync = function(callback){
	FBInstant.player.getConnectedPlayersAsync()
	.then(function(players) {
		callback&&callback(players);
	});
}
/**
 * 当前游戏的唯一id
 */
FBSDK.context.getID = function(){
	 return FBInstant.context.getID();
}
/**
 * 游戏上下文的类型："POST" | "THREAD" | "GROUP" | "SOLO"
 */
FBSDK.context.getType = function(){
	return FBInstant.context.getType();
}
/**
 * 用这个方法来判断当前游戏环境中游戏参与者的数量是否介于指定的最小值和最大值之间。
 * 返回值{answer: true, minSize: 3, maxSize: 5}
 */
FBSDK.context.isSizeBetween = function(minSize, maxSize)
{
	return FBInstant.context.isSizeBetween(minSize, maxSize);
}
/**
 * 切换游戏场景
 * id//FBInstant.context.getID()
 */
FBSDK.context.switchAsync = function(id,callback){
	FBInstant.context.switchAsync(id)
	.then(function() {
		callback&&callback();
	});
}
/**
 * 选择游戏场景
 * param:{ filters: ['NEW_CONTEXT_ONLY'], minSize: 3,minSize:1}
 */
FBSDK.context.chooseAsync = function(param,callback){
	 FBInstant.context.chooseAsync(param)
	.then(function() {
		callback&&callback();
	});
}
/**
 * 创建游戏场景
 * playerID 玩家Id
 */
FBSDK.context.createAsync = function(playerID,callback){
	 FBInstant.context.createAsync(playerID)
		.then(function() {
			callback&&callback();
	});
}
/**
 * 获取当前环境中正在玩游戏的玩家列表，它可能包含当前玩家的信息。
 * 返回的值是数组[ContextPlayer]
 */
FBSDK.context.getPlayersAsync = function(callback){
	 FBInstant.context.getPlayersAsync()
		 .then(function(players) {
		 callback&&callback(players);
	  });
}
/**
 * 同玩游戏好友的信息
 */
ConnectedPlayer = function(){
    /**
     * 关联用户的ID
     */
    function getID(){
        return "";
    };
    /**
     * 关联用户的名字
     */
    function getName(){
        return "";
    };
    /**
     * 关联用户的头像 ulr 地址
     */
    function getPhoto(){
        return "";
    };
}

/**
 * 正在游戏中的玩家信息
 */
ContextPlayer = function(){
    /**
     * 用户的ID
     */
    function getID(){
        return "";
    };
    /**
     * 用户的名字
     */
    function getName(){
        return "";
    };
    /**
     * 用户的头像 ulr 地址
     */
    function getPhoto(){
        return "";
    };
}

/**
 * 玩家的签名信息
 */
SignedPlayerInfo = function(){
    /**
     * 玩家的id
     */
    function getPlayerID(){
        return "";
    }
    /**
     * 验证这个对象的签名确实来自Facebook。该字符串是base64url编码的，使用 HMAC 对您应用的 Sccret 进行签名，基于 OAuth 2.0 规范，
     */
    function getSignature(){
        return "";
    }

}

/**
 * 分享的内容
 */
SharePayload = function(){
    /**
     * 分享的目标
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     */
    var intent;
    /**
     * 分享的图像，使用 base64 编码 必须是base64 不能是图片路径
     */
    var image;
    /**
     * 分享的文字
     */
    var text;
    /**
     * 一个附加到分享上的数据。
     * 所有从这个分享启动的游戏都可以通过  FBInstant.getEntryPointData() 方法获取到该数据。
     */
    var data;
}

/**
 * 自定义更新内容
 */
CustomUpdatePayload = function(){
    /**
     * 对于自定义更新来说，该值应该为 'CUSTOM'.
     */
    var action;
    /**
     * 自定义更新使用的模板的ID，模板应该在 fbapp-config.json 中预定义。
     * 查看配置文件说明：https://developers.facebook.com/docs/games/instant-games/bundle-config
     */
    var template;
    /**
     * 可选，按钮文字。默认情况下，我们本地化的 'Play' 作为按钮文字。
     */
    var cta;
    /**
     * base64 编码的图像信息   必须是base64 不能是图片路径
     */
    var image;
    /**
     * 文本信息
     */
   var text;
    /**
     * 附加到更新上的数据。当游戏通过分享启动时，可以通过 FBInstant.getEntryPointData() 方法获取。
     * 该数据必须少于1000个字符。
     */
   var data;
    /**
     * 指定更新的方式。
     * 'IMMEDIATE' - 默认值，立即发布更新
     * 'LAST' - 当游戏结束时，发布更新
     * 'IMMEDIATE_CLEAR' - 立即发布更新，并清除任何其他正在等待的更新
     */
    var strategy;
    /**
     * 指定自定义更新的通知设置。可以是“NO_PUSH”或“PUSH”，默认为“NO_PUSH”。
     */
    var notification;
}
window.FBSDK=FBSDK; 