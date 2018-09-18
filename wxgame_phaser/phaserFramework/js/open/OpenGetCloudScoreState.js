import Phaser from '../libs/phaser-wx.min.js';
import BackToSubMenuState from '../base/BackToSubMenuState.js';

export default class OpenGetCloudScoreState extends BackToSubMenuState {
  
  constructor(game) {
    super();
    this.game = game;
  }

  init(key) {
    super.init(key);
  }

  preload() {
  }

  create() {
    super.create();
    
    var text = "点击读取云端 score 数据";
    // 文字样式
    var style = { font: "22px Arial", fill: "#ff0044", align: "center" };
    // 显示文字
    this.t = this.game.add.text(this.game.world.centerX - 160, 300, text, style);
    // 开启输入
    this.t.inputEnabled = true;
    // 文字点击时回调listener，上下文为this
    this.t.events.onInputDown.add(this.listener, this);

  }

  listener() {

    // 调用OpenData
    // getUserCloudStorage必须在开放域进行，所以在openData的index.js里面执行
    var openDataContext = wx.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    var openCanvas = this.game.add.sprite(0, 100, Phaser.XTexture(sharedCanvas, 0, 0, 375, 200));

    openDataContext.postMessage({
      action: 'GET_SCORE'
    })
  }

}
