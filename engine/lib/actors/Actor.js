Game.Actor = new Game.Class({
	
	initialize: function(options){
		this.physics = {};
		this.size = {};
		this.location = {};
		this.sprite = {};	
		this.actions = {};
			
		Game.Util.extend(this, options);
		
		this.id = this.id || $uid();
		this.size.w = this.size.w || 50;
		this.size.h = this.size.h || 50;
		
		this.location.x = this.location.x || 0;
		this.location.y = this.location.y || 0;
		
		this.physics.speed = this.physics.speed || 8;
		this.physics.apply_gravity = this.physics.apply_gravity || true,
		this.physics.yAccel = 0;
		this.physics.yVelocity = 0;
		
		this.bbox_padding = this.bbox_padding || 6;
		
		//TODO this is all wrong now
		this.sprite.type = this.sprite.type || 'box';
		this.sprite.size = this.sprite.size || this.size;
		this.sprite.sprite_pos = this.sprite.sprite_pos || {
			x:0,
			y:0
		}
		this.calculate_boxes();
	},
	
	calculate_boxes : function(){
		
		//TODO this can get more complex .. like legs, head, chest etc
		var boxes = {

			left : {x:this.location.x-this.bbox_padding, y:this.location.y, w:this.size.w/2, h:this.size.h},
			right: {x:this.location.x+(this.size.w/2)+this.bbox_padding, y:this.location.y, w:this.size.w/2, h:this.size.h},
			top: {x:this.location.x, y:this.location.y-this.bbox_padding, w:this.size.w, h:this.size.h/2},
			bottom: {x:this.location.x, y:this.location.y+(this.size.h/2)+this.bbox_padding,w:this.size.w,h:this.size.h/2},
			fullBox: {x:this.location.x-this.bbox_padding,y:this.location.y-this.bbox_padding,w:this.size.w+(this.bbox_padding*2),h:this.size.h+(this.bbox_padding*2)}			
		}
		
		this.boxes = boxes;
	},
	
	//TODO this will be replaced with rendor and actually merged
	draw : function(ctx){
		if(this.sprite.type == 'rectangle'){
			ctx.fillStyle = this.sprite.fill;
  			ctx.fillRect(this.size.x, this.size.y, this.size.w, this.size.h);
  		} else if(this.sprite.type == 'sprite') {
  			this.render();	
  		}
  		//calculate boxes every time is draws!
  		this.calculate_boxes();
	},
	
	render: function(){
		//TODO straighten this up some
		if(this.sprite.resource.image != ''){
			this.engine.ctx.drawImage(this.sprite.resource.image,this.sprite.sprite_pos.x,this.sprite.sprite_pos.y,this.sprite.size.w,this.sprite.size.h,this.location.x, this.location.y, this.size.w, this.size.h);
		}
	},
	
	move_to:function(x,y){
		x = x || this.location.x;
		y = y || this.location.y;
		this.location.x = x;
		this.location.y = y;
	},
	
	move : function(x,y){
		x = x || 0;
		y = y || 0;
		this.location.x = this.location.x+x;
		this.location.y = this.location.y+y;
	},
	
	resize: function(w,h){
		w = w || 0;
		h = h || 0;
		this.size.w = this.size.w+w;
		this.size.h = this.size.h+h;
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
	},
	
	move_left : function(id){
		//TODO this needs to be tied to speed
		this.move(-(this.physics.speed),0);
		if(this.sprite.type == 'sprite'){
			if(this.sprite.positions.hasOwnProperty('left')){
				this.sprite.sprite_pos = this.sprite.positions.left;
			}
		}
		this.remove_from_on(id);
	},
	
	move_right: function(id){
		this.move(this.physics.speed,0);
		if(this.sprite.type == 'sprite'){
			if(this.sprite.positions.hasOwnProperty('right')){
				this.sprite.sprite_pos = this.sprite.positions.right;
			}
		}
		this.remove_from_on(id);
	},
	
	//can be an object or string + object or id
	collides_with:function(object){		
		var colLoc = [];
		if(this.engine.collider.any_contact(this.boxes.fullBox, object)){
		
			for(box in this.boxes){
				if(box != 'fullBox'){
					if(this.engine.collider.any_contact(this.boxes[box],object)){
						colLoc.push(box);
					}
				}
			}						
			return colLoc;
		} else {
			return false;
		};
	},
	
	//TODO this should be under the actor not the player.. actually all of these should kinda be there
	collides_with_actors : function(){
		var collides = {};
		this.engine.actors.forEach(function(actor){
			if(actor.id != this.id){
				var results = this.collides_with(actor.sprite);
				if(results){
					collides[actor.id] = results;
				}
			}
		}.bind(this));
		return collides;
	}
});