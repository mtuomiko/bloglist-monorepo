const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
  return {
    target: argv.mode === 'development' ? 'web' : 'browserslist',
    entry: ['./client/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3003',
      },
      hot: true,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Bloglist app',
        template: 'client/assets/template.html',
      })
    ]
  }
}
module.exports = config