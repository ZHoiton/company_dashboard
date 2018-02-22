/*
		./webpack.config.js
*/
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve('build'),
		filename: 'index.js'
	},
	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{ test: /\.js$/, exclude: ['/node_modules/','/utils'], use: ['babel-loader', 'eslint-loader'] },
			{test: /\.(otf|eot|mp4|svg|ttf|woff|woff2)/, loader: 'file-loader'},
			{test: /\.(jpe?g|png|gif|ico)$/, loader: 'url-loader?name=[path][name].[ext]'}
		]
	},
	plugins: [
		new CircularDependencyPlugin({
			// exclude detection of files based on a RegExp
			exclude: /a\.js|node_modules/,
			// add errors to webpack instead of warnings
			failOnError: true
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	]
};
