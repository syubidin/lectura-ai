/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Academic App Color Palette from User Reference:
        // Chambray: #38598a | Bermuda Gray: #718da2 | Pigeon Post: #a7c4d7 | Ronchi: #f0c74c | Zest: #e57e24
        chambray: {
          50:  '#f2f5f9',
          100: '#e1e8f1',
          200: '#c5d3e4',
          300: '#9bb6d2',
          400: '#6d94be',
          500: '#4c78a8',
          600: '#38598a', // Core Chambray
          700: '#2e4972',
          800: '#293e5e',
          900: '#26364f',
          950: '#182233',
        },
        bermuda: {
          50:  '#f5f7f9',
          100: '#e8edf1',
          200: '#d5dde4',
          300: '#b8c6d1',
          400: '#95abba',
          500: '#718da2', // Core Bermuda Gray
          600: '#5c7487',
          700: '#4c5e6e',
          800: '#42505d',
          900: '#3b454f',
        },
        pigeon: {
          50:  '#f5f8fa',
          100: '#e9f1f5',
          200: '#d7e4ec',
          300: '#bcd2df',
          400: '#a7c4d7', // Core Pigeon Post
          500: '#7da6c0',
          600: '#628ca7',
          700: '#507188',
          800: '#455e71',
          900: '#3c4f5e',
        },
        ronchi: {
          50:  '#fdfcf4',
          100: '#fbf7e3',
          200: '#f6ecc5',
          300: '#f3dc9c',
          400: '#f0c74c', // Core Ronchi
          500: '#dfaf2c',
          600: '#c18d1f',
          700: '#9b6b1b',
          800: '#7e551c',
          900: '#69471c',
        },
        zest: {
          50:  '#fdf7f2',
          100: '#faede1',
          200: '#f5d9c2',
          300: '#eebf99',
          400: '#e89e69',
          500: '#e57e24', // Core Zest
          600: '#c96417',
          700: '#a44c16',
          800: '#843e18',
          900: '#6d3517',
        },
        // brand mapped to chambray for unified primary theme
        brand: {
          50:  '#f2f5f9',
          100: '#e1e8f1',
          200: '#c5d3e4',
          300: '#9bb6d2',
          400: '#6d94be',
          500: '#4c78a8',
          600: '#38598a', // Chambray
          700: '#2e4972',
          800: '#293e5e',
          900: '#26364f',
          950: '#182233',
        },
      },
      boxShadow: {
        'subtle':   '0 1px 2px 0 rgba(41, 62, 94, 0.04), 0 1px 3px 0 rgba(41, 62, 94, 0.03)',
        'elevated': '0 10px 25px -5px rgba(56, 89, 138, 0.08), 0 8px 10px -6px rgba(56, 89, 138, 0.04)',
        'brand':    '0 4px 14px -3px rgba(56, 89, 138, 0.35)',
        'zest':     '0 4px 14px -3px rgba(229, 126, 36, 0.35)',
        'ronchi':   '0 4px 14px -3px rgba(240, 199, 76, 0.35)',
      },
    },
  },
  plugins: [],
};
