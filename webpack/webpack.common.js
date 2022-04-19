/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const rules = require("./rules");

module.exports = {
	module: {
		rules,
	},
	output: {
		path: paths.outputPath,
		publicPath: "/",
	},
	resolve: {
		modules: ["node_modules", "src"],
		extensions: ["*", ".tsx", ".ts", ".js", ".jsx", ".scss", ".less", ".css"],
	},
	plugins: [
		new SimpleProgressWebpackPlugin({
			// Default options
			format: "compact",
		}),
		new HtmlWebpackPlugin({
			template: paths.templatePath,
			minify: {
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				preserveLineBreaks: true,
				minifyURLs: true,
				removeComments: true,
				removeAttributeQuotes: true,
			},
		}),
		new ForkTsCheckerWebpackPlugin({
			async: false,
		}),

		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
