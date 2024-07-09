const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  target: 'node',
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  optimization: {
    minimize: false
  },
  output: {
    filename: 'd-npm.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: ['electron']
}

