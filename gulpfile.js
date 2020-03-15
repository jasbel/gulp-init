/* plugins
    gulp.- principal para el funcionamiento
    imagemin.- minificador de imagenes
    newer.- plugin para procesar solo archivos nuevos o modificados
    sass.- procesador de sass a css
    cleancss.- minificar css (Averigurar)
    browserSync.- Sincroniza y recarga el navegador (F5) por cambios realizados
    minify.- plugin babel minifica javascript moderno
*/

const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  newer = require("gulp-newer"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  minifyJS = require("gulp-babel-minify"),
  pug = require("gulp-pug");

const sassOptions = {
  outputStyle: "expanded",
  errLogToConsole: true
};

/* Estructure
    src.- Carpeta de desarrollo 
    dist.- Carpeta de distribucion y compilado

    gulp.task.- tareas realizadas que son llamadas
    gulp.watch.- mira cambios en una direccion especifica para luego llamar a tareas especificas
    gulp.src direccion principal necesaria
    gulp.pipe. tuberia o proceso de transformacion que usa plugins
    gulp.dest.- direccion de los archivos modificados
    gulp.parallel.- proceso de tareas aleatorio o en paralelo
    gulp.serie.- proceso de tareas una detras de otra, una a una
*/

//pug preprocesador HTML
gulp.task("pug", () => {
  return gulp
    .src("src/index.pug")
    .pipe(pug({}))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
});

// Tarea para procesas archive sass  Styles.scss a carpeta dist
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
    .pipe(minifyJS({ mangle: { keepClassName: true } }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }))
);

//files para github master/docs
gulp.task("docs", () => gulp.src("dist/**/*").pipe(gulp.dest("docs")));

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    notify: false,
    injectChanges: true
  });
  // gulp.watch("src/scss/**/*", gulp.series("sass","cssmin"));
  gulp.watch("src/scss/**/*", gulp.series("sass"));
  gulp.watch("src/images/**/*", gulp.series("images"));
  gulp.watch("src/*.html", gulp.series("copyhtml"));
  gulp.watch("src/fonts/**/*", gulp.series("fonts"));
  gulp.watch("src/js/*", gulp.series("minifyjs"));
  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("dist/*").on("change", browserSync.reload);
});

gulp.task(
  "default",
  gulp.series(
    gulp.parallel("fonts", "images", "minifyjs", "copyhtml", "sass"),
    "serve"
  )
);
