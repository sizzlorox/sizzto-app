'use strict'

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const options = {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    hot: true
  },

  mode: 'development',
  target: 'web',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/app/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: path.join(__dirname, '/public/res/'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CompressionPlugin({
      minRatio: 0.8,
      algorithm: 'gzip',
      asset: '[path].gz[query]'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin({ multistep: true }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      classnames: 'classnames'
    }),
  ],
  performance: {
    hints: 'warning'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]',
              camelCase: 'dashesOnly'
            }
          },
          {
            loader: "sass-loader"
          }]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../'
          }
        }]
      }
    ],
  },
};
module.exports = options;