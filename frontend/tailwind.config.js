/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-neon': 'pulse-neon 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-rotate': 'glow-rotate 4s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { 
            textShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff, 0 0 15px #00d4ff',
            opacity: '1'
          },
          '50%': { 
            textShadow: '0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6',
            opacity: '0.8'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'glow-rotate': {
          '0%': { 
            boxShadow: '0 0 20px #00d4ff',
            transform: 'rotate(0deg)'
          },
          '25%': { 
            boxShadow: '0 0 30px #8b5cf6',
            transform: 'rotate(90deg)'
          },
          '50%': { 
            boxShadow: '0 0 40px #ec4899',
            transform: 'rotate(180deg)'
          },
          '75%': { 
            boxShadow: '0 0 30px #10b981',
            transform: 'rotate(270deg)'
          },
          '100%': { 
            boxShadow: '0 0 20px #00d4ff',
            transform: 'rotate(360deg)'
          },
        },
        'fade-in-up': {
          '0%': { 
            transform: 'translateY(30px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        'slide-in-right': {
          '0%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
        'slide-in-left': {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateX(0)',
            opacity: '1'
          },
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 50%, #ec4899 100%)',
        'gradient-neon': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      }
    },
  },
  plugins: [],
}