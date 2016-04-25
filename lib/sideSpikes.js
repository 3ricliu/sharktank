function SideSpikes (options) {
  this.game = options.game;
  this.width = 550;
  this.height = 700;
  this.color = "#6C7A89";
  this.position;
  this.spikeSet;
  this.setCurrDirection();
}

SideSpikes.prototype.draw = function (ctx) {
  if(this.game.direction !== this.position) {
    this.setCurrDirection();
  }
  var xStart = this.spikeSet[0];
  var xMid = this.spikeSet[1];

  ctx.fillStyle = this.color;

  for(var i = 2; i < this.spikeSet.length; i++) {
    ctx.beginPath();
    ctx.moveTo(xStart, this.spikeSet[i] * 58 + 59);
    ctx.lineTo(xMid, this.spikeSet[i] * 58 + 88 );
    ctx.lineTo(xStart, this.spikeSet[i] * 58 + 117);
    ctx.fill();
    ctx.stroke();
  }
};

SideSpikes.prototype.setCurrDirection = function () {
  this.position = this.game.direction;
  this.chooseSpikes(this.position);
};

SideSpikes.prototype.chooseSpikes = function (direction) {
  var numSpikes = Math.ceil(Math.random()*4) + Math.floor(this.game.scoreboard.score/12);
  if(numSpikes > 9) {
    numSpikes = 8;
  }

  var spikeArray = [];

  while(spikeArray.length < numSpikes) {
      var spikeIdx = Math.floor(Math.random()*10);
      if(spikeArray.indexOf(spikeIdx) === -1) {
        spikeArray.push(spikeIdx);
      }
  }

  if(direction === "left"){
    spikeArray.unshift(0, 30);
  } else {
    spikeArray.unshift(550, 520);
  }

  this.spikeSet = spikeArray;
};

SideSpikes.prototype.isCollidedWith = function (shark) {
  var collided = false;
  var objectXCoor = shark.pos[0];
  var objectYCoor = shark.pos[1];
  var hitBoxUpper;
  var hitBoxLower;

  for(var i = 2; i < this.spikeSet.length; i ++) {
    hitBoxLower = this.spikeSet[i] * 58 + 59;
    hitBoxUpper = this.spikeSet[i] * 58 + 117;

    if(objectYCoor > hitBoxLower && objectYCoor < hitBoxUpper) {
      if((this.position === "left" && objectXCoor < 30) ||
          this.position === "right" && objectXCoor > 520) {
        collided = true;
      }
    }
  }
  return collided;
};

SideSpikes.prototype.collideWith = function (shark) {
  shark.spaz();
};

module.exports = SideSpikes;
