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

	var background = new Game.Resource.Image.Background({
		name: 'level 1 background',
		url: 'resources/backgrounds/background.png'
	});
	background.add_to_engine(Platformer);
	background.set_background();
	
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
	
	var openTxt = new Game.Text({
		name:'OpenText',
		text:'Halloween Adventure',
		font:'80px Georgia',
		location: {
			x:50,
			y:99
		}
	});
	
	openTxt.add_to_engine(Platformer);
	
	var starting = new Game.Structure({
		name:'aPlatform',
		apply_gravity:false,
		size:{
			w:60,
			h:120
		},
		location:{
			x:0,
			y:480
		},
		structure: {
			fill:'#222222'
		}	
	});
	
	var secondPlatform = new Game.Structure({
		name:'second',
		apply_gravity: false,
		size:{
			w:120,
			h:20
		},
		location:{
			x: 100,
			y:500
		},
		structure:{
			fill:"#000000"
		}
	});
	
	secondPlatform.add_to_engine(Platformer);
	
	var thirdPlatform = new Game.Structure({
		name:'third',
		apply_gravity: false,
		size:{
			w:55,
			h:90
		},
		location:{
			x:240,
			y:510
		},
		structure:{
			fill:"#2930ba"
		}
	});
	
	thirdPlatform.add_to_engine(Platformer);
	
	var forthPlatform = new Game.Structure({
		name:'forth',
		apply_gravity: false,
		size:{
			w:70,
			h:20
		},
		location:{
			x:320,
			y:400
		},
		structure:{
			fill:"#000000"
		}
	});	
	
	forthPlatform.add_to_engine(Platformer);
	
	var fithPlatform = new Game.Structure({
		name:'fith',
		apply_gravity: false,
		size:{
			w:50,
			h:50
		},
		location:{
			x:490,
			y:300
		},
		structure:{
			fill:"#2930ba"
		}
	});	
	
	fithPlatform.add_to_engine(Platformer);
	
	var sixthPlatform = new Game.Structure({
		name:'sixth',
		apply_gravity: false,
		size:{
			w:40,
			h:40
		},
		location:{
			x:580,
			y:200
		},
		structure:{
			fill:"#000000"
		}
	});	
	
	sixthPlatform.add_to_engine(Platformer);
	
	var finalPlatform = new Game.Structure({
		name:'final',
		apply_gravity: false,
		size:{
			w:100,
			h:500
		},
		location:{
			x:700,
			y:110
		},
		structure:{
			fill:"#2930ba"
		}
	});	
	
	finalPlatform.add_to_engine(Platformer);
	
	var exitTrigger = new Game.Structure.EventTrigger({
		name:'level_1_exit',
		apply_gravity: false,
		size:{
			w:60,
			h:80
		},
		location:{
			x:734,
			y:30
		},
		structure:{
			fill:'#000000'
		}
	});
	
	exitTrigger.add_to_engine(Platformer);
	/*

	/*
	var thirdPlatform = new Game.Structure({
		name:'third',
		apply_gravity: false,
		size:{
			w:100,
			h:30
		},
		location:{
			x:400,
			y:380
		},
		structure:{
			fill:"#447700"
		}
	});
	
	var fouthPlatform = new Game.Structure({
		name:'third',
		apply_gravity: false,
		size:{
			w:70,
			h:100
		},
		location:{
			x: 700,
			y:500
		},
		structure:{
			fill:"#447700"
		}
	});
	*/
	player.add_to_engine(Platformer);
	starting.add_to_engine(Platformer);
	//secondPlatform.add_to_engine(Platformer);
	//thirdPlatform.add_to_engine(Platformer);
	//fouthPlatform.add_to_engine(Platformer);
	
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