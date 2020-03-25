const gulp = require('gulp');
const sass = require('gulp-sass');
//compile scss into css
function style() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
}


function watch() {
  gulp.watch('sass/**/*.scss', style)
}
exports.style = style;
exports.watch = watch;