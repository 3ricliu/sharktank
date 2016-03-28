var Fish = require("./fish.js");

function FishHolder (options) {
  this.game = options.game;
  this.fishHolder = [];
  this.sharkDirection = this.game.shark.direction;
  this.opacity = 1;
  this.eaten = false;
  this.fishCoor;
};

FishHolder.prototype.randomizeFish = function () {
  if(this.fishHolder.length === 0 && this.sharkDirection != this.game.shark.direction) {
    this.sharkDirection = this.game.shark.direction;
    if(Math.ceil(Math.random()*4) === 4) { //1 in 4 chance steak will appear
      var x = Math.ceil(Math.random()*390) + 80;
      var y = Math.ceil(Math.random()*500) + 100;
      this.fishHolder.push(new Fish({pos: [x, y]}));
      this.fishCoor = [x,y]
    }
  }
};

FishHolder.prototype.draw = function (ctx) {
  if(this.game.inGame === false) {
    this.fishHolder = [];
  } else {
    if(this.eaten === false) {
      if(this.fishHolder.length === 0) {
        this.randomizeFish();
      } else {
        this.fishHolder[0].move();
        this.fishHolder[0].draw(ctx);
      }
    } else {
      ctx.font = "bold 25px Arial";
      ctx.fillStyle = "rgba(246, 36, 89, " + this.opacity + ")";
      ctx.fillText("+5", this.fishCoor[0], this.fishCoor[1]);
      this.opacity -= 0.030;

      if(this.opacity <= 0) {
        this.eaten = false;
        this.opacity = 1;
      }
    }
  }

};

FishHolder.prototype.collideWith = function (shark) {
  this.game.scoreboard.score += 5;
  this.fishHolder = [];
  this.eaten = true;
}

FishHolder.prototype.isCollidedWith = function (shark) {
  var collided = false;
  if(this.fishHolder.length != 0) {
    var objectXCoor = shark.pos[0];
    var objectYCoor = shark.pos[1];
    var hitBoxUpper = this.fishHolder[0].pos[1] - 30;
    var hitBoxLower = this.fishHolder[0].pos[1] + 30;
    var hitBoxRight = this.fishHolder[0].pos[0] + 40;
    var hitBoxLeft = this.fishHolder[0].pos[0] - 40;
    if(objectXCoor <= hitBoxRight && objectXCoor >= hitBoxLeft && objectYCoor >= hitBoxUpper && objectYCoor <= hitBoxLower) {
      // debugger
      collided = true
    }

  }
  return collided
}


module.exports = FishHolder;
