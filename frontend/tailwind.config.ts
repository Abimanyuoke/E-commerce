// import type { Config } from 'tailwindcss'

const config = {
  content: [
    './app/**/*.{ts,tsx}',         
    './pages/**/*.{ts,tsx}',       
    './components/**/*.{ts,tsx}', 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#fea928',
        secondary: '#ed8900',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '3rem',
        },
      },
      backdropBlur: {
        abim: '2px',
      },
    },
  },
  plugins: [],
}

export default config
