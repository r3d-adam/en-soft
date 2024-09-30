import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import image from 'gulp-image';
/* global app */

export const img = () => {
	return (
		app.gulp
			.src(app.path.src.img, { encoding: false })
			.pipe(
				app.plugins.plumber(
					app.plugins.notify.onError({
						title: 'IMG',
						message: 'Error: <%= error.message %>',
					}),
				),
			)
			.pipe(app.plugins.newer(app.path.build.img))
			// .pipe(app.plugins.if(app.isBuild, webp()))
			.pipe(app.plugins.if(app.isBuild, app.plugins.if(!app.options.disableWebp, webp())))
			.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.img)))
			// после конверта в webp опять берём исходники
			.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.img, { encoding: false })))
			.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.img)))
			.pipe(
				app.plugins.if(
					app.isBuild,
					imagemin({
						progressive: true,
						svgoPlugins: [{ removeViewBox: false }],
						interlaced: true,
						optimizationLevel: 3, // 0 to 7
					}),
				),
			)
			// хорошая оптимизация png через этот
			.pipe(
				app.plugins.if(
					app.isBuild,
					image({
						pngquant: true,
						optipng: false,
						zopflipng: true,
						jpegRecompress: false,
						mozjpeg: true,
						gifsicle: true,
						svgo: true,
						concurrent: 10,
						quiet: false, // defaults to false
					}),
				),
			)
			.pipe(app.gulp.dest(app.path.build.img))
			// теперь работаем с svg
			.pipe(app.gulp.src(app.path.src.svg, { encoding: false }))
			.pipe(app.gulp.dest(app.path.build.img))
			.pipe(app.plugins.browsersync.stream())
	);
};
