//鸭子对象类
function CDuck(a) {
    var d, b, c, f, e, g, k, l, h, p, u, n, r, t, x;
    this._init = function(a) {
        b = 0;
        c = DUCK_START_SPEED;
        f = 200;
        d = 102;
        g = 300;
        l = !1;
        p = [];
        u = a;
        a = {
            images: [s_oSpriteLibrary.getSprite("duck_1")],
            frames: {
                width: 200,
                height: 204,
                regX: 100,
                regY: 102
            },
            animations: {
                fly: [0, 6, "fly"],
                hit: [7, 15, "hit_stop"],
                hit_stop: [15],
                fall: [16, 44, "fall"]
            }
        };
        var e = {
            images: [s_oSpriteLibrary.getSprite("duck_2")],
            frames: {
                width: 200,
                height: 204,
                regX: 100,
                regY: 102
            },
            animations: {
                fly: [0, 6, "fly"],
                hit: [7, 15, "hit_stop"],
                hit_stop: [15],
                fall: [16, 44, "fall"]
            }
        },
        h = {
            images: [s_oSpriteLibrary.getSprite("duck_3")],
            frames: {
                width: 200,
                height: 204,
                regX: 100,
                regY: 102
            },
            animations: {
                fly: [0, 6, "fly"],
                hit: [7, 15, "hit_stop"],
                hit_stop: [15],
                fall: [16, 44, "fall"]
            }
        },
        k = {
            images: [s_oSpriteLibrary.getSprite("duck_4")],
            frames: {
                width: 200,
                height: 204,
                regX: 100,
                regY: 102
            },
            animations: {
                fly: [0, 6, "fly"],
                hit: [7, 15, "hit_stop"],
                hit_stop: [15],
                fall: [16, 44, "fall"]
            }
        };
		//设置范围
        r = new createjs.Rectangle(0, 0, 160, 80);
		//四个动画状态
        p[0] = new createjs.SpriteSheet(a);
        p[1] = new createjs.SpriteSheet(e);
        p[2] = new createjs.SpriteSheet(h);
        p[3] = new createjs.SpriteSheet(k);
        n = createSprite(p[0], "fly", 100, 102, 200, 204);
        n.visible = !1;
        n.stop();
        u.addChild(n)
    };
	//随机换图
    this._changeSprite = function() {
        var a = Math.floor(4 * Math.random());
        n.spriteSheet = p[a]
    };
    this._calculateMid = function() {
        var a;
        a = t.x > x.x ? new createjs.Point(t.x + .2 * (t.x - x.x), x.y - d / 2) : new createjs.Point(x.x - .2 * (x.x - t.x), x.y - d / 2);
        h = {
            start: t,
            end: x,
            traj: a
        }
    };
    this._selectInterpolation = function() {
        e = Math.floor(2 * Math.random())
    };
	//重置对象 出生点 目标点
    this.reset = function(a, b) {
        this._changeSprite();
        createjs.Tween.removeTweens(n);
        n.x = a.x;
        n.y = a.y;
        t = a;
        x = b;
        l = !1;
        g = 300;
        this._calculateMid();
        this._selectInterpolation()
    };
    this.increaseSpeed = function() {
        c += DUCK_INCREASE_SPEED
    };
    this.unload = function() {
        u.removeChild(n)
    };
	//显示播放动画
    this.show = function() {
        t.x < CANVAS_WIDTH / 2 && (n.scaleX = -1);
        t.x > CANVAS_WIDTH / 2 && (n.scaleX = 1);
        n.visible = !0;
        n.gotoAndPlay("fly");
        k = !0
    };
    this.unShow = function() {
        n.visible = !1
    };
    this._updateRect = function() {
        r.x = n.x - 80;
        r.y = n.y - 40
    };
    this.target = function() {
        return {
            x: r.x,
            y: r.y,
            w: r.width,
            h: r.height
        }
    };
    this.setVisible = function() {
        n.visible = !0
    };
    this.isVisible = function() {
        return n.visible
    };
	//被射击，播放受伤动画
    this.onHit = function() {
        n.alpha = 1;
        n.gotoAndPlay("hit");
        b = 0;
        k = l = !0
    };
    this.getSprite = function() {
        return n
    };
    this.getPos = function() {
        return {
            x: n.x,
            y: n.y
        }
    };
    this.isHit = function() {
        return l
    };
	//更新飞行状态
    this._updateFly = function() {
        b += c;
		//飞出边界 设置没击中
        b > f && (b = 0, k = n.visible = !1, s_oGame.setNoHitPane(), s_oGame.checkDuck(), s_oGame.subtractLife());
        var a;
        switch (e) {
        case 0:
            a = easeLinear(b, 0, 1, f);
            break;
        case 1:
            a = easeInSine(b, 0, 1, f)
        }
        a = getTrajectoryPoint(a, h);
        n.x = a.x;
        n.y = a.y;
        this._updateRect()
    };
	//更新掉落状态
    this._updateFall = function() {
        createjs.Tween.get(n).to({
            y: CANVAS_HEIGHT
        },
        1E3, createjs.Ease.quadIn).call(function() {
            s_oGame.checkDuck()
        }).call(function() {
            s_oGame.setHitPane()
        })
    };
    this.update = function() {
        if (k) switch (n.currentAnimation) {
        case "fly":
            this._updateFly();
            break;
        case "hit_stop":
            g -= s_iTimeElaps;
            0 > g && (g = 300, n.gotoAndPlay("fall"));
            break;
        case "fall":
            this._updateFall(),
            k = !1
        }
    };
    this._init(a)
};