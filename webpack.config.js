const path = require('path');
const TerserPlugin = require('../../../node_modules/terser-webpack-plugin');
const Repack = require('../../../node_modules/@callstack/repack');
const config = require('../../../app.json');
const {dependencies} = require('../../../package.json');
const {RebuildNotifyPlugin} = require('./src/plugins/rebuildNotifyPlugin')

const {samples, selectedSample} = config;
const sampleClassPath = `../../../src/${samples[selectedSample]}`;
const sampleClassPathLocal = `./src/${samples[selectedSample]}`

/**
 * More documentation, installation, usage, motivation and differences with Metro is available at:
 * https://github.com/callstack/repack/blob/main/README.md
 *
 * The API documentation for the functions and plugins used in this file is available at:
 * https://re-pack.netlify.app/
 */

/**
 * Webpack configuration.
 * You can also export a static object or a function returning a Promise.
 *
 * @param env Environment options passed from either Webpack CLI or React Native CLI
 *            when running with `react-native start/bundle`.
 */
module.exports = env => {
  const {
    mode = 'development',
    context = path.resolve(__dirname, '..', '..', '..'),
    entry = './node_modules/@sleeperhq/mini-core/start.tsx',
    platform,
    minimize = mode === 'production',
    devServer = undefined,
    bundleFilename = undefined,
    sourceMapFilename = undefined,
    assetsPath = undefined,
    reactNativePath = require.resolve('react-native'),
  } = env;

  if (!platform) {
    throw new Error('Missing platform');
  }

  const dev = mode === 'development';

  const sharedDeps = Object.keys(dependencies).reduce((acc, key) => {
    acc[key] = { eager: dev, requiredVersion: dependencies[key] };
    return acc;
  }, {});

  /**
   * Using Module Federation might require disabling hmr.
   * Uncomment below to set `devServer.hmr` to `false`.
   *
   * Keep in mind that `devServer` object is not available
   * when running `webpack-bundle` command. Be sure
   * to check its value to avoid accessing undefined value,
   * otherwise an error might occur.
   */
  // if (devServer) {
  //   devServer.hmr = false;
  // }

  /**
   * Depending on your Babel configuration you might want to keep it.
   * If you don't use `env` in your Babel config, you can remove it.
   *
   * Keep in mind that if you remove it you should set `BABEL_ENV` or `NODE_ENV`
   * to `development` or `production`. Otherwise your production code might be compiled with
   * in development mode by Babel.
   */
  process.env.BABEL_ENV = mode;

  return {
    mode,
    /**
     * This should be always `false`, since the Source Map configuration is done
     * by `SourceMapDevToolPlugin`.
     */
    devtool: false,
    context,
    entry,
    resolve: {
      /**
       * `getResolveOptions` returns additional resolution configuration for React Native.
       * If it's removed, you won't be able to use `<file>.<platform>.<ext>` (eg: `file.ios.js`)
       * convention and some 3rd-party libraries that specify `react-native` field
       * in their `package.json` might not work correctly.
       */
      ...Repack.getResolveOptions(platform),

      /**
       * Uncomment this to ensure all `react-native*` imports will resolve to the same React Native
       * dependency. You might need it when using workspaces/monorepos or unconventional project
       * structure. For simple/typical project you won't need it.
       */
      // alias: {
      //   'react-native': reactNativePath,
      // },
      alias: {
        app: path.resolve(__dirname, sampleClassPath),
        root: path.resolve(__dirname, '..', '..', '..'),
      },
    },
    /**
     * Configures output.
     * It's recommended to leave it as it is unless you know what you're doing.
     * By default Webpack will emit files into the directory specified under `path`. In order for the
     * React Native app use them when bundling the `.ipa`/`.apk`, they need to be copied over with
     * `Repack.OutputPlugin`, which is configured by default inside `Repack.RepackPlugin`.
     */
    output: {
      clean: true,
      path: path.join(__dirname, '..', '..', '..', 'build', platform),
      filename: dev
        ? 'index.bundle'
        : platform === 'android'
        ? 'index.android.bundle'
        : 'index.ios.bundle',
      chunkFilename: '[name].chunk.bundle',
      publicPath: Repack.getPublicPath({platform, devServer}),
      uniqueName: 'sleeper',
    },
    /**
     * Configures optimization of the built bundle.
     */
    optimization: {
      /** Enables minification based on values passed from React Native CLI or from fallback. */
      minimize,
      /** Configure minimizer to process the bundle. */
      minimizer: [
        new TerserPlugin({
          test: /\.(js)?bundle(\?.*)?$/i,
          /**
           * Prevents emitting text file with comments, licenses etc.
           * If you want to gather in-file licenses, feel free to remove this line or configure it
           * differently.
           */
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
      chunkIds: 'named',
    },
    /**
     * We turn on polling so file updates can be recognized when used with Docker.
     */
    watchOptions: {
      poll: true,
      aggregateTimeout: 600,
      ignored: '**/node_modules',
    },
    module: {
      /**
       * This rule will process all React Native related dependencies with Babel.
       * If you have a 3rd-party dependency that you need to transpile, you can add it to the
       * `include` list.
       *
       * You can also enable persistent caching with `cacheDirectory` - please refer to:
       * https://github.com/babel/babel-loader#options
       */
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: [
            /node_modules(.*[/\\])+react/,
            /node_modules(.*[/\\])+@react-native/,
            /node_modules(.*[/\\])+@react-navigation/,
            /node_modules(.*[/\\])+@react-native-community/,
            /node_modules(.*[/\\])+@expo/,
            /node_modules(.*[/\\])+pretty-format/,
            /node_modules(.*[/\\])+metro/,
            /node_modules(.*[/\\])+he/,
            /node_modules(.*[/\\])+abort-controller/,
            /node_modules(.*[/\\])+@callstack\/repack/,
            /node_modules(.*[/\\])+@sleeperhq\/mini-core/,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@react-native/babel-preset',
                ['@babel/preset-typescript', { allowDeclareFields: true }],
              ],
              babelrc: false,
              cacheDirectory: true,
              sourceMaps: true,
            },
          },
        },
        /**
         * Here you can adjust loader that will process your files.
         *
         * You can also enable persistent caching with `cacheDirectory` - please refer to:
         * https://github.com/babel/babel-loader#options
         */
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@react-native/babel-preset',
                ['@babel/preset-typescript', { allowDeclareFields: true }],
              ],
              // sourceType: "unambiguous",
              plugins:['@babel/plugin-transform-runtime'],
              babelrc: false,
              comments: true, // necessary for named chunks
              cacheDirectory: true,
              sourceMaps: true,
            },
          },
        },
        dev && {
          test: /\.[jt]sx?$/,
          include: /src/,
          loader: 'string-replace-loader',
          options: {
            search: 'console.log',
            replace: 'log_mini',
          }
        },
        /**
         * This loader handles all static assets (images, video, audio and others), so that you can
         * use (reference) them inside your application.
         *
         * If you wan to handle specific asset type manually, filter out the extension
         * from `ASSET_EXTENSIONS`, for example:
         * ```
         * Repack.ASSET_EXTENSIONS.filter((ext) => ext !== 'svg')
         * ```
         */
        {
          test: Repack.getAssetExtensionsRegExp(Repack.SCALABLE_ASSETS),
          use: {
            loader: '@callstack/repack/assets-loader',
            options: {
              // In order to support single file bundle uploads through our submission process,
              // we need to encode image dependencies directly into the main bundle file as base64.
              inline: true,
              platform,
              devServerEnabled: Boolean(devServer),
              scalableAssetExtensions: Repack.SCALABLE_ASSETS,
            },
          },
        },
        {
          test: Repack.getAssetExtensionsRegExp(Repack.NON_SCALABLE_ASSETS),
          use: {
            loader: '@callstack/repack/assets-loader',
            options: {
              inline: false, // all other assets must be uploaded separately, as they cannot be inlined.
              platform,
              devServerEnabled: Boolean(devServer),
              scalableAssetExtensions: Repack.SCALABLE_ASSETS,
            },
          },
        },
      ].filter(Boolean),
    },
    plugins: [
      /**
       * Configure other required and additional plugins to make the bundle
       * work in React Native and provide good development experience with
       * sensible defaults.
       *
       * `Repack.RepackPlugin` provides some degree of customization, but if you
       * need more control, you can replace `Repack.RepackPlugin` with plugins
       * from `Repack.plugins`.
       */
      new Repack.RepackPlugin({
        context,
        mode,
        platform,
        devServer,
        output: {
          bundleFilename,
          sourceMapFilename,
          assetsPath,
        },
        extraChunks: [
          {
            include: new RegExp('.*'),
            type: 'remote',
            outputPath: path.join(__dirname, '..', '..', '..', 'dist', config.name, platform),
          },
        ],
        listenerIP: config.remoteIP,
      }),

      new Repack.plugins.ModuleFederationPlugin({
        name: config.name,
        exposes: {
          app: sampleClassPathLocal,
        },
        shared: {
          // Adding this here fixes the named chunks problem.
          // It also makes sure any third party javascript packages are included in the container,
          // not exported to a separate chunk.
          // The only separate chunk is the exposed stuff.
          ...sharedDeps,
          // if we don't do the above, then instead each package that is not included in this list will
          // split off into a seperate chunk, and named chunks will break (assume that's a bug that we can fix).
        },
      }),

      new RebuildNotifyPlugin(config),

      // new Repack.plugins.ChunksToHermesBytecodePlugin({
      //   enabled: !dev,
      //   test: /\.(js)?bundle$/,
      //   exclude: /index\.bundle$/,
      // }),
    ],
  };
};
