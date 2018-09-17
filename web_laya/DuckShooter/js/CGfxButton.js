//按钮控件
function CGfxButton(a, d, b) {
    var c, f, e;
    this._init = function(a, b, d) {
        c = [];
        f = [];
        e = createBitmap(d);
        e.x = a;
        e.y = b;
        e.regX = d.width / 2;
        e.regY = d.height / 2;
        s_oStage.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", this.buttonDown);
        e.off("pressup", this.buttonRelease);
        s_oStage.removeChild(e)
    };
    this.setVisible = function(a) {
        e.visible = a
    };
    this._initListener = function() {
        e.on("mousedown", this.buttonDown);
        e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        c[a] = b;
        f[a] = d
    };
    this.buttonRelease = function() {
        e.scaleX = 1;
        e.scaleY = 1;
        c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(f[ON_MOUSE_UP])
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        e.x = a;
        e.y = b
    };
    this.setX = function(a) {
        e.x = a
    };
    this.setY = function(a) {
        e.y = a
    };
    this.getButtonImage = function() {
        return e
    };
    this.getX = function() {
        return e.x
    };
    this.getY = function() {
        return e.y
    };
    this._init(a, d, b);
    return this
}