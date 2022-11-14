import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3002,
  },
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
