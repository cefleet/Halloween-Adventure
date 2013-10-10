Game.Level = new Game.Class({
	initialize: function(options){
		
		Game.Util.extend(this,options);
		this.id = this.id || $uid();
		this.name = this.name || this.id;
		this.objects_to_load = this.objects_to_load || {}
		
	},
	
	load : function(){
		this.engine.stop_loop();
		//TODO all of these items should simple reside in the level and if it is the same thing
		//then it needs to 
		if(!this.engine.hasOwnProperty('store')){
			this.engine.store = {};
		}
		//store all structures,actors,backgrounds,events,text,and triggers
		this.engine.store.structures = this.engine.structures;
		this.engine.structures = [];
		this.engine.store.actors = this.engine.actors;
		this.engine.actors = [];
		this.engine.store.backgrounds = this.engine.backgrounds;
		this.engine.backgrounds = [];
		this.engine.store.events = this.engine.events;
		this.engine.events = [];
		this.engine.store.texts = this.engine.texts;
		this.engine.texts = [];
		this.engine.store.triggers = this.engine.triggers;
		this.engine.triggers = [];
		
		//load resources
		console.log(this.engine);
		
		
		this.start();
	},
	
	start: function(){
		console.log('starting '+this.name);
		this.engine.game_loop();
	},
	
	add_to_engine : function(engine){
		if(!engine.hasOwnProperty('levels')){
			engine.levels = [];
		}
		engine.levels.push(this);
		this.engine = engine;
	},
	
	load_objects: function(){
		
	}
	
});
