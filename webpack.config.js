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
                test: /\.tsx?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: { /* Loader options go here */ }
                    }
                ]
            },
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
	serve: {
		port: 8080,
		content: [path.join(__dirname, 'dist')],
		add: (app, middleware, options) => {
			const historyOptions = {};
			app.use(convert(history(historyOptions)));
		}
	}
}