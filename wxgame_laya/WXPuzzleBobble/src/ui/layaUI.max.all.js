var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameUI=(function(_super){
		function GameUI(){
			
		    this.img_bg=null;
		    this.bubblePanel=null;
		    this.btn_sound=null;
		    this.label_time=null;
		    this.label_score=null;
		    this.img_box_back=null;
		    this.changeBubbleBox=null;
		    this.prepareBubble=null;
		    this.img_box_front=null;
		    this.anim_panda=null;
		    this.img_panda=null;
		    this.shootBubble=null;
		    this.img_tong_front=null;
		    this.img_guang=null;
		    this.gameStartPanel=null;
		    this.btn_start=null;
		    this.btn_rank=null;
		    this.img_black=null;
		    this.img_start=null;

			GameUI.__super.call(this);
		}

		CLASS$(GameUI,'ui.PuzzleBobble.GameUI',_super);
		var __proto__=GameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameUI.uiView);

		}

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"var":"img_bg","skin":"game/bgGame.jpg","centerY":0,"centerX":0}},{"type":"Box","props":{"y":113,"x":0,"width":720,"var":"bubblePanel","centerX":0}},{"type":"Box","props":{"y":0,"width":1280,"name":"top","centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_xinxilan_dikuang.png","name":"topBg","centerX":0}},{"type":"Image","props":{"y":21,"x":409,"skin":"game/img_defen_dikuang72.png","scaleY":1.5,"scaleX":1.5}},{"type":"Image","props":{"y":21,"x":645,"skin":"game/img_defen_dikuang1.png","scaleY":1.5,"scaleX":1.5}},{"type":"Button","props":{"y":-1,"x":291,"var":"btn_sound","stateNum":2,"skin":"game/btn_shengyin_kai.png"}},{"type":"Label","props":{"y":30,"x":489,"width":99,"var":"label_time","text":"99999","height":38,"fontSize":40,"font":"SimHei","color":"#f9f7f3","bold":true,"align":"right"}},{"type":"Label","props":{"y":32,"x":726,"width":99,"var":"label_score","text":"99999","height":36,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"right"}},{"type":"Sprite","props":{"y":-201,"x":0,"alpha":0.6},"child":[{"type":"Rect","props":{"y":62,"x":0,"width":1280,"lineWidth":1,"height":140,"fillColor":"#050505"}}]}]},{"type":"Box","props":{"y":0,"width":1280,"name":"center","mouseThrough":true,"height":1280,"centerX":0},"child":[{"type":"Image","props":{"y":1098,"x":422,"var":"img_box_back","skin":"game/img_beiyongqiu_1.png"}},{"type":"Box","props":{"y":1061,"x":422,"var":"changeBubbleBox"},"child":[{"type":"Image","props":{"y":28,"x":46,"var":"prepareBubble","skin":"game/img_qiu_1.png"}},{"type":"Image","props":{"y":37,"var":"img_box_front","skin":"game/img_beiyongqiu_2.png"}}]},{"type":"Animation","props":{"y":934,"x":524,"var":"anim_panda","source":"game/img_daiji01.png,game/img_daiji02.png,game/img_daiji03.png,game/img_daiji04.png,game/img_daiji06.png","interval":100,"autoPlay":false}},{"type":"Image","props":{"y":936,"x":524,"visible":false,"var":"img_panda","skin":"game/img_daiji01.png"}},{"type":"Image","props":{"y":1128,"x":646,"var":"shootBubble","skin":"game/img_qiu_1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1213,"x":546,"skin":"game/img_tong11.png","name":"img_tong_back"}},{"type":"Image","props":{"y":1211,"x":546,"var":"img_tong_front","skin":"game/img_tong1.png"}},{"type":"Image","props":{"y":1208,"x":641,"visible":true,"var":"img_guang","skin":"game/img_guangxiao1.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"width":1280,"var":"gameStartPanel","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":-5,"x":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1556}},{"type":"Image","props":{"y":252,"x":433,"width":444,"skin":"game/logo.png","name":"logo","height":413}},{"type":"Image","props":{"y":660,"x":370,"width":542,"skin":"game/img_diban.png","sizeGrid":"60,60,60,60","height":305}},{"type":"Image","props":{"y":627,"x":489,"skin":"game/img_youxiguize.png"}},{"type":"Button","props":{"y":889,"x":517,"var":"btn_start","stateNum":2,"skin":"game/btn_kaishi.png"}},{"type":"Label","props":{"y":748,"x":445,"text":"1、游戏时间:120秒","fontSize":26,"font":"SimHei","color":"#00779e"}},{"type":"Label","props":{"y":788,"x":445,"text":"2、连续三个相同颜色球即可消除","fontSize":26,"font":"SimHei","color":"#00779e"}},{"type":"Label","props":{"y":829,"x":445,"text":"3、限定时间内，获取更高分数吧","fontSize":26,"font":"SimHei","color":"#00779e"}},{"type":"Button","props":{"y":1019,"x":544,"width":192,"var":"btn_rank","labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","label":"好友排行榜","height":35}},{"type":"Label","props":{"y":1239,"x":290,"text":"v2.0.1","fontSize":26,"font":"SimHei","color":"#ffffff"}}]},{"type":"Image","props":{"width":1280,"visible":false,"var":"img_black","skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","mouseEnabled":true,"height":1556,"centerY":0,"centerX":0}},{"type":"Image","props":{"visible":false,"var":"img_start","skin":"game/img_kaishi.png","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]};
		return GameUI;
	})(View);
