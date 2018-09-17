/*
*菜单界面
*/
function CMenu() {
    var a, d, b, c;
    this._init = function() {
		//背景
        a = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(a);
		//开始游戏
        var f = s_oSpriteLibrary.getSprite("but_play");
        d = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80, f, TEXT_PLAY, "walibi0615bold", "#ffffff", 40);
        d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
		/*/退出游戏
        var e, f = s_oSpriteLibrary.getSprite("but_exit");
        _oButExit = new CGfxButton(CANVAS_WIDTH - f.height / 2 - 10, f.height / 2 + 10, f, !0);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        e = CANVAS_WIDTH - f.width / 2 - 80;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
			f = s_oSpriteLibrary.getSprite("audio_icon"),
		*/
		
		var e,f = s_oSpriteLibrary.getSprite("audio_icon");
		e = CANVAS_WIDTH - f.width / 2 - 80;
		//音乐开关
        c = new CToggle(e, 10 + f.height / 2, f, s_bAudioActive),
        c.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        s_oSoundTrack.setVolume(1);
		//过渡动画
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(b);
        createjs.Tween.get(b).to({
            alpha: 0
        },
        1000).call(function() {
            b.visible = !1
        })
    };
    this.unload = function() {
        d.unload();
        d = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) c.unload(),
        c = null;
        s_oStage.removeChild(a);
        a = null
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButPlayRelease = function() {
        this.unload();
		! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        s_oMain.gotoGame()
    };
    this._init()
}