const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

var nonMiniCss = new MiniCssExtractPlugin({
  filename: 'slimselect.css',
  minimize: false
})
var miniCss = new MiniCssExtractPlugin({
  filename: 'slimselect.min.css'
})

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
          nonMiniCss.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          miniCss.loader,
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [nonMiniCss, miniCss],
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
      new OptimizeCSSAssetsPlugin({})
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
    libraryTarget: 'umd'
  }
}