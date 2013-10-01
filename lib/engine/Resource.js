/*
 * Adapted from: http://jlongster.com/Making-Sprite-based-Games-with-Canvas
 */
Game.Resource = function Resource(options){	
	this.initilize(options);
	this.image = '';
}

Game.Resource.prototype = {
	
	initilize: function(options){
		
	},
	
	load: function(res){
		if(res instanceof Array) {
            res.forEach(function(aRes) {
                this._load(aRes);
            });
        }
        else {
            this._load(res);
        }
	},
	
	_load: function(res) {
		//TODO this is only for images
    	var img = new Image();
     	img.onload = function() {
			//add to engine
			this.image = img;
        }.bind(this);
        img.src = res;    
	}
}
/*
    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
        else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        }
        else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;

                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        return resourceCache[url];
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = { 
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
}
*/