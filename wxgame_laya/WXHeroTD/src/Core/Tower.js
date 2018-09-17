 /**
 * 防御塔
 */
var Tower = (function(_super){

    function Tower(){
        Tower.super(this);
        this.onInit();
    }
    Laya.class(Tower,"Tower",_super);
    _proto = Tower.prototype;

    //防御塔宽高
    var TowerWidth = 110;
    var TowerHeight = 110;
    var TowerMaxHp = 1000;                                                       //防御塔最高血量
    /**防御塔半径 */
    _proto.TowerRadios = 150;                                                    //防御塔半径
    _proto.hp = 1000;                                                            //防御塔血量
    _proto.hpProgress = null;                                                   //血量进度条

    /**防御塔动画 */
    _proto.anim = null;
    _proto.towerSp = null;


    _proto.onInit = function(){
        this.width = TowerWidth;
        this.height = TowerHeight;
        this.pivotX = TowerWidth / 2;
        this.pivotY = TowerHeight / 2;

        if(ShowRang){
            var rangSp = new Laya.Sprite();
            rangSp.graphics.drawCircle(0,0,this.TowerRadios,"#ff0000","#ff0000",1);
            rangSp.x = this.pivotX;
            rangSp.y = this.pivotY;
            this.addChild(rangSp);
        }
        this.towerSp = new Laya.Image("game/tower.png");
        this.towerSp.pivotX = 70;
        this.towerSp.pivotY = 100;
        this.towerSp.pos(this.pivotX,this.pivotY -30);
        this.addChild(this.towerSp);

        this.hpProgress = new Laya.ProgressBar("game/progress_xuetiao.png");
        this.hpProgress.anchorX = 0.5;
        this.hpProgress.anchorY = 0.5;
        this.hpProgress.value = 1;
        this.addChild(this.hpProgress);
        this.hpProgress.pos(TowerWidth / 2,-100);

        this.anim = new Laya.Animation();
        this.anim.play(0, true, "tower_dead");
        this.anim.pivotX = 270;
        this.anim.pivotY = 242;
        this.anim.interval = 150;
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);
        this.anim.visible = false;
    }

    _proto.onDestroy = function(){
    }

    _proto.addHp = function(_hp){
        this.hp += _hp;
        if(this.hp > TowerMaxHp){
            this.hp = TowerMaxHp;
        }
        BubbleScoreAnim(new Point(this.x,this.y -200),"+"+_hp);
    }
    _proto.resetHp = function(){
        this.hp = 1000;
        this.hpProgress.value = 1;
        this.hpProgress.visible = true;
        this.towerSp.visible = true;
        this.anim.visible = false;
    }
    _proto.onUpdate = function(){
        if(this.hp <= TowerMaxHp){
            this.hpProgress.value = this.hp / TowerMaxHp;
        }
    }
    /**被攻击处理 */
    _proto.hurtMonster = function(attackValue){
        this.hp -= attackValue;
        if(this.hp >0){
            this.hpProgress.value = this.hp / TowerMaxHp;
        }else{
            this.towerDead();
        }
    }
    /**防御塔死亡 */
    _proto.towerDead = function(){
        this.hpProgress.value = 0;
        Gamelog("----------防御塔挂掉了-----");
        MusicManager.getInstance().playSound("res/music/tower_dead.wav");

        this.hpProgress.visible = false;
        this.towerSp.visible = false;
        // var an = new Laya.Animation();
        this.anim.visible = true;
        this.anim.play(0, false, "tower_dead");
        this.anim.on(Laya.Event.COMPLETE,this,this.onPlayDeadComplete);

        var notif = new Notification("Tower_Dead",this,this);
        MessageController.getInstance().SendNotification(notif);
    }

    _proto.onPlayDeadComplete = function(){
        this.anim.visible = false;
    }
    /**是否在圆内 */
    _proto.isInCircle = function(p){
        var t_pos = this.parent.globalToLocal(new Point(p.x,p.y),true);

        var num1 = Number(Math.pow(t_pos.x - this.x, 2) + Math.pow(t_pos.y - this.y, 2));
        var num2 = Math.pow(this.TowerRadios,2);
        if(num1 <num2){
            return true
        }else{
            return false;
        }
    }

    return Tower;
})(Laya.Sprite);