const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
        {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
        },

        {
        test: /\.s(ac)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
    }
};