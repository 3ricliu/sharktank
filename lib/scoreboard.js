function Scoreboard (options) {
  this.game = options.game;
  this.shark = options.shark;
  this.color = "#2980b9";
  // this.color = "#336E7B";
  this.score = 0;
  this.sharkDirection = "right";
  // this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2 + 200];
  this.pos = [300, 350];
};

Scoreboard.prototype.draw = function (ctx) {
  this.checkScore();


  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0], this.pos[1], 150, 0, 2 * Math.PI, true
  )
  ctx.fill();

  if(this.game.inGame) {
    ctx.fillStyle = "white"
    ctx.font = "bold 150px Arial";
    ctx.textAlign = "center"
    ctx.fillText(this.score, 300, 400);
  }
};

Scoreboard.prototype.checkScore = function () {
  if(!this.shark.spazzed) {
    if(this.shark.direction != this.sharkDirection) {
      // debugger;
      this.sharkDirection = this.shark.direction;
      this.score += 1;
      // console.log("here")
    }
  }
}

module.exports = Scoreboard;
