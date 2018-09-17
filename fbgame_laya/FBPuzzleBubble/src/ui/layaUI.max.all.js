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

		GameUI.uiView={"type":"View","props":{"width":720,"height":1280,"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"width":1280,"var":"img_bg","skin":"game/bgGame.png","height":1280,"centerX":0}},{"type":"Box","props":{"y":113,"x":0,"width":720,"var":"bubblePanel","centerX":0}},{"type":"Box","props":{"y":0,"width":1280,"name":"top","centerX":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"game/img_xinxilan_dikuang.png","name":"topBg","centerX":0}},{"type":"Image","props":{"y":21,"x":409,"skin":"game/img_defen_dikuang72.png","scaleY":1.5,"scaleX":1.5}},{"type":"Image","props":{"y":21,"x":645,"skin":"game/img_defen_dikuang1.png","scaleY":1.5,"scaleX":1.5}},{"type":"Button","props":{"y":-1,"x":291,"var":"btn_sound","stateNum":2,"skin":"game/btn_shengyin_kai.png"}},{"type":"Label","props":{"y":30,"x":489,"width":99,"var":"label_time","text":"99999","height":38,"fontSize":40,"font":"SimHei","color":"#f9f7f3","bold":true,"align":"right"}},{"type":"Label","props":{"y":32,"x":726,"width":99,"var":"label_score","text":"99999","height":36,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true,"align":"right"}}]},{"type":"Box","props":{"y":0,"width":1280,"name":"center","mouseThrough":true,"height":1280,"centerX":0},"child":[{"type":"Image","props":{"y":1098,"x":422,"var":"img_box_back","skin":"game/img_beiyongqiu_1.png"}},{"type":"Box","props":{"y":1061,"x":422,"var":"changeBubbleBox"},"child":[{"type":"Image","props":{"y":28,"x":46,"var":"prepareBubble","skin":"game/img_qiu_1.png"}},{"type":"Image","props":{"y":37,"var":"img_box_front","skin":"game/img_beiyongqiu_2.png"}}]},{"type":"Animation","props":{"y":934,"x":524,"var":"anim_panda","source":"game/img_daiji01.png,game/img_daiji02.png,game/img_daiji03.png,game/img_daiji04.png,game/img_daiji06.png","interval":100,"autoPlay":false}},{"type":"Image","props":{"y":936,"x":524,"visible":false,"var":"img_panda","skin":"game/img_daiji01.png"}},{"type":"Image","props":{"y":1128,"x":646,"var":"shootBubble","skin":"game/img_qiu_1.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":1213,"x":546,"skin":"game/img_tong11.png","name":"img_tong_back"}},{"type":"Image","props":{"y":1211,"x":546,"var":"img_tong_front","skin":"game/img_tong1.png"}},{"type":"Image","props":{"y":1208,"x":641,"visible":true,"var":"img_guang","skin":"game/img_guangxiao1.png","anchorY":0.5,"anchorX":0.5}}]},{"type":"Box","props":{"y":0,"var":"gameStartPanel","centerX":0},"child":[{"type":"Image","props":{"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1280}},{"type":"Image","props":{"y":451,"x":370,"width":542,"skin":"game/img_diban.png","sizeGrid":"60,60,60,60","height":305}},{"type":"Image","props":{"y":418,"x":489,"skin":"game/img_youxiguize.png"}},{"type":"Button","props":{"y":680,"x":517,"var":"btn_start","stateNum":2,"skin":"game/btn_kaishi.png"}},{"type":"Label","props":{"y":539,"x":445,"text":"1、游戏时间:120秒","fontSize":26,"font":"SimHei","color":"#00779e"}},{"type":"Label","props":{"y":579,"x":445,"text":"2、连续三个相同颜色球即可消除","fontSize":26,"font":"SimHei","color":"#00779e"}},{"type":"Label","props":{"y":620,"x":445,"text":"3、限定时间内，获取更高分数吧","fontSize":26,"font":"SimHei","color":"#00779e"}}]},{"type":"Image","props":{"width":1280,"visible":false,"var":"img_black","skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","mouseEnabled":true,"height":1280,"centerX":0}},{"type":"Image","props":{"visible":false,"var":"img_start","skin":"game/img_kaishi.png","centerY":0,"centerX":0,"anchorY":0.5,"anchorX":0.5}}]};
		return GameUI;
	})(View);
