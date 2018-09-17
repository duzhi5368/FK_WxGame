var Sprite = laya.display.Sprite;
var Text = laya.display.Text;
var Bitmap = laya.resource.Bitmap;
var Texture = laya.resource.Texture;
var Handler = laya.utils.Handler;
var Loader = laya.net.Loader;
var Animation = laya.display.Animation;
var Rectangle = laya.maths.Rectangle;
var Event = laya.events.Event;
var Pool = laya.utils.Pool;
var Browser = laya.utils.Browser;
var Stat = laya.utils.Stat;
var SoundManager = laya.media.SoundManager;
var Pool = laya.utils.Pool;
var Point = laya.maths.Point;
var Tween = laya.utils.Tween;
var LocalStorage = laya.net.LocalStorage;
var HttpRequest = laya.net.HttpRequest;
var Loader = Laya.Loader;
var Browser = Laya.Browser;
var Handler = Laya.Handler;
var Socket = Laya.Socket;
// var ProtoBuf = Browser.window.protobuf;
// var Matter = Browser.window.Matter; 
// var LayaRender = Browser.window.LayaRender;
var BitmapFont = Laya.BitmapFont;
var Text = Laya.Text;
var ResourceVersion = laya.net.ResourceVersion;

var GameConfig = {
    
    //游戏宽 高
    GameWidth : 720,
    GameHeight : 1280,

    //游戏速度
    speed : 8
    
};
/**是否显示Log */
var GameLogVisible = false;
/**物理边框显示 */
var GameMatterBody = true;
/**物理模式 */
var GameMatterModle = true;
/**是否在FB */
// var GameInFackBook = true;
/**请求地址 */
var HttpUrl = "http://test.yulelp.com:8081/cometoplay/ranking/putScore";
// var HttpUrl = "http://192.168.1.101:8080/cometoplay2/ranking/putScore";

/**Socket 地址 */
var SocketUrl = "wss://mineForBusiness.laiwan.jtkshop.net/bubbleproject/webSocketServer";
// var SocketUrl = "ws://192.168.1.101:8081/bubbleproject/webSocketServer";