Game.Actor = function Actor(options){
	this.avatar = {};
	this.initilize(options);
	this.actions = {};
}

Game.Actor.prototype = {
	
	initilize: function(options){
		Game.Util.extend(this, options);
		this.tick = 0;
		this.avatar.upForce = 1;		
	},
	
	draw : function(ctx){
		ctx.fillStyle = this.avatar.fill;
  		ctx.fillRect(this.avatar.x, this.avatar.y, this.avatar.w, this.avatar.h);
	},
	move : function(x,y){
		x = x || 0;
		y = y || 0;
		this.avatar.x = this.avatar.x+x;
		this.avatar.y = this.avatar.y+y;
	},
	resize: function(w,h){
		w = w || 0;
		h = h || 0;
		this.avatar.w = this.avatar.w+w;
		this.avatar.h = this.avatar.h+h;
	},
	colorize: function(color){
		color = color || '#AAAAAA';
		this.avatar.fill = color;
	},
	add_to_engine: function(engine){
		engine.actors.push(this);
	},
	
	on: function(){
		for(var id in this.actions){
			if(typeof this.actions[id] === 'function'){
				this.actions[id](id);
			}
		}
	}, 
	add_to_on : function(F){
		var id = $uid();
		this.actions[id] = F.bind(this);
		return id;
	},
	remove_from_on : function(id){
		delete this.actions[id];
	}
}