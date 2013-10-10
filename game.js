var Platformer;
document.addEventListener('DOMContentLoaded', function() {
	
	//Dumb ..needs to be load level
	load();
	
	//TODO This should be just a platform
	Game.Actor.prototype.check_floor = function(){
		if(this.location.y > Platformer.canvas.height-this.size.h){
			this.location.y = Platformer.canvas.height-this.size.h;
			
			//todo this is incorrect
			this.physics.can_jump = true;
		}
	}
			
	Platformer.actors.forEach(function(actor){
		actor.add_to_on(actor.check_floor);
	});
	
	Platformer.texts.forEach(function(text){
		text.add_to_on(text.show)
	});
	/*
	player.add_to_on(player.check_floor);	
	enemy.add_to_on(enemy.check_floor);
	*/
	
	Platformer.keymap.listen_for_key_event();
	

	//overides the default renderer
	Platformer.render = function(){
		
		
		//checks the key events 
		
		for(keyEvent in Platformer.keymap.keyEvents){
			if(Platformer.keymap.isDown(keyEvent)){
				if(Platformer.keymap.keyEvents[keyEvent] != 'jump' || Platformer.actors[0].physics.can_jump == true){
  					var action = Platformer.keymap.keyEvents[keyEvent];
					Platformer.keymap.map[action].bind.add_to_on(Platformer.keymap.map[action].action);
				}
			}
		}
		
		this.actors.forEach(function(actor){
			actor.on();
			actor.calculate_heading();
			actor.intersects_structures_line_borders();
			actor.collides_with_triggers();
			actor.collides_with_structures();
			actor.adjust_position_to_structures();
			
		}.bind(this));
		
		this.texts.forEach(function(text){
			text.on();			
		}.bind(this));
		
/*

		for(bbox in this.actors[0].boxes){
			Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
			Platformer.ctx.fillRect(this.actors[0].boxes[bbox].x, this.actors[0].boxes[bbox].y, this.actors[0].boxes[bbox].w, this.actors[0].boxes[bbox].h);
		}

		Platformer.ctx.globalAlpha=0.5;
		Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
		Platformer.ctx.fillRect(player.boxes.top.x, player.boxes.top.y, player.boxes.top.w, player.boxes.top.h);

*/
	
	//var player = Platformer.actors[0];
	//Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
	//Platformer.ctx.fillRect(player.boxes.left.x, player.boxes.left.y, player.boxes.left.w, player.boxes.left.h);
	
		
	}.bind(Platformer);
		
	Platformer.init();
});
