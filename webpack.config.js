var projectRoot = process.cwd()

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

if (process.env.ENVIRONMENT === 'production') {
  config.entry.index = './slim-select/index.ts'
  config.output = {
    library: 'slim-select',
    libraryTarget: 'umd'
  }
}

module.exports = config
