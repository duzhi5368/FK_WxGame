require('./Utils.js');


function RankItem() {
  RankItem.super(this);

  this.size(574, 85);
}

Laya.class(RankItem, "RankItem", Laya.Box);
RankItem.prototype.init = function (cell,index) {
  /**
   * 先清空
   */
  this.removeChildren();

  // 排名
  this.rankIndex = this.writeText((index + 1).toString(), 45, 23, 36, "#ffffff", "center", 50, 1);
  this.addChild(this.rankIndex);
  this.rankIndex.anchorX = 0.5;

  // 头像
  this.headimg = new Laya.Image(cell.dataSource.avatarUrl);
  this.headimg.size(70, 65);
  this.headimg.pos(85, 10);
  this.addChild(this.headimg);

  // 用户昵称
  this.nickname = this.writeText(cell.dataSource.nickname, 170, 30, 25, "#ffffff", "left", 50,0);
  this.nickname.text = Utils.labelTransform(this.nickname.text,36,250);
  // this.nickname.overflow = Laya.Text.VISIBLE;
  this.addChild(this.nickname);

  // 分数
  this.score = this.writeText(Utils.GetTimeFormat(cell.dataSource.KVDataList[0].value), 270, 36, 30, "#ffffff", "right",200,1);
  this.addChild(this.score);


  //线
  this.line = new Laya.Sprite()
  this.addChild(this.line);
  this.line.graphics.drawLine(10, 81, 570, 81, "#999595", 2);
}

/**
 * 写文字
 */
RankItem.prototype.writeText = function (txt, x, y, fontSize, color, align, width,bold) {
  // 小球数量
  var label = new Laya.Label();

  label.text = txt;
  label.width = width;
  label.height = 30;
  label.valign = "middle";

  label.fontSize = fontSize;
  label.color = color;
  label.align = align;
  label.font = "SimHei";
  if (bold != 0) {
    label.bold = true;
  }

  label.x = x;
  label.y = y;

  // console.log(txt + ":" + label.measureWidth);

  return label;
}