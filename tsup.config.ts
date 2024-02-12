import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  target: "esnext",
  entry: ["src"],
  splitting: process.env.NODE_ENV === "production",
  minify: process.env.NODE_ENV === "production",
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
});
