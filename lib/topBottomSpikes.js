function TopBottomSpikes (options) {
  this.game = options.game;
  this.width = 550;
  this.height = 700;
  this.color = "#6C7A89";
  this.position = options.position;
  this.x;
  this.y;
  this.spikeIncrementer;
  this.rectangle;
}

TopBottomSpikes.prototype.calculateXAndY = function () {
  if (this.position === "top") {
    this.x = 0;
    this.y = 60;
    this.rectangle = 0;

    this.spikeIncrementer = 25;
  } else if (this.position == "bottom") {
    this.x = 0;
    this.y = 640;
    this.rectangle = 675;

    this.spikeIncrementer = 675;
  }
};

TopBottomSpikes.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  this.calculateXAndY();

  ctx.beginPath();
  ctx.rect(this.x, this.rectangle, this.width, 25);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(this.x, this.spikeIncrementer);
  while(this.x < this.width) {
    this.x += 17;
    ctx.lineTo(this.x, this.spikeIncrementer);
    this.x += 30;
    ctx.lineTo(this.x, this.y);
    this.x += 30;
    ctx.lineTo(this.x, this.spikeIncrementer);
    ctx.fill();
  }

  ctx.stroke();
};

TopBottomSpikes.prototype.isCollidedWith = function (otherObject) {
  if(this.position === "top") {
    return otherObject.pos[1] < this.y;
  } else if (this.position == "bottom") {
    return otherObject.pos[1] > this.y - 19;
  }
};

TopBottomSpikes.prototype.collideWith = function (shark) {
  shark.spaz();
};


module.exports = TopBottomSpikes;
