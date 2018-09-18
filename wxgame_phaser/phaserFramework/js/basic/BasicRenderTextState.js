import Phaser from '../libs/phaser-wx.min.js';
import BackToSubMenuState from '../base/BackToSubMenuState.js';

export default class BasicRenderTextState extends BackToSubMenuState {
  
  constructor(game) {
    super();
    this.game = game;
  }

  init(key) {
    super.init(key);
  }

  create() {
    super.create();
    
    var text = "- phaser\ntest\n中文测试\n繁體測試 .";
    // 文字样式
    var style = { font: "32px Arial", fill: "#ff0044", align: "center" };
    // 显示文字
    var t = this.game.add.text(this.game.world.centerX - 160, 100, text, style);
  }

}