var GameoverUI=(function(_super){
		function GameoverUI(){
			
		    this.ani1=null;
		    this.gameoverPanel=null;
		    this.img_light=null;
		    this.label_overScore=null;
		    this.label_heightScore=null;
		    this.btn_again=null;
		    this.btn_next=null;
		    this.btn_last=null;
		    this.btn_share=null;

			GameoverUI.__super.call(this);
		}

		CLASS$(GameoverUI,'ui.PuzzleBobble.GameoverUI',_super);
		var __proto__=GameoverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverUI.uiView);

		}

		GameoverUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"var":"gameoverPanel","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1556}},{"type":"Image","props":{"y":402,"x":630,"var":"img_light","skin":"game/img_guangxiao.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":408,"x":362,"width":546,"skin":"game/img_diban.png","sizeGrid":"60,60,60,60","height":586}},{"type":"Image","props":{"y":264,"x":355,"width":550,"skin":"game/img_dangqiandefen.png","height":249}},{"type":"Image","props":{"y":452,"x":488,"skin":"game/img_lishizuigao.png"}},{"type":"Label","props":{"y":559,"x":427,"width":415,"var":"label_overScore","text":"888888","strokeColor":"#0d0d0d","stroke":2,"height":60,"fontSize":55,"font":"shuzi1Font","color":"#e7f106","bold":true,"align":"center"}},{"type":"Label","props":{"y":449,"x":631,"width":151,"var":"label_heightScore","text":"88888","strokeColor":"#9003ff","stroke":3,"height":43,"fontSize":40,"font":"SimHei","color":"#fbf8fd","bold":true,"align":"left"}},{"type":"Button","props":{"y":937.75,"x":640,"var":"btn_again","stateNum":2,"skin":"game/btn_zaiwan.png"}},{"type":"Image","props":{"y":490,"x":511,"skin":"game/image_bencidefen.png"}},{"type":"Image","props":{"y":367,"x":516,"skin":"game/image_youxijieshu-.png"}},{"type":"Image","props":{"y":629,"x":421,"width":434,"visible":false,"skin":"game/img_rankBg.png","height":282,"sizeGrid":"21,26,28,29"}},{"type":"Label","props":{"y":626,"x":534,"visible":false,"text":"好友排行榜","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":964,"x":634,"width":150,"visible":false,"var":"btn_next","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"下一页","height":50}},{"type":"Button","props":{"y":964,"x":487,"width":150,"visible":false,"var":"btn_last","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"上一页","height":50}},{"type":"Button","props":{"y":982.75,"x":512,"var":"btn_share","stateNum":2,"skin":"game/xuanyaodefen.png","scaleY":0.97,"scaleX":0.97,"anchorY":0.5,"anchorX":0.5},"compId":78}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"x":[{"value":512,"tweenMethod":"linearNone","tween":true,"target":78,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":40}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":20},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":40}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
		return GameoverUI;
	})(View);
