var Platformer;
document.addEventListener('DOMContentLoaded', function() {
	Platformer = new Game.GameEngine('Gamer',{
		config: {
			width:600,
			height:300,
			gravity:'1.5'
		}
	});
	var player = new Game.Actor.Shape({		
		name: 'Player',
		apply_gravity:true,
		
		avatar : {
			x:10,
			y:10,
			h:10,
			w:10,
			fill:'#35b517'
		}
	})
	player.add_to_engine(Platformer);
	
	//This is non engine related stuff like ... making a game
	player.tick = 0;
	player.check_floor = function(){
		if(this.avatar.y > Platformer.canvas.height-this.avatar.h){
			this.avatar.y = Platformer.canvas.height-this.avatar.h;
		}
	}
	
	player.check_tick = function(){
		this.tick = this.tick+1;
		if(this.tick > 400){
			this.avatar.upForce = 160;
			this.tick = 0;
		} else {
			this.avatar.upForce = 0;
		}
		
	}
	
	player.on = function(){
		player.check_floor();
		player.check_tick();
	}
	
	Platformer.init();
});
