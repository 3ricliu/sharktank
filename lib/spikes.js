(function () {
  if (typeof Sharktank === "undefined") {
    window.Sharktank = {};
  }

  var SideSpikes = Sharktank.SideSpikes = function (options) {
    this.width = options.width || 700;
    this.height = options.height || 900;
    this.color = options.color || "#6C7A89";
    this.pos = [0,0]
    this.game = options.game;
    this.direction = options.direction;
    this.order = options.order;

    this.currDirection;
    this.spikeSet;
    // Sharktank.MovingObject.call(this, options);
    // this.setCurrDirection();
  };


// a scale of 8 would be awesome

  SideSpikes.prototype.draw = function (ctx) {

    if(this.game.direction !== this.currDirection) {
      this.setCurrDirection();
      // debugger
    }

    // debugger
    var xStart = this.spikeSet[0]
    var xMid = this.spikeSet[1]

    ctx.fillStyle = this.color;

    for(var i = 2; i < this.spikeSet.length; i++) {
      ctx.beginPath();
      ctx.moveTo(xStart, this.spikeSet[i] * 100 + 80);
      ctx.lineTo(xMid, this.spikeSet[i] * 100 + 130 );
      ctx.lineTo(xStart, this.spikeSet[i] * 100 + 180);
      ctx.fill();
    }

    // var x =
    // select the number of spikes Math.ceil(Math.random()*4)
    // then build an array until length == number for math



    //
    //
    // ctx.beginPath();
    // ctx.moveTo(0,80);
    // ctx.lineTo(50,130);
    // ctx.lineTo(0,180);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,180);
    // ctx.lineTo(50,230);
    // ctx.lineTo(0,280);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,280);
    // ctx.lineTo(50,330);
    // ctx.lineTo(0,380);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,380);
    // ctx.lineTo(50,430);
    // ctx.lineTo(0,480);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,480);
    // ctx.lineTo(50,530);
    // ctx.lineTo(0,580);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,580);
    // ctx.lineTo(50,630);
    // ctx.lineTo(0,680);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(0,680);
    // ctx.lineTo(50,730);
    // ctx.lineTo(0,780);
    // ctx.fill();


    //this is the right side now

    /*
    left= x = 650 700
    80, 130, 180

    x1 @ index 1, 180 230 280

    pick a random number 0-6



    */
    //
    // ctx.beginPath();
    // ctx.moveTo(700,80);
    // ctx.lineTo(650,130);
    // ctx.lineTo(700,180);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,180);
    // ctx.lineTo(650,230);
    // ctx.lineTo(700,280);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,280);
    // ctx.lineTo(650,330);
    // ctx.lineTo(700,380);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,380);
    // ctx.lineTo(650,430);
    // ctx.lineTo(700,480);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,480);
    // ctx.lineTo(650,530);
    // ctx.lineTo(700,580);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,580);
    // ctx.lineTo(650,630);
    // ctx.lineTo(700,680);
    // ctx.fill();
    //
    // ctx.beginPath();
    // ctx.moveTo(700,680);
    // ctx.lineTo(650,730);
    // ctx.lineTo(700,780);
    // ctx.fill();


  };

  SideSpikes.prototype.setCurrDirection = function () {
    this.currDirection = this.game.direction;
    // debugger;
    this.chooseSpikes(this.currDirection)
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
    // debugger
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
    return otherObject.pos[1] > 830;
  };

  SideSpikes.prototype.collideWith = function (otherObject) {
    if(otherObject instanceof Sharktank.Shark) {
      otherObject.spaz();
      //gameover
    }
  };

})();
