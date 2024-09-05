module.exports = {
  content: [ './index.html', './src/**/*.{js,ts,jsx,tsx}' ],
  safelist: [ 'h-[3.75rem]', 'h-[6.25rem]', 'w-[3.75rem]', 'w-[6.25rem]' ],
  theme: {
    extend: {
      colors: {
        primary: '#5988FF',
        disabled: '#D9D9D9',
        purple: '#b400ff',
        error: '#d32f2f',
      }
    }
  }
}
