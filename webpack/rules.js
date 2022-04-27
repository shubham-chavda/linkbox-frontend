/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = [
	{
		test: /\.(ts|js)x?$/i,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-react',
					'@babel/preset-typescript'
				]
			}
		}
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /node_modules/,
		use: 'file-loader'
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /node_modules/,
		use: 'url-loader?prefix=font/&limit=5000'
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /node_modules/,
		use: 'url-loader?limit=10000&mimetype=application/octet-stream'
	},
	{
		test: /\.(jpe?g|png|gif)$/i,
		use: ['url-loader?limit=10000', 'img-loader']
	},
	{
        test: /\.svg$/,
        use: ['@svgr/webpack', 'img-loader'],
      },
	{
		test: /\.css$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}
		]
	},
	{
		test: /\.less$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					importLoaders: 1,
					modules: true
				}
			},
			{
				loader: 'less-loader',
				options: {
					lessOptions: {
						javascriptEnabled: true
					}
				}
			}
		],
		include: /\.module\.css$/
	},
	{
		test: /\.less$/,
		use: [
			{
				loader: 'style-loader'
			},
			{
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			},
			{
				loader: 'less-loader',
				options: {
					lessOptions: {
						javascriptEnabled: true
					}
				}
			}
		],
		exclude: /\.module\.css$/
	}
];
