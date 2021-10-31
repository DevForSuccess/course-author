const path = require('path');

const isProd = false;
const config = {
  devtool: isProd ? false : 'eval-cheap-source-map',
  mode: 'development',
  entry: [
    './client/app.jsx'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'author.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  target: "node",
  watch: true
};

module.exports = config;
