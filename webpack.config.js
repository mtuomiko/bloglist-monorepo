const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = (env, argv) => {
  // Production url not yet implemented, both urls here as a placeholder
  const backend_url = argv.mode === 'production'
    ? 'http://localhost:3003/api'
    : 'http://localhost:3003/api'

  return {
    entry: ['./client/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      proxy: {
        '/api': 'http://localhost:3003',
      },
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            // options: {
            //   presets: ['@babel/preset-env', '@babel/preset-react']
            // },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
      new HtmlWebpackPlugin({
        title: 'Bloglist app',
        template: 'client/assets/template.html',
      })
    ]
  }
}
module.exports = config