
/**
 * 泡泡类型
 */
var BubbleTypes = {
    /**普通泡泡 */
    Normal:1,
    /**人物泡泡 */
    Player:2,
    /**金蛋泡泡 */
    Egg:3,
    
}

 /**
 * 气泡
 */
var Bubble = (function(_super){

    function Bubble(){
        Bubble.super(this);
        _proto.gameui = UIManager.getInstance().getUI("GameUI");
        this.onInit();
    }
    Laya.class(Bubble,"Bubble",_super);
    _proto = Bubble.prototype;
    //泡泡所有位置的行和列
	this.m_nRowIndex = -1;
    this.m_nColIndex = -1;

    //是否停止移动
    this.isStop = true;
    //玩家属性
    this.playerData = null;
    //泡泡类型
    this.bubbleType = BubbleTypes.Normal;
    //关联的刚体
    this.bodyData = null;

    _proto.onInit = function(){
        this.m_nRowIndex = -1;
        this.m_nColIndex = -1;
        this.bubbleType = BubbleTypes.Normal;
        this.playerData = null;
        this.bodyData = null;
    }

    _proto.onDestroy = function(){
    }

    _proto.setRowColIndex = function(row,col){
        this.m_nRowIndex = row;
        this.m_nColIndex = col;
    }
    return Bubble;
})(Laya.Image);