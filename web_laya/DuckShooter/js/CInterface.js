/*
*下面的分数面板
*/
function CInterface() {
    var a, d, b, c, f, e, g, k, l, h, p, u, n, r, t, x, B, y;
    this._init = function() {
        a = 0;
        p = [];
        y = createBitmap(s_oSpriteLibrary.getSprite("life_panel"));
        y.x = 770;
        y.y = 600;
        s_oStage.addChild(y);
        //_oButShot = new CGfxButton(897, 688, s_oSpriteLibrary.getSprite("shot_panel"), !0);
		var t_sprite =s_oSpriteLibrary.getSprite("shot_panel");
		_oButShot = createBitmap(s_oSpriteLibrary.getSprite("shot_panel"));
        _oButShot.x = 897;
        _oButShot.y = 688;
        _oButShot.regX = t_sprite.width / 2;
        _oButShot.regY = t_sprite.height / 2;
        s_oStage.addChild(_oButShot);
        //_oButShot.addEventListener(ON_MOUSE_UP, this._onShot, this);
        b = createBitmap(s_oSpriteLibrary.getSprite("hit_panel"));
        b.x = 218;
        b.y = 643;
        s_oStage.addChild(b);
        x = new createjs.Text(TEXT_HIT, "bold 30px walibi0615bold", "#ffffff");
        x.x = 238;
        x.y = 663;
        s_oStage.addChild(x);
        r = new createjs.Text(TEXT_BONUS, "bold 22px walibi0615bold", "#ffffff");
        r.x = 360;
        r.y = 658;
        s_oStage.addChild(r);
        u = new createjs.Text(TEXT_SCORE, "bold 30px walibi0615bold", "#000");
        u.x = 32;
        u.y = 12;
        s_oStage.addChild(u);
        n = new createjs.Text(TEXT_SCORE, "bold 30px walibi0615bold", "#ffffff");
        n.x = 30;
        n.y = 10;
        s_oStage.addChild(n);
        g = new createjs.Text(TEXT_NOAMMO, "bold 30px walibi0615bold", "#ffffff");
        g.x = 800;
        g.y = 670;
        g.lineWidth = 60;
        g.shadow = new createjs.Shadow("#000", 2, 2, 2);
        g.visible = !1;
        s_oStage.addChild(g);
        k = new createjs.Text("X " + PLAYER_LIVES, "bold 22px walibi0615bold", "#ffffff");
        k.x = 895;
        k.y = 630;
        k.textAlign = "right";
        k.textBaseline = "alphabetic";
        s_oStage.addChild(k);
        f = new createjs.Text("0", "bold 30px walibi0615bold", "#000");
        f.x = 172;
        f.y = 12;
        s_oStage.addChild(f);
        c = new createjs.Text("0", "bold 30px walibi0615bold", "#ffffff");
        c.x = 170;
        c.y = 10;
        s_oStage.addChild(c);
        e = new createjs.Text("", "bold 30px walibi0615bold", "yellow");
        e.textAlign = "center";
        e.shadow = new createjs.Shadow("#000", 2, 2, 2);
        t = new createjs.Text("0000", "bold 30px ComicSansMS-Bold", "#ffffff");
        t.x = 660;
        t.y = 682;
        t.textAlign = "right";
        t.textBaseline = "alphabetic";
        s_oStage.addChild(t);
        l = [];
		//创建鸭子状态
        for (var q = s_oSpriteLibrary.getSprite("hit_icon"), 
			v = new createjs.SpriteSheet({
            images: [q],
            frames: {
                width: 51,
                height: 43
            },
            animations: {
                nohit: [0],
                hit: [1]
            }
        }), z = 230, q = 0; 9 > q; q++) {
            var w = createSprite(v, "nohit", 0, 0, 51, 43);
            w.x = z;
            w.y = 710;
            w.visible = !1;
            s_oStage.addChild(w);
            l[q] = w;
            z += 58
        }
        h = [];
        v = 800;
        for (q = 0; q < NUM_BULLETS; q++)
			w = createBitmap(s_oSpriteLibrary.getSprite("bullet")),
        w.x = v,
        w.y = 680,
        s_oStage.addChild(w),
        h[q] = w,
        v += 30;
        q = s_oSpriteLibrary.getSprite("but_exit");
        //d = new CGfxButton(CANVAS_WIDTH - q.height / 2 - 10, q.height / 2 + 10, q, !0);
        //d.addEventListener(ON_MOUSE_UP, this._onExit, this);
        w = CANVAS_WIDTH - q.width / 2 - 80;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) 
			q = s_oSpriteLibrary.getSprite("audio_icon"),
        B = new CToggle(w, 10 + q.height / 2, q, s_bAudioActive),
        B.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this)
    };
    this.unload = function() {
        //d.unload();
        d = null;
		s_oStage.removeChild(_oButShot);
        //_oButShot.unload();
        _oButShot = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) B.unload(),
        B = null
    };
	//更新分数
    this.refreshScore = function(a) {
        f.text = a;
        c.text = a
    };
	//刷新时间
    this.refreshTime = function(a) {
        t.text = a
    };
	//连击
    this.viewMultiScore = function(a) {
        e.text = TEXT_MULTIPLY + " X" + a;
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(e)
    };
    this.cleanScore = function() {
        s_oStage.removeChild(e)
    };
	//刷新生命
    this.refreshLife = function(a) {
        k.text = "X " + a
    };
	
    this.refreshBullets = function(a) {
        h[a].visible = !1
    };
    this.reloadBullets = function(a) {
        for (var b = 0; b < a; b++) 
			h[b].visible = !0
    };
	//是否还有子弹
    this.noAmmo = function() {
        g.visible = !0;
        g.alpha = 1;
        createjs.Tween.get(g, {
            override: !0
        }).to({
            alpha: 0
        },
        1E3, createjs.Ease.quadIn)
    };
    this.noAmmoDelete = function() {
        g.visible = !1;
        createjs.Tween.removeTweens(g)
    };
	//设置击中状态图
    this.setHit = function() {
        p.push(!0);
        this._setVisibleDuck()
    };
	//设置没击中状态图
    this.setNoHit = function() {
        p.push(!1);
        this._setVisibleDuck()
    };
    this._setVisibleDuck = function() {
        if (8 < a) {
            for (var b = 0; 8 > b; b++) 
				! 0 === p[a - 8 + b] ? l[b].gotoAndPlay("hit") : l[b].gotoAndPlay("nohit"); ! 0 === p[a] ? l[8].gotoAndPlay("hit") : l[8].gotoAndPlay("nohit")
        } else 
			! 0 === p[a] ? (l[a].gotoAndPlay("hit"), l[a].visible = !0) : !1 === p[a] && (l[a].gotoAndPlay("nohit"), l[a].visible = !0);
        a++
    };
    this._onKeyUpReleased = function() {
        s_oGame.onKeyUpReleased()
    };
    this._onKeyDownReleased = function() {
        s_oGame.onKeyDownReleased()
    };
    this._onKeyRightReleased = function() {
        s_oGame.onKeyRightReleased()
    };
    this._onKeyLeftReleased = function() {
        s_oGame.onKeyLeftReleased()
    };
    this._onLeftPressed = function() {
        s_oGame.onLeft()
    };
    this._onRightPressed = function() {
        s_oGame.onRight()
    };
    this._onDownPressed = function() {
        s_oGame.onDown()
    };
    this._onUpPressed = function() {
        s_oGame.onUp()
    };
    this._onShot = function() {
        s_oGame.onShot()
    };
    this.onExitFromHelp = function() { (void 0).unload()
    };
    this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._init();
    return this
}