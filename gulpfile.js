var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer');

// Compile scss files into css file
gulp.task('styles', function () {
    return gulp.src('sass/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('css/main.css'))
        .pipe(notify({ message: 'Styles Task Done!'}))
        .pipe(connect.reload());
});

// adds prefixes to css file
gulp.task('autoprefixer', function () {
    return gulp.src('css/main.css')
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('css/'));
});

// Task for Html reload
gulp.task('reload', function () {
    gulp.src('*.html')
        .pipe(connect.reload());
});

// Task for creating a local server
gulp.task('connect', function () {
    connect.server({
        root: '',
        livereload: true,
        port: 4500
    });
});

// Task for watching for changes
gulp.task('watch', function () {
    gulp.watch('sass/*.scss', ['styles']);
    gulp.watch('*.html', ['reload']);
    gulp.watch('js/*.js', ['reload']);
});

// Default Task after gulp starts
gulp.task('default', ['connect', 'watch']);
