const gulp = require("gulp");

const nodemon = require("gulp-nodemon");

const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');

const tsProject = require("./tsconfig.json");

gulp.task("compile:ts", () => {
    gulp.src(["./src/**/*.ts"])
        .pipe(ts(tsProject))
        .pipe(gulp.dest("./build"));
});

gulp.task("compile", ["compile:ts"]);

gulp.task("copy:views", () => {
    gulp.src("./src/**/*.pug")
        .pipe(gulp.dest("./build"));
});

gulp.task("copy:static", () => {
    gulp.src(["./src/**/*.js", "./src/**/*.css", "./src/**/*.html"])
        .pipe(gulp.dest("./build"));
});

gulp.task("copy", ["copy:views", "copy:static"]);

gulp.task("build", ["copy", "compile"]);

gulp.task("serve", ["build"], () => {
    nodemon({
        script: "./build/server.js",
        ignore: ['build'],
        ext: "ts css pug",
        env: { "NODE_ENV": "development" },
        tasks: ["build"]
    });
});