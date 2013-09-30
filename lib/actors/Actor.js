Game.Actor = function Actor(options){
	this.avatar = {};
	this.initilize(options);
	this.actions = {};
}

Game.Actor.prototype = {
	
	initilize: function(options){
		Game.Util.extend(this, options);
		this.avatar._yAccel = 0;
		this.avatar._yVelocity = 0;
		this.avatar._mass = this.avatar._mass || 30;
		this.calculate_boxes();
	},
	
	calculate_boxes : function(){
		//TODO this can get more complex .. like legs, head, chest etc
		var boxes = {
			left : {x:this.avatar.x-6, y:this.avatar.y, w:this.avatar.w/2, h:this.avatar.h},
			right: {x:this.avatar.x+(this.avatar.w/2)+6, y:this.avatar.y, w:this.avatar.w/2, h:this.avatar.h},
			top: {x:this.avatar.x, y:this.avatar.y-6, w:this.avatar.w, h:this.avatar.h/2},
			bottom: {x:this.avatar.x, y:this.avatar.y+(this.avatar.h/2)+6,w:this.avatar.w,h:this.avatar.h/2},
			fullBox: {x:this.avatar.x-6,y:this.avatar.y-6,w:this.avatar.w+12,h:this.avatar.h+12}
		}
		this.boxes = boxes;
	},
	
	draw : function(ctx){
		ctx.fillStyle = this.avatar.fill;
  		ctx.fillRect(this.avatar.x, this.avatar.y, this.avatar.w, this.avatar.h);
  		
  		//calculate boxes every time is draws!
  		this.calculate_boxes();
	},
	
	move_to:function(x,y){
		x = x || this.avatar.x;
		y = y || this.avatar.y;
		this.avatar.x = x;
		this.avatar.y = y;
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
		this.engine = engine;
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