var GameoverUI=(function(_super){
		function GameoverUI(){
			
		    this.gameoverPanel=null;
		    this.img_light=null;
		    this.label_overScore=null;
		    this.label_heightScore=null;
		    this.btn_again=null;
		    this.btn_next=null;
		    this.btn_last=null;

			GameoverUI.__super.call(this);
		}

		CLASS$(GameoverUI,'ui.PuzzleBobble.GameoverUI',_super);
		var __proto__=GameoverUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameoverUI.uiView);

		}

		GameoverUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"var":"gameoverPanel","centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1280}},{"type":"Image","props":{"y":402,"x":630,"var":"img_light","skin":"game/img_guangxiao.png","anchorY":0.5,"anchorX":0.5}},{"type":"Image","props":{"y":408,"x":362,"width":546,"skin":"game/img_diban.png","sizeGrid":"60,60,60,60","height":694}},{"type":"Image","props":{"y":264,"x":355,"width":550,"skin":"game/img_dangqiandefen.png","height":249}},{"type":"Image","props":{"y":452,"x":488,"skin":"game/img_lishizuigao.png"}},{"type":"Label","props":{"y":564,"x":495,"width":255,"var":"label_overScore","text":"88888","strokeColor":"#0d0d0d","stroke":2,"height":60,"fontSize":55,"font":"SimHei","color":"#e7f106","bold":true,"align":"center"}},{"type":"Label","props":{"y":449,"x":631,"width":151,"var":"label_heightScore","text":"88888","strokeColor":"#9003ff","stroke":3,"height":43,"fontSize":40,"font":"SimHei","color":"#fbf8fd","bold":true,"align":"left"}},{"type":"Button","props":{"y":1027,"x":507,"var":"btn_again","stateNum":2,"skin":"game/btn_zaiwan.png"}},{"type":"Image","props":{"y":490,"x":511,"skin":"game/image_bencidefen.png"}},{"type":"Image","props":{"y":367,"x":516,"skin":"game/image_youxijieshu-.png"}},{"type":"Image","props":{"y":675,"x":421,"width":434,"skin":"game/img_rankBg.png","height":282,"sizeGrid":"21,26,28,29"}},{"type":"Label","props":{"y":626,"x":534,"text":"好友排行榜","fontSize":35,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":964,"x":634,"width":150,"var":"btn_next","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"下一页","height":50}},{"type":"Button","props":{"y":964,"x":487,"width":150,"var":"btn_last","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"上一页","height":50}}]}]};
		return GameoverUI;
	})(View);
var GameSharedUI=(function(_super){
		function GameSharedUI(){
			
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

		GameSharedUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Box","props":{"centerY":0,"centerX":0},"child":[{"type":"Image","props":{"y":0,"width":1280,"skin":"game/bg_heise.png","sizeGrid":"5,5,5,5","height":1280}},{"type":"Image","props":{"y":408,"x":362,"width":546,"skin":"game/img_tanchuang_bg.png","sizeGrid":"60,60,60,60","height":297}},{"type":"Label","props":{"y":490,"x":415,"width":445,"text":"分享重新获得120秒时间","strokeColor":"#f10c09","stroke":0,"height":87,"fontSize":40,"font":"SimHei","color":"#ffffff","bold":true}},{"type":"Button","props":{"y":621,"x":512,"var":"btn_shard","stateNum":2,"skin":"game/btn_fangjian_red_164x54.png","labelSize":30,"labelPadding":"0,0,10,0","labelFont":"SimHei","labelColors":"#ffffff","label":"分享复活"}},{"type":"Button","props":{"y":727,"x":538,"width":169,"var":"btn_cancel","mouseEnabled":true,"labelSize":35,"labelFont":"SimHei","labelColors":"#ffffff","labelBold":true,"label":"点击跳过","height":72}}]}]};
		return GameSharedUI;
	})(View);