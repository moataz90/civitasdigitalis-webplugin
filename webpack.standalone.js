const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
require("babel-polyfill");

const babelLoader = {
	loader: 'babel-loader',
	options: {
		cacheDirectory: true,
		presets: [
			"react",
			[
				"es2015",
				{
					"modules": false
				}
			],
			"es2016"
		]
	}
};

module.exports = {
	cache: true,
	entry: ['babel-polyfill', './src/standalone.tsx'],
	output: {
		path: __dirname + '/dist_standalone',
		filename: '[name].[chunkhash:8].js',
		chunkFilename: '[name].[chunkhash:8].chunk.js',
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js"]
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					babelLoader,
					{
						loader: 'ts-loader?configFile=tsconfig.standalone.json'
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					babelLoader
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'static/media/[name].[hash:8].[ext]',
				},
			}
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		// Minify the code.
		new UglifyJsPlugin({
			uglifyOptions: {
				parse: {
					// we want uglify-js to parse ecma 8 code. However we want it to output
					// ecma 5 compliant code, to avoid issues with older browsers, this is
					// whey we put `ecma: 5` to the compress and output section
					// https://github.com/facebook/create-react-app/pull/4234
					ecma: 8,
				},
				compress: {
					ecma: 5,
					warnings: false,
					// Disabled because of an issue with Uglify breaking seemingly valid code:
					// https://github.com/facebook/create-react-app/issues/2376
					// Pending further investigation:
					// https://github.com/mishoo/UglifyJS2/issues/2011
					comparisons: false,
				},
				mangle: {
					safari10: true,
				},
				output: {
					ecma: 5,
					comments: false,
					// Turned on because emoji and regex is not minified properly using default
					// https://github.com/facebook/create-react-app/issues/2488
					ascii_only: true,
				},
			},
			// Use multi-process parallel running to improve the build speed
			// Default number of concurrent runs: os.cpus().length - 1
			parallel: true,
			// Enable file caching
			cache: true,
			sourceMap: true,
		})
		/*,
		new CompressionPlugin({
			asset: "[path][query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$|\.js.map$/,
			threshold: 0,
			minRatio: 0.8
		})*/
	],

	performance: {
		hints: false
	}
};
