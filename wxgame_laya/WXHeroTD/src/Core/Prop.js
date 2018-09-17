 /**
 * 道具
 */
var Prop = (function(_super){

    function Prop(){
        Prop.super(this);
        this.onInit();
    }
    Laya.class(Prop,"Prop",_super);
    _proto = Prop.prototype;

    //道具宽高
    var PropWidth = 110;
    var PropHeight = 110;
    var PropMaxHp = 1000;                                                       //防御塔最高血量

    /**道具动画 */
    _proto.anim = null;
    _proto.propImg = null;
    _proto.propRadios = 30;                                                   //道具半径
    _proto.targetHero = null;                                                 //英雄
    _proto.targetTower = null;                                                //防御塔
    _proto.propType = -1;                                                      //道具类型
    _proto.timeLine = null;                                                   //呼吸效果


    _proto.onInit = function(){
        // this.width = PropWidth;
        // this.height = PropHeight;
        // this.pivotX = PropWidth / 2;
        // this.pivotY = PropHeight / 2;

        if(ShowRang){
            var rangSp = new Laya.Sprite();
            rangSp.graphics.drawCircle(0,0,this.propRadios,"#ff0000","#ff0000",1);
            rangSp.x = this.pivotX;
            rangSp.y = this.pivotY;
            this.addChild(rangSp);
        }

        // this.propImg = new Laya.Image("game/No.1.png");
        // this.propImg.pivotX = 26;
        // this.propImg.pivotY = 24;
        // // this.propImg.pos(this.pivotX,this.pivotY -30);
        // this.addChild(this.propImg);


        // this.anim = new Laya.Animation();
        // this.anim.play(0, true, "tower_dead");
        // this.anim.pivotX = 270;
        // this.anim.pivotY = 242;
        // this.anim.interval = 150;
        // this.anim.pos(this.pivotX,this.pivotY);
        // this.addChild(this.anim);
        // this.anim.visible = false;

        

        this.initProp();
    }

    _proto.onDestroy = function(){
        this.timeLine.destroy();
        SceneManager.getInstance().currentScene.removeProp(this);
        this.destroy(true);
    }

    _proto.initProp = function(){
        this.targetHero = SceneManager.getInstance().currentScene.curHero;
        this.targetTower =SceneManager.getInstance().currentScene.curTower;
    }

    _proto.setPropType = function(_type){
        this.propType = _type;
        
        var t_typeImg = "";
        switch(this.propType){
            case 1:
                t_typeImg = "game/item_hp.png";
                break;
            case 2:
                t_typeImg = "game/item_speed.png";
                break;
        }

        this.propImg = new Laya.Image(t_typeImg);
        this.propImg.pivotX = 15;
        this.propImg.pivotY = 22;
        this.propImg.scaleX = 1.5;
        this.propImg.scaleY = 1.5;
        this.addChild(this.propImg);

        this.timeLine = new Laya.TimeLine();
        this.timeLine.addLabel("show", 0).to(this.propImg,
            {
                // alpha: 1,
                scaleX: 2,
                scaleY: 2,
            }, 500).addLabel("go", 0).to(this.propImg,
            {
                // alpha: 0,
                scaleX: 1.5,
                scaleY: 1.5,
            }, 500);
        
        this.timeLine.play(0, true);
        
        //逐渐消失
        Laya.timer.once(5000,this,function(){
            Laya.Tween.to(this.propImg,
            {
                alpha:0
            },1000,null,new Laya.Handler(this,function(){
                this.onDestroy();
            }));
        });

    }
    _proto.onUpdate = function(){
        var collisionProp = isCollisionWithTwoCricle(new Point(this.x,this.y),this.propRadios,this.targetHero,this.targetHero.HeroRadios);
        if(collisionProp && this != null){
            
            switch(this.propType){
                case 1:
                    this.addHpPorp();
                    break;
                case 2:
                    this.addHeroSpeed();
                    break;
            }
        }
    }

    /**
     * 加血道具
     */
    _proto.addHpPorp = function(){
        var t_addHp = 100;

        this.targetTower.addHp(t_addHp);

        // SceneManager.getInstance().currentScene.removeProp(this);
        // this.destroy(true);
        // this.removeSelf();
        this.onDestroy();
        
    }

    /**
     * 增加英雄使用速度
     */
    _proto.addHeroSpeed = function(){
        var t_addSpeed = 5;
        var t_time = 3000;

        this.targetHero.addSpeed(t_addSpeed,t_time);
        // SceneManager.getInstance().currentScene.removeProp(this);
        // this.destroy(true);
        this.onDestroy();
    }

    return Prop;
})(Laya.Sprite);