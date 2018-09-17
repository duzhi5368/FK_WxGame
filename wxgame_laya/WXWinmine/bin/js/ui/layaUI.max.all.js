var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.contentBox=null;
		    this.label_time=null;
		    this.label_mineNum=null;
		    this.btn_setting=null;
		    this.panel_diban=null;
		    this.blockBox=null;
		    this.setBox=null;
		    this.setMainBox=null;
		    this.btn_setClose=null;
		    this.btn_setSound=null;
		    this.btn_rule=null;
		    this.rulesBox=null;
		    this.btn_rulesBox=null;
		    this.label_rules=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":814,"skin":"GameUI/img_beijing.jpg","height":1556,"centerY":0,"centerX":0}},{"type":"Box","props":{"width":1280,"name":"center","height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"contentBox","height":1280,"centerX":0},"child":[{"type":"Box","props":{"y":16,"x":278,"name":"top"},"child":[{"type":"Image","props":{"y":43,"x":213,"width":217,"skin":"GameUI/img_shijian.png","height":70,"sizeGrid":"22,24,23,76"}},{"type":"Label","props":{"y":57,"x":277,"width":129,"var":"label_time","text":"00:00","height":42,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"right"}},{"type":"Image","props":{"y":45,"x":7,"width":187,"skin":"GameUI/img_leishu.png","height":70,"sizeGrid":"20,23,24,84"}},{"type":"Label","props":{"y":61,"x":68,"width":119,"var":"label_mineNum","text":"00/00","height":37,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"center"}},{"type":"Button","props":{"y":34,"x":447,"var":"btn_setting","stateNum":2,"skin":"GameUI/btn_shzhi.png"}}]},{"type":"Image","props":{"y":265,"x":280,"skin":"GameUI/img_diban.jpg"}},{"type":"Panel","props":{"y":287,"x":302,"width":675,"var":"panel_diban","height":673}},{"type":"Box","props":{"y":0,"x":0,"width":1280,"var":"blockBox","height":1280,"centerX":0}}]}]},{"type":"Box","props":{"width":1280,"visible":false,"var":"setBox","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"width":1280,"alpha":0.7},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":508,"x":382,"width":530,"skin":"GameUI/img_dikuang.jpg","height":486}},{"type":"Box","props":{"y":471,"x":405,"var":"setMainBox","cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"GameUI/img_shezhi.png"}},{"type":"Button","props":{"y":13,"x":444,"var":"btn_setClose","stateNum":2,"skin":"GameUI/btn_guanbi.png"}},{"type":"Image","props":{"y":184,"x":64,"skin":"GameUI/img_yinxiao.png"}},{"type":"Button","props":{"y":167,"x":302,"var":"btn_setSound","stateNum":2,"skin":"GameUI/btn_kai.png"}},{"type":"Image","props":{"y":330,"x":64,"skin":"GameUI/img_youxiguize.png"}},{"type":"Box","props":{"y":328,"x":69,"width":347,"var":"btn_rule","mouseEnabled":true,"height":52},"child":[{"type":"Button","props":{"stateNum":2,"skin":"GameUI/btn_jiantou.png","right":0}}]}]},{"type":"Box","props":{"y":488,"x":360,"visible":false,"var":"rulesBox","cacheAs":"bitmap"},"child":[{"type":"Button","props":{"var":"btn_rulesBox","stateNum":2,"skin":"GameUI/btn_fanhui.png"}},{"type":"Label","props":{"y":99,"x":62,"wordWrap":true,"width":444,"var":"label_rules","text":"1、数字表示周围有几个雷\\n2、单击扫雷\\n3、长按插旗或者取消插旗\\n4、标记正确全部的雷即可获得胜利","height":476,"fontSize":35,"font":"SimHei","color":"#ffffff"}}]}]}]};
		return GameUI;
	})(View);
var GameoverUI=(function(_super){
		function GameoverUI(){
			
		    this.aniShare=null;
		    this.img_result=null;
		    this.label_time=null;
		    this.btn_playAgain=null;
		    this.btn_shared=null;

			GameoverUI.__super.call(this);
		}

		CLASS$(GameoverUI,'ui.GameoverUI',_super);
		var __proto__=GameoverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverUI.uiView);

		}

		GameoverUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.8},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":464,"x":375,"width":530,"skin":"GameUI/img_dikuang.jpg","height":638}},{"type":"Image","props":{"y":396,"x":499,"var":"img_result","skin":"GameUI/jiesuan_biaoti_shengli.png"}},{"type":"Label","props":{"y":565,"x":516,"width":271,"var":"label_time","text":"00:00","strokeColor":"#0d0d0d","stroke":2,"height":60,"fontSize":55,"font":"SimHei","color":"#e7f106","bold":true,"align":"center"}},{"type":"Button","props":{"y":948.75,"x":642,"var":"btn_playAgain","stateNum":1,"skin":"GameUI/btn_playAgain.png","scaleY":0.8,"scaleX":0.8}},{"type":"Button","props":{"y":995.75,"x":512,"var":"btn_shared","stateNum":1,"skin":"GameUI/btn_shareScore.png","scaleY":0.8,"scaleX":0.8,"anchorY":0.5,"anchorX":0.5},"compId":78},{"type":"Label","props":{"y":515,"x":548,"width":199,"text":"游戏用时","strokeColor":"#0d0d0d","stroke":2,"height":48,"fontSize":40,"font":"SimHei","color":"#fcfdf4","bold":true,"align":"center"}}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"x":[{"value":512,"tweenMethod":"linearNone","tween":true,"target":78,"key":"x","index":0}],"scaleY":[{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":20},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":40}],"scaleX":[{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":0.7,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":20},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":40}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameoverUI;
	})(View);
