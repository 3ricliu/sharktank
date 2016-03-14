function TopSpikes (options) {
  this.width = options.width || 700;
  this.height = options.height || 900;
  this.color = options.color || "#6C7A89";
  this.pos = [0,0];
  this.game = options.game;
  // this.spikes = [];
  //
  // this.createSpikes();
};

// Spike.prototype.createSpikes = function () {
//
// }

TopSpikes.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  // ctx.stroke();
  ctx.rect(0, 0, this.width, 30)
  ctx.fill();


  var x = 0;
  var y = 80;
  ctx.beginPath();
  ctx.moveTo(x, 30);
  while(x < this.width) {
    x += 50
    ctx.lineTo(x, y);
    x += 50
    ctx.lineTo(x, 30);
    ctx.fill();
  }


}


TopSpikes.prototype.isCollidedWith = function (otherObject) {
  return otherObject.pos[1] < 80;
};

TopSpikes.prototype.collideWith = function (otherObject) {
  if(otherObject.constructor.name === "Shark") {
    otherObject.spaz();
    //gameover
  }
};

module.exports = TopSpikes;
