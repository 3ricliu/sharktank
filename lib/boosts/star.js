var Util = require("../util.js");
var BoostObject = require("../boostObject.js");

function Star (options) {
  this.pos = options.pos;
  this.holder = options.holder;
  this.vel = [0, 1];
  this.direction = "down";
  this.img = new Image();
  this.img.src = 'assets/star.png';
  this.opacity = 1;
}

Util.inherits(Star, BoostObject);

Star.prototype.emitPower = function (ctx) {
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "rgba(52, 152, 219, " + this.opacity + ")";
  ctx.fillText("INVINCIBILITY", this.pos[0], this.pos[1]);
  this.opacity -= 0.01;

  if(this.opacity <= 0) {
    this.opacity = 1;
    this.holder.reset();
  }
};


module.exports = Star;
