import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      flowbite.content()
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      }
    },
  },
  plugins: [
      flowbite.plugin(),
      require('@tailwindcss/typography')
  ],
  darkMode: 'selector',
};
export default config;
