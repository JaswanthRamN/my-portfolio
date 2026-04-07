/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#e8eaf0',
          100: '#c4c8d4',
          200: '#9da3b5',
          300: '#757c96',
          400: '#575f7f',
          500: '#3a4268',
          600: '#343c60',
          700: '#2b3355',
          800: '#232a4a',
          900: '#151b38',
          950: '#0a0f1e',
        },
        cyan: {
          50: '#e0fcff',
          100: '#bef8fd',
          200: '#87eaf2',
          300: '#54d1db',
          400: '#38bec9',
          500: '#2cb1bc',
          600: '#14919b',
          700: '#0e7c86',
          800: '#0a6c74',
          900: '#044e54',
        },
        neon: {
          blue: '#00d4ff',
          purple: '#7b61ff',
          pink: '#ff6b9d',
          green: '#00ff88',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-sm': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'h1': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'h3': ['1.75rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'h4': ['1.375rem', { lineHeight: '1.45' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-cyan': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 212, 255, 0.06), transparent 40%)',
        'glow-purple': 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(123, 97, 255, 0.06), transparent 40%)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(0, 212, 255, 0.15)',
        'glow': '0 0 30px rgba(0, 212, 255, 0.2)',
        'glow-lg': '0 0 60px rgba(0, 212, 255, 0.25)',
        'glow-purple': '0 0 30px rgba(123, 97, 255, 0.2)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 212, 255, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
        'particle-drift': 'particleDrift 15s linear infinite',
        'line-grow': 'lineGrow 1.5s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        particleDrift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '33%': { transform: 'translate(30px, -50px) rotate(120deg)' },
          '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        lineGrow: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--target-width, 100%)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}
