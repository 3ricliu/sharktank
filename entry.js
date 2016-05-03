var Game = require("./lib/game.js");
var Util = require("./lib/util.js");

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = 550;
canvasEl.height = 700;

var ctx = canvasEl.getContext("2d");
var game = new Game(ctx);

game.home();
