import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')]
};

export default config;
