function SideSpikes (options) {
  this.game = options.game;
  this.width = 550;
  this.height = 700;
  this.color = "#6C7A89";
  // this.direction = options.direction;
  this.position;
  this.spikeSet;
  // Sharktank.MovingObject.call(this, options);
  this.setCurrDirection();
};


// a scale of 8 would be awesome

SideSpikes.prototype.draw = function (ctx) {
  if(this.game.direction !== this.position) {
    this.setCurrDirection();
  }

  var xStart = this.spikeSet[0]
  var xMid = this.spikeSet[1]

  ctx.fillStyle = this.color;

  for(var i = 2; i < this.spikeSet.length; i++) {
    ctx.beginPath();
    ctx.moveTo(xStart, this.spikeSet[i] * 100 + 80);
    ctx.lineTo(xMid, this.spikeSet[i] * 100 + 130 );
    ctx.lineTo(xStart, this.spikeSet[i] * 100 + 180);
    ctx.fill();
    ctx.stroke();
  }


};

SideSpikes.prototype.setCurrDirection = function () {
  this.position = this.game.direction;
  this.chooseSpikes(this.position)
};

SideSpikes.prototype.chooseSpikes = function (direction) {
  // return an array of possible spike positions
  var numSpikes = Math.ceil(Math.random()*4);
  var spikeArray = []

  while(spikeArray.length < numSpikes) {
      spikeIdx = Math.floor(Math.random()*7);
      if(spikeArray.indexOf(spikeIdx) === -1) {
        spikeArray.push(spikeIdx);
      }
  }

  if(direction === "left"){
    spikeArray.unshift(0, 50);
  } else {
    spikeArray.unshift(700, 650);
  }

  this.spikeSet = spikeArray;
};


// choose from a set of possible spike positions how many spikes i want



// Sharktank.Util.inherits(Spike, Sharktank.MovingObject);


SideSpikes.prototype.isCollidedWith = function (otherObject) {
  var collided = false;
  var objectXCoor = otherObject.pos[0];
  var objectYCoor = otherObject.pos[1];
  var hitBoxUpper;
  var hitBoxLower;

  for(var i = 2; i < this.spikeSet.length; i ++) {
    hitBoxLower = this.spikeSet[i] * 100 + 80;
    hitBoxUpper = this.spikeSet[i] * 100 + 180;

    if(objectYCoor > hitBoxLower && objectYCoor < hitBoxUpper) {

      if((this.position === "left" && objectXCoor < 50) ||
          this.position === "right" && objectXCoor > 650) {
        collided = true
      }
    }
  }


  //   this.position === "left" ? hitBoxWidth = 50 : hitBoxWidth = 650
  // }
  //
  //
  // if(this.position === "left") {
  //   for(var i = 2; i < this.spikeSet.length; i++ ) {
  //     if((otherObject.pos[1] > this.spikeSet[i] * 100 + 80) &&
  //         (otherObject.pos[1] < this.spikeSet[i] * 100 + 180) &&
  //           otherObject.pos[0] < 50) {
  //             // console.log(this.direction)
  //             // debugger
  //           collided = true;
  //         }
  //   }
  // } else {
  //   for(var i = 2; i < this.spikeSet.length; i++ ) {
  //     if((otherObject.pos[1] > this.spikeSet[i] * 100 + 80) &&
  //         (otherObject.pos[1] < this.spikeSet[i] * 100 + 180) &&
  //           otherObject.pos[0] > 650) {
  //             // console.log(this.direction)
  //             // debugger
  //           collided = true;
  //         }
  //   }
  // }
  // return otherObject.pos[1] > 830;

  return collided
};

SideSpikes.prototype.collideWith = function (otherObject) {
  if(otherObject.constructor.name === "Shark") {
    otherObject.spaz();
    //gameover
  }
};

module.exports = SideSpikes;
