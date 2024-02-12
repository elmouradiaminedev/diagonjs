export default async function DiagonModule(): Promise<{
  cwrap: (
    operation: string,
    outputTypes: string,
    inputTypes: string[],
  ) => (...args) => string;
}>;
