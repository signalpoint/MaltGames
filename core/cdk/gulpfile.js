var makeBinary = true;

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

var jsSrc = [

  './src/stopwatch.js',
  './src/animation-timer.js',

  './src/CanvasGame.js',
  './src/MkMod.js',
  './src/MkEntity.js',
  './src/Circle.js',
  './src/Polygon.js',
  './src/MkPoint.js',
  './src/MkPolygon.js',
  './src/Square.js',
  './src/MkImage.js',
  './src/MkSprite.js',

  './src/mods/MkCanvasControls/MkCanvasControls.js',

];

// Minify JavaScript
function minifyJs() {
  console.log('compressing maltkit-cdk.js...');
  var js = gulp.src(jsSrc)
    .pipe(gp_concat('maltkit-cdk.js'))
    .pipe(gulp.dest('./'));
//  if (makeBinary) {
//    console.log('compressing maltkit-cdk.min.js...');
//    return js.pipe(gp_rename('maltkit-cdk.min.js'))
//    .pipe(gp_uglify())
//    .pipe(gulp.dest('./'));
//  }
  return js;
}
gulp.task(minifyJs);

gulp.task('default', function(done) {

  gulp.watch(jsSrc, gulp.series('minifyJs'));

  done();

});
