import { deleteAsync as del } from 'del';
/* global app */

export const replacePaths = () => {
	return (
		app.gulp
			.src([app.path.src.njk])
			.pipe(app.plugins.replace('@@html/', 'tmp/html/'))
			// .pipe(app.plugins.replace('@@img/', 'src/img/'))
			.pipe(app.gulp.dest('tmp'))
	); // Сохраняем во временную папку
};
