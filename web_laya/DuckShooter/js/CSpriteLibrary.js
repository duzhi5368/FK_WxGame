/**
*CreateJs sprite 库
*加载精灵
*获取精灵
*/
function CSpriteLibrary() {
    var spriteDic,
	spriteCount,
	spriteLoadedCount, 
	loadFun,
	loadEndFun, 
	sender;
    this.init = function(_load, _loadEnd, _sender) {
        spriteLoadedCount = spriteCount = 0;
        loadFun = _load;
        loadEndFun = _loadEnd;
        sender = _sender;
        spriteDic = {}
    };
    this.addSprite = function(name, src) {
        spriteDic.hasOwnProperty(name) || (spriteDic[name] = {
            szPath: src,
            oSprite: new Image
        },
        spriteCount++)
    };
    this.getSprite = function(name) {
        return spriteDic.hasOwnProperty(name) ? spriteDic[name].oSprite: null
    };
    this._onSpritesLoaded = function() {
        loadEndFun.call(sender)
    };
    this._onSpriteLoaded = function() {
        loadFun.call(sender);
		++spriteLoadedCount == spriteCount && this._onSpritesLoaded()
    };
	//加载所以精灵
    this.loadSprites = function() {
        for (var b in spriteDic) 
		{
			spriteDic[b].oSprite.oSpriteLibrary = this,
			spriteDic[b].oSprite.onload = function() {
				this.oSpriteLibrary._onSpriteLoaded()
			},
			spriteDic[b].oSprite.src = spriteDic[b].szPath
		}
			
    };
    this.getNumSprites = function() {
        return spriteCount
    }
}
