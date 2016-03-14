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
	var GameView = __webpack_require__(7);
	var Util = __webpack_require__(8);

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
	var TopSpikes = __webpack_require__(3);
	var BottomSpikes = __webpack_require__(4);
	var Scoreboard = __webpack_require__(5);
	var Shark = __webpack_require__(6);
	var Util = __webpack_require__(8);

	function Game (ctx) {
	    this.ctx = ctx;
	    this.spikes = [];
	    this.shark;
	    this.scoreboard;
	    this.direction;
	    this.inGame = false;
	    this.util = new Util(this);

	    this.addSpikes();
	    // this.addShark();
	    // this.addScoreboard();

	    this.util.addDocumentListeners();
	};

	Game.BG_COLOR = "#F2F1EF";
	Game.DIM_X = 700;
	Game.DIM_Y = 900;
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
	  // for (var i = 0; i < Game.NUM_SPIKES; i++){
	  //   this.add(new Sharktank.Spike({game: this}));
	  // }

	  // this.add(new Sharktank.TopSpikes({game: this}));
	  // this.add(new Sharktank.BottomSpikes({game: this}));

	  this.spikes.push(new TopSpikes({game: this}))
	  this.spikes.push(new BottomSpikes({game: this}))
	  this.spikes.push(new SideSpikes({game: this}))

	};

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
	  return [].concat(this.scoreboard, this.spikes, this.shark);
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
	  }.bind(this));
	};

	// Game.prototype.isOutOfBounds = function (pos) {
	//   return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) ||
	//           (pos[1] > Game.DIM_Y);
	// };

	Game.prototype.moveObjects = function (delta) {
	    this.shark.move(delta);
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
	  // cancelAnimationFrame(0);
	  this.inGame = false;
	  this.home();
	}

	Game.prototype.step = function (delta) {
	  this.moveObjects(delta);
	  this.checkCollisions();
	};

	Game.prototype.home = function () {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.ctx.fillStyle = Game.BG_COLOR;
	  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

	  this.ctx.fillStyle = "#336E7B"
	  this.ctx.font = "bold 75px Arial";
	  this.ctx.textAlign = "center"
	  this.ctx.fillText("Press P to Start!", 350, 375);
	}

	Game.prototype.start = function () {
	  this.lastTime = 0;
	  // debugger;
	  this.addShark();
	  this.addScoreboard();
	  this.util.addShark(this.shark);
	  requestAnimationFrame(this.animate.bind(this));
	}

	Game.prototype.animate = function (time) {
	  // debugger
	  var timeDelta = time - this.lastTime;
	  this.step(timeDelta);
	  this.draw(this.ctx);
	  this.lastTime = time;
	  if(this.inGame) {
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}


	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function SideSpikes (options) {
	  this.width = options.width || 700;
	  this.height = options.height || 900;
	  this.color = options.color || "#6C7A89";
	  this.pos = [0,0]
	  this.game = options.game;
	  // this.direction = options.direction;
	  this.order = options.order;

	  this.currDirection;
	  this.spikeSet;
	  // Sharktank.MovingObject.call(this, options);
	  this.setCurrDirection();
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
	    ctx.stroke();
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
	  var collided = false;
	  var objectXCoor = otherObject.pos[0];
	  var objectYCoor = otherObject.pos[1];
	  var hitBoxUpper;
	  var hitBoxLower;

	  for(var i = 2; i < this.spikeSet.length; i ++) {
	    hitBoxLower = this.spikeSet[i] * 100 + 80;
	    hitBoxUpper = this.spikeSet[i] * 100 + 180;

	    if(objectYCoor > hitBoxLower && objectYCoor < hitBoxUpper) {

	      if((this.currDirection === "left" && objectXCoor < 50) ||
	          this.currDirection === "right" && objectXCoor > 650) {
	        collided = true
	      }
	    }
	  }


	  //   this.currDirection === "left" ? hitBoxWidth = 50 : hitBoxWidth = 650
	  // }
	  //
	  //
	  // if(this.currDirection === "left") {
	  //   for(var i = 2; i < this.spikeSet.length; i++ ) {
	  //     if((otherObject.pos[1] > this.spikeSet[i] * 100 + 80) &&
	  //         (otherObject.pos[1] < this.spikeSet[i] * 100 + 180) &&
	  //           otherObject.pos[0] < 50) {
	  //             // console.log(this.direction)
	  //             // debugger
	  //           collided = true;
	  //         }
	  //   }
	  // } else {
	  //   for(var i = 2; i < this.spikeSet.length; i++ ) {
	  //     if((otherObject.pos[1] > this.spikeSet[i] * 100 + 80) &&
	  //         (otherObject.pos[1] < this.spikeSet[i] * 100 + 180) &&
	  //           otherObject.pos[0] > 650) {
	  //             // console.log(this.direction)
	  //             // debugger
	  //           collided = true;
	  //         }
	  //   }
	  // }
	  // return otherObject.pos[1] > 830;

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

	function TopSpikes (options) {
	  this.width = options.width || 700;
	  this.height = options.height || 900;
	  this.color = options.color || "#6C7A89";
	  this.pos = [0,0];
	  this.game = options.game;
	  // this.spikes = [];
	  //
	  // this.createSpikes();
	};

	// Spike.prototype.createSpikes = function () {
	//
	// }

	TopSpikes.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;

	  ctx.beginPath()
	  ctx.rect(0, 0, this.width, 30)
	  ctx.fill();
	  // ctx.stroke();


	  var x = 0;
	  var y = 80;
	  ctx.beginPath();
	  ctx.moveTo(x, 30);
	  while(x < this.width) {
	    x += 50
	    ctx.lineTo(x, y);
	    x += 50
	    ctx.lineTo(x, 30);
	    ctx.fill();
	  }

	  ctx.stroke();


	}


	TopSpikes.prototype.isCollidedWith = function (otherObject) {
	  return otherObject.pos[1] < 80;
	};

	TopSpikes.prototype.collideWith = function (otherObject) {
	  if(otherObject.constructor.name === "Shark") {
	    otherObject.spaz();
	    //gameover
	  }
	};

	module.exports = TopSpikes;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function BottomSpikes (options) {
	  this.width = options.width || 700
	  this.height = options.height || 900
	  this.color = options.color || "#6C7A89" ;
	  this.pos = [0,0];
	  this.game = options.game
	  // this.spikes = [];
	  //
	  // this.createSpikes();
	};

	// Spike.prototype.createSpikes = function () {
	//
	// }

	BottomSpikes.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;

	  ctx.beginPath();
	  ctx.rect(0, 870, this.width, 30)
	  ctx.fill();
	  // ctx.stroke();


	  var x = 0;
	  var y = 820;
	  ctx.beginPath();
	  ctx.moveTo(x, 870);
	  while(x < this.width) {
	    x += 50
	    ctx.lineTo(x, y);
	    x += 50
	    ctx.lineTo(x, 870);
	    ctx.fill();
	  }

	  ctx.stroke();

	}

	// BottomSpikes.prototype.collideWith = function (otherObject) {
	//   if(otherObject instanceof Sharktank.Bird) {
	//     otherObject.relocate();
	//   }
	// };

	BottomSpikes.prototype.isCollidedWith = function (otherObject) {
	  return otherObject.pos[1] > 830;
	};

	BottomSpikes.prototype.collideWith = function (otherObject) {
	  if(otherObject.constructor.name === "Shark") {
	    otherObject.spaz();
	    //gameover
	  }
	};

	module.exports = BottomSpikes;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Scoreboard (options) {
	  this.game = options.game;
	  this.shark = options.shark;
	  this.color = "#336E7B";
	  this.score = 0;
	  this.sharkDirection = "right";
	  this.pos = [this.game.DIM_X/2, this.game.DIM_Y/2];
	  this.pos = [350, 300];
	};

	Scoreboard.prototype.draw = function (ctx) {
	  this.checkScore();


	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], 175, 0, 2 * Math.PI, true
	  )
	  ctx.fill();


	  ctx.fillStyle = "white"
	  ctx.font = "bold 200px Arial";
	  ctx.textAlign = "center"
	  ctx.fillText(this.score, 350, 375);
	  console.log(this.score)
	};

	Scoreboard.prototype.checkScore = function () {
	  if(this.shark.direction != this.sharkDirection) {
	    // debugger;
	    this.sharkDirection = this.shark.direction;
	    this.score += 1;
	    // console.log("here")
	  }
	}

	module.exports = Scoreboard;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function Shark (options) {
	  this.radius = Shark.RADIUS;
	  this.vel = options.vel || [8, 13];
	  this.color = "#4183D7";
	  this.pos = options.pos || [350, 300];
	  this.game = options.game;
	  this.game_width = options.canvas_width;
	  this.game_height = options.canvas_height;
	  this.direction = "right";
	  this.spazzed = false;
	  this.opacity = 1;

	  this.shark = new Image();
	  this.shark.src = 'assets/shark.png';
	  // Sharktank.MovingObject.call(this, options)
	};

	Shark.RADIUS = 25;

	// Sharktank.Util.inherits(Shark, Sharktank.MovingObject);

	Shark.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;

	  if(this.spazzed) {
	    ctx.fillStyle = "rgba(65, 131, 215, " + this.opacity + ")";
	    this.opacity -= 0.015;

	    if(this.opacity <= 0) {
	      this.game.over();
	    }

	    console.log(this.opacity)
	  }


	  // this.vel[1] = 3

	  ctx.drawImage(this.shark, this.pos[0], this.pos[1], 100, 100);

	  // ctx.beginPath();
	  // ctx.arc(
	  //   this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  // );
	  // ctx.fill();
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
	  if(this.direction === "right"){
	      this.pos[1] > 830 ? this.vel = [-10,-20] : this.vel = [10, -20]
	  } else {
	    this.pos[1] > 830 ? this.vel = [10,-20] : this.vel = [-10, 20]
	  }
	  console.log("spaz")
	  this.spazzed = true;


	}


	//
	// Shark.prototype.relocate = function () {
	//   this.pos = this.game.randomPosition();
	//   this.vel = [0,0];
	// };
	module.exports = Shark;


/***/ },
/* 7 */
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
/* 8 */
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
	      this.shark.jump();
	      break;
	    case 80:
	      event.preventDefault();
	      this.game.inGame = true;
	      this.game.start();
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


/***/ }
/******/ ]);