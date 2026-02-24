/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0d12",
        ember: "#ff4d2d",
        gold: "#f6c453",
        haze: "#f8f4ee",
        slate: "#3c4556",
        moss: "#2f4f4f",
      },
      fontFamily: {
        display: ['"Bodoni Moda"', "serif"],
        sans: ['"Space Grotesk"', "sans-serif"],
      },
      backgroundImage: {
        "ember-glow":
          "radial-gradient(800px 500px at 10% -10%, rgba(255, 77, 45, 0.35), transparent 70%)",
        "gold-glow":
          "radial-gradient(700px 400px at 90% 0%, rgba(246, 196, 83, 0.35), transparent 70%)",
      },
      boxShadow: {
        ember: "0 25px 70px rgba(255, 77, 45, 0.2)",
        deep: "0 20px 60px rgba(11, 13, 18, 0.35)",
      },
    },
  },
  plugins: [],
};
