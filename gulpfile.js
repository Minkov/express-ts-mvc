const gulp = require("gulp");

const stylus = require("gulp-stylus");
const ts = require("gulp-typescript");
const babel = require('gulp-babel');

const nodemon = require("gulp-nodemon");

const tsConfig = require("./tsconfig.json");

gulp.task("compile:typescript", () => {
    gulp.src("./src/**/*.ts")
        .pipe(ts(tsConfig))
        .pipe(gulp.dest("./build"));
});

gulp.task("compile:stylus", () => {
    gulp.src("./src/**/*.styl") // -> Doncho
        .pipe(stylus()) // -> Pesho
        .pipe(gulp.dest("./build")); // -> Gosho
});

gulp.task("compile:javascript", () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task("compile", ["compile:typescript", "compile:javascript", "compile:stylus"]);

gulp.task("copy:pug", () => {
    gulp.src("./src/**/*.pug")
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", ["copy:pug"]);

gulp.task("build", ["compile", "copy"]);

gulp.task("serve", ["build"], () => {
    nodemon({
        script: './build/server.js',
        ext: 'ts js styl',
        ignore: "./build"
    });
});