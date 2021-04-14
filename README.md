# vue-cli-plugin-compression

> compression plugin for vue-cli

## Configuration

Uses [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)

By default, a brotli and gzip compression plugin are configured, which automatically compress js, css, html, svg and json files.

## Installing in an Already Created Project

``` sh
vue add compression
```


## Configrations

`vue-cli-plugin-compression` default configuration in `vue.config.js`:

```js
module.exports = {
  pluginOptions: {
    compression:{
      brotli: {
        filename: '[file].br[query]',
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
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  }
}
```

It is possible to extend with own compression options, e.g.
```js
const zopfli = require('@gfx/zopfli');
module.exports = {
  pluginOptions: {
    compression:{
      zopfli: {
        compressionOptions: {
          numiterations: 15,
        },
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback);
        },
      }
    }
  }
}
```

## Injected webpack-chain Rules

- `config.plugins('brotli-compression')`
- `config.plugins('gzip-compression')`
