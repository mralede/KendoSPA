'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/app/**/*.html'),
    path.join(conf.paths.tmp, '/serve/app/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'kendoSpa',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', { restore: true });
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
    .pipe($.replace('../../bower_components/font-awesome/fonts/', '../fonts/'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
  });

gulp.task('copy-fa-fonts', function () {
	return gulp.src(conf.wiredep.directory + '/font-awesome/fonts/*.{eot,svg,ttf,woff,woff2}')
	  .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('copy-kendo-images', function () {
	return gulp.src([
			conf.wiredep.directory + '/kendo-ui/styles/{Black,BlueOpal,Default,MetroBlack,Moonlight, Silver}/*.*',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.common.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.black.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.blueopal.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.default.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.metroblack.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.moonlight.min.css',
			conf.wiredep.directory + '/kendo-ui/styles/kendo.silver.min.css'
		])
		.pipe(gulp.dest(path.join(conf.paths.dist, '/styles/')));
});

gulp.task('kendo-messages', function () {
	return gulp.src(conf.wiredep.directory + '/kendo-ui/js/messages/kendo.messages.{de-DE,fr-FR,it-IT,en-US}.min.js')
	  .pipe(gulp.dest(path.join(conf.paths.dist, '/kendo-messages')));
});

gulp.task('kendo-resources', function () {
	return gulp.src(conf.paths.src + '/app/resources/**/*.*')
	  .pipe(gulp.dest(path.join(conf.paths.dist, '/resources')));
});

gulp.task('copy-kendo-fonts', function () {
	return gulp.src(conf.wiredep.directory + '/kendo-ui/styles/fonts/**/*.{eot,svg,ttf,woff,woff2}')
	  .pipe(gulp.dest(path.join(conf.paths.dist, '/styles/fonts/')));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', ['copy-fa-fonts', 'copy-kendo-images', 'copy-kendo-fonts', 'kendo-messages', 'kendo-resources'], function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join('!' + conf.paths.src, '/**/*.{html,css,js,less}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['html', 'fonts', 'other']);
