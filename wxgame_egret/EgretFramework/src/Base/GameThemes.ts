namespace Base {
  export class GameUI {
    /**得到文字*/
    public static getText(
      w: number = 100,
      h: number = 50,
      t: string,
      c: number = 0xffffff,
      a: string = egret.HorizontalAlign.CENTER,
      l: string = egret.VerticalAlign.MIDDLE
    ): TextField {
      let s: TextField = new TextField();
      s.width = w;
      s.height = h;
      s.text = t;
      s.textColor = c;
      s.textAlign = a;
      s.verticalAlign = l;

      return s;
    }

    /**得到矩形*/
    public static getRect(
      w: number,
      h: number,
      c: number = 0,
      x: number = 0,
      y: number = 0
    ): Sprite {
      let s: Sprite = new Sprite();
      s.graphics.beginFill(c);
      s.graphics.drawRect(x, y, w, h);
      s.graphics.endFill();
      return s;
    }

    /**得到圆角矩形*/
    public static getRoundRect(
      w: number,
      h: number,
      c: number = 0,
      ew: number = 5,
      eh: number = 5,
      x: number = 0,
      y: number = 0
    ): Sprite {
      let s: Sprite = new Sprite();
      s.graphics.beginFill(c);
      s.graphics.drawRoundRect(x, y, w, h, ew, eh);
      s.graphics.endFill();
      return s;
    }

    /**得到圆形*/
    public static getCircle(
      r: number,
      c: number = 0,
      x: number = 0,
      y: number = 0
    ): Sprite {
      let s: Sprite = new Sprite();
      s.graphics.beginFill(c);
      s.graphics.drawCircle(x, y, r);
      s.graphics.endFill();
      return s;
    }

    /**得到多边形,side边数,rotation角度*/
    public static getPolygon(
      side: number = 3,
      r: number = 10,
      c: number = 0,
      rotation: number = 0
    ): Sprite {
      let s: Sprite = new Sprite();
      s.rotation = rotation;
      s.graphics.beginFill(c);
      for (let i: number = 0; i <= side; i++) {
        let lineX: number = Math.cos((i * (360 / side) * Math.PI) / 180) * r;
        let lineY: number = Math.sin((i * (360 / side) * Math.PI) / 180) * r;
        if (i == 0) s.graphics.moveTo(lineX, lineY);
        else s.graphics.lineTo(lineX, lineY);
      }
      s.graphics.endFill();
      return s;
    }
  }
}
