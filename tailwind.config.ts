import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        skyBlue: '#D7E6F5',
        navy: '#121E5B',
        mint: '#D5F7B3',
        sage: '#A9D0AA',
        light: '#EBEAEB',
        medium: '#716D79',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, 10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, 0)'
          },
        }
      },
      animation: {
        'fade-up': 'fade-up 0.3s ease-out forwards'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
