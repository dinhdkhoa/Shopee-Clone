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
          'url(https://scontent.fxds1-1.fna.fbcdn.net/v/t39.30808-6/340770579_1387411908761059_6789928003580244772_n.png?_nc_cat=109&ccb=1-7&_nc_sid=e3f864&_nc_ohc=E33aUbGIcmYAX9tgVwV&_nc_ht=scontent.fxds1-1.fna&oh=00_AfAv5cUJg07GnWwQ5XhzvIWOx0JbM3_8tsycOnQo96IaNQ&oe=64761BC1)'
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
