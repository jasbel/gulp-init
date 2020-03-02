const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  newer = require("gulp-newer"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  minify = require("gulp-babel-minify");

const sassOptions = {
  outputStyle: "expanded",
  errLogToConsole: true
};

gulp.task("sass", () => {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass(sassOptions))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("cssmin", () => {
  return gulp
    .src("dist/css/styles.css")
    .pipe(cleanCSS({ compatibility: "ie8", level: 2 }))
    .pipe(gulp.dest("dist/css/min"));
});

gulp.task("images", () => {
  return gulp
    .src("src/images/**/*")
    .pipe(newer("dist/images"))
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("copyhtml", () => {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

// Copying fonts
gulp.task("fonts", () => {
  return gulp
    .src("src/fonts/**/*")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("minifyjs", () =>
  gulp
    .src("src/js/*")
    .pipe(minify({ mangle: { keepClassName: true } }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    notify: false,
    injectChanges: true
  });
  gulp.watch("src/scss/**/*", gulp.series("sass"));
  gulp.watch("src/images/**/*", gulp.series("images"));
  gulp.watch("src/*.html", gulp.series("copyhtml"));
  gulp.watch("src/fonts/**/*", gulp.series("fonts"));
  gulp.watch("src/js/*", gulp.series("minifyjs"));
  gulp.watch("dist/*").on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(
      "fonts",
      "images",
      "minifyjs",
      "copyhtml",
      gulp.series("sass", "cssmin")
    ),
    "serve"
  )
);
