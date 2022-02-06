AnimationTimer = function(duration) {
  this._duration = duration;
};
AnimationTimer.prototype = {

  _duration: null,
  _stopwatch: new Stopwatch(),

  getDuration: function() { return this._duration; },
  setDuration: function(duration) { this._duration = duration; },

  getStopwatch: function() { return this._stopwatch; },

  start: function() {
    this.getStopwatch().start();
    console.log('animation timer started!');
  },
  stop: function() {
    console.log('stopping animation timer', this.getStopwatch().getElapsedTime());
    this.getStopwatch().stop();
  },
  isRunning: function() {
    return this.getStopwatch().isRunning();
  },
  isDone: function() {
    return this.getStopwatch().getElapsedTime() > this.getDuration();
  },
  getElapsedTime: function() {
    return this.getStopwatch().isRunning() ? this.getStopwatch().getElapsedTime() : null;
  }

};
