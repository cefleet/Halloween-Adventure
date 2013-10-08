//This is not a structure at all....but a lot of the parts of the structures are needed for this.
//TODO possible make a super class for structures and this called.. something like "spatial objects.."
Game.Structure.EventTrigger = new Game.Class(Game.Structure,{
	initialize: function(options){
				
		Game.Structure.prototype.initialize.apply(this,[options]);
		
		//options should be contact,contact_top, left etc, inside
		this.trigger = this.trigger || 'contact';
		
	},
	
	trigger_event: function(e){
		//TODO this is temp
		console.log('Event Triggered');

		if(typeof e === 'function'){
			e();
		}
	}
	
});
