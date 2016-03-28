function Scoreboard (options) {
  this.game = options.game;
  this.shark = options.shark;
  this.color = "#2980b9";
  this.score = 0;
  this.sharkDirection = "right";
  this.pos = [300, 350];
};

Scoreboard.prototype.draw = function (ctx) {
  this.checkScore();

  ctx.fillStyle = "rgba(41, 128, 185, .9)";

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
      this.sharkDirection = this.shark.direction;
      this.score += 1;
    }
  }
};

module.exports = Scoreboard;
