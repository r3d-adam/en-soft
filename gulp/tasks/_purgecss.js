import purgecssPlugin from 'gulp-purgecss';
/* global app */

export const purgecss = () => {
	return app.gulp
		.src(`${app.path.build.css}**/*.css`)
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'purgecss',
					message: 'Error: <%= error.message %>',
				}),
			),
		)

		.pipe(
			purgecssPlugin({
				// content: ['/dist/index.html'],
				content: ['dist/index.html'],
				safelist: [/^parallax/, /^input/, /::placeholder$/],
			}),
		)

		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
};
