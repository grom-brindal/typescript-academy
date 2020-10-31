module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    typography: {
      default: {
        css: {
          color: "white",
          h1: {
            color: "white",
          },
          h2: {
            color: "white",
          },
          strong: {
            color: "white",
          },
          code: {
            color: "white",
          },
          p: {
            color: "white",
          },
          a: {
            color: "#007acc",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
