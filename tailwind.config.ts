import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Obsidian Kinetic Design System
        'primary':                    '#c6c6c6',
        'on-primary':                 '#121212',
        'primary-container':          '#1a1a1a',
        'on-primary-container':       '#7c7d7e',
        'primary-fixed':              '#e2e2e2',
        'primary-fixed-dim':          '#c6c6c6',
        'on-primary-fixed':           '#1a1c1c',
        'on-primary-fixed-variant':   '#454747',
        'inverse-primary':            '#5d5f5f',

        'secondary':                  '#7158c4',
        'on-secondary':               '#ffffff',
        'secondary-container':        '#2e2060',
        'on-secondary-container':     '#cabfff',
        'secondary-fixed':            '#9b87e0',
        'secondary-fixed-dim':        '#7158c4',
        'on-secondary-fixed':         '#1a0e40',
        'on-secondary-fixed-variant': '#3d2c8a',

        'tertiary':                   '#c1c7cf',
        'on-tertiary':                '#2b3137',
        'tertiary-container':         '#0d1318',
        'on-tertiary-container':      '#787e85',
        'tertiary-fixed':             '#dde3eb',
        'tertiary-fixed-dim':         '#c1c7cf',
        'on-tertiary-fixed':          '#161c22',
        'on-tertiary-fixed-variant':  '#41474e',

        'surface':                    '#121212',
        'surface-dim':                '#121212',
        'surface-bright':             '#3a3939',
        'surface-container-lowest':   '#0a0a0a',
        'surface-container-low':      '#181818',
        'surface-container':          '#1e1e1e',
        'surface-container-high':     '#262626',
        'surface-container-highest':  '#353534',
        'surface-variant':            '#353534',
        'surface-tint':               '#c6c6c6',
        'on-surface':                 '#e5e2e1',
        'on-surface-variant':         '#c4c7c7',
        'inverse-surface':            '#e5e2e1',
        'inverse-on-surface':         '#313030',

        'background':                 '#121212',
        'on-background':              '#e5e2e1',

        'outline':                    '#8e9192',
        'outline-variant':            '#353534',

        'error':                      '#ffb4ab',
        'on-error':                   '#690005',
        'error-container':            '#93000a',
        'on-error-container':         '#ffdad6',
      },
      fontFamily: {
        'headline': ['var(--font-manrope)', 'sans-serif'],
        'body':     ['var(--font-manrope)', 'sans-serif'],
        'label':    ['var(--font-manrope)', 'sans-serif'],
        sans:       ['var(--font-manrope)', 'sans-serif'],
      },
      borderRadius: {
        'none':    '0',
        'sm':      '0.125rem',
        'DEFAULT': '0.375rem',
        'md':      '0.375rem',
        'lg':      '0.5rem',
        'xl':      '0.75rem',
        'full':    '9999px',
      },
      backgroundImage: {
        'luxury':           'linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #1a1a1a 100%)',
        'primary-gradient': 'linear-gradient(135deg, #c6c6c6 0%, #101213 100%)',
        'carbon-divider':   'linear-gradient(90deg, transparent 0%, #353534 50%, transparent 100%)',
      },
      boxShadow: {
        'ambient': '0 0 40px 0 rgba(229, 226, 225, 0.06)',
      },
    },
  },
  plugins: [],
}

export default config
