const gulp = require("gulp");
const less = require("gulp-less");
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

gulp.task("less", () => {
  return gulp
    .src("../**/*.less")
    .pipe(
      less({
        plugins: [autoprefix]
      })
    )
    .pipe(
      gulp.dest(function(file) {
        return file.base;
      })
    );
});

gulp.task("watch", () => {
  gulp.watch("../**/*.less", ["less"]);
});

gulp.task("default", ["watch"]);