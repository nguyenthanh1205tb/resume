/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  style: {
    postcss: {
      plugins: [],
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
}
