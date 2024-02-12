import { defineConfig } from "tsup";

export default defineConfig({
  name: "diagonjs",
  target: "esnext",
  entry: ["src/index.ts"],
  dts: true,
});