var GameRankUI=(function(_super){
		function GameRankUI(){
			
		    this.gameoverPanel=null;
		    this.RankList=null;
		    this.playerItem=null;
		    this.listName=null;
		    this.close=null;

			GameRankUI.__super.call(this);
		}

		CLASS$(GameRankUI,'ui.PuzzleBobble.GameRankUI',_super);
		var __proto__=GameRankUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameRankUI.uiView);

		}

		GameRankUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"width":1280,"visible":true,"var":"gameoverPanel","height":1556,"centerY":0,"centerX":0},"child":[{"type":"Sprite","props":{"alpha":0.7},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":1280,"lineWidth":1,"height":1556,"fillColor":"#050505"}}]},{"type":"Box","props":{"y":367,"centerX":0},"child":[{"type":"Image","props":{"y":12,"x":0,"width":618,"skin":"game/rank_bg.png","sizeGrid":"10,10,10,10","height":728},"child":[{"type":"List","props":{"y":89,"x":6,"width":610,"visible":false,"var":"RankList","spaceY":5,"selectEnable":false,"repeatY":6,"repeatX":1,"height":536},"child":[{"type":"Box","props":{"y":0,"x":0,"width":574,"var":"playerItem","renderType":"render","height":85},"child":[{"type":"Label","props":{"y":40,"x":36,"width":35,"text":"99","name":"rankIndex","height":36,"fontSize":30,"font":"SimHei","anchorY":0.5,"anchorX":0.5,"align":"center"}},{"type":"Label","props":{"y":23,"x":135,"width":205,"text":"玩家名字七个字","name":"playerName","height":40,"fontSize":25,"font":"SimHei"}},{"type":"Label","props":{"y":25,"x":350,"width":116,"text":"9999999","name":"playerScore","height":30,"fontSize":25,"font":"SimHei","color":"#ff0000","align":"center"}},{"type":"Label","props":{"y":26,"x":471,"width":116,"text":"青铜卫士","name":"playerTitle","height":30,"fontSize":25,"font":"SimHei","color":"#010101","align":"center"}}]}]},{"type":"Label","props":{"y":21,"var":"listName","text":"好友排行","fontSize":35,"font":"SimHei","color":"#ffffff","centerX":-7}},{"type":"Label","props":{"y":669,"x":306,"text":"每周一更新排名","fontSize":26,"font":"SimHei","color":"#070201","bold":true,"anchorY":0.5,"anchorX":0.5}}]},{"type":"Image","props":{"y":-2,"x":577,"var":"close","skin":"game/btn_guanbi.png"}}]}]}]};
		return GameRankUI;
	})(View);
var GameSharedUI=(function(_super){
		function GameSharedUI(){
			
		    this.aniShare=null;
		    this.btn_shard=null;
		    this.btn_cancel=null;

			GameSharedUI.__super.call(this);
		}

		CLASS$(GameSharedUI,'ui.PuzzleBobble.GameSharedUI',_super);
		var __proto__=GameSharedUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameSharedUI.uiView);

		}

		GameSharedUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1556}},{"type":"Image","props":{"y":408,"x":362,"width":546,"visible":false,"skin":"game/img_diban.png","sizeGrid":"60,60,60,60","height":337}},{"type":"Label","props":{"y":486,"x":415,"width":445,"text":"看视频重新获得120秒时间","strokeColor":"#f10c09","stroke":0,"height":87,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":624,"x":622,"var":"btn_shard","stateNum":1,"skin":"game/fuhuo.png","labelSize":30,"labelPadding":"0,0,10,0","labelFont":"SimHei","labelColors":"#ffffff","anchorY":0.5,"anchorX":0.5},"compId":78},{"type":"Button","props":{"y":771,"x":541,"width":169,"var":"btn_cancel","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"点击跳过","height":72}}]}],"animations":[{"nodes":[{"target":78,"keyframes":{"x":[{"value":622,"tweenMethod":"linearNone","tween":true,"target":78,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleY","index":30}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":0},{"value":0.8,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":15},{"value":1,"tweenMethod":"linearNone","tween":true,"target":78,"key":"scaleX","index":30}]}}],"name":"aniShare","id":1,"frameRate":24,"action":0}]};
		return GameSharedUI;
	})(View);
