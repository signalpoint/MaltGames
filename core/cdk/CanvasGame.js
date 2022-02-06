var mk = mk ? mk : {};

'use strict';

mk.CanvasGame = function(id, contextType) {

  var g = this;

  // PROPERTIES

  g._id = id; // The canvas id.
  g._canvas = document.getElementById(id);
  g._contextType = contextType;
  g._entities = {};

  g._fps = 0;
  g._startingFps = 60;

  g._gravity = 9.81; // 9.81 m/s/s
  g._height = 10; // game height in "meters"
  g._pixelsPerMeter = 0;

  g._startTime = 0;
  g._lastTime = 0;
  g._gameTime = 0;

  g._paused = false;
  g._pauseTime = 0;

  g._mouse = {
    x: 0,
    y: 0
  };

  // METHODS

  g.getId = function() { return this._id; };
  g.getCanvas = function() { return this._canvas; };
  g.getContextType = function() { return this._contextType; };
  g.getContext = function() { return this.getCanvas().getContext(this.getContextType()); };

  g.getEntities = function() { return this._entities; };
  g.getEntity = function(type, id) {
    var entities = this.getEntities();
    return entities[type] && entities[type][id] ? entities[type][id] : null;
  };

  g.addEntities = function(entities) {
    for (var i = 0; i < entities.length; i++) {
      this.addEntity(entities[i]);
    }
  };
  g.addEntity = function(entity) {
//    var entities = this.getEntities();
//    var type = entity.type;
//    if (!entities[type]) { entities[type] = {}; }
//    entities[type][entity.id] = entity;
    var type = entity.type;
    if (!this._entities[type]) { this._entities[type] = {}; }
    this._entities[type][entity.id] = entity;
  };

  g.draw = function() {

    var entities = this.getEntities();
    if (entities) {

//      // BEHAVIORS + DRAW
//      for (const [type, items] of Object.entries(entities)) {
//        for (const [id, entity] of Object.entries(items)) {
//          if (entity.behaviors.length) {
//            for (var i = 0; i < entity.behaviors.length; i++) {
//              var behavior = entity.behaviors[i];
//              if (behavior.animated && !entity.animationTimer.isRunning()) {
//                entity.animationTimer.start();
//              }
//              behavior.do.call(behavior, entity, this.getTimeNow());
//            }
//          }
//          entity.draw();
//        }
//      }

      // BEHAVIORS
      for (const [type, items] of Object.entries(entities)) {
        for (const [id, entity] of Object.entries(items)) {
          if (entity.behaviors.length) {
            for (var i = 0; i < entity.behaviors.length; i++) {
              var behavior = entity.behaviors[i];
              if (behavior.animated && !entity.animationTimer.isRunning()) {
                entity.animationTimer.start();
              }
              behavior.do.call(behavior, entity, this.getTimeNow());
            }
          }
        }
      }

      // THEN...

      // DRAW
      for (const [type, items] of Object.entries(entities)) {
        for (const [id, entity] of Object.entries(items)) {
          entity.draw();
        }
      }

    }

  };

  g.refreshCanvas = function() {
    this.clearCanvas();
    this.draw();
  };

  g.clearCanvas = function() {
//    var canvas = this.getCanvas();
//    var ctx = this.getContext();
//
//    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.getContext().clearRect(0,0, game.getCanvas().width, game.getCanvas().height);

//    ctx.beginPath();
//    ctx.fillStyle = "rgba(0, 0, 0, 255)";
//    ctx.fillRect(0, 0, canvas.width, canvas.height);
//    ctx.stroke();

// Store the current transformation matrix
//ctx.save();
//
//// Use the identity matrix while clearing the canvas
//ctx.setTransform(1, 0, 0, 1, 0, 0);
//ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//// Restore the transform
//ctx.restore();

  };

  /**
   * FRAME RATE
   */

  g.getFps = function() { return this._fps; };
  g.setFps = function(fps) { this._fps = fps; };

  g.getStartingFps = function() { return this._startingFps; };
  g.setStartingFps = function(fps) { this._startingFps = fps; };

  g.getGravity = function() { return this._gravity; };
  g.setGravity = function(g) { this._gravity = g; };

  g.getHeight = function() { return this._height; };
  g.setHeight = function(height) {
    this._height = height;
    this.updatePixelsPerMeter();
  };

  g.getPixelsPerMeter = function() {
    return this._pixelsPerMeter;
  };
  g.setPixelsPerMeter = function(pixelsPerMeter) {
    this._pixelsPerMeter = pixelsPerMeter;
  };
  g.updatePixelsPerMeter = function() {
    g.setPixelsPerMeter(this.getCanvas().height / this.getHeight());
  };

  /**
   * Updates the frame rate based on how much time it took to render the last frame, or falls back to the starting fps.
   */
  g.updateFrameRate = function(time) {
//    console.log('time', time);
//    console.log('getLastTime', this.getLastTime());
    this.setFps(
      !this.getLastTime() ?
        1000 / (time - this.getLastTime()) :
        this.getStartingFps());
  };

  g.pixelsPerFrame = function(velocity) { return velocity / this.getFps(); },

  /**
   * TIME
   */

  g.getTimeNow = function() { return +new Date(); };
  g.getStartTime = function() { return this._startTime; };
  g.setStartTime = function(time) { this._startTime = time; };
  g.getLastTime = function() { return this._lastTime; };
  g.setLastTime = function(time) { this._lastTime = time; };
  g.getGameTime = function() { return this._gameTime; };
  g.setGameTime = function(time) { this._gameTime = time; };

  /**
   * Updates the frame rate, game time and the last time the app rendered an update.
   * @param {type} time
   * @returns {undefined}
   */
  g.tick = function() {
    var time = this.getTimeNow();
    this.updateFrameRate(time);
    this.setGameTime(time - this.getStartTime());
    this.setLastTime(time);
  };

  /**
   * PAUSE
   */

  g.getPauseTime = function() { return this._pauseTime; };
  g.setPauseTime = function(time) { this._pauseTime = time; };
  g.isPaused = function() { return this._paused; };
  g.pause = function() { this._paused = true; };
  g.unpause = function() { this._paused = false; };
  g.togglePause = function() {
    var now = this.getTimeNow();
    this.isPaused() ? this.unpause() : this.pause();
    if (this.isPaused()) {
      this.setPauseTime(now);
    }
    else {
      this.setStart(this.getStartTime() + now - this.getPauseTime());
      this.setLastTime(now);
    }
  };

  g.getMouse = function() { return this._mouse; };
  g.getMouseX = function() { return this._mouse.x; };
  g.setMouseX = function(x) { this._mouse.x = x; };
  g.getMouseY = function() { return this._mouse.y; };
  g.setMouseY = function(y) { this._mouse.y = y; };

  // PROXIES

  g.id = function() { return this.getId(); };
  g.ppm = function() { return this.getPixelsPerMeter(); };

};
