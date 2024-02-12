import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Make sure to copy the wasm file to the root of your build folder
    viteStaticCopy({
      targets: [
        {
          src: "**/**.wasm",
          dest: "./",
        },
      ],
    }),
  ],
});
