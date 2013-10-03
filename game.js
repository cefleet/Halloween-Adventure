var Platformer;
document.addEventListener('DOMContentLoaded', function() {
	
	load();
	//probably should do this from the engine as well
	//Engine.add_to_engine(player);
	
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
		
		/*
		var contacts = player.collides_with_actors();
		var eContact = player.collides_with(enemy.sprite);
		if(eContact){
			if(eContact.indexOf('bottom') > -1){										
				//player.move_to(null,platform.structure.y-player.sprite.h);
				//player.add_to_on(player.jump)
				player.move(0,-10);
			}
			
			if(eContact.indexOf('top') > -1){				
				//cannot really happen here
			}
			
			if(eContact.indexOf('left') > -1){
				enemy.move(-10,0);
			}
			
			if(eContact.indexOf('right') > -1){
				enemy.move(10,0);
			}
		}
		
		var pContact = player.collides_with(platform.structure);
		
		if(pContact){
			if(pContact.indexOf('bottom') > -1){										
				
				if([1,2,3,4].indexOf(player._jump) < 0){
					player.move_to(null,platform.structure.y-player.sprite.h);
					player._can_jump = true;			
				}
			}
			
			if(pContact.indexOf('top') > -1){
				
				player.move_to(null,platform.structure.y+platform.structure.h+6);
				player._stop_jump();		

			}
			
			if(pContact.indexOf('left') > -1){
				player.move_to(platform.structure.x+platform.structure.w+8,null);
			}
			
			if(pContact.indexOf('right') > -1){
				player.move_to(platform.structure.x-player.sprite.w-8,null);
			}
		}
		*/
		//TODO this would not be needed if all the resources were pre-loaded
		/*if(resObjs.background.image != '' && resObjs.background.image != null){
			this.ctx.drawImage(resObjs.background.image,0,0,800,600,0, 0, 800, 600);
		}*/
		this.actors.forEach(function(actor){
			actor.on();
		}.bind(this));
		
	/*
		
		for(bbox in this.actors[0].boxes){
			Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
			Platformer.ctx.fillRect(this.actors[0].boxes[bbox].x, this.actors[0].boxes[bbox].y, this.actors[0].boxes[bbox].w, this.actors[0].boxes[bbox].h);
		}
		
		/*
		Platformer.ctx.globalAlpha=0.5;
		Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
		Platformer.ctx.fillRect(player.boxes.top.x, player.boxes.top.y, player.boxes.top.w, player.boxes.top.h);
		 */
		
	}.bind(Platformer);
		
	Platformer.init();
});
