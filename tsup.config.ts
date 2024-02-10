import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  target: "esnext",
  entry: ["src"],
  dts: {
    entry: "src/index.ts",
  },
});
