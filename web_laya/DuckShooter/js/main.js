
var s_iScaleFactor = 1,
s_oCanvasLeft, s_oCanvasTop; 
(function(a) {
	(jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) ||
	/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
$(window).ready(function() {
    sizeHandler()
});
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
//界面适配
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = CANVAS_WIDTH,
        b = CANVAS_HEIGHT,
        c, d; ! 0 === inIframe() && "ios" == getMobileOperatingSystem() ? 
		top.location.href = document.location.href:
		(c = window.innerWidth, d = window.innerHeight,
			multiplier = s_iScaleFactor = Math.min(d / b, c / a),
			a *= multiplier, b *= multiplier,
			$("#canvas").css("width", a + "px"),
			$("#canvas").css("height", b + "px"),
			$("#canvas").css("left", c / 2 - a / 2 + "px"), s_oCanvasLeft = $("#canvas").offset().left,
			s_oCanvasTop = $("#canvas").offset().top)
    }
}
function getMobileOperatingSystem() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    return a.match(/iPad/i) || a.match(/iPhone/i) || a.match(/iPod/i) ? "ios": a.match(/Android/i) ? "android": "unknown"
}
function inIframe() {
    try {
        return window.self !== window.top
    } catch(a) {
        return ! 0
    }
};

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var d = a.length,
    b, c; 0 < d;) c = Math.floor(Math.random() * d),
    d--,
    b = a[d],
    a[d] = a[c],
    a[c] = b;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
        case "touchstart":
            this.onTouchStart(a);
            break;
        case "touchmove":
            this.onTouchMove(a);
            break;
        case "touchend":
            this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            a.dispatchEvent(d)
        }
    }
}; 
//监听页面显示隐藏
(function() {
    function a(a) {
        var c = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in c ? document.body.className = c[a.type] :
		(document.body.className = this[d] ? "hidden": "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", a) :
	(d = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) :
		(d = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) :
			(d = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) :
				"onfocusin" in document ? document.onfocusin = document.onfocusout = a:
				window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();
function CTextButton(a, d, b, c, f, e, g) {
    var k, l, h;
    this._init = function(a, b, c, d, e, f, g) {
        k = [];
        l = [];
        var y = createBitmap(c),
        q = Math.ceil(g / 20),
        v = new createjs.Text(d, "bold " + g + "px " + e, "#000000");
        v.textAlign = "center";
        v.textBaseline = "alphabetic";
        var z = v.getBounds();
        v.x = c.width / 2 + q;
        v.y = Math.floor(c.height / 2) + z.height / 3 + q;
        d = new createjs.Text(d, "bold " + g + "px " + e, f);
        d.textAlign = "center";
        d.textBaseline = "alphabetic";
        z = d.getBounds();
        d.x = c.width / 2;
        d.y = Math.floor(c.height / 2) + z.height / 3;
        h = new createjs.Container;
        h.x = a;
        h.y = b;
        h.regX = c.width / 2;
        h.regY = c.height / 2;
        h.addChild(y, v, d);
        s_oStage.addChild(h);
        this._initListener()
    };
    this.unload = function() {
        h.off("mousedown");
        h.off("pressup");
        s_oStage.removeChild(h)
    };
    this.setVisible = function(a) {
        h.visible = a
    };
    this._initListener = function() {
        oParent = this;
        h.on("mousedown", this.buttonDown);
        h.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        k[a] = b;
        l[a] = c
    };
    this.buttonRelease = function() {
        h.scaleX = 1;
        h.scaleY = 1;
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        h.scaleX = .9;
        h.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        h.x = a;
        h.y = b
    };
    this.setX = function(a) {
        h.x = a
    };
    this.setY = function(a) {
        h.y = a
    };
    this.getButtonImage = function() {
        return h
    };
    this.getX = function() {
        return h.x
    };
    this.getY = function() {
        return h.y
    };
    this._init(a, d, b, c, f, e, g);
    return this
}

//分数文字
function CScoreText(a, d, b) {
    var c;
    this._init = function(a, b, d) {
        c = new createjs.Text("00000", "bold 30px ComicSansMS-Bold", "#ffffff");
        c.textAlign = "right";
        c.text = a;
        c.x = b;
        c.y = d;
        c.alpha = 0;
        c.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        s_oStage.addChild(c);
        var k = this;
        createjs.Tween.get(c).to({
            alpha: 1
        },
        400, createjs.Ease.quadIn).call(function() {
            k.moveUp()
        })
    };
    this.moveUp = function() {
        var a = c.y - 100,
        b = this;
        createjs.Tween.get(c).to({
            y: a
        },
        1E3, createjs.Ease.sineIn).call(function() {
            b.unload()
        })
    };
    this.unload = function() {
        s_oStage.removeChild(c)
    };
    this._init(a, d, b)
}


//CreateJs 加载
function CPreloader() {
    var txt_load;
    this._init = function() {
        this._onAllPreloaderImagesLoaded()
    };
    this._onPreloaderImagesLoaded = function() {};
    this._onAllPreloaderImagesLoaded = function() {
        txt_load = new createjs.Text("", "bold 22px Arial center", "#ffffff");
        txt_load.x = CANVAS_WIDTH / 2 - 40;
        txt_load.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(txt_load)
    };
    this.unload = function() {
        s_oStage.removeChild(txt_load)
    };
    this.refreshLoader = function(d) {
        txt_load.text = d + "%"
    };
    this._init()
}


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
		/*
        createjs.Sound.initializeDefaultPlugins() && (0 < navigator.userAgent.indexOf("Opera") || 0 < navigator.userAgent.indexOf("OPR") ? 
		(createjs.Sound.alternateExtensions = ["m4a"], 
		createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
		createjs.Sound.registerSound("./sounds/ds_duck_hit.ogg", "duck_hit", 5),
		createjs.Sound.registerSound("./sounds/ds_duck_intro.ogg", "duck_intro", 5), 
		createjs.Sound.registerSound("./sounds/ds_game_over.ogg", "game_over", 5),
		createjs.Sound.registerSound("./sounds/ds_no_bullets.ogg", "click"), 
		createjs.Sound.registerSound("./sounds/ds_shot.ogg", "shot"), 
		createjs.Sound.registerSound("./sounds/ds_soundtrack.ogg", "soundtrack")): 
		(createjs.Sound.alternateExtensions = ["ogg"],
		createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)),
		createjs.Sound.registerSound("./sounds/ds_duck_hit.m4a", "duck_hit", 5), 
		createjs.Sound.registerSound("./sounds/ds_duck_intro.m4a", "duck_intro", 5),
		createjs.Sound.registerSound("./sounds/ds_game_over.m4a", "game_over", 5),
		createjs.Sound.registerSound("./sounds/ds_no_bullets.m4a", "click"),
		createjs.Sound.registerSound("./sounds/ds_shot.m4a", "shot"),
		createjs.Sound.registerSound("./sounds/ds_soundtrack.m4a", "soundtrack")), 
		c += 6)
		*/
		
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
	//进入开始菜单
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
	//进入游戏
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
			//调用CGame刷新
            f === STATE_GAME && k.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    e = a;
    this.initContainer()
}




//游戏类
function CGame(a) {
    function d(a) {
		//按下空格
        if (32 === a.keyCode && !0 === B)
			s_oGame.onShot();
        else{
			//方向键
			37 === a.keyCode ? m.leftStop() :
			38 === a.keyCode ? m.upStop() :
			39 === a.keyCode ? m.rightStop() :
			40 === a.keyCode && m.downStop()
		}
    }
    function b(a) {
        a || (a = window.event);
        switch (a.keyCode) {
        case 37:
            s_oGame.onLeft();
            break;
        case 38:
            s_oGame.onUp();
            break;
        case 39:
            s_oGame.onRight();
            break;
        case 40:
            s_oGame.onDown()
        }
    }
    var c, f, e, g, k, l, h, p, u, n, r, t, x = !1,
    B = !1,
    y, q, v, z, w, C, L, A, M = null,
    N, O, P, m, D, E, F, G, H, I, J, K;
    this._init = function() {
        e = c = 0;
        g = BONUS_TIME;
        f = NUM_BULLETS;
        k = 0;
        l = PLAYER_LIVES;
        p = u = h = 0;
        y = !1;
        v = [];
        z = [];
        w = [];
        C = [];
        L = [];
        A = new CInterface;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        a = s_oSpriteLibrary.getSprite("tree");
        a = new createBitmap(a);
		//创建容器
        O = new createjs.Container;
        O.y = 30;
        s_oStage.addChild(O);
        O.addChild(a);
        P = new createjs.Container;
        s_oStage.addChild(P);
		//初始化鸭子
        this._initDucks();
		//创建生成点
        this._initPos();
		//初始化鸭子对象 设置出生点 播放动画等
        this.initDuckObj();
        var a = s_oSpriteLibrary.getSprite("grass"),
        n = createBitmap(a);
        N = new createjs.Container;
        N.y = CANVAS_HEIGHT - a.height;
        s_oStage.addChild(N);
		//草地容器在上一层
        N.addChild(n);
		//得分对象
        m = new CScope;
		//分数面板
        A = new CInterface;
		/*
        D = createBitmap(s_oSpriteLibrary.getSprite("but_up"));
        D.x = 70;
        D.y = 550;
        s_oStage.addChild(D);
        E = createBitmap(s_oSpriteLibrary.getSprite("but_down"));
        E.x = 70;
        E.y = 656;
        s_oStage.addChild(E);
        F = createBitmap(s_oSpriteLibrary.getSprite("but_left"));
        F.x = 4;
        F.y = 615;
        s_oStage.addChild(F);
        G = createBitmap(s_oSpriteLibrary.getSprite("but_right"));
        G.x = 110;
        G.y = 616;
        s_oStage.addChild(G);
        H = createBitmap(s_oSpriteLibrary.getSprite("but_upright"));
        H.x = 110;
        H.y = 559;
        s_oStage.addChild(H);
        I = createBitmap(s_oSpriteLibrary.getSprite("but_downright"));
        I.x = 110;
        I.y = 656;
        s_oStage.addChild(I);
        J = createBitmap(s_oSpriteLibrary.getSprite("but_upleft"));
        J.x = 14;
        J.y = 559;
        s_oStage.addChild(J);
        K = createBitmap(s_oSpriteLibrary.getSprite("but_downleft"));
        K.x = 14;
        K.y = 656;
        s_oStage.addChild(K);*/
		
		//开始引导界面
        //CHelpPanel();
		s_oGame._onExitHelp();
		/*
        s_bMobile ? window.navigator.msPointerEnabled ? (t = 0, s_oCanvas.addEventListener("MSPointerDown", this.onTouchStartMS, !1),
			s_oCanvas.addEventListener("MSPointerMove", this.onTouchMoveMS, !1), 
			s_oCanvas.addEventListener("MSPointerUp", this.onTouchEndMS, !1)):
				(s_oCanvas.addEventListener("touchstart", this.onTouchStart, !1),
				s_oCanvas.addEventListener("touchmove", this.onTouchMove, !1),
				s_oCanvas.addEventListener("touchend", this.onTouchEnd, !1)) : */
			(document.onkeydown = b, document.onkeyup = d, 
				s_oStage.addEventListener("stagemousedown", this.onMouseStart, !1),
				s_oStage.addEventListener("stagemousemove", this.onMouseMove, !1),
				s_oStage.addEventListener("stagemouseup", this.onMouseEnd, !1));
		! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_oSoundTrack.setVolume(.5)
    };
    this.onMouseStart = function(a) {
        a = a || window.event;
        n = parseInt(a.stageX);
        r = parseInt(a.stageY);
        y = !0
		m.setPos(n,r);
    };
    this.onMouseMove = function(a) {
		! 1 !== y && (n = parseInt(a.stageX),
		r = parseInt(a.stageY),
		m.setPos(n,r))
    };
    this.onMouseEnd = function() {
        y = !1;
        m.resetAllDirection()
		if (B) {
			s_oGame.onShot();
		}
    };
    this.onTouchStart = function(a) {
        y || (n = parseInt((a.touches[0].pageX - s_oCanvasLeft) / s_iScaleFactor), r = parseInt((a.touches[0].pageY - s_oCanvasTop) / s_iScaleFactor), y = !0)
    };
    this.onTouchMove = function(a) {
        a.preventDefault();
        n = parseInt((a.touches[0].pageX - s_oCanvasLeft) / s_iScaleFactor);
        r = parseInt((a.touches[0].pageY - s_oCanvasTop) / s_iScaleFactor)
    };
    this.onTouchEnd = function(a) {
        0 === a.touches.length && (y = !1, m.resetAllDirection())
    };
    this.onTouchStartMS = function(a) {
        t++;
        1 < t || (n = parseInt(((a.pageX || a.targetTouches[0].pageX) - s_oCanvasLeft) / s_iScaleFactor), r = parseInt(((a.pageY || a.targetTouches[0].pageY) - s_oCanvasTop) / s_iScaleFactor), y = !0)
    };
    this.onTouchMoveMS = function(a) {
        if (!window.navigator.msPointerEnabled || a.isPrimary) a.preventDefault(),
        n = parseInt(((a.pageX || a.targetTouches[0].pageX) - s_oCanvasLeft) / s_iScaleFactor),
        r = parseInt(((a.pageY || a.targetTouches[0].pageY) - s_oCanvasTop) / s_iScaleFactor)
    };
    this.onTouchEndMS = function(a) {
        t--;
        0 === t && (y = !1, m.resetAllDirection())
    };
    this.unload = function() {
        B = !1;
        m.unload();
        A.unload();
        null !== M && M.unload();
        for (var a = 0; a < q.length; a++)
			q[a].unload();
        s_oStage.removeAllChildren();
		
    };
	//初始化鸭子
    this._initDucks = function() {
		//根据传入的数据生成鸭子
        for (var a = 0; a < DUCK_ON_SCREEN.length; a++) 
			u < DUCK_ON_SCREEN[a] && (u = DUCK_ON_SCREEN[a]);
        q = [];
		//创建鸭子对象 加入容器P
        for (a = 0; a < u; a++) 
			q.push(new CDuck(P))
    };
	//创建生成点 加入容器C
    this._initPos = function() {
        for (var a = 51; a < CANVAS_WIDTH;)
			v.push(new createjs.Point(a, 565)),
			a += CANVAS_WIDTH / 20;
        for (a = 0; a < v.length; a++)
			C.push(a);
        z[0] = new createjs.Point( - 120, 400);
        z[1] = new createjs.Point( - 120, 200);
        z[2] = new createjs.Point(250, -120);
        z[3] = new createjs.Point(500, -120);
        w[0] = new createjs.Point(CANVAS_WIDTH + 120, 400);
        w[1] = new createjs.Point(CANVAS_WIDTH + 120, 200);
        w[2] = new createjs.Point(1E3, -120);
        w[3] = new createjs.Point(750, -120);
        for (a = 0; a < z.length; a++)
			L.push(a)
    };
	//初始化鸭子对象
    this.initDuckObj = function() {
		! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("duck_intro");
		//鸭子速度增加
        if (h === DUCK_ON_SCREEN.length)
			for (var a = h = 0; a < q.length; a++)
				q[a].increaseSpeed();
		//打乱出生点
        shuffle(C);
		//打乱目标点
        shuffle(L);
		
        for (a = 0; a < DUCK_ON_SCREEN[h]; a++)
			C[a] < v.length / 2 ? q[a].reset(v[C[a]], w[L[a]]) : q[a].reset(v[C[a]], z[L[a]]),
			e++,
			q[a].show();
			k = DUCK_ON_SCREEN[h];
        h++;
        this._refreshScreen()
    };
	//重新出现鸭子 鸭子飞出后调用
    this.checkDuck = function() {
        k--;
        0 === k && this.initDuckObj()
    };
    this.onKeyUpReleased = function() {
        m.upStop()
    };
    this.onKeyDownReleased = function() {
        m.downStop()
    };
    this.onKeyLeftReleased = function() {
        m.leftStop()
    };
    this.onKeyRightReleased = function() {
        m.rightStop()
    };
    this.onLeft = function() {
        m.moveLeft()
    };
    this.onRight = function() {
        m.moveRight()
    };
    this.onUp = function() {
        m.moveUp()
    };
    this.onDown = function() {
        m.moveDown()
    };
	//攻击开枪
    this.onShot = function() {
		if(0 === f ){
			A.noAmmo(),
			!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
		} else{
			f--, 
			//下面的面板刷新子弹
			A.refreshBullets(f),
			//瞄准器射击
			m.playShot(),
			x = !0;
		}      
		//0 === f ? (A.noAmmo(), !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click")) :
			//(f--, A.refreshBullets(f), m.playShot(), x = !0)
    };
	//重新装弹
    this._reloadRifle = function() {
        f = NUM_BULLETS;
        A.reloadBullets(f)
    };
	//刷新时间
    this._showTime = function() {
        A.refreshTime(g)
    };
	//检测是否撞到鸭子的范围
    this._checkIfDuckHit = function(a) {
        if (m.bullsEye().x > a.target().x && m.bullsEye().x < a.target().x + a.target().w && m.bullsEye().y > a.target().y && m.bullsEye().y < a.target().y + a.target().h) 
			return ! 0
    };
	//刷新检查是否与鸭子相撞
    this.checkCollision = function(a) {
        if (this._checkIfDuckHit(a) && x && a.isVisible() && !a.isHit()) {
			//鸭子被射击，播放受伤动画
            a.onHit();
			//计算分数 初始分数+ 剩余时间
            var b = SCORE_HIT + g;
            p++;
			//连击
            1 < p && (b *= p, A.viewMultiScore(p));
            p = 0;
            c += b;
            new CScoreText(b, a.getPos().x, a.getPos().y);
			//更新总分
            A.refreshScore(c);
			! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("duck_hit")
        }
    };
	//设置击中状态图
    this.setHitPane = function() {
        A.setHit()
    };
	//鸭子飞出 设置没击中状态图
    this.setNoHitPane = function() {
        A.setNoHit()
    };
	//计算生命
    this.subtractLife = function() {
        l--;
        0 === l && (this.gameOver(), B = !1);
        A.refreshLife(l)
    };
	//刷新屏幕
    this._refreshScreen = function() {
        this._reloadRifle();
        g = BONUS_TIME;
        A.cleanScore();
        A.noAmmoDelete()
    };
	
	//游戏重新开始
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("restart")
    };
    this._onExitHelp = function() {
        B = !0
    };
	//游戏结束
    this.gameOver = function() {
		! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("game_over");
        M = CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        M.show(c)
    };
	//检查控制
    this.checkController = function() {
        var a = H.globalToLocal(n, r);
        if(H.hitTest(a.x, a.y)){
			m.moveUp(),
			m.moveRight(),
			m.downStop(),
			m.leftStop();
		}else{
			
		(a = I.globalToLocal(n, r),
		 I.hitTest(a.x, a.y) ?
			(m.moveDown(), m.moveRight(), m.upStop(), m.leftStop()) :
		(a = J.globalToLocal(n, r),
		J.hitTest(a.x, a.y) ?
			(m.moveUp(),m.moveLeft(),m.downStop(),m.rightStop()) :
		(a = K.globalToLocal(n, r), K.hitTest(a.x, a.y) ?
			(m.moveDown(), m.moveLeft(), m.upStop(), m.rightStop())
			: (a = D.globalToLocal(n, r), D.hitTest(a.x, a.y) ?
			(m.moveUp(), m.downStop(), m.rightStop(), m.leftStop()) :
			(a = E.globalToLocal(n, r), E.hitTest(a.x, a.y) ?
			(m.moveDown(), m.upStop(), m.rightStop(), m.leftStop()) :
			(a = F.globalToLocal(n, r), F.hitTest(a.x, a.y) ?
			(m.moveLeft(), m.downStop(), m.rightStop(), m.upStop()) :
			(a = G.globalToLocal(n, r), G.hitTest(a.x, a.y) ?
			(m.moveRight(), m.downStop(), m.upStop(), m.leftStop()) :
			m.resetAllDirection())))))))
		}
    };
	//CGame刷新方法
    this.update = function() {
        if (B) {
            //y && this.checkController();
            for (var a = 0; a < u; a++)
				q[a].update(),
				this.checkCollision(q[a]);
            x = !1;
			//分数的刷新位置
            m.update();
			//时间减少
            g -= s_iTimeElaps;
            0 > g && (g = 0);
            this._showTime()
        }
    };
    s_oGame = this;
    SCOPE_ACCELERATION = a.scope_accelleration;
    SCOPE_FRICTION = a.scope_friction;
    MAX_SCOPE_SPEED = a.max_scope_speed;
    NUM_BULLETS = a.num_bullets;
    SCORE_HIT = a.hit_score;
    BONUS_TIME = a.bonus_time;
    PLAYER_LIVES = a.lives;
    DUCK_INCREASE_SPEED = a.duck_increase_speed;
    DUCK_ON_SCREEN = a.duck_occurence;
    this._init()
}
//var s_oGame;              //当前游戏

//游戏结束面板
function CEndPanel(a) {
    var d, b, c, f, e, g;
    this._init = function(a) {
        d = createBitmap(a);
        e = new createjs.Text("", "bold 60px walibi0615bold", "#000");
        e.x = CANVAS_WIDTH / 2 + 1;
        e.y = CANVAS_HEIGHT / 2 - 160;
        e.textAlign = "center";
        f = new createjs.Text("", "bold 60px walibi0615bold", "#ffffff");
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2 - 162;
        f.textAlign = "center";
        b = new createjs.Text("", "bold 40px walibi0615bold", "#000");
        b.x = CANVAS_WIDTH / 2 + 1;
        b.y = CANVAS_HEIGHT / 2 + 50;
        b.textAlign = "center";
        c = new createjs.Text("", "bold 40px walibi0615bold", "#ffffff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 52;
        c.textAlign = "center";
        g = new createjs.Container;
        g.alpha = 0;
        g.visible = !1;
        g.addChild(d, b, c, e, f);
        s_oStage.addChild(g)
    };
    this.unload = function() {
        g.off("mousedown", this._onExit)
    };
    this._initListener = function() {
        g.on("mousedown", this._onExit)
    };
    this.show = function(a) {
        createjs.Sound.play("game_over");
        e.text = TEXT_GAMEOVER;
        f.text = TEXT_GAMEOVER;
        b.text = TEXT_SCORE + ": " + a;
        c.text = TEXT_SCORE + ": " + a;
        g.visible = !0;
        var d = this;
        createjs.Tween.get(g).to({
            alpha: 1
        },
        500).call(function() {
            d._initListener()
        });
        $(s_oMain).trigger("save_score", a)
    };
    this._onExit = function() {
        g.off("mousedown", this._onExit);
        s_oStage.removeChild(g);
        s_oGame.onExit()
    };
    this._init(a);
    return this
}
