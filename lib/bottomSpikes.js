function BottomSpikes (options) {
  this.width = options.width || 700
  this.height = options.height || 900
  this.color = options.color || "#6C7A89" ;
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
  // ctx.stroke();
  ctx.rect(0, 870, this.width, 30)
  ctx.fill();


  var x = 0;
  var y = 820;
  ctx.beginPath();
  ctx.moveTo(x, 870);
  while(x < this.width) {
    x += 50
    ctx.lineTo(x, y);
    x += 50
    ctx.lineTo(x, 870);
    ctx.fill();
  }

}

// BottomSpikes.prototype.collideWith = function (otherObject) {
//   if(otherObject instanceof Sharktank.Bird) {
//     otherObject.relocate();
//   }
// };

BottomSpikes.prototype.isCollidedWith = function (otherObject) {
  return otherObject.pos[1] > 830;
};

BottomSpikes.prototype.collideWith = function (otherObject) {
  if(otherObject.constructor.name === "Shark") {
    otherObject.spaz();
    //gameover
  }
};

module.exports = BottomSpikes;
