var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass')
	browserSync  = require('browser-sync')
	concat		 = require('gulp-concat')
	uglify		 = require('gulp-uglifyjs')
	rename		 = require('gulp-rename')
	del			 = require('del')
	imagemin	 = require('gulp-imagemin')
	pngquant	 = require('imagemin-pngquant')
	cache		 = require('gulp-cache')
	autoprefixer = require('gulp-autoprefixer')
	bourbon		 = require('node-bourbon')
	cleanCSS	 = require('gulp-clean-css');


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({includePaths: bourbon.includePaths}))
	.pipe(rename({suffix: '.min'}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
})


gulp.task('scripts', function(){
	return gulp.src([
		'app/bower_components/jquery/dist/jquery.min.js',
		'app/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/bower_components/Swiper/dist/js/swiper.jquery.min.js'
	])
	.pipe(concat('bower_components.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
})


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
})


gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
})


gulp.task('clear', function(){
	return cache.clearAll()
})


gulp.task('clean', function(){
	return del.sync('dist')
})


gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass'])
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
})


gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function(){

	var buildCss = gulp.src([
		'app/css/main.min.css',
		'app/css/fonts.min.css',
		'app/css/font-awesome.min.css',
	])
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

})