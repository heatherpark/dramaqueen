module.exports = {
  entry: [
    // first two entry points used for hot loader
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  // process .js and .jsx files in babel and use with react hot loader
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
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
    contentBase: './dist',
    // enable hot module replacement in dev server
    hot: true
  },
  // load hot module replacement plugin
  plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};