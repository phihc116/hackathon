/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const tailwindcss = (await import("@tailwindcss/vite")).default;

  return {
    root: __dirname,
    cacheDir: "../../node_modules/.vite/apps/frontend",
    server: { port: 4200, host: "localhost" },
    preview: { port: 4200, host: "localhost" },
    plugins: [react(), tailwindcss()],
    build: {
      outDir: "./dist",
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: { transformMixedEsModules: true },
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@features', replacement: path.resolve(__dirname, 'src/features') }
      ]
    },    
  };
});
