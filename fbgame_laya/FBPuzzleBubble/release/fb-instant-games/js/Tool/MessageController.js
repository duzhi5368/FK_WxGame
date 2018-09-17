/**
 * 消息分发
 * by lzq
 */
 var MessageController =(function(_super){

    Laya.class(MessageController,"MessageController",_super);
    var _proto = MessageController.prototype;

    var instance;
    //消息字典
    _proto.MessageArray = new Array();
    function MessageController(){

    }
    function getInstance(){
        if(instance === undefined){
            instance = new MessageController();
        }
        return instance;
    }
    
    /**
     * 增加消息注册
     * _notificationName 通知名称
     * _function 通知处理方法
    */
    _proto.AddNotification = function(_notificationName,_caller,_function){
        if (typeof _caller === "function") {
            _function = _caller;
        }
        Gamelog("---------MessageController AddNotification name="+_notificationName);
        var notification = _proto.MessageArray[_notificationName];
        if(notification != null){
            var itemArray = [];
            if(_caller == _function){
                itemArray.push(_function);
                notification.push(itemArray);
            }
            else{
                itemArray.push(_function);
                itemArray.push(_caller);
                notification.push(itemArray);
            }
            
        }else{
            var list = new Array();
            var itemArray = [];
            if(_caller == _function){
                itemArray.push(_function);
                list.push(itemArray);
            }
            else{
                itemArray.push(_function);
                itemArray.push(_caller);
                list.push(itemArray);
            }
            _proto.MessageArray[_notificationName] = list;
        }

    }
    /**
     * 删除消息注册
     * _notificationName 通知名称
     * _function 通知处理方法
     */
    _proto.RemoveNotification = function(_notificationName,_function){
        console.debug("---------MessageController RemoveNotification name="+_notificationName);
        if(_proto.MessageArray[_notificationName]){
            var list = _proto.MessageArray[_notificationName];
            // var list_Index = list.indexOf(_function);
            // if(list_Index != -1){
            //     list.splice(list_Index,1)
            // }

            list.splice(0,list.length);

            if(list.length == 0){
                delete _proto.MessageArray[_notificationName];
            }
        }else{
            console.error("---------_notificationName="+_notificationName+"没有注册");
        }   
    }

    /**
     * 发送通知
     * _notify notification对象
     */
    _proto.SendNotification = function(_notify){
        if(_proto.MessageArray == null || _proto.MessageArray[_notify.Name] == null) 
        {
            console.error("---------_notificationName="+_notify.Name+"没有注册");
            return;
        }
        var list = _proto.MessageArray[_notify.Name];

        for(var i=0; i<list.length; i++){
            var itemArray =list[i];
            if(itemArray.length == 1){
                var list_fun =itemArray[0];
                list_fun(_notify);
            }
            else if(itemArray.length == 2)
            {
                var list_fun =itemArray[0];
                list_fun.call(itemArray[1],_notify);
            }
        }
    }

    return{
        getInstance:getInstance
    }
 })();