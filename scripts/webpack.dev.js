const { merge } = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const common = require('./webpack.common')
const { IP, HOST, DEFAULT_PORT, appName } = require('./constants')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  devServer: {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*'
    },
    host: HOST,
    port: DEFAULT_PORT,
    historyApiFallback: true,
    compress: true,
    hot: true,
    client: {
      logging: 'none',
      overlay: {
        errors: true
      }
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `You can now view ${appName} in the browser:

                  -Local:   http://localhost:${DEFAULT_PORT}
                  -Network: http://${IP}:${DEFAULT_PORT}

            `
        ],
        clearConsole: true,
        additionalFormatters: [],
        additionalTransformers: []
      }
    })
  ]
})
