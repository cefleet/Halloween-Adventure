function load(){
	//This is non engine related stuff like ... making a game
	Platformer = new Game.GameEngine('Gamer',{
	   msPerFrame:17,
		config: {
			width:800,
			height:600,
			backgroundColor:'#efefef',
			gravity:12			
		}
	});

/*
	var resources = {
		Sprite:{
			player:{
				name:'player',
				"id":"player1",
				url:'resources/sprites/player.png'
			},
		},
		Background:{
			background:{
				url:'resources/backgrounds/background.png'
			}
		}
	};
	
	resObjs = {};
	
	//TODO this is all wrong
	for(type in resources){
		for(resource in resources[type]){			
			resObjs[resource] = new Game.Resource.Image[type](resources[type][resource]);
			resObjs[resource].add_to_engine(Platformer);
		}
	},
*/	
	var background = new Game.Resource.Image.Background({
		name: 'level 1 background',
		url: 'resources/backgrounds/background.png'
	});
	background.add_to_engine(Platformer);
	background.set_background();
	console.log(background);
	
	var player = new Game.Actor.Player({		
		name: 'Player',
		physics:{
			mass:3,
			apply_gravity:true,
			jump_force:350,
			jump_range:10,
			speed:8			
		},
		size:{
			h:50,
			w:50
		},
		location:{
			x:10,
			y:10		
		},
		sprite : {			
			type:'sprite',
			resource: new Game.Resource.Image.Sprite({
				name:'player',
				id:"player1",
				url:'resources/sprites/player.png'
			}),
			positions : {
				'left':{
					x:0,
					y:0
				},
				'right':{
					x:50,
					y:0
				}
			}
		}
	});
	/*
	var enemy = new Game.Actor({		
		name: 'Enemey',
		physics:{
			apply_gravity:true,
		},
		size: {
			h:60,
			w:20	
		},
		location:{
			x:500,
			y:10
		},
		sprite : {
			type:'rectangle',			
			fill:'#f62805'
		}
	});
	*/
	var platform = new Game.Structure({
		name:'aPlatform',
		apply_gravity:false,
		structure: {
			x:10,
			y:460,
			h:150,
			w:100,
			fill:'#222222'
		}
	});
	
	player.add_to_engine(Platformer);
	//enemy.add_to_engine(Platformer);
	platform.add_to_engine(Platformer);
	
	var keyMap = new Game.KeyMap({
		"move_left": {
			key_code:65,
			key_ddavalue:'a',
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
};