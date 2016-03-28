function Util (game) {
  this.shark;
  this.game = game;
};

Util.prototype.addDocumentListeners = function () {
  document.addEventListener('keydown', this.keyPressed.bind(this));
};

Util.prototype.addShark = function (shark) {
  this.shark = shark;
};

Util.prototype.keyPressed = function (event) {
  switch(event.keyCode) {
    case 32:
      event.preventDefault();
      if(this.game.inGame === false) {
        this.game.inGame = true;
        this.game.start();
      } else if (!this.shark.spazzed){
        this.shark.jump();
      }
      break;
  }
};

module.exports = Util;
