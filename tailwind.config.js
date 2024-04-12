export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ["Cinzel", 'serif'],
        'pixelify': ["Pixelify Sans", 'sans-serif'],
        'roman': ["Times New Roman", 'serif'],
        'raleway': ["Raleway", 'sans-serif'],

      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}