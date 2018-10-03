const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = {
  mode: 'production',
  entry: {
    'slimselect': './index.ts',
    'slimselect.min': './index.ts',
    'slimselectcss': './slimselect.scss',
    'slimselectcss.min': './slimselect.scss'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    splitChunks: {
      minSize: 30000000, // Make slimselect minSize so large that it wont chunk
      maxSize: 0
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        include: /\.min\.js$/
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.min\.css$/g, // Lets only run optimize on files with min in it
      })
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    library: 'SlimSelect',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
}