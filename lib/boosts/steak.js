var Util = require("../util.js");
var BoostObject = require("../boostObject.js");

function Steak (options) {
  this.pos = options.pos;
  this.holder = options.holder;
  this.vel = [0, 1];
  this.direction = "down";
  this.img = new Image();
  this.img.src = 'assets/steak.png';
  this.opacity = 1;
}

Util.inherits(Steak, BoostObject);

Steak.prototype.emitPower = function (ctx) {
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "rgba(52, 152, 219, " + this.opacity + ")";
  ctx.fillText("+5", this.pos[0], this.pos[1]);
  this.opacity -= 0.03;

  if(this.opacity <= 0) {
    this.opacity = 1;
    this.holder.reset();
  }
};


module.exports = Steak;
