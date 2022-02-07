AnimationTimer = function(duration, timeWarp) {
  if (duration !== undefined) this.duration = duration;
  if (timeWarp !== undefined) this.timeWarp = timeWarp;
  this.stopwatch = new Stopwatch();
};
AnimationTimer.prototype = {

  getStopwatch: function() { return this.stopwatch; },

  start: function() {
    this.getStopwatch().start();
    console.log('animation timer started!');
  },
  stop: function() {
    console.log('stopping animation timer', this.stopwatch.getElapsedTime());
    this.getStopwatch().stop();
  },
  reset: function() {
    this.stopwatch.reset();
//    this.stopwatch.setStartTime(0);
  },
  isRunning: function() {
    return this.stopwatch.isRunning();
  },
  isDone: function() {
    return this.stopwatch.getElapsedTime() > this.duration;
  },
  getElapsedTime: function() {

    //    return this.getStopwatch().isRunning() ? this.getStopwatch().getElapsedTime() : null;

    var elapsedTime = this.stopwatch.getElapsedTime(),
      percentComplete = elapsedTime / this.duration;

    console.log('elapsedTime', elapsedTime);
    console.log('percentComplete', elapsedTime + ' / ' + this.duration);

    if (!this.isRunning()) return undefined;
    if (this.timeWarp == undefined) return elapsedTime;

    console.log('warp', elapsedTime + ' * (' + this.timeWarp(percentComplete) + ' / ' + percentComplete + ')');

    return elapsedTime * (this.timeWarp(percentComplete) / percentComplete);

  }

};

// TIME WARP FUNCTIONS

AnimationTimer.linear = function() {
  return function(percentComplete) {
    return percentComplete;
  };
};
AnimationTimer.easeIn = function(strength) {
  return function(percentComplete) {
    return Math.pow(percentComplete, strength * 2);
  };
};
AnimationTimer.easeOut = function(strength) {
  return function(percentComplete) {
    return 1 - Math.pow(1 - percentComplete, strength * 2);
  };
};
AnimationTimer.easeInOut = function() {
  return function(percentComplete) {
    return percentComplete - Math.sin(percentComplete * 2 * Math.PI) / (2 * Math.PI);
  };
};
AnimationTimer.elastic = function(passes) {
  passes = passes || 3;
  return function(percentComplete) {
    return (
      (1 - Math.cos(percentComplete * Math.PI * passes)) *
      (1 - percentComplete)
    ) + percentComplete;
  };
};
AnimationTimer.bounce = function(bounces) {
  var fn = AnimationTimer.elastic(bounces);
  return function(percentComplete) {
    percentComplete = fn(percentComplete);
    return percentComplete <= 1 ? percentComplete : 2 - percentComplete;
  };
};
