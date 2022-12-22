const { isEnvProd } = require('./scripts/constants')

module.exports = {
  plugins: [isEnvProd && require('autoprefixer')]
}
