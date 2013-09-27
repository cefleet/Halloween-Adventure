var Game = {};

var libFiles = [
	"tools/Util.js",
	"tools/Class.js",
	"engine/Engine.js",
	"engine/Gravity.js",
	"actors/Actor.js",
	"actors/Player.js"
];

for (var i=0, len=libFiles.length; i<len; i++) {
	document.write("<script src='lib/" + libFiles[i] + "'></script>");
}