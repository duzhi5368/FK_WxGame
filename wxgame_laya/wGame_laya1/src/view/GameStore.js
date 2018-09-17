class GameStore extends ui.GameStoreUI{
    constructor(parentPage){
        super();
        this.parentPage = parentPage
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);
        this.player_move.play();

        this.btn_leftHat.on(Event.MOUSE_DOWN,this,()=>{
            this.btn_leftHat.skin = "images/btn_arrowleft_blue-sheet1.png"
        })
        this.btn_leftHat.on(Event.MOUSE_OUT,this,()=>{
            this.btn_leftHat.skin = "images/btn_arrowleft_blue-sheet0.png"
        })
        this.btn_leftHat.on(Event.MOUSE_UP,this,()=>{
            this.btn_leftHat.skin = "images/btn_arrowleft_blue-sheet0.png"
        })

        this.btn_rightHat.on(Event.MOUSE_DOWN,this,()=>{
            this.btn_rightHat.skin = "images/btn_arrowright_blue-sheet1.png"
        })
        this.btn_rightHat.on(Event.MOUSE_OUT,this,()=>{
            this.btn_rightHat.skin = "images/btn_arrowright_blue-sheet0.png"
        })
        this.btn_rightHat.on(Event.MOUSE_UP,this,()=>{
            this.btn_rightHat.skin = "images/btn_arrowright_blue-sheet0.png"
        })

        this.btn_leftGlass.on(Event.MOUSE_DOWN,this,()=>{
            this.btn_leftGlass.skin = "images/btn_arrowleft_blue-sheet1.png"
        })
        this.btn_leftGlass.on(Event.MOUSE_OUT,this,()=>{
            this.btn_leftGlass.skin = "images/btn_arrowleft_blue-sheet0.png"
        })
        this.btn_leftGlass.on(Event.MOUSE_UP,this,()=>{
            this.btn_leftGlass.skin = "images/btn_arrowleft_blue-sheet0.png"
        })

        this.btn_rightGlass.on(Event.MOUSE_DOWN,this,()=>{
            this.btn_rightGlass.skin = "images/btn_arrowright_blue-sheet1.png"
        })
        this.btn_rightGlass.on(Event.MOUSE_OUT,this,()=>{
            this.btn_rightGlass.skin = "images/btn_arrowright_blue-sheet0.png"
        })
        this.btn_rightGlass.on(Event.MOUSE_UP,this,()=>{
            this.btn_rightGlass.skin = "images/btn_arrowright_blue-sheet0.png"
        })

        this.btn_back.on(Event.MOUSE_DOWN,this,()=>{
            this.btn_back.skin = "images/btn_back_blue-sheet1.png"
        })
        this.btn_back.on(Event.MOUSE_OUT,this,()=>{
            this.btn_back.skin = "images/btn_back_blue-sheet0.png"
        })
        this.btn_back.on(Event.MOUSE_UP,this,()=>{
            this.removeSelf();
            this.parentPage === "GameStart" ? new GameStart() : new GameOver2();
        })
    }
    
}