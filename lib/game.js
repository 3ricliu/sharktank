var SideSpikes = require("./sideSpikes.js");
var TopBottomSpikes = require("./topBottomSpikes.js");
var Scoreboard = require("./scoreboard.js");
var Shark = require("./shark.js");
var Util = require("./util.js");
var BoostHolder = require("./boostHolder.js");


function Game (ctx) {
  this.ctx = ctx;
  this.spikes = [];
  this.shark;
  this.boostHolder;
  this.scoreboard;
  this.inGame = false;
  this.util = new Util(this);
  this.highScore = parseInt(localStorage.highScore) || 0;
  this.gamesPlayed = parseInt(localStorage.gamesPlayed) || 0;

  this.util.addDocumentListeners();
}

Game.DIM_X = 550;
Game.DIM_Y = 700;

Game.prototype.home = function () {
  this.addShark();
  this.addTopBottomSpikes();
  this.addScoreboard();
  this.addBoostHolder();
  this.floatShark();
};

Game.prototype.over = function () {
  cancelAnimationFrame(0);

  if(this.highScore === undefined || this.scoreboard.score > this.highScore) {
    this.highScore = this.scoreboard.score;
    localStorage.setItem("highScore", this.scoreboard.score);
  }

  this.spikes = [];
  this.shark = null;
  this.scoreboard = null;
  this.inGame = false;
  this.home();
};

Game.prototype.floatShark = function () {
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = "rgba(242, 241, 239, .7)";
  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.draw(this.ctx);
  this.shark.float();

  this.ctx.fillStyle = "#6C7A89";
  this.ctx.font = "75px Verdana";
  this.ctx.textAlign = "center";
  this.ctx.fillText("SHARKTANK", 275, 150);

  this.ctx.font = "25px Verdana";
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "white";

  this.ctx.fillText("[SPACE]", 300, 300);
  this.ctx.fillText("TO SWIM", 300, 325);
  this.ctx.fillText("BEST SCORE: " + this.highScore, 300, 550);
  this.ctx.fillText("GAMES PLAYED: " + this.gamesPlayed, 300, 600);

  if(!this.inGame) {
    requestAnimationFrame(this.floatShark.bind(this));
  }
};

Game.prototype.start = function () {
  this.addSpikes();
  this.addBoostHolder();
  this.util.addShark(this.shark);
  this.shark.floatDirection = null;
  this.shark.vel = [5,-7];
  this.animate();


  if(this.gamesPlayed === undefined) {
    this.gamesPlayed = 1;
    localStorage.setItem("gamesPlayed", 1);
  } else {
    this.gamesPlayed += 1;
    var currGamesPlayed = parseInt(localStorage.gamesPlayed) + 1;
    localStorage.setItem("gamesPlayed", currGamesPlayed);
  }
};

Game.prototype.animate = function () {
  this.step();
  this.draw(this.ctx);
  // this.lastTime = time;
  if(this.inGame) {
    requestAnimationFrame(this.animate.bind(this));
  }
};

Game.prototype.addTopBottomSpikes = function () {
  this.spikes.push(new TopBottomSpikes({game: this, position: "top"}));
  this.spikes.push(new TopBottomSpikes({game: this, position: "bottom"}));
};

Game.prototype.addSpikes = function () {
  this.spikes.push(new SideSpikes({game: this}));
};

Game.prototype.addBoostHolder = function () {
  this.boostHolder = new BoostHolder ({game: this});
};

Game.prototype.addShark = function () {
  var shark = new Shark({
    game: this,
    canvas_width: Game.DIM_X,
    canvas_height: Game.DIM_Y
  });

  this.shark = shark;
};

Game.prototype.addScoreboard = function () {
  var scoreboard = new Scoreboard({
    game: this,
    shark: this.shark
  });

  this.scoreboard = scoreboard;
};

Game.prototype.allObjects = function () {
  return [].concat(this.scoreboard, this.spikes, this.shark, this.boostHolder);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = "rgba(242, 241, 239, .4)";
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.moveObjects = function () {
  this.shark.move();
};

Game.prototype.checkCollisions = function () {
  this.spikes.forEach(function (spike) {
    if(spike.isCollidedWith(this.shark)) {
      spike.collideWith(this.shark);
    }
  }.bind(this));

  if(this.boostHolder.isCollidedWith(this.shark)) {
    this.boostHolder.collideWith();
  }
};


module.exports = Game;
