import Phaser from '../../../libs/phaser-wx.min.js'

var ballDistance = 120;
var rotationSpeed = 4;
var angleRange = [25, 155];
var visibleTargets = 7;
var bgColors = [0x62bd18, 0xffbb00, 0xff5300, 0xd21034, 0xff475c, 0x8f16b2];

//window.onload = function() {	
//	game = new Phaser.Game(640, 960, Phaser.CANVAS, "");
//     game.state.add("PlayGame", playGame);
//     game.state.start("PlayGame");
//}

export default class CirclePathGameState extends Phaser.State {

  constructor(game) {
    super();
    this.game = game;
  }


      preload(){
        this.game.load.image("ball", "assets/circlepath/images/ball.png");
        this.game.load.image("target", "assets/circlepath/images/target.png");
        this.game.load.image("arm", "assets/circlepath/images/arm.png");
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      }

      create(){
        // 读取存储积分
        //this.savedData = localStorage.getItem("circlepath")==null?{score:0}:JSON.parse(localStorage.getItem("circlepath"));
        //var strScore = this.savedData.score.toString()
        var strScore = "13";
        var style = {
                font: "bold 64px Arial",
                fill: "#ffffff"
        };

        var text = this.game.add.text(0, this.game.height - 64, "Best score: " + strScore, style);

        this.destroy = false;
        this.saveRotationSpeed = rotationSpeed;
        this.tintColor = bgColors[this.game.rnd.between(0, bgColors.length - 1)];
        do{
          this.tintColor2 = bgColors[this.game.rnd.between(0, bgColors.length - 1)];     
        } while(this.tintColor == this.tintColor2)
        this.game.stage.backgroundColor = this.tintColor;
        this.targetArray = [];
        this.steps = 0;
        this.rotatingDirection = this.game.rnd.between(0, 1);
        this.gameGroup = this.game.add.group();
        this.targetGroup = this.game.add.group();
        this.ballGroup = this.game.add.group();
        this.gameGroup.add(this.targetGroup);
        this.gameGroup.add(this.ballGroup);
        this.arm = this.game.add.sprite(this.game.width / 2, this.game.height / 4 * 2.7, "arm");
        this.arm.anchor.set(0, 0.5);
        this.arm.tint = this.tintColor2;
        this.ballGroup.add(this.arm);
        this.balls = [
          this.game.add.sprite(this.game.width / 2, this.game.height / 4 * 2.7, "ball"),
          this.game.add.sprite(this.game.width / 2, this.game.height / 2, "ball")                   
        ]
            this.balls[0].anchor.set(0.5);
            this.balls[0].tint = this.tintColor2;
            this.balls[1].anchor.set(0.5);
            this.balls[1].tint = this.tintColor2;
            this.ballGroup.add(this.balls[0]);
            this.ballGroup.add(this.balls[1]);
            this.rotationAngle = 0;
            this.rotatingBall = 1;
        var target = this.game.add.sprite(0, 0, "target");
            target.anchor.set(0.5);
            target.x = this.balls[0].x;
            target.y = this.balls[0].y;
            this.targetGroup.add(target);   
            this.targetArray.push(target);      
        this.game.input.onDown.add(this.changeBall, this);
            for(var i = 0; i < visibleTargets; i++){
                this.addTarget(); 
            }    
      }

      update(){
            var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
            if(distanceFromTarget > 90 && this.destroy && this.steps > visibleTargets){
                this.gameOver();
            }
            if(distanceFromTarget < 40 && !this.destroy){
                this.destroy = true;
            }
            this.rotationAngle = (this.rotationAngle + this.saveRotationSpeed * (this.rotatingDirection * 2 - 1)) % 360;
            this.arm.angle = this.rotationAngle + 90;
            this.balls[this.rotatingBall].x = this.balls[1 - this.rotatingBall].x - ballDistance * Math.sin(Phaser.Math.degToRad(this.rotationAngle));
            this.balls[this.rotatingBall].y = this.balls[1 - this.rotatingBall].y + ballDistance * Math.cos(Phaser.Math.degToRad(this.rotationAngle));
        var distanceX = this.balls[1 - this.rotatingBall].worldPosition.x - this.game.width / 2;
        var distanceY = this.balls[1 - this.rotatingBall].worldPosition.y - this.game.height / 4 * 2.7;
        this.gameGroup.x = Phaser.Math.linearInterpolation([this.gameGroup.x, this.gameGroup.x - distanceX], 0.05);
        this.gameGroup.y = Phaser.Math.linearInterpolation([this.gameGroup.y, this.gameGroup.y - distanceY], 0.05);                   
      }

      changeBall(){
            this.destroy = false;
            var distanceFromTarget = this.balls[this.rotatingBall].position.distance(this.targetArray[1].position);
            if(distanceFromTarget < 20){
              this.rotatingDirection = this.game.rnd.between(0, 1);
              var detroyTween = this.game.add.tween(this.targetArray[0]).to({
                      alpha: 0
                }, 500, Phaser.Easing.Cubic.In, true);
                detroyTween.onComplete.add(function(e){
                      e.destroy();
                })
                this.targetArray.shift();
                this.arm.position = this.balls[this.rotatingBall].position;
                this.rotatingBall = 1 - this.rotatingBall;
                this.rotationAngle = this.balls[1 - this.rotatingBall].position.angle(this.balls[this.rotatingBall].position, true) - 90;
                this.arm.angle = this.rotationAngle + 90; 
                for(var i = 0; i < this.targetArray.length; i++){
                      this.targetArray[i].alpha += 1 / 7;  
                }      
                this.addTarget();
            }
            else{
                this.gameOver();
            }   
      }

      addTarget(){
        this.steps++;
        var startX = this.targetArray[this.targetArray.length - 1].x;
        var startY = this.targetArray[this.targetArray.length - 1].y;          
        var target = this.game.add.sprite(0, 0, "target");
        var randomAngle = this.game.rnd.between(angleRange[0] + 90, angleRange[1] + 90);
            target.anchor.set(0.5);
            target.x = startX + ballDistance * Math.sin(Phaser.Math.degToRad(randomAngle));
            target.y = startY + ballDistance * Math.cos(Phaser.Math.degToRad(randomAngle));
            target.alpha = 1 - this.targetArray.length * (1 / 7);
            var style = {
                font: "bold 32px Arial",
                fill: "#" + this.tintColor.toString(16),
                align: "center"
            };
        var text = this.game.add.text(0, 0, this.steps.toString(), style);
            text.anchor.set(0.5);
            target.addChild(text);
            this.targetGroup.add(target);   
            this.targetArray.push(target);      
      }

      gameOver(){
        // 存储积分
        //localStorage.setItem("circlepath",JSON.stringify({
        //    score: Math.max(this.savedData.score, this.steps - visibleTargets)
        //}));
        this.game.input.onDown.remove(this.changeBall, this);
        this.saveRotationSpeed = 0;
        this.arm.destroy();
        var gameOverTween = this.game.add.tween(this.balls[1 - this.rotatingBall]).to({
                alpha: 0
            }, 1000, Phaser.Easing.Cubic.Out, true);
            gameOverTween.onComplete.add(function(){
              this.game.state.start("PlayGame");
            },this)
      }
}