//开始引导界面
function CHelpPanel() {
    var a, d, b, c, f, e, g, k, l, h;
    this._init = function() {
        var p;
        p = s_bMobile ? s_oSpriteLibrary.getSprite("help_panel_mobile") : s_oSpriteLibrary.getSprite("help_panel_desktop");
        l = createBitmap(p);
        s_oStage.addChild(l); ! 1 === s_bMobile ? (g = TEXT_HELP1, k = TEXT_HELP2) : (g = TEXT_HELP_MOB1, k = TEXT_HELP_MOB2);
        d = new createjs.Text(g, "bold 22px walibi0615bold", "#000000");
        d.textAlign = "left";
        d.lineWidth = 360;
        d.x = 230;
        d.y = 212;
        a = new createjs.Text(g, "bold 22px walibi0615bold", "#ffffff");
        a.textAlign = "left";
        a.lineWidth = 360;
        a.x = 232;
        a.y = 210;
        c = new createjs.Text(k, "bold 22px walibi0615bold", "#000000");
        c.textAlign = "left";
        c.lineWidth = 300;
        c.x = 230;
        c.y = 342;
        b = new createjs.Text(k, "bold 22px walibi0615bold", "#ffffff");
        b.textAlign = "left";
        b.lineWidth = 300;
        b.x = 232;
        b.y = 340;
        e = new createjs.Text(TEXT_HELP3, "bold 22px walibi0615bold", "#000000");
        e.textAlign = "left";
        e.lineWidth = 440;
        e.x = 230;
        e.y = 462;
        f = new createjs.Text(TEXT_HELP3, "bold 22px walibi0615bold", "#ffffff");
        f.textAlign = "left";
        f.lineWidth = 440;
        f.x = 232;
        f.y = 460;
        h = new createjs.Container;
        h.addChild(l, d, a, c, b, e, f);
        s_oStage.addChild(h);
        p = createBitmap(s_oSpriteLibrary.getSprite("bullet"));
        p.x = 700;
        p.y = 460;
        h.addChild(p);
        p = createBitmap(s_oSpriteLibrary.getSprite("bullet"));
        p.x = 730;
        p.y = 460;
        h.addChild(p);
        p = createBitmap(s_oSpriteLibrary.getSprite("bullet"));
        p.x = 760;
        p.y = 460;
        h.addChild(p);
        var u = this;
        h.on("pressup",
        function() {
            u._onExitHelp()
        })
    };
    this.unload = function() {
        s_oStage.removeChild(h);
        var a = this;
        h.off("pressup",
        function() {
            a._onExitHelp()
        })
    };
    this._onExitHelp = function() {
        this.unload();
        s_oGame._onExitHelp()
    };
    this._init()
}