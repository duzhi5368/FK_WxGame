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
var GameLogVisible = true;
/**显示范围 */
var ShowRang = false;
