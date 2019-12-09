var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: { path: path.join(__dirname, 'public/'), filename: 'popup.js' },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
			presets: [
				"@babel/preset-env",
				"@babel/preset-react"
			]
        }
      }
    ]
  },
};
