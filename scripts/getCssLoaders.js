const MiniCssExtractLoader = require('mini-css-extract-plugin')
const { isEnvDev, globalLessPath } = require('./constants.js')

module.exports = (importLoaders) => {
  return [
    isEnvDev ? 'style-loader' : MiniCssExtractLoader.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: /\.module\.\w+$/i,
          localIdentName: '_[local]-[hash:base64:6]'
        },
        // 前面使用的每一个 loader 都需要指定 sourceMap 选项 生产环境关闭css sourcemap
        sourceMap: isEnvDev,
        // 指定在 css-loader 前应用的 loader 的数量
        importLoaders: importLoaders + 1
      }
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: isEnvDev }
    }
  ]
}
