var Platformer;
document.addEventListener('DOMContentLoaded', function() {

	//This is non engine related stuff like ... making a game
	Platformer = new Game.GameEngine('Gamer',{
	   msPerFrame:17,
		config: {
			width:800,
			height:600,
			gravity:12,
		}
	});

	//This of course needs to be an object
	var resources = {
		player:{
			url:'resources/sprites/player.png'
		}
	};
	
	resObjs = {};
	
	//TODO this is all wrong
	for(resource in resources){
		resObjs[resource] = new Game.Resource(resources[resource]);
		resObjs[resource].load(resources[resource].url);
	}

	var player = new Game.Actor.Player({		
		name: 'Player',
		apply_gravity:true,
		_jump_force:350,
		//this is affected by fps
		_jump_range:10,
		sprite : {
			x:10,
			y:10,
			h:40,
			w:40,
			fill:'#35b517',
			_mass:3,
			type:'sprite',
			image : resObjs.player
		}
	});
	
	var enemy = new Game.Actor({		
		name: 'Enemey',
		apply_gravity:true,
		sprite : {
			x:500,
			y:10,
			h:60,
			w:20,
			fill:'#f62805'
		}
	});
	
	var platform = new Game.Structure({
		name:'aPlatform',
		apply_gravity:false,
		structure: {
			x:10,
			y:460,
			h:150,
			w:100,
			fill:'#dddddd'
		}
	});
	
	//probably should do this from the engine as well
	//Engine.add_to_engine(player);
	player.add_to_engine(Platformer);
	enemy.add_to_engine(Platformer);
	platform.add_to_engine(Platformer);
	
	Game.Actor.prototype.check_floor = function(){
		if(this.sprite.y > Platformer.canvas.height-this.sprite.h){
			this.sprite.y = Platformer.canvas.height-this.sprite.h;
			this._can_jump = true;
		}
	}
	
	
	var keyMap = new Game.KeyMap({
		"move_left": {
			key_code:65,
			key_value:'a',
			action:player.move_left,
			bind: player
		},
		"move_right": {
			key_code:68,
			key_value:'d',
			action: player.move_right,
			bind: player
		},
		"jump": {
			key_code:32,
			key_value:'spacebar',
			action: player.jump,
			bind: player
		}
	});
	
	keyMap.add_to_engine(Platformer);	
	
	player.add_to_on(player.check_floor);	
	enemy.add_to_on(enemy.check_floor);
	keyMap.listen_for_key_event();
	var bob = 1;

	//overides the default renderer
	Platformer.render = function(){
		bob++;
		if(bob < 3){
			console.log(resObjs);
		}
		//checks the key events 
		for(keyEvent in keyMap.keyEvents){
			if(keyMap.isDown(keyEvent)){
				
				if(keyMap.keyEvents[keyEvent] != 'jump' || player._can_jump == true){
  					var action = keyMap.keyEvents[keyEvent];
					keyMap.map[action].bind.add_to_on(keyMap.map[action].action);
				}
			}
		}
		
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
				
		this.actors.forEach(function(actor){
			actor.on();
		}.bind(this));
		

		/*
		for(bbox in player.boxes){
			Platformer.ctx.globalAlpha=0.5;
			Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
			Platformer.ctx.fillRect(player.boxes[bbox].x, player.boxes[bbox].y, player.boxes[bbox].w, player.boxes[bbox].h);
		}
		*/
		/*
		Platformer.ctx.globalAlpha=0.5;
		Platformer.ctx.fillStyle ='#'+Math.floor(Math.random()*16777215).toString(16);
		Platformer.ctx.fillRect(player.boxes.top.x, player.boxes.top.y, player.boxes.top.w, player.boxes.top.h);
		 */
		
	}.bind(Platformer);
		
	Platformer.init();
});
