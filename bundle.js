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

	var Game = __webpack_require__(1);
	var Util = __webpack_require__(6);

	var canvasEl = document.getElementsByTagName("canvas")[0];
	canvasEl.width = Game.DIM_X;
	canvasEl.height = Game.DIM_Y;

	var ctx = canvasEl.getContext("2d");
	var game = new Game(ctx);

	game.home();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var SideSpikes = __webpack_require__(2);
	var TopBottomSpikes = __webpack_require__(3);
	var Scoreboard = __webpack_require__(4);
	var Shark = __webpack_require__(5);
	var Util = __webpack_require__(6);
	var BoostHolder = __webpack_require__(7);


	function Game (ctx) {
	  this.ctx = ctx;
	  this.spikes = [];
	  this.shark;
	  this.boostHolder;
	  this.scoreboard;
	  this.inGame = false;
	  this.util = new Util(this);
	  this.highScore = parseInt(localStorage.highScore) || 0;
	  this.gamesPlayed = parseInt(localStorage.gamesPlayed) || 0;

	  this.util.addDocumentListeners();
	}

	Game.DIM_X = 550;
	Game.DIM_Y = 700;

	Game.prototype.home = function () {
	  this.addShark();
	  this.addTopBottomSpikes();
	  this.addScoreboard();
	  this.addBoostHolder();
	  this.floatShark();
	};

	Game.prototype.over = function () {
	  cancelAnimationFrame(0);

	  if(this.highScore === undefined || this.scoreboard.score > this.highScore) {
	    this.highScore = this.scoreboard.score;
	    localStorage.setItem("highScore", this.scoreboard.score);
	  }

	  this.spikes = [];
	  this.shark = null;
	  this.scoreboard = null;
	  this.inGame = false;
	  this.home();
	};

	Game.prototype.floatShark = function () {
	  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.ctx.fillStyle = "rgba(242, 241, 239, .7)";
	  this.ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

	  this.draw(this.ctx);
	  this.shark.float();

	  this.ctx.fillStyle = "#6C7A89";
	  this.ctx.font = "75px Verdana";
	  this.ctx.textAlign = "center";
	  this.ctx.fillText("SHARKTANK", 275, 150);

	  this.ctx.font = "25px Verdana";
	  this.ctx.textAlign = "center";
	  this.ctx.fillStyle = "white";

	  this.ctx.fillText("SPACE", 300, 300);
	  this.ctx.fillText("TO SWIM", 300, 325);
	  this.ctx.fillText("BEST SCORE: " + this.highScore, 300, 550);
	  this.ctx.fillText("GAMES PLAYED: " + this.gamesPlayed, 300, 600);

	  if(!this.inGame) {
	    requestAnimationFrame(this.floatShark.bind(this));
	  }
	};

	Game.prototype.start = function () {
	  this.addSpikes();
	  this.addBoostHolder();
	  this.util.addShark(this.shark);
	  this.shark.floatDirection = null;
	  this.shark.vel = [5,-7];
	  this.animate();


	  if(this.gamesPlayed === undefined) {
	    this.gamesPlayed = 1;
	    localStorage.setItem("gamesPlayed", 1);
	  } else {
	    this.gamesPlayed += 1;
	    var currGamesPlayed = parseInt(localStorage.gamesPlayed) + 1;
	    localStorage.setItem("gamesPlayed", currGamesPlayed);
	  }
	};

	Game.prototype.animate = function () {
	  this.step();
	  this.draw(this.ctx);
	  // this.lastTime = time;
	  if(this.inGame) {
	    requestAnimationFrame(this.animate.bind(this));
	  }
	};

	Game.prototype.addTopBottomSpikes = function () {
	  this.spikes.push(new TopBottomSpikes({game: this, position: "top"}));
	  this.spikes.push(new TopBottomSpikes({game: this, position: "bottom"}));
	};

	Game.prototype.addSpikes = function () {
	  this.spikes.push(new SideSpikes({game: this}));
	};

	Game.prototype.addBoostHolder = function () {
	  this.boostHolder = new BoostHolder ({game: this});
	};

	Game.prototype.addShark = function () {
	  var shark = new Shark({
	    game: this,
	    canvas_width: Game.DIM_X,
	    canvas_height: Game.DIM_Y
	  });

	  this.shark = shark;
	};

	Game.prototype.addScoreboard = function () {
	  var scoreboard = new Scoreboard({
	    game: this,
	    shark: this.shark
	  });

	  this.scoreboard = scoreboard;
	};

	Game.prototype.allObjects = function () {
	  return [].concat(this.scoreboard, this.spikes, this.shark, this.boostHolder);
	};

	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  this.ctx.fillStyle = "rgba(242, 241, 239, .4)";
	  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

	  this.allObjects().forEach(function (object) {
	    object.draw(ctx);
	  });
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.moveObjects = function () {
	  this.shark.move();
	};

	Game.prototype.checkCollisions = function () {
	  this.spikes.forEach(function (spike) {
	    if(spike.isCollidedWith(this.shark)) {
	      spike.collideWith(this.shark);
	    }
	  }.bind(this));

	  if(this.boostHolder.isCollidedWith(this.shark)) {
	    this.boostHolder.collideWith();
	  }
	};


	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function SideSpikes (options) {
	  this.game = options.game;
	  this.width = 550;
	  this.height = 700;
	  this.color = "#6C7A89";
	  this.position;
	  this.spikeSet;
	  this.setCurrDirection();
	}

	SideSpikes.prototype.draw = function (ctx) {
	  if(this.game.direction !== this.position) {
	    this.setCurrDirection();
	  }
	  var xStart = this.spikeSet[0];
	  var xMid = this.spikeSet[1];

	  ctx.fillStyle = this.color;

	  for(var i = 2; i < this.spikeSet.length; i++) {
	    ctx.beginPath();
	    ctx.moveTo(xStart, this.spikeSet[i] * 58 + 59);
	    ctx.lineTo(xMid, this.spikeSet[i] * 58 + 88 );
	    ctx.lineTo(xStart, this.spikeSet[i] * 58 + 117);
	    ctx.fill();
	    ctx.stroke();
	  }
	};

	SideSpikes.prototype.setCurrDirection = function () {
	  this.position = this.game.direction;
	  this.chooseSpikes(this.position);
	};

	SideSpikes.prototype.chooseSpikes = function (direction) {
	  var numSpikes = Math.ceil(Math.random()*4) + Math.floor(this.game.scoreboard.score/12);
	  if(numSpikes > 9) {
	    numSpikes = 8;
	  }

	  var spikeArray = [];

	  while(spikeArray.length < numSpikes) {
	      var spikeIdx = Math.floor(Math.random()*10);
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
	        collided = true;
	      }
	    }
	  }
	  return collided;
	};

	SideSpikes.prototype.collideWith = function (shark) {
	  shark.spaz();
	};

	module.exports = SideSpikes;


