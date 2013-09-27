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
	this.apply_gravity = this.config.apply_gravity; //false may be error here
	this.actors = this.actors || [];
	
};


Game.GameEngine.prototype = {
	
	init :function(){				
		this.ctx = this.canvas.getContext('2d');
	
		$aC(document.body,[this.canvas]);
		this.gameLoop();		
	},
	
	render : function(){
		
		
		this.actors.forEach(function(actor){
			
			//preform the actors actions
			actor.on();
			
			//apply gravity
			if(this.apply_gravity && actor.apply_gravity){
				this.gravity.apply_to_actor(actor);
			}
			
		}.bind(this));
	
		
		//clears the elements
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		//redraws the elements
		this.actors.forEach(function(actor){
			actor.draw(this.ctx);
		}.bind(this));
	},
	
	gameLoop: function(){
		//renders the screen 
		this.render();
		
		//then does it again
		requestAnimFrame(this.gameLoop.bind(this));
	}
}