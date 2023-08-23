const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge( common, {
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin( {
      banner: `DROPLETS
@version: ${require('./package.json').version}
@author: Ethan Lin
@updated on: 05-19-2023
@url: https://github.com/uwex-learning-tech/droplets-v3
@license: The MIT License (MIT)
@copyright: (c) 2018-${new Date().getUTCFullYear()} Learning Technology, University of Wisconsin Extended Campus`,
      entryOnly: true
    } ),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin( 
        { extractComments: false }
      )
    ],
  },
} );