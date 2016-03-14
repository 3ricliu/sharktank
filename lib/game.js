var SideSpikes = require("./sideSpikes.js");
var TopSpikes = require("./topSpikes.js");
var BottomSpikes = require("./bottomSpikes.js");
var Scoreboard = require("./scoreboard.js");
var Shark = require("./shark.js");
var Util = require("./util.js");

function Game (ctx) {
    this.ctx = ctx;
    this.spikes = [];
    this.shark;
    this.scoreboard;
    this.direction;
    this.inGame = false;
    this.util = new Util(this);

    this.addSpikes();
    // this.addShark();
    // this.addScoreboard();

    this.util.addDocumentListeners();
};

Game.BG_COLOR = "#F2F1EF";
Game.DIM_X = 700;
Game.DIM_Y = 900;
// Game.FPS = 32;
// Game.NUM_SPIKES = 10;

Game.prototype.add = function (object) {
  // update this when you impliment inheritance

  if (object instanceof SideSpikes) {
    this.spikes.push(object);
  } else if (object instanceof Shark) {
    this.shark = object;
  } else {
    throw "ERROR";
  }
};

Game.prototype.addSpikes = function () {
  // for (var i = 0; i < Game.NUM_SPIKES; i++){
  //   this.add(new Sharktank.Spike({game: this}));
  // }

  // this.add(new Sharktank.TopSpikes({game: this}));
  // this.add(new Sharktank.BottomSpikes({game: this}));

  this.spikes.push(new TopSpikes({game: this}))
  this.spikes.push(new BottomSpikes({game: this}))
  this.spikes.push(new SideSpikes({game: this}))

};

Game.prototype.addShark = function () {
  var shark = new Shark({
    // pos: this.randomPosition(),
    game: this,
    canvas_width: Game.DIM_X,
    canvas_height: Game.DIM_Y
  });

  this.add(shark)
  this.direction = this.shark.direction;

  return shark;
};

Game.prototype.addScoreboard = function () {
  var scoreboard = new Scoreboard({
    game: this,
    shark: this.shark
  });

  this.scoreboard = scoreboard;
}

Game.prototype.bindKeyHandlers = function () {
  // var shark = this.shark;
  // key("space", function () {
  //   shark.jump()
  //   // console.log("space")
  // });
};


Game.prototype.allObjects = function () {
  // debugger
  return [].concat(this.scoreboard, this.spikes, this.shark);
};

Game.prototype.checkCollisions = function () {

  this.spikes.forEach(function (spike) {
      if(spike.isCollidedWith(this.shark)) {
        spike.collideWith(this.shark);
      }
  }.bind(this));
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.fillStyle = Game.BG_COLOR;
  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (object) {
    // debugger
    object.draw(ctx); // this is where the drawing takes place
  }.bind(this));
};

// Game.prototype.isOutOfBounds = function (pos) {
//   return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) ||
//           (pos[1] > Game.DIM_Y);
// };

Game.prototype.moveObjects = function (delta) {
    this.shark.move(delta);
};

// Game.prototype.randomPosition = function () {
//   return [
//     Game.DIM_X * Math.random(),
//     Game.DIM_Y * Math.random()
//   ];
// };

// Game.prototype.remove = function (object) {
//   if (object instanceof Spikes.Shark) {
//     this.bird.splice(this.birds.indexOf(object), 1);
//   } else if (object instanceof Spikes.Spike) {
//     var idx = this.spikes.indexOf(object);
//     this.spikes[idx] = new Spikes.Spike({game: this});
//   }
//   else {
//     throw "HUH"
//   }
// };

Game.prototype.over = function () {
  // alert("over!");
  // cancelAnimationFrame(0);
  this.inGame = false;
  this.home();
}

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.home = function () {
  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.ctx.fillStyle = Game.BG_COLOR;
  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.ctx.fillStyle = "#336E7B"
  this.ctx.font = "bold 75px Arial";
  this.ctx.textAlign = "center"
  this.ctx.fillText("Press P to Start!", 350, 375);
}

Game.prototype.start = function () {
  this.lastTime = 0;
  // debugger;
  this.addShark();
  this.addScoreboard();
  this.util.addShark(this.shark);
  requestAnimationFrame(this.animate.bind(this));
}

Game.prototype.animate = function (time) {
  // debugger
  var timeDelta = time - this.lastTime;
  this.step(timeDelta);
  this.draw(this.ctx);
  this.lastTime = time;
  if(this.inGame) {
    requestAnimationFrame(this.animate.bind(this));
  }
}


module.exports = Game;
