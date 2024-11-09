/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    // Tailwind colors for Flexoki theme by Steph Ango. https://stephango.com/flexoki
    colors: {
      base: {
        black: "#100F0F",
        950: "#1C1B1A",
        900: "#282726",
        850: "#343331",
        800: "#403E3C",
        700: "#575653",
        600: "#6F6E69",
        500: "#878580",
        300: "#B7B5AC",
        200: "#CECDC3",
        150: "#DAD8CE",
        100: "#E6E4D9",
        50: "#F2F0E5",
        paper: "#FFFCF0",
      },
      red: {
        DEFAULT: "#AF3029",
        light: "#D14D41",
      },
      orange: {
        DEFAULT: "#BC5215",
        light: "#DA702C",
      },
      yellow: {
        DEFAULT: "#AD8301",
        light: "#D0A215",
      },
      green: {
        DEFAULT: "#66800B",
        light: "#879A39",
      },
      cyan: {
        DEFAULT: "#24837B",
        light: "#3AA99F",
      },
      blue: {
        DEFAULT: "#205EA6",
        light: "#4385BE",
      },
      purple: {
        DEFAULT: "#5E409D",
        light: "#8B7EC8",
      },
      magenta: {
        DEFAULT: "#A02F6F",
        light: "#CE5D97",
      },
    },
    extend: {
      typography: ({ theme }) => ({
        paper: {
          css: {
            "--tw-prose-body": theme("colors.base.black"),
            "--tw-prose-headings": theme("colors.base.black"),
            "--tw-prose-lead": theme("colors.blue.DEFAULT"),
            "--tw-prose-links": theme("colors.cyan.DEFAULT"),
            "--tw-prose-bold": theme("colors.base.black"),
            "--tw-prose-counters": theme("colors.base[600]"),
            "--tw-prose-bullets": theme("colors.base[600]"),
            "--tw-prose-hr": theme("colors.base[100]"),
            "--tw-prose-quotes": theme("colors.base[600]"),
            "--tw-prose-quote-borders": theme("colors.base[150]"),
            "--tw-prose-captions": theme("colors.purple.DEFAULT"), // This should be obvious when I go to style it
            // "--tw-prose-code": theme("colors.base[950]"),
            // "--tw-prose-pre-code": theme("colors.base[100]"),
            // "--tw-prose-pre-bg": theme("colors.base[950]"),
            "--tw-prose-th-borders": theme("colors.purple.DEFAULT"),
            "--tw-prose-td-borders": theme("colors.purple.DEFAULT"),
            "--tw-prose-invert-body": theme("colors.pink[200]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.pink[300]"),
            "--tw-prose-invert-links": theme("colors.white"),
            "--tw-prose-invert-bold": theme("colors.white"),
            "--tw-prose-invert-counters": theme("colors.pink[400]"),
            "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            "--tw-prose-invert-hr": theme("colors.pink[700]"),
            "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            "--tw-prose-invert-captions": theme("colors.pink[400]"),
            "--tw-prose-invert-code": theme("colors.white"),
            "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

