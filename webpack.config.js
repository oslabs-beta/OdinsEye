const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const e = require('express');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.tsx',
  devServer: {
    host: 'localhost',
    port: 7070,
    historyApiFallback: true,
    proxy: {
      '/': {
        target: 'http://localhost:7070/',
        router: () => 'http://localhost:3000',
      },
      '/api': {
        target: 'http://localhost:7070/',
        router: () => 'http://localhost:3000',
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './client/index.html'),
      filename: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      {
        test: /\.scss?/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};
