var projectRoot = process.cwd()

// Overriding default base webpack config
var config = {
  entry: {
    index: './docs.js'
  },
  resolve: {
    // Aliases - Used for pointing to reusable parts of your app
    alias: {
      'src': projectRoot + '/src',
      'images': projectRoot + '/src/assets/images',
      'scss': projectRoot + '/src/assets/scss'
    }
  }
}

if (process.env.ENVIRONMENT === 'production') {
  config.entry.index = './slim-select.js'
  config.output = {
    library: 'libraryNameHere', // replace this with the name of your library
    libraryTarget: 'umd'
  }
}

module.exports = config
