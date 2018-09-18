import Phaser from '../libs/phaser-wx.min.js';
import BackToSubMenuState from '../base/BackToSubMenuState.js';

export default class OpenSetCloudScoreState extends BackToSubMenuState {
  
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
    
    // 随机一个score
    this.score = this.game.rnd.integerInRange(0, 100)

    var text = "点击保存数据到云端：" + this.score;
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

    var scoreValue = this.score;
    var t = this.t

    wx.setUserCloudStorage({
      KVDataList: [{
        key: "score",
        value: scoreValue + ""
      }],
      success: function() {
        t.setText('保存数据 score = ' + scoreValue + ' 成功');
      },
      fail: function() {
        t.setText('保存数据 score = ' + scoreValue + ' 失败');
      },
      complete: function() {
        t.setText('保存数据 score = ' + scoreValue + ' 完成');
      }
    });
  }

}
