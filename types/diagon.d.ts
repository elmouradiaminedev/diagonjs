export default async function DiagonModule({
  wasmBinary,
}: {
  wasmBinary?: ArrayBuffer;
}): Promise<{
  cwrap: (
    operation: string,
    outputTypes: string,
    inputTypes: string[],
  ) => (...args) => string;
}>;
