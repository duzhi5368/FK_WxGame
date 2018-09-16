import Phaser from '../libs/phaser-wx.min.js';
import BackToSubMenuState from '../base/BackToSubMenuState.js';

export default class OpenShowOpenCanvasState extends BackToSubMenuState {
  
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
    
    var text = "点击查看腾讯开放数据画布";
    // 文字样式
    var style = { font: "22px Arial", fill: "#ff0044", align: "center" };
    // 显示文字
    this.t = this.game.add.text(this.game.world.centerX - 160, 100, text, style);
    // 开启输入
    this.t.inputEnabled = true;
    // 文字点击时回调listener，上下文为this
    this.t.events.onInputDown.add(this.listener, this);

  }

  listener() {

    var openDataContext = wx.getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;

    var openCanvas = this.game.add.sprite(50, 250, Phaser.XTexture(sharedCanvas, 0, 0, 300, 300));

  }

}
