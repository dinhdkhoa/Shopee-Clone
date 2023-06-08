/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        'login-hero-image':
          'url(https://scontent.fxds1-1.fna.fbcdn.net/v/t39.30808-6/343327147_750946743098116_2677547945257916229_n.png?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=IzKJjVMIQ54AX8w5bGw&_nc_ht=scontent.fxds1-1.fna&oh=00_AfBBASfr_k_Oba7V8FeONlxdQixRhETnOKDc8GGXuFEN9A&oe=64862E66)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
