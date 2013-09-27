var Platformer;
document.addEventListener('DOMContentLoaded', function() {

	//This is non engine related stuff like ... making a game
	Platformer = new Game.GameEngine('Gamer',{
		config: {
			width:600,
			height:300,
			gravity:'9.8'
		}
	});

	var player = new Game.Actor.Player({		
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
	
	player.check_floor = function(){
		if(this.avatar.y > Platformer.canvas.height-this.avatar.h){
			this.avatar.y = Platformer.canvas.height-this.avatar.h-2;
		}
	}.bind(player);
	
	var checkFloor = player.add_to_on(player.check_floor);	
	
	var jumpy = function(){
		player.add_to_on(player.jump);
	}
	
	setInterval(jumpy, 3000);
	
	Platformer.init();
});
