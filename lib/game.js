var SideSpikes = require("./sideSpikes.js");
var TopBottomSpikes = require("./topBottomSpikes.js");
var Scoreboard = require("./scoreboard.js");
var Shark = require("./shark.js");
var Util = require("./util.js");
var FishHolder = require("./fishHolder.js");


function Game (ctx) {
    this.ctx = ctx;
    this.spikes = [];
    this.shark;
    this.fishHolder;
    this.scoreboard;
    this.inGame = false;
    this.util = new Util(this);
    this.util.addDocumentListeners();
    this.storage = localStorage;
    // this.highScore = parseInt(localStorage.highScore) || 0;
    // this.gamesPlayed = parseInt(localStorage.gamesPlayed) || 0;
};

Game.BG_COLOR = "#F2F1EF";
Game.DIM_X = 550;
Game.DIM_Y = 700;

Game.prototype.home = function () {
  this.addShark();
  this.addTopBottomSpikes();
  this.addScoreboard();
  this.addFishHolder();
  this.floatShark();
}

Game.prototype.over = function () {
  cancelAnimationFrame(0);
  debugger
  if(this.storage.highScore === undefined) {
    this.storage.highScore.setItem("highScore", this.scoreboard.score)
  } else {
    if(parseInt(this.storage.highScore) < this.scoreboard.score) {
      this.storage.highScore.setItem("highScore", this.scoreboard.score)
    }
  }

  // localStorage.highScore === undefined ? localStorage.highScore = this.scoreboard.score || localStorage.highScore
  //
  // if((this.highScore === undefined || localStorage.highScore === undefined) || (this.scoreboard.score > this.highScore || this.scoreboard.score > localStorage.highScore)) {
  //   this.highScore = this.scoreboard.score
  //   localStorage.highScore = this.scoreboard.score
  // }


  this.spikes = [];
  this.shark = null;
  this.scoreboard = null;
  this.inGame = false;
  this.home();
}

Game.prototype.floatShark = function () {
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = "rgba(242, 241, 239, .7)";
  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.draw(this.ctx);
  this.shark.float();

  this.ctx.fillStyle = "#6C7A89";
  this.ctx.font = "75px Verdana";
  this.ctx.textAlign = "center"
  this.ctx.fillText("SHARKTANK", 275, 150);

  this.ctx.font = "25px Verdana";
  this.ctx.textAlign = "center"
  this.ctx.fillStyle = "white";

  this.ctx.fillText("SPACE", 300, 300);
  this.ctx.fillText("TO SWIM", 300, 325);
  this.ctx.fillText("BEST SCORE: " + this.storage.highScore, 300, 550);
  this.ctx.fillText("GAMES PLAYED: " + this.storage.gamesPlayed, 300, 600);

  if(!this.inGame) {
    requestAnimationFrame(this.floatShark.bind(this))
  }
}

Game.prototype.start = function () {
  // this.lastTime = 0;
  this.addSpikes();
  this.addFishHolder();
  this.util.addShark(this.shark);
  this.shark.floatDirection = null;
  this.shark.vel = [5,-7];
  this.animate();
  this.storage.gamesPlayed === undefined ? this.storage.setItem("gamesPlayed", 1) : this.storage.gamesPlayed.setItem("gamesPlayed", (parseInt(this.storage.gamesPlayed) + 1))
  // this.gamesPlayed += 1;
  // requestAnimationFrame(this.animate.bind(this));
  //UNCOMMENT THIS WHEN YOU"RE PLAY
}

Game.prototype.animate = function () {
  this.step();
  this.draw(this.ctx);
  // this.lastTime = time;
  if(this.inGame) {
    requestAnimationFrame(this.animate.bind(this));
  }
}

Game.prototype.addTopBottomSpikes = function () {
  this.spikes.push(new TopBottomSpikes({game: this, position: "top"}))
  this.spikes.push(new TopBottomSpikes({game: this, position: "bottom"}))
};

Game.prototype.addSpikes = function () {
  this.spikes.push(new SideSpikes({game: this}))
};

Game.prototype.addFishHolder = function () {
  this.fishHolder = new FishHolder ({game: this});
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
}

Game.prototype.allObjects = function () {
  return [].concat(this.scoreboard, this.spikes, this.shark, this.fishHolder);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = "rgba(242, 241, 239, .4)";
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  }.bind(this));
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

  if(this.fishHolder.isCollidedWith(this.shark)) {
    this.fishHolder.collideWith(this.shark);
  }
};


module.exports = Game;
