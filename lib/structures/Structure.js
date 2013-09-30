Game.Structure = function Structure(options){
	this.structure = {};
	this.id = $uid();
	this.initilize(options);
	
}

Game.Structure.prototype = {
	
	initilize: function(options){
	
		Game.Util.extend(this, options);
		this.apply_gravity  = this.apply_gravity || false;
		this.passable = this.passable || false;
	},
	
	draw : function(ctx){
		// gonna need to know if it is on screen or not
		ctx.fillStyle = this.structure.fill;
  		ctx.fillRect(this.structure.x, this.structure.y, this.structure.w, this.structure.h);
	},
	
	add_to_engine: function(engine){
		engine.structures.push(this);
		this.engine = engine;
	},

}
