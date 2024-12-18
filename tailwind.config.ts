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
        'cover-1': "url('/image/banner/cover.jpeg')",
        'cover-2': "url('/image/banner/cover2.svg')",
        'cover-3': "url('/image/banner/cover3.svg')",
        'cover-4': "url('/image/banner/cover4.svg')",
        'cover-5': "url('/image/banner/cover5.jpg')",
        'cover-6': "url('/image/banner/cover6.svg')",
        'event': "url('/image/banner/event.jpeg')",
      }
    }
  },
  plugins: [],
});

export default config;

