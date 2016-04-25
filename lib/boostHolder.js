var Steak = require("./steak.js");
var Star = require("./star.js");

function BoostHolder (options) {
  this.game = options.game;
  this.boostHolder = [];
  this.sharkDirection = this.game.shark.direction;
  this.existBoost = false;
  this.boostCoor = [0, 0];
}

BoostHolder.prototype.randomizeBoost = function () {
  if(this.boostHolder.length === 0 && this.sharkDirection !== this.game.shark.direction) {
    this.sharkDirection = this.game.shark.direction;
    if(Math.ceil(Math.random()*4) === 4) { //1 in 4 chance steak will appear
      var x = Math.ceil(Math.random()*390) + 80;
      var y = Math.ceil(Math.random()*500) + 100;
      this.boostHolder.push(new Steak({pos: [x, y], holder: this}));
      this.boostCoor = [x, y];
      this.existBoost = true;
    }
  }
};

BoostHolder.prototype.draw = function (ctx) {
  if(this.game.inGame === false) {
    this.boostHolder = [];
  }
  if(this.boostHolder.length !== 0) {
    if(this.existBoost === false) {
      this.boostHolder[0].emitPower(ctx);
    } else {
      this.boostHolder[0].float();
      this.boostHolder[0].draw(ctx);
    }
  } else {
    this.randomizeBoost();
  }
};

BoostHolder.prototype.reset = function () {
  this.boostHolder = [];
};

BoostHolder.prototype.collideWith = function () {
  var boost = this.boostHolder[0].constructor.name;
  switch(boost){
    case "Steak":
      this.game.scoreboard.eatSteak();
      this.existBoost = false;
  }
};

BoostHolder.prototype.isCollidedWith = function (shark) {
  if(this.existBoost === false) {
    return false;
  }

  var collided = false;
  if(this.boostHolder.length !== 0) {
    var objectXCoor = shark.pos[0];
    var objectYCoor = shark.pos[1];
    var hitBoxUpper = this.boostHolder[0].pos[1] - 30;
    var hitBoxLower = this.boostHolder[0].pos[1] + 30;
    var hitBoxRight = this.boostHolder[0].pos[0] + 40;
    var hitBoxLeft = this.boostHolder[0].pos[0] - 40;
    if(objectXCoor <= hitBoxRight && objectXCoor >= hitBoxLeft && objectYCoor >= hitBoxUpper && objectYCoor <= hitBoxLower) {
      collided = true;
    }

  }
  return collided;
};


module.exports = BoostHolder;
