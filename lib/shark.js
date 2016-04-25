function Shark (options) {
  this.radius = Shark.RADIUS;
  this.vel = [0, 1];
  this.chosenColor = 0;
  this.pos = [315, 350];
  this.game = options.game;
  this.game_width = options.canvas_width;
  this.game_height = options.canvas_height;
  this.direction = "right";
  this.spazzed = false;
  this.opacity = 1;
  this.triggered = false;
  this.invincible = false;
  this.floatDirection = "down";
}

Shark.COLORS = ["#F62459",
                "#FECE7A",
                "#7EFF7A",
                "#7EFFFF",
                "#7BA3FE",
                "#CB70FE",
                "#FC49F5",
                "#FC4EA7",
                "#FD5258"];

Shark.prototype.draw = function (ctx) {
  if(this.triggered) {
    this.chosenColor = (this.chosenColor + 1) % Shark.COLORS.length;
  }
  ctx.fillStyle = Shark.COLORS[this.chosenColor];

  if(this.spazzed) {
    ctx.fillStyle = "rgba(41, 128, 185, " + this.opacity + ")";
    this.opacity -= 0.014;

    if(this.opacity <= 0) {
      this.game.over();
      this.pos = [1000, 1000]; // to do: fix bandaid
    }
  }

  if(this.opacity !== 0) {
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

      //drawing the fin
      ctx.lineTo(this.pos[0] - 5, this.pos[1]);
      ctx.lineTo(this.pos[0] - 5 - 15, this.pos[1] - 15);
      ctx.lineTo(this.pos[0] - 5 - 15, this.pos[1]);

      var points = [
        [ -25, 0 ],
        [ -35, 5 ],
        [ -55, -10]
      ];

      //drawing the body
      ctx.lineTo(this.pos[0] - 25, this.pos[1]); // line to body
      ctx.lineTo(this.pos[0] - 25 - 10, this.pos[1] + 5); //line down
      ctx.lineTo(this.pos[0] - 25 - 10 - 20, this.pos[1] + 5 - 15); //line to fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20, this.pos[1] + 5 - 15 + 45); //line down fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20 + 20, this.pos[1] + 5 - 15 + 45 - 15); //line up fin
      ctx.lineTo(this.pos[0] - 25 - 10 - 20 + 20 + 10, this.pos[1] + 5 - 15 + 45 - 15 + 5);
      ctx.lineTo(this.pos[0], this.pos[1] + 25);
      ctx.fill();
      ctx.stroke();

      //drawing the fin that moves
      ctx.fillStyle = "white";
      var sharkArmY;
      ctx.beginPath();
      ctx.moveTo(this.pos[0] - 10, this.pos[1] + 25);

      if(this.game.inGame) {
        this.vel[1] < 4 ? sharkArmY = 15 : sharkArmY = -15;
        ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25 + sharkArmY);
        ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25);
        ctx.lineTo(this.pos[0] - 10, this.pos[1] + 25);
        ctx.fill();
        ctx.stroke();
      } else {
        this.vel[1] > 0.1 ? sharkArmY = -15 : sharkArmY = 15;
        ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25 + sharkArmY);
        ctx.lineTo(this.pos[0] - 10 - 15, this.pos[1] + 25);
        ctx.lineTo(this.pos[0] - 10, this.pos[1] + 25);
        ctx.fill();
        ctx.stroke();
      }

      //draw the eye
      if(!this.spazzed) {
        ctx.beginPath();
        ctx.arc(
          this.pos[0] - 5, this.pos[1] + 8, 5, 0, 2 * Math.PI, true
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
      ctx.lineTo(this.pos[0] + 25 + 10 + 20 - 20 - 10, this.pos[1] + 5 - 15 + 45 - 15 + 5);
      ctx.lineTo(this.pos[0], this.pos[1] + 25);

      ctx.fill();
      ctx.stroke();

      //drawing the fin that moves
      ctx.fillStyle = "white";
      ctx.beginPath();

      ctx.moveTo(this.pos[0] + 10, this.pos[1] + 25);
      var sharkArmY;
      this.vel[1] < 4  ? sharkArmY = 15 : sharkArmY = -15;
      ctx.lineTo(this.pos[0] + 10 + 15, this.pos[1] + 25 + sharkArmY);
      ctx.lineTo(this.pos[0] + 10 + 15, this.pos[1] + 25);
      ctx.lineTo(this.pos[0] + 10, this.pos[1] + 25);
      ctx.fill();
      ctx.stroke();

      //draw the eye
      if(!this.spazzed) {
        ctx.beginPath();
        ctx.arc(
          this.pos[0] + 5, this.pos[1] + 8, 5, 0, 2 * Math.PI, true
        );
        ctx.fill();
        ctx.stroke();
      }
    }
  }
};

Shark.prototype.move = function () {
  var offsetX = this.vel[0];
  var offsetY = this.vel[1];

  var newX = this.pos[0] + offsetX;
  var newY = this.pos[1] + offsetY;

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

  if(newY > this.game_height - 60 || newY < 0 + 60 ) {
    this.vel[1] = -this.vel[1];
  }

  this.pos = [newX, newY];
  // this.calculateX();
  this.calculateY();
};

Shark.prototype.float = function () {
  if(this.floatDirection === "down" && this.vel[1] < 1.3) {
    this.vel[1] += 0.01;
  } else if (this.floatDirection === "down" && this.vel[1] > 1.3) {
    this.floatDirection = "up";
    this.vel[1] = -1;
  } else if (this.floatDirection === "up" && this.vel[1] > -1.3) {
    this.vel[1] -= 0.01;
  } else if (this.floatDirection === "up" && this.vel[1] < -1.3) {
    this.floatDirection = "down";
    this.vel[1] = 1;
  }
  var newX = this.pos[0] + this.vel[0];
  var newY = this.pos[1] + this.vel[1];
  this.pos = [newX, newY];
};

Shark.prototype.starPower = function () {
  this.triggered = true;
  this.invincible = true;
  setTimeout(function () {
    this.triggered = false;
    this.invincible = false;
  }.bind(this), 3200);
};

// Shark.prototype.calculateX = function () {
//   if(this.vel[0] > 5) {
//     this.vel[0] -= 0.25;
//   }
// };

Shark.prototype.calculateY = function () {
  if(this.vel[1] < 7) {
    this.vel[1] += 0.5;
  }
};

Shark.prototype.jump = function () {
  this.vel[1] = -11;
};

Shark.prototype.spaz = function () {
  if(this.invincible){
    console.log("::PartyShark::");
  } else {
    if(this.direction === "right"){
      this.pos[1] > 640 ? this.vel = [8,-12] : this.vel = [8, -12];
    } else {
      this.pos[1] > 620 ? this.vel = [-8,-12] : this.vel = [-8, 12];
    }
    this.spazzed = true;
  }

};

module.exports = Shark;
