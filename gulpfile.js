const gulp = require('gulp');
const webpack = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const csso = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const groupMediaQueries = require('gulp-group-css-media-queries');
const rename = require('gulp-rename');
const ghPages = require('gulp-gh-pages');
const browserSync = require('browser-sync').create();

const paths = {
    root: './build',

    templates: {
        pages: './src/layouts/pages/*.pug',
        src: './src/layouts/**/*.pug',
        build: './build'
    },

    styles: {
        main: './src/styles/index.scss',
        src: './src/**/*.scss',
        build: './build/css'
    },

    scripts: {
        main: './src/scripts/index.js',
        src: './src/**/*.js',
        build: './build/scripts'
    }
}

function deploy() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
}

function server() {
    browserSync.init({
        server: paths.root,
        notify: false,
        open: false
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function clean() {
    return del(paths.root);
}

function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sassGlob())
        .pipe(plumber())
        .pipe(sass({
            includePaths: './node_modules'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 12 versions']
        }))
        .pipe(csso())
        // .pipe(sourcemaps.init())
        // .pipe(sourcemaps.write())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(paths.styles.build))
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(webpack(webpackConfig))
        .on('error', function handleError() {
            this.emit('end');
        })
        .pipe(gulp.dest(paths.scripts.build));
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.clean = clean;
exports.deploy = deploy;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, scripts),
    gulp.parallel(watch, server)
));