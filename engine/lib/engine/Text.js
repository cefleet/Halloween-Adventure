Game.Text = new Class({
	initialize: function(options){
		Game.Util.extend(this, options);
		this.id = this.id || $uid();
		this.text = this.text || '';
		this.location = this.location || 10,10;
		this.font = this.font || '20px Georgia';
		//todo could be more
	},
	
	add_to_engine: function(engine){
		this.engine = engine;
		engine.text.push(this);
	},
	
	draw : function(){
		this.engine.ctx.font = this.font;
		this.engine.ctx.fillText(this.text, this.location.x,this.location.y);
	},
	
	turn_on : function(){
		
	},
	
	turn_off: function(){
		
	}
	
});
