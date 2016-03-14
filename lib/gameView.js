function GameView (game, ctx) {
    this.ctx = ctx;
    this.game = game;
    // this.shark = this.game.addShark();
};

  // GameView.prototype.bindKeyHandlers = function () {
  //   var shark = this.shark;
  //   key("space", function () {
  //     shark.jump()
  //     console.log("space")
  //   });
  // };

GameView.prototype.start = function () {
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function (time) {
  var timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.ctx);
  this.lastTime = time;

  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
