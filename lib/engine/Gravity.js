Game.Gravity = function Gravity(f){
	this.f = f || .2;
}

Game.Gravity.prototype = {
	
	//Every object that gravity applies to gets this force pulled down on it
	apply : function(obj, oF){
		oF = oF || 0;
		obj.y = obj.y+(this.f-oF);
	},
	
	apply_to_actor : function(actor){
		this.apply(actor.avatar,actor.avatar.upForce);
	}	
}