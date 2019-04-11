const gulp = require('gulp');
var sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

const scripts = require('./scripts');
 
gulp.task('sass', function () {
    return gulp.src('./app/scss/styles.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({
          stream: true
      }));
  });
gulp.task('js', function(){ 
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function(){
    gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('build', function(){
    gulp.start(['js','html','sass']);
});


gulp.task('browser-sync', function(){
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    })
});


gulp.task('start', function(){
    devMode = true;
    gulp.start(['build','browser-sync']);
    gulp.watch(['./app/**/*.js'],['js']);
    gulp.watch(['./app/**/*.html'],['html']);
    gulp.watch(['./app/scss/**/*.scss'],['sass']);
});