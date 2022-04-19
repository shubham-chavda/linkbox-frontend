// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
	root: path.resolve(__dirname, '../'),
	outputPath: path.resolve(__dirname, '../', 'dist'),
	entryPath: path.resolve(__dirname, '../', 'src/index.tsx'),
	templatePath: path.resolve(__dirname, '../', 'src/index.html'),
	imagesFolder: path.resolve(__dirname, '../', 'src/assets/images'),
	cssFolder: 'css',
	jsFolder: 'js',
	devEnvPath: path.resolve(__dirname, '../dev.env')
};
