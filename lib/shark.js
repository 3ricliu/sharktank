function Shark (options) {
  this.radius = Shark.RADIUS;
  // this.vel = options.vel || [5, -7];
  this.vel = [0, 1]
  this.color = "#F62459";
  // this.color = "#4183D7";
  this.pos = options.pos || [315, 350];
  this.game = options.game;
  this.game_width = options.canvas_width;
  this.game_height = options.canvas_height;
  this.direction = "right";
  this.spazzed = false;
  this.opacity = 1;
  this.floatDirection = "down";


  this.img = new Image();
  this.img.src = "assets/shark.png"

  // this.shark = new Image();
  // this.shark.src = 'assets/shark.png';
  // Sharktank.MovingObject.call(this, options)
};

Shark.RADIUS = 5;

// Sharktank.Util.inherits(Shark, Sharktank.MovingObject);

Shark.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;

  if(this.spazzed) {
    ctx.fillStyle = "rgba(41, 128, 185, " + this.opacity + ")";
    // ctx.fillStyle = "rgba(215, 74, 65, " + this.opacity + ")";
    this.opacity -= 0.015;

    if(this.opacity <= 0) {
      this.game.over();
      this.pos = [1000, 1000]; //bandaid
    }

    // console.log(this.opacity)
  }


  // this.vel[1] = 3

  // ctx.drawImage(this.shark, this.pos[0], this.pos[1], 100, 100);
  if(this.opacity != 0) {
    ctx.beginPath();


    if(this.direction === "right") {

      //drawing the mouth
      ctx.moveTo(this.pos[0], this.pos[1] + 25);
      if (this.vel[1] < 2) { // is the guy in mid jump
        ctx.lineTo(this.pos[0] + 20, this.pos[1] + 25 - 12.5);
        ctx.lineTo(this.pos[0], this.pos[1]);
      } else {
        ctx.lineTo(this.pos[0] + 20, this.pos[1] + 25);
        ctx.lineTo(this.pos[0], this.pos[1] + 25 - 12.5);
        ctx.lineTo(this.pos[0] + 20, this.pos[1]);
        ctx.lineTo(this.pos[0], this.pos[1]);
      }

      //drawing head


      //drawing the fin
      ctx.lineTo(this.pos[0] - 5, this.pos[1]);
      ctx.lineTo(this.pos[0] - 5 - 15, this.pos[1] - 15);
      ctx.lineTo(this.pos[0] - 5 - 15, this.pos[1]);

      //drawing the body
      ctx.lineTo(this.pos[0] - 25, this.pos[1]); // line to body
      ctx.lineTo(this.pos[0] - 25 - 10, this.pos[1] + 5); //line down
      ctx.lineTo(this.pos[0] - 25 - 10 - 20, this.pos[1] + 5 - 15); //line to fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20, this.pos[1] + 5 - 15 + 45); //line down fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20 + 20, this.pos[1] + 5 - 15 + 45 - 15); //line up fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20 + 20 + 10, this.pos[1] + 5 - 15 + 45 - 15 + 5)
      ctx.lineTo(this.pos[0], this.pos[1] + 25);
      ctx.fill();
      ctx.stroke();

      //drawing the fin that moves
      ctx.fillStyle = "white";
      var sharkArmY;
      ctx.beginPath();

      ctx.moveTo(this.pos[0] - 10, this.pos[1] + 25);
      this.vel[1] < 4 ? sharkArmY = 15 : sharkArmY = -15
      ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25 + sharkArmY);
      ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25);
      ctx.lineTo(this.pos[0] - 10, this.pos[1] + 25);
      ctx.fill();
      ctx.stroke();

      //draw the eye
      if(!this.spazzed) {
        ctx.beginPath();
        ctx.arc(
          this.pos[0] - 5, this.pos[1] + 8, this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.stroke();
      }

    } else {
      //it's going left

      //drawing the mouth
      ctx.moveTo(this.pos[0], this.pos[1] + 25);
      if (this.vel[1] < 2) { // is the guy in mid jump
        ctx.lineTo(this.pos[0] - 20, this.pos[1] + 25 - 12.5);
        ctx.lineTo(this.pos[0], this.pos[1]);
      } else { // to do
        ctx.lineTo(this.pos[0] - 20, this.pos[1] + 25);
        ctx.lineTo(this.pos[0], this.pos[1] + 25 - 12.5);
        ctx.lineTo(this.pos[0] - 20, this.pos[1]);
        ctx.lineTo(this.pos[0], this.pos[1]);
      }

      //drawing head


      //drawing the fin
      ctx.lineTo(this.pos[0] + 5, this.pos[1]);
      ctx.lineTo(this.pos[0] + 5 + 15, this.pos[1] - 15);
      ctx.lineTo(this.pos[0] + 5 + 15, this.pos[1]);

      //drawing the body
      ctx.lineTo(this.pos[0] + 25, this.pos[1]); // line to body
      ctx.lineTo(this.pos[0] + 25 + 10, this.pos[1] + 5); //line down
      ctx.lineTo(this.pos[0] + 25 + 10 + 20, this.pos[1] + 5 - 15); //line to fin
      ctx.lineTo(this.pos[0] + 25 + 10 + 20, this.pos[1] + 5 - 15 + 45); //line down fin
      ctx.lineTo(this.pos[0] + 25 + 10 + 20 - 20, this.pos[1] + 5 - 15 + 45 - 15); //line up fin
      ctx.lineTo(this.pos[0] + 25 + 10 + 20 - 20 - 10, this.pos[1] + 5 - 15 + 45 - 15 + 5)
      ctx.lineTo(this.pos[0], this.pos[1] + 25);

      ctx.fill();
      ctx.stroke();

      //drawing the fin that moves
      ctx.fillStyle = "white";
      ctx.beginPath();

      ctx.moveTo(this.pos[0] + 10, this.pos[1] + 25);
      var sharkArmY;
      this.vel[1] < 4  ? sharkArmY = 15 : sharkArmY = -15
      ctx.lineTo(this.pos[0] + 10 + 15, this.pos[1] + 25 + sharkArmY);
      ctx.lineTo(this.pos[0] + 10 + 15, this.pos[1] + 25);
      ctx.lineTo(this.pos[0] + 10, this.pos[1] + 25);
      ctx.fill();
      ctx.stroke();

      //draw the eye
      if(!this.spazzed) {
        ctx.beginPath();
        ctx.arc(
          this.pos[0] + 5, this.pos[1] + 8, this.radius, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.stroke();
      }
    }
  }
}

