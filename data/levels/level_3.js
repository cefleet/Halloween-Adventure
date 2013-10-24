var level3 = new Game.Level({
	name:'Danger!',
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
	actors:[
		new Game.Actor({
				name:'spiky',
				size:{
					w:50,
					h:50
				},
				location: {
					x:400,
					y:270
				},
				physics:{
					mass:0,
					apply_gravity:false,
					jump_force:0,
					jump_range:0,
					speed:8			
				},
				sprite : {			
					
					type:'sprite',
					resource: new Game.Resource.Image.Sprite({
						name:'batman',
						id:"batman",
						url:'resources/sprites/spikey.png'
					})
					
				}			
			})
	],
	structures:[
		new Game.Structure({
			name:'floor',
			apply_gravity:false,
			size:{
				w:800,
				h:120	
			},
			location:{
				x:0,
				y:580
			},
			structure: {
				fill:'#222222'
			}
		}),
		new Game.Structure({
			name:'starting',
			apply_gravity:false,
			size:{
				w:100,
				h:240	
			},
			location:{
				x:0,
				y:400
			},
			structure: {
				fill:'#222222'
			}
		}),
		new Game.Structure({
			name:'open2',
			apply_gravity:false,
			size:{
				w:80,
				h:120	
			},
			location:{
				x:220,
				y:500
			},
			structure: {
				fill:'#222222'
			}
		}),
		new Game.Structure({
			name:'finish1',
			apply_gravity:false,
			size:{
				w:60,
				h:200	
			},
			location:{
				x:700,
				y:420
			},
			structure: {
				fill:'#222222'
			}
		}),
		new Game.Structure.EventTrigger({
			name:'pointy_evil',
			apply_gravity:false,
			size:{
				w:120,
				h:40	
			},
			location:{
				x:100,
				y:560
			},
			structure: {
				fill:'#ec5e5e'
			}
		})
	],
	events:[],
	texts:[]
		
});

level2.structures[4].events.push(
		new Game.Event({
			action : function(){
				this.engine.player.move_to(0,0);
				/*setTimeout(function(){
					this.engine.levels[1].load();
				}.bind(this), 500)
				*/
			}.bind(level2)
		})
);