/* eslint-disable no-undef */
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//     purgecss: {
//       content: ['./**/*.html', './src/**/*.tsx', './src/**/*.ts'],
//     },
//   },
// }
import purgecss from '@fullhuman/postcss-purgecss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const PROD = process.env.NODE_ENV === 'production'
const plugins = []

if (PROD) {
  plugins.push(
    purgecss({
      content: ['./**/*.html', './src/**/*.tsx'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  )
}

plugins.push(autoprefixer)

if (PROD) {
  plugins.push(
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  )
}

export default { plugins }
