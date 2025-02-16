import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cover-1': "url('/images/banner/cover.jpeg')",
        'cover-2': "url('/images/banner/cover2.svg')",
        'cover-3': "url('/images/banner/cover3.svg')",
        'cover-4': "url('/images/banner/cover4.svg')",
        'cover-5': "url('/images/banner/cover5.jpg')",
        'cover-6': "url('/images/banner/cover6.svg')",
        'event': "url('/images/banner/event.jpeg')",
      }
    }
  },
  plugins: [],
});

export default config;

