/*
*公共变量
*/
var s_bMobile,                                                //是否移动设备
s_bAudioActive = !0,
s_iCntTime = 0,
s_iTimeElaps = 0,                                            //当前时间与上一次存储时间差
s_iPrevTime = 0,                                             //上次存储当前时间
s_iCntFps = 0,
s_iCurFps = 0,
s_oDrawLayer,
s_oStage,                                                        //当前舞台
s_oMain, 
s_oSpriteLibrary,                                              //CreateJs 精灵库
s_oSoundTrack,  
s_oCanvas;                                                     //当前画布
var s_oGame;                                                   //当前游戏
TEXT_GAMEOVER = "游戏结束";
TEXT_SCORE = "分数";
TEXT_PLAY = "开始";                                            //播放
TEXT_HELP1 = "USE ARROW BUTTONS OR KEYS TO MOVE THE SCOPE";
TEXT_HELP2 = "CLICK SPACEBAR OR FIRE BUTTON TO SHOOT";
TEXT_HELP3 = "YOU HAVE 3 BULLETS TO HIT THE DUCKS, DON'T LET IT FLY AWAY OR YOU WILL LOSE A LIFE";
TEXT_HELP_MOB1 = "USE ARROW BUTTONS TO MOVE THE SCOPE";
TEXT_HELP_MOB2 = "PRESS FIRE BUTTON TO SHOOT";
TEXT_SHOOT = "射击";
TEXT_HIT = "提示";
TEXT_BONUS = "奖励分数";
TEXT_SCORE = "分数";
TEXT_NOAMMO = "没有子弹";
TEXT_MULTIPLY = "连击";