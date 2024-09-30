import webpack from 'webpack-stream';
/* global app */

export const js = () => {
	const webpackConfig = {
		mode: app.isBuild ? 'production' : 'development',

		output: {
			filename: 'app.min.js',
		},
		watch: false,
		// optimization: {
		// 	usedExports: true,
		// },
		devtool: 'source-map',

		module: {
			rules: [
				{
					sideEffects: true,
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,

					// query: {
					// 	cacheDirectory: true,
					// presets: ['babel-preset-es2015', 'babel-preset-stage-0', 'babel-preset-react'],
					options: {
						// presets: [['@babel/preset-env', { targets: 'defaults' }]],
						presets: [
							[
								'@babel/preset-env',
								{
									targets: 'ie >= 11',
									modules: false,
									useBuiltIns: 'entry',
									corejs: 3,
								},
							],
						],
					},
					// },
				},
			],
		},
	};

	return app.gulp
		.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'JS',
					message: 'Error: <%= error.message %>',
				}),
			),
		)
		.pipe(webpack(webpackConfig))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
};
