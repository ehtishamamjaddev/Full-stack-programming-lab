/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f36f21',
          600: '#e05f14',
          700: '#b84a0f',
          900: '#431407'
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          700: '#334155',
          900: '#0f172a'
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 4px 24px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 40px rgba(15, 23, 42, 0.12)'
      },
      maxWidth: {
        site: '1280px'
      }
    }
  },
  plugins: []
};
