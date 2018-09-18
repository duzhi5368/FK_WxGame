declare class ConnectedPlayer{
    /**
     * 用户的ID
     */
    getID():string;
    /**
     * 用户的名字
     */
    getName():string;
    /**
     * 用户的头像 ulr 地址
     */
    getPhoto():string;
}
declare class SharePayload{
    /**
     * 分享的目标
     * "INVITE" | "REQUEST" | "CHALLENGE" | "SHARE"
     */
    intent:string;
    /**
     * 分享的图像，使用 base64 编码 必须是base64 不能是图片路径
     */
    image:string;
    /**
     * 分享的文字
     */
    text:string;
    /**
     * 一个附加到分享上的数据。
     * 所有从这个分享启动的游戏都可以通过  FBInstant.getEntryPointData() 方法获取到该数据。
     */
    data:Object;
}
declare class CustomUpdatePayload{
    /**
     * 对于自定义更新来说，该值应该为 'CUSTOM'.
     */
    action:string;
    /**
     * 自定义更新使用的模板的ID，模板应该在 fbapp-config.json 中预定义。
     * 查看配置文件说明：https://developers.facebook.com/docs/games/instant-games/bundle-config
     */
    template:string;
    /**
     * 可选，按钮文字。默认情况下，我们本地化的 'Play' 作为按钮文字。
     */
    cta:string;
    /**
     * base64 编码的图像信息   必须是base64 不能是图片路径
     */
    image:string;
    /**
     * 文本信息
     */
    text:string;
    /**
     * 附加到更新上的数据。当游戏通过分享启动时，可以通过 FBInstant.getEntryPointData() 方法获取。
     * 该数据必须少于1000个字符。
     */
    data:Object;
    /**
     * 指定更新的方式。
     * 'IMMEDIATE' - 默认值，立即发布更新
     * 'LAST' - 当游戏结束时，发布更新
     * 'IMMEDIATE_CLEAR' - 立即发布更新，并清除任何其他正在等待的更新
     */
    strategy:string;
    /**
     * 指定自定义更新的通知设置。可以是“NO_PUSH”或“PUSH”，默认为“NO_PUSH”。
     */
    notification:string;
}
declare class Context{
    /**
     * 当前游戏的唯一id
     */
    getID():string;
    /**
     * 游戏上下文的类型："POST" | "THREAD" | "GROUP" | "SOLO"
     */
    getType():string;
    /**
     * 此函数确定当前游戏上下文中参与者的数量是否介于给定的最小值和最大值之间
     * 返回值{answer: true, minSize: 3, maxSize: 5}
     */
    isSizeBetween(minSize:Number, maxSize:Number):Object;
    /**
     * 切换游戏场景
     * id//FBInstant.context.getID()
     */
    switchAsync(id:string,callback:Function):void;
    /**
     * 选择游戏场景
     * param:{ filters: ['NEW_CONTEXT_ONLY'], minSize: 3,minSize:1}
     */
    chooseAsync(param:Object,callback:Function):void;
    /**
     * 创建游戏场景
     * playerID 玩家Id
     */
    createAsync(playerID:string,callback:Function):void;
    /**
     * 获取当前环境中正在玩游戏的玩家列表，它可能包含当前玩家自身。
     * 返回的值是数组[ContextPlayer]
     */
    getPlayersAsync(callback:Function):void;
}
declare class FBPlayer{
    /**
     * 玩家的唯一标识ID
     */
    getID():string;
    /**
     * 获取玩家的唯一ID和一个签名，签名用来验证该 ID 是否来自 Facebook ，是否被篡改。。
     * 返回SignedPlayerInfo
     */
    getSignedPlayerInfoAsync(callback:Function):void;
    /**
     * 获取用户在Facebook上的的名字，根据当前用户选择的语种显示
     */
     getName():string;
    /**
     * 获取用户在Facebook上的头像的url，头像为正方形，最小尺寸为200x200
     */
    getPhoto():string;
    /**
     * 取回在facebook储存的当前用户的数据
     * @param keys 数据的 key 的数组
     */
    getDataAsync(keys:Array<any>,callback:Function):void;
    /**
     * 把当前用户的数据储存到facebook。
     * @param data 包含key-value的数据对象.
     */
    setDataAsync(data:Object,callback:Function):void;
    /**
     * 立刻保存数据
     */
    flushDataAsync(callback:Function):void;
    /**
     * 获取玩家同玩好友的信息
     * 返回的值是数组[ConnectedPlayer]
     */
    getConnectedPlayersAsync(callback:Function):void;
}
declare class FBInstant{
    /**
    * 获取用户信息
    */
    player: FBPlayer;
    /**
    * 当前游戏的来源信息
    */
    context: Context;
    /**
     * 初始化完成回调，接口的调用基本都要在此方法返回之后才行 
     * @param callback
     * 
     */	
    initializeAsync(callback:Function):void;
    /**
     * 获取用户的地域信息，例如:zh_CN en_US
     */
    getLocale():string;
    /**
     * 获取运行的平台信息: IOS | ANDROID | WEB | MOBILE_WEB
     */
    getPlatform():string;
    /**
     * SDK 的版本号，例如: '4.0'
     */
    getSDKVersion():string;
    /**
     * 通知平台资源加载的进度
     * @param value 0-100
     */
     setLoadingProgress(value:Number):void;
    /**
     * 获取平台支持的 api 列表  返回一个数组
     */
    getSupportedAPIs():Array<any>;
    /**
     * 返回与该游戏启动的入口点相关联的任何数据对象
     */
    getEntryPointData():Object;
    /**
     * 为当前上下文设置与个别游戏会话相关的数据。
     */
     setSessionData(sessionData:Object):void;
    /**
     * 游戏已完成加载资源，用户点击了开始游戏的按钮
     * callback回来用户处理游戏逻辑
     */
    startGameAsync(callback:Function):void;
    /**
     * 分享游戏
     * payload 结构 SharePayload
     */
    shareAsync(payload:SharePayload,callback:Function):void;
    /**
     * 通知 Facebook 在游戏中发生的更新
     * payload 结构 CustomUpdatePayload
     */
    updateAsync(payload:CustomUpdatePayload,callback:Function):void;
    /**
     * 退出游戏
     */
    quit():void;
    /**
     * 自定义事件，使用 Facebook 的分析后台功能来分析应用。
     * @param eventName string 要分析的事件名称  必须为2到40个字符, 并且只能包含 "_"、"-"、"和" 字母数字字符
     * @param valueToSum number 可选，FB分析后台可以计算它。
     * @param parameters Object 可选，它可以包含多达25个 key-value，以记录事件。key 必须是2-40个字符，只能包含'_', '-', ' '和字母数字的字符。 Value 必须少于100个字符。
     */
    logEvent(eventName:string, valueToSum:Number, parameters:Object):Object;
    /**
     * 设置一个回调函数，当触发暂停事件时触发。
     */
    onPause(callback:Function):void;
}



