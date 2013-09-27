Game.Actor.Player = function Player(options, playerOptions){
	this.initilize(options);
}
Game.Actor.Player.prototype = new Game.Actor;

Game.Util.extend(Game.Actor.Player.prototype, {
	jump: function(id){
		var f = this.jump_force || 80; //initial force
		var r = this.jump_range || 20; //duration
				
		if (this._jump == null){
			this.avatar.upForce = f;
			this._jump = 1;
		} else if(this._jump >= r){			
			this._jump = null;
			this.remove_from_on(id);
		}
				
		if(this._jump != null){
			this._jump_cycle();
		}		
	},
	
	_jump_cycle: function(){
		this._jump = this._jump+1;
		this.avatar.upForce -= 2*(this._jump);
		
		if(this.avatar.upForce < 0){
			this.avatar.upForce = 0;
		}
		
		console.log(this.avatar.upForce);
	}
});
