'use strict'

const webpack = require('webpack')
const path = require('path')
const buildPath = path.join(__dirname, './dist')
const args = require('yargs').argv

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const isProd = args.prod
const isDev = args.dev
const env = args.envFile
if (env) {
  // Load env file
  require('dotenv').config({ path: env })
}

const main = ['./src/site.js']
const common = ['./src/common.js']

if (isDev) {
  main.push('webpack-dev-server/client?http://0.0.0.0:8080')
}

const plugins = [
  new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
    inject: 'body'
  }),
  new HtmlWebpackPlugin({
    template: './src/error.html',
    chunks: ['common'],
    inject: 'body',
    filename: 'error.html'
  })
]

if (isProd) {
  plugins.push(
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = {
  entry: {
    main: main,
    common: common
  },
  node: {
    fs: 'empty',
    tls: 'empty'
  },

  stats: 'errors-only',
  output: {
    path: buildPath,
    publicPath: '/',
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader' }] },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv({ browsers: 'last 2 versions' }),
              cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
            ]
          }
        }, 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(png|jpg|ico)$/,
        exclude: /node_modules/,
        use: [{ loader: 'file-loader?name=images/[name].[ext]&context=./src/images' }]
      },
      {
        test: require.resolve('jquery'),
        use: [{ loader: 'expose-loader', options: 'jQuery' }, { loader: 'expose-loader', options: '$' }]
      }
    ]
  },

  plugins: plugins,

  devtool: 'eval-cheap-source-map',

  devServer: {
    contentBase: buildPath,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
  }
}
