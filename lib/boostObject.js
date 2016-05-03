function BoostObject () {
}

BoostObject.prototype.float = function () {
  // to impliment
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
BoostObject.prototype.draw = function (ctx) {
  // to impliment
  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
};


module.exports = BoostObject;
