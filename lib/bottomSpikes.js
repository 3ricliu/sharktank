function BottomSpikes (options) {
  this.width = options.width || 550
  this.height = options.height || 700
  this.color = options.color || "#6C7A89";
  this.pos = [0,0];
  this.game = options.game
  // this.spikes = [];
  //
  // this.createSpikes();
};

// Spike.prototype.createSpikes = function () {
//
// }

BottomSpikes.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  ctx.beginPath();
  ctx.rect(0, 675, this.width, 25)
  ctx.fill();
  // ctx.stroke();


  var x = 0;
  var y = 640;
  ctx.beginPath();
  ctx.moveTo(x, 675);
  while(x < this.width) {
    x += 17
    ctx.lineTo(x, 675);
    x += 30
    ctx.lineTo(x, y);
    x += 30
    ctx.lineTo(x, 675);
    ctx.fill();
  }

  ctx.stroke();

}

// BottomSpikes.prototype.collideWith = function (otherObject) {
//   if(otherObject instanceof Sharktank.Bird) {
//     otherObject.relocate();
//   }
// };

BottomSpikes.prototype.isCollidedWith = function (otherObject) {
  return otherObject.pos[1] > 675;
};

BottomSpikes.prototype.collideWith = function (otherObject) {
  if(otherObject.constructor.name === "Shark") {
    otherObject.spaz();
    //gameover
  }
};

module.exports = BottomSpikes;
