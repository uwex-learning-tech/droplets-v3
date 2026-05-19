const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge( common, {
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin( {
      banner: `DROPLETS
@version: ${require('./package.json').version}
@author: Ethan Lin and Bryan Bortz
@updated on: 05-19-2026
@url: https://github.com/uwex-learning-tech/droplets-v3
@license: The MIT License (MIT)
@copyright: (c) 2018-${new Date().getUTCFullYear()} Office of Online & Professional Learning Resources`,
      entryOnly: true
    } ),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin( 
        { extractComments: false }
      ),
      new CssMinimizerPlugin(),
    ],
  },
} );