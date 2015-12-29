'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function() {
  browserSync.reload();
});

gulp.task('copy-resources', function () {
	return gulp.src(conf.paths.src + '//app/resources/**/*.*')
	  .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/resources')));
});

gulp.task('copy-kendo-messages', function () {
	return gulp.src(conf.wiredep.directory + '/kendo-ui/js/messages/kendo.messages.{de-DE,fr-FR,it-IT,en-US}.min.js')
	  .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/kendo-messages')));
});

gulp.task('copy-angular-i18n', function () {
	return gulp.src(conf.wiredep.directory + '/angular-i18n//angular-locale_{de-de,en-us,fr-fr,it-it}.js')
	  .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/angular-i18n')));
});

gulp.task('inject', ['scripts', 'styles', 'copy-resources', 'copy-kendo-messages', 'copy-angular-i18n'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/**/*.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
  .pipe($.angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/*.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});
