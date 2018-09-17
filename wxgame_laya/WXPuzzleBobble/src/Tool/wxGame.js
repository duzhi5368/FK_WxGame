
/**
 * wxGame
 */
var wxGame = (function (_super) {

    Laya.class(wxGame, "wxGame", _super);
    var _proto = wxGame.prototype;

    var instance;

    function getInstance() {
        if (instance === undefined) {
            instance = new wxGame();
        }
        return instance;
    }
    function wxGame() {
        //无父类
        // wxGame.super(this);
    }

    _proto.sharedCanvasTexture = null;
    /**当前微信版本 */
    var wxSDKVersion;
    //游戏圈按钮
    _proto.btn_club = null;

    _proto.Init = function () {

        if (Browser.onMiniGame) {

            wx.getSystemInfo({
                success: function (res) {
                    Gamelog("getSystemInfo SDKVersion="+ res.SDKVersion);
                    wxSDKVersion = res.SDKVersion;
                }
            });


            wx.showShareMenu({
                withShareTicket: false
            });

            var shareInfoArr = this.shareInfo();
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: shareInfoArr[0],
                    imageUrl: shareInfoArr[1]
                }
            })
            //监听小游戏回到前台的事件
            wx.onShow(function () {
                Gamelog("--------------wx.onShow");
                MusicManager.getInstance().playMusic("res/music/1.mp3")

                //小游戏更新
                if (typeof wx.getUpdateManager === 'function') {
                    console.log('支持 wx.getUpdateManager')
                    var updateManager = wx.getUpdateManager()

                    updateManager.onCheckForUpdate(function (res) {
                        // 请求完新版本信息的回调
                        console.log("----更新" + res.hasUpdate)
                    })

                    updateManager.onUpdateReady(function () {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                    })

                    updateManager.onUpdateFailed(function () {
                        // 新的版本下载失败
                    })
                }
            })

            Laya.timer.once(400, this, function () {
                var sharedSprite = new Laya.Sprite();
                sharedSprite.zOrder = 400;
                sharedSprite.name = "OpenDataContext";
                Laya.stage.addChild(sharedSprite);
                sharedSprite.visible = false;

                Browser.window.sharedCanvas.width = Laya.stage.width;
                Browser.window.sharedCanvas.height = Laya.stage.height;

                sharedCanvasTexture = new Laya.Texture(Browser.window.sharedCanvas);
                // sharedCanvasTexture.bitmap.alwaysChange = true;//小游戏使用，非常费，每帧刷新
                // Gamelog("sharedCanvasTexture.width = " + sharedCanvasTexture.width + "\nsharedCanvasTexture.height = " + sharedCanvasTexture.height);
                sharedSprite.graphics.drawTexture(sharedCanvasTexture, 0, 0, sharedCanvasTexture.width, sharedCanvasTexture.height);
            });
        }
    }

    /**
     * 登陆并返回用户数据
     */
    _proto.login = function (callback) {
        if (Browser.onMiniGame) {
            wx.getSetting({
                success: function (res) {
                    var authSetting = res.authSetting
                    if (authSetting['scope.userInfo'] === true) {
                        // 用户已授权，可以直接调用相关 API
                        Gamelog("用户已授权");
                        // wxGame.getInstance().wxLogin(callback);
                        wxLogin(callback);
                    } else if (authSetting['scope.userInfo'] === false) {
                        // 用户已拒绝授权，再调用相关 API 或者 wx.authorize 会失败，需要引导用户到设置页面打开授权开关
                        Gamelog("用户已拒绝授权");
                        // wx.openSetting({
                        //     success:function (params) {}
                        // })
                        showUserInfoButton();
                    } else {
                        // 未询问过用户授权，调用相关 API 或者 wx.authorize 会弹窗询问用户
                        Gamelog("未询问过用户授权");
                        wx.authorize({
                            scope: 'scope.userInfo'
                        })
                    }
                }
            })
        }
    }

    wxLogin = function (callback) {
        wx.login({
            success: function () {
                Gamelog("login success");
                wx.getUserInfo({
                    success: function (res) {
                        GameLogObject(res);

                        var userInfo = res.userInfo
                        var nickName = userInfo.nickName
                        var avatarUrl = userInfo.avatarUrl
                        var gender = userInfo.gender //性别 0：未知、1：男、2：女
                        var province = userInfo.province
                        var city = userInfo.city
                        var country = userInfo.country
                        Gamelog("userInfo.nickName" + userInfo.nickName);
                        callback(userInfo);
                    }
                })
            },
            fail: function () {
                Gamelog("login fail");
            }
        })
    }

    showUserInfoButton = function () {
        var button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            image: "images/huangguan.png",
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                // backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        });

        button.onTap(function (res) {
            console.log(res)
        })
    }


    /**
     * 发送数据
     */
    _proto.postMessage = function (data, isShowOpenData) {
        if (Browser.onMiniGame) {
            wx.postMessage(data);
            if (isShowOpenData) {
                this.showOpenDataContext(isShowOpenData);
            }
        }
    }

    /**
     * 上传分数
     */
    _proto.uploadUserScore = function (score) {
        if (Browser.onMiniGame) {
            this.postMessage({
                act: "updateScore",
                score: score
            }, true);
        }
    }

    /**
     * 显示或者关闭 开放域数据
     */
    _proto.showOpenDataContext = function (visible) {
        if (Browser.onMiniGame) {
            if (visible == false) {
                this.postMessage({
                    act: "clearChildren",
                }, false);
            }
            var openData = Laya.stage.getChildByName("OpenDataContext");
            openData.visible = visible;
            sharedCanvasTexture.bitmap.alwaysChange = visible;
        }
    }

    _proto.shareInfo = function () {
        var shareInfoArr = new Array();
        var rand = Math.random() * 4 + 1;
        rand = parseInt(rand, 10);
        
        var str = "";
        switch (rand) {
            case 1:
                str = "最好玩的泡泡龙，快来比试一下吧！";
                break;
            case 2:
                str = "[有人@我]小姐姐，小姐姐，我有个游戏你玩吗？";
                break;
            case 3:
                str = "[有人@我]小哥哥，小哥哥，我有个游戏你玩吗？";
                break;
            case 4:
                str = "这个游戏有点怪，怪好玩的！";
                break;
        }

        var rand2 = Math.random() * 2 + 1;
        rand2 = parseInt(rand2, 10);
        var strImage = "game/shard.png";

        shareInfoArr.push(str);
        shareInfoArr.push(strImage);

        return shareInfoArr;
    }

    /**分享游戏 */
    _proto.shareGame = function () {

        var shareInfoArr = this.shareInfo();

        this.share(shareInfoArr[0], shareInfoArr[1]);
    }

    /**
     * 分享
     */
    _proto.share = function (title, image) {
        if (Browser.onMiniGame) {
            wx.shareAppMessage({
                title: title,
                imageUrl: image,
                success: function (msg) {
                    console.log('share success', msg)
                },
                fail: function (msg) {
                    console.log('share fail', msg)
                }
            })
        }
    }

    /**显示微信游戏圈 */
    _proto.showClubBtn = function(_show){
        if (Browser.onMiniGame) {

            if(compareVersion(wxSDKVersion,"2.0.3") < 0){
                return;
            }
            if(this.btn_club == null){
                // this.btn_club.destroy();
                this.btn_club = wx.createGameClubButton({
                    icon: 'white',
                    style: {
                        left: 10,
                        top: 70,
                        width: 40,
                        height: 40
                    }
                })
            }

            if(_show){
                this.btn_club.show();
            }else{
                this.btn_club.hide();
            }
            
        }
    }

    return {
        getInstance: getInstance
    }
})();