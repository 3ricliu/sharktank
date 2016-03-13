(function () {
  if (typeof Sharktank === "undefined") {
    window.Sharktank = {};
  }

  function determineColor () {
    return ;
  }

  var Shark = Sharktank.Shark = function (options) {
    this.radius = Shark.RADIUS;
    this.vel = options.vel || [8, 13];
    this.color = "#4183D7";
    this.pos = options.pos || [350, 300];
    this.game = options.game;
    this.game_width = options.canvas_width;
    this.game_height = options.canvas_height;
    this.direction = "right";
    // Sharktank.MovingObject.call(this, options)
  };

  Shark.RADIUS = 25;

  // Sharktank.Util.inherits(Shark, Sharktank.MovingObject);

  Shark.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    // this.vel[1] = 3

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  // var NORMAL_FRAME_TIME_DELTA = 1000/60;

  Shark.prototype.move = function (timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second

    // var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
    //     offsetX = this.vel[0] * velocityScale,
    //     offsetY = this.vel[1] * velocityScale;
    //     debugger
    // newX = this.pos[0] + offsetX;
    // newY = this.pos[1] + offsetY;
    //
    //
    //
    //
    // this.pos = [newX, newY];

    offsetX = this.vel[0];
    offsetY = this.vel[1];

    newX = this.pos[0] + offsetX;
    newY = this.pos[1] + offsetY;

    if(newX > this.game_width - this.radius || newX < 0 + this.radius) {
      this.vel[0] = -this.vel[0];

      if(this.vel[0] > 0) {
        this.direction = "right";
        this.game.direction = "right";
      } else {
        this.direction = "left";
        this.game.direction = "left";
      }


    }
    // you really dont need height, rather you can just check collissions and same game over
    // i mean you can keep this in and make him bounce all over hte place afterwards
    if(newY > this.game_height - this.radius || newY < 0 + this.radius ) {
      this.vel[1] = -this.vel[1]

    }
    this.pos = [newX, newY];

    this.calculateY();
    console.log(this.direction )

  }

  Shark.prototype.calculateY = function () {
    if(this.vel[1] < 13) {
      this.vel[1] += 0.6
    }

    // if(this.vel[1] > 0) {
    //   if(this.vel[1] < 7){
    //     this.vel[1] += 1
    //   }
    // }
    // console.log(this.vel[1])
  }

  Shark.prototype.jump = function () {
    // debugger;
    this.vel[1] = -13;
    // console.log("inside jump")
  }

  Shark.prototype.spaz = function () {
    if(this.pos[1] > 830){
      this.vel = [30,-30]
    } else {
      this.vel = [-30, 30]
    }
    console.log("spaz")
  }



  Shark.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

})();
