(function () {
  if (typeof Sharktank === "undefined") {
    window.Sharktank = {};
  }

  var Game = Sharktank.Game = function () {
    this.spikes = [];
    this.shark;
    this.direction;
    this.addSpikes();

    this.addShark();
  };

  Game.BG_COLOR = "#F2F1EF";
  Game.DIM_X = 700;
  Game.DIM_Y = 900;
  // Game.FPS = 32;
  // Game.NUM_SPIKES = 10;

  Game.prototype.add = function (object) {

    if (object instanceof Sharktank.SideSpikes) {
      this.spikes.push(object);
    } else if (object instanceof Sharktank.Shark) {
      this.shark = object;
    } else {
      throw "ERROR";
    }
  };

  Game.prototype.addSpikes = function () {
    // for (var i = 0; i < Game.NUM_SPIKES; i++){
    //   this.add(new Sharktank.Spike({game: this}));
    // }

    // this.add(new Sharktank.TopSpikes({game: this}));
    // this.add(new Sharktank.BottomSpikes({game: this}));

    this.spikes.push(new Sharktank.TopSpikes({game: this}))
    this.spikes.push(new Sharktank.BottomSpikes({game: this}))
    this.spikes.push(new Sharktank.SideSpikes({game: this}))

  };

  Game.prototype.addShark = function () {
    var shark = new Sharktank.Shark({
      // pos: this.randomPosition(),
      game: this,
      canvas_width: Game.DIM_X,
      canvas_height: Game.DIM_Y
    });

    this.add(shark)
    this.direction = this.shark.direction;

    return shark;
  };

  Game.prototype.bindKeyHandlers = function () {
    var shark = this.shark;
    key("space", function () {
      shark.jump()
      // console.log("space")
    });
  };


  Game.prototype.allObjects = function () {
    return [].concat(this.shark, this.spikes);
  };

  Game.prototype.checkCollisions = function () {

    this.spikes.forEach(function (spike) {
        if(spike.isCollidedWith(this.shark)) {
          spike.collideWith(this.shark);
        }
    }.bind(this));
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      // debugger
      object.draw(ctx); // this is where the drawing takes place
    });
  };

  // Game.prototype.isOutOfBounds = function (pos) {
  //   return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) ||
  //           (pos[1] > Game.DIM_Y);
  // };

  Game.prototype.moveObjects = function (delta) {
      this.shark.move(delta);
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  // Game.prototype.remove = function (object) {
  //   if (object instanceof Spikes.Shark) {
  //     this.bird.splice(this.birds.indexOf(object), 1);
  //   } else if (object instanceof Spikes.Spike) {
  //     var idx = this.spikes.indexOf(object);
  //     this.spikes[idx] = new Spikes.Spike({game: this});
  //   }
  //   else {
  //     throw "HUH"
  //   }
  // };

  Game.prototype.step = function (delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  };

})();
