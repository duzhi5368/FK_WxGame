/*
*游戏配置
*/
var CANVAS_WIDTH = 1024,                              //画布宽度
CANVAS_HEIGHT = 768,                                  //画布高度
DISABLE_SOUND_MOBILE = !1,                            //移动设备声音
FPS_TIME = 1E3 / 24,
STATE_LOADING = 0,
STATE_MENU = 1,
STATE_HELP = 1,
STATE_GAME = 3,
ON_MOUSE_DOWN = 0,
ON_MOUSE_UP = 1,
ON_MOUSE_OVER = 2,
ON_MOUSE_OUT = 3,
ON_DRAG_START = 4,
ON_DRAG_END = 5,
ON_PRESS_MOVE = 6,
SCOPE_ACCELERATION,                                //视野范围
 SCOPE_FRICTION,                                   //视野摩擦力
 MAX_SCOPE_SPEED,                                  //视野最大移动速度
 NUM_BULLETS,                                      //子弹数量
 SCORE_HIT,                                        //当鸭子被击中时获得的点数
 BONUS_TIME,                                       //奖金时间 毫秒
 PLAYER_LIVES,                                     //生命值
 DUCK_INCREASE_SPEED,                              //鸭子增加的速度
 DUCK_START_SPEED = 1;
