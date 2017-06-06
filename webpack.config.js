module.exports = {
  entry: [
    './app/src/App.js'
  ],
  output: {
    path: __dirname + "/app/dist/js",
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: [ 'es2015', 'react']
      }
    }, { 
      test: /\.css$/, 
      loader: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
      ]
    }]
  },
}
