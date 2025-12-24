export default {
  plugins: {
    "@stylexswc/postcss-plugin": {
      include: ["{pkg,src}/**/*.{ts,tsx}"],
      rsOptions: {
        dev: process.env.NODE_ENV === "development",
      },
    },
  },
};
