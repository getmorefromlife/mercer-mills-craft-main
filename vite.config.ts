import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  appType: "spa",
  plugins: [
    react(),
    vitePrerenderPlugin({
      prerenderScript: path.resolve(__dirname, "src/prerender.tsx"),
      renderTarget: "#root",
      additionalPrerenderRoutes: ["/404"],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
