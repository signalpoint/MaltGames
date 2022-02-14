var MkProjection = function(min, max) {
  this.min = min;
  this.max = max;
};
MkProjection.prototype = {
  overlaps: function(projection) {
    return this.max > projection.min && projection.max > this.min;
  },
};
