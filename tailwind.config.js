module.exports = {
  purge: ["./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      terracotta: "#E07A5F",
      plum: "#3D405B",
      mint: "#81B29A",
      sand: "#F2CC8F",
      pebble: "#F4F1DE",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1480px",
      "2xl": "1536px",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
