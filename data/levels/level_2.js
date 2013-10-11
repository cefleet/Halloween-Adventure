var level2 = new Game.Level({
		name:'Level 1: Data Mining!',
		player: {
			start_position: {
				x:10,
				y:10
			}
		},
		//objects_to_load : {
		backgrounds : [
			new Game.Resource.Image.Background({
				name: 'level 2 background',
				url: 'resources/backgrounds/background2.png'
			})
		],
		actors : [
			new Game.Actor({
				name:'batguy',
				size:{
					w:31,
					h:21
				},
				location: {
					x:300,
					y:300
				}				
			})
		],
		structures : [
			new Game.Structure({
				name:'waterPlatform',
				apply_gravity:false,
				size:{
					w:50,
					h:50
				},
				location:{
					x:460,
					y:550
				},
				structure: {
					fill:'#222222'
				}
			}),
			new Game.Structure({
				name:'starting',
				apply_gravity:false,
				size:{
					w:50,
					h:50
				},
				location:{
					x:0,
					y:550
				},
				structure: {
					fill:'#222222'
				}
			}),
			
			new Game.Structure({
				name:'water',
				apply_gravity:false,
				passable:true,
				size:{
					w:500,
					h:10
				},
				location:{
					x:120,
					y:590
				},
				structure: {
					fill:'blue'
				}
			}),
			new Game.Structure({
				name:'ground1',
				apply_gravity:false,
				size:{
					w:300,
					h:20
				},
				location:{
					x:50,
					y:580
				},
				structure: {
					fill:'#222222'
				}
			}),
			new Game.Structure({
				name:'platforme2',
				apply_gravity:false,
				size:{
					w:50,
					h:50
				},
				location:{
					x:100,
					y:440
				},
				structure: {
					fill:'#222222'
				}
			}),
			
			
			new Game.Structure({
				name:'ground2',
				apply_gravity:false,
				size:{
					w:200,
					h:20
				},
				location:{
					x:600,
					y:580
				},
				structure: {
					fill:'#222222'
				}
			}),
			new Game.Structure({
				name:'platform3',
				apply_gravity:false,
				size:{
					w:100,
					h:40
				},
				location:{
					x:250,
					y:420
				},
				structure: {
					fill:'#222222'
				}
			}),
			new Game.Structure({
				name:'final_platform',
				apply_gravity:false,
				size:{
					w:50,
					h:70
				},
				location:{
					x:750,
					y:530
				},
				structure: {
					fill:'#222222'
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
					x:746,
					y:450
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
				text:'Cool Dude!',
				font:'80px Georgia',
				location: {
					x:50,
					y:99
				}
			})
		]		
});

level2.structures[8].events.push(
		new Game.Event({
			action : function(){
				this.texts[0].add_to_on(this.texts[0].show);
				
				/*setTimeout(function(){
					this.engine.levels[1].load();
				}.bind(this), 500)
				*/
			}.bind(level2)
		})
);