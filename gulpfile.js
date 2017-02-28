const gulp = require("gulp");

const ts = require("gulp-typescript");

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