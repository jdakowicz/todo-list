var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    spritesmith = require('gulp.spritesmith');

// Compile scss files into css file
gulp.task('styles', function () {
    return gulp.src('sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('css/'))
        .pipe(notify({ message: 'Styles Task Done!'}))
        .pipe(connect.reload());
});

// Generates sprite file from .png files
gulp.task('sprites', function () {
    return gulp.src('img/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'img/sprite.png',
            cssName: 'sass/sprite.scss'
        }))
        .pipe(gulp.dest('.'))
        .pipe(notify({ message: 'Creating Sprites Finished!'}));
});

// Task for Html reload
gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

// Task for creating a local server
gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true
    });
});

// Task for watching for changes
gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.html', ['html']);
    gulp.watch('js/*.js', ['html']);
});

// Default Task after gulp starts
gulp.task('default', ['connect', 'watch']);
