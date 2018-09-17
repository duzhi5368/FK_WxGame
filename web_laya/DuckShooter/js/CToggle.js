/*
*开关类
*/
function CToggle(a, d, b, c) {
    var f, e, g, k;
    this._init = function(a, b, c, d) {
        e = [];
        g = [];
        var n = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        f = d;
        k = createSprite(n, "state_" + f, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        k.x = a;
        k.y = b;
        k.stop();
        s_oStage.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        s_oStage.removeChild(k)
    };
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        e[a] = b;
        g[a] = c
    };
    this.setActive = function(a) {
        f = a;
        k.gotoAndStop("state_" + f)
    };
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1; ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || createjs.Sound.play("click");
        f = !f;
        k.gotoAndStop("state_" + f);
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP], f)
    };
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    };
    this._init(a, d, b, c)
}