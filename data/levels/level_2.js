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
				name: 'level 1 background',
				url: 'resources/backgrounds/background.png'
			})
		],
		actors : [],
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
			})
		],
		events: [],
		texts: []		
});
	