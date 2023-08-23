const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge( common, {
  mode: 'production',
  plugins: [
    new webpack.BannerPlugin( {
      banner: '(c) 2018-2023 Learning Technology, University of Wisconsin Extended Campus',
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