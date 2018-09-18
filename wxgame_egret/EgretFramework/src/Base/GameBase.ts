class TextField extends egret.TextField {}
class Sprite extends egret.Sprite {}
class Shape extends egret.Shape {}
class DisplayObject extends egret.DisplayObject {}
class DisplayObjectContainer extends egret.DisplayObjectContainer {}
class Point extends egret.Point {}
class Rectangle extends egret.Rectangle {}
class Bitmap extends egret.Bitmap {}
class BitmapData extends egret.BitmapData {}
class Stage extends egret.Stage {}
class Tween extends egret.Tween {}
class Ease extends egret.Ease {}

namespace Base {
  export class GameContainer extends DisplayObjectContainer {
    protected stageWidth: number;
    protected stageHeight: number;
    public constructor() {
      super();
      this.init();
      this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
    private addToStage(): void {
      this.render();
    }
    /**加载到舞台之前调用 */
    protected init(): void {}
    /**加载到舞台之后调用 */
    protected render(): void {
      this.stageWidth = this.stage.stageWidth;
      this.stageHeight = this.stage.stageHeight;
    }
  }
  export class GameView extends GameContainer {}
  /**游戏模版 */
  export class GamePanel extends GameView {
    protected score: number; //分数
    protected level: number; //等级
    protected blood: number; //血量
    protected txtScore: TextField;
    protected txtLevel: TextField;
    protected txtBlood: TextField;
    /**加载到舞台之后调用 */
    protected render(): void {
      super.render();
      this.initView();
    }
    protected initView(): void {
      const gameBg = GameUI.getRect(this.stageWidth, this.stageHeight, 0);
      const gameName = GameUI.getText(
        this.stageWidth,
        200,
        "Hello, FKWorld",
        0xffffff,
        egret.HorizontalAlign.CENTER,
        egret.VerticalAlign.MIDDLE
      );

      this.addChild(gameBg);
      this.addChild(gameName);
    }
  }
}
