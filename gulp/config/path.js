import * as nodePath from 'path';
import { fileURLToPath } from 'url';

const __dirname = nodePath.dirname(fileURLToPath(import.meta.url));
let rootPathAbsolute = __dirname.substring(0, __dirname.lastIndexOf('gulp\\config'));
rootPathAbsolute = rootPathAbsolute.replaceAll('\\', '/');
// console.log(__dirname);
// console.log(rootPathAbsolute);

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';
const tmpFolder = './tmp';

export const path = {
	build: {
		img: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		files: `${buildFolder}/files/`,
	},
	src: {
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/**/*.svg`,
		svgicons: `${srcFolder}/svgicons/*.svg`,
		js: `${srcFolder}/js/app.js`,
		scss: `${srcFolder}/scss/style.scss`,
		scssComponents: `${srcFolder}/scss/components/**/*.scss`,
		njk: `${srcFolder}/**/*.njk`,
		tmpNjk: `${tmpFolder}/**/*.njk`,
		html: `${srcFolder}/**/*.html`,
		files: `${srcFolder}/files/**/*.*`,
	},
	watch: {
		img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		njk: `${srcFolder}/**/*.njk`,
		tmp: `${tmpFolder}/**/*.njk`,
		files: `${srcFolder}/files/**/*.*`,
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	tmpFolder: tmpFolder,
	rootPathAbsolute: rootPathAbsolute.toLowerCase(),
	localServerRootPath: 'C:/ospanel/domains/'.toLowerCase(),
	ftp: ``,
};
