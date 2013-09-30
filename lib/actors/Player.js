Game.Actor.Player = function Player(options, playerOptions){
	this.initilize(options);
	this._can_jump = false;
}
Game.Actor.Player.prototype = new Game.Actor;

Game.Util.extend(Game.Actor.Player.prototype, {
	jump: function(id){
		
 		this._jump_force = this._jump_force || 1700; //initial force
		this._jump_range = this._jump_range || 60; //duration
		
		if (this._jump == null && this._can_jump != false){
			this._can_jump = false;
			this.avatar._yVelocity = -10;
			this.avatar._yAccel = (this._jump_force/this.avatar._mass);
			this._jump = 1;
		} else if(this._jump >= this._jump_range){		
			this._jump = null;
			this.remove_from_on(id);
		}		
	
		if(this._jump != null){
			this._jump_cycle();
		}		
	},
	
	_jump_cycle: function(){
		this._jump = this._jump+1;		
				
		this.avatar._yAccel -= (this.engine.gravity.accel*(this._jump));
		this.avatar._yVelocity = this.avatar._yVelocity + this.avatar._yAccel;
		
		if(this._jump < 5){
			this.avatar._yVelocity = this.avatar._yVelocity - (5/this._jump)*10
		}

		if(this.avatar._yAccel < 0){
			this.avatar._yAccel = 0;
			this.avatar._yVelocity = 0;
		}		
	},
	
	_stop_jump: function(){
		this._jump = this._jump_range+1;
		this.avatar._yAccel = 0;
		this.avatar._yVelocity = 0;
	},
	
	move_left : function(id){
		//todo this is just an arbituary number
		this.move(-4,0);
		this.remove_from_on(id);
	},
	
	move_right: function(id){
		this.move(4,0);
		this.remove_from_on(id);
	},
	
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
	}
});
