import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "lg": "940px"
      },
      boxShadow: {
        bShadow: ' 0px 7px 29px 0px rgba(100, 100, 111, 0.2)',
      },
      colors: {
        ctaColor: "#633CFF",
        bodyCopyColor: "#737373"
      }
    },
  },
  plugins: [],
};
export default config;
