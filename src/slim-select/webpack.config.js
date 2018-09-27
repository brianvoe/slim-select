const path = require('path')

module.exports = {
  mode: 'production',
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'slimselect.js',
    library: 'SlimSelect',
    libraryTarget: 'umd'
    // libraryExport: 'default'
  }
}