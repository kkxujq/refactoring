const webpack = require('webpack');
const ModifyChunkIdPlugin = require('modify-chunk-id-webpack-plugin');
const APP_NAME = require('./package.json').name;
const PORT = require('./package.json').devPort;
const patchCliService = require('./scripts/patch-cli-service');

patchCliService();

const NODE_ENV = process.env.NODE_ENV || 'development';

log('APP_NAME: ', APP_NAME);
log('NODE_ENV: ', NODE_ENV);

module.exports = {
  baseUrl: `/${APP_NAME}/`,

  productionSourceMap: false,

  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    },

    entry: './src/module.js',

    plugins: [
      new webpack.DefinePlugin({
        'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME),
      }),
      new ModifyChunkIdPlugin({ random: process.env.NODE_ENV === 'development' }),
    ],

    devtool: 'eval-source-map',

    output: {
      libraryExport: 'default',

      devtoolModuleFilenameTemplate: info => (info.resourcePath.match(/^\.\/\S*?\.vue$/)
        ? `webpack-generated:///${info.resourcePath}?${info.hash}`
        : `webpack-yourCode:///${info.resourcePath}`),

      devtoolFallbackModuleFilenameTemplate: 'webpack:///[resource-path]?[hash]',
    },
  },

  devServer: {
    port: PORT,
  },
};

function log(label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content);
}