var GameRankUI=(function(_super){
		function GameRankUI(){
			
		    this.RankList=null;
		    this.playerItem=null;
		    this.listName=null;
		    this.close=null;

			GameRankUI.__super.call(this);
		}

		CLASS$(GameRankUI,'ui.GameRankUI',_super);
		var __proto__=GameRankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRankUI.uiView);

		}

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"visible":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":367,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"GameUI/img_dikuang.jpg","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":42,"x":239,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":662,"x":309,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#ffffff","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Button","props":{"y":-18,"x":557,"var":"close","stateNum":2,"skin":"GameUI/btn_guanbi.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameStartUI=(function(_super){
		function GameStartUI(){
			
		    this.aniStart=null;
		    this.guidBox=null;
		    this.startBox=null;
		    this.btn_rank=null;
		    this.btn_share=null;
		    this.btn_startGame=null;

			GameStartUI.__super.call(this);
		}

		CLASS$(GameStartUI,'ui.GameStartUI',_super);
		var __proto__=GameStartUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameStartUI.uiView);

		}

		GameStartUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Box","props":{"width":1280,"var":"guidBox","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":1},"child":[{"type":"Rect","props":{"width":1280,"lineWidth":1,"height":1556,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":138,"x":0,"skin":"StartUI/img_xinshouyindao.png","centerY":0,"centerX":0}}]},{"type":"Box","props":{"width":814,"var":"startBox","height":1556,"centerY":0,"centerX":0,"alpha":1},"child":[{"type":"Image","props":{"x":0,"skin":"StartUI/5.png","name":"5","alpha":0.9928888888888889},"compId":7},{"type":"Image","props":{"x":0,"skin":"StartUI/4.png","name":"4","alpha":1},"compId":8},{"type":"Image","props":{"x":0,"skin":"StartUI/3.png","name":"3","alpha":1},"compId":9},{"type":"Image","props":{"x":0,"skin":"StartUI/2.png","name":"2","alpha":1},"compId":10},{"type":"Image","props":{"y":0,"x":0,"skin":"StartUI/1.png","name":"1","alpha":1},"compId":11},{"type":"Box","props":{"y":159,"x":289,"alpha":1},"compId":16,"child":[{"type":"Button","props":{"y":861,"x":139,"var":"btn_rank","stateNum":1,"skin":"StartUI/btn_rank.png"}},{"type":"Button","props":{"y":857,"var":"btn_share","stateNum":1,"skin":"StartUI/btn_share.png"}},{"type":"Image","props":{"y":149,"x":75,"skin":"StartUI/logo.png","scaleY":0.8,"scaleX":0.8,"name":"logo"}},{"type":"Button","props":{"y":746,"x":19,"var":"btn_startGame","stateNum":1,"skin":"StartUI/btn_play.png"}},{"type":"Label","props":{"y":1190,"x":-211,"text":"V1.0.2","fontSize":30,"font":"SimHei","color":"#ada7a7"}}]}]}],"animations":[{"nodes":[{"target":16,"keyframes":{"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":16,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":16,"key":"alpha","index":20}]}},{"target":10,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":20},{"value":-200,"tweenMethod":"linearNone","tween":true,"target":10,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":10,"key":"alpha","index":60}]}},{"target":11,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":20},{"value":200,"tweenMethod":"linearNone","tween":true,"target":11,"key":"x","index":30}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":30},{"value":0,"tweenMethod":"linearNone","tween":true,"target":11,"key":"alpha","index":60}]}},{"target":8,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":30},{"value":-200,"tweenMethod":"linearNone","tween":true,"target":8,"key":"x","index":40}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":30},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":8,"key":"alpha","index":60}]}},{"target":9,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":30},{"value":200,"tweenMethod":"linearNone","tween":true,"target":9,"key":"x","index":40}],"alpha":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":30},{"value":1,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":9,"key":"alpha","index":60}]}},{"target":7,"keyframes":{"x":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"x","index":40}],"alpha":[{"value":0.9928888888888889,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":40},{"value":0,"tweenMethod":"linearNone","tween":true,"target":7,"key":"alpha","index":60}]}}],"name":"aniStart","id":1,"frameRate":24,"action":0}]};
		return GameStartUI;
	})(View);