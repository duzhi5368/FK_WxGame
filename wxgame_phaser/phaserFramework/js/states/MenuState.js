import Phaser from '../libs/phaser-wx.min.js';
import Examples from '../config/Examples.js';
import CaseRect from '../objects/CaseRect.js'
import Arrow from '../objects/Arrow.js';

export default class MenuState extends Phaser.State {
	
	constructor(game) {
		super();
		this.game = game;
	}

	create() {

    this.game.stage.backgroundColor = '#808080';

		this.menuBtnGroup = this.game.add.group();
		for(var i=0; i<Examples.length; i++) {
      var caseRect = new CaseRect(this.game, this.game.width / 2, 80 + i * 40, Examples[i]);
      caseRect.addClick(this.clickRect, {state: this, properties: Examples[i]});
      this.menuBtnGroup.add(caseRect);
		}
		this.pageSize = 10;
		this.maxPageSize = Math.ceil(Examples.length / this.pageSize);
		this.curPage = 1;
		this.enablePageInput(this.curPage);

		this.mask = this.game.add.graphics(0, 0);
    this.mask.beginFill(0xffffff);
    this.mask.drawRect(60, 0, 256, this.game.height);
    this.menuBtnGroup.mask = this.mask;

		this.arrowLeft = new Arrow(this.game, 26, this.game.height / 2, 'arrowLeft');
		this.arrowRight = new Arrow(this.game, this.game.width - 26, this.game.height / 2, 'arrowRight');

		this.arrowLeft.addClick(this.clickArrow, {state: this, dir: 'left'});
		this.arrowRight.addClick(this.clickArrow, {state: this, dir: 'right'});

		this.changeArrow(this.curPage);

	}

	clickArrow() {
		if(this.dir === 'left') {
			if(this.state.curPage > 1) {
				this.state.disablePageInput(this.state.curPage);
				this.state.curPage--;
				this.state.enablePageInput(this.state.curPage);
				this.changeArrow(this.curPage);
			}
		} else {
			if(this.state.curPage < this.state.maxPageSize) {
				this.state.disablePageInput(this.state.curPage);
				this.state.curPage++;
				this.state.enablePageInput(this.state.curPage);
				this.changeArrow(this.curPage);
			}
		}
    this.state.game.add.tween(this.state.menuBtnGroup).to({x: - (this.state.curPage - 1) * 252}, 200, "Linear", true);
	}

	clickRect() {
		this.state.game.state.start('submenu', true, false, this.properties);
	}

	enablePageInput(pageNum) {
		this.changePageInput(pageNum, true);
	}

	disablePageInput(pageNum) {
		this.changePageInput(pageNum, false);
	}

	changePageInput(pageNum, enabled) {
    for (var i = (pageNum - 1) * this.pageSize; i < pageNum * this.pageSize && i < this.menuBtnGroup.length; i++) {
      this.menuBtnGroup.getChildAt(i).inputEnabled = enabled;
		}
	}

	changeArrow(pageNum) {
		if(pageNum <= 1) {
			this.arrowLeft.showAndHide(false);
		} else {
			this.arrowLeft.showAndHide(true);
		}
		if(pageNum >= this.maxPageSize) {
			this.arrowRight.showAndHide(false);
		} else {
			this.arrowRight.showAndHide(true);
		}
	}

}
