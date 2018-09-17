//打鸭子主方法
function DuckShooterMain(a) {
    var d, b = 0,
    c = 0,
    f = STATE_LOADING,
    e, g, k;
	//初始化容器
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
		//创建一个舞台
        s_oStage = new createjs.Stage(s_oCanvas);
		//不阻止HTML其他元素的点击
        s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);
		
		//隐藏鼠标右键菜单
        s_bMobile = jQuery.browser.mobile; 
		! 1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas",
        function(a) {
            return ! 1
        }));
		//获取当前时间
        s_iPrevTime = (new Date).getTime();
		//createJs update方法监听
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
		
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
		! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
		
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader;
        this._loadImages();
        d = !0
    };
	
	//声音加载
    this.soundLoaded = function() {
        b++;
        if (b === c) {
            g.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) 
				s_oSoundTrack = createjs.Sound.play("soundtrack", {
					loop: 100
				});
            this.gotoMenu()
        }
    };
	//初始化声音
    this._initSounds = function() {
		
		createjs.Sound.initializeDefaultPlugins() ;
		createjs.Sound.alternateExtensions = ["ogg"], 
		createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
		createjs.Sound.registerSound("./sounds/ds_duck_hit.ogg", "duck_hit", 5),
		createjs.Sound.registerSound("./sounds/ds_duck_intro.ogg", "duck_intro", 5), 
		createjs.Sound.registerSound("./sounds/ds_game_over.ogg", "game_over", 5),
		createjs.Sound.registerSound("./sounds/ds_no_bullets.ogg", "click"), 
		createjs.Sound.registerSound("./sounds/ds_shot.ogg", "shot"), 
		createjs.Sound.registerSound("./sounds/ds_soundtrack.ogg", "soundtrack")
		c += 6;
    };
	//加载图片
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_left", "./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right", "./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("but_up", "./sprites/but_up.png");
        s_oSpriteLibrary.addSprite("but_down", "./sprites/but_down.png");
        s_oSpriteLibrary.addSprite("but_upleft", "./sprites/but_up_left.png");
        s_oSpriteLibrary.addSprite("but_downleft", "./sprites/but_down_left.png");
        s_oSpriteLibrary.addSprite("but_upright", "./sprites/but_up_right.png");
        s_oSpriteLibrary.addSprite("but_downright", "./sprites/but_down_right.png");
        s_oSpriteLibrary.addSprite("shot_panel", "./sprites/shot_panel.png");
        s_oSpriteLibrary.addSprite("hit_panel", "./sprites/hit_panel.png");
        s_oSpriteLibrary.addSprite("bullet", "./sprites/bullet.png");
        s_oSpriteLibrary.addSprite("tap_shot", "./sprites/tap_shot.png");
        s_oSpriteLibrary.addSprite("hit_icon", "./sprites/hit_icon.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("grass", "./sprites/grass.png");
        s_oSpriteLibrary.addSprite("tree", "./sprites/tree.png");
        s_oSpriteLibrary.addSprite("scope", "./sprites/gun_sight.png");
        s_oSpriteLibrary.addSprite("tap_shot", "./sprites/tap_shot.png");
        s_oSpriteLibrary.addSprite("duck_1", "./sprites/duck_1.png");
        s_oSpriteLibrary.addSprite("duck_2", "./sprites/duck_2.png");
        s_oSpriteLibrary.addSprite("duck_3", "./sprites/duck_3.png");
        s_oSpriteLibrary.addSprite("duck_4", "./sprites/duck_4.png");
        s_oSpriteLibrary.addSprite("target", "./sprites/target.png");
        s_oSpriteLibrary.addSprite("life_panel", "./sprites/life_panel.png");
        s_oSpriteLibrary.addSprite("help_panel_desktop", "./sprites/help_panel_desktop.png");
        s_oSpriteLibrary.addSprite("help_panel_mobile", "./sprites/help_panel_mobile.png");
        c += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        g.refreshLoader(Math.floor(b / c * 100));
        if (b === c) {
            g.unload();
            if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) s_oSoundTrack = createjs.Sound.play("soundtrack", {
                loop: 100
            });
            this.gotoMenu()
        }
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(e);
        f = STATE_GAME;
        $(s_oMain).trigger("game_start")
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        d = !1
    };
    this.startUpdate = function() {
        d = !0
    };
    this._update = function(a) {
        if (!1 !== d) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && k.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    e = a;
    this.initContainer()
}