/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const paths = require('./paths');
const dotenv = require('dotenv-webpack');
module.exports = {
	mode: 'development',
	entry: paths.entryPath,
	output: {
		filename: '[name].js',
		path: paths.outputPath,
		chunkFilename: '[name].js'
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		port: 8080,
		open: true,
		hot: true
		// https: true,
	},
	plugins: [
		new dotenv({
			path: paths.devEnvPath
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
