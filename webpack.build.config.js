module.exports = [{
	mode: 'production',
	entry: {
		slimselect: './dist/pack.js'
	},
	resolve: {
		// Aliases - Used for pointing to reusable parts of your app
		alias: {
			// 'slimselect.scss': './src/slim-select/slimselect.scss'
			// 'src': projectRoot + '/src',
			// 'docs': projectRoot + '/src/docs',
			// 'images': projectRoot + '/src/docs/assets/images',
			// 'scss': projectRoot + '/src/docs/assets/scss',
			// 'slim-select': projectRoot + '/src/slim-select'
		}
	},
	output: {
		libraryTarget: 'umd',
		// path: path.resolve(projectRoot, 'docs'),
		filename: '[name].min.js',
		publicPath: './dist/'
	}
}, {
	mode: 'development',
	entry: {
		slimselect: './dist/pack.js'
	},
	resolve: {
		// Aliases - Used for pointing to reusable parts of your app
		alias: {
			// 'slimselect.scss': './src/slim-select/slimselect.scss'
			// 'src': projectRoot + '/src',
			// 'docs': projectRoot + '/src/docs',
			// 'images': projectRoot + '/src/docs/assets/images',
			// 'scss': projectRoot + '/src/docs/assets/scss',
			// 'slim-select': projectRoot + '/src/slim-select'
		}
	},
	output: {
		libraryTarget: 'umd',
		// path: path.resolve(projectRoot, 'docs'),
		filename: '[name].js',
		publicPath: './dist/'
	}
}]
