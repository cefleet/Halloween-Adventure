var level1 = new Game.Level({
		name:'Level 1: armagedon!',
		player: {
			start_position: {
				x:10,
				y:10
			}
		},
		//objects_to_load : {
		backgrounds : [
			new Game.Resource.Image.Background({
				name: 'level 1 background',
				url: 'resources/backgrounds/background.png'
			})
		],
		actors : [
		],
		structures : [
			new Game.Structure({
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
			}),
				
			new Game.Structure({
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
			}),
			new Game.Structure({
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
			}),
			new Game.Structure({
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
			}),
			new Game.Structure({
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
			}),
			new Game.Structure({
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
			}),
			new Game.Structure({
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
			}),
			new Game.Structure.EventTrigger({
				name:'exit_door',
				apply_gravity: false,
				passable:true,
				size:{
					w:60,
					h:80
				},
				location:{
					x:734,
					y:30
				},
				structure:{
					draw_type:'sprite',
					sprite:new Game.Resource.Image.Sprite({
						name:'exit',
						id:"exit",
						url:'resources/sprites/exit.png'
					})
				},
				events: []				
			})	
		],
		events: [],
		texts: [
			new Game.Text({
				name:'OpenText',
				text:'Halloween Adventure',
				font:'80px Georgia',
				location: {
					x:50,
					y:99
				}
			})
		]		
	});
	
	level1.structures[7].events.push(
		new Game.Event({
			action : function(){
				this.texts[0].text = 'Level 1 Completed';
				this.texts[0].add_to_on(this.texts[0].show);
				setTimeout(function(){
					this.engine.levels[1].load();
				}.bind(this), 500)
				
				//TODO begin load for level 2
			}.bind(level1)
		})
	);