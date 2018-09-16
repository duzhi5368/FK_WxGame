import Phaser from 'libs/phaser-wx.min.js'

import BootState from 'states/BootState.js'
import PreloadState from 'states/PreloadState.js'
import AnimationState from 'states/AnimationState.js'
import MenuState from 'states/MenuState.js'
import SubMenuState from 'states/SubMenuState.js'

import BasicExamples from 'basic/index.js';
import GameExamples from 'game/index.js';
import OpenExamples from 'open/index.js';

// 保存原始的canvas
wx.originContext = canvas.getContext('2d');
let size = { w: 375, h: 667 }
let screenSize = { w: 320, h: 568 }

// 使用Phaser创建Canvas
var game = new Phaser.Game({
  width: size.w,
  height: size.h,
  renderer: Phaser.CANVAS,
  canvas: canvas
});

// 屏幕数据
screenSize.w = window.innerWidth
screenSize.h = window.innerHeight
console.log('屏幕尺寸: ', screenSize.w, 'x', screenSize.h)

// 添加游戏状态
game.state.add('boot', new BootState(game));
game.state.add('preload', new PreloadState(game));
game.state.add('animation', new AnimationState(game));
game.state.add('menu', new MenuState(game));
game.state.add('submenu', new SubMenuState(game));

new BasicExamples(game);
new GameExamples(game);
new OpenExamples(game);

// 启动
game.state.start('boot');
