import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  target: "esnext",
  entry: ["src"],
  dts: {
    resolve: true,
    entry: "./src/index.ts",
  },
});