var PPldaji_ChUI=(function(_super){
		function PPldaji_ChUI(){
			
		    this.Ch_guangxiao=null;

			PPldaji_ChUI.__super.call(this);
		}

		CLASS$(PPldaji_ChUI,'ui.PuzzleBobble.PPldaji_ChUI',_super);
		var __proto__=PPldaji_ChUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PPldaji_ChUI.uiView);

		}

		PPldaji_ChUI.uiView={"type":"View","props":{"width":400,"height":400},"child":[{"type":"Box","props":{"width":128,"scaleY":1,"scaleX":1,"height":128,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"y":64,"x":64,"skin":"paopaol/Caihongqiu01.png","scaleY":1,"scaleX":1,"anchorY":0.5,"anchorX":0.5,"alpha":0.2857142857142857},"compId":82},{"type":"Image","props":{"y":64,"x":64,"skin":"paopaol/Caihongqiu01.png","scaleY":1.0666666666666667,"scaleX":1.0666666666666667,"anchorY":0.5,"anchorX":0.5,"alpha":0.6666666666666667},"compId":84},{"type":"Image","props":{"y":64,"x":64,"skin":"paopaol/CHguang003.png","scaleY":2,"scaleX":2,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":85},{"type":"Image","props":{"y":67,"x":69,"skin":"paopaol/CHguang003.png","scaleY":1.3,"scaleX":1.3,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":86},{"type":"Image","props":{"width":240,"skin":"paopaol/lidjizld01.png","scaleY":1.2,"scaleX":1.2,"height":217,"centerY":0,"centerX":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0.6666666666666667},"compId":88}]}],"animations":[{"nodes":[{"target":82,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":82,"key":"x","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":82,"key":"x","index":3},{"value":64,"tweenMethod":"linearNone","tween":true,"target":82,"key":"x","index":10}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleY","index":2},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleY","index":3},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleY","index":10}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleX","index":2},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleX","index":3},{"value":1.3,"tweenMethod":"linearNone","tween":true,"target":82,"key":"scaleX","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":82,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":82,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":82,"key":"alpha","index":3},{"value":0,"tweenMethod":"linearNone","tween":true,"target":82,"key":"alpha","index":10}]}},{"target":84,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":84,"key":"x","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":84,"key":"x","index":3},{"value":64,"tweenMethod":"linearNone","tween":true,"target":84,"key":"x","index":6},{"value":64,"tweenMethod":"linearNone","tween":true,"target":84,"key":"x","index":12}],"scaleY":[{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleY","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleY","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleY","index":6},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleY","index":12}],"scaleX":[{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleX","index":0},{"value":0.3,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleX","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleX","index":6},{"value":1.2,"tweenMethod":"linearNone","tween":true,"target":84,"key":"scaleX","index":12}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":84,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":84,"key":"alpha","index":6},{"value":0,"tweenMethod":"linearNone","tween":true,"target":84,"key":"alpha","index":12}]}},{"target":85,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":85,"key":"x","index":0}],"scaleY":[{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":85,"key":"scaleY","index":0},{"value":3,"tweenMethod":"linearNone","tween":true,"target":85,"key":"scaleY","index":6}],"scaleX":[{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":85,"key":"scaleX","index":0},{"value":3,"tweenMethod":"linearNone","tween":true,"target":85,"key":"scaleX","index":6}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":85,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":85,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":85,"key":"alpha","index":6},{"value":1,"tweenMethod":"linearNone","tween":true,"target":85,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":85,"key":"alpha","index":12}]}},{"target":86,"keyframes":{"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":86,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":86,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":86,"key":"alpha","index":4},{"value":1,"tweenMethod":"linearNone","tween":true,"target":86,"key":"alpha","index":9},{"value":0,"tweenMethod":"linearNone","tween":true,"target":86,"key":"alpha","index":12}]}},{"target":88,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":88,"key":"x","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":88,"key":"x","index":3}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleY","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleY","index":6},{"value":1.6,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleY","index":12}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleX","index":0},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleX","index":6},{"value":1.6,"tweenMethod":"linearNone","tween":true,"target":88,"key":"scaleX","index":12}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":88,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":88,"key":"alpha","index":6},{"value":0,"tweenMethod":"linearNone","tween":true,"target":88,"key":"alpha","index":12}]}}],"name":"Ch_guangxiao","id":4,"frameRate":24,"action":0}]};
		return PPldaji_ChUI;
	})(View);
