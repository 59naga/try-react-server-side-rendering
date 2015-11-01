import webpack from 'webpack'

export default {
  context: __dirname,
  entry: "./client.jsx",

  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },

  resolve: {
    unsafeCache: true,
    extensions: ['', '.js', '.jsx','.json'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ["json-loader"],
      },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress:{warnings:false}}),
  ],
  
  devtool: '#source-map',
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
}
