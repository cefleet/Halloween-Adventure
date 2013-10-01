Game.GameEngine = function GameEngine(name,options){
	this.name = name;
	this.tick = 0;
	Game.Util.extend(this,options);	
	
	this.config = this.config || {}
	this.config.apply_gravity = this.config.apply_gravity || true;
	this.config.height = this.config.height || 400;
	this.config.width = this.config.width || 400;
	this.config.gravity = this.config.gravity || 2;
		
	this.canvas = this.canvas || $nE('canvas', {id:"game"});
	this.canvas.width = this.config.width;
	this.canvas.height = this.config.height;
	this.gravity = new Game.Gravity(this.config.gravity);
	this.collider = new Game.Collision(); 
	this.apply_gravity = this.config.apply_gravity; //false may be error here
	this.actors = this.actors || [];
	this.structures = this.structures || [];
	
	//JUst stuff dealing with slowing down the animation
	this.lUT = 0;
	this.frame = 0;
	this.acD = 0;
	//17 ~= 60 fps (1/(FPS)*1000
	this.msPerFrame = this.msPerFrame || 17;	
};


Game.GameEngine.prototype = {
	
	init :function(){				
		this.ctx = this.canvas.getContext('2d');
		this.canvas.backgroundColor="#efefef";
		$aC(document.body,[this.canvas]);
		this.gameLoop();		
	},
	
	//pre_render,post_render and render can all be overwritten
	pre_render: function(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		this.actors.forEach(function(actor){					
			//apply gravity
			if(this.apply_gravity && actor.apply_gravity){
				this.gravity.apply_to_actor(actor);
			}			
		}.bind(this));
		
		this.structures.forEach(function(structure){
			if(this.apply_gravity && structure.apply_gravity){
				this.gravity.apply_to_structure(structure);
			}
		}.bind(this));
	},
	
	post_render: function(){
		
		this.structures.forEach(function(structure){
			structure.draw(this.ctx);
		}.bind(this));
		
		//redraws the elements
		this.actors.forEach(function(actor){
			actor.draw(this.ctx);
		}.bind(this));
	},
	
	render : function(){
		
		this.actors.forEach(function(actor){
			//preform the actors actions
			actor.on();
						
		}.bind(this));
		
	},
	
	gameLoop: function(){
		 
		 requestAnimFrame(this.gameLoop.bind(this));
		
		 var delta = Date.now() - this.lUT;
		 if(this.acD > this.msPerFrame){
		 	this.acD = 0;
		 	//renders the screen
		   this.pre_render(); 
		   this.render();
		   this.post_render();
		   //don't know if i need this
         this.frame++;
         if(this.frame >= 6) this.frame = 0
       } else {
         this.acD += delta;
       };
       this.lUT = Date.now();
	}
}
