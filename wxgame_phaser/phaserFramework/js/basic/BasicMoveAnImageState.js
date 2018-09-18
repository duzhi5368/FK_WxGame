import Phaser from '../libs/phaser-wx.min.js';
import BackToSubMenuState from '../base/BackToSubMenuState.js';

export default class BasicMoveAnImageState extends BackToSubMenuState {
  
  constructor(game) {
    super();
    this.game = game;
  }

  init(key) {
    super.init(key);
  }

  preload() {
    // 加载一个图片，之后可通过 einstein 来引用
    this.game.load.image('einstein', 'assets/basic/ra_einstein.jpg');
  }

  create() {
    super.create();
    
    this.sprite = this.game.add.sprite(0, this.game.height / 2, 'einstein');
    // 精灵启动物理引擎
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    // 设置水平速度150
    this.sprite.body.velocity.x = 150;
  }

  update(){
    if (this.sprite.x >= this.game.width) {
      this.sprite.body.velocity.x = -150;
    }

    if (this.sprite.x <= 0) {
      this.sprite.body.velocity.x = 150;
    }
  }
}
