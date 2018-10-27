const gulp         = require('gulp');

const coffee       = require('gulp-coffeescript');
const stylus       = require('gulp-stylus');
const pug          = require('gulp-pug');
const imgmin       = require('gulp-imagemin');

const notify       = require('gulp-notify');
const browserSync  = require('browser-sync');

const minify       = require('gulp-minify-css');
const uglify       = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require('gulp-rename');

const reload       = browserSync.reload;

const paths  = {
    css     : ['src/style/minCss/main.css'],
    styl    : ['src/style/main.styl'],
    script  : ['src/scripts/coffee/script.coffee'],
    pug     : ['src/template/index.pug'],
    img     : ['src/image/*.{png,jpg,jpeg,gif,svg}'],
} 

// gulp.task('browserSync', function() {
//     browserSync({
//       server: {
//         baseDir: "./"
//       },
//       port: 8000,
//       open: true,
//       notify: false });
// });

gulp.task('stylus', function(){
    return gulp.src(paths.styl)
    .pipe(stylus())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/style/minCss'))
    // .pipe(reload({stream:true}))
    // .pipe(notify('Done! master killer code.'));
});

gulp.task('scripts', function(){
    return gulp.src(paths.script)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('src/scripts/js'))
    // .pipe(reload({streame:true}));
});

gulp.task('pug', function(){
    return gulp.src(paths.pug)
    .pipe(pug())
    .pipe(gulp.dest(''))
    // .pipe(reload({streame:true}));
})

gulp.task('imgmin', function(){
    return gulp.src(paths.img)
    .pipe(imgmin())
    .pipe(gulp.dest('src/image/min'))
})

gulp.task('watcher', function(){
    gulp.watch(paths.styl, ['stylus']);
    gulp.watch(paths.script, ['scripts']);
    gulp.watch(paths.pug, ['pug']);
    // gulp.watch(paths.img, ['imgmin']);
});

gulp.task('default', ['watcher']);