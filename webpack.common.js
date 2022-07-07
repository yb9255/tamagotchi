const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './init.js',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'images', to: 'images' }],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './profile.html',
      filename: './profile.html',
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
