const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "index.js",
		publicPath: '/'
	},
	mode: 'development',
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	plugins: [
		new HtmlWebpackPlugin()
	],
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ test: /\.js$/, loader: "source-map-loader", enforce: 'pre' },
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		],
	},
	devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080,
        hot: true,
        watchOptions: { ignored: /node_modules/ }
    }
}