const IS_RPOD = process.env.NODE_ENV === 'production'

module.exports = {
  plugins: [IS_RPOD && require('autoprefixer')]
}
