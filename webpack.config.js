const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: `${path.resolve(__dirname, 'src')}/index.js`,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MyLibrary',
    libraryTarget: 'umd',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    // new UglifyJSPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
