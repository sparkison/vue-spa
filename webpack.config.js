// Variables
const path = require('path')
const webpack = require('webpack')
const process = require('process')

// Pull in webpack plugins
const TerserPlugin = require('terser-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { GenerateSW } = require('workbox-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const WebpackNotifierPlugin = require('webpack-notifier')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// Production flag
const inProduction = process.env.NODE_ENV === 'production'
const inDevelopment = process.env.NODE_ENV === 'development'

// HMR
const isHot = process.argv.includes('--hot')

// Node server port
const port = 8080 // default is 8080

// Node server for hot module replacement
let nodeServer = 'localhost:' + port + '/'
if (process.argv.includes('--https')) {
  nodeServer = 'https://' + nodeServer
} else {
  nodeServer = 'http://' + nodeServer
}

// Public/webroot path
// Js will placed `${publicPath}/js` and css in `${publicPath}/css`
const publicPath = path.resolve(__dirname, 'dist')

// Enable service-worker/SPA support
const enableServiceWorker = true

// Primary webpack entry point(s)
const entry = {
  /*
   * JS entry point/Vue base component
   * Make sure to import your css files here, e.g. `import '../sass/app.scss'`
   */
  app: path.resolve(__dirname, 'resources/js/app.js')
}

// Clean options
// Info: https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
const cleanOptions = {
  dry: false,
  cleanStaleWebpackAssets: true,
  protectWebpackAssets: true,
  verbose: true,
  cleanOnceBeforeBuildPatterns: [
    './js',
    './css',
    './resource-manifest.json',
    './precache-manifest.*.js'
  ],
  cleanAfterEveryBuildPatterns: [
  ]
}

// Set the webpack provider plugins
// Info: https://webpack.js.org/plugins/provide-plugin/
const providers = {
  $: 'jquery',
  jQuery: 'jquery'
}

// Css options
// Info: https://github.com/webpack-contrib/mini-css-extract-plugin#configuration
const cssOptions = {
  filename: inProduction ? 'css/[name].[chunkhash].css' : 'css/[name].css',
  chunkFilename: inProduction ? 'css/[name].[chunkhash].css' : 'css/[name].css',
  path: publicPath,
  publicPath: 'css'
}

// Configure the manifest options
// Info: https://www.npmjs.com/package/webpack-manifest-plugin#api
const manifestOptions = {
  fileName: 'resource-manifest.json',
  writeToFileEmit: true,
  filter: ({ isInitial, isModuleAsset }) => {
    return isInitial && !isModuleAsset
  },
  // Customize the manifest file key/value pairs
  generate: (seed, files) => {
    let entries = files.reduce(
      (manifest, { name, path }) => {
        let ext = path.split('.').pop()
        let key = ext ? `/${ext}/${name}` : `/${name}`
        return {
          ...manifest,
          [key]: isHot ? nodeServer + path : path
        }
      },
      seed
    )
    if (isHot) {
      return {
        '/css/app.css': nodeServer + 'css/app.css', // need to manually add entry for hot module reload
        ...entries
      }
    }
    return entries
  }
}

// CSS Minimizer for production
// Info: https://webpack.js.org/configuration/optimization/#optimizationminimize
const optimization = inProduction
  ? {
    minimizer: [
      // Info: https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: false
          }
        }
      }),
      // Info: https://github.com/NMFR/optimize-css-assets-webpack-plugin#configuration
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  }
  : {}

/**
 * Webpack config file
 * Info: https://webpack.js.org/configuration/#options
 *
 * @type {{mode: string, output: {chunkFilename: string, path: string, filename: string}, devtool: boolean, devServer: {headers: {'Access-Control-Allow-Origin': string}, historyApiFallback: boolean, compress: boolean, noInfo: boolean, quiet: boolean, hot: boolean, contentBase: string}, entry: {app: string}, performance: {hints: boolean}, resolve: {extensions: string[], alias: {'~': string, jquery: string}, modules: string[]}, stats: {reasons: boolean, chunks: boolean, source: boolean, publicPath: boolean, version: boolean, modules: boolean, performance: boolean, children: boolean, builtAt: boolean, timings: boolean, entrypoints: boolean, hash: boolean, errorDetails: boolean}, optimization: *, plugins: *[], module: {rules: *[]}}}
 */
let config = {
  entry,

  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errorDetails: false,
    entrypoints: false,
    performance: inProduction,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
    builtAt: false
  },

  performance: { hints: false },

  // Valid options: "production" | "development" | "none"
  mode: inProduction ? 'production' : 'development',

  plugins: [
    new webpack.ProvidePlugin(providers), // Providers, e.g. jQuery
    new WebpackNotifierPlugin({ title: 'Webpack' }), // OS notification
    new VueLoaderPlugin(), // Vue-loader
    new CleanWebpackPlugin(cleanOptions), // Clean up pre-compile time
    new ManifestPlugin(manifestOptions), // Manifest file
    new FriendlyErrorsWebpackPlugin({ clearConsole: true }), // Prettify console
    new MiniCssExtractPlugin(cssOptions), // Extract CSS files
    new WebpackMd5Hash() // use md5 for hashing
  ],

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isHot } // set HMR if flagged
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.vue'],
    modules: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '~': path.join(__dirname, './resources/js'),
      jquery: 'jquery/src/jquery'
    }
  },

  output: {
    filename: inProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    chunkFilename: inProduction ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    path: publicPath
  },

  optimization: {
    ...optimization,
    concatenateModules: false,
    providedExports: false,
    usedExports: false
  },

  devtool: inDevelopment ? 'eval-source-map' : false,

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: port,
    contentBase: publicPath,
    historyApiFallback: true,
    noInfo: false,
    compress: true,
    quiet: true,
    hot: isHot
  }
}

/**
 * If service worker enabled, configure SWPrecache plugin
 * Info: https://github.com/goldhand/sw-precache-webpack-plugin#basic-usage
 */
if (enableServiceWorker) {
  config.plugins.push(
    new GenerateSW({
      // The cache ID
      cacheId: 'pwa',

      // The path and filename of the service worker file that will be created by the build process, relative to the webpack output directory.
      swDest: 'service-worker.js',

      templatedURLs: {
        // You should add the path to your blade files here so they can be cached and have full support for offline first (example below)
        '/': 'dist/index.html'
      },

      // Files to exclude from the precache
      exclude: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],

      navigateFallback: '/',

      // Let server render these urls
      navigateFallbackWhitelist: [
        /^\/media\//,
        /^\/horizon\//,
        /^\/env-editor\//,
        /^\/laravel-websocket\//,
        /^\/docs\//,
      ],

      // Define runtime caching rules.
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'CacheFirst'
        },
        {
          urlPattern: /^https:\/\/www\.gravatar\.com\/avatar\/(\.*)\.jpg/,
          handler: 'CacheFirst'
        },
      ],
    })
  )
}

/**
 * If hot, add hot module replacement plugin
 * Info: https://webpack.js.org/guides/hot-module-replacement/
 */
if (isHot) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

// Export config
module.exports = config

// Accept placeholder css
if (isHot && module.hot) {
  module.hot.accept()
  // module.hot.accept(['./app.css'], () => {});
}
