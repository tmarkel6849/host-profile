const path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/App.jsx`,
  devtool: 'source-map',
  mode: 'development',
  cache: true,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']}
      ,{
      test: /\.jsx?$/,
      loader: 'babel-loader',
    }, ]
  },
};