var PPldaji_LhUI=(function(_super){
		function PPldaji_LhUI(){
			
		    this.Lh_guangxiao=null;

			PPldaji_LhUI.__super.call(this);
		}

		CLASS$(PPldaji_LhUI,'ui.PuzzleBobble.PPldaji_LhUI',_super);
		var __proto__=PPldaji_LhUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(PPldaji_LhUI.uiView);

		}

		PPldaji_LhUI.uiView={"type":"View","props":{"width":400,"height":400},"child":[{"type":"Box","props":{"width":128,"height":128,"centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5},"child":[{"type":"Image","props":{"x":64,"skin":"paopaol/Kuosanbo04.png","scaleY":1.525,"scaleX":1.525,"centerY":0,"centerX":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":0.75},"compId":62},{"type":"Image","props":{"y":64,"x":64,"skin":"paopaol/hongselizi01.png","scaleY":3.4,"scaleX":3.4,"centerY":0,"centerX":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":64},{"type":"Image","props":{"y":64,"x":64,"skin":"paopaol/lidjizld01.png","scaleY":1.7000000000000002,"scaleX":1.7000000000000002,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5,"alpha":1},"compId":87},{"type":"Image","props":{"width":400,"skin":"paopaol/Kuosanbo05.png","height":400,"centerY":0,"centerX":0,"blendMode":"lighter","anchorY":0.5,"anchorX":0.5},"compId":93}]}],"animations":[{"nodes":[{"target":62,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":62,"key":"x","index":0}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":3},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":5},{"value":1.6,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleY","index":15}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":3},{"value":1.5,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":5},{"value":1.6,"tweenMethod":"linearNone","tween":true,"target":62,"key":"scaleX","index":15}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":5},{"value":0,"tweenMethod":"linearNone","tween":true,"target":62,"key":"alpha","index":15}]}},{"target":64,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":64,"key":"x","index":0}],"scaleY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleY","index":3},{"value":4,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleY","index":8},{"value":4,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleY","index":15}],"scaleX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleX","index":3},{"value":4,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleX","index":8},{"value":4,"tweenMethod":"linearNone","tween":true,"target":64,"key":"scaleX","index":15}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":64,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":64,"key":"alpha","index":3},{"value":1,"tweenMethod":"linearNone","tween":true,"target":64,"key":"alpha","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":64,"key":"alpha","index":15}]}},{"target":87,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":87,"key":"x","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":87,"key":"x","index":5},{"value":64,"tweenMethod":"linearNone","tween":true,"target":87,"key":"x","index":8},{"value":64,"tweenMethod":"linearNone","tween":true,"target":87,"key":"x","index":15}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleY","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleY","index":5},{"value":2.3,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleY","index":8},{"value":2.3,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleY","index":15}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleX","index":0},{"value":2,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleX","index":5},{"value":2.3,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleX","index":8},{"value":2.3,"tweenMethod":"linearNone","tween":true,"target":87,"key":"scaleX","index":15}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":87,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":87,"key":"alpha","index":2},{"value":1,"tweenMethod":"linearNone","tween":true,"target":87,"key":"alpha","index":5},{"value":1,"tweenMethod":"linearNone","tween":true,"target":87,"key":"alpha","index":8},{"value":0,"tweenMethod":"linearNone","tween":true,"target":87,"key":"alpha","index":15}]}},{"target":93,"keyframes":{"x":[{"value":64,"tweenMethod":"linearNone","tween":true,"target":93,"key":"x","index":0},{"value":64,"tweenMethod":"linearNone","tween":true,"target":93,"key":"x","index":7},{"value":64,"tweenMethod":"linearNone","tween":true,"target":93,"key":"x","index":10}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleY","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleY","index":7},{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleY","index":8},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleY","index":10}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleX","index":0},{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleX","index":7},{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleX","index":8},{"value":1.1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"scaleX","index":10}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":93,"key":"alpha","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":93,"key":"alpha","index":7},{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"alpha","index":8},{"value":1,"tweenMethod":"linearNone","tween":true,"target":93,"key":"alpha","index":10},{"value":0,"tweenMethod":"linearNone","tween":true,"target":93,"key":"alpha","index":15}]}}],"name":"Lh_guangxiao","id":3,"frameRate":24,"action":0}]};
		return PPldaji_LhUI;
	})(View);
var Prop_CarUI=(function(_super){
		function Prop_CarUI(){
			

			Prop_CarUI.__super.call(this);
		}

		CLASS$(Prop_CarUI,'ui.PuzzleBobble.Prop_CarUI',_super);
		var __proto__=Prop_CarUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(Prop_CarUI.uiView);

		}

		Prop_CarUI.uiView={"type":"View","props":{"width":350,"height":100},"child":[{"type":"Image","props":{"y":2,"x":172,"skin":"paopaol/img_donghua_chanche.png"}}]};
		return Prop_CarUI;
	})(View);