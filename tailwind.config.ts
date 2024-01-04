import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wall': '#ef4444',
        'not-wall': '#e5e7eb',
        'destination': '#22c55e',
        'origin': '#fde047',
        'used-during-search': '#6b7280',
        'shortest-path': '#a855f7',
      },
    },
  },
  plugins: [],
}
export default config
