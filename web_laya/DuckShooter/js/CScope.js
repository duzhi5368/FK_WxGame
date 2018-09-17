/*
*得分瞄准器类
*/
function CScope() {
    var a, d, b, c, f = !1,
    e = !1,
    g = !1,
    k = !1,
    l, h, p, u;
    this._init = function() {
        a = 88;
        d = 87.5;
        h = l = 0;
		//瞄准镜
        var e = s_oSpriteLibrary.getSprite("scope");
        b = createBitmap(e);
        b.x = CANVAS_WIDTH / 2 - a;
        b.y = CANVAS_HEIGHT / 2 - d;
        s_oStage.addChild(b);
        e = {
            images: [s_oSpriteLibrary.getSprite("tap_shot")],
            frames: {
                width: 200,
                height: 200,
                regX: 100,
                regY: 100
            },
            animations: {
                show: [0, 19, "hide"],
                hide: [20, 21]
            }
        };
        e = new createjs.SpriteSheet(e);
        c = createSprite(e, "hide", 100, 100, 200, 200);
        c.addEventListener("animationend", this.onAnimationEnd);
        c.stop();
        c.visible = !1;
        s_oStage.addChild(c)
    };
    this.unload = function() {
        c.removeEventListener("animationend", oParent.onAnimationEnd)
    };
    this.resetAllDirection = function() {
        k = g = e = f = !1
    };
    this.onAnimationEnd = function() {
        c.visible = !1
    };
	//播放开枪
    this.playShot = function() {
        c.x = b.x + a;
        c.y = b.y + d;
        c.visible = !0;
        c.gotoAndPlay("show"); ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("shot")
    };
    this._checkBoundary = function() {
        b.x + a > CANVAS_WIDTH && (b.x = CANVAS_WIDTH - a);
        0 > b.x + a && (b.x = -a);
        b.y + d > CANVAS_HEIGHT && (b.y = CANVAS_HEIGHT - d);
        0 > b.y + d && (b.y = -d)
    };
    this.bullsEye = function() {
        p = b.x + a;
        u = b.y + d;
        return {
            x: p,
            y: u
        }
    };
    this.upStop = function() {
        g = !1
    };
    this.downStop = function() {
        k = !1
    };
    this.leftStop = function() {
        f = !1
    };
    this.rightStop = function() {
        e = !1
    };
    this.moveLeft = function() {
        f = !0
    };
    this.moveRight = function() {
        e = !0
    };
    this.moveUp = function() {
        g = !0
    };
    this.moveDown = function() {
        k = !0
    };
    this.getSprite = function() {
        return b
    };
    this.update = function() {
        e && g ? (l += SCOPE_ACCELERATION, h -= SCOPE_ACCELERATION) : e && k ? (l += SCOPE_ACCELERATION, h += SCOPE_ACCELERATION) : f && k ? (l -= SCOPE_ACCELERATION, h += SCOPE_ACCELERATION) : f && g ? (l -= SCOPE_ACCELERATION, h -= SCOPE_ACCELERATION) : f ? l -= SCOPE_ACCELERATION: e ? l += SCOPE_ACCELERATION: g ? h -= SCOPE_ACCELERATION: k && (h += SCOPE_ACCELERATION);
        b.x += l;
        b.y += h;
        l *= SCOPE_FRICTION;
        h *= SCOPE_FRICTION;
        l > MAX_SCOPE_SPEED && (l = MAX_SCOPE_SPEED);
        l < -MAX_SCOPE_SPEED && (l = -MAX_SCOPE_SPEED);
        h > MAX_SCOPE_SPEED && (h = MAX_SCOPE_SPEED);
        h < -MAX_SCOPE_SPEED && (h = -MAX_SCOPE_SPEED);.2 > Math.abs(l) && (l = 0);.2 > Math.abs(h) && (h = 0);
        this._checkBoundary()
    };
	this.setPos = function(x,y){
		b.x = x -a;
        b.y = y -a;
	}
    this._init()
}