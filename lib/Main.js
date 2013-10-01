var Game = {};

var libFiles = [
	"tools/Util.js",
	"tools/Class.js",
	"engine/Engine.js",
	"engine/Resource.js",
	"engine/Gravity.js",
	"engine/KeyMap.js",
	"engine/Collision.js",
	"actors/Actor.js",
	"actors/Player.js",
	"structures/Structure.js"
];

for (var i=0, len=libFiles.length; i<len; i++) {
	document.write("<script src='lib/" + libFiles[i] + "'></script>");
}