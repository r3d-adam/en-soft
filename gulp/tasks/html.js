import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import ignore from 'gulp-ignore';
/* global app */

export const html = () => {
	return (
		app.gulp
			.src([app.path.src.html, `!${app.path.srcFolder}/html/**/*`]) // исключаем компоненты (возможно потребуется убрать исключение)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'HTML',
						message: 'Error: <%= error.message %>',
					}),
				),
			)
			.pipe(
				fileInclude({
					basepath: '@root', // путь будет из корня проекта
					context: {
						html: 'src/html', // используем @@html для путей к html файлам (basepath: '@root' обязателен)
					},
				}),
			)
			.pipe(app.plugins.replace(/@img\//g, 'img/'))
			// .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			.pipe(
				app.plugins.if(
					app.isBuild,
					app.plugins.if(!app.options.disableWebp, webpHtmlNosvg()),
				),
			)
			.pipe(
				app.plugins.if(
					app.isBuild,

					versionNumber({
						value: '%DT%',
						append: {
							key: '_v',
							cover: 0,
							to: ['css', 'js'],
						},
						output: {
							file: 'gulp/version.json',
						},
					}),
				),
			)
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browsersync.stream())
	);
};
