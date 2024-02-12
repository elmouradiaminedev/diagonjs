<p align="center">
    <picture>
      <img src="https://i.ibb.co/nbMS51q/Group-1.png" height="128">
    </picture>
    <h1 align="center">Diagonjs</h1>
</p>
<div align="center">

[![npm version](https://img.shields.io/npm/v/diagonjs)](https://www.npmjs.com/package/diagonjs)
[![npm downloads](https://img.shields.io/npm/dm/diagonjs)](https://www.npmjs.com/package/diagonjs)
![CI status](https://github.com/elmouradiaminedev/diagonjs/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/elmouradiaminedev/diagonjs/graph/badge.svg?token=TYVEPNWRD3)](https://codecov.io/gh/elmouradiaminedev/diagonjs)

</div>

Craft captivating ASCII art from your Markdown expression with ease, powered by [Diagon](https://github.com/ArthurSonzogni/Diagon).

## 🚀 Features

- Supports Math, Sequence, Tree, Table, Grammars, Frame, and GraphDAG expressions.
- Flexible translation with customizable options including styles like Unicode, ASCII, Latex, and more.
- Support for both Node.js and browser environments.
- Compatible with CommonJS (CJS) and ECMAScript Module (ESM) environments.

## ⚙️ Install

Install it locally in your project folder:

```bash
npm i diagonjs
# Or Yarn
yarn add diagonjs
# Or pnpm
pnpm add diagonjs
```

## 📖 Usage

### Initialize diagonjs

To initialize diagon.js in your application:

```js
import Diagon from "diagonjs";

const diagon = await Diagon.init();
```

### Use a translator

Once Diagon.js is initialized, you can use its translators to interpret and transform expressions. Below is an example using the math translator:

```js
diagon.translate.math("f(x) = 1 + x / (1 + x)", { style: "Unicode" });

//               x
// f(x) = 1 + ─────
//            1 + x
```

### Web Integration

If you're incorporating Diagonjs into a web application, ensure that the diagon wasm file is correctly copied to the build folder by your bundler. Here's an example with Vite configuration:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
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

## 📚 Documentation

- Dive deeper into the source code by exploring the [translators directory](https://github.com/elmouradiaminedev/diagonjs/blob/main/src/translators/index.ts)
- Find practical integrations with express, react and more in the [examples section](https://github.com/elmouradiaminedev/diagonjs/tree/main/examples).
- Explore the [test section](https://github.com/ArthurSonzogni/Diagon/tree/main/test) in the Diagon C++ repository. It contains input and output samples.
- Experience Diagonjs in action using the [online interpreter](https://arthursonzogni.com/Diagon/).

## 💖 Thanks

This project has been possible thanks to these great projects:

- [Diagon](https://github.com/ArthurSonzogni/Diagon)
- [Emscripten](https://github.com/emscripten-core/emscripten)
- [WebAssembly](https://webassembly.org/)
- [Node](https://github.com/nodejs/node/tree/main)

## License

This project is licensed under the [MIT](https://github.com/elmouradiaminedev/diagonjs/blob/main/LICENSE) License.
