Game.KeyMap = function KeyMap(maps){
	this.map = {};
	this.keyEvents = {};
	this.initilize(maps);
	this._pressed = {};
}

Game.KeyMap.prototype = {
	initilize: function(maps){
		this.setup = {};
		Game.Util.extend(this.setup,maps);		
		for(var map in maps){
			this.map[map] = this.key_bind(map);
		}
	},
	
	key_bind : function(map){
		this.keyEvents[this.setup[map].key_code] = map;
		return this.setup[map];		
	},
	
	add_to_engine : function(engine){
		engine.keymap = this;
		this.engine = engine;
	},
	
	listen_for_key_event : function(){
		
		window.addEventListener('keyup', function(event) { this.onKeyup(event); }.bind(this), false);
		window.addEventListener('keydown', function(event) { this.onKeydown(event); }.bind(this), false);
		
		/*
		window.addEventListener('keydown', function(event){
			console.log(event.keyCode);
			if(this.keyEvents.hasOwnProperty(event.keyCode)){
				var action = this.keyEvents[event.keyCode];
				this.map[action].bind.add_to_on(this.map[action].action);
			}
			
		}.bind(this));
		*/
	},
	
	isDown: function(keyCode) {
    	return this._pressed[keyCode];
  	},
  
  	onKeydown: function(event) {
    	this._pressed[event.keyCode] = true;
  	},
  
  	onKeyup: function(event) {
    	delete this._pressed[event.keyCode];
  	}
}
