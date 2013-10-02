Game.Actor = new Game.Class({
	
	initialize: function(options){
		this.sprite = {};	
		this.actions = {};
			
		Game.Util.extend(this, options);
		
		this.id = this.id || $uid();
		this.speed = this.speed || 8;
		this.bbox_padding = this.bbox_padding || 6;
		//TODO this is all wrong now
		this.sprite._yAccel = 0;
		this.sprite._yVelocity = 0;
		this.sprite._mass = this.sprite._mass || 30;
		this.sprite.type = this.sprite.type || 'box';
		this.sprite.sprite_pos = this.sprite.sprite_pos || {
			x:0,
			y:0
		}
		this.calculate_boxes();
	},
	
	calculate_boxes : function(){
		
		//TODO this can get more complex .. like legs, head, chest etc
		var boxes = {

			left : {x:this.sprite.x-this.bbox_padding, y:this.sprite.y, w:this.sprite.w/2, h:this.sprite.h},
			right: {x:this.sprite.x+(this.sprite.w/2)+this.bbox_padding, y:this.sprite.y, w:this.sprite.w/2, h:this.sprite.h},
			top: {x:this.sprite.x, y:this.sprite.y-this.bbox_padding, w:this.sprite.w, h:this.sprite.h/2},
			bottom: {x:this.sprite.x, y:this.sprite.y+(this.sprite.h/2)+this.bbox_padding,w:this.sprite.w,h:this.sprite.h/2},
			fullBox: {x:this.sprite.x-this.bbox_padding,y:this.sprite.y-this.bbox_padding,w:this.sprite.w+(this.bbox_padding*2),h:this.sprite.h+(this.bbox_padding*2)}
			
		}
		
		this.boxes = boxes;
	},
	
	//TODO this will be replaced with rendor and actually merged
	draw : function(ctx){
		if(this.sprite.type == 'box'){
			ctx.fillStyle = this.sprite.fill;
  			ctx.fillRect(this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h);
  		} else {
  			this.render();	
  		}
  		//calculate boxes every time is draws!
  		this.calculate_boxes();
	},
	
	render: function(){
		//TODO straighten this up some
		if(this.sprite.image.image != ''){
			this.engine.ctx.drawImage(this.sprite.image.image,this.sprite.sprite_pos.x,this.sprite.sprite_pos.y,this.sprite.w,this.sprite.h,this.sprite.x, this.sprite.y, this.sprite.w, this.sprite.h);
		}
	},
	
	move_to:function(x,y){
		x = x || this.sprite.x;
		y = y || this.sprite.y;
		this.sprite.x = x;
		this.sprite.y = y;
	},
	
	move : function(x,y){
		x = x || 0;
		y = y || 0;
		this.sprite.x = this.sprite.x+x;
		this.sprite.y = this.sprite.y+y;
	},
	
	resize: function(w,h){
		w = w || 0;
		h = h || 0;
		this.sprite.w = this.sprite.w+w;
		this.sprite.h = this.sprite.h+h;
	},
	
	colorize: function(color){
		color = color || '#AAAAAA';
		this.sprite.fill = color;
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
});