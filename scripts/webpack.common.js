const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack')
const getCssLoaders = require('./getCssLoaders')
const {
  isEnvDev,
  appIndex,
  appSrc,
  appBuild,
  appPublic,
  globalLessPath,
  webpackPublicPath,
  appHtml,
  appTsConfig
} = require('./constants')

module.exports = {
  stats: 'errors-warnings',
  entry: { app: appIndex },
  output: {
    clean: true,
    path: appBuild,
    pathinfo: isEnvDev,
    publicPath: webpackPublicPath,
    filename: isEnvDev ? 'js/[name].js' : 'js/[name].[contenthash:7].js',
    chunkFilename: isEnvDev ? 'js/async.[name].js' : 'js/async.[name].[contenthash:7].js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': appSrc
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: getCssLoaders(0)
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isEnvDev
            }
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [globalLessPath]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'media/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.svg$/,
        issuer: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }]
              },
              titleProp: true,
              ref: true
            }
          },
          {
            loader: 'file-loader',
            options: {
              name: 'icons/[name].[contenthash:8][ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      templateParameters: {
        PUBLIC_PATH: webpackPublicPath
      },
      template: appHtml
    }),
    new CopyPlugin({
      patterns: [
        {
          context: appPublic,
          from: '**/*',
          to: appBuild,
          toType: 'dir',
          globOptions: {
            ignore: ['**/.DS_Store', '**/*.html']
          }
        }
      ]
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: appTsConfig
      }
    })
  ]
}
