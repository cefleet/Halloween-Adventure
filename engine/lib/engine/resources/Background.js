Game.Resource.Image.Background = new Game.Class(Game.Resource.Image,{
	
	initialize: function(options){
		Game.Resource.Image.prototype.initialize.apply(this,[options]);
		this.type = options.type || 'background';
	}	
});