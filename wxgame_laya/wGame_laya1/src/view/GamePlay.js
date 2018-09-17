class GamePlay extends ui.GamePlayUI{
    constructor(){
        super();
        this.score = 0;
        this._init();
    }

    _init(){
        Laya.stage.addChild(this);

        

        this.score = this.score > 10000 ? Math.round(this.score / 10000) >= 10 ? (this.score / 10000).toFixed(1) + "w" :  (this.score / 10000).toFixed(2) + "w" : this.score.toString()
        this.text_score.text = this.score
        setTimeout(() => {
            this.removeSelf();
            new GameOver1();
        }, 3000);
    }

    updateScore(){
        this.score ++ ;
        this.score = this.score > 10000 ? Math.round(this.score / 10000) >= 10 ? (this.score / 10000).toFixed(1) + "w" :  (this.score / 10000).toFixed(2) + "w" : this.score.toString()
        this.text_score.text = this.score
    }
    
}