Stopwatch = function() {
  
};

Stopwatch.prototype = {
  
  _startTime: 0,
  _running: false,
  _elapsed: 0,
  
  start: function() {
    this.setStartTime(+new Date());
    this._running = true;
  },
  stop: function() {
    this._elapsed = (+new Date()) - this.getStartTime();
    this._running = false;
  },
  setStartTime: function(startTime) {
    this._startTime = startTime;
  },
  getStartTime: function() {
    return this._startTime;
  },
  isRunning: function() {
    return this._running;
  },
  reset: function() {
    this._elapsed = 0;
  },
  getElapsedTime: function() {
    return this.isRunning() ? (+new Date()) - this.getStartTime() : this._elapsed;
  }
  
};
