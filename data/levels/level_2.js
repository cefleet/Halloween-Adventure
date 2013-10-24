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
		structures : [
			new Game.Structure({
				name:'waterPlatform',
				apply_gravity:false,
				size:{
					w:50,
					h:50
				},
				location:{
					x:450,
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
			
			new Game.Structure.EventTrigger({
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

//TODO so much wrongness here
level2.structures[2].events.push(
	new Game.Event({
		action : function(){
			setTimeout(function(){
				//needing a referencesing system so badly right now
				Platformer.player.move_to(10,10);
				Platformer.levels[1].load();
				this.structures[2].events[0].reset_tick();
				this.structures[2].events[0].status = 1;

				//reset the event somehow	
			}.bind(this), 400)
		}.bind(level2)
	})
);

var patrol = function(actor){
	this.tick = 1;	
	this.actor = actor;
}
patrol.prototype = {
		pattern : function(){
			if(typeof this.tick === 'undefined'){
				this.tick = 1
			}
			if(this.tick == 1){
				this.move(4,0);
				this.tick = this.tick+1;
			} else if(this.tick == 2){
				this.move(0,4);
				this.tick = this.tick+1;
			} else if(this.tick == 3){
				this.move(-4,0);
				this.tick = this.tick+1;
			} else if(this.tick == 4){
				this.move(0,-4);
				this.tick = 1;
			}
		}
}

var spikePatrol = new patrol(level2.actors[0]);

level2.actors[0].add_to_on(spikePatrol.pattern);
