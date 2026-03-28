import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#613F66',
          'purple-dark': '#4a2f4e',
          'purple-light': '#7a5080',
          navy: '#1a0a1e',
          dark: '#120816',
          card: '#1e1025',
          border: '#2d1535',
          gold: '#D4AF37',
          'gold-light': '#F0D060',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury': 'linear-gradient(135deg, #1a0a1e 0%, #2d1535 50%, #1a0a1e 100%)',
      },
      boxShadow: {
        'purple': '0 4px 20px rgba(97, 63, 102, 0.3)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
