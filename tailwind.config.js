/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hecate: {
          primary: '#1a1a2e',      // Dark Navy
          secondary: '#c41e3a',    // Crimson/Cherry Red
          accent: '#d4a574',       // Warm Gold/Bronze
          cream: '#f5f0eb',        // Warm Light Cream
          ivory: '#faf8f5',        // Bright Off-White/Ivory
          border: '#e8e3de',       // Soft Warm Gray
          muted: '#6b6b6b',        // Medium Gray
          text: '#2d2d2d',         // Charcoal Black
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'snappy': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'caret-blink': {
          '0%, 70%, 100%': { opacity: '1' },
          '20%, 50%': { opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
