import svgSpritePlugin from 'gulp-svg-sprite';
/* global app */

const config = {
	symbolSprite: {
		mode: {
			symbol: {
				sprite: `../icons/icons.svg`,
				// demo page
				example: true,
				// Create a «symbol» sprite
				inline: true, // Prepare for inline embedding
			},
		},
	},
	stackSprite: {
		mode: {
			stack: {
				sprite: `../icons/icons.svg`,
				// demo page
				example: true,
			},
		},
	},
};

export const svgSprite = () => {
	return app.gulp
		.src(app.path.src.svgicons, { encoding: false })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: 'SVG SPRITE',
					message: 'Error: <%= error.message %>',
				}),
			),
		)

		.pipe(
			svgSpritePlugin({
				mode: config.symbolSprite.mode,

				shape: {
					spacing: {
						// Spacing related options
						padding: 1, // Padding around all shapes
						box: 'padding', // Padding strategy (similar to CSS `box-sizing`)
					},
				},
			}),
		)
		.pipe(app.gulp.dest(app.path.build.img));
};
