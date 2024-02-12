# Diagonjs React Example

This is a basic React app that uses Diagonjs for mathematical expression translation.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the following command to start the development server:

```bash
npm run dev
```

This will launch the application on http://localhost:3000.

## Usage

1. You will see a textarea where you can input a math expression, such as

```
f(x) = 1 + x / (x + 1)
```

2. Choose a translation style from the dropdown (Unicode, ASCII, or Latex).

3. Click the "Translate" button to see the translated output in the second textarea.

## Additional Notes

The Vite configuration (vite.config.js) includes a plugin to copy WebAssembly (wasm) files to the build folder:

```js
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
```

This configuration is essential to ensure that wasm files are included in the output build directory.
