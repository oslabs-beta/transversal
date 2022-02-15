const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		index: './client/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react', '@babel/preset-env'],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			title: 'Development',
			template: 'index.html',
		}),
	],
	devServer: {
		historyApiFallback: true,
		proxy: {
			'/graphql': 'http://localhost:3000/',
		},
	},
};
