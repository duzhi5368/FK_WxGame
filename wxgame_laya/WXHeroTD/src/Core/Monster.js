 /**
 * 怪物
 */
var Monster = (function(_super){

    function Monster(){
        Monster.super(this);
        this.onInit();
    }
    Laya.class(Monster,"Monster",_super);
    _proto = Monster.prototype;

    var MonsterWidth = 110;                                            //怪物宽高
    var MonsterHeight = 110;
    var MONSTER_SPEED = 2;                                              //移动速度

    /**怪物动画 */
    _proto.anim = null;
    _proto.targetPos = null;                                           //目标坐标
    _proto.targetVector = null;                                        //目标向量
    _proto.targetAngle = 0;                                            //目标角度

    _proto.MonsterRadios = 30;                                          //怪物的半径
    _proto.targetTower = null;                                         //目标塔
    _proto.targetHero = null;                                          //目标英雄
    _proto.hp = 100;                                                   //血量
    _proto.maxHp = 100;                                                //最高血量
    _proto.hpProgress = null;                                          //血量进度条
    _proto.attackValue = 50;                                           //攻击力
    _proto.isAttack = false;                                           //是否在攻击
    _proto.isHurt = false;                                             //是否被攻击
    _proto.hurtSprite = null;                                          //被攻击的特效
    _proto.monsterSpeed = 1;                                           //怪物速度
    _proto.monsterScore = 0;                                           //怪物分数
    _proto.monsterData = null;                                         //怪物数据

    _proto.onInit = function(){
        this.width = MonsterWidth;
        this.height = MonsterHeight;
        this.pivotX = MonsterWidth / 2;
        this.pivotY = MonsterHeight / 2;

        this.anim = new Laya.Animation();
        // this.anim.play(0, true, "monster001_walk_r");
        this.anim.play(0, true, "monster01_up");
        this.anim.pivotX = 52;
        this.anim.pivotY = 56;
        this.anim.interval = 200;
        this.anim.pos(this.pivotX,this.pivotY);
        this.addChild(this.anim);

        // var test = new Laya.ProgressBar("game/progress.png");
        this.hpProgress = new Laya.ProgressBar("game/progress.png");
        this.hpProgress.anchorX = 0.5;
        this.hpProgress.anchorY = 0.5;
        this.hpProgress.value = 1;
        // this.addChild(this.hpProgress);
        this.hpProgress.pos(MonsterWidth / 2,0);

    }

    _proto.onDestroy = function(){
        _proto.targetTower = null;
        _proto.targetHero = null;
        _proto.isAttack = false;
        _proto.isHurt = false;
    }

    //初始化怪物
    _proto.initMonster = function(_posType,_type)
    {
        this.hurtSprite = new Laya.Image("game/penjian-texiao.png");
        SceneManager.getInstance().currentScene.floorBoard.addChild(this.hurtSprite);

        this.anim.scaleX = 1;
        var directionId = 1;
        if(_posType == 2 || _posType == 3){
            this.anim.scaleX = -1;
        }
        if(_posType == 3 || _posType == 4){
            directionId = 2;
        }

        var t_monsterData = [];
        for (var i = 0; i < MonsterData.length; i++) {
            var element = MonsterData[i];
            if(element.type == directionId){
                t_monsterData.push(element);
            }
        }
        
        var t_data = t_monsterData[_type];
        this.monsterData = t_data;
        
        this.anim.clear();
        this.anim.play(0, true, t_data.anim);
        this.anim.visible = true;

        // this.hpProgress.visible = true;
        this.hp = t_data.hp;
        this.maxHp = t_data.hp;
        this.attackValue = t_data.attack;
        this.monsterSpeed = t_data.speed;
        this.monsterScore = t_data.score;
        this.MonsterRadios = t_data.radius;

        if(ShowRang){
            var rangSp = new Laya.Sprite();
            rangSp.graphics.drawCircle(0,0,this.MonsterRadios,"#ff0000","#ff0000",1);
            rangSp.x = this.pivotX;
            rangSp.y = this.pivotY;
            this.addChild(rangSp);
        }
    }
    /**设置目标点 */
    _proto.setTargetPos = function(_pos,_angle){

        this.targetPos = _pos;
        var curPos = new Point(this.x, this.y);
        var tempVector = PointSub(_pos,curPos);
        tempVector.normalize();
        this.targetVector = tempVector;

        this.setHurtRotation(_angle);
    }

    //设置目标角度
    _proto.setHurtRotation = function(_ang){
        this.targetAngle = _ang;

        var dis_x = Math.abs(this.targetPos.x - this.x);
        var dis_y = Math.abs(this.targetPos.y - this.y);
        var jiajiao = 360*Math.atan(dis_y/dis_x)/(2*Math.PI);

        this.hurtSprite.visible = false;
        this.hurtSprite.anchorY = 1;
        if(this.targetAngle >= 180 && this.targetAngle< 270){
            this.hurtSprite.pos(0,0);
            // this.hurtSprite.anchorY = 1;
            this.hurtSprite.rotation = 180 +45 + jiajiao;
        }else if(this.targetAngle >= 270 && this.targetAngle<360){
            // this.hurtSprite.anchorY = 1;
            this.hurtSprite.pos(MonsterWidth,0 );
            this.hurtSprite.rotation = 90 -jiajiao -45;
        }else if(this.targetAngle > 0 && this.targetAngle<90){
            // this.hurtSprite.anchorY = 1;
            this.hurtSprite.pos(MonsterWidth,MonsterHeight );
            this.hurtSprite.rotation = 90 +jiajiao -45;
        }else if(this.targetAngle >= 90 && this.targetAngle<180){
            // this.hurtSprite.anchorY = 1;
            this.hurtSprite.pos(0,MonsterHeight );
            this.hurtSprite.rotation = 180 + (90 -jiajiao) -45;
        }

        

    }

    _proto.onUpdate = function(){
        if(this.targetTower == null){
            this.targetTower = SceneManager.getInstance().currentScene.curTower;
        }
        if(this.targetHero == null){
            this.targetHero = SceneManager.getInstance().currentScene.curHero;
        }
        if(this.targetPos != null){

            if(this.hp > 0){
                var collisionTower = isCollisionWithTwoCricle(new Point(this.x,this.y),this.MonsterRadios,this.targetTower,this.targetTower.TowerRadios);
                if(!collisionTower){
                    // this.pos(this.x + this.targetVector.x * MONSTER_SPEED, this.y + this.targetVector.y * MONSTER_SPEED);
                    this.pos(this.x + this.targetVector.x * this.monsterSpeed, this.y + this.targetVector.y * this.monsterSpeed);
                    
                }else{
                    this.attackTower();
                }
            }else{
                this.monsterDead();
            }
        }

    }
    /**攻击防御塔 */
    _proto.attackTower = function () {
        if(this.isAttack)
            return;
        this.isAttack = true;
        MusicManager.getInstance().playSound("res/music/enemy_hit.wav");
        if(this.targetTower.hp > 0){
            this.targetTower.hurtMonster(this.attackValue);
            Laya.timer.once(500,this,function(){
                this.isAttack = false;
            });
        }
        
    }
    /**被攻击处理 */
    _proto.hurtMonster = function(attackValue){
        this.isHurt = true;
        this.hp -= attackValue;
        if(this.hp >0){
            this.hpProgress.value = this.hp / this.maxHp;
        }else{
            this.monsterDead();
        }
    }

    /**怪物死亡 */
    _proto.monsterDead = function(){
        // Gamelog("----------怪物挂掉了-----");
        this.hpProgress.value = 0;
        var notif = new Notification("Monster_Dead",this,this);
        MessageController.getInstance().SendNotification(notif);

        MusicManager.getInstance().playSound("res/music/tower_hit.wav");

        this.anim.visible = false;
        this.hpProgress.visible = false;

        this.hurtSprite.visible = true;
        this.hurtSprite.alpha = 1;
        //转换到Floor图层坐标
        var t_hurtPos = this.localToGlobal(new Point(this.hurtSprite.x,this.hurtSprite.y),true);
        this.hurtSprite.pos(t_hurtPos.x,t_hurtPos.y);

        //掉落道具
        this.createProp();

        Laya.Tween.to(this.hurtSprite,
        {
            alpha:0
        },1000,null,new Laya.Handler(this,function(){
            MonsterFactory.getInstance().recoveryMonsterToPool(this);
        }));

    }

    /**
     * 产生道具
     */
    _proto.createProp = function(){
        var monsterRanomNum = parseInt(Math.random()*10000, 10);
        var t_props = this.monsterData.props.length;
        if(t_props == 0){
            return;
        }
        var t_weight = 0;
        var t_type = -1;
        var t_diff = this.getDiff();
        for (var i = 0; i < t_props; i++) {
            var propData = this.monsterData.props[i];
            var t_weightDiff = propData.weight - t_diff;
            if(t_weightDiff < 0){
                t_weightDiff = 0;
            }
            t_weight += t_weightDiff;
            if(monsterRanomNum <= t_weight){
                t_type = propData.propId;
                break;
            }
        }
        if(t_type != -1){
            Gamelog("-------createProp monsterRanomNum="+monsterRanomNum + ",t_weight="+t_weight+",t_type="+t_type);
            SceneManager.getInstance().currentScene.createProp(this.x,this.y,t_type);
        }
    }

    /**获取道具减掉的概率 */
    _proto.getDiff = function(){
        var t_diff = 0;
        var t_scene = SceneManager.getInstance().currentScene;
        for (var i = MonsterRefreshData.length -1; i >=0 ; i--) {
            var t_data = MonsterRefreshData[i];
            if(t_scene.gameScore > t_data.score){
                t_diff = t_data.diff ;
                break;
            }
        }
        return t_diff;
    }
    return Monster;
})(Laya.Sprite);