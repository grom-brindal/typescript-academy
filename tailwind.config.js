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
          h3: {
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
          li: {
            "&:before": {
              display: "none",
            },
          },
          code: {
            "&:before": {
              display: "none",
            },
            "&:after": {
              display: "none",
            },
            backgroundColor: "#2e3842",
            color: "white",
            padding: "1px 4px",
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
