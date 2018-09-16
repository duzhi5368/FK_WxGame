import Phaser from '../libs/phaser-wx.min.js';

export default class BootState extends Phaser.State {
	
	constructor(game) {
		super();
		this.game = game;
	}

	create() {
		// 窗口自适应
		this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		// invalid sound lock
		this.game.sound.touchLocked = false;
		
		this.game.state.start('preload');
	}

}
