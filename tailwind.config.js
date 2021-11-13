const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './src/components/**/*.vue',
    './src/main.css'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.or-bg-primary': {
          backgroundColor: '#1F2937',
        },
        '.or-border-primary': {
          borderColor: '#1F2937',
        },
        '.or-text-primary': {
          color: '#1F2937',
        },
        '.or-bg-success': {
          backgroundColor: '#10B981',
        },
        '.or-bg-danger': {
          backgroundColor: '#DC2626',
        },
        '.or-border-radius': {
          borderRadius: '1px'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
