Game.Collision = function Collision(){
	//Don't know what contstructors are needed
}

Game.Collision.prototype = {
	any_contact : function(rect1,rect2){
		//c is collision
		var c = false;
		if(rect1.x < rect2.x + rect2.w && 
		   rect1.x + rect1.w > rect2.x && 
		   rect1.y < rect2.y + rect2.h && 
		   rect1.y + rect1.h > rect2.y) 
		{
		   	c = true;
		}
		return c;
	}
}
