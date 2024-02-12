import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  target: "esnext",
  entry: ["src/index.ts"],
  splitting: false,
  minify: true,
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
});
