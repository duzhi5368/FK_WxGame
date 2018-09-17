/**当前微信版本 */
window.wxSDKVersion;
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
    _proto.shareSp = null;
    //两个广告切换
    _proto.bannerAd_1 = null;
    _proto.bannerAd_2 = null;
    //视频广告
    _proto.videoAd = null;
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
                Gamelog("sharedCanvasTexture.width = " + sharedCanvasTexture.width + "\nsharedCanvasTexture.height = " + sharedCanvasTexture.height);
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
        var rand = Math.random() * 3 + 1;
        rand = parseInt(rand, 10);
        rand = 1;
        
        var str = "";
        switch (rand) {
            case 1:
                str = "【好基友@你】人在塔在！快来守护住你们的水晶枢纽吧！";
                break;
            case 2:
                str = "以前爱不释手的泡泡龙，我都玩上万分了！";
                break;
            case 3:
                str = "这游戏，你能打到上万分算我输！";
                break;

            default:
                str = "最经典的泡泡龙，你敢与我一决高下吗？";
                break;
        }

        var rand2 = Math.random() * 2 + 1;
        rand2 = parseInt(rand2, 10);
        rand2 = 1;
        var strImage = "res/openDataRes/share" + rand2 + ".png";

        shareInfoArr.push(str);
        shareInfoArr.push(strImage);

        return shareInfoArr;
        // wxGame.getInstance().share(str, strImage);
    }

    //分享游戏
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
        // else {
        //     callback(1);
        // }
    }

    //显示头像
    _proto.showFriendAvatar = function (x, y, width, height, isClearOthers) {
        this.postMessage({
            act: "showFriendAvatar",
            x: x,
            y: y,
            width: width,
            height: height,
            isClearOthers: isClearOthers
        }, true);
    }

    //结束界面
    _proto.showEndFriends = function () {
        this.postMessage({
            act: "showEndFriends"
        }, true);
    }

    //分享分数
    _proto.shareScore = function(scoreNum,callback){
        if (Browser.onMiniGame) {

            if (this.shareSp != null) {
                this.shareSp.destroy();
            }
            this.shareSp = new Laya.Sprite();
            this.shareSp.loadImage("res/openDataRes/shareScore.png");
            var scoreTxt = new Laya.Label(scoreNum + "");
            scoreTxt.font = "shuzi";
            // scoreTxt.fontSize = 50;
            scoreTxt.scale(0.8,0.8);
            scoreTxt.anchorX = 0.5;
            scoreTxt.anchorY = 0.5;
            scoreTxt.align = "center";
            scoreTxt.pos(165, 92);
            this.shareSp.addChild(scoreTxt);

            var t_titleData = getTitleDataBySocre(scoreNum);

            var scoreTitle = new Laya.Label(t_titleData.name);
            scoreTitle.fontSize = 35;
            scoreTitle.anchorX = 0.5;
            scoreTitle.anchorY = 0.5;
            scoreTitle.align = "center";
            scoreTitle.color = t_titleData.color;
            scoreTitle.pos(155, 203);
            this.shareSp.addChild(scoreTitle);


            

            Laya.timer.frameOnce(20, this, function () {
                var shareWidth = 500;
                var shareHeight = 400;
                // var title = "我得分达到了" + scoreNum + "，你能超越我吗？";
                var title = "我的得分超过你啦，快来与我一决高下！";
                var htmlC = this.shareSp.drawToCanvas(shareWidth, shareHeight, 0, 0);
                var canvas = htmlC.getCanvas();
                Laya.timer.frameOnce(20, this, function () {
                    canvas.toTempFilePath({
                        x: 0,
                        y: 0,
                        width: shareWidth,
                        height: shareHeight,
                        destWidth: shareWidth,
                        destHeight: shareHeight,
                        success: function (res) {
                            wx.shareAppMessage({
                                imageUrl: res.tempFilePath,
                                title: title
                            })
                            callback();
                        }
                    })

                });
            });

        }
    }

    //显示广告
    _proto.showAD = function (AdIndex) {
         if (!Browser.onMiniGame) {
             return;
         }
        var adIndex = 0;
        Gamelog("showAD");
        // this.bannerAd_2 = this.createAD(this.bannerAd_2, "adunit-67eeb844f59509d0", this.bannerAd_1);
        // Laya.timer.loop(30000, this, function () {
        //     Gamelog("adIndex = " + adIndex);
        //     adIndex++;
        //     if (adIndex % 2 == 0) {
        //         // this.bannerAd_1 = this.createAD(this.bannerAd_1, "adunit-ee34510033de8989", this.bannerAd_2);
        //         this.bannerAd_2 = this.createAD(this.bannerAd_2, "adunit-67eeb844f59509d0", this.bannerAd_1);
        //     }
        //     else {
        //         this.bannerAd_2 = this.createAD(this.bannerAd_2, "adunit-67eeb844f59509d0", this.bannerAd_1);
        //     }
        // });
        var isPass = false;
        wx.getSystemInfo({
            success: function (res) {
                Gamelog("getSystemInfo SDKVersion="+ res.SDKVersion);
                var isPassNum = compareVersion(res.SDKVersion,"2.0.4");
                if(isPassNum >= 0){
                    isPass = true;
                }
            }
        }); 
        if(!isPass){
            return;
        }

        if (AdIndex == 0) {
            this.bannerAd_2.hide();
        }
        else {
            var AdID = null;
            switch (AdIndex) {
                //开始
                case 1:
                    AdID = "adunit-a3b210c4532d1370";
                    break;
                //游戏
                case 2:
                    AdID = "adunit-a8c6ef7647f7c2a6";
                    break;

                default:
                    break;
            }
            
            if(isPass)
                this.bannerAd_2 = this.createAD(this.bannerAd_2, AdID, this.bannerAd_1);
        }
    }

    //创建广告
    _proto.createAD = function (Ad, AdID, hideAd) {
        if (Browser.onMiniGame) {
            
            if (Ad != null) {
                Gamelog("destroy");
                Ad.destroy();
            }

            Gamelog("create ad " + AdID);
            if(wx.createBannerAd == null){
                return;
            }
            Ad = wx.createBannerAd({
                adUnitId: AdID,
                style: {
                    left: 0,
                    top: 0,
                    width: 300
                }
            })
            Ad.show();

            var sysInfo = wx.getSystemInfoSync();

            // this.bannerAd.style.width = sysInfo.screenWidth;

            // var tempAd = Ad;
            Ad.onResize(function (res) {
                // console.log(res.width, res.height);
                // console.log(tempAd.style.realWidth, tempAd.style.realHeight);
                Ad.style.top = sysInfo.screenHeight - 86;
                Ad.style.left = (sysInfo.screenWidth - Ad.style.realWidth) / 2;
            })

            Ad.onLoad(function () {
                // console.log('banner 广告加载成功')
                if (hideAd != null) {
                    Gamelog("hideAd destroy");
                    // hideAd.destroy();
                    // hideAd.hide();
                }
            })

        }

        return Ad;
    }

     //显示广告
    _proto.createVideoAD = function () {
         if (!Browser.onMiniGame) {
             return;
         }
        Gamelog("createVideoAD-----");

        var isPass = false;
        wx.getSystemInfo({
            success: function (res) {
                Gamelog("getSystemInfo SDKVersion="+ res.SDKVersion);
                var isPassNum = compareVersion(res.SDKVersion,"2.0.4");
                if(isPassNum >= 0){
                    isPass = true;
                }
            }
        }); 
        if(!isPass){
            return;
        }
        
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: 'adunit-02b50b30ad61154f'
        });

        var t_videoAd = this.videoAd;
        this.videoAd.load().then(function () {
            Gamelog("createVideoAD 拉取成功");
            // this.videoAd.show();
        }).catch( function(err){
            Gamelog("createVideoAD 拉取失败");
            t_videoAd.load();
            console.log(err.errMsg)
        })
    }

    /**微信官方对比版本号 */
    function compareVersion(v1, v2) {
        v1 = v1.split('.')
        v2 = v2.split('.')
        var len = Math.max(v1.length, v2.length)
        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(v1[i])
            var num2 = parseInt(v2[i])
            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }
        return 0
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
                        top: 50,
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