import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(), // Add the ESLint plugin here
  ],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    historyApiFallback: true,
  },
});
