// <script type="application/javascript" src="lib/game.js"></script>
// <script type="application/javascript" src="lib/gameView.js"></script>
// <script type="application/javascript" src="lib/util.js"></script>
// <script type="application/javascript" src="lib/movingObject.js"></script>
// <script type="application/javascript" src="lib/shark.js"></script>
// <script type="application/javascript" src="lib/spikes.js"></script>
// <script type="application/javascript" src="lib/topSpikes.js"></script>
// <script type="application/javascript" src="lib/bottomSpikes.js"></script>
// <script type="application/javascript" src="lib/scoreboard.js"></script>
// <script type="application/javascript" src="vendor/keymaster.js"></script>

// if this works, try it without the .js
var Game = require("./lib/game.js");
var GameView = require("./lib/gameView.js");
var Util = require("./lib/util.js");

var canvasEl = document.getElementsByTagName("canvas")[0];
canvasEl.width = Game.DIM_X;
canvasEl.height = Game.DIM_Y;

var ctx = canvasEl.getContext("2d");
var game = new Game(ctx);

game.home();


// new GameView(game, ctx).home();
