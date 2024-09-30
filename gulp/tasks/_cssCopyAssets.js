import copyAssets from 'gulp-css-copy-assets';
/* global app */
console.log(copyAssets);

export const cssCopyAssets = () => {
	return app.gulp
		.src('./dist/css/style.css')
		.pipe(copyAssets.default())
		.pipe(app.gulp.dest('dist'));
};
