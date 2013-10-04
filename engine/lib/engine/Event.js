Game.Event = new Game.Class({
	initialize : function(options){
		this.action = this.action || function(){
			console.log('no action')
		}
		
		Game.Util.extend(this,options);
	},
	
	add_to_engine : function(engine){
		this.engine = engine;
		engine.events.push(this);
	},
	//TODO of course there needs to be more logic here
	run_event : function(){
		var action = this.action;
		action();
	}
});
