Game.Actor.Player = new Game.Class(Game.Actor,{
		
	jump: function(id){
		
 		this._jump_force = this._jump_force || 1700; //initial force
		this._jump_range = this._jump_range || 60; //duration
		
		if (this._jump == null){
			this._can_jump = false;
			this.sprite._yVelocity = -10;
			this.sprite._yAccel = (this._jump_force/this.sprite._mass);
			this._jump = 1;
		} else if(this._jump >= this._jump_range){		
			this._jump = null;
			this.remove_from_on(id);
		}		
	
		if(this._jump != null){
			this._jump_cycle(id);
		}		
	},
	
	_jump_cycle: function(id){
		this._jump = this._jump+1;		
				
		this.sprite._yAccel -= (this.engine.gravity.accel*(this._jump));
		this.sprite._yVelocity = this.sprite._yVelocity + this.sprite._yAccel;
		
		//TODO this is "supposed" emulate spring.. it doesnt work... at all really
		if(this._jump < 5){
			this.sprite._yVelocity = this.sprite._yVelocity - (5/this._jump)*10
		}

		if(this.sprite._yAccel < 0){
			this.sprite._yAccel = 0;
			this.sprite._yVelocity = 0;
		}		
	},
	
	_stop_jump: function(){
		this._jump = this._jump_range+1;
		this.sprite._yAccel = 0;
		this.sprite._yVelocity = 0;
	},
	
	move_left : function(id){
		//TODO this needs to be tied to speed
		this.move(-(this.speed),0);
		this.sprite.sprite_pos = this.sprite.positions.left;
		this.remove_from_on(id);
	},
	
	move_right: function(id){
		this.move(this.speed,0);
		this.sprite.sprite_pos = this.sprite.positions.right;
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