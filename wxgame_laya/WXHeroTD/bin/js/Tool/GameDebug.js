/**
 * 打印普通日志
 */
function Gamelog(param){
    if(GameLogVisible){
        if(typeof param === "undefined"){
            console.error(param);
        }
        console.log(param);
    }
}

/**
 * 打印错误日志
 */
function GameLogError(param){
    if(GameLogVisible){
        if(typeof param === "undefined"){
            console.error(param);
        }
        console.error(param);
    }
}


function GameLogObject(obj) {  
    var description = "";  
    for (var i in obj) {  
        description += i + " = " + obj[i] + "\n";  
    }  
    console.log(description);  
}  
