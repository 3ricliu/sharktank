function Fish (options) {
  this.pos = options.pos;
  this.vel = [0, 1]
  this.direction = "down";
  this.img = new Image();
  this.img.src = 'assets/steak.png';
};

Fish.prototype.draw = function (ctx) {
  ctx.drawImage(this.img, this.pos[0], this.pos[1])
};

Fish.prototype.move = function () {
  if(this.direction == "down" && this.vel[1] < 1.3) {
    this.vel[1] += 0.01
  } else if (this.direction === "down" && this.vel[1] > 1.3) {
    this.direction = "up"
    this.vel[1] = -1
  } else if (this.direction === "up" && this.vel[1] > -1.3) {
    this.vel[1] -= 0.01
  } else if (this.direction === "up" && this.vel[1] < -1.3) {
    this.direction = "down";
    this.vel[1] = 1
  }

  newX = this.pos[0] + this.vel[0];
  newY = this.pos[1] + this.vel[1];
  this.pos = [newX, newY];
};

module.exports = Fish;
