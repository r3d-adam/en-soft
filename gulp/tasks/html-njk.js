import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import ignore from 'gulp-ignore';
import fs from 'fs';

import nunjucksRender from 'gulp-nunjucks-render';

/* global app */

var manageEnvironment = (environment) => {
	environment.addFilter('phone', (str) => {
		return str && str.replace(/[\s()-]/g, '', str);
	});

	// environment.addGlobal('globalTitle', 'My global title');
};

export const html = (dataJson) => () => {
	// console.log('dataJson: ', dataJson);

	return (
		app.gulp
			.src([app.path.src.tmpNjk, `!${app.path.tmpFolder}/html/**/*`]) // исключаем компоненты (возможно потребуется убрать исключение)
			// .src([app.path.src.html, app.path.src.njk]) // исключаем компоненты (возможно потребуется убрать исключение)
			// .src([app.path.src.html, app.path.src.njk, `!${app.path.srcFolder}/html/**/*`]) // исключаем компоненты (возможно потребуется убрать исключение)
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'HTML',
						message: 'Error: <%= error.message %>',
					}),
				),
			)

			// .pipe(app.plugins.replace(/@@html\//g, 'src/html/'))
			// .pipe(app.plugins.replace(/(\{%[^\n]*)@@html\//g, '$1src/html/'))
			// .pipe(app.plugins.replace(/([^\n]*)@@html\//g, '$1src/html/'))
			// .pipe(app.plugins.replace('@@html', 'src/html'))
			// .pipe(
			// 	fileInclude({
			// 		basepath: '@root', // путь будет из корня проекта
			// 		context: {
			// 			html: 'src/html', // используем @@html для путей к html файлам (basepath: '@root' обязателен)
			// 		},
			// 	}),
			// )
			.pipe(
				nunjucksRender({
					data: dataJson,
					manageEnv: manageEnvironment,
					// path: [app.path.rootPathAbsolute + 'src/html'],
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
