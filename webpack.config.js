var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  // process .js and .jsx files in babel and use with react hot loader
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};