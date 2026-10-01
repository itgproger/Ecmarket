export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        panel: '#111111',
        surface: '#161616',
        line: '#292929',
        accent: '#3B82F6'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        site: '1400px'
      }
    }
  },
  plugins: []
}
