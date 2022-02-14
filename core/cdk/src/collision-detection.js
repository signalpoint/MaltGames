mk.circleCollidesWithCircle = function(c1, c2) {
  var distance = Math.sqrt(
    Math.pow(c2.x - c1.x, 2) +
    Math.pow(c2.y - c1.y, 2)
  ),
  overlap = Math.abs(c1.radius + c2.radius) - distance;
  return new MinimumTranslationVector(undefined, overlap < 0 ? 0 : overlap);
};

mk.polygonCollidesWithPolygon = function(p1, p2) {
  var mtv1 = p1.mtv(p1.getAxes(), p2),
    mtv2 = p1.mtv(p2.getAxes(), p2);
  return mtv1.overlap === 0 && mtv2.overlap === 0 ?
    { axis: undefined, overlap: 0 } :
    (mtv1.overlap < mtv2.overlap ? mtv1 : mtv2);
};

mk.polygonCollidesWithCircle = function(polygon, circle) {

  // MTV
  var axes = polygon.getAxes(),
    closestPoint = mk.getPolygonPointClosestToCircle(polygon, circle),
    v1 = new MkVector(circle.x, circle.y),
    v2 = new MkVector(closestPoint.x, closestPoint.y);
  axes.push(v1.subtract(v2).normalize());
//  axes.push(getCircleAxes(circle, polygon, closestPoint)); // TODO wtf, what's getCircleAxes()
  return polygon.mtv(axes, circle);

  // SAT
//  var v1,
//    v2,
//    axes = polygon.getAxes(),
//    closestPoint = mk.getPolygonPointClosestToCircle(polygon, circle);
//  v1 = new MkVector(circle.x, circle.y);
//  v2 = new MkVector(closestPoint.x, closestPoint.y);
//  axes.push(v1.subtract(v2).normalize());
//  return !polygon.separationOnAxes(axes, circle);

};

mk.getPolygonPointClosestToCircle = function(polygon, circle) {
  var min = 10000,
    length,
    testPoint,
    closestPoint;
  for (var i = 0; i < polygon.points.length; i++) {
    testPoint = polygon.points[i];
    length = Math.sqrt(
      Math.pow(testPoint.x, 2) + // TODO shouldn't this be a "+", not a ","
      Math.pow(testPoint.y, 2),
    );
    if (length < min) {
      min = length;
      closestPoint = testPoint;
    }
  }
  return closestPoint;
};

mk.separate = function() {

};
