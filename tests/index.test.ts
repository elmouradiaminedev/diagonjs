import { expect, it, describe, vi } from "vitest";
import Diagon from "src";
import { afterEach, beforeEach } from "node:test";

beforeEach(() => {
  const mockDiagonModule = vi.hoisted(() => () => ({
    cwrap: vi.fn(),
  }));

  vi.mock("@vendors/diagon", () => ({
    default: mockDiagonModule,
  }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("init function", () => {
  it("should fetch wasm file in a browser environment", async () => {
    globalThis.window = {} as typeof global.window;

    globalThis.fetch = vi.fn(
      async () =>
        new Response(new ArrayBuffer(0), {
          status: 200,
          headers: { "Content-Type": "application/wasm" },
        }),
    );

    await Diagon.init({ wasmUrl: "mocked-wasm-url" });

    expect(fetch).toHaveBeenCalledWith("mocked-wasm-url");
  });

  it("should return the same instance if initialized twice", async () => {
    const diagonOne = await Diagon.init();
    const diagonTwo = await Diagon.init();

    expect(diagonOne).toEqual(diagonTwo);
  });

  it("should not fetch wasm file if not in a browser environment", async () => {
    globalThis.fetch = vi.fn();

    await Diagon.init();

    expect(fetch).toBeCalledTimes(0);

    vi.restoreAllMocks();
  });
});
