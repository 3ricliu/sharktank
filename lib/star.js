function Star (options) {
  this.pos = options.pos;
  this.holder = options.holder;
  this.vel = [0,1];
  this.direction = "down";
  this.img = new Image();
  this.img.src = 'assets/star.png';
  this.opacity = 1;
}

Star.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
};

Star.prototype.float = function () {
  if(this.direction === "down" && this.vel[1] < 1.3) {
    this.vel[1] += 0.01;
  } else if (this.direction === "down" && this.vel[1] > 1.3) {
    this.direction = "up";
    this.vel[1] = -1;
  } else if (this.direction === "up" && this.vel[1] > -1.3) {
    this.vel[1] -= 0.01;
  } else if (this.direction === "up" && this.vel[1] < -1.3) {
    this.direction = "down";
    this.vel[1] = 1;
  }

  var newX = this.pos[0] + this.vel[0];
  var newY = this.pos[1] + this.vel[1];
  this.pos = [newX, newY];
};

Star.prototype.emitPower = function (ctx) {
  // this.emittingPower = true;
  ctx.font = "bold 25px Arial";
  ctx.fillStyle = "rgba(52, 152, 219, " + this.opacity + ")";
  ctx.fillText("INVINCIBILITY", this.pos[0], this.pos[1]);
  this.opacity -= 0.01;

  if(this.opacity <= 0) {
    // this.emittingPower = false;
    this.opacity = 1;
    this.holder.reset();
  }
};


module.exports = Star;
