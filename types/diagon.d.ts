export function onRuntimeInitialized(): void;

export function cwrap(
  operation: string,
  outputTypes: string,
  inputTypes: string[],
): (...args) => string;
