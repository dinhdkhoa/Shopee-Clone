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
          'url(https://scontent.fxds1-1.fna.fbcdn.net/v/t39.30808-6/282651200_6657262451196851_8429889999843178246_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_ohc=bjgAz7eTJMsAX9q4gB_&_nc_ht=scontent.fxds1-1.fna&oh=00_AfACtAEJKQopgAYUOVLq8KTt7g6BR5IglxAv4wquhLwfPg&oe=647BF007)'
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
