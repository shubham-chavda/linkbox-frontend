/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const paths = require("./paths");
const dotenv = require('dotenv-webpack');
module.exports = {
	mode: "production",
	entry: paths.entryPath,
	output: {
		filename: `${paths.jsFolder}/[name].[hash].js`,
		path: paths.outputPath,
		clean: true,
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		// [paths.outputPath.split('/').pop()]
		new dotenv({
			path: paths.devEnvPath
		}),
		new CleanWebpackPlugin(),
		new CompressionPlugin({
			test: /\.js$|\.css$|\.html$/,
		}),
	],
	devtool: false,
};