// var NORMAL_FRAME_TIME_DELTA = 1000/60;

Shark.prototype.move = function () {
  // took in timeDelta

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

  if(newX > this.game_width - 20 || newX < 0 + 20) {
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


Shark.prototype.float = function () {
  if(this.floatDirection == "down" && this.vel[1] < 1.3) {
    this.vel[1] += 0.01
  } else if (this.floatDirection === "down" && this.vel[1] > 1.3) {
    this.floatDirection = "up"
    this.vel[1] = -1
  } else if (this.floatDirection === "up" && this.vel[1] > -1.3) {
    this.vel[1] -= 0.01
  } else if (this.floatDirection === "up" && this.vel[1] < -1.3) {
    this.floatDirection = "down";
    this.vel[1] = 1
  }
  newX = this.pos[0] + this.vel[0];
  newY = this.pos[1] + this.vel[1];
  this.pos = [newX, newY];
}

Shark.prototype.calculateY = function () {
  if(this.vel[1] < 7) {
    this.vel[1] += 0.5
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
  // this.vel = [5, -11];
  this.vel[1] = -11;
  // console.log("inside jump")
}

Shark.prototype.spaz = function () {
  if(this.direction === "right"){
      this.pos[1] > 640 ? this.vel = [-8,-12] : this.vel = [8, -12]
  } else {
    this.pos[1] > 640 ? this.vel = [8,-12] : this.vel = [-8, 12]
  }
  console.log("spaz")
  this.spazzed = true;
  // this.game.over();


}


//
// Shark.prototype.relocate = function () {
//   this.pos = this.game.randomPosition();
//   this.vel = [0,0];
// };
module.exports = Shark;
