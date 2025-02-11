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
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} satisfies Config;