/***/ },
/* 3 */
/***/ function(module, exports) {

	function TopBottomSpikes (options) {
	  this.game = options.game;
	  this.width = 550;
	  this.height = 700;
	  this.color = "#6C7A89";
	  this.position = options.position;
	  this.x;
	  this.y;
	  this.spikeIncrementer;
	  this.rectangle;
	}

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
	  ctx.rect(this.x, this.rectangle, this.width, 25);
	  ctx.fill();

	  ctx.beginPath();
	  ctx.moveTo(this.x, this.spikeIncrementer);
	  while(this.x < this.width) {
	    this.x += 17;
	    ctx.lineTo(this.x, this.spikeIncrementer);
	    this.x += 30;
	    ctx.lineTo(this.x, this.y);
	    this.x += 30;
	    ctx.lineTo(this.x, this.spikeIncrementer);
	    ctx.fill();
	  }

	  ctx.stroke();
	};

	TopBottomSpikes.prototype.isCollidedWith = function (otherObject) {
	  if(this.position === "top") {
	    return otherObject.pos[1] < this.y;
	  } else if (this.position == "bottom") {
	    return otherObject.pos[1] > this.y - 19;
	  }
	};

	TopBottomSpikes.prototype.collideWith = function (shark) {
	  shark.spaz();
	};


	module.exports = TopBottomSpikes;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function Scoreboard (options) {
	  this.game = options.game;
	  this.shark = options.shark;
	  this.color = "#2980b9";
	  this.score = 0;
	  this.sharkDirection = "right";
	  this.pos = [300, 350];
	}

	Scoreboard.prototype.draw = function (ctx) {
	  this.checkScore();

	  ctx.fillStyle = "rgba(41, 128, 185, .9)";

	  ctx.beginPath();
	  ctx.arc(
	    this.pos[0], this.pos[1], 150, 0, 2 * Math.PI, true
	  );
	  ctx.fill();

	  if(this.game.inGame) {
	    ctx.fillStyle = "white";
	    ctx.font = "bold 150px Arial";
	    ctx.textAlign = "center";
	    ctx.fillText(this.score, 300, 400);
	  }
	};

	Scoreboard.prototype.eatSteak = function () {
	  this.score += 5;
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Shark (options) {
	  this.radius = Shark.RADIUS;
	  this.vel = [0, 1];
	  this.color = "#F62459";
	  this.pos = [315, 350];
	  this.game = options.game;
	  this.game_width = options.canvas_width;
	  this.game_height = options.canvas_height;
	  this.direction = "right";
	  this.spazzed = false;
	  this.opacity = 1;
	  this.floatDirection = "down";
	}

	Shark.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;

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

	Shark.prototype.calculateY = function () {
	  if(this.vel[1] < 7) {
	    this.vel[1] += 0.5;
	  }
	};

	Shark.prototype.jump = function () {
	  this.vel[1] = -11;
	};

	Shark.prototype.spaz = function () {
	  if(this.direction === "right"){
	      this.pos[1] > 640 ? this.vel = [-8,-12] : this.vel = [8, -12];
	  } else {
	    this.pos[1] > 620 ? this.vel = [8,-12] : this.vel = [-8, 12];
	  }
	  this.spazzed = true;
	};

	module.exports = Shark;


/***/ },
/* 6 */
/***/ function(module, exports) {

	function Util (game) {
	  this.shark;
	  this.game = game;
	}

	Util.prototype.addDocumentListeners = function () {
	  document.addEventListener('keydown', this.keyPressed.bind(this));
	  document.addEventListener('click', this.mouseClicked.bind(this));
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

	Util.prototype.mouseClicked = function (event) {
	  event.preventDefault();
	  if(this.game.inGame === false) {
	    this.game.inGame = true;
	    this.game.start();
	  } else if (!this.shark.spazzed){
	    this.shark.jump();
	  }
	};

	module.exports = Util;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Steak = __webpack_require__(9);
	var Star = __webpack_require__(10);

	function BoostHolder (options) {
	  this.game = options.game;
	  this.boostHolder = [];
	  this.sharkDirection = this.game.shark.direction;
	  this.existBoost = false;
	  this.boostCoor = [0, 0];
	}

	BoostHolder.prototype.randomizeBoost = function () {
	  if(this.boostHolder.length === 0 && this.sharkDirection !== this.game.shark.direction) {
	    this.sharkDirection = this.game.shark.direction;
	    if(Math.ceil(Math.random()*4) === 4) { //1 in 4 chance steak will appear
	      var x = Math.ceil(Math.random()*390) + 80;
	      var y = Math.ceil(Math.random()*500) + 100;
	      this.boostHolder.push(new Steak({pos: [x, y], holder: this}));
	      this.boostCoor = [x, y];
	      this.existBoost = true;
	    }
	  }
	};

	BoostHolder.prototype.draw = function (ctx) {
	  if(this.game.inGame === false) {
	    this.boostHolder = [];
	  }
	  if(this.boostHolder.length !== 0) {
	    if(this.existBoost === false) {
	      this.boostHolder[0].emitPower(ctx);
	    } else {
	      this.boostHolder[0].float();
	      this.boostHolder[0].draw(ctx);
	    }
	  } else {
	    this.randomizeBoost();
	  }
	};

	BoostHolder.prototype.reset = function () {
	  this.boostHolder = [];
	};

	BoostHolder.prototype.collideWith = function () {
	  var boost = this.boostHolder[0].constructor.name;
	  switch(boost){
	    case "Steak":
	      this.game.scoreboard.eatSteak();
	      this.existBoost = false;
	  }
	};

	BoostHolder.prototype.isCollidedWith = function (shark) {
	  if(this.existBoost === false) {
	    return false;
	  }

	  var collided = false;
	  if(this.boostHolder.length !== 0) {
	    var objectXCoor = shark.pos[0];
	    var objectYCoor = shark.pos[1];
	    var hitBoxUpper = this.boostHolder[0].pos[1] - 30;
	    var hitBoxLower = this.boostHolder[0].pos[1] + 30;
	    var hitBoxRight = this.boostHolder[0].pos[0] + 40;
	    var hitBoxLeft = this.boostHolder[0].pos[0] - 40;
	    if(objectXCoor <= hitBoxRight && objectXCoor >= hitBoxLeft && objectYCoor >= hitBoxUpper && objectYCoor <= hitBoxLower) {
	      collided = true;
	    }

	  }
	  return collided;
	};


	module.exports = BoostHolder;


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	function Steak (options) {
	  this.pos = options.pos;
	  this.holder = options.holder;
	  this.vel = [0, 1];
	  this.direction = "down";
	  this.opacity = 1;
	  this.img = new Image();
	  this.img.src = 'assets/steak.png';
	  this.opacity = 1;
	  this.emittingPower = false;
	}

	Steak.prototype.draw = function (ctx) {
	  ctx.drawImage(this.img, this.pos[0], this.pos[1]);
	};

	Steak.prototype.float = function () {
	  if(this.direction === "down" && this.vel[1] < 1.3) {
	    this.vel[1] += 0.01;
	  } else if (this.direction === "down" && this.vel[1] > 1.3) {
	    this.direction = "up";
	    this.vel[1] = -1;
	  } else if (this.direction === "up" && this.vel[1] > -1.3) {
	    this.vel[1] -= 0.01;
	  } else if (this.direction === "up" && this.vel[1] < -1.3) {
	    this.direction = "down";
	    this.vel[1] = 1;
	  }

	  var newX = this.pos[0] + this.vel[0];
	  var newY = this.pos[1] + this.vel[1];
	  this.pos = [newX, newY];
	};

	Steak.prototype.emitPower = function (ctx) {
	  this.emittingPower = true;
	  ctx.font = "bold 25px Arial";
	  ctx.fillStyle = "rgba(38, 194, 129, " + this.opacity + ")";
	  ctx.fillText("+5", this.pos[0], this.pos[1]);
	  this.opacity -= 0.030;

	  if(this.opacity <= 0) {
	    this.emittingPower = false;
	    this.opacity = 1;
	    this.holder.reset();
	  }
	};

	module.exports = Steak;


/***/ },
/* 10 */
/***/ function(module, exports) {

	function Star (options) {

	}

	module.exports = Star;


/***/ }
/******/ ]);