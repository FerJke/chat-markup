/* use strict */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');


/* ----- Browser Sync ----- */
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 8080,
        open: true,
        notify: false
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* ----- SASS ----- */
gulp.task('sass', function(){
  return gulp.src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 2%'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
});

/* ----- Image Min ----- */
gulp.task('imagemin', function(){
  return gulp.src('src/img/**/*.*')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({plugins: [{removeViewBox: true}]})
    ]))
    .pipe(gulp.dest('./build/img'));
});

/* ----- Copy HTML ----- */
gulp.task('copy:html', function(){
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'));
});

/* ----- Copy JS ----- */
gulp.task('copy:js', function(){
  return gulp.src('./src/js/custom.js')
    .pipe(gulp.dest('./build/js'));
});

/* ----- Copy in Build ----- */
gulp.task('copy', gulp.parallel('copy:html', 'copy:js', 'imagemin'));

/* ----- Watchers ----- */
gulp.task('watch', function(){
  gulp.watch('./src/*.html', gulp.series('copy:html'));
  gulp.watch('./src/js/custom.js', gulp.series('copy:js'));
  gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
});

/* ----- Default ----- */
gulp.task('default', gulp.series(
  gulp.parallel('sass', 'copy'),
  gulp.parallel('watch', 'server')
));
