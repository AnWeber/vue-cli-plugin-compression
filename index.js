const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require("zlib");


module.exports = (api, options) => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    const compressions = (options.pluginOptions || {}).compression || {
      brotli: {
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    };

    for (let compression in compressions) {
      api.chainWebpack(webpackConfig => {
        webpackConfig
          .plugin(compression + "-compression")
          .use(CompressionPlugin)
          .init(Plugin => new Plugin(compressions[compression]));
      });
    }
  }
};
