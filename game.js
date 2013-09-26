var GameEngine = function GameEngine(name){
	this.name = name;
	console.log('A Game is Born named '+this.name);	
};


GameEngine.prototype = {
	init :function(){
				
		this.canvas = $nE('canvas', {id:"game"});
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = 1000;
		this.canvas.height = 800;
		//this will be a full object later
		this.player = {
			tick : 1,
			gravity:true,
			upforce:0,
			avatar:new Shape(10,10, 12, 22, '#efefef')
		};
		
		//Draws the canvas 		
		this.enimies = [
			new Shape(100,30, 10, 10, '#11aa66'),
			new Shape(45,76, 10, 10, '#dd4422')
		];
		
		this.gravity = new Gravity(6);
		
		$aC(document.body,[this.canvas]);
		this.gameLoop();
		
	},
	
	render : function(){
		//preforms changes to the elements
		this.player.tick = this.player.tick + 1;
		if(this.player.tick == 60){
			//this is silly but it demostrates it the upforce needs to be a fast curve up
			this.player.upforce = 150;
			this.player.tick = 1;
		}
		
		//apply gravity
		this.gravity.apply(this.player.avatar, this.player.upforce);
		
		//this of course needs to be a jump funciton		
		this.player.upforce = 0;

		//keeps it from falling through the floor 
		if(this.player.avatar.y >= this.canvas.height-22){		
			this.player.avatar.y = this.canvas.height-22;
		}

		//clears the elements
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		
		//redraws the elements
		this.player.avatar.draw(this.ctx);
		this.enimies.forEach(function(enemy){
			enemy.draw(this.ctx);
		}.bind(this));
	},
	
	gameLoop: function(){
		//renders the screen 
		this.render();
		
		//then does it again
		requestAnimFrame(this.gameLoop.bind(this));
	}
}

var Gravity = function Gravity(f){
	this.f = f || .2;
}

Gravity.prototype = {
	
	//Every object that gravity applies to gets this force pulled down on it
	apply : function(obj,oF){
		oF = oF || 0;
		obj.y = obj.y+(this.f-oF);
	}	
}

//simple shape
var Shape = function Shape(x, y, w, h, fill){
	this.x = x || 0;
  	this.y = y || 0;
  	this.w = w || 1;
  	this.h = h || 1;
  	this.fill = fill || '#AAAAAA'; 		  		  	
}

Shape.prototype = { 	
	draw : function(ctx){
		ctx.fillStyle = this.fill;
  		ctx.fillRect(this.x, this.y, this.w, this.h);
	},
	move : function(x,y){
		x = x || 0;
		y = y || 0;
		this.x = this.x+x;
		this.y = this.y+y;
	},
	resize: function(w,h){
		w = w || 0;
		h = h || 0;
		this.w = this.w+w;
		this.h = this.h+h;
	},
	colorize: function(color){
		color = color || '#AAAAAA';
		this.fill = color;
	}
} 

document.addEventListener('DOMContentLoaded', function() {
	var Game = new GameEngine('Gamer');
	Game.init();
});
