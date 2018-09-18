var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var FBGameUI=(function(_super){
		function FBGameUI(){
			
		    this.photo=null;
		    this.id=null;
		    this.locale=null;
		    this.gameId=null;
		    this.vision=null;
		    this.type=null;
		    this.myName=null;
		    this.platform=null;
		    this.btnShare=null;
		    this.btnLogout=null;
		    this.btnSave=null;
		    this.btnLoading=null;
		    this.btnFriend=null;
		    this.btnChoose=null;

			FBGameUI.__super.call(this);
		}

		CLASS$(FBGameUI,'ui.FBGameUI',_super);
		var __proto__=FBGameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(FBGameUI.uiView);

		}

		FBGameUI.uiView={"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":309,"x":41,"var":"photo"}},{"type":"Label","props":{"y":30,"x":35,"width":236,"var":"id","text":"ID:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":69,"x":35,"width":236,"var":"locale","text":"Locale:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":262,"x":35,"width":236,"var":"gameId","text":"gameId:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":223,"x":35,"width":236,"var":"vision","text":"Vision:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":185,"x":35,"width":236,"var":"type","text":"Type:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":107,"x":35,"width":236,"var":"myName","text":"Name:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Label","props":{"y":146,"x":35,"width":236,"var":"platform","text":"Platform:","height":25,"fontSize":20,"font":"SimHei","color":"#ff110d","bold":true,"align":"left"}},{"type":"Image","props":{"top":0,"skin":"comp/logo.png","right":0}},{"type":"Button","props":{"y":31,"x":293,"width":150,"var":"btnShare","skin":"comp/button.png","labelSize":26,"label":"分享","height":45,"centerX":8,"sizeGrid":"6,12,6,12","labelFont":"SimHei"}},{"type":"Button","props":{"y":115,"x":293,"width":150,"var":"btnLogout","skin":"comp/button.png","label":"退出游戏","height":45,"sizeGrid":"6,12,6,12","labelSize":24,"labelFont":"SimHei"}},{"type":"Button","props":{"y":199,"x":293,"width":150,"var":"btnSave","skin":"comp/button.png","label":"保存数据","height":45,"sizeGrid":"6,12,6,12","labelSize":24,"labelFont":"SimHei"}},{"type":"Button","props":{"y":282,"x":293,"width":150,"var":"btnLoading","skin":"comp/button.png","labelFont":"SimHei","label":"读取数据","height":45,"sizeGrid":"6,12,6,12","labelSize":24}},{"type":"Button","props":{"y":366,"x":293,"width":150,"var":"btnFriend","skin":"comp/button.png","label":"获取关系链","height":45,"sizeGrid":"6,12,6,12","labelSize":24,"labelFont":"SimHei"}},{"type":"Button","props":{"y":450,"x":293,"width":150,"var":"btnChoose","skin":"comp/button.png","label":"选择好友同玩","height":45,"sizeGrid":"6,12,6,12","labelSize":24,"labelFont":"SimHei"}}]};
		return FBGameUI;
	})(View);