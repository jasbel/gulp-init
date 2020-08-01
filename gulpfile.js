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

/* plugins
    gulp.- principal para el funcionamiento
    sass.- procesador de sass a css
    cssnano.- minificar css (Averigurar)
    browserSync.- Sincroniza y recarga el navegador (F5) por cambios realizados
    minify.- plugin babel minifica javascript moderno
    ugly.- minificador javacript ES5
    pug.- Procesador a HTML5
    imagemin.- minificador de imagenes
    newer.- plugin para procesar solo archivos nuevos o modificados
*/

// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');

// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const minifyJS = require("gulp-babel-minify");

const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const pug = require("gulp-pug");
const newer = require("gulp-newer");

//sass options
const sassOptions = {
    outputStyle: "compressed",
    errLogToConsole: true
};

// File paths
const files = {
    scssPath: 'src/scss/**/*.scss',
    stylePath: 'src/scss/styles.scss',
    jsPath: 'src/js/*.js',
    htmlPath: 'src/**/*.pug',
    imagesPath: 'src/images/**/*',
    fontPath: 'src/fonts/**/*',
    indexHtmlPath: 'src/*.html'
}

/************************* */
/*      Primary           */
/************************ */

// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return src(files.stylePath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass(sassOptions)) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist/css')) // put final CSS in dist folder
        .pipe(browserSync.reload({ stream: true })); //recharge page
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
    return src([
            files.jsPath
            //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }));
}

//Minify images
function imagesTask() {
    return src([files.imagesPath])
        .pipe(newer("dist/images"))
        .pipe(imagemin())
        .pipe(dest("dist/images"))
        .pipe(browserSync.reload({ stream: true }));
}

// Copy fonts
function fontTask() {
    return src([files.fontPath])
        .pipe(dest("dist/fonts"))
        .pipe(browserSync.reload({ stream: true }));
}

//Pug Preprocesador HTML (only index)
function pugHTMLTask() {
    return src([files.htmlPath])
        .pipe(pug())
        .pipe(dest("dist/"))
        .pipe(browserSync.reload({ stream: true }));
}

//js Babel codigo moderno
function jsBabelTask() {
    return src([files.jsPath])
        .pipe(concat('main.min.js'))
        .pipe(minifyJS({ mangle: { keepClassName: true } }))
        .pipe(dest("dist/js"))
        .pipe(browserSync.reload({ stream: true }))
}
//index HTML
function indexHtmlTask() {
    return src([files.indexHtmlPath])
        .pipe(dest("dist/"))
        .pipe(browserSync.reload({ stream: true }))
}

//FILES FOR GITHUB-PAGES MASTER/DOCS
function docsGitHUb() {
    return src("dist/**/*").pipe(dest("docs"))
};

/*************************** */
/*      Whatch Server        */
/*************************** */

// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask() {
    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        },
        notify: false,
        injectChanges: true
    });
    // watch([files.scssPath, files.jsPath], { interval: 1000, usePolling: true }, //Makes docker work
    //     series(
    //         parallel(scssTask, jsTask)
    //     )
    // );
    watch([files.scssPath], series(scssTask));
    // watch([files.jsPath], series(jsTask));
    watch([files.imagesPath], series(imagesTask));
    watch([files.fontPath], series(fontTask));
    watch([files.indexHtmlPath], series(indexHtmlTask));
    // watch([files.htmlPath], series(pugHTMLTask));
    watch([files.jsPath], series(jsBabelTask));
    watch("dist/*").on("change", browserSync.reload);;
    watch("src/*.html").on("change", browserSync.reload);;
}

/*********************** */
/*  DEFAULT SERVER GULP  */
/*********************** */

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(
    parallel(
        indexHtmlTask,
        fontTask,
        scssTask,
        imagesTask,
        // jsTask,
        jsBabelTask,
        // pugHTMLTask,
        //docsGitHUb,
    ),
    watchTask
);