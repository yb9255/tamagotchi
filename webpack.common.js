const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './init.js',
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/images', to: 'images' }],
    }),
    new CopyPlugin({
      patterns: [{ from: './src/sounds', to: 'sounds' }],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
    new Dotenv({
      path: '.env',
    }),
  ],
  output: {
    publicPath: '/',
  },
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
