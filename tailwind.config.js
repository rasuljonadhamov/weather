/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          background: {
            light: '#f8f9fa',
            dark: '#212529',
          },
          text: {
            light: '#212529',
            dark: '#f8f9fa',
          },
          accent: '#0d6efd',
        },
        animation: {
          fadeIn: 'fadeIn 0.3s ease-in-out',
        },
        transitionProperty: {
          'height': 'height',
          'spacing': 'margin, padding',
        },
        boxShadow: {
          'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    plugins: [],
  };