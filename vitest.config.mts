import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: ["**/vendors/**", "**/types/**", "**/examples/**"],
      thresholds: {
        statements: 90,
      },
    },
  },
});
