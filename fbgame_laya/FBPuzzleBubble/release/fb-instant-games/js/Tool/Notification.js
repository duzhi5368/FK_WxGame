/**
 * 通知类
 * by lzq
 */
var Notification = (function(_super){
    
    Laya.class(Notification,"Tool.Notification",_super);
    var _proto = Notification.prototype;

    function Notification(){
        Notification.super(this);
    }
    /**
     * _notificationName 通知名称
     * _sender  发送者
     * _content 通知内容
     */
    function Notification(_notificationName,_sender,_content){
        this.Name = _notificationName;
        this.Sender = _sender;
        this.Content = _content;
    }
    //发送通知
    _proto.Send = function(){
        MessageController.getInstance().SendNotification(this);
    }
    return Notification;
})();