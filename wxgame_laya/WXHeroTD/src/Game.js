//初始化微信小游戏
Laya.MiniAdpter.init(true);

//laya初始化
Laya.init(GameConfig.GameWidth, GameConfig.GameHeight, Laya.WebGL);

wxGame.getInstance().Init();


//FPS
// Laya.Stat.show(0,0);
//设置适配模式 宽度不变，高度根据屏幕比缩放
Laya.stage.scaleMode = "fixedauto";
//场景布局类型 自动竖屏
Laya.stage.screenMode = "vertical";
//设置水平居中对齐
Laya.stage.alignH = "center";
//垂直居中对齐
Laya.stage.alignV = "middle";

Laya.stage.bgColor = "#000000";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//加载版本信息文件
ResourceVersion.enable("version.json", Handler.create(this, beginLoad));



function beginLoad() {
     var arr = [
                //图集
                ["res/atlas/game.atlas",Laya.Loader.ATLAS],
                ["res/atlas/hero.atlas",Laya.Loader.ATLAS],
                ["res/atlas/monster.atlas",Laya.Loader.ATLAS],
                ["res/atlas/tower.atlas",Laya.Loader.ATLAS],
                //图片
                ["game/beijing.jpg",Laya.Loader.IMAGE],
                ["game/huodechenghao-di.png",Laya.Loader.IMAGE],
                ["game/img_line.png",Laya.Loader.IMAGE],
                ["game/paohangbang-di.png",Laya.Loader.IMAGE],
                //字体
                ["bitmapFont/shuzi.fnt",Laya.Loader.FONT],
                //声音
                // ["res/music/1.mp3",Laya.Loader.SOUND],
                // ["res/music/1.wav",Laya.Loader.SOUND],

                ];

    var asset = [];
    for(var i=0; i<arr.length; i++){
        asset.push({
            url : [
                arr[i][0]
            ],
            type:arr[i][1]
        }); 
    }

    //loading 界面需要的图集
    // Laya.loader.load(asset,Laya.Handler.create(this,showLoaded),null);
    Laya.loader.load(asset, Laya.Handler.create(this, loadingCallback), null);
}

function loadingCallback() {

    // Laya.Animation.createFrames(["bubbles/bomb_00.png","bubbles/bomb_01.png", "bubbles/bomb_02.png", "bubbles/bomb_03.png", "bubbles/bomb_04.png", "bubbles/bomb_05.png", "bubbles/bomb_06.png"], "bomb");

    // Laya.Animation.createFrames(["monster/npc_102_walk_r_0001.png","monster/npc_102_walk_r_0001.png","monster/npc_102_walk_r_0003.png","monster/npc_102_walk_r_0004.png"], "monster001_walk_r");

    Laya.Animation.createFrames(["tower/tower_dead_01.png", "tower/tower_dead_02.png","tower/tower_dead_03.png","tower/tower_dead_04.png",
    "tower/tower_dead_05.png","tower/tower_dead_06.png"], "tower_dead");

    Laya.Animation.createFrames(["hero/gailun-01.png", "hero/gailun-02.png", "hero/gailun-03.png", "hero/gailun-04.png", "hero/gailun-05.png", "hero/gailun-06.png", "hero/gailun-07.png"], "hero_attack");
    Laya.Animation.createFrames(["hero/gailun-animation_0.png","hero/gailun-animation_4.png","hero/gailun-animation_8.png","hero/gailun-animation_12.png"], "hero_dead");

    Laya.Animation.createFrames(["monster/xiaobing02-animation_0.png","monster/xiaobing02-animation_1.png"], "monster01_up");
    Laya.Animation.createFrames(["monster/xiaobing06-animation_0.png","monster/xiaobing06-animation_1.png"], "monster02_up");
    Laya.Animation.createFrames(["monster/xiaobing01-animation_0.png","monster/xiaobing01-animation_1.png"], "monster03_up");

    Laya.Animation.createFrames(["monster/xiaobing03-animation_0.png","monster/xiaobing03-animation_1.png"], "monster01_down");
    Laya.Animation.createFrames(["monster/xiaobing05-animation_0.png","monster/xiaobing05-animation_1.png"], "monster02_down");
    Laya.Animation.createFrames(["monster/xiaobing04-animation_0.png","monster/xiaobing04-animation_1.png"], "monster03_down");

    Laya.Animation.createFrames(["hero/speed_1.png","hero/speed_2.png","hero/speed_3.png"], "hero_speed");

    SceneManager.getInstance().currentScene = new GameScene();
    wxGame.getInstance().createVideoAD();
    // Laya.stage.addChild(new GameUILogic());
    // UIManager.getInstance().showUI("GameUI");

}