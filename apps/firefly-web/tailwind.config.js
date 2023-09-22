const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

const { screens } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname)
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        ...screens
      },
      colors: {
        primary: {
          light: '#9AE449',
          DEFAULT: '#80D623',
          dark: '#61B10B'
        },
        secondary: {
          light: '#DB477E',
          DEFAULT: '#CE2262',
          dark: '#AA0B46'
        },
        white: '#ffffff',
        black: '#000000'
      },
      fontFamily: {
        sans: [
          'Source Sans Pro',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"'
        ],
        serif: [
          'ui-serif',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'Times',
          'serif'
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      }
    }
  },
  plugins: []
};
