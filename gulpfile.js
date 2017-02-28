const gulp = require("gulp");

const ts = require("gulp-typescript");

const tsProject = require("./tsconfig.json");

gulp.task("build", () => {
    gulp.src(["./app/**/*ts", "./server.ts"])
        .pipe(ts(tsProject))
        .pipe(gulp.dest("/build"));
});