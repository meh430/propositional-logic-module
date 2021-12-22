import { Valuation } from "./language/Formula";

export function generateValuations(symbols: Set<string>): Valuation[] {
  const syms = [...symbols];
  const valuations: Valuation[] = [];

  function generateBinaryStrings(
    bits: number,
    binary: number[],
    index: number
  ) {
    if (index == bits) {
      const valuation: Valuation = {};
      binary.forEach((b, i) => (valuation[syms[i]] = Boolean(b)));
      valuations.push(valuation);
      return;
    }

    binary[index] = 0;
    generateBinaryStrings(bits, binary, index + 1);

    binary[index] = 1;
    generateBinaryStrings(bits, binary, index + 1);
  }

  generateBinaryStrings(syms.length, new Array<number>(syms.length).fill(0), 0);

  return valuations;
}
