import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

function removePrerenderPreload(): Plugin {
  return {
    name: "remove-prerender-preload",
    enforce: "post",
    generateBundle(_, bundle) {
      for (const asset of Object.values(bundle)) {
        if (asset.type === "asset" && asset.fileName.endsWith(".html") && typeof asset.source === "string") {
          asset.source = asset.source.replace(
            /<link[^>]*rel="modulepreload"[^>]*href="[^"]*prerender-[^"]*"[^>]*>\n?/g,
            ""
          );
        }
      }
    },
  };
}

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
      additionalPrerenderRoutes: ["/404", "/services/the-literary-mill", "/services/the-visionary-mill", "/services/the-sonic-mill", "/services/the-structural-mill", "/services/the-academy-mill", "/guides/course-launch-blueprint", "/guides/project-scoping-tool", "/guides/podcast-launch-sound-kit", "/guides/brand-identity-starter-kit", "/guides/founders-manuscript-blueprint"],
    }),
    removePrerenderPreload(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
