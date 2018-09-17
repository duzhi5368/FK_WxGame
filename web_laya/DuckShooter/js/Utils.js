/*
*工具类
*/
function createBitmap(a, d, b) {
    var c = new createjs.Bitmap(a),
    f = new createjs.Shape;
    d && b ? f.graphics.beginFill("#fff").drawRect(0, 0, d, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    c.hitArea = f;
    return c
}
function createSprite(a, d, b, c, f, e) {
    a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect( - b, -c, f, e);
    a.hitArea = d;
    return a
}
function randomFloatBetween(a, d, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b))
}
//打乱顺序
function shuffle(a) {
    for (var d = a.length,b, c; 0 !== d;)
		c = Math.floor(Math.random() * d),
		--d,
		b = a[d],
		a[d] = a[c],
		a[c] = b;
    return a
}
function easeLinear(a, d, b, c) {
    return b * a / c + d
}
function easeInQuad(a, d, b, c) {
    return b * (a /= c) * a + d
}
function easeInSine(a, d, b, c) {
    return - b * Math.cos(a / c * (Math.PI / 2)) + b + d
}
function easeInCubic(a, d, b, c) {
    return b * (a /= c) * a * a + d
}
function getTrajectoryPoint(a, d) {
    var b = new createjs.Point,
    c = (1 - a) * (1 - a),
    f = a * a;
    b.x = c * d.start.x + 2 * (1 - a) * a * d.traj.x + f * d.end.x;
    b.y = c * d.start.y + 2 * (1 - a) * a * d.traj.y + f * d.end.y;
    return b
}
function formatTime(a) {
    a /= 1E3;
    var d = Math.floor(a / 60);
    a = parseFloat(a - 60 * d).toFixed(1);
    var b = "",
    b = 10 > d ? b + ("0" + d + ":") : b + (d + ":");
    return b = 10 > a ? b + ("0" + a) : b + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, d) {
    var b, c;
    b = getBounds(a, .9);
    c = getBounds(d, .98);
    return calculateIntersection(b, c)
}
function calculateIntersection(a, d) {
    var b, c, f, e, g, k, l, h;
    b = a.x + (f = a.width / 2);
    c = a.y + (e = a.height / 2);
    g = d.x + (k = d.width / 2);
    l = d.y + (h = d.height / 2);
    b = Math.abs(b - g) - (f + k);
    c = Math.abs(c - l) - (e + h);
    return 0 > b && 0 > c ? (b = Math.min(Math.min(a.width, d.width), -b), c = Math.min(Math.min(a.height, d.height), -c), {
        x: Math.max(a.x, d.x),
        y: Math.max(a.y, d.y),
        width: b,
        height: c,
        rect1: a,
        rect2: d
    }) : null
}
function getBounds(a, d) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var c = a.children,
        f = c.length,
        e, g;
        for (g = 0; g < f; g++) e = getBounds(c[g], 1),
        e.x < b.x && (b.x = e.x),
        e.y < b.y && (b.y = e.y),
        e.x + e.width > b.x2 && (b.x2 = e.x + e.width),
        e.y + e.height > b.y2 && (b.y2 = e.y + e.height);
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        var k, l;
        a instanceof createjs.Bitmap ? (f = a.sourceRect || a.image, g = f.width * d, k = f.height * d) : a instanceof createjs.Sprite ? a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image ? (f = a.spriteSheet.getFrame(a.currentFrame), g = f.rect.width, k = f.rect.height, c = f.regX, l = f.regY) : (b.x = a.x || 0, b.y = a.y || 0) : (b.x = a.x || 0, b.y = a.y || 0);
        c = c || 0;
        g = g || 0;
        l = l || 0;
        k = k || 0;
        b.regX = c;
        b.regY = l;
        f = a.localToGlobal(0 - c, 0 - l);
        e = a.localToGlobal(g - c, k - l);
        g = a.localToGlobal(g - c, 0 - l);
        c = a.localToGlobal(0 - c, k - l);
        b.x = Math.min(Math.min(Math.min(f.x, e.x), g.x), c.x);
        b.y = Math.min(Math.min(Math.min(f.y, e.y), g.y), c.y);
        b.width = Math.max(Math.max(Math.max(f.x, e.x), g.x), c.x) - b.x;
        b.height = Math.max(Math.max(Math.max(f.y, e.y), g.y), c.y) - b.y
    }
    return b
}