const path = require('path'),
      nodeExternals = require('webpack-node-externals'),
      DIST_DIR = path.join(__dirname, '/public')

module.exports = {
  entry: './server/SDCserver.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: DIST_DIR,
    filename: 'bundleS.js'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      use: 'babel-loader'
    }, {
      test: /\.jsx?$/,
      exclude: '/node_modules/',
      loader: 'babel-loader',
    }, {
      test: /\.s?css$/,
      exclude: '/node_modules/',
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
};