import { And } from "../logic";
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

// given ((A and H) and ((B and (F and G)) and (C and D)))
// return (A and H and B and F and G and C and D)
export function flattenConjunction(conjunction: And): And | Formula {
  const operands: Formula[] = [];

  conjunction.getOperands().forEach((c) => {
    if (c instanceof And) {
      const flattened = flattenConjunction(c);
      if (flattened instanceof And) {
        operands.push(...flattened.getOperands());
      } else {
        operands.push(flattened);
      }
    } else {
      operands.push(c);
    }
  });

  return operands.length <= 1 ? operands[0] : new And(...operands);
}
