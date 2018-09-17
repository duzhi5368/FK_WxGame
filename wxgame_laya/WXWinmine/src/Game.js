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

Laya.stage.bgColor = "#7a75a9";//设置画布的背景颜色。
//使用WebWorker加载并解码图片，把耗费cpu的工作放到worker中执行，防止js主线程卡死，从而能大大减少游戏中加载卡顿现象。
//指定worker.js所在的路径,比如放在libs目录下
//Laya.WorkerLoader.workerPath = "libs/worker.js";
//开启使用WorkerLoader来加载解码图片的功能
//Laya.WorkerLoader.enable = true;

//设置版本控制类型为使用文件名映射的方式
ResourceVersion.type = ResourceVersion.FILENAME_VERSION;
//加载版本信息文件
ResourceVersion.enable("version.json", Handler.create(this, beginLoad));   

function  beginLoad(){
    var arr = [
                //图集
                ["res/atlas/GameUI.atlas",Laya.Loader.ATLAS],
                ["res/atlas/StartUI.atlas",Laya.Loader.ATLAS],
                //图片
                ["GameUI/img_beijing.jpg",Laya.Loader.IMAGE],
                ["GameUI/img_diban.jpg",Laya.Loader.IMAGE],
                ["GameUI/img_dikuang.jpg",Laya.Loader.IMAGE],
                ["StartUI/1.png",Laya.Loader.IMAGE],
                ["StartUI/2.png",Laya.Loader.IMAGE],
                ["StartUI/3.png",Laya.Loader.IMAGE],
                ["StartUI/4.png",Laya.Loader.IMAGE],
                ["StartUI/5.png",Laya.Loader.IMAGE],
                //字体
                // ["bitmapFont/shuzi.fnt",Laya.Loader.FONT],
                //声音
                // ["res/music/1.mp3",Laya.Loader.SOUND],

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
    Laya.loader.load(asset,Laya.Handler.create(this,loadingCallback),null);
}

function loadingCallback(){

    Laya.Animation.createFrames(["GameUI/img_suilie1.png","GameUI/img_suilie2.png","GameUI/img_suilie3.png","GameUI/img_suilie4.png","GameUI/img_suilie5.png","GameUI/img_suilie6.png"],"suilie");
    Laya.Animation.createFrames(["GameUI/img_penhuo1.png","GameUI/img_penhuo2.png","GameUI/img_penhuo3.png","GameUI/img_penhuo4.png","GameUI/img_penhuo5.png",
    "GameUI/img_penhuo6.png","GameUI/img_penhuo7.png","GameUI/img_penhuo8.png","GameUI/img_penhuo9.png"],"mineAnim1");
    Laya.Animation.createFrames(["GameUI/img_guaiwu1.png","GameUI/img_guaiwu2.png","GameUI/img_guaiwu3.png","GameUI/img_guaiwu4.png","GameUI/img_guaiwu5.png",
    "GameUI/img_guaiwu6.png","GameUI/img_guaiwu7.png","GameUI/img_guaiwu8.png"],"mineAnim2");
    Laya.Animation.createFrames(["GameUI/img_luoshi1.png","GameUI/img_luoshi2.png","GameUI/img_luoshi3.png","GameUI/img_luoshi4.png","GameUI/img_luoshi5.png",
    "GameUI/img_luoshi6.png","GameUI/img_luoshi7.png","GameUI/img_luoshi8.png","GameUI/img_luoshi9.png","GameUI/img_luoshi10.png"],"mineAnim3");
    Laya.Animation.createFrames(["GameUI/img_zhadan1.png","GameUI/img_zhadan2.png","GameUI/img_zhadan3.png","GameUI/img_zhadan4.png","GameUI/img_zhadan5.png",
    "GameUI/img_zhadan6.png","GameUI/img_zhadan7.png","GameUI/img_zhadan8.png","GameUI/img_zhadan10.png"],"mineAnim4");

    Laya.Animation.createFrames(["GameUI/img_chaqi1.png","GameUI/img_chaqi2.png","GameUI/img_chaqi3.png","GameUI/img_chaqi4.png","GameUI/img_chaqi5.png",
    "GameUI/img_chaqi6.png","GameUI/img_chaqi7.png"],"chaqi");

    SceneManager.getInstance().currentScene  = new GameScene();
    
}
