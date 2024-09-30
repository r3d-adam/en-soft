import gulp from 'gulp';
// пути
import { path } from './gulp/config/path.js';
// плагины
import { plugins } from './gulp/config/plugins.js';
//опции
import { options } from './gulp/config/options.js';
import fs from 'fs';

/* global app, global, process */

// глобальные переменные
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	shouldSkipFonts: process.argv.includes('--skip-fonts'),
	path: path,
	gulp: gulp,
	options: options,
	plugins: plugins,
};

// Задачи
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html-njk.js';
// import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { copyWoff, otfToTft, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { cleanTmp } from './gulp/tasks/clean-tmp.js';
import { replacePaths } from './gulp/tasks/replace-paths.js';
// import { purgecss } from './gulp/tasks/purgecss.js';
// import { cssCopyAssets } from './gulp/tasks/cssCopyAssets.js';

/*
TODO: найти другой конвертер шрифтов ttf -> woff/woff2, текущий часто ломает шрифт
*/

// fonts, скипаем при параметре --skip-fonts
const fontTasks = [];
// eslint-disable-next-line no-unused-expressions
!app.shouldSkipFonts && fontTasks.push(gulp.series(otfToTft, ttfToWoff, copyWoff, fontsStyle));
gulp.task('fonts', ...fontTasks);

const dbPath = `${app.path.srcFolder}/data/db.json`;

let data = {};
if (fs.existsSync(dbPath)) {
	console.log('db exists');
	data = JSON.parse(fs.readFileSync(dbPath));
} else {
	console.log('db not exists');
}

const htmlNjk = html(data);

gulp.task('html', htmlNjk);
gulp.task('js', js);
gulp.task('scss', scss);
gulp.task('ftp', ftp);
// gulp.task('purgecss', purgecss);
// gulp.task('cssCopyAssets', cssCopyAssets);

// svg sprite
gulp.task('svg-sprite', svgSprite);

// для запуска через "npm run scriptName" // в package.json: "scripts": {"svgSprite": "gulp svgSprite"}
export { svgSprite };

export const prepNjk = gulp.series(cleanTmp, replacePaths, htmlNjk);

// наблюдатель
function watcher() {
	gulp.watch(path.watch.files, copy);
	// gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.njk, prepNjk);
	// gulp.watch(path.watch.tmp, html);

	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.img, img);

	/*
	 *	Если хотим сделать загрузку на ftp при каждом изменении, то изменяем все наблюдатели на такой вид:
	 * 	gulp.watch(path.watch.html, gulp.series(html, ftp));
	 * */
}

// основные задачи
// const mainTasks = gulp.series(...fontTasks, gulp.parallel(copy, html, scss, js, img));
const mainTasks = gulp.series(
	...fontTasks,
	gulp.parallel(copy, gulp.series(prepNjk, htmlNjk), scss, js, img),
);

export const dev = gulp.series(
	app.shouldSkipFonts ? mainTasks : (reset, mainTasks),
	gulp.parallel(watcher, server),
);
// export const build = gulp.series(reset, mainTasks, svgSprite);
export const build = gulp.series(reset, svgSprite, mainTasks);
export const deployZip = gulp.series(reset, mainTasks, zip);
export const deployFTP = gulp.series(reset, mainTasks, ftp);

gulp.task('default', dev);
gulp.task('img', img);
