//packages
var browserify = require('browserify');

var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

//paths
var paths = {
	css: {
		watch: 'public/css/src/**/*.scss',
		dest: 'public/css/dist/'
	},
	js: {
		watch: 'public/js/src/**/*.js',
		src: 'public/js/src/master.js',
		dest: 'public/js/dist/',
		destFile: 'master.js'
	}
};

gulp.task('css', function() {
	return gulp.src(paths.css.watch)
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.css.dest));
});

gulp.task('js', function() {
	var b = browserify({
		entries: paths.js.src,
		debug: true
	}).transform('babelify', {presets: ['es2015']});

	return b.bundle()
		.pipe(source(paths.js.destFile))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			// Add transformation tasks to the pipeline here.
			.pipe(uglify())
			.on('error', gutil.log)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.js.dest));
});

gulp.task('watch', function() {
	gulp.watch(paths.js.watch, ['js']);
	gulp.watch(paths.css.watch, ['css']);
});