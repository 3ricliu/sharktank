/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// <script type="application/javascript" src="lib/game.js"></script>
	// <script type="application/javascript" src="lib/gameView.js"></script>
	// <script type="application/javascript" src="lib/util.js"></script>
	// <script type="application/javascript" src="lib/movingObject.js"></script>
	// <script type="application/javascript" src="lib/shark.js"></script>
	// <script type="application/javascript" src="lib/spikes.js"></script>
	// <script type="application/javascript" src="lib/topSpikes.js"></script>
	// <script type="application/javascript" src="lib/bottomSpikes.js"></script>
	// <script type="application/javascript" src="lib/scoreboard.js"></script>
	// <script type="application/javascript" src="vendor/keymaster.js"></script>

	// if this works, try it without the .js
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(8);
	var Util = __webpack_require__(5);

	var canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;

	var ctx = canvasEl.getContext("2d");
	var game = new Game(ctx);

	game.home();


	// new GameView(game, ctx).home();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var SideSpikes = __webpack_require__(2);
	// var TopSpikes = require("./topSpikes.js");
	// var BottomSpikes = require("./bottomSpikes.js");
	var Scoreboard = __webpack_require__(3);
	var Shark = __webpack_require__(4);
	var Util = __webpack_require__(5);
	var FishHolder = __webpack_require__(6);

	var TopBottomSpikes = __webpack_require__(7);

	function Game (ctx) {
	    this.ctx = ctx;
	    this.spikes = [];
	    this.shark;
	    this.fishHolder;
	    this.scoreboard;
	    this.direction;
	    this.inGame = false;
	    this.util = new Util(this);
	    this.highScore = 0;
	    this.gamesPlayed = 0;

	    // this.addShark();
	    // this.addScoreboard();

	    this.util.addDocumentListeners();
	};

	Game.BG_COLOR = "#F2F1EF";
	// Game.DIM_X = 700;
	// Game.DIM_Y = 900;
	Game.DIM_X = 550;
	Game.DIM_Y = 700;
	// Game.FPS = 32;
	// Game.NUM_SPIKES = 10;

	Game.prototype.add = function (object) {
	  // update this when you impliment inheritance

	  if (object instanceof SideSpikes) {
	    this.spikes.push(object);
	  } else if (object instanceof Shark) {
	    this.shark = object;
	  } else {
	    throw "ERROR";
	  }
	};

	Game.prototype.addSpikes = function () {
	  this.spikes.push(new SideSpikes({game: this}))

	};

	Game.prototype.addFishHolder = function () {
	  this.fishHolder = new FishHolder ({
	    game: this
	  });
	};

	Game.prototype.addTopBottomSpikes = function () {
	  this.spikes.push(new TopBottomSpikes({game: this, position: "top"}))
	  this.spikes.push(new TopBottomSpikes({game: this, position: "bottom"}))
	}

	Game.prototype.addShark = function () {
	  var shark = new Shark({
	    // pos: this.randomPosition(),
	    game: this,
	    canvas_width: Game.DIM_X,
	    canvas_height: Game.DIM_Y
	  });

	  this.add(shark)
	  this.direction = this.shark.direction;

	  return shark;
	};

	Game.prototype.addScoreboard = function () {
	  var scoreboard = new Scoreboard({
	    game: this,
	    shark: this.shark
	  });

	  this.scoreboard = scoreboard;
	}

	Game.prototype.bindKeyHandlers = function () {
	  // var shark = this.shark;
	  // key("space", function () {
	  //   shark.jump()
	  //   // console.log("space")
	  // });
	};


	Game.prototype.allObjects = function () {
	  // debugger
	  return [].concat(this.scoreboard, this.spikes, this.shark, this.fishHolder);
	};

	Game.prototype.checkCollisions = function () {
	  this.spikes.forEach(function (spike) {
	      if(spike.isCollidedWith(this.shark)) {
	        spike.collideWith(this.shark);
	      }
	  }.bind(this));

	  if(this.fishHolder.isCollidedWith(this.shark)) {
	    // debugger
	    this.fishHolder.collideWith(this.shark);
	  }
	};

	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  ctx.fillStyle = Game.BG_COLOR;
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

	  this.allObjects().forEach(function (object) {
	    // debugger
	    object.draw(ctx); // this is where the drawing takes place
	  }.bind(this));
	};

	// Game.prototype.isOutOfBounds = function (pos) {
	//   return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) ||
	//           (pos[1] > Game.DIM_Y);
	// };

	Game.prototype.moveObjects = function () {
	    this.shark.move();
	};

	// Game.prototype.randomPosition = function () {
	//   return [
	//     Game.DIM_X * Math.random(),
	//     Game.DIM_Y * Math.random()
	//   ];
	// };

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

	Game.prototype.over = function () {
	  // alert("over!");
	  cancelAnimationFrame(0);

	  if(this.highScore === undefined || this.scoreboard.score > this.highScore) {
	    this.highScore = this.scoreboard.score
	  }

	  this.spikes = [];
	  this.shark = null;
	  this.scoreboard = null;
	  this.inGame = false;
	  this.home();
	}

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.home = function () {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  console.log(this.highScore)
	  if(!this.highScore) {
	  }
	  this.ctx.fillStyle = Game.BG_COLOR;
	  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.addShark();
	  this.addTopBottomSpikes();
	  this.addScoreboard();
	  // this.addScoreboard();
	  // this.spikes.forEach(function (spike){spike.draw(this.ctx)}.bind(this))
	  // this.scoreboard.draw(this.ctx)
	  this.floatShark();


	}

	Game.prototype.start = function () {
	  // this.lastTime = 0;
	  // debugger;
	  // this.addScoreboard();
	  this.addSpikes();
	  this.addFishHolder();
	  this.util.addShark(this.shark);
	  this.shark.floatDirection = null;
	  this.shark.vel = [5,-7];
	  this.animate();
	  this.gamesPlayed += 1;
	  // requestAnimationFrame(this.animate.bind(this));
	  //UNCOMMENT THIS WHEN YOU"RE PLAY
	}

	Game.prototype.animate = function () {
	  //took out time in the parameter
	  // debugger
	  // var timeDelta = time - this.lastTime;
	  // took out timeDelta in this.step(timeDelta)
	  this.step();
	  this.draw(this.ctx);
	  // this.lastTime = time;
	  if(this.inGame) {
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}


	Game.prototype.floatShark = function () {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.ctx.fillStyle = Game.BG_COLOR;
	  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.spikes[0].draw(this.ctx);
	  this.spikes[1].draw(this.ctx);
	  this.scoreboard.draw(this.ctx);
	  this.shark.draw(this.ctx);
	  this.shark.float();

	  this.ctx.fillStyle = "#6C7A89";
	  this.ctx.font = "75px Verdana";
	  this.ctx.textAlign = "center"
	  this.ctx.fillText("SHARKTANK", 275, 150);


	  this.ctx.font = "25px Verdana";
	  this.ctx.textAlign = "center"
	  this.ctx.fillStyle = "white";
	  this.ctx.fillText("SPACE", 300, 300);
	  this.ctx.fillText("TO SWIM", 300, 325);
	  this.ctx.fillStyle = "#6C7A89";
	  this.ctx.fillText("BEST SCORE: " + this.highScore, 300, 550);
	  this.ctx.fillText("GAMES PLAYED: " + this.gamesPlayed, 300, 600);
	  if(!this.inGame) {
	    requestAnimationFrame(this.floatShark.bind(this))
	  }
	}


	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	    // debugger
	    // ctx.moveTo(xStart, this.spikeSet[i] * 50 + 80);
	    // ctx.lineTo(xMid, this.spikeSet[i] * 50 + 130 );

	    ctx.moveTo(xStart, this.spikeSet[i] * 58 + 59);
	    ctx.lineTo(xMid, this.spikeSet[i] * 58 + 88 );
	    ctx.lineTo(xStart, this.spikeSet[i] * 58 + 117);
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
	  var numSpikes = Math.ceil(Math.random()*4) + Math.floor(this.game.scoreboard.score/10);
	  if(numSpikes > 9) {
	    numSpikes = 8
	  }
	  console.log(numSpikes)

	  var spikeArray = []

	  while(spikeArray.length < numSpikes) {
	      spikeIdx = Math.floor(Math.random()*10);
	      if(spikeArray.indexOf(spikeIdx) === -1) {
	        spikeArray.push(spikeIdx);
	      }
	  }

	  if(direction === "left"){
	    spikeArray.unshift(0, 30);
	  } else {
	    spikeArray.unshift(550, 520);
	  }

	  this.spikeSet = spikeArray;
	};


	// choose from a set of possible spike positions how many spikes i want



	// Sharktank.Util.inherits(Spike, Sharktank.MovingObject);


	SideSpikes.prototype.isCollidedWith = function (shark) {
	  var collided = false;
	  var objectXCoor = shark.pos[0];
	  var objectYCoor = shark.pos[1];
	  var hitBoxUpper;
	  var hitBoxLower;

	  for(var i = 2; i < this.spikeSet.length; i ++) {
	    hitBoxLower = this.spikeSet[i] * 58 + 59;
	    hitBoxUpper = this.spikeSet[i] * 58 + 117;

	    if(objectYCoor > hitBoxLower && objectYCoor < hitBoxUpper) {
	      if((this.position === "left" && objectXCoor < 30) ||
	          this.position === "right" && objectXCoor > 520) {
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
	  //     if((shark.pos[1] > this.spikeSet[i] * 100 + 80) &&
	  //         (shark.pos[1] < this.spikeSet[i] * 100 + 180) &&
	  //           shark.pos[0] < 50) {
	  //             // console.log(this.direction)
	  //             // debugger
	  //           collided = true;
	  //         }
	  //   }
	  // } else {
	  //   for(var i = 2; i < this.spikeSet.length; i++ ) {
	  //     if((shark.pos[1] > this.spikeSet[i] * 100 + 80) &&
	  //         (shark.pos[1] < this.spikeSet[i] * 100 + 180) &&
	  //           shark.pos[0] > 650) {
	  //             // console.log(this.direction)
	  //             // debugger
	  //           collided = true;
	  //         }
	  //   }
	  // }
	  // return shark.pos[1] > 830;

	  return collided
	};

	SideSpikes.prototype.collideWith = function (otherObject) {
	  if(otherObject.constructor.name === "Shark") {
	    otherObject.spaz();
	    //gameover
	  }
	};

	module.exports = SideSpikes;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Util (game) {
	  this.shark;
	  this.game = game;
	};

	Util.prototype.addDocumentListeners = function () {
	  document.addEventListener('keydown', this.keyPressed.bind(this));
	  // document.addEventListener("keyup", this.keyReleased.bind(this));
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
	      } else {
	        this.shark.jump();
	      }
	      break;
	    case 13:
	      event.preventDefault();
	      if(this.shark.spazzed && this.game.inGame) {
	        this.game.spikes = [];
	        this.game.shark = null;
	        this.game.scoreboard = null;
	        this.game.inGame = false;
	        this.game.home();
	      }
	      break;
	  }
	};

	Util.prototype.keyReleased = function (event) {

	};




	// Normalize the length of the vector to 1, maintaining direction.
	// var dir = Util.dir = function (vec) {
	//   var norm = Util.norm(vec);
	//   return Util.scale(vec, 1 / norm);
	// };

	// Find distance between two points.
	// var dist = Util.dist = function (pos1, pos2) {
	//   return Math.sqrt(
	//     Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	//   );
	// };

	// Find the length of the vector.
	// var norm = Util.norm = function (vec) {
	//   return Util.dist([0, 0], vec);
	// };

	// Return a randomly oriented vector with the given length.
	// var randomVec = Util.randomVec = function (length) {
	//   var deg = 2 * Math.PI * Math.random();
	//
	//   return scale([Math.sin(deg), Math.cos(deg)], length);
	// };

	// Scale the length of a vector by the given amount.
	// var scale = Util.scale = function (vec, m) {
	//   return [vec[0] * m, vec[1] * m];
	// };

	var inherits = Util.inherits = function (ChildClass, BaseClass) {
	  function Surrogate () { this.constructor = ChildClass };
	  Surrogate.prototype = BaseClass.prototype;
	  ChildClass.prototype = new Surrogate();
	};

	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Fish = __webpack_require__(9);

	function FishHolder (options) {
	  this.game = options.game;
	  this.fishHolder = [];
	  this.sharkDirection = this.game.shark.direction;
	  this.opacity = 1;
	  this.eaten = false;
	  this.fishCoor;
	};

	FishHolder.prototype.randomizeFish = function () {
	  if(this.fishHolder.length === 0 && this.sharkDirection != this.game.shark.direction) {
	    this.sharkDirection = this.game.shark.direction;
	    if(Math.ceil(Math.random()*3) === 3) {
	      var x = Math.ceil(Math.random()*390) + 80;
	      var y = Math.ceil(Math.random()*500) + 100;
	      this.fishHolder.push(new Fish({pos: [x, y]}));
	      this.fishCoor = [x,y]
	    }
	  }
	};

	FishHolder.prototype.draw = function (ctx) {
	  if(this.game.inGame === false) {
	    this.fishHolder = [];
	  } else {
	    if(this.eaten === false) {
	      if(this.fishHolder.length === 0) {
	        this.randomizeFish();
	      } else {
	        this.fishHolder[0].move();
	        this.fishHolder[0].draw(ctx);
	      }
	    } else {
	      ctx.font = "bold 25px Arial";
	      ctx.fillStyle = "rgba(246, 36, 89, " + this.opacity + ")";
	      ctx.fillText("+5", this.fishCoor[0], this.fishCoor[1]);
	      this.opacity -= 0.030;

	      if(this.opacity <= 0) {
	        this.eaten = false;
	        this.opacity = 1;
	      }
	    }
	  }

	};

	FishHolder.prototype.collideWith = function (shark) {
	  this.game.scoreboard.score += 5;
	  this.fishHolder = [];
	  this.eaten = true;
	}

	FishHolder.prototype.isCollidedWith = function (shark) {
	  var collided = false;
	  if(this.fishHolder.length != 0) {
	    var objectXCoor = shark.pos[0];
	    var objectYCoor = shark.pos[1];
	    var hitBoxUpper = this.fishHolder[0].pos[1] - 30;
	    var hitBoxLower = this.fishHolder[0].pos[1] + 30;
	    var hitBoxRight = this.fishHolder[0].pos[0] + 40;
	    var hitBoxLeft = this.fishHolder[0].pos[0] - 40;
	    if(objectXCoor <= hitBoxRight && objectXCoor >= hitBoxLeft && objectYCoor >= hitBoxUpper && objectYCoor <= hitBoxLower) {
	      // debugger
	      collided = true
	    }

	  }
	  return collided
	}


	module.exports = FishHolder;


/***/ },
/* 7 */
/***/ function(module, exports) {

	// var Spike = require("./spike.js");

	function TopBottomSpikes (options) {
	  this.game = options.game;
	  this.width = 550;
	  this.height = 700;
	  this.color = "#6C7A89";
	  this.position = options.position; //"top" || "bottom"
	  this.x;
	  this.y;
	  this.spikeIncrementer;
	  this.rectangle;

	};

	TopBottomSpikes.prototype.calculateXAndY = function () {
	  if (this.position === "top") {
	    this.x = 0;
	    this.y = 60;
	    this.rectangle = 0;

	    this.spikeIncrementer = 25;
	  } else if (this.position == "bottom") {
	    this.x = 0;
	    this.y = 640;
	    this.rectangle = 675;

	    this.spikeIncrementer = 675;
	  }
	};

	TopBottomSpikes.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  this.calculateXAndY();

	  ctx.beginPath();
	  ctx.rect(this.x, this.rectangle, this.width, 25)
	  ctx.fill();

	  ctx.beginPath();
	  ctx.moveTo(this.x, this.spikeIncrementer);
	  while(this.x < this.width) {
	    this.x += 17;
	    ctx.lineTo(this.x, this.spikeIncrementer);
	    this.x += 30
	    ctx.lineTo(this.x, this.y)
	    this.x += 30
	    ctx.lineTo(this.x, this.spikeIncrementer);
	    ctx.fill();
	  }

	  ctx.stroke();

	};



	TopBottomSpikes.prototype.isCollidedWith = function (otherObject) {
	  if(this.position === "top") {
	    return otherObject.pos[1] < this.y;
	  } else if (this.position == "bottom") {
	    return otherObject.pos[1] > this.y;
	  }
	}

	TopBottomSpikes.prototype.collideWith = function (otherObject) {
	  if(otherObject.constructor.name === "Shark") {
	    otherObject.spaz();
	  }
	};



	module.exports = TopBottomSpikes;


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	function Fish (options) {
	  this.pos = options.pos;
	  this.vel = [0, 1]
	  this.direction = "down";
	  this.img = new Image();
	  this.img.src = 'assets/steak.png';
	};

	Fish.prototype.draw = function (ctx) {
	  // ctx.fillStyle = this.color;
	  //
	  // ctx.beginPath();
	  // ctx.arc(
	  //   this.pos[0], this.pos[1], 20, 0, 2 * Math.PI, true
	  // );
	  // ctx.fill();
	  // ctx.stroke();
	  ctx.drawImage(this.img, this.pos[0], this.pos[1])
	}

	Fish.prototype.move = function () {
	  if(this.direction == "down" && this.vel[1] < 1.3) {
	    this.vel[1] += 0.01
	  } else if (this.direction === "down" && this.vel[1] > 1.3) {
	    this.direction = "up"
	    this.vel[1] = -1
	  } else if (this.direction === "up" && this.vel[1] > -1.3) {
	    this.vel[1] -= 0.01
	  } else if (this.direction === "up" && this.vel[1] < -1.3) {
	    this.direction = "down";
	    this.vel[1] = 1
	  }
	  console.log(this.direction)
	  console.log(this.vel[1])
	  newX = this.pos[0] + this.vel[0];
	  newY = this.pos[1] + this.vel[1];
	  this.pos = [newX, newY];
	}

	module.exports = Fish;


/***/ }
/******/ ]);