const gulp = require("gulp");

// Compilers
const stylus = require("gulp-stylus");
const ts = require("gulp-typescript");
const babel = require('gulp-babel');
const tsConfig = require("./tsconfig.json");

// Runners
const shell = require("gulp-shell");
const nodemon = require("gulp-nodemon");

// Testing
const mocha = require('gulp-mocha');

// Linting
const tslint = require("gulp-tslint");

gulp.task("compile:typescript", () => {
    gulp.src("./src/**/*.ts")
        .pipe(ts(tsConfig))
        .pipe(gulp.dest("./build"));
});

gulp.task("compile:stylus", () => {
    gulp.src("./src/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("./build"));
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
        ext: 'ts js styl pug',
        ignore: "./build",
        tasks: ["build"]
    });
});

gulp.task("test", ["build"], () =>
    gulp.src("./test/**/*.js", { read: false })
    .pipe(mocha({ reporter: "nyan" }))
);

gulp.task("lint", () => {
    gulp.src("./src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});