/*
* name;
*/
var MusicManager = (function (_super) {
    var instantiated;

    function MusicManager(){
    }

    //注册类
    Laya.class(MusicManager,"MusicManager",_super);
    var _proto = MusicManager.prototype;

    function instance() {
        if (instantiated === undefined) {
                instantiated = new MusicManager();
                instantiated.initSound();
                //声音开关 1开 0关
                // _proto.managerSwitch = 1;
                // SoundManager.autoStopMusic = false; 
            }
        return instantiated;
    }

    _proto.initSound = function(){
        var isOpen = LocalStorage.getItem("managerSwitch");
        if (isOpen == null || isOpen == "") {
            LocalStorage.setItem("managerSwitch",1);
            isOpen = 1;
        }
        //声音开关
        _proto.managerSwitch = isOpen;
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE,this,function(){
            if(Laya.stage.isVisibility){
                // Gamelog("------显示="+Laya.stage.isVisibility);
                Laya.SoundManager.musicMuted = false;
                this.playMusic("res/music/1.mp3");
            }
        });
        Laya.SoundManager.musicMuted = !Laya.stage.isVisibility;
    }
    _proto.playSound = function(musicName) {
        // var soundSwitch = LocalStorage.getItem("soundSwitch");
        var soundSwitch = this.managerSwitch;
        if(soundSwitch == 1){
            // console.debug("---------play()-------" + musicName);
            SoundManager.playSound(musicName);
        }
    }
    _proto.playMusic = function(musicName,musicVolume) {
        // var musicSwitch = LocalStorage.getItem("musicSwitch");
        // var musicSwitch = LocalStorage.getItem("soundSwitch");
        var musicSwitch = this.managerSwitch;
        if(musicSwitch == 1){
            // console.debug("---------play()-------" + musicName);
            if(musicVolume === undefined)
                musicVolume = 0.5;
            SoundManager.musicVolume = musicVolume;
            SoundManager.playMusic(musicName,0);
        }
    }

    _proto.stopMusic = function(){
        SoundManager.stopMusic();
    }
    
    _proto.setMusicOpen = function(isOpen) {
        this.managerSwitch = isOpen;
        LocalStorage.setItem("managerSwitch",isOpen);
    }

    return {
        getInstance: instance
    };
})();