/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Raleway': ['Raleway', 'sans-serif'],
        'openSans': ['Open Sans', 'sans-serif']
      },
      colors: {
        'primary': '#FF5300',
        'textCol': '#000000',
        'white': '#FFF9F3',
        'primaryBG': '#007646',
        'transparent': 'rgba(16, 22, 47, 0.1)',
      },
      gridTemplateColumns: {
        'customGrid2': 'repeat(auto-fit, minmax(250px, 1fr))',
        'customGrid3': 'repeat(auto-fit, minmax(200px, 1fr))',
        'customGrid5': 'repeat(auto-fit, minmax(300px, 1fr))',
        'customGrid4': '1.5fr 1fr',
      },
      screens: {
        'tab2': {'max': '800px'},
        'tab': {'max': '900px'},
        'mob': {'max': '700px'},
        'mob2': {'max': '576px'},
        'desk': {'max': '1024px'},
      },
    },
  },
  plugins: [],
}