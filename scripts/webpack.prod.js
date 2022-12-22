const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true, // 在不同的js中引用多个相同的css时，引用先后顺序不一致会触发webpack警告，设置true忽略警告
      filename: 'css/[name].[contenthash:7].css',
      chunkFilename: 'css/[name].[contenthash:7].css'
    })
  ],
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    runtimeChunk: 'single',
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        corejs: {
          test: /[/\\]node_modules[/\\]core-js/,
          name: 'core-js',
          priority: 30
        },
        defaultVendors: {
          test: /[/\\]node_modules[/\\]/,
          name: 'vendor',
          priority: 29,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        asyncVendors: {
          test: /[/\\]node_modules[/\\]/,
          chunks: 'async',
          priority: 28,
          name(module) {
            const packageName = module.context.match(/[/\\]node_modules[/\\](.*?)([/\\]|$)/)[1]
            // 避免服务端不支持@
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  }
})
