import { Formula, Valuation } from "./language/Formula";

export function generateValuations(symbols: Set<string>): Valuation[] {
  if (symbols.size == 0) {
    return [];
  }

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

export function collectSymbols(formulas: Formula[]): Set<string> {
  const symbols: Set<string> = new Set();

  formulas.forEach((f) => {
    f.getSymbols().forEach((s) => {
      symbols.add(s);
    });
  });

  return symbols;
}

export function union<Type>(a: Set<Type>, b: Set<Type>): Set<Type> {
  return new Set([...a, ...b]);
}

export function intersection<Type>(a: Set<Type>, b: Set<Type>): Set<Type> {
  return new Set([...a].filter((e) => b.has(e)));
}

export function difference<Type>(a: Set<Type>, b: Set<Type>): Set<Type> {
  return new Set([...a].filter((e) => !b.has(e)));
}

export function equalSets<Type>(a: Set<Type>, b: Set<Type>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const elem of a) {
    if (!b.has(elem)) {
      return false;
    }
  }

  return true;
}
