import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)', 'var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  			mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
  			display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif']
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			ink: {
  				DEFAULT: '#111111',
  				50: '#f6f6f6',
  				100: '#ededed',
  				200: '#d9d9d9',
  				300: '#bfbfbf',
  				400: '#8f8f8f',
  				500: '#666666',
  				600: '#404040',
  				700: '#2b2b2b',
  				800: '#1a1a1a',
  				900: '#111111'
  			}
  		},
  		letterSpacing: {
  			widest: '0.25em'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
