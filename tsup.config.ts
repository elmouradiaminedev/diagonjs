import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  entry: ["src"],
  dts: {
    entry: "src/index.ts",
  },
});
