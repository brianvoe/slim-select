var projectRoot = process.cwd()
var path = require('path')

// Overriding default base webpack config
var config = {
  entry: {
    index: './docs/index.js'
  },
  resolve: {
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      'src': projectRoot + '/src',
      'docs': projectRoot + '/src/docs',
      'images': projectRoot + '/src/docs/assets/images',
      'scss': projectRoot + '/src/docs/assets/scss',
      'slim-select': projectRoot + '/src/slim-select'
    }
  }
}

if (process.env.DOCS) {
  config.output = {
    path: path.resolve(projectRoot, 'docs'),
    filename: '[name].js',
    publicPath: '/'
  }
} else if (process.env.ENVIRONMENT === 'production') {
  config.entry.index = './slim-select/index.ts' // Only used because otherwise vue-build yells at me
  config.entry.slimselect = './slim-select/index.ts'
  config.output = {
    library: 'SlimSelect',
    libraryTarget: 'umd'
  }
}

module.exports = config
