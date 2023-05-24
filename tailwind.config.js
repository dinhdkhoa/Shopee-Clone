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
          'url(https://scontent.fxds1-1.fna.fbcdn.net/v/t39.30808-6/348464664_267897119030184_3167180554222631349_n.png?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=LNbSqa7f9bcAX8nJH1c&_nc_ht=scontent.fxds1-1.fna&oh=00_AfAreZjNtII6y_TomptZg1SV8zExaFrrLhppy2JsCii2eQ&oe=64732643)'
      }
    }
  },
  plugins: []
}